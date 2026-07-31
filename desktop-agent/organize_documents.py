"""Agent za automatsko sortiranje dokumenata sa Desktop-a u foldere klijenata.

Prati Desktop folder. Cim se pojavi novi fajl (PDF, DOCX ili TXT):
  1. izvuce tekst iz fajla,
  2. prepozna vrstu dokumenta na osnovu kljucnih reci,
  3. prepozna klijenta - prvo poredjenjem sa imenima postojecih foldera u
     folderu klijenata, a ako klijent jos nema folder, pokusa da prepozna
     ime i prezime iz teksta (npr. posle "Ime i prezime:", "Tuzilac:", ...),
  4. preimenuje fajl (Vrsta dokumenta - Klijent - datum) i premesti ga u
     folder klijenta (napravi folder ako ne postoji),
  5. ako nije siguran u vrstu dokumenta ili klijenta, fajl premesta u
     podfolder "_Za proveru" unutar foldera klijenata i pored njega ostavi
     .razlog.txt fajl koji objasnjava sta je sporno.

Sve radi lokalno, na ovom racunaru - nista se ne salje na internet niti
trecoj strani.
"""

import configparser
import logging
import os
import re
import shutil
import sys
import time
import unicodedata
import winreg
from pathlib import Path

from watchdog.events import FileSystemEventHandler
from watchdog.observers import Observer

# ---------------------------------------------------------------------------
# Podesavanje (config.ini)
# ---------------------------------------------------------------------------

BASE_DIR = Path(__file__).resolve().parent
CONFIG_PATH = BASE_DIR / "config.ini"

DEFAULT_CONFIG = """[putanje]
klijenti_folder = C:\\Putanja\\Do\\Foldera\\Klijenata

[opcije]
cekaj_sekundi_stabilnost = 2
moje_ime_prezime = Ime Prezime
"""


def load_config():
    if not CONFIG_PATH.exists():
        CONFIG_PATH.write_text(DEFAULT_CONFIG, encoding="utf-8")
        print(f"Napravljen je config.ini na: {CONFIG_PATH}")
        print("Otvorite ga, unesite pravu putanju do foldera sa klijentima "
              "(klijenti_folder), sacuvajte i ponovo pokrenite agenta.")
        sys.exit(1)

    cfg = configparser.ConfigParser()
    cfg.read(CONFIG_PATH, encoding="utf-8")
    clients_folder = cfg.get("putanje", "klijenti_folder", fallback="").strip()
    if not clients_folder or "Putanja\\Do\\Foldera" in clients_folder:
        print("Podesite 'klijenti_folder' u config.ini pre pokretanja.")
        sys.exit(1)
    stability_seconds = cfg.getint("opcije", "cekaj_sekundi_stabilnost", fallback=2)
    own_name = cfg.get("opcije", "moje_ime_prezime", fallback="").strip()
    if own_name == "Ime Prezime":
        own_name = ""
    return Path(clients_folder), stability_seconds, own_name


def get_desktop_path() -> Path:
    """Vraca pravu putanju do Desktop foldera (radi i kad je Desktop
    preusmeren na OneDrive)."""
    try:
        key = winreg.OpenKey(
            winreg.HKEY_CURRENT_USER,
            r"Software\Microsoft\Windows\CurrentVersion\Explorer\User Shell Folders",
        )
        value, _ = winreg.QueryValueEx(key, "Desktop")
        return Path(os.path.expandvars(value))
    except OSError:
        return Path.home() / "Desktop"


# ---------------------------------------------------------------------------
# Citanje teksta iz fajla
# ---------------------------------------------------------------------------

SUPPORTED_EXT = {".pdf", ".docx", ".doc", ".xlsx", ".txt"}
IMAGE_EXT = {".jpg", ".jpeg", ".png", ".tiff", ".tif", ".bmp", ".heic", ".gif"}

_CYR_SINGLE = (
    "АБВГДЕЖЗИЈКЛМНОПРСТЋУФХЦЧШЂ"
    "абвгдежзијклмнопрстћуфхцчшђ"
)
_LAT_SINGLE = (
    "ABVGDEŽZIJKLMNOPRSTĆUFHCČŠĐ"
    "abvgdežzijklmnoprstćufhcčšđ"
)
CYR_TO_LAT_TABLE = {ord(c): l for c, l in zip(_CYR_SINGLE, _LAT_SINGLE)}
CYR_TO_LAT_TABLE.update({
    ord("Љ"): "Lj", ord("љ"): "lj",
    ord("Њ"): "Nj", ord("њ"): "nj",
    ord("Џ"): "Dž", ord("џ"): "dž",
})


