# Agent za automatsko sortiranje dokumenata sa Desktop-a

Program koji radi **lokalno na vašem računaru** (Windows), prati Desktop folder i
za svaki novi sačuvan dokument (PDF, DOCX ili TXT):

1. pročita tekst iz fajla,
2. prepozna **vrstu dokumenta** (ugovor, tužba, presuda, punomoćje, rešenje, žalba, račun...) na osnovu ključnih reči,
3. prepozna **klijenta** na koga se dokument odnosi — prvo tako što proveri da li se ime nekog
   od postojećih foldera klijenata pominje u dokumentu, a ako je klijent nov, pokuša da
   pronađe ime i prezime u tekstu (posle reči kao "Ime i prezime:", "Tužilac:", "Klijent:" itd.),
4. **preimenuje** fajl u oblik `Vrsta dokumenta - Prezime Ime - datum.ext`,
5. **premesti** ga u folder tog klijenta (napravi folder ako ne postoji),
6. ako u nečemu nije siguran, fajl premesti u poseban folder **`_Za proveru`** (unutar foldera
   klijenata) i pored njega ostavi `.razlog.txt` fajl koji objašnjava šta je sporno — tako da vi
   samo prevučete fajl na pravo mesto i (po potrebi) mi kasnije doradimo pravilo da sledeći put
   prepozna sam.

**Privatnost:** program ne koristi nikakav AI servis na internetu — sve se radi lokalno, na
osnovu ključnih reči i naziva postojećih foldera. Nijedan dokument ne napušta vaš računar.
Zato ne postoji ni trošak (nema API ključeva, nema pretplate).

---

## 1. Instalacija (radi se jednom)

1. Instalirajte Python 3.10 ili noviji sa [python.org/downloads](https://www.python.org/downloads/).
   **Važno:** na prvom ekranu instalacije čekirajte **"Add python.exe to PATH"**.
2. Preuzmite (ili kopirajte) folder `desktop-agent` na svoj računar, npr. u
   `C:\Users\<VaseIme>\Documents\desktop-agent`.
3. Otvorite Command Prompt (cmd) u tom folderu (Shift + desni klik unutar foldera → "Open in Terminal"
   ili "Open PowerShell window here") i pokrenite:

   ```
   pip install -r requirements.txt
   ```

4. Pokrenite program prvi put dvoklikom na `pokreni_test.bat`. On će sam napraviti fajl
   `config.ini` i zaustaviti se uz poruku da ga podesite.

## 2. Podešavanje `config.ini`

Otvorite `config.ini` (napravljen u prethodnom koraku) u Notepad-u i unesite pravu putanju do
foldera u kome već držite foldere klijenata, npr.:

```ini
[putanje]
klijenti_folder = C:\Users\VaseIme\Documents\Klijenti

[opcije]
cekaj_sekundi_stabilnost = 2
```

`cekaj_sekundi_stabilnost` — koliko sekundi program čeka da fajl prestane da se menja pre nego
što ga obradi (korisno da ne pipa fajl dok se još snima/preuzima). 2 sekunde je dobra podrazumevana
vrednost, ne morate je menjati.

Desktop folder se prepoznaje automatski (radi i ako vam je Desktop preusmeren na OneDrive).

## 3. Test

Ponovo dvoklik na `pokreni_test.bat`. Otvoriće se prozor koji ispisuje šta program radi
("Pratim Desktop: ...", "Folder klijenata: ..."). Ostavite ga otvorenog, sačuvajte probni PDF ili
Word dokument na Desktop i pratite šta se dešava — trebalo bi da fajl u roku od par sekundi
nestane sa Desktop-a i pojavi se u odgovarajućem folderu klijenta (ili u `_Za proveru`).

Zatvorite prozor sa Ctrl+C (ili ga samo zatvorite) kad ste zadovoljni rezultatom.

## 4. Automatsko pokretanje pri svakom uključivanju računara

1. Pritisnite **Win + R**, ukucajte `shell:startup` i pritisnite Enter — otvoriće se folder za
   automatsko pokretanje programa.
2. Napravite prečicu (desni klik → "New" → "Shortcut") koja pokazuje na `pokreni_tiho.vbs` iz
   `desktop-agent` foldera, i stavite tu prečicu u `shell:startup` folder.
   (Ili jednostavno kopirajte sam `pokreni_tiho.vbs` fajl direktno u `shell:startup` folder.)

Od sada će agent automatski krenuti u pozadini (bez ikakvog prozora) svaki put kad se ulogujete u
Windows, i tiho će sortirati dokumente sa Desktop-a.

**Da zaustavite agenta:** otvorite Task Manager (Ctrl+Shift+Esc), pronađite proces `pythonw.exe`
i kliknite "End task". Da ga trajno isključite, uklonite prečicu iz `shell:startup` foldera.

**Log:** sve što agent uradi (i eventualne greške) upisuje se u `agent.log` u ovom folderu — tu
možete proveriti šta se dešavalo dok prozor nije bio otvoren.

## 5. Šta agent podržava, a šta ne (za sada)

- Podržano: `.pdf`, `.docx`, `.txt`.
- Nije podržano: stari `.doc` format, `.odt`, skenirane slike bez teksta (`.jpg`, `.png`) — ti
  fajlovi (ili PDF-ovi koji su zapravo samo skenirana slika bez teksta) završiće u `_Za proveru`
  jer program ne može da pročita tekst iz njih. Ako vam ovo bude često trebalo, može se docnije
  dodati OCR (čitanje teksta sa slike) — javite mi.
- Kad agent **prvi put** napravi folder za novog klijenta, pogledajte da li je redosled
  ime/prezime u nazivu foldera ispravan (npr. "Petrović Petar" a ne "Petar Petrović") i po potrebi
  ga ručno ispravite u Explorer-u — dalje prepoznavanje tog klijenta radi bez obzira na redosled
  reči u tekstu dokumenta, tako da je ovo potrebno ispraviti samo jednom.

## 6. Dodavanje novih vrsta dokumenata ili ključnih reči

Ako agent često ne prepozna neku vrstu dokumenta, otvorite `organize_documents.py`, pronađite listu
`DOCUMENT_TYPES` pri vrhu fajla i dodajte novi red po uzoru na postojeće, npr.:

```python
("Izjava o odricanju", ["izjava o odricanju"]),
```

Ne morate da vodite računa o velikim/malim slovima ni o č/ć/š/ž/đ — program to sam izjednačava.
