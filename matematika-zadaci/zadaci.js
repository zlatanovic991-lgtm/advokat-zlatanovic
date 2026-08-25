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
      tekst: "Niz voća i pečurki se ponavlja: 🍐 🍎 🍄 🍄 🍐 🍎 🍄 🍄 🍐 🍎 ... Šta će se naći na desetom mestu?",
      opcije: ["Jabuka", "Kruška", "Pečurka", "Nije jabuka"],
      odgovor: "Jabuka",
      objasnjenje: "Šara se ponavlja na svaka 4 mesta: kruška, jabuka, pečurka, pečurka. Deseto mesto je isto kao šesto — jabuka 🍎.",
      izvor: "zadatak 73, str. 23"
    },
    {
      id: 20,
      kategorija: "nizovi-i-obrasci",
      tezina: 2,
      tekst: "Niz balona se ponavlja na svakih 5 balona: sivo srce, belo prazno, crno, belo srce, šareno... Kad nacrtaš još 5 balona na isti način, kako će izgledati deveti balon u celom nizu?",
      opcije: ["Imaće oblik srca sive boje", "Biće balon crne boje", "Biće šareni balon", "Biće srce bele boje"],
      odgovor: "Biće srce bele boje",
      objasnjenje: "Šara se ponavlja na svakih 5 balona. Deveti balon je isti kao četvrti — belo srce 🤍.",
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
    }
  ]
};