def cyrillic_to_latin(text: str) -> str:
    """Prevodi srpsku cirilicu u latinicu; latinica i ostali karakteri
    prolaze nepromenjeni, tako da radi i na mesovitom tekstu."""
    return text.translate(CYR_TO_LAT_TABLE)


def extract_text(path: Path) -> str:
    ext = path.suffix.lower()
    text = ""
    try:
        if ext == ".pdf":
            text = _extract_text_pdf(path)
        elif ext == ".docx":
            text = _extract_text_docx(path)
        elif ext == ".doc":
            text = _extract_text_doc(path)
        elif ext == ".xlsx":
            text = _extract_text_xlsx(path)
        elif ext == ".txt":
            text = path.read_text(encoding="utf-8", errors="ignore")
        elif ext in IMAGE_EXT:
            text = _extract_text_image(path)
    except Exception:
        logging.exception("Neuspesno citanje teksta iz %s", path.name)
        return ""
    return cyrillic_to_latin(text)


TESSERACT_DEFAULT_PATHS = [
    r"C:\Program Files\Tesseract-OCR\tesseract.exe",
    r"C:\Program Files (x86)\Tesseract-OCR\tesseract.exe",
]
# "srp_latn" = srpski latinicom, "srp" = srpski cirilicom - probamo redom,
# jer ne znamo unapred koji je jezicki paket instaliran.
OCR_LANGS = ["srp_latn+eng", "srp+eng", "eng"]
OCR_MAX_PDF_PAGES = 5


def _ocr_image(image) -> str:
    import pytesseract

    if not shutil.which("tesseract"):
        for candidate in TESSERACT_DEFAULT_PATHS:
            if Path(candidate).exists():
                pytesseract.pytesseract.tesseract_cmd = candidate
                break

    for lang in OCR_LANGS:
        try:
            return pytesseract.image_to_string(image, lang=lang)
        except Exception:
            continue
    return ""


def _extract_text_image(path: Path) -> str:
    from PIL import Image

    with Image.open(path) as image:
        return _ocr_image(image)


def _extract_text_pdf(path: Path) -> str:
    import pdfplumber

    with pdfplumber.open(path) as pdf:
        pages = pdf.pages[:15]
        parts = [page.extract_text() or "" for page in pages]
        text = "\n".join(parts)
        if text.strip():
            return text

        # Verovatno skeniran PDF bez teksta - probaj OCR na prvih par strana.
        ocr_parts = []
        for page in pages[:OCR_MAX_PDF_PAGES]:
            try:
                image = page.to_image(resolution=200).original
                ocr_parts.append(_ocr_image(image))
            except Exception:
                logging.exception("OCR neuspesan za stranu u %s", path.name)
        return "\n".join(ocr_parts)


def _extract_text_docx(path: Path) -> str:
    import docx

    document = docx.Document(path)
    return "\n".join(p.text for p in document.paragraphs)


def _extract_text_doc(path: Path) -> str:
    """Stari (binarni) Word format - cita se preko instaliranog Word-a,
    pošto ne postoji dobra čisto-Python biblioteka za ovaj format."""
    import win32com.client

    word = win32com.client.DispatchEx("Word.Application")
    word.Visible = False
    try:
        document = word.Documents.Open(str(path.resolve()), ReadOnly=True)
        try:
            return document.Content.Text
        finally:
            document.Close(False)
    finally:
        word.Quit()


def _extract_text_xlsx(path: Path) -> str:
    import openpyxl

    workbook = openpyxl.load_workbook(path, read_only=True, data_only=True)
    try:
        parts = []
        for sheet in workbook.worksheets:
            for row in sheet.iter_rows(values_only=True):
                for cell in row:
                    if cell is not None:
                        parts.append(str(cell))
        return "\n".join(parts)
    finally:
        workbook.close()


# ---------------------------------------------------------------------------
# Prepoznavanje vrste dokumenta
# ---------------------------------------------------------------------------

