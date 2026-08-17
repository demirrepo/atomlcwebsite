export const REG_URL = "https://atom.edutizim.uz/order/entry/?survey=s29";

export const navLinks = [
  { label: "Asosiy", href: "#asosiy" },
  { label: "Kurslar", href: "#kurslar" },
  { label: "Ustozlar", href: "#ustozlar" },
  { label: "Aloqa", href: "#aloqa" },
];

export const advantages = [
  {
    icon: "Layers",
    title: "Kuchli o'quv tizimi",
    text: "Darslar eng so'nggi DTM va Milliy Sertifikat standartlari asosida, tizimli va mukammal ishlab chiqilgan.",
  },
  {
    icon: "Users",
    title: "Kuchli jamoa",
    text: "O'z fanining yosh va tajribali mutaxassislari. Har bir o'qituvchi yuqori shaxsiy natijalarga ega.",
  },
  {
    icon: "Lightbulb",
    title: "Zamonaviy metodika",
    text: "An'anaviy yodlash emas, balki tushunish va mantiqiy fikrlashga asoslangan ilg'or o'qitish uslublari.",
  },
  {
    icon: "Building2",
    title: "Zamonaviy o'quv markaz",
    text: "Qulay, yorug' va barcha zarur texnikalar bilan jihozlangan shinam va zamonaviy o'quv xonalari.",
  },
  {
    icon: "LineChart",
    title: "Doimiy nazorat",
    text: "O'quvchilarning o'zlashtirishi haftalik va oylik testlar orqali qat'iy nazorat qilib boriladi.",
  },
  {
    icon: "Rocket",
    title: "Tezkor natija",
    text: "Intensiv darslar va to'g'ri yo'naltirish orqali qisqa muddatda sezilarli va yuqori ballarga erishish kafolati.",
  },
  {
    icon: "Laptop",
    title: "Online kurslar",
    text: "Uydan chiqmasdan turib, qulay vaqtda va joyda sifatli ta'lim olish imkoniyati. Masofaviy darslar orqali vaqtingizni tejang va yuqori natijalarga erishing.",
  },
];

export const courses = [
  {
    icon: "FlaskConical",
    title: "Kimyo (DTM va Milliy Sertifikat)",
    text: "Noldan boshlab murakkab masalalargacha intensiv tayyorgarlik. Barcha mavzular tizimli ravishda o'rgatiladi.",
    tag: "Kimyo",
    color: "brand",
  },
  {
    icon: "Dna",
    title: "Biologiya (DTM va Milliy Sertifikat)",
    text: "Barcha mavzularni mantiqiy va chuqurlashtirilgan holda o'rganish. Imtihonga to'liq tayyor bo'lasiz.",
    tag: "Biologiya",
    color: "bio",
  },
];

export interface Teacher {
  name: string;
  subject: "Kimyo" | "Biologiya";
  role: string;
  image?: string;
}

export const teachers: Teacher[] = [
  // Kimyo
  { name: "Maxmud Matkarimov", subject: "Kimyo", role: "Kimyo fani o'qituvchisi" },
  { name: "Otabek Bobojonov", subject: "Kimyo", role: "Kimyo fani o'qituvchisi" },
  { name: "Diyorbek Tojiboyev", subject: "Kimyo", role: "Kimyo fani o'qituvchisi" },
  { name: "Qodirbek Sobirov", subject: "Kimyo", role: "Kimyo fani o'qituvchisi" },
  { name: "Gulnoza Kutlimuratova", subject: "Kimyo", role: "Kimyo fani o'qituvchisi" },
  { name: "Munisa Marimboyeva", subject: "Kimyo", role: "Kimyo fani o'qituvchisi" },

  // Biologiya
  { name: "Diyorbek Erkinov", subject: "Biologiya", role: "Biologiya fani o'qituvchisi" },
  { name: "Shodiya Baxodirova", subject: "Biologiya", role: "Biologiya fani o'qituvchisi" },
  { name: "Zuhra Sharifboyeva", subject: "Biologiya", role: "Biologiya fani o'qituvchisi" },
  { name: "Charos Otaboyeva", subject: "Biologiya", role: "Biologiya fani o'qituvchisi" },
];
