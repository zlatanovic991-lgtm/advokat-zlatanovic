// Podešavanja sistema nagrađivanja za "Đininu matematičku igraonicu".
// Ovaj fajl roditelj slobodno menja - imena, cene i ciljeve - bez diranja
// ostatka aplikacije. Sačuvaj fajl i osveži stranicu da izmene važe.
//
// KAKO SISTEM RADI (ukratko):
//  - Zvezdice (⭐) se dobijaju za svaki tačno rešen zadatak - to je "unutrašnja"
//    nagrada, pokazatelj napretka po kategoriji, ne troši se nigde.
//  - Novčići se dobijaju SAMO za ostvarenje dnevnog cilja (broj zadataka dnevno)
//    i za nedeljni niz (aktivnih dana u nedelji). Novčići se troše u
//    "Prodavnici privilegija" - to su porodične pogodnosti, ne slatkiši.
//  - Povremeno (nasumično ili posle niza teških zadataka rešenih iz prvog
//    pokušaja) izleti "skriveni kovčeg" sa bonus zvezdicom - lepo iznenađenje,
//    ne najavljuje se unapred i ne zavisi od ovog fajla.

const NAGRADE_CONFIG = {
  // Koliko zadataka dnevno čini "dnevni cilj" (otprilike 5-10 minuta rada).
  dnevniCiljZadataka: 5,

  // Koliko novčića dete dobija kad ostvari dnevni cilj.
  novciciZaDnevniCilj: 2,

  // Koliko aktivnih dana u nedelji (od 7) je potrebno za nedeljni niz.
  nedeljniCiljAktivnihDana: 4,

  // Bonus novčići kad se ostvari nedeljni niz (uz bedž "Logički Majstor").
  novciciZaNedeljniNiz: 5,

  // "Prodavnica privilegija" - porodične pogodnosti umesto slatkiša/igračaka.
  // nivo: "mala" | "srednja" | "velika" (samo utiče na grupisanje na ekranu).
  // ikona: jedno od imena iz ICON_PATHS u index.html (music, book, dice,
  // chefHat, tree su već pripremljeni; slobodno referenciraj i druge).
  prodavnica: [
    { id: "muzika-auto", naziv: "Biranje muzike u autu", cena: 5, nivo: "mala", ikona: "music" },
    { id: "prica-spavanje", naziv: "Biranje večernje priče pred spavanje", cena: 5, nivo: "mala", ikona: "book" },
    { id: "drustvena-igra", naziv: "Biranje društvene igre za porodično veče", cena: 10, nivo: "srednja", ikona: "dice" },
    { id: "glavni-kuvar", naziv: "Uloga glavnog kuvara u kuhinji", cena: 10, nivo: "srednja", ikona: "chefHat" },
    { id: "porodicni-izlet", naziv: "Poseban porodični izlet / park po izboru", cena: 20, nivo: "velika", ikona: "tree" }
  ]
};