def normalize(text: str) -> str:
    text = text.lower().replace("đ", "dj")
    text = unicodedata.normalize("NFKD", text)
    return "".join(ch for ch in text if not unicodedata.combining(ch))


# Redosled je bitan - specificniji izrazi idu pre opstijih.
DOCUMENT_TYPES = [
    ("Odgovor na tužbu", ["odgovor na tuzbu"]),
    ("Protivtužba", ["protivtuzba"]),
    ("Tužba", ["tuzba"]),
    ("Žalba", ["zalba"]),
    ("Revizija", ["revizija"]),
    ("Presuda", ["presuda"]),
    ("Rešenje", ["resenje"]),
    ("Zaključak", ["zakljucak"]),
    ("Predlog za vraćanje u pređašnje stanje", ["vracanje u predjasnje stanje"]),
    ("Predlog za izvršenje", ["predlog za izvrsenje"]),
    ("Ugovor o zakupu", ["ugovor o zakupu"]),
    ("Ugovor o radu", ["ugovor o radu"]),
    ("Ugovor o kupoprodaji", ["ugovor o kupoprodaji", "kupoprodajni ugovor"]),
    ("Aneks ugovora", ["aneks ugovora", "aneks broj"]),
    ("Ugovor", ["ugovor"]),
    ("Sporazum", ["sporazum"]),
    ("Zapisnik", ["zapisnik"]),
    ("Nalaz veštaka", ["nalaz i misljenje", "vestacenje"]),
    ("Opomena pred tužbu", ["opomena pred utuzenje", "opomena pred tuzbu"]),
    ("Račun", ["faktura", "racun broj", "predracun"]),
    ("Ponuda", ["ponuda broj", "komercijalna ponuda"]),
    ("Ostavinski predlog", ["ostavinski postupak", "zaostavstina"]),
    ("Krivična prijava", ["krivicna prijava"]),
    ("Optužni predlog", ["optuzni predlog", "optuznica"]),
    ("Zahtev", ["zahtev za", "molba"]),
]

# "Punomocje" se cesto pominje samo kao prilog uz neki sasvim drugi dokument
# (npr. "Prilozi: punomocje..."), pa sme da se prepozna SAMO iz naslova -
# nikad kao "poslednja slamka" pretragom celog teksta, jer bi tada pogresno
# "pregazio" stvarni (makar i neprepoznati) naslov dokumenta.
HEADING_ONLY_DOCUMENT_TYPES = [
    ("Punomoćje", ["punomocje", "punomoc"]),
]

HEADING_CHARS = 400


def classify_document_type(text: str):
    """Prvo trazi vrstu dokumenta u naslovu (pocetak teksta) - to je mnogo
    pouzdaniji signal nego bilo koje pominjanje kljucne reci u telu teksta
    (npr. spisak priloga). Tek ako naslov ne da odgovor, gleda ostatak teksta
    (osim za HEADING_ONLY_DOCUMENT_TYPES, koji se prepoznaju samo iz naslova)."""
    norm = normalize(text)
    heading = norm[:HEADING_CHARS]
    for name, keywords in DOCUMENT_TYPES + HEADING_ONLY_DOCUMENT_TYPES:
        for kw in keywords:
            if kw in heading:
                return name
    for name, keywords in DOCUMENT_TYPES:
        for kw in keywords:
            if kw in norm:
                return name
    return None


# ---------------------------------------------------------------------------
# Prepoznavanje klijenta
# ---------------------------------------------------------------------------

NAME_WORD = r"[A-ZČĆŽŠĐ][a-zčćžšđ]+(?:-[A-ZČĆŽŠĐ][a-zčćžšđ]+)?"
NAME_PATTERN = re.compile(rf"\b({NAME_WORD})\s+({NAME_WORD})\b")

LABEL_PATTERN = re.compile(
    r"(ime i prezime|klijent(?:kinja)?|stranka|podnosilac(?: zahteva)?|"
    r"tu[zž]ila[cč]|tu[zž]en[ia]|punomo[cć]nik za|vlasnik|prodavac|kupac|"
    r"zakupac|zakupodavac|poklonodavac|poklonoprimac|ostavilac|naslednik|"
    r"osniva[cč]|zastupnik|dole potpisan\w*)",
    re.IGNORECASE,
)


