import ImageImport from "../ImageImport";

// input nama nama team
const DataTeam = [
  {
    img: ImageImport.sella,
    jabatan: "Hustler",
    nama: "Grassella Chindy Francisca L",
  },
  {
    img: ImageImport.cindy,
    jabatan: "Scrum Master Web",
    nama: "Cindy Ayuna Putri",
  },
  {
    img: ImageImport.ravenliana,
    jabatan: "Hipster Web",
    nama: "Raveliana",
  },
  {
    img: ImageImport.angga,
    jabatan: "Hacker Web",
    nama: "I Gede Angga Saputra",
  },
  {
    img: ImageImport.oka,
    jabatan: "Hacker Web",
    nama: "I Gusti Lanang Oka Wiyana",
  },
  {
    img: ImageImport.willy,
    jabatan: "Hacker Web",
    nama: "Willy Calvin Candra Lay",
  },
  {
    img: ImageImport.reza,
    jabatan: "Scrum Master Mobile",
    nama: "Reza Febriyansyah",
  },
  {
    img: ImageImport.hani,
    jabatan: "Hipster Mobile",
    nama: "Hanifa Sophia Rani",
  },
  {
    img: ImageImport.ananta,
    jabatan: "Hipster Mobile",
    nama: "Ananta Ziaurohman Az Zaki",
  },
  {
    img: ImageImport.nabila,
    jabatan: "Hipster Mobile",
    nama: "Nabila Apdika Khairunnisyah",
  },
  {
    img: ImageImport.rofi,
    jabatan: "Hipster & Hacker Mobile",
    nama: "Muhammad Rofi’ul Arham",
  },
  {
    img: ImageImport.fitri,
    jabatan: "Hacker Mobile",
    nama: "Fitri Reza",
  },
];

// mmebuat perulangan untuk menambahkan index secara otomatis
const Team = DataTeam.map((Data, index) => ({
  id: index + 1,
  ...Data,
}));

export default Team;
