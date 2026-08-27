# Đinina matematička igraonica — kontekst za rad

Edukativna web aplikacija za vežbanje matematike/logike za dete od 6 godina (Đina),
napravljena na osnovu skenirane zbirke zadataka ("Pripremni zadaci za takmičenje
Mislisa" + test "Mislisa 2019", izdavač Arhimedes).

## VAŽNO: ciljni uređaj je Windows 7

Aplikacija se pokreće na **Windows 7** računaru, otvaranjem `index.html` direktno
(dvoklikom, bez servera). Ovo bitno ograničava šta se sme koristiti:

- **Nikad ne koristiti emoji kao nosioca informacije** (ni u UI-ju, ni u tekstu
  zadataka). Windows 7 nema font za emoji u boji, pa se prikazuju kao prazni
  kvadratići ("tofu"). Svi ključni simboli (maskota, ikonice kategorija, zvezdice,
  dugmad, feedback ikonice) su nacrtani ručno kao inline SVG u `index.html`
  (vidi `ICON_PATHS` / funkciju `ico()` / `catIconHtml()`) — tako se prikazuju
  identično svuda, bez oslanjanja na font.
  - Obični Unicode simboli kao `← → ▶` (strelice, trougao) NISU emoji i rade
    svuda bez problema - njih je u redu koristiti.
  - Kad dodaješ nove zadatke u `zadaci.js`, NIKAD ne stavljaj emoji (🍎🐰⭐...)
    u `tekst`/`objasnjenje`/`opcije` - opiši rečima umesto sličicom.
- Ne koristiti moderne JS/CSS funkcije koje stariji browseri (koji se obično
  koriste na Windows 7 - stariji Chrome/Firefox, jer novi Chrome/Edge ne
  podržavaju Win7 od 2023) ne razumeju. Držati se jednostavnog, širinom
  kompatibilnog JS-a (bez optional chaining `?.`, bez `??`, bez top-level
  `async/await`, bez novijih CSS funkcija kao `:has()`) - proveriti pre dodavanja.
- Aplikacija radi potpuno lokalno/offline - nema fetch(), nema interneta,
  nema build koraka. Tako treba i da ostane.
- "Add to home screen" (manifest.json/icon.svg) je samo kozmetički dodatak,
  ne oslanjati se na to da radi kao prava PWA lokalno (treba hosting za to).

## Struktura fajlova (svih 5 mora biti u ISTOM folderu)

- `index.html` - cela aplikacija (HTML+CSS+JS u jednom fajlu, bez build koraka)
- `zadaci.js` - baza zadataka, `const ZADACI_DB = { kategorije: [...], zadaci: [...] }`,
  učitava se preko `<script src="zadaci.js">` (ne fetch, da izbegnemo CORS
  probleme pri otvaranju fajla direktno u browseru)
- `nagrade.js` - podešavanja sistema nagrađivanja, `const NAGRADE_CONFIG = {...}`
  (dnevni cilj, novčići, "Prodavnica privilegija" - vidi odeljak ispod).
  Roditelj menja OVAJ fajl da promeni ponudu u prodavnici, ne dira `index.html`.
- `icon.svg`, `manifest.json` - ikonica/manifest za "dodaj na početni ekran"

## Sistem nagrađivanja (od avgusta 2026, zamenjuje stari "kupon za slatkiš" sistem)

Arhitektura je namerno slojevita - razdvaja unutrašnju motivaciju (zvezdice,
nivoi) od stvarnih porodičnih privilegija (novčići), i izbegava da svaki
tačan odgovor bude "transakcija" za materijalnu nagradu:

- **Zvezdice** (`state.stars[kategorija]`) - kao i pre, po jedna za svaki tačno
  rešen zadatak, prikaz napretka po kategoriji, ne troše se nigde.
- **Dnevni cilj** (`state.dnevniCilj = {datum, reseno, ostvaren}`) - broji SVAKI
  odgovoren zadatak danas (tačan ili ne - meri trud, ne samo tačnost). Kad
  dostigne `NAGRADE_CONFIG.dnevniCiljZadataka` (podrazumevano 15), jednom
  dnevno dodeljuje `novciciZaDnevniCilj` novčića i podiže `state.nivo` za 1
  (otključava sledeći čvor na "putu kroz nivoe" i, na pragovima 3/6/10,
  novi dodatak za maskotu - mašnu/medalju/krunu).
- **Nedeljni niz** (`state.streakDani` - lista datuma sa aktivnošću,
  `state.nedeljniBonusNedelje` - lista ISO nedelja koje su već nagrađene) -
  kad broj aktivnih dana u tekućoj ISO nedelji (pon-ned) dostigne
  `nedeljniCiljAktivnihDana` (podrazumevano 4/7), dodeljuje bonus novčiće i
  bedž "Logički Majstor" (`state.majstorBedzevi`), jednom po nedelji.
- **Novčići** (`state.novcici`) - TROŠE SE isključivo u "Prodavnici privilegija"
  (ekran `screen-prodavnica`), za porodične pogodnosti definisane u
  `nagrade.js` (`NAGRADE_CONFIG.prodavnica`), NE za slatkiše/igračke. Kupovine
  se pamte u `state.privilegijeIstorija` (za praćenje "iskorišćeno / čeka").
- **Iznenađenja ("skriveni kovčeg")** - bonus zvezdica bez najave, ili posle
  3 teška zadatka zaredom tačna iz prvog pokušaja (`state.teskiNizZaredom`),
  ili nasumično (do jednom dnevno, `state.poslednjeIznenadjenjeDatum`).

Sve tri vrste "proslave" (dnevni cilj / nedeljni niz / iznenađenje) prikazuju
se kroz isti modal (`#proslava-modal`) preko reda čekanja (`proslavaRed`), da
se ne prikažu dve odjednom ako se poklope.

Ekran "Moj napredak" (`screen-napredak`) prikazuje traku dnevnog cilja, 7
kružića za dane u nedelji i "put kroz nivoe"; iz njega se ide u prodavnicu.

## Nakon svake izmene

- Testirati kroz Playwright (headless Chromium) pre slanja - screenshot ključnih
  ekrana, proveriti da nema JS grešaka u konzoli.
- Poslati izmenjene fajlove korisniku (SendUserFile) - korisnik ručno kopira
  fajlove na svoj Windows 7 računar, nema git/deploy sa te strane.
- Kratko objasniti šta je promenjeno, bez nepotrebnog žargona.

## Baza zadataka

177 zadataka u 4 kategorije (sabiranje-oduzimanje, nizovi-i-obrasci,
logicke-zagonetke, nizovi-slova). Obrađena cela zbirka "Pripremni zadaci"
(1-207) + deo testa "Mislisa 2019" - preskočeni samo zadaci koji zavise od
tačnog izgleda slike (lavirinti, brojanje oblika na crtežu i sl.) jer se ne
mogu pouzdano preneti u tekst bez rizika od greške.