def _name_word_set(name: str):
    return {normalize(w) for w in re.split(r"\s+", name.strip()) if w}


def find_existing_client_folders(clients_root: Path, own_name: str = ""):
    if not clients_root.exists():
        return []
    own_words = _name_word_set(own_name) if own_name else set()
    result = []
    for p in clients_root.iterdir():
        if not p.is_dir() or p.name.startswith("_"):
            continue
        if own_words and _name_word_set(p.name) == own_words:
            # ovo je advokatov sopstveni folder - nikad ne sme biti odredište
            continue
        result.append(p)
    return result


NAME_PROXIMITY_WINDOW = 60


def _words_occur_close(norm_text: str, words, window: int = NAME_PROXIMITY_WINDOW) -> bool:
    """Da li se sve zadate reci pojavljuju blizu jedna drugoj (kao delovi
    istog imena), a ne bilo gde nezavisno u celom dokumentu."""
    anchor = words[0]
    for m in re.finditer(rf"\b{re.escape(anchor)}\b", norm_text):
        lo, hi = max(0, m.start() - window), m.start() + window
        segment = norm_text[lo:hi]
        if all(re.search(rf"\b{re.escape(w)}\b", segment) for w in words[1:]):
            return True
    return False


EXTRA_WORD_MIN_LEN = 4


def match_existing_client(text: str, folders):
    """Poredi ime svakog postojeceg foldera (bez obzira na redosled reci u
    folderu) sa tekstom dokumenta - ime i prezime moraju biti blizu jedno
    drugom, ne samo negde nezavisno pomenuti u dokumentu.

    Ako folder ima i dodatne reci preko imena i prezimena (npr. naziv firme,
    "Cvetkovic Mirko Mikrolift"), dovoljno je da se ijedna dovoljno duga i
    prepoznatljiva dodatna rec pojavi u dokumentu, i bez licnog imena."""
    norm = normalize(text)
    matches = []
    for folder in folders:
        parts = [normalize(p) for p in re.split(r"\s+", folder.name.strip()) if p]
        if len(parts) < 2:
            continue
        primary, extra = parts[:2], parts[2:]
        matched = _words_occur_close(norm, primary)
        if not matched and extra:
            matched = any(
                len(word) >= EXTRA_WORD_MIN_LEN and re.search(rf"\b{re.escape(word)}\b", norm)
                for word in extra
            )
        if matched:
            matches.append(folder)
    return matches


def strip_own_name(text: str, own_name: str) -> str:
    """Uklanja pojave advokatovog sopstvenog imena i prezimena (npr. iz
    zaglavlja/potpisa) da se ne bi pogresno prepoznalo kao klijent."""
    if not own_name.strip():
        return text
    parts = [p for p in re.split(r"\s+", own_name.strip()) if p]
    if len(parts) < 2:
        return text
    p1, p2 = re.escape(parts[0]), re.escape(parts[1])
    pattern = re.compile(
        rf"\b{p1}\b[^\n]{{0,25}}\b{p2}\b|\b{p2}\b[^\n]{{0,25}}\b{p1}\b",
        re.IGNORECASE,
    )
    return pattern.sub(" ", text)


def guess_new_client_candidates(text: str):
    """Trazi Ime Prezime obrazac odmah posle poznatih oznaka u tekstu."""
    candidates = set()
    for label_match in LABEL_PATTERN.finditer(text):
        window = text[label_match.end():label_match.end() + 80]
        name_match = NAME_PATTERN.search(window)
        if name_match:
            candidates.add(f"{name_match.group(1)} {name_match.group(2)}")
    return candidates


def decide_destination(text: str, clients_root: Path, own_name: str = ""):
    """Vraca (naziv_foldera, da_li_je_novi, razlog_ako_je_sporno)."""
    folders = find_existing_client_folders(clients_root, own_name)
    existing_matches = match_existing_client(text, folders)

    if len(existing_matches) == 1:
        return existing_matches[0].name, False, None
    if len(existing_matches) > 1:
        names = ", ".join(f.name for f in existing_matches)
        return None, None, f"Dokument pominje vise postojecih klijenata: {names}"

    own_words = _name_word_set(own_name) if own_name else set()
    candidates = {
        c for c in guess_new_client_candidates(text)
        if not (own_words and _name_word_set(c) == own_words)
    }
    if len(candidates) == 1:
        ime_prezime = next(iter(candidates)).split()
        folder_name = f"{ime_prezime[-1]} {' '.join(ime_prezime[:-1])}"  # Prezime Ime
        return folder_name, True, None
    if len(candidates) > 1:
        return None, None, "Pronadjeno vise mogucih klijenata: " + ", ".join(sorted(candidates))

    return None, None, "Nije prepoznato ime klijenta u dokumentu"


