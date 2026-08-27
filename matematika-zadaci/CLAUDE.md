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

## Struktura fajlova (sva 4 moraju biti u ISTOM folderu)

- `index.html` - cela aplikacija (HTML+CSS+JS u jednom fajlu, bez build koraka)
- `zadaci.js` - baza zadataka, `const ZADACI_DB = { kategorije: [...], zadaci: [...] }`,
  učitava se preko `<script src="zadaci.js">` (ne fetch, da izbegnemo CORS
  probleme pri otvaranju fajla direktno u browseru)
- `icon.svg`, `manifest.json` - ikonica/manifest za "dodaj na početni ekran"

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
