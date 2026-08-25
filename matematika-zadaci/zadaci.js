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
    }
  ]
};