# ---------------------------------------------------------------------------
# Imenovanje i premestanje fajlova
# ---------------------------------------------------------------------------

ILLEGAL_CHARS = re.compile(r'[\\/:*?"<>|]')


def build_filename(client_folder_name: str, original_name: str) -> str:
    """Samo dodaje ime klijenta ispred postojeceg imena fajla - ostatak
    (naziv, ekstenzija) ostaje neizmenjen. Ako ime fajla vec pocinje imenom
    klijenta (u bilo kom redosledu, cirilica/latinica), ne duplira ga."""
    parts = [normalize(p) for p in re.split(r"\s+", client_folder_name.strip()) if p]
    heading = normalize(cyrillic_to_latin(original_name))[:60]
    already_present = bool(parts) and all(re.search(rf"\b{re.escape(p)}\b", heading) for p in parts)
    if already_present:
        return ILLEGAL_CHARS.sub("", original_name)
    raw = f"{client_folder_name} - {original_name}"
    return ILLEGAL_CHARS.sub("", raw)


def unique_path(path: Path) -> Path:
    if not path.exists():
        return path
    stem, suffix = path.stem, path.suffix
    counter = 2
    while True:
        candidate = path.with_name(f"{stem} ({counter}){suffix}")
        if not candidate.exists():
            return candidate
        counter += 1


def wait_until_stable(path: Path, wait_seconds: int, timeout: int = 60) -> bool:
    """Ceka da fajl prestane da raste (da se zavrsi snimanje/download) i da
    ne bude zakljucan od strane drugog programa."""
    start = time.time()
    last_size = -1
    stable_since = None
    while time.time() - start < timeout:
        if not path.exists():
            return False
        try:
            size = path.stat().st_size
        except OSError:
            time.sleep(0.5)
            continue
        if size == last_size and size > 0:
            if stable_since is None:
                stable_since = time.time()
            elif time.time() - stable_since >= wait_seconds:
                try:
                    with open(path, "rb"):
                        return True
                except PermissionError:
                    time.sleep(0.5)
                    continue
        else:
            stable_since = None
        last_size = size
        time.sleep(0.5)
    return False


# ---------------------------------------------------------------------------
# Pracenje Desktop-a
# ---------------------------------------------------------------------------

IGNORE_SUFFIXES = {".tmp", ".crdownload", ".partial", ".download", ".part"}
IGNORE_NAMES = {"desktop.ini", "thumbs.db"}


