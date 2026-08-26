// Baza zadataka za "Zekinu matematičku igraonicu".
// Ovaj fajl se postepeno širi kako se ubacuju nove strane iz zbirke.
// Svaki zadatak ima: id, kategorija, tezina (1=lako, 2=srednje, 3=teško),
// tekst, opcije (ponuđeni odgovori), odgovor (tačan odgovor iz opcije),
// objasnjenje (kratko, za posle odgovora) i izvor (radi praćenja porekla).

const ZADACI_DB = {
  kategorije: [
    { id: "sabiranje-oduzimanje", naziv: "Sabiranje i oduzimanje", ikonica: "➕", boja: "#FF9F1C" },
    { id: "nizovi-i-obrasci", naziv: "Nizovi i obrasci", ikonica: "🔢", boja: "#2EC4B6" },
    { id: "logicke-zagonetke", naziv: "Logičke zagonetke", ikonica: "🧩", boja: "#E71D73" },
    { id: "nizovi-slova", naziv: "Slovne zagonetke (bonus)", ikonica: "🔤", boja: "#7B61FF" }
  ],

  zadaci: [
    {
      id: 1,
      kategorija: "nizovi-i-obrasci",
      tezina: 2,
      tekst: "Dobro pogledaj ove brojeve: 1, 9, 11, 10, 7, 5, 4, 2, 8, 6, 0, 9, 3. Koliko je tu napisano brojeva koji su manji od 6?",
      opcije: ["1", "2", "3", "4", "6"],
      odgovor: "6",
      objasnjenje: "Brojevi manji od 6 su: 1, 5, 4, 2, 3, 0 — ima ih 6.",
      izvor: "zadatak 54, str. 20"
    },
    {
      id: 2,
      kategorija: "nizovi-i-obrasci",
      tezina: 2,
      tekst: "Dobro pogledaj ove brojeve: 1, 9, 11, 10, 7, 5, 4, 2, 8, 6, 0, 9, 3. Koliko je tu napisano brojeva koji su veći od 7?",
      opcije: ["1", "2", "3", "5", "6"],
      odgovor: "5",
      objasnjenje: "Brojevi veći od 7 su: 9, 11, 10, 8, 9 — ima ih 5.",
      izvor: "zadatak 55, str. 20"
    },
    {
      id: 3,
      kategorija: "sabiranje-oduzimanje",
      tezina: 2,
      tekst: "Koji je to broj koji, bilo da ga dodaš, bilo da ga oduzmeš, ništa ne promeniš?",
      opcije: ["0", "1", "2", "3", "10"],
      odgovor: "0",
      objasnjenje: "Ako broju dodaš 0 ili oduzmeš 0, broj ostaje isti. Na primer: 5+0=5, 5−0=5.",
      izvor: "zadatak 56, str. 20"
    },
    {
      id: 4,
      kategorija: "sabiranje-oduzimanje",
      tezina: 2,
      tekst: "Uroš je broju 8 dodao dva broja i dobio broj 10. Koliko takvih parova brojeva je Uroš otkrio?",
      opcije: ["1", "2", "3", "4", "6"],
      odgovor: "2",
      objasnjenje: "Parovi brojeva čiji je zbir 2 su: 1 i 1, ili 2 i 0 — dakle 2 para.",
      izvor: "zadatak 57, str. 20"
    },
    {
      id: 5,
      kategorija: "sabiranje-oduzimanje",
      tezina: 2,
      tekst: "Andrej je rekao da je od broja 13 oduzeo dva broja i dobio broj 10. Na koliko načina je Andrej rešio taj zadatak?",
      opcije: ["1", "2", "3", "4", "6"],
      odgovor: "2",
      objasnjenje: "13 − 2 − 1 = 10 i 13 − 3 − 0 = 10 — dakle 2 načina.",
      izvor: "zadatak 58, str. 20"
    },
    {
      id: 6,
      kategorija: "sabiranje-oduzimanje",
      tezina: 2,
      tekst: "Prvi sabirak je broj 5. Pronađi koja još 3 sabirka treba dodati broju 5 da bi se dobio zbir 8.",
      opcije: ["1, 0, 1", "2, 0, 0", "0, 1, 1", "1, 1, 1", "0, 0, 2"],
      odgovor: "1, 1, 1",
      objasnjenje: "5 + 1 + 1 + 1 = 8",
      izvor: "zadatak 59, str. 20"
    },
    {
      id: 7,
      kategorija: "sabiranje-oduzimanje",
      tezina: 2,
      tekst: "Zbir tri različita sabirka, od kojih je svaki manji od 3, iznosi 3. Koji su to sabirci?",
      opcije: ["1, 0, 3", "2, 0, 3", "0, 2, 0", "0, 1, 2", "1, 2, 3"],
      odgovor: "0, 1, 2",
      objasnjenje: "0 + 1 + 2 = 3, i sva tri broja su manja od 3.",
      izvor: "zadatak 60, str. 20"
    },
    {
      id: 8,
      kategorija: "sabiranje-oduzimanje",
      tezina: 1,
      tekst: "Zeka je gladan! Zeki su za ručak potrebne 4 šargarepe da bi bio sit. Dobio je samo jednu. Koliko mu još šargarepa treba?",
      opcije: ["1", "2", "3", "4", "6"],
      odgovor: "3",
      objasnjenje: "4 − 1 = 3",
      izvor: "zadatak 61, str. 21"
    },
    {
      id: 9,
      kategorija: "sabiranje-oduzimanje",
      tezina: 2,
      tekst: "Koliko će se dobiti kada se od najmanjeg dvocifrenog broja oduzme najveći jednocifreni broj?",
      opcije: ["1", "2", "3", "4", "6"],
      odgovor: "1",
      objasnjenje: "Najmanji dvocifreni broj je 10, najveći jednocifreni je 9. 10 − 9 = 1.",
      izvor: "zadatak 63, str. 22"
    },
    {
      id: 10,
      kategorija: "sabiranje-oduzimanje",
      tezina: 3,
      tekst: "Milan je jednog dana rešavao redom zadatke iz svoje zbirke. Počeo je sa zadatkom broj 5, a završio sa zadatkom broj 20. Koliko je zadataka Milan tog dana rešio?",
      opcije: ["15", "16", "17", "22", "25"],
      odgovor: "16",
      objasnjenje: "Milan je rešio zadatke od broja 5 do broja 20 — to je 16 zadataka (broji se i prvi i poslednji).",
      izvor: "zadatak 64, str. 22"
    },
    {
      id: 11,
      kategorija: "nizovi-i-obrasci",
      tezina: 1,
      tekst: "Produži niz za još dva člana: 1, 2, 3, 4, 5, 6, __, __",
      opcije: ["1, 2", "3, 4", "5, 6", "6, 7", "7, 8"],
      odgovor: "7, 8",
      objasnjenje: "Brojevi rastu za 1.",
      izvor: "zadatak 65, str. 22"
    },
    {
      id: 12,
      kategorija: "nizovi-i-obrasci",
      tezina: 1,
      tekst: "Produži niz za još dva člana: 2, 4, 6, 8, 10, __, __",
      opcije: ["11, 12", "9, 8", "12, 13", "12, 14", "14, 15"],
      odgovor: "12, 14",
      objasnjenje: "Parni brojevi rastu za 2.",
      izvor: "zadatak 66, str. 22"
    },
    {
      id: 13,
      kategorija: "nizovi-i-obrasci",
      tezina: 1,
      tekst: "Produži niz za još dva člana: 1, 3, 5, 7, 9, __, __",
      opcije: ["11, 12", "10, 12", "10, 11", "11, 13"],
      odgovor: "11, 13",
      objasnjenje: "Neparni brojevi rastu za 2.",
      izvor: "zadatak 67, str. 22"
    },
    {
      id: 14,
      kategorija: "nizovi-i-obrasci",
      tezina: 3,
      tekst: "Produži niz za još dva člana: 13, 1, 13, 2, 13, 3, 13, __, __",
      opcije: ["14, 15", "4, 13", "13, 4", "12, 5", "12, 11"],
      odgovor: "4, 13",
      objasnjenje: "Broj 13 se pojavljuje na svakom neparnom mestu, a između njega redom idu brojevi 1, 2, 3, 4...",
      izvor: "zadatak 68, str. 22"
    },
    {
      id: 15,
      kategorija: "nizovi-i-obrasci",
      tezina: 3,
      tekst: "Odredi sledeći član niza: 1, 2, 4, 7, 11, 16, __",
      opcije: ["15", "16", "17", "22", "25"],
      odgovor: "22",
      objasnjenje: "Svaki put dodajemo za 1 veći broj: +1, +2, +3, +4, +5, +6 → 16+6=22.",
      izvor: "zadatak 69, str. 22"
    },
    {
      id: 16,
      kategorija: "nizovi-slova",
      tezina: 3,
      tekst: "Odredi koje slovo dolazi posle u nizu: J, D, T, Č, P, __",
      opcije: ["A", "T", "Š", "S"],
      odgovor: "Š",
      objasnjenje: "Svako slovo je prvo slovo izgovorenog broja: Jedan, Dva, Tri, Četiri, Pet, Šest.",
      izvor: "zadatak 70, str. 23"
    },
    {
      id: 17,
      kategorija: "nizovi-slova",
      tezina: 3,
      tekst: "Odredi koje slovo dolazi posle u nizu: P, U, S, Č, P, __",
      opcije: ["J", "U", "N", "S"],
      odgovor: "S",
      objasnjenje: "Prva slova dana u nedelji: Ponedeljak, Utorak, Sreda, Četvrtak, Petak, Subota.",
      izvor: "zadatak 71, str. 23"
    },
    {
      id: 18,
      kategorija: "nizovi-slova",
      tezina: 3,
      tekst: "Odredi koje slovo dolazi posle u nizu: J, F, M, A, M, __",
      opcije: ["O", "M", "A", "J"],
      odgovor: "J",
      objasnjenje: "Prva slova meseci: Januar, Februar, Mart, April, Maj, Jun.",
      izvor: "zadatak 72, str. 23"
    },
    {
      id: 19,
      kategorija: "nizovi-i-obrasci",
      tezina: 2,
      tekst: "Niz se ponavlja u grupama od po 4: kruška, jabuka, pečurka, pečurka, kruška, jabuka, pečurka, pečurka, kruška, jabuka... Šta će se naći na desetom mestu?",
      opcije: ["Jabuka", "Kruška", "Pečurka", "Nije jabuka"],
      odgovor: "Jabuka",
      objasnjenje: "Šara se ponavlja na svaka 4 mesta: kruška, jabuka, pečurka, pečurka. Deseto mesto je isto kao šesto — jabuka.",
      izvor: "zadatak 73, str. 23"
    },
    {
      id: 20,
      kategorija: "nizovi-i-obrasci",
      tezina: 2,
      tekst: "Niz balona se ponavlja na svakih 5 balona: sivo srce, belo prazno, crno, belo srce, šareno... Kad nacrtaš još 5 balona na isti način, kako će izgledati deveti balon u celom nizu?",
      opcije: ["Imaće oblik srca sive boje", "Biće balon crne boje", "Biće šareni balon", "Biće srce bele boje"],
      odgovor: "Biće srce bele boje",
      objasnjenje: "Šara se ponavlja na svakih 5 balona. Deveti balon je isti kao četvrti — srce bele boje.",
      izvor: "zadatak 74, str. 23"
    },
    {
      id: 21,
      kategorija: "logicke-zagonetke",
      tezina: 3,
      tekst: "Pažljivo posmatraj tabelu. Cifra desetica je u uspravnoj koloni (1, 3, 6, 8), a cifra jedinica u vodoravnoj koloni (2, 4, 5, 7). Koji broj treba da stoji umesto znaka pitanja?",
      tabela: {
        kolone: [2, 4, 5, 7],
        vrste: [1, 3, 6, 8],
        popunjeno: { "1,7": 17, "3,4": 34, "8,4": 84, "8,5": 85 },
        upitnik: { vrsta: 6, kolona: 7 }
      },
      opcije: ["31", "36", "37", "67", "87"],
      odgovor: "67",
      objasnjenje: "Broj se sastavlja od cifre vrste i cifre kolone: vrsta 6, kolona 7 → 67.",
      izvor: "zadatak 78, str. 25"
    },
    {
      id: 22,
      kategorija: "logicke-zagonetke",
      tezina: 2,
      tekst: "Ovo je tablica sabiranja brojeva od 1 do 4. Koji broj treba da stoji umesto znaka pitanja?",
      tabela: {
        kolone: [1, 2, 3, 4],
        vrste: [1, 2, 3, 4],
        popunjeno: { "1,3": 4, "2,2": 4, "3,1": 4, "3,4": 7 },
        upitnik: { vrsta: 4, kolona: 2 }
      },
      opcije: ["6", "5", "4", "3", "2"],
      odgovor: "6",
      objasnjenje: "U polju stoji zbir broja iz vrste i broja iz kolone: 4 + 2 = 6.",
      izvor: "zadatak 79, str. 25"
    },
    {
      id: 23,
      kategorija: "logicke-zagonetke",
      tezina: 2,
      tekst: "U svaki krug upiši samo po jedan od brojeva 2, 3, 4 i 6, tako da u svakom redu dobiješ tačan rezultat. Koji broj se krije iza znaka pitanja: 6 + 4 − ? = 8",
      jednacine: ["2 + 4 − 6 = 0", "6 − 4 + 3 = 5", "4 + 3 − 6 = 1", "6 + 4 − 3 = 7", "4 + 2 − 3 = 3", "6 + 2 − 4 = 4", "4 + 3 + 2 = 9"],
      opcije: ["2", "3", "4", "6", "9"],
      odgovor: "2",
      objasnjenje: "6 + 4 − 2 = 8",
      izvor: "zadatak 80, str. 25"
    },
    {
      id: 24,
      kategorija: "sabiranje-oduzimanje",
      tezina: 1,
      tekst: "Dva pačeta - koliko tu ima nogu?",
      opcije: ["4", "5", "6", "7", "8"],
      odgovor: "4",
      objasnjenje: "2 + 2 = 4",
      izvor: "zadatak 1, str. 5"
    },
    {
      id: 25,
      kategorija: "sabiranje-oduzimanje",
      tezina: 1,
      tekst: "Jedan tricikl - koliko je tu točkova?",
      opcije: ["1", "2", "3", "4", "6"],
      odgovor: "3",
      objasnjenje: "Tricikl ima 3 točka.",
      izvor: "zadatak 2, str. 5"
    },
    {
      id: 26,
      kategorija: "logicke-zagonetke",
      tezina: 1,
      tekst: "Sa koliko se patuljaka družila Snežana?",
      opcije: ["3", "4", "5", "6", "7"],
      odgovor: "7",
      objasnjenje: "Snežana i sedam patuljaka!",
      izvor: "zadatak 3, str. 5"
    },
    {
      id: 27,
      kategorija: "sabiranje-oduzimanje",
      tezina: 1,
      tekst: "Jedan mačak - koliko je tu ušiju?",
      opcije: ["1", "2", "3", "4", "5"],
      odgovor: "2",
      objasnjenje: "Mačka ima 2 uva.",
      izvor: "zadatak 4, str. 5"
    },
    {
      id: 28,
      kategorija: "sabiranje-oduzimanje",
      tezina: 1,
      tekst: "Dva mačka - koliko je tu nogu?",
      opcije: ["4", "5", "6", "8", "10"],
      odgovor: "8",
      objasnjenje: "Svaki mačak ima 4 noge: 4 + 4 = 8.",
      izvor: "zadatak 5, str. 5"
    },
    {
      id: 29,
      kategorija: "sabiranje-oduzimanje",
      tezina: 1,
      tekst: "Ana je od bake dobila 2 lutkice, a od deke još 3 lutkice. Koliko je lutkica, posle toga, imala Ana?",
      opcije: ["1", "2", "3", "4", "5"],
      odgovor: "5",
      objasnjenje: "2 + 3 = 5",
      izvor: "zadatak 6, str. 6"
    },
    {
      id: 30,
      kategorija: "sabiranje-oduzimanje",
      tezina: 1,
      tekst: "Imaš 12 automobilčića, pa svom drugu pokloniš 5. Koliko ti automobilčića ostaje?",
      opcije: ["8", "7", "6", "5", "4"],
      odgovor: "7",
      objasnjenje: "12 − 5 = 7",
      izvor: "zadatak 7, str. 6"
    },
    {
      id: 31,
      kategorija: "sabiranje-oduzimanje",
      tezina: 1,
      tekst: "Broj 9 je veći od broja 6. Za koliko?",
      opcije: ["1", "2", "3", "4", "6"],
      odgovor: "3",
      objasnjenje: "9 − 6 = 3",
      izvor: "zadatak 9, str. 6"
    },
    {
      id: 32,
      kategorija: "sabiranje-oduzimanje",
      tezina: 1,
      tekst: "Broj 6 je manji od broja 9. Za koliko?",
      opcije: ["6", "5", "4", "3", "2"],
      odgovor: "3",
      objasnjenje: "9 − 6 = 3",
      izvor: "zadatak 10, str. 6"
    },
    {
      id: 33,
      kategorija: "sabiranje-oduzimanje",
      tezina: 1,
      tekst: "Šumom su šetali lav, lavica i njihova 3 lavića. Koliko članova te lavlje porodice je šetalo šumom?",
      opcije: ["2", "3", "4", "5", "6"],
      odgovor: "5",
      objasnjenje: "1 + 1 + 3 = 5",
      izvor: "zadatak 11, str. 7"
    },
    {
      id: 34,
      kategorija: "sabiranje-oduzimanje",
      tezina: 2,
      tekst: "Pored staze u parku raslo je 12 mirisnih ruža. Na 8 ruža sleteo je po jedan leptir. Na koliko ruža nije sleteo ni jedan leptir?",
      opcije: ["1", "2", "3", "4", "6"],
      odgovor: "4",
      objasnjenje: "12 − 8 = 4",
      izvor: "zadatak 12, str. 7"
    },
    {
      id: 35,
      kategorija: "sabiranje-oduzimanje",
      tezina: 2,
      tekst: "Tri devojčice i četiri dečaka doneli su u školsko dvorište po jednu loptu za igranje. Sa koliko najviše lopti mogu oni da se igraju?",
      opcije: ["3", "4", "5", "6", "7"],
      odgovor: "7",
      objasnjenje: "3 + 4 = 7",
      izvor: "zadatak 13, str. 7"
    },
    {
      id: 36,
      kategorija: "sabiranje-oduzimanje",
      tezina: 1,
      tekst: "Ku-ku-ri-ku! Tri petla - koliko tu ima krila?",
      opcije: ["3", "4", "5", "6", "8"],
      odgovor: "6",
      objasnjenje: "Svaki petao ima 2 krila: 2 + 2 + 2 = 6.",
      izvor: "zadatak 14, str. 7"
    },
    {
      id: 37,
      kategorija: "sabiranje-oduzimanje",
      tezina: 1,
      tekst: "Jedna ovčica - četiri noge. Koliko nogu imaju 3 ovčice?",
      opcije: ["6", "8", "12", "14", "16"],
      odgovor: "12",
      objasnjenje: "4 + 4 + 4 = 12",
      izvor: "zadatak 15, str. 7"
    },
    {
      id: 38,
      kategorija: "sabiranje-oduzimanje",
      tezina: 2,
      tekst: "Jednog letnjeg dana, Sunce se pojavilo u 6 sati. Oblak se pojavio u 12 sati i zaklonio Sunce. Koliko sati je Sunce tog jutra sijalo?",
      opcije: ["5", "6", "7", "8", "9"],
      odgovor: "6",
      objasnjenje: "12 − 6 = 6",
      izvor: "zadatak 16, str. 8"
    },
    {
      id: 39,
      kategorija: "sabiranje-oduzimanje",
      tezina: 1,
      tekst: "Tri mačka - koliko je tu prednjih šapica?",
      opcije: ["1", "2", "3", "4", "6"],
      odgovor: "6",
      objasnjenje: "Svaki mačak ima 2 prednje šapice: 2 + 2 + 2 = 6.",
      izvor: "zadatak 17, str. 8"
    },
    {
      id: 40,
      kategorija: "logicke-zagonetke",
      tezina: 2,
      tekst: "Na grani stoje 3 pticice. Šta možemo reći o broju krila i o broju nogu kod tih pticica?",
      opcije: [
        "Broj krila je veći od broja nogu",
        "Broj krila je manji od broja nogu",
        "Broj krila je jednak broju nogu",
        "Broj krila kod sve tri pticice je veći od 6"
      ],
      odgovor: "Broj krila je jednak broju nogu",
      objasnjenje: "Svaka pticica ima 2 noge i 2 krila, pa je broj krila jednak broju nogu.",
      izvor: "zadatak 18, str. 8"
    },
    {
      id: 41,
      kategorija: "sabiranje-oduzimanje",
      tezina: 2,
      tekst: "Jedna ptica kukavica, Paja Patak i dve zebre - koliko je tu nogu?",
      opcije: ["5", "6", "8", "10", "12"],
      odgovor: "12",
      objasnjenje: "2 + 2 + 4 + 4 = 12",
      izvor: "zadatak 19, str. 8"
    },
    {
      id: 42,
      kategorija: "sabiranje-oduzimanje",
      tezina: 2,
      tekst: "Jedno prase, jedno jare i tri petlića - koliko je tu nogu?",
      opcije: ["14", "12", "18", "8", "6"],
      odgovor: "14",
      objasnjenje: "4 + 4 + 2 + 2 + 2 = 14",
      izvor: "zadatak 20, str. 8"
    },
    {
      id: 43,
      kategorija: "sabiranje-oduzimanje",
      tezina: 2,
      tekst: "U prvom dvorištu ima 5 trotineta, u drugom dvorištu 3 trotineta (svaki trotinet ima 2 točka). U kom dvorištu ima više točkova i za koliko?",
      opcije: ["U prvom, za 2", "U drugom, za 2", "U prvom, za 3", "U drugom, za 3", "U prvom, za 4"],
      odgovor: "U prvom, za 4",
      objasnjenje: "U prvom je 5 × 2 = 10 točkova, u drugom 3 × 2 = 6 točkova. 10 − 6 = 4.",
      izvor: "zadatak 21, str. 9"
    },
    {
      id: 44,
      kategorija: "logicke-zagonetke",
      tezina: 2,
      tekst: "Ovde su napisani brojevi 1, 2, 3, 4, 5 i jedno slovo A. Kojem znaku ovde nije mesto?",
      opcije: ["1", "2", "3", "A", "4"],
      odgovor: "A",
      objasnjenje: "A je jedino slovo među brojevima.",
      izvor: "zadatak 22, str. 9"
    },
    {
      id: 45,
      kategorija: "logicke-zagonetke",
      tezina: 1,
      tekst: "Koliko slova ima naša (srpska) azbuka?",
      opcije: ["10", "15", "20", "25", "30"],
      odgovor: "30",
      objasnjenje: "Srpska azbuka ima 30 slova.",
      izvor: "zadatak 23, str. 9"
    },
    {
      id: 46,
      kategorija: "sabiranje-oduzimanje",
      tezina: 1,
      tekst: "Srela se dva zeca. Jedan kaže: \"Ima nas 11 u kavezu.\" Drugi kaže: \"A nas ima 8!\" Koliko tu ima ukupno zečeva?",
      opcije: ["11", "12", "15", "18", "19"],
      odgovor: "19",
      objasnjenje: "11 + 8 = 19",
      izvor: "zadatak 24, str. 9"
    },
    {
      id: 47,
      kategorija: "sabiranje-oduzimanje",
      tezina: 2,
      tekst: "Na drvetu je bilo 6 vrabaca i 4 laste. Onda su, od svih tih ptica, 3 ptice odletele. Koliko je ptica ostalo na drvetu?",
      opcije: ["6", "7", "8", "9", "10"],
      odgovor: "7",
      objasnjenje: "6 + 4 = 10, pa 10 − 3 = 7",
      izvor: "zadatak 25, str. 10"
    },
    {
      id: 48,
      kategorija: "sabiranje-oduzimanje",
      tezina: 2,
      tekst: "Na ogradi je stajalo 6 vrabaca. Zatim im se pridružilo još 5 vrabaca. Prišunjao se mačak i uplašio ih - svi su odleteli! Koliko je vrabaca, posle toga, ostalo na ogradi?",
      opcije: ["11", "6", "5", "1", "0"],
      odgovor: "0",
      objasnjenje: "Svi vrapci su pobegli, pa je ostalo 0.",
      izvor: "zadatak 26, str. 10"
    },
    {
      id: 49,
      kategorija: "sabiranje-oduzimanje",
      tezina: 1,
      tekst: "Na prvom tanjiru ima 4 jabuke. Na drugom isto toliko. Na trećem tanjiru ima isto toliko jabuka koliko i na drugom. Koliko jabuka ima na trećem tanjiru?",
      opcije: ["4", "6", "8", "10", "12"],
      odgovor: "4",
      objasnjenje: "Na trećem tanjiru ima isto koliko i na drugom - 4 jabuke.",
      izvor: "zadatak 28, str. 10"
    },
    {
      id: 50,
      kategorija: "sabiranje-oduzimanje",
      tezina: 2,
      tekst: "Na prvom tanjiru ima 4 jabuke. Na drugom isto toliko, a na trećem koliko na prvom i drugom zajedno. Koliko jabuka ima na trećem tanjiru?",
      opcije: ["16", "12", "10", "8", "6"],
      odgovor: "8",
      objasnjenje: "4 + 4 = 8",
      izvor: "zadatak 29, str. 11"
    },
    {
      id: 51,
      kategorija: "sabiranje-oduzimanje",
      tezina: 2,
      tekst: "Na prvom tanjiru ima 4 jabuke. Na drugom tanjiru ima 2 jabuke više nego na prvom, a na trećem tanjiru ima koliko na prvom i na drugom tanjiru zajedno. Koliko jabuka ima na trećem tanjiru?",
      opcije: ["16", "12", "10", "8", "6"],
      odgovor: "10",
      objasnjenje: "Prvi tanjir: 4. Drugi: 4+2=6. Treći: 4+6=10.",
      izvor: "zadatak 30, str. 11"
    },
    {
      id: 52,
      kategorija: "logicke-zagonetke",
      tezina: 2,
      tekst: "U vrtiću ima 3 lutkice i 6 kolica za lutke. Koliko još lutkica treba nabaviti da bi u vrtiću bilo isto toliko lutkica koliko i kolica?",
      opcije: ["1", "2", "3", "4", "6"],
      odgovor: "3",
      objasnjenje: "6 − 3 = 3",
      izvor: "zadatak 33, str. 13"
    },
    {
      id: 53,
      kategorija: "sabiranje-oduzimanje",
      tezina: 2,
      tekst: "Pčelice su krenule iz košnice u ranu zoru i ostale na livadi sve do 11 sati. U koliko sati su krenule, ako se zna da su vredno sakupljale med tačno 7 sati?",
      opcije: ["1", "2", "3", "4", "6"],
      odgovor: "4",
      objasnjenje: "11 − 7 = 4",
      izvor: "zadatak 34, str. 13"
    },
    {
      id: 54,
      kategorija: "sabiranje-oduzimanje",
      tezina: 1,
      tekst: "Krava Belka ujutru daje 7 litara mleka, a istog dana uveče daje 8 litara mleka. Koliko litara mleka daje Belka u toku jednog dana?",
      opcije: ["12", "13", "14", "15", "16"],
      odgovor: "15",
      objasnjenje: "7 + 8 = 15",
      izvor: "zadatak 35, str. 13"
    },
    {
      id: 55,
      kategorija: "sabiranje-oduzimanje",
      tezina: 1,
      tekst: "Mleko je još vruće. Mačka treba da sačeka još pola sata. Koliko je to minuta?",
      opcije: ["10", "15", "20", "25", "30"],
      odgovor: "30",
      objasnjenje: "Pola sata = 30 minuta.",
      izvor: "zadatak 36, str. 13"
    },
    {
      id: 56,
      kategorija: "sabiranje-oduzimanje",
      tezina: 1,
      tekst: "Kad poželi da prošeta kroz svih 5 kula svog dvorca, princ treba da otključa vrata na svakoj kuli. Koliko ključeva treba da ponese?",
      opcije: ["1", "2", "3", "4", "5"],
      odgovor: "5",
      objasnjenje: "Za 5 kula treba 5 ključeva - po jedan za svaku.",
      izvor: "zadatak 37, str. 14"
    },
    {
      id: 57,
      kategorija: "logicke-zagonetke",
      tezina: 2,
      tekst: "Pero, Pero! Koliko cifara znaš?",
      opcije: ["Naravno: 10", "9", "8", "7", "Mnogo"],
      odgovor: "Naravno: 10",
      objasnjenje: "Cifre su: 0, 1, 2, 3, 4, 5, 6, 7, 8, 9 - ima ih 10.",
      izvor: "zadatak 38, str. 14"
    },
    {
      id: 58,
      kategorija: "logicke-zagonetke",
      tezina: 2,
      tekst: "Pero, Pero! A zašto smo učili sve te cifre?",
      opcije: [
        "Da bismo znali da brojimo",
        "Da bismo znali da računamo",
        "Da bismo znali da sabiramo do 20",
        "Da bismo znali da pišemo sve brojeve: jednocifrene, dvocifrene, trocifrene, itd."
      ],
      odgovor: "Da bismo znali da pišemo sve brojeve: jednocifrene, dvocifrene, trocifrene, itd.",
      objasnjenje: "Pomoću samo 10 cifara možemo napisati baš svaki broj.",
      izvor: "zadatak 39, str. 14"
    },
    {
      id: 59,
      kategorija: "logicke-zagonetke",
      tezina: 3,
      tekst: "Na brojčaniku sata vidimo brojeve 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12. Koliki je zbir svih cifara (pojedinačno), a koliki zbir svih tih brojeva?",
      opcije: [
        "Zbir cifara 50, zbir brojeva 70",
        "To je nemoguće izračunati",
        "Zbir cifara 51, zbir brojeva 78",
        "Ti zbirovi su jednaki"
      ],
      odgovor: "Zbir cifara 51, zbir brojeva 78",
      objasnjenje: "Zbir brojeva 1 do 12 je 78. Zbir cifara (1+2+...+9+1+0+1+1+1+2) je 51.",
      izvor: "zadatak 40, str. 15"
    },
    {
      id: 60,
      kategorija: "logicke-zagonetke",
      tezina: 3,
      tekst: "Na jedrima brodova napisani su brojevi: 1, 9, 10, 8, 4, 3, 6, 3. Koliko je ukupno cifara napisano na svim tim jedrima?",
      opcije: ["6", "8", "9", "10", "12"],
      odgovor: "9",
      objasnjenje: "Svi brojevi su jednocifreni (7 komada), osim broja 10 koji ima 2 cifre. 7 + 2 = 9.",
      izvor: "zadatak 41, str. 15"
    },
    {
      id: 61,
      kategorija: "sabiranje-oduzimanje",
      tezina: 2,
      tekst: "Deset kosmonauta je poređano redom od 10 do 1, ali dvojici nedostaje broj: 10, 9, 8, ?, 6, 5, 4, ?, 2, 1. Izračunaj razliku većeg i manjeg od ta dva nedostajuća broja.",
      opcije: ["10", "9", "6", "4", "3"],
      odgovor: "4",
      objasnjenje: "Nedostaju brojevi 7 i 3. Njihova razlika je 7 − 3 = 4.",
      izvor: "zadatak 42, str. 15"
    },
    {
      id: 62,
      kategorija: "logicke-zagonetke",
      tezina: 2,
      tekst: "Koji broj treba staviti umesto praznog mesta da bude tačno: ? + 2 = 8",
      opcije: ["3", "5", "6", "7", "Nema takvog broja"],
      odgovor: "6",
      objasnjenje: "6 + 2 = 8",
      izvor: "zadatak 44, str. 16"
    },
    {
      id: 63,
      kategorija: "logicke-zagonetke",
      tezina: 3,
      tekst: "Tamara je imala 4 balona. Neki su bili zeleni, a neki žuti. Zelenih je bilo više nego žutih. Koliko je bilo žutih?",
      opcije: ["1", "2", "3", "4", "6"],
      odgovor: "1",
      objasnjenje: "Da je bilo isto zelenih i žutih, bilo bi po 2. Ali zelenih ima više, pa ostaje samo 1 žuti balon.",
      izvor: "zadatak 45, str. 16"
    },
    {
      id: 64,
      kategorija: "sabiranje-oduzimanje",
      tezina: 2,
      tekst: "Majstor Sima treba da zakuca 10 ekserčića čekićem. Svaki ekserčić treba da udari po dva puta. Sa koliko udaraca čekićem će majstor Sima završiti taj posao?",
      opcije: ["10", "12", "18", "20", "22"],
      odgovor: "20",
      objasnjenje: "10 × 2 = 20",
      izvor: "zadatak 49, str. 18"
    },
    {
      id: 65,
      kategorija: "sabiranje-oduzimanje",
      tezina: 2,
      tekst: "Na tanjiru su bile 4 jabuke i 6 trešanja. Došla su deca i pojela sve jabuke i isto toliko trešanja (4 trešnje). Koliko je trešanja ostalo na tanjiru?",
      opcije: ["1", "2", "3", "4", "6"],
      odgovor: "2",
      objasnjenje: "6 − 4 = 2",
      izvor: "zadatak 50, str. 18"
    },
    {
      id: 66,
      kategorija: "sabiranje-oduzimanje",
      tezina: 1,
      tekst: "Lukina mama je imala 3 kruške i svaku je presekla tačno na pola. Koliko je delova nastalo?",
      opcije: ["3", "6", "8", "9", "12"],
      odgovor: "6",
      objasnjenje: "3 kruške × 2 polovine = 6.",
      izvor: "zadatak 51, str. 18"
    },
    {
      id: 67,
      kategorija: "logicke-zagonetke",
      tezina: 3,
      tekst: "Koliko je grešaka napravljeno u ovim jednačinama? 2+4=5, 4+4=8, 7−3=5, 3−3=1, 9−2=6, 9+0=9, 2+5=7, 8−0=7, 2+6=9",
      opcije: ["1", "2", "3", "4", "6"],
      odgovor: "6",
      objasnjenje: "Tačno su samo: 4+4=8, 9+0=9 i 2+5=7. Ostalih 6 jednačina je pogrešno.",
      izvor: "zadatak 53, str. 19"
    },
    {
      id: 68,
      kategorija: "sabiranje-oduzimanje",
      tezina: 1,
      tekst: "Marija se sprema za rekreativnu nastavu. Mama joj je pripremila 8 pari čarapica. Koliko je to komada čarapica?",
      opcije: ["8", "10", "12", "14", "16"],
      odgovor: "16",
      objasnjenje: "8 pari × 2 = 16 komada.",
      izvor: "zadatak 81, str. 26"
    },
    {
      id: 69,
      kategorija: "sabiranje-oduzimanje",
      tezina: 1,
      tekst: "U družini ima 10 dece. Učiteljica ih razvrstava u parove (grupe od po 2 deteta). Koliko će parova napraviti?",
      opcije: ["2", "4", "5", "6", "10"],
      odgovor: "5",
      objasnjenje: "10 : 2 = 5 parova.",
      izvor: "zadatak 82, str. 26"
    },
    {
      id: 70,
      kategorija: "sabiranje-oduzimanje",
      tezina: 2,
      tekst: "Ista družina od 10 dece sada se razvrstava u grupe od po 3 učenika. Koliko će učenika ostati neraspoređeno?",
      opcije: ["1", "2", "3", "4", "6"],
      odgovor: "1",
      objasnjenje: "10 = 3+3+3+1, pa 1 učenik ostaje neraspoređen.",
      izvor: "zadatak 83, str. 26"
    },
    {
      id: 71,
      kategorija: "sabiranje-oduzimanje",
      tezina: 1,
      tekst: "Četiri skijaša - svaki ima na sebi jedan par cipela i jedan par skija. Koliko je ukupno pari cipela, a koliko pari skija?",
      opcije: ["8 cipela, 4 para skija", "4 para cipela, 2 para skija", "6 cipela, 4 para skija", "4 para cipela, 4 para skija"],
      odgovor: "4 para cipela, 4 para skija",
      objasnjenje: "Svaki od 4 skijaša ima 1 par cipela i 1 par skija.",
      izvor: "zadatak 84, str. 26"
    },
    {
      id: 72,
      kategorija: "sabiranje-oduzimanje",
      tezina: 1,
      tekst: "Pera se vratio sa zimovanja. Na slici mama suši 10 čarapa okačenih na konopcu. Koliko pari čarapa je to?",
      opcije: ["1", "2", "3", "4", "5"],
      odgovor: "5",
      objasnjenje: "10 : 2 = 5 pari.",
      izvor: "zadatak 85, str. 27"
    },
    {
      id: 73,
      kategorija: "sabiranje-oduzimanje",
      tezina: 1,
      tekst: "Na boru iglice rastu u parovima. Koliko iglica ima u 5 parova?",
      opcije: ["5", "6", "8", "10", "12"],
      odgovor: "10",
      objasnjenje: "5 × 2 = 10",
      izvor: "zadatak 86, str. 27"
    },
    {
      id: 74,
      kategorija: "logicke-zagonetke",
      tezina: 2,
      tekst: "Učiteljica želi da razvrsta 7 dece u parove za igru. Pošto se ne mogu svi upariti, koliko dece će morati da sačeka da se igra završi?",
      opcije: ["0", "1", "2", "3", "4"],
      odgovor: "1",
      objasnjenje: "7 je neparan broj, pa jedno dete ostaje bez para.",
      izvor: "zadatak 87, str. 28"
    },
    {
      id: 75,
      kategorija: "logicke-zagonetke",
      tezina: 2,
      tekst: "Ako napišeš parne brojeve od 2 do 20 (2,4,...,20) i neparne brojeve od 1 do 19 (1,3,...,19), šta važi?",
      opcije: ["Parnih ima više", "Neparnih ima više", "Parnih i neparnih brojeva ima jednako", "U prvom redu ima 20 parnih brojeva"],
      odgovor: "Parnih i neparnih brojeva ima jednako",
      objasnjenje: "U oba reda ima po 10 brojeva.",
      izvor: "zadatak 88, str. 28"
    },
    {
      id: 76,
      kategorija: "logicke-zagonetke",
      tezina: 1,
      tekst: "Kad prođeš ulicom, na kućama vidiš kućne brojeve. Šta je zajedničko za kućne brojeve na jednoj strani ulice, a šta za one na drugoj strani?",
      opcije: [
        "Na svakoj strani ulice brojevi su napisani redom: 1,2,3,...",
        "Na jednoj strani ulice su kuće sa parnim brojevima, a na drugoj kuće sa neparnim brojevima",
        "Na svakoj strani ulice uvek postoji isti broj kuća",
        "Nema nikakvog pravila u ređanju kućnih brojeva"
      ],
      odgovor: "Na jednoj strani ulice su kuće sa parnim brojevima, a na drugoj kuće sa neparnim brojevima",
      objasnjenje: "Tako su po pravilu numerisane ulice - parni brojevi na jednoj strani, neparni na drugoj.",
      izvor: "zadatak 89, str. 29"
    },
    {
      id: 77,
      kategorija: "logicke-zagonetke",
      tezina: 2,
      tekst: "Ima jedna kratka ulica. Na svakoj strani te ulice ima samo po 5 kuća (kućni brojevi 1 do 10). Koliko je ukupno cifara napisano na svim tablicama u toj ulici?",
      opcije: ["8", "9", "10", "11", "12"],
      odgovor: "11",
      objasnjenje: "Brojevi 1-9 imaju po 1 cifru (9 cifara), a broj 10 ima 2 cifre. Ukupno 9+2=11.",
      izvor: "zadatak 90, str. 29"
    },
    {
      id: 78,
      kategorija: "logicke-zagonetke",
      tezina: 2,
      tekst: "Na dve police stavljeno je 15 knjiga (neparan broj). Šta mora da važi?",
      opcije: [
        "Na svakoj polici je isti broj knjiga",
        "Na svakoj polici je paran broj knjiga",
        "Na svakoj polici je neparan broj knjiga",
        "Na jednoj polici je paran, a na drugoj neparan broj knjiga"
      ],
      odgovor: "Na jednoj polici je paran, a na drugoj neparan broj knjiga",
      objasnjenje: "Paran + neparan broj = neparan zbir (15). Da su oba ista (i parna i neparna), zbir bi bio paran.",
      izvor: "zadatak 91, str. 29"
    },
    {
      id: 79,
      kategorija: "logicke-zagonetke",
      tezina: 2,
      tekst: "Ana kaže: svi neparni brojevi u ovoj knjizi napisani su crvenom bojom. Jelena dodaje: a svi parni brojevi napisani su plavom bojom. Kojom bojom bi bio napisan broj koji predstavlja zbir jednog parnog i jednog neparnog broja?",
      opcije: ["Crvenom", "Plavom", "Ljubičastom", "Nemoguće je odrediti"],
      odgovor: "Crvenom",
      objasnjenje: "Zbir parnog i neparnog broja je uvek neparan broj (npr. 6+3=9), pa bi bio crven.",
      izvor: "zadatak 92, str. 30"
    },
    {
      id: 80,
      kategorija: "logicke-zagonetke",
      tezina: 2,
      tekst: "Za koliko je zbir svih parnih brojeva prve desetice (2+4+6+8+10) veći od zbira svih neparnih brojeva prve desetice (1+3+5+7+9)?",
      opcije: ["Za 5", "Za 10", "Za 15", "Za 20"],
      odgovor: "Za 5",
      objasnjenje: "(2+4+6+8+10) − (1+3+5+7+9) = 30 − 25 = 5",
      izvor: "zadatak 93, str. 30"
    },
    {
      id: 81,
      kategorija: "logicke-zagonetke",
      tezina: 1,
      tekst: "Najmanji dvocifreni broj koji se piše jednakim ciframa (obe cifre iste) je broj:",
      opcije: ["99", "22", "33", "11", "66"],
      odgovor: "11",
      objasnjenje: "11 je najmanji takav broj.",
      izvor: "zadatak 94, str. 31"
    },
    {
      id: 82,
      kategorija: "logicke-zagonetke",
      tezina: 2,
      tekst: "Koliko ima dvocifrenih brojeva koji se pišu jednakim ciframa (kao 11, 22, 33...)?",
      opcije: ["8", "9", "10", "12", "16"],
      odgovor: "9",
      objasnjenje: "To su brojevi: 11, 22, 33, 44, 55, 66, 77, 88, 99 - ima ih 9.",
      izvor: "zadatak 95, str. 31"
    },
    {
      id: 83,
      kategorija: "logicke-zagonetke",
      tezina: 2,
      tekst: "Koliko ima brojeva u prvoj desetici (1 do 10) koji imaju dvocifrenog sledbenika (sledeći broj ima dve cifre)?",
      opcije: ["1", "2", "3", "4", "6"],
      odgovor: "2",
      objasnjenje: "To su brojevi 9 i 10 - njihovi sledbenici su 10 i 11.",
      izvor: "zadatak 96, str. 31"
    },
    {
      id: 84,
      kategorija: "sabiranje-oduzimanje",
      tezina: 2,
      tekst: "Đole je napisao 16 u obliku zbira 4 jednaka sabirka: 16 = ? + ? + ? + ?. Koji je broj Đole upisao?",
      opcije: ["8", "6", "4", "3", "2"],
      odgovor: "4",
      objasnjenje: "16 = 4+4+4+4",
      izvor: "zadatak 97, str. 31"
    },
    {
      id: 85,
      kategorija: "logicke-zagonetke",
      tezina: 3,
      tekst: "Isekao si 4 kartončića od kartona i napisao brojeve 1, 3, 4 i 6. Kartončiće možeš premeštati, pa čak i okrenuti naopako (kartončić sa brojem 6 okrenut izgleda kao 9!). Koji je najveći zbir koji možeš dobiti sabiranjem ta četiri broja?",
      opcije: ["13", "14", "15", "17", "19"],
      odgovor: "17",
      objasnjenje: "Kad broj 6 okreneš, dobijaš 9: 1+3+4+9=17.",
      izvor: "zadatak 98, str. 32"
    },
    {
      id: 86,
      kategorija: "logicke-zagonetke",
      tezina: 3,
      tekst: "Isekao si 4 kartončića od kartona i napisao brojeve 1, 2, 8 i 9. Kartončiće možeš premeštati, pa čak i okrenuti naopako (kartončić sa brojem 9 okrenut izgleda kao 6!). Koji je najmanji zbir koji možeš dobiti sabiranjem ta četiri broja?",
      opcije: ["13", "14", "15", "17", "19"],
      odgovor: "17",
      objasnjenje: "Kad broj 9 okreneš, dobijaš 6: 1+2+8+6=17.",
      izvor: "zadatak 99, str. 32"
    },
    {
      id: 87,
      kategorija: "sabiranje-oduzimanje",
      tezina: 2,
      tekst: "Na parkingu su stajali bicikli i automobili, i to isti broj automobila i bicikala. Ukupno je izbrojano 18 točkova. Koliko je bicikala bilo na parkingu?",
      opcije: ["3", "4", "5", "6", "8"],
      odgovor: "3",
      objasnjenje: "Svaki par (1 bicikl + 1 automobil) ima 2+4=6 točkova. 18 : 6 = 3 para, znači 3 bicikla.",
      izvor: "zadatak 100, str. 32"
    },
    {
      id: 88,
      kategorija: "sabiranje-oduzimanje",
      tezina: 2,
      tekst: "U kavezu se nalaze zečevi i pilići. Ukupno imaju 4 glave i 10 nogu. Koliko tu ima zečeva (zec ima 4 noge, pile 2 noge)?",
      opcije: ["0", "1", "2", "3", "4"],
      odgovor: "1",
      objasnjenje: "Da su sve 4 životinje pilići, bilo bi 8 nogu. Višak od 2 noge (10-8) pripada jednom zecu.",
      izvor: "zadatak 101, str. 32"
    },
    {
      id: 89,
      kategorija: "logicke-zagonetke",
      tezina: 3,
      tekst: "U dvorištu su deca vozila bicikle (2 točka) i tricikle (3 točka), i bilo je bar jedan od svakog. Mama je izbrojala ukupno 10 točkova. Koliko je bicikala bilo u dvorištu?",
      opcije: ["2", "6", "8", "10", "12"],
      odgovor: "2",
      objasnjenje: "10 se mora rastaviti kao zbir dvojki i trojki uz bar jednu od svake: 2+2+3+3=10, dakle 2 bicikla i 2 tricikla.",
      izvor: "zadatak 102, str. 32"
    },
    {
      id: 90,
      kategorija: "sabiranje-oduzimanje",
      tezina: 1,
      tekst: "Milica i Milena su u svojim korpicama imale po 5 jabuka. Onda je Milena poklonila Milici jednu jabuku. Ko posle toga ima više jabuka i za koliko?",
      opcije: ["Milena, za 1 jabuku", "Milica, za 1 jabuku", "Milena, za 2 jabuke", "Milica, za 2 jabuke"],
      odgovor: "Milica, za 2 jabuke",
      objasnjenje: "Milica: 5+1=6, Milena: 5-1=4. Razlika je 2.",
      izvor: "zadatak 103, str. 33"
    },
    {
      id: 91,
      kategorija: "logicke-zagonetke",
      tezina: 2,
      tekst: "U dva kaveza bio je isti broj zečeva (ali ne znamo po koliko). Jedan zec je prešao iz prvog u drugi kavez. U kom kavezu je, posle toga, bilo više zečeva i za koliko?",
      opcije: ["U prvom, za 1", "U drugom, za 1", "U prvom, za 2", "U drugom, za 2", "Nemoguće izračunati"],
      odgovor: "U drugom, za 2",
      objasnjenje: "Prvi kavez gubi 1, drugi dobija 1 - razlika između njih postaje 2, u korist drugog.",
      izvor: "zadatak 104, str. 33"
    },
    {
      id: 92,
      kategorija: "logicke-zagonetke",
      tezina: 2,
      tekst: "Joca i Moca imaju isti broj klikera (kliker=kuglica za igru). Ako Joca pokloni Moci jedan kliker, ko će posle toga imati više klikera i za koliko?",
      opcije: ["Joca, za 1", "Moca, za 1", "Joca, za 2", "Moca, za 2"],
      odgovor: "Moca, za 2",
      objasnjenje: "Moca dobija 1 (postaje veći za 1), Joca gubi 1 (postaje manji za 1) - razlika je 2.",
      izvor: "zadatak 105, str. 34"
    },
    {
      id: 93,
      kategorija: "logicke-zagonetke",
      tezina: 2,
      tekst: "Joca je u svakom od svoja dva džepa imao isti broj klikera. Ako Joca izvadi iz levog džepa 2 klikera i prebaci ih u desni džep, u kom džepu će posle toga Joca imati više klikera i za koliko?",
      opcije: ["U levom, za 2", "U desnom, za 2", "U levom, za 4", "U desnom, za 4"],
      odgovor: "U desnom, za 4",
      objasnjenje: "Levi džep gubi 2, desni dobija 2 - razlika je 4, u korist desnog.",
      izvor: "zadatak 106, str. 34"
    },
    {
      id: 94,
      kategorija: "sabiranje-oduzimanje",
      tezina: 2,
      tekst: "Kaća ima 3 bombone više od Nade. Kaća je pojela 3 bombone, a Nada je od mame dobila još 5 bombona. Ko sada ima više bombona i za koliko?",
      opcije: ["Kaća, za 3", "Nada, za 3", "Kaća, za 5", "Nada, za 5"],
      odgovor: "Nada, za 5",
      objasnjenje: "Kad Kaća pojede 3 bombone, obe devojčice imaju isti broj. Onda Nada dobije još 5, pa je za 5 ispred.",
      izvor: "zadatak 107, str. 35"
    },
    {
      id: 95,
      kategorija: "logicke-zagonetke",
      tezina: 2,
      tekst: "Filip je viši od Jelene, ali je niži od Tome, a Peđa i Filip su iste visine. Ko je najviši među njima?",
      opcije: ["Filip", "Jelena", "Toma", "Peđa", "Svi su iste visine"],
      odgovor: "Toma",
      objasnjenje: "Jelena < Filip = Peđa < Toma, pa je Toma najviši.",
      izvor: "zadatak 108, str. 35"
    },
    {
      id: 96,
      kategorija: "logicke-zagonetke",
      tezina: 2,
      tekst: "Kaja je viša od Ane, ali niža od Maše, a Jelena je najniža od sve četiri devojčice. Na slici, devojčica koja drži mačku je najviša od svih. Kako se ona zove?",
      opcije: ["Kaja", "Ana", "Maša", "Jelena"],
      odgovor: "Maša",
      objasnjenje: "Redosled po visini: Jelena < Ana < Kaja < Maša, pa je Maša najviša.",
      izvor: "zadatak 109, str. 35"
    },
    {
      id: 97,
      kategorija: "logicke-zagonetke",
      tezina: 2,
      tekst: "Na slici su tri praseta: Njuf, Njaf i Njif. Njihov drugar Njef, koji je najdeblji od svih, nije hteo da se slika. Njuf je debiji od Njafa, a Njaf je debiji od Njifa. Ko je najmršaviji?",
      opcije: ["Njuf", "Njef", "Njif", "Njaf"],
      odgovor: "Njif",
      objasnjenje: "Redosled: Njef > Njuf > Njaf > Njif, pa je Njif najmršaviji.",
      izvor: "zadatak 110, str. 36"
    },
    {
      id: 98,
      kategorija: "logicke-zagonetke",
      tezina: 2,
      tekst: "Steva, Vlada i Darko su rešavali zadatke iz matematike. Zna se da je jedan dečak rešio 12 zadataka, drugi 13, a treći 14 zadataka. Takođe se zna da je Steva rešio manje zadataka nego Darko, a Darko manje nego Vlada. Koliko zadataka je rešio Darko?",
      opcije: ["11", "12", "13", "14", "Nemoguće je rešiti"],
      odgovor: "13",
      objasnjenje: "Steva < Darko < Vlada, pa je Steva=12, Darko=13, Vlada=14.",
      izvor: "zadatak 111, str. 36"
    },
    {
      id: 99,
      kategorija: "logicke-zagonetke",
      tezina: 2,
      tekst: "Voja, Saša i Andrija su od papira napravili igračke: mačka, brodić, rodu i zmaja. Voja nije napravio ni brodić, ni mačku ni zmaja. Saša je napravio mačka i zmaja (dve igračke). Koju igračku je napravio Andrija?",
      opcije: ["Brodić", "Rodu", "Zmaja", "Mačku"],
      odgovor: "Brodić",
      objasnjenje: "Voja je napravio rodu (jedino što mu je ostalo). Saša je napravio mačka i zmaja. Andriji ostaje brodić.",
      izvor: "zadatak 112, str. 36"
    },
    {
      id: 100,
      kategorija: "logicke-zagonetke",
      tezina: 2,
      tekst: "Zoran, Miša, Marko i Vlada nosili su stolice. Miša je nosio onoliko stolica koliko Marko i Vlada zajedno, a Zoran manje od Marka. Ko je nosio najviše stolica?",
      opcije: ["Zoran", "Marko", "Vlada", "Miša", "Nemoguće je odrediti"],
      odgovor: "Miša",
      objasnjenje: "Miša = Marko + Vlada, pa Miša ima više od svakog pojedinačno.",
      izvor: "zadatak 114, str. 37"
    },
    {
      id: 101,
      kategorija: "sabiranje-oduzimanje",
      tezina: 1,
      tekst: "Pera ima 20 dinara, a kliker košta 4 dinara. Koliko klikera može Pera da kupi?",
      opcije: ["1", "2", "3", "4", "5"],
      odgovor: "5",
      objasnjenje: "20 : 4 = 5",
      izvor: "zadatak 117, str. 39"
    },
    {
      id: 102,
      kategorija: "sabiranje-oduzimanje",
      tezina: 2,
      tekst: "Tetka Ljilja je brojala. Njena kokoška je tokom 10 dana svakog dana snela po jedno jaje. Ali, svakog drugog dana nailazile su ptice grabljivice i odnosile po jedno jaje. Koliko je jaja imala tetka Ljilja posle 10 dana?",
      opcije: ["20", "18", "14", "10", "5"],
      odgovor: "5",
      objasnjenje: "Kokoška snese 10 jaja, ali grabljivice odnesu tačno polovinu (svakog drugog dana) - ostaje 5.",
      izvor: "zadatak 118, str. 39"
    },
    {
      id: 103,
      kategorija: "logicke-zagonetke",
      tezina: 3,
      tekst: "Miki je slavio treći rođendan i izabrao 3 različite svećice za svoju okruglu tortu. Na koliko različitih načina može Mikijeva mama da rasporedi svećice na torti u krug (po obodu)?",
      opcije: ["1", "2", "3", "4", "6"],
      odgovor: "2",
      objasnjenje: "Kad fiksiramo jednu sveću, preostale dve se mogu rasporediti na 2 načina (levo/desno).",
      izvor: "zadatak 119, str. 39"
    },
    {
      id: 104,
      kategorija: "sabiranje-oduzimanje",
      tezina: 1,
      tekst: "Dok je šetao sa bakom, unuk je pojeo 5 bombona. Dok je baka sedela i pila kafu, unuk je pojeo 2 bombone manje nego dok je šetao. Koliko je ukupno bombona unuk pojeo?",
      opcije: ["7", "8", "9", "10", "14"],
      odgovor: "8",
      objasnjenje: "5 + (5-2) = 5+3 = 8",
      izvor: "zadatak 120, str. 40"
    },
    {
      id: 105,
      kategorija: "sabiranje-oduzimanje",
      tezina: 1,
      tekst: "Dok je šetao sa bakom, unuk je upitao: \"Koliko, bako, imaš jabuka u toj kesi?\" A baka je odgovorila: \"Nedostaju mi 3 jabuke, pa da ih bude tačno 20.\" Koliko jabuka je baka imala u kesi?",
      opcije: ["20", "18", "17", "15", "3"],
      odgovor: "17",
      objasnjenje: "20 − 3 = 17",
      izvor: "zadatak 122, str. 40"
    },
    {
      id: 106,
      kategorija: "sabiranje-oduzimanje",
      tezina: 1,
      tekst: "U prvoj kućici živi porodica sa jednim detetom, u drugoj porodica sa 2 deteta, i tako redom do pete kućice u kojoj živi petoro dece. Koliko ukupno dece žive u ovih 5 kućica?",
      opcije: ["5", "7", "9", "10", "15"],
      odgovor: "15",
      objasnjenje: "1+2+3+4+5=15",
      izvor: "zadatak 124, str. 41"
    },
    {
      id: 107,
      kategorija: "logicke-zagonetke",
      tezina: 2,
      tekst: "Mišo je presekao makazama kanap na 4 mesta. Koliko je parčića kanapa dobio?",
      opcije: ["4", "5", "6", "7", "8"],
      odgovor: "5",
      objasnjenje: "Sečenjem na 4 mesta konopac se deli na 5 delova (broj delova je uvek za 1 veći od broja mesta sečenja).",
      izvor: "zadatak 131, str. 45"
    },
    {
      id: 108,
      kategorija: "logicke-zagonetke",
      tezina: 2,
      tekst: "Mišo je presekao makazama kanap na 10 mesta. Koliko je parčića kanapa dobio?",
      opcije: ["10", "11", "15", "18", "20"],
      odgovor: "11",
      objasnjenje: "Broj delova je uvek za 1 veći od broja mesta sečenja: 10+1=11.",
      izvor: "zadatak 132, str. 45"
    },
    {
      id: 109,
      kategorija: "logicke-zagonetke",
      tezina: 2,
      tekst: "Kanap treba podeliti na 5 delova. Na koliko mesta ga treba seći?",
      opcije: ["4", "5", "6", "7", "10"],
      odgovor: "4",
      objasnjenje: "Za 5 delova treba seći na 4 mesta (za 1 manje od broja delova).",
      izvor: "zadatak 133, str. 45"
    },
    {
      id: 110,
      kategorija: "sabiranje-oduzimanje",
      tezina: 1,
      tekst: "Voja je pred sobom imao štanglu čokolade podeljenu na 4 kvadratića (znači ima 3 mesta za lomljenje - žljeba). Lomio je tačno po žljebovima. Koliko je jednakih delova dobio?",
      opcije: ["4", "5", "6", "7", "8"],
      odgovor: "4",
      objasnjenje: "Štangla ima 4 kvadratića, pa lomljenjem po svim žlebovima dobija se 4 dela.",
      izvor: "zadatak 134, str. 46"
    },
    {
      id: 111,
      kategorija: "sabiranje-oduzimanje",
      tezina: 1,
      tekst: "Ista štangla čokolade (4 kvadratića, 3 žljeba). Koliko lomljenja treba Voja da izvrši, tačno po žljebovima, da bi dobio sva 4 jednaka dela?",
      opcije: ["6", "5", "4", "3", "2"],
      odgovor: "3",
      objasnjenje: "Za 4 dela potrebna su 3 lomljenja (broj lomljenja je uvek za 1 manji od broja delova).",
      izvor: "zadatak 135, str. 46"
    },
    {
      id: 112,
      kategorija: "logicke-zagonetke",
      tezina: 2,
      tekst: "Čokolada je podeljena na kvadratiće žljebovima. Koliko lomljenja treba da izvršimo, tačno po žljebovima, da bismo dobili 6 jednakih delova?",
      opcije: ["6", "5", "4", "3", "2"],
      odgovor: "5",
      objasnjenje: "Svakim lomom broj delova raste za 1, počevši od 1 dela. Za 6 delova treba 5 lomova.",
      izvor: "zadatak 136, str. 46"
    },
    {
      id: 113,
      kategorija: "logicke-zagonetke",
      tezina: 2,
      tekst: "Čokolada je podeljena na kvadratiće žljebovima. Koliko lomljenja treba da izvršimo, tačno po žljebovima, da bismo dobili 8 jednakih delova?",
      opcije: ["6", "7", "8", "9", "10"],
      odgovor: "7",
      objasnjenje: "Za 8 delova treba 7 lomova (svaki lom dodaje tačno 1 deo).",
      izvor: "zadatak 137, str. 46"
    },
    {
      id: 114,
      kategorija: "sabiranje-oduzimanje",
      tezina: 2,
      tekst: "Zec i jež su bili udaljeni 20 metara jedan od drugog kad su krenuli jedno drugom u susret. Kad zec pređe 13 metara, a jež 2 metra, koliko će im još metara ostati do susreta?",
      opcije: ["1 metar", "2 metra", "3 metra", "4 metra", "5 metara"],
      odgovor: "5 metara",
      objasnjenje: "Zajedno su prešli 13+2=15 metara. Ostalo im je 20−15=5 metara.",
      izvor: "zadatak 138, str. 46"
    },
    {
      id: 115,
      kategorija: "logicke-zagonetke",
      tezina: 2,
      tekst: "Maša i Daša se prezivaju Nikolić i Petrović (svaka drugačije), i žive u različitim kućama. Zna se da Maša i Petrovićeva žive u različitim kućama. Kako se Daša preziva?",
      opcije: ["Nikolić", "Petrović", "Petronijević", "Nikolajević"],
      odgovor: "Petrović",
      objasnjenje: "Pošto Maša i \"Petrovićeva\" žive u različitim kućama, to znači da Maša nije Petrović. Znači Maša je Nikolić, a Daša je Petrović.",
      izvor: "zadatak 139, str. 47"
    },
    {
      id: 116,
      kategorija: "sabiranje-oduzimanje",
      tezina: 1,
      tekst: "Kapetan broda je ugledao kita u 11 sati. Kit je plivao pored broda tačno 3 sata, a onda se udaljio. U koliko sati se kit udaljio od broda?",
      opcije: ["Tačno u podne", "U 13 sati", "U 14 sati", "U 4 sata"],
      odgovor: "U 14 sati",
      objasnjenje: "11 + 3 = 14 sati (2 posle podne).",
      izvor: "zadatak 140, str. 47"
    },
    {
      id: 117,
      kategorija: "logicke-zagonetke",
      tezina: 3,
      tekst: "Vladan je za Novu godinu dobio voz sa 7 vagona. Imao je 4 čokoladice, a njegov brat 4 bombone. Brat počinje da broji vagone od početka i u svaki od prva 4 vagona stavlja po 1 bombonu. Vladan broji vagone od kraja i u svaki od poslednja 4 vagona (računajući od kraja) stavlja po 1 čokoladicu. Koja od sledećih rečenica će, posle toga, biti tačna?",
      opcije: [
        "U svakom vagončiću je bio po jedan slatkiš.",
        "Samo u jednom vagončiću biće dva različita slatkiša.",
        "Ukupno je u vagončićima bilo 7 slatkiša.",
        "Jedan vagončić je ostao bez slatkiša."
      ],
      odgovor: "Samo u jednom vagončiću biće dva različita slatkiša.",
      objasnjenje: "Voz ima 7 vagona, pa je četvrti vagon (brojeći od početka) ujedno i četvrti vagon brojeći od kraja - isti vagon dobija i bombonu i čokoladicu.",
      izvor: "zadatak 141, str. 48"
    },
    {
      id: 118,
      kategorija: "logicke-zagonetke",
      tezina: 2,
      tekst: "Dva putnika su se dogovorila da se sretnu u petom vagonu jednog voza. Koliko vagona ima taj voz, ako je prvi putnik seo u peti vagon od početka, a drugi putnik u peti vagon \"s kraja\", i tu su se sreli?",
      opcije: ["6", "7", "8", "9", "10"],
      odgovor: "9",
      objasnjenje: "5 + 5 − 1 = 9 (peti vagon se broji samo jednom).",
      izvor: "zadatak 142, str. 48"
    },
    {
      id: 119,
      kategorija: "logicke-zagonetke",
      tezina: 2,
      tekst: "U vrsti stoji ukupno 7 dečaka. Vasa je peti sleva. Na kom se mestu Vasa nalazi kada brojimo sdesna?",
      opcije: ["Na prvom", "Na drugom", "Na trećem", "Na četvrtom", "Ne može se odrediti"],
      odgovor: "Na trećem",
      objasnjenje: "7 − 5 + 1 = 3",
      izvor: "zadatak 143, str. 48"
    },
    {
      id: 120,
      kategorija: "logicke-zagonetke",
      tezina: 1,
      tekst: "Prva kornjača je kazala da ima šest i po godina, a druga je kazala da ima osam godina. Koja kornjača se ranije izlegla (kornjače se legu iz jaja)?",
      opcije: ["Prva", "Druga", "Istovremeno", "Ne znamo koje godine je to bilo"],
      odgovor: "Druga",
      objasnjenje: "Druga kornjača je starija (8 > 6,5), što znači da se ranije izlegla.",
      izvor: "zadatak 144, str. 49"
    },
    {
      id: 121,
      kategorija: "logicke-zagonetke",
      tezina: 2,
      tekst: "Pogledaj ovaj kvadrat brojeva:\n2 9 4\n7 5 3\n6 1 8\nU njemu zbir svakog reda, svake kolone i obe dijagonale iznosi 15. Koliko od ovih 6 tvrdnji je NETAČNO: (1) zbir 1. reda=15, (2) zbir 1. kolone=15, (3) zbir jedne dijagonale=15, (4) zbir druge dijagonale=15, (5) zbir 3. kolone=15, (6) zbir 2. reda=15?",
      opcije: ["0", "1", "2", "3", "4"],
      odgovor: "0",
      objasnjenje: "Ovo je \"čarobni kvadrat\" - baš svaki red, kolona i dijagonala daju zbir 15. Sve tvrdnje su tačne, nema netačnih.",
      izvor: "zadatak 145, str. 49"
    },
    {
      id: 122,
      kategorija: "sabiranje-oduzimanje",
      tezina: 1,
      tekst: "Kosta i Aleksa treba, svaki od njih, da se popnu po jednom na svako od 3 drveta. Koliko će ukupno penjanja biti?",
      opcije: ["3", "4", "6", "8", "9"],
      odgovor: "6",
      objasnjenje: "Svaki dečak se penje 3 puta (na 3 drveta): 3+3=6.",
      izvor: "zadatak 146, str. 50"
    },
    {
      id: 123,
      kategorija: "logicke-zagonetke",
      tezina: 2,
      tekst: "Milena želi da na tacni rasporedi krušku, jabuku i grozd (svako voće jednom) da iznenadi tetka Ljilju. Na koliko različitih načina to može da uradi?",
      opcije: ["3", "4", "6", "8", "9"],
      odgovor: "6",
      objasnjenje: "3 različita voća se mogu rasporediti na 3×2×1=6 načina.",
      izvor: "zadatak 147, str. 50"
    },
    {
      id: 124,
      kategorija: "logicke-zagonetke",
      tezina: 2,
      tekst: "Mila je nacrtala 3 jabuke i želi svaku da oboji drugom bojom, imajući crvenu, žutu i zelenu bojicu (svaka boja se koristi tačno jednom). Na koliko različitih načina Mila može to da uradi?",
      opcije: ["1", "2", "3", "4", "6"],
      odgovor: "6",
      objasnjenje: "3 boje na 3 jabuke - 3×2×1=6 rasporeda.",
      izvor: "zadatak 148, str. 50"
    },
    {
      id: 125,
      kategorija: "logicke-zagonetke",
      tezina: 2,
      tekst: "Zastavu treba obojiti sa 3 vodoravne trake - jednom crvenom, jednom plavom i jednom belom bojom, svaki put u drugačijem rasporedu. Na koliko različitih načina je to moguće?",
      opcije: ["3", "6", "7", "8", "9"],
      odgovor: "6",
      objasnjenje: "3 boje na 3 trake - 3×2×1=6 rasporeda.",
      izvor: "zadatak 149, str. 51"
    },
    {
      id: 126,
      kategorija: "sabiranje-oduzimanje",
      tezina: 1,
      tekst: "Maja ima 2 bluze i 3 suknjice. Svaka njena bluza slaže se sa svakom od suknjica. Na koliko različitih načina Maja može da se obuče?",
      opcije: ["5", "6", "7", "8", "9"],
      odgovor: "6",
      objasnjenje: "2 bluze × 3 suknjice = 6 kombinacija.",
      izvor: "zadatak 150, str. 51"
    },
    {
      id: 127,
      kategorija: "logicke-zagonetke",
      tezina: 2,
      tekst: "U plesnu školu upisala su se 3 dečaka i 3 devojčice. Koliko različitih plesnih parova može da napravi njihov učitelj plesa, ako jedan par uvek čine 1 dečak i 1 devojčica?",
      opcije: ["5", "6", "7", "8", "9"],
      odgovor: "9",
      objasnjenje: "3 dečaka × 3 devojčice = 9 mogućih parova.",
      izvor: "zadatak 151, str. 52"
    },
    {
      id: 128,
      kategorija: "logicke-zagonetke",
      tezina: 2,
      tekst: "Imamo 3 trougla i 3 kruga. Svaki trougao je povezan (uparen) sa svakim krugom. Koliko ukupno ima takvih parova?",
      opcije: ["3", "6", "9", "12", "15"],
      odgovor: "9",
      objasnjenje: "3 trougla × 3 kruga = 9 parova.",
      izvor: "zadatak 152, str. 52"
    },
    {
      id: 129,
      kategorija: "logicke-zagonetke",
      tezina: 2,
      tekst: "Koliko se dvocifrenih brojeva može napisati pomoću cifara 1, 2 i 3 (cifre mogu da se ponavljaju, npr. 11, 22...)?",
      opcije: ["3", "4", "5", "6", "9"],
      odgovor: "9",
      objasnjenje: "Za svaku od 3 cifre na mestu desetica, ide bilo koja od 3 cifre na mestu jedinica: 3×3=9.",
      izvor: "zadatak 153, str. 53"
    },
    {
      id: 130,
      kategorija: "logicke-zagonetke",
      tezina: 2,
      tekst: "Koliko ima dvocifrenih brojeva koji se mogu napisati pomoću cifara 1, 2, 3 i 4 (cifre mogu da se ponavljaju)?",
      opcije: ["9", "12", "14", "16", "18"],
      odgovor: "16",
      objasnjenje: "4 cifre na mestu desetica × 4 cifre na mestu jedinica = 16.",
      izvor: "zadatak 154, str. 53"
    },
    {
      id: 131,
      kategorija: "logicke-zagonetke",
      tezina: 3,
      tekst: "Koliko ima dvocifrenih brojeva koji se mogu napisati pomoću cifara 0, 1 i 3 (cifre mogu da se ponavljaju, ali broj ne sme počinjati cifrom 0)?",
      opcije: ["3", "4", "5", "6", "8"],
      odgovor: "6",
      objasnjenje: "To su brojevi: 10, 11, 13, 30, 31, 33 - ima ih 6.",
      izvor: "zadatak 155, str. 53"
    },
    {
      id: 132,
      kategorija: "logicke-zagonetke",
      tezina: 2,
      tekst: "Koliko ima dvocifrenih brojeva kojima zbir cifara iznosi 1?",
      opcije: ["1", "2", "10", "11", "12"],
      odgovor: "1",
      objasnjenje: "Postoji samo jedan takav broj - to je broj 10 (1+0=1).",
      izvor: "zadatak 156, str. 53"
    },
    {
      id: 133,
      kategorija: "logicke-zagonetke",
      tezina: 2,
      tekst: "Koliko ima dvocifrenih brojeva kojima zbir cifara iznosi 2?",
      opcije: ["1", "2", "10", "11", "12"],
      odgovor: "2",
      objasnjenje: "Postoje dva takva broja: 11 (1+1=2) i 20 (2+0=2).",
      izvor: "zadatak 157, str. 53"
    },
    {
      id: 134,
      kategorija: "logicke-zagonetke",
      tezina: 3,
      tekst: "U jednoj porodici su dva brata i svaki od njih ima jednu (istu) sestru. Koliko ima dece u toj porodici?",
      opcije: ["2", "3", "4", "5", "Ne može se izračunati"],
      odgovor: "3",
      objasnjenje: "Jedna devojčica je istovremeno sestra i jednom i drugom bratu - dakle 2 brata + 1 sestra = 3 dece.",
      izvor: "zadatak 163, str. 55"
    },
    {
      id: 135,
      kategorija: "logicke-zagonetke",
      tezina: 3,
      tekst: "U jednoj porodici su dve sestre i svaka od njih ima ista dva brata. Koliko ima dece u toj porodici?",
      opcije: ["2", "3", "4", "5", "Ne može se izračunati"],
      odgovor: "4",
      objasnjenje: "Ta dva brata su istovremeno braća obema sestrama - dakle 2 sestre + 2 brata = 4 dece.",
      izvor: "zadatak 164, str. 55"
    },
    {
      id: 136,
      kategorija: "logicke-zagonetke",
      tezina: 3,
      tekst: "Svaki od petorice braće ima jednu (istu) sestru. Koliko dece ima u toj porodici?",
      opcije: ["2", "3", "4", "5", "6"],
      odgovor: "6",
      objasnjenje: "Petorica braće + 1 zajednička sestra = 6 dece.",
      izvor: "zadatak 165, str. 55"
    },
    {
      id: 137,
      kategorija: "logicke-zagonetke",
      tezina: 3,
      tekst: "Marina ima 3 brata i 2 sestre. Koliko braće i sestara ima njen brat Marko (koji je jedan od te trojice braće)?",
      opcije: ["2 brata i 2 sestre", "1 brata i 2 sestre", "2 brata i 1 sestru", "2 brata i 3 sestre"],
      odgovor: "2 brata i 3 sestre",
      objasnjenje: "Sa Markove tačke gledišta: njegova braća su preostala 2 brata (3−1), a njegove sestre su Marina i njene 2 sestre - ukupno 3 sestre.",
      izvor: "zadatak 166, str. 56"
    },
    {
      id: 138,
      kategorija: "logicke-zagonetke",
      tezina: 2,
      tekst: "Joca je imao pet bombona. Sestrama je dao sve osim dve. Koliko mu je bombona ostalo?",
      opcije: ["2", "3", "4", "5", "Ne može se izračunati"],
      odgovor: "2",
      objasnjenje: "\"Dao je sve osim dve\" znači da su mu ostale baš te dve bombone.",
      izvor: "zadatak 167, str. 56"
    },
    {
      id: 139,
      kategorija: "sabiranje-oduzimanje",
      tezina: 1,
      tekst: "Tetka Mara pije čaj ujutru u pola sedam (6:30), a tetka Ljilja pije čaj ujutru u pola devet (8:30). Koliko sati bi tetka Mara trebalo da čeka tetka Ljilju da zajedno piju čaj?",
      opcije: ["1 sat", "2 sata", "3 sata", "Pola sata", "Nemoguće izračunati"],
      odgovor: "2 sata",
      objasnjenje: "Od 6:30 do 8:30 prođu tačno 2 sata.",
      izvor: "zadatak 169, str. 56"
    },
    {
      id: 140,
      kategorija: "logicke-zagonetke",
      tezina: 2,
      tekst: "Svaku kamilu možeš nacrtati sa jednom grbom ili sa dve grbe (2 izbora za svaku kamilu). Ako crtaš sliku sa 2 kamile, koliko različitih slika možeš napraviti?",
      opcije: ["4", "3", "2", "1", "6"],
      odgovor: "4",
      objasnjenje: "2 izbora za prvu kamilu × 2 izbora za drugu kamilu = 4 slike.",
      izvor: "zadatak 173, str. 59"
    },
    {
      id: 141,
      kategorija: "logicke-zagonetke",
      tezina: 2,
      tekst: "Da li pažljivo čitaš? Dve jednogrbe kamile i tri dvogrbe kamile - koliko tu ima nogu?",
      opcije: ["6", "8", "12", "16", "20"],
      odgovor: "20",
      objasnjenje: "Broj grba ne utiče na broj nogu! Svaka kamila (svejedno koliko grba ima) ima 4 noge. Ukupno 5 kamila × 4 noge = 20.",
      izvor: "zadatak 174, str. 59"
    },
    {
      id: 142,
      kategorija: "sabiranje-oduzimanje",
      tezina: 2,
      tekst: "Na cvetićima su napisani računi: 1+4, 4+3, 2+3, 5-5, 6-2, 6-1, 3+3, 0+5. Kad rešiš sve, oboj žutom bojom samo one cvetiće na kojima je rezultat 5. Koliko ima žutih cvetića?",
      opcije: ["1", "2", "3", "4", "6"],
      odgovor: "4",
      objasnjenje: "Rezultat 5 imaju: 1+4=5, 2+3=5, 6-1=5, 0+5=5 - to je 4 cvetića.",
      izvor: "zadatak 176, str. 60"
    },
    {
      id: 143,
      kategorija: "sabiranje-oduzimanje",
      tezina: 2,
      tekst: "Snežana je donela Ljutku (jednom od 7 patuljaka) 3 bombone, a Uči je donela 3 bombone više nego Ljutku. Svim ostalim patuljcima (njih 5) donela je samo po jednu bombonu. Koliko je ukupno bombona donela Snežana?",
      opcije: ["14", "12", "9", "6", "5"],
      odgovor: "14",
      objasnjenje: "Ljutko: 3, Uči: 3+3=6, ostalih 5 patuljaka: 5×1=5. Ukupno: 3+6+5=14.",
      izvor: "zadatak 177, str. 61"
    },
    {
      id: 144,
      kategorija: "sabiranje-oduzimanje",
      tezina: 2,
      tekst: "Na tri gomile nalaze se klikeri. Na prvoj gomili ima 3 klikera, na drugoj gomili ima 2 klikera više nego na prvoj, a na trećoj gomili ima onoliko klikera koliko na prvoj i drugoj gomili zajedno. Koliko ima ukupno klikera na sve tri gomile?",
      opcije: ["10", "14", "16", "18", "20"],
      odgovor: "16",
      objasnjenje: "Prva: 3, druga: 3+2=5, treća: 3+5=8. Ukupno: 3+5+8=16.",
      izvor: "zadatak 178, str. 61"
    },
    {
      id: 145,
      kategorija: "logicke-zagonetke",
      tezina: 3,
      tekst: "U kutiji se nalazi 20 kuglica - žute, zelene, plave i crvene. Zna se da 17 kuglica nisu zelene, da crvenih ima 5, a da 12 kuglica nisu žute. Koliko ima plavih kuglica u toj kutiji?",
      opcije: ["2", "3", "4", "5", "6"],
      odgovor: "4",
      objasnjenje: "Zelenih: 20−17=3. Žutih: 20−12=8. Crvenih: 5. Plavih: 20−3−8−5=4.",
      izvor: "zadatak 179, str. 61"
    },
    {
      id: 146,
      kategorija: "logicke-zagonetke",
      tezina: 2,
      tekst: "U prazan kvadratić upiši bilo koji broj: □ + (7−5) − 2 = ? Šta primećuješ?",
      opcije: ["Nema rešenja", "Zadatak ima više rešenja (svaki broj može biti rešenje)"],
      odgovor: "Zadatak ima više rešenja (svaki broj može biti rešenje)",
      objasnjenje: "(7−5)−2 = 0, pa je rezultat uvek jednak broju koji upišeš u kvadratić.",
      izvor: "zadatak 183, str. 63"
    },
    {
      id: 147,
      kategorija: "logicke-zagonetke",
      tezina: 2,
      tekst: "U računu M + M = 6, jedno slovo krije jednu cifru (ista slova kriju iste cifre). Koju cifru krije slovo M?",
      opcije: ["3", "4", "7", "8"],
      odgovor: "3",
      objasnjenje: "M + M = 6, znači 2×M=6, pa je M=3.",
      izvor: "zadatak 185, str. 63"
    },
    {
      id: 148,
      kategorija: "logicke-zagonetke",
      tezina: 3,
      tekst: "U računu N + N = Б6 (gde Б6 predstavlja dvocifreni broj), istim ciframa odgovaraju ista slova, a različitim ciframa različita slova. Koja cifra se krije iza slova N?",
      opcije: ["3", "4", "7", "8"],
      odgovor: "8",
      objasnjenje: "N+N mora dati dvocifren broj koji se završava na 6. Jedino 8+8=16 to zadovoljava (N=8, Б=1).",
      izvor: "zadatak 186, str. 63"
    },
    {
      id: 149,
      kategorija: "logicke-zagonetke",
      tezina: 3,
      tekst: "Ako različita slova predstavljaju različite cifre, koju cifru predstavlja (skriva) slovo N u ovom računu: M + 1 = EN (EN je dvocifren broj)?",
      opcije: ["0", "1", "5", "9", "Ne može se odrediti"],
      odgovor: "0",
      objasnjenje: "M+1 mora biti dvocifren broj, pa je M=9 (najveća cifra), 9+1=10, znači E=1, N=0.",
      izvor: "zadatak 187, str. 64"
    },
    {
      id: 150,
      kategorija: "logicke-zagonetke",
      tezina: 3,
      tekst: "Ako različita slova predstavljaju različite cifre, koju cifru predstavlja (skriva) slovo M u ovom računu: M + E = EN (EN je dvocifren broj)?",
      opcije: ["3", "5", "8", "9", "Ne može se odrediti"],
      odgovor: "9",
      objasnjenje: "Jedino rešenje je M=9, E=1, N=0, jer je 9+1=10.",
      izvor: "zadatak 188, str. 64"
    },
    {
      id: 151,
      kategorija: "logicke-zagonetke",
      tezina: 3,
      tekst: "U svakoj od tri kutije nalazi se po jedan kliker: crveni, zeleni ili žuti. Kutije su označene: 1. \"Crveni kliker\", 2. \"Žuti kliker\", 3. \"Crveni ili zeleni kliker\". Svi natpisi na kutijama su POGREŠNI! Koje je boje kliker u srednjoj kutiji (kutija 2)?",
      opcije: ["Žuti", "Zeleni", "Crveni", "Zeleni ili žuti", "Nemoguće je otkriti"],
      odgovor: "Crveni",
      objasnjenje: "Kutija 3 (natpis 'crveni ili zeleni') mora sadržati žuti (jedino što nije crveno ni zeleno). Kutija 1 (natpis 'crveni') ne sme biti crvena ni žuta (žuta je zauzeta) - mora biti zelena. Ostaje da kutija 2 (natpis 'žuti') sadrži crveni kliker.",
      izvor: "zadatak 189, str. 64"
    },
    {
      id: 152,
      kategorija: "logicke-zagonetke",
      tezina: 3,
      tekst: "U kutiji se nalazi 10 belih i 5 crvenih kuglica. Koliko najmanje kuglica treba da izvadimo zatvorenih očiju iz kutije, da bismo bili SIGURNI da smo izvadili 1 belu kuglicu?",
      opcije: ["2", "3", "4", "5", "6"],
      odgovor: "6",
      objasnjenje: "U najgorem slučaju prvo izvučemo svih 5 crvenih, pa nam sledeća (6.) mora biti bela.",
      izvor: "zadatak 190, str. 64"
    },
    {
      id: 153,
      kategorija: "logicke-zagonetke",
      tezina: 3,
      tekst: "U kutiji se nalazi 10 belih i 5 crvenih kuglica. Koliko najmanje kuglica treba da izvadimo zatvorenih očiju, da bismo bili SIGURNI da smo izvadili 1 crvenu kuglicu?",
      opcije: ["15", "12", "11", "10", "9"],
      odgovor: "11",
      objasnjenje: "U najgorem slučaju prvo izvučemo svih 10 belih, pa nam sledeća (11.) mora biti crvena.",
      izvor: "zadatak 191, str. 64"
    },
    {
      id: 154,
      kategorija: "logicke-zagonetke",
      tezina: 3,
      tekst: "U kutiji se nalazi 10 belih i 5 crvenih kuglica. Koliko najmanje kuglica treba da izvadimo zatvorenih očiju, da bismo bili SIGURNI da smo izvadili 2 kuglice RAZLIČITIH boja?",
      opcije: ["10", "11", "12", "13", "15"],
      odgovor: "11",
      objasnjenje: "U najgorem slučaju prvo izvučemo svih 10 belih (iste boje), pa nam sledeća (11.) mora biti crvena - druge boje.",
      izvor: "zadatak 192, str. 64"
    },
    {
      id: 155,
      kategorija: "logicke-zagonetke",
      tezina: 3,
      tekst: "Na igralištu se igralo 7 devojčica. Među njima su bile 3 devojčice sa crvenim majicama i 6 devojčica sa belim mašnicama. Koliko IMA mogućnosti za broj devojčica koje su imale i crvenu majicu i belu mašnicu?",
      opcije: ["0", "1", "2", "3", "4"],
      odgovor: "2",
      objasnjenje: "Broj devojčica sa oba obeležja mora biti bar 3+6-7=2 (najmanje), a najviše min(3,6)=3. Dakle moguće su 2 ili 3 - to su 2 mogućnosti.",
      izvor: "zadatak 193, str. 65"
    },
    {
      id: 156,
      kategorija: "sabiranje-oduzimanje",
      tezina: 1,
      tekst: "Od kuće do drveta ima 12 metara, a od kuće do bunara ima 21 metar (drvo i bunar su u istom pravcu od kuće, drvo je bliže). Koliko metara ima od drveta do bunara?",
      opcije: ["33", "31", "13", "9", "8"],
      odgovor: "9",
      objasnjenje: "21 − 12 = 9",
      izvor: "zadatak 194, str. 66"
    },
    {
      id: 157,
      kategorija: "logicke-zagonetke",
      tezina: 3,
      tekst: "Mogu li dva oca i dva sina da podele tri jabuke tako da svaki dobije po jednu celu jabuku?",
      opcije: ["Ne mogu", "Mogu, ako preseku jednu jabuku", "Mogu, ako su to deda, njegov sin i unuk", "Mogu, ako prepolove svaku jabuku"],
      odgovor: "Mogu, ako su to deda, njegov sin i unuk",
      objasnjenje: "Deda je otac, sin je i otac i sin, unuk je sin - to su samo 3 osobe (\"dva oca\" i \"dva sina\"), pa im je dovoljne 3 jabuke.",
      izvor: "zadatak 195, str. 66"
    },
    {
      id: 158,
      kategorija: "sabiranje-oduzimanje",
      tezina: 1,
      tekst: "Vera se rodila 2 godine posle Jelene. Jelena sada ima 7 godina. Koliko godina ima Vera?",
      opcije: ["9", "8", "7", "6", "5"],
      odgovor: "5",
      objasnjenje: "Vera je 2 godine mlađa: 7 − 2 = 5.",
      izvor: "zadatak 196, str. 66"
    },
    {
      id: 159,
      kategorija: "logicke-zagonetke",
      tezina: 2,
      tekst: "Ana je sada 3 godine starija od Nikole. Koliko će godina ona biti starija od Nikole kroz 5 godina?",
      opcije: ["2 godine", "3 godine", "4 godine", "5 godina", "6 godina"],
      odgovor: "3 godine",
      objasnjenje: "Razlika u godinama se nikad ne menja - uvek ostaje 3 godine.",
      izvor: "zadatak 197, str. 66"
    },
    {
      id: 160,
      kategorija: "sabiranje-oduzimanje",
      tezina: 2,
      tekst: "Ana ima 5 godina, a zajedno sa Verom ima 12 godina. Koliko će godina one imati zajedno kroz 2 godine?",
      opcije: ["12", "16", "17", "18", "20"],
      odgovor: "16",
      objasnjenje: "Svaka od njih ostari 2 godine, pa zbir raste za 2+2=4: 12+4=16.",
      izvor: "zadatak 198, str. 66"
    },
    {
      id: 161,
      kategorija: "sabiranje-oduzimanje",
      tezina: 2,
      tekst: "Ana ima 4 godine, a zajedno sa Verom ima 7 godina. Koliko su one godina imale zajedno pre 2 godine?",
      opcije: ["6", "5", "4", "3", "2"],
      odgovor: "3",
      objasnjenje: "Pre 2 godine je svaka bila 2 godine mlađa, pa je zbir bio manji za 4: 7−4=3.",
      izvor: "zadatak 199, str. 66"
    },
    {
      id: 162,
      kategorija: "sabiranje-oduzimanje",
      tezina: 2,
      tekst: "Ana i Vesna imaju zajedno 10 godina. Koliko će godina one imati zajedno kroz 3 godine?",
      opcije: ["12", "14", "16", "18", "20"],
      odgovor: "16",
      objasnjenje: "Zbir raste za 3+3=6: 10+6=16.",
      izvor: "zadatak 200, str. 66"
    },
    {
      id: 163,
      kategorija: "logicke-zagonetke",
      tezina: 3,
      tekst: "Pera je rođen 30. decembra 2012. godine, a Nikola je tri dana mlađi od Pere. Kada je rođen Nikola?",
      opcije: ["27. januara 2012.", "27. januara 2013.", "31. januara 2013.", "1. januara 2013.", "2. januara 2013."],
      odgovor: "2. januara 2013.",
      objasnjenje: "30. decembar + 3 dana = 31. decembar, 1. januar, 2. januar (decembar ima 31 dan).",
      izvor: "zadatak 201, str. 67"
    },
    {
      id: 164,
      kategorija: "logicke-zagonetke",
      tezina: 2,
      tekst: "Pera i Nikola mere visinu. Ako je Pera mlađi i nije viši od Nikole, da li to onda znači da je on niži od Nikole?",
      opcije: ["Naravno da je Pera niži", "Nikola je niži od Pere", "Pera je mlađi, pa je zato niži", "Ne mora da znači, jer mogu da budu iste visine"],
      odgovor: "Ne mora da znači, jer mogu da budu iste visine",
      objasnjenje: "\"Nije viši\" znači niži ILI iste visine - ne mora značiti da je niži.",
      izvor: "zadatak 202, str. 67"
    },
    {
      id: 165,
      kategorija: "logicke-zagonetke",
      tezina: 2,
      tekst: "Puž puzi po stubu visine 5 metara. Svaki dan se popne 2 metra, a svake noći sklizne nazad 1 metar. Kroz koliko dana će on stići na vrh?",
      opcije: ["7", "6", "5", "4", "3"],
      odgovor: "4",
      objasnjenje: "Dan1: 0→2→(noć)1. Dan2: 1→3→(noć)2. Dan3: 2→4→(noć)3. Dan4: 3→5 - stigao je na vrh!",
      izvor: "zadatak 204, str. 68"
    },
    {
      id: 166,
      kategorija: "logicke-zagonetke",
      tezina: 3,
      tekst: "Stub je visok 10 metara. Puž se penje 3 metra tokom dana, ali noću, dok odmara, sklizne natrag 2 metra. Kog dana će puž stići na vrh stuba?",
      opcije: ["6", "7", "8", "9", "10"],
      odgovor: "8",
      objasnjenje: "Svaki pun dan-noć ciklus puž napreduje samo 1 metar (3-2), ali poslednjeg dana ne klizi nazad. Posle 7 noći je na 7m, osmog dana se popne za 3m i stigne na 10m.",
      izvor: "zadatak 205, str. 68"
    },
    {
      id: 167,
      kategorija: "sabiranje-oduzimanje",
      tezina: 1,
      tekst: "Mama dinosaurus je snela nekoliko jaja. Dva jaja su joj ispala i razbila se. Tri jaja joj je ukrao strašni komšija. Iz ostalih jaja se izleglo 4 mladunčeta dinosaurusa. Koliko je jaja snela mama dinosaurus?",
      opcije: ["6", "8", "9", "10", "12"],
      odgovor: "9",
      objasnjenje: "2 (razbijena) + 3 (ukradena) + 4 (izlegla) = 9",
      izvor: "zadatak 206, str. 69"
    },
    {
      id: 168,
      kategorija: "sabiranje-oduzimanje",
      tezina: 1,
      tekst: "Na levom tasu terazija nalaze se lubenica i teg od 3 kg, a na desnom tasu je teg od 10 kg. Terazije su u ravnoteži. Koliko kilograma ima lubenica?",
      opcije: ["6", "7", "8", "9", "10"],
      odgovor: "7",
      objasnjenje: "Lubenica + 3 kg = 10 kg, pa lubenica ima 10−3=7 kg.",
      izvor: "zadatak 182, str. 62"
    },
    {
      id: 169,
      kategorija: "sabiranje-oduzimanje",
      tezina: 2,
      tekst: "Kosmonauti drže table na kojima su redom upisani brojevi prve desetice (1 do 10), ali nekih brojeva nema: 10, 9, 8, __, 6, 5, 4, __, 2, 1. Koliki je zbir brojeva koji nisu upisani?",
      opcije: ["8", "9", "10", "11", "12"],
      odgovor: "10",
      objasnjenje: "Nedostaju brojevi 7 i 3, pa je njihov zbir 7+3=10.",
      izvor: "Mislisa 2019, 1. razred, zad. 2, str. 104"
    },
    {
      id: 170,
      kategorija: "logicke-zagonetke",
      tezina: 2,
      tekst: "Napiši slovo K desno od Š; slovo O levo od (novoformiranog) L, a desno od K; i slovo A desno od L. Koja je reč nastala?",
      opcije: ["LAKOŠ", "KOŠLA", "ŠKOLA", "ŠOLAK", "KALOŠ"],
      odgovor: "ŠKOLA",
      objasnjenje: "Redom dobijamo: Š, ŠK, ŠKOL (O ide između K i L), pa na kraju ŠKOLA (A na kraju).",
      izvor: "Mislisa 2019, 1. razred, zad. 3, str. 104"
    },
    {
      id: 171,
      kategorija: "sabiranje-oduzimanje",
      tezina: 1,
      tekst: "Jedan jarac, tri vrapca i jedan konj - koliko oni ukupno imaju nogu?",
      opcije: ["13", "14", "15", "16", "18"],
      odgovor: "14",
      objasnjenje: "Jarac 4 + vrapci 3×2=6 + konj 4 = 14.",
      izvor: "Mislisa 2019, 1. razred, zad. 5, str. 105"
    },
    {
      id: 172,
      kategorija: "logicke-zagonetke",
      tezina: 1,
      tekst: "Jaša je viši od Raše, a Raša je viši od Saše. Ko je najniži?",
      opcije: ["Raša", "Saša", "Jaša", "Miša", "Maša"],
      odgovor: "Saša",
      objasnjenje: "Jaša > Raša > Saša, pa je Saša najniži.",
      izvor: "Mislisa 2019, 1. razred, zad. 6, str. 106"
    },
    {
      id: 173,
      kategorija: "sabiranje-oduzimanje",
      tezina: 2,
      tekst: "Pera je broju 9 dodao dva različita broja i dobio zbir 10. Koje je brojeve Pera dodao broju 9?",
      opcije: ["1 i 2", "0 i 2", "0 i 1", "2 i 0", "0 i 0"],
      odgovor: "0 i 1",
      objasnjenje: "9+0+1=10, a 0 i 1 su različiti brojevi.",
      izvor: "Mislisa 2019, 1. razred, zad. 7, str. 106"
    },
    {
      id: 174,
      kategorija: "sabiranje-oduzimanje",
      tezina: 1,
      tekst: "Na grani je sedelo 7 ptica. Sve, osim 3, su odletele. Koliko ptica je odletelo sa grane?",
      opcije: ["2", "3", "4", "5", "6"],
      odgovor: "4",
      objasnjenje: "7 − 3 = 4 ptice su odletele (3 su ostale).",
      izvor: "Mislisa 2019, 1. razred, zad. 8, str. 106"
    },
    {
      id: 175,
      kategorija: "sabiranje-oduzimanje",
      tezina: 1,
      tekst: "Na grani je sedelo 7 ptica. Sve, osim 3, su odletele. Koliko ptica je ostalo na grani?",
      opcije: ["2", "3", "4", "5", "6"],
      odgovor: "3",
      objasnjenje: "U tekstu piše da su sve OSIM 3 odletele - znači 3 su ostale.",
      izvor: "Mislisa 2019, 1. razred, zad. 9, str. 106"
    },
    {
      id: 176,
      kategorija: "logicke-zagonetke",
      tezina: 2,
      tekst: "Zamisli jedan jednocifren broj manji od 9. Dodaj mu 5, a zatim tom zbiru dodaj 4. Od dobijenog zbira oduzmi broj koji si zamislio. Koji je tvoj rezultat?",
      opcije: ["4", "5", "9", "13", "14"],
      odgovor: "9",
      objasnjenje: "Kad god oduzmeš isti broj koji si dodao, on se poništi: ostaje samo 5+4=9, bez obzira koji si broj zamislio.",
      izvor: "Mislisa 2019, 1. razred, zad. 12, str. 107"
    },
    {
      id: 177,
      kategorija: "logicke-zagonetke",
      tezina: 2,
      tekst: "Goran je niži od Ranka. Marija je niža od Sanje, ali viša od Ranka. Ko je najviši?",
      opcije: ["Goran", "Ranko", "Marija", "Sanja", "Nemoguće je odrediti"],
      odgovor: "Sanja",
      objasnjenje: "Redosled po visini: Goran < Ranko < Marija < Sanja, pa je Sanja najviša.",
      izvor: "Mislisa 2019, 1. razred, zad. 14, str. 108"
    }
  ]
};