class DesktopHandler(FileSystemEventHandler):
    def __init__(self, clients_root: Path, stability_seconds: int, review_dir: Path, own_name: str = ""):
        self.clients_root = clients_root
        self.stability_seconds = stability_seconds
        self.review_dir = review_dir
        self.own_name = own_name

    def on_created(self, event):
        if not event.is_directory:
            self.handle(Path(event.src_path))

    def on_moved(self, event):
        # npr. kad browser preimenuje "fajl.crdownload" u konacno ime
        if not event.is_directory:
            self.handle(Path(event.dest_path))

    def handle(self, path: Path):
        if path.name in IGNORE_NAMES or path.suffix.lower() in IGNORE_SUFFIXES:
            return
        if path.name.startswith("~$") or path.name.startswith("."):
            # Word/Excel privremeni "lock" fajlovi (npr. ~$Ugovor.docx) i skriveni fajlovi
            return

        ext = path.suffix.lower()
        if ext not in SUPPORTED_EXT and ext not in IMAGE_EXT:
            return

        if not wait_until_stable(path, self.stability_seconds):
            logging.warning("Fajl '%s' nije bio dostupan za obradu (verovatno se jos snima).", path.name)
            return

        try:
            self.process(path)
        except PermissionError:
            logging.warning(
                "Fajl '%s' je trenutno otvoren u drugom programu (npr. Word) - preskačem ga, "
                "obradiće se sledeći put kad se pokrenem.",
                path.name,
            )
        except Exception:
            logging.exception("Greska pri obradi fajla %s", path.name)

    def process(self, path: Path):
        text = extract_text(path)

        if not text.strip():
            self.move_to_review(path, "Nije moguce procitati tekst iz fajla (mozda je skeniran bez teksta)")
            return

        # Naziv fajla cesto vec sadrzi ime klijenta i/ili vrstu dokumenta
        # (narocito korisno kad je OCR tekst slabog kvaliteta) - dodajemo ga
        # ispred, kao deo "naslova" koji se pretrazuje.
        combined_text = cyrillic_to_latin(path.stem) + "\n" + text

        doc_type = classify_document_type(combined_text)
        matching_text = strip_own_name(combined_text, self.own_name)
        folder_name, is_new, note = decide_destination(matching_text, self.clients_root, self.own_name)

        if folder_name is None:
            reason = note or "Nepoznat razlog"
            if not doc_type:
                reason += "; vrsta dokumenta takodje nije prepoznata"
            self.move_to_review(path, reason)
            return

        # Klijent je siguran - ubacujemo kod njega bez obzira da li je vrsta
        # dokumenta prepoznata (ime fajla se ionako ne oslanja na vrstu).
        target_dir = self.clients_root / folder_name
        target_dir.mkdir(parents=True, exist_ok=True)

        new_name = build_filename(folder_name, path.name)
        destination = unique_path(target_dir / new_name)
        shutil.move(str(path), str(destination))

        status = "NOVI KLIJENT - napravljen folder" if is_new else "postojeci klijent"
        vrsta = doc_type or "nije prepoznata"
        logging.info("Premesteno: '%s' -> '%s'  [%s, vrsta: %s]", path.name, destination, status, vrsta)
        if is_new:
            logging.info("Proverite da li je redosled ime/prezime foldera '%s' ispravan.", folder_name)

    def move_to_review(self, path: Path, reason: str):
        self.review_dir.mkdir(parents=True, exist_ok=True)
        destination = unique_path(self.review_dir / path.name)
        shutil.move(str(path), str(destination))
        note_path = destination.with_name(destination.name + ".razlog.txt")
        note_path.write_text(f"Fajl: {path.name}\nRazlog za proveru: {reason}\n", encoding="utf-8")
        logging.info("SPORNO - premesteno u '_Za proveru': '%s' | Razlog: %s", path.name, reason)


def run_once(handler: "DesktopHandler", desktop: Path):
    """Obradi sve fajlove koji trenutno stoje na Desktop-u, pa se vrati (bez
    stalnog pracenja) - za pokretanje po rasporedu (npr. jednom nedeljno)."""
    entries = [e for e in sorted(desktop.iterdir()) if e.is_file()]
    logging.info("Pronadjeno fajlova na Desktop-u: %d", len(entries))
    for i, entry in enumerate(entries, start=1):
        logging.info("[%d/%d] Proveravam: '%s'", i, len(entries), entry.name)
        handler.handle(entry)
    logging.info("Jednokratna provera zavrsena - pregledano fajlova: %d", len(entries))


def main():
    clients_root, stability_seconds, own_name = load_config()
    desktop = get_desktop_path()
    review_dir = clients_root / "_Za proveru"

    logging.basicConfig(
        level=logging.INFO,
        format="%(asctime)s %(levelname)s %(message)s",
        handlers=[
            logging.FileHandler(BASE_DIR / "agent.log", encoding="utf-8"),
            logging.StreamHandler(),
        ],
    )

    logging.info("Pratim Desktop: %s", desktop)
    logging.info("Folder klijenata: %s", clients_root)

    if not desktop.exists():
        logging.error("Desktop folder ne postoji na ovoj putanji: %s", desktop)
        sys.exit(1)

    handler = DesktopHandler(clients_root, stability_seconds, review_dir, own_name)

    if "--jednom" in sys.argv:
        run_once(handler, desktop)
        return

    observer = Observer()
    observer.schedule(handler, str(desktop), recursive=False)
    observer.start()
    try:
        while True:
            time.sleep(1)
    except KeyboardInterrupt:
        observer.stop()
    observer.join()


if __name__ == "__main__":
    main()
