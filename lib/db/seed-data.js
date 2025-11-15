// Bo'sh bazani to'ldirish uchun boshlang'ich ma'lumotlar (scripts/setup.mjs).
// Keyinchalik barcha ma'lumotlar admin panel orqali tahrirlanadi.

const unsplash = (id) => `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&w=1600&q=80`;

export const seedSettings = {
  hero_title: "Axborot tizimlari va texnologiyalari kafedrasiga xush kelibsiz!",
  hero_subtitle:
    "Zamonaviy axborot texnologiyalari sohasida innovatsion yondashuv va yuqori malakali mutaxassislar tayyorlashni maqsad qilgan kafedramiz texnologik taraqqiyotning eng yangi yoʻnalishlariga qaratilgan.",
  hero_image: unsplash("1555066931-4365d14bab8c"),
  university_intro:
    "Namangan davlat texnika universiteti 2025-yil 24-yanvardagi PQ-23-son Prezident qaroriga muvofiq tashkil topgan. Universitet Namangan muhandislik-texnologiya instituti, Namangan muhandislik-qurilish instituti va Namangan toʻqimachilik sanoati instituti negizida tashkil etilgan. Asosiy maqsad — muhandislik, qurilish, toʻqimachilik, axborot texnologiyalari va boshqa ishlab chiqarish sohalari uchun yuqori malakali mutaxassislar tayyorlash.",
  department_intro:
    "Kafedramiz axborot tizimlarini loyihalash, tahlil qilish va boshqarish sohalarida malakali mutaxassislar yetishtirishga qaratilgan.",
  programs_intro:
    "Kafedra quyidagi taʼlim yoʻnalishlari boʻyicha mutaxassislar tayyorlashda ishtirok etadi.",
  staff_intro:
    "Kafedrada sohaning eng dolzarb mavzularidan tortib kelajak texnologiyalarigacha oʻrgatiladi. Jamoamiz tajribali olim va amaliyotchi mutaxassislardan iborat.",
  contact_intro:
    "Kafedramiz bilan bogʻlanish uchun quyidagi maʼlumotlardan foydalaning yoki onlayn murojaat qoldiring. Siz bilan eng qisqa vaqtda bogʻlanamiz.",
  footer_about:
    "Talabalarni zamonaviy axborot texnologiyalari bilan qurollantirish va yuqori malakali mutaxassislar tayyorlash — kafedramizning asosiy vazifasi.",
  contact_address: "Namangan davlat texnika universiteti, Namangan shahri, Oʻzbekiston",
  contact_phone: "+998 71 123 45 67",
  contact_email: "info@att-kafedrasi.uz",
  contact_hours: "Dushanba – Juma: 8:00 – 18:00",
  map_embed_url:
    "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3010.8915329724296!2d71.64098787663586!3d41.00574721957972!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x38bb4b872becc29b%3A0xf429ffdd938d2cd!2sNamangan%20muhandislik-qurilish%20instituti!5e0!3m2!1sen!2s!4v1762435231245!5m2!1sen!2s",
  social_telegram: "",
  social_instagram: "",
  social_facebook: "",
  social_youtube: "",
  social_linkedin: "",
};

// Manba: "Kafedra tarkibi - 2026.xlsx". Ichki o'rindoshlik (+0,25) stavkalari
// asosiy stavkaga qo'shilgan.
const PHD_TECH = "Texnika fanlari boʻyicha falsafa doktori (PhD)";
const PHD_PHYS = "Fizika-matematika fanlari boʻyicha falsafa doktori (PhD)";
const SPEC_MECHATRONICS = "05.02.03 – Texnologik mashinalar. Robotlar, mexatronika va mashina detallari";
const SPEC_SEMICONDUCTORS = "01.04.10 – Yarim oʻtkazgichlar fizikasi";
const SPEC_COMPUTING =
  "05.01.04 – Hisoblash mashinalari, majmualari va kompyuter tarmoqlarining matematik va dasturiy taʼminoti";

const staffSeed = [
  {
    fullName: "Raxmonov Durbek Azamovich",
    position: "Kafedra mudiri",
    rate: 1.25,
    birthYear: 1982,
    academicDegree: PHD_TECH,
    degreeSpecialty: SPEC_MECHATRONICS,
    degreeYear: 2022,
    academicTitle: "Dotsent",
    titleSpecialty: SPEC_MECHATRONICS,
    titleYear: 2024,
    phone: "+998 91 177 03 70",
    photo: "rahmonov_d.jpg",
  },
  {
    fullName: "Erkaboyev Ulugʻbek Inoyatillayevich",
    position: "Professor",
    birthYear: 1983,
    academicDegree: "Fizika-matematika fanlari doktori (DSc)",
    degreeSpecialty: SPEC_SEMICONDUCTORS,
    degreeYear: 2019,
    academicTitle: "Professor",
    titleSpecialty: SPEC_SEMICONDUCTORS,
    titleYear: 2023,
    phone: "+998 93 052 38 83",
    photo: "erkaboyev_ulugbek.jpg",
  },
  {
    fullName: "Turakulov Azamjon Abdullayevich",
    position: "Professor",
    birthYear: 1961,
    academicDegree: "Fizika-matematika fanlari nomzodi",
    degreeSpecialty: "01.01.01 (01.01.03) – Hisoblash matematikasi va diskret matematika",
    degreeYear: 1997,
    academicTitle: "Dotsent",
    titleSpecialty: "05.01.08 – Texnologik jarayonlar va ishlab chiqarishni avtomatlashtirish va boshqarish",
    titleYear: 2020,
    phone: "+998 94 504 45 36",
    photo: "turakulov_a.jpg",
  },
  {
    fullName: "Ismanova Klara Doʻlanboyevna",
    position: "Dotsent",
    birthYear: 1973,
    academicDegree: "Texnika fanlari nomzodi",
    degreeSpecialty: "05.13.01 – Tizimli tahlil, boshqaruv va axborotni qayta ishlash",
    degreeYear: 2010,
    academicTitle: "Dotsent",
    titleSpecialty: "05.01.02 – Tizimli tahlil, boshqaruv va axborotni qayta ishlash",
    titleYear: 2018,
    phone: "+998 90 215 55 90",
  },
  {
    fullName: "Mullajanova Fotima Toʻychiboyevna",
    position: "Dotsent",
    birthYear: 1969,
    academicDegree: PHD_TECH,
    degreeSpecialty: SPEC_COMPUTING,
    degreeYear: 2023,
    academicTitle: "Dotsent",
    titleSpecialty: SPEC_COMPUTING,
    titleYear: 2024,
    phone: "+998 91 295 21 71",
  },
  {
    fullName: "Mirzayev Jasurbek Isroilovich",
    position: "Dotsent",
    rate: 1.25,
    birthYear: 1985,
    academicDegree: PHD_PHYS,
    degreeSpecialty: SPEC_SEMICONDUCTORS,
    degreeYear: 2023,
    academicTitle: "Dotsent",
    titleSpecialty: SPEC_SEMICONDUCTORS,
    titleYear: 2025,
    phone: "+998 93 208 00 77",
  },
  {
    fullName: "Raximov Rustamjon Gʻulomjonovich",
    position: "Dotsent",
    birthYear: 1985,
    academicDegree: PHD_PHYS,
    degreeSpecialty: SPEC_SEMICONDUCTORS,
    degreeYear: 2024,
    academicTitle: "Dotsent",
    titleSpecialty: SPEC_COMPUTING,
    titleYear: 2025,
    phone: "+998 93 499 99 29",
  },
  {
    fullName: "Mirzakarimov Mirsharofoddin Mirzaabduraximovich",
    position: "Katta oʻqituvchi",
    birthYear: 1972,
    academicDegree: PHD_TECH,
    degreeSpecialty: SPEC_MECHATRONICS,
    degreeYear: 2024,
    phone: "+998 99 398 06 45",
  },
  {
    fullName: "Abdurahmanov Akmaljon",
    position: "Katta oʻqituvchi",
    birthYear: 1976,
    academicDegree: PHD_TECH,
    degreeSpecialty: SPEC_MECHATRONICS,
    degreeYear: 2023,
    phone: "+998 93 677 36 59",
  },
  {
    fullName: "Dadamirzayev Muzaffar Gʻulomqodirovich",
    position: "Katta oʻqituvchi",
    birthYear: 1981,
    academicDegree: PHD_PHYS,
    degreeSpecialty: SPEC_SEMICONDUCTORS,
    degreeYear: 2025,
    phone: "+998 99 436 77 55",
    photo: "dadamirzayev_m.jpg",
  },
  {
    fullName: "Tursunov Muhriddin Muhammad oʻgʻli",
    position: "Oʻqituvchi",
    birthYear: 1998,
    phone: "+998 95 123 35 52",
    photo: "tursunov_m.jpg",
  },
  { fullName: "Rajabov Jahongir Ikromjon oʻgʻli", position: "Oʻqituvchi", rate: 1.25, birthYear: 1992, phone: "+998 91 570 01 00" },
  { fullName: "Obidjanov Musobek Olimjon oʻgʻli", position: "Oʻqituvchi", rate: 1.25, birthYear: 1994, phone: "+998 88 255 22 26" },
  { fullName: "Temirov Qudratali", position: "Oʻqituvchi", birthYear: 1997, phone: "+998 50 010 78 05" },
  { fullName: "Gʻayratov Saydullo", position: "Oʻqituvchi", birthYear: 1997, phone: "+998 91 360 55 87" },
  { fullName: "Moʻydinov Dostonbek", position: "Oʻqituvchi", birthYear: 2002, phone: "+998 93 647 44 02" },
  { fullName: "Mansurov Muhammadjon", position: "Oʻqituvchi", birthYear: 2002, phone: "+998 91 362 06 78" },
  {
    fullName: "Toʻychiboyev Xamidullo",
    position: "Stajyor-oʻqituvchi",
    employmentType: "Oʻrindosh",
    rate: 0.5,
    birthYear: 1998,
    phone: "+998 90 067 22 73",
  },
  {
    fullName: "Umarova Benazir",
    position: "Oʻqituvchi",
    employmentType: "Oʻrindosh",
    rate: 0.5,
    birthYear: 1997,
    phone: "+998 99 977 22 46",
  },
  {
    fullName: "Abdullajonov Ikromjon Muhiddinovich",
    position: "Stajyor-oʻqituvchi",
    employmentType: "Oʻrindosh",
    rate: 0.25,
    birthYear: 1989,
    phone: "+998 99 909 03 90",
  },
  {
    fullName: "Erkinov Xabibillox Abduraxmon oʻgʻli",
    position: "Stajyor-oʻqituvchi",
    employmentType: "Oʻrindosh",
    rate: 0.25,
    birthYear: 1996,
    phone: "+998 50 222 77 57",
  },
  { fullName: "Abdulhafizov Bunyod", position: "Dotsent", employmentType: "Oʻrindosh", rate: 0.25, birthYear: 1980 },
];

export const seedStaff = staffSeed.map(({ photo, ...member }, i) => ({
  employmentType: "Asosiy",
  rate: 1,
  ...member,
  photo: photo ? `/images/${photo}` : null,
  sortOrder: (i + 1) * 10,
}));

export const seedPrograms = [
  {
    title: "Axborot tizimlari va texnologiyalari",
    description:
      "Axborot tizimlarini loyihalash, ishlab chiqish, joriy etish va ularga xizmat koʻrsatish boʻyicha mutaxassislar tayyorlash.",
  },
  {
    title: "Axborot xavfsizligi",
    description:
      "Maʼlumotlar va kompyuter tarmoqlarini himoyalash, xavfsizlik tahdidlarini aniqlash va bartaraf etish.",
  },
  {
    title: "Kompyuter injiniringi",
    description:
      "Kompyuter tizimlari, tarmoqlar va apparat-dasturiy majmualarni loyihalash hamda ulardan foydalanish.",
  },
  {
    title: "Dasturiy injiniring",
    description:
      "Dasturiy taʼminotni loyihalash, ishlab chiqish, testlash va qoʻllab-quvvatlashning zamonaviy usullari.",
  },
  {
    title: "Kasb taʼlimi",
    description:
      "Axborot texnologiyalari fanlari boʻyicha pedagog-mutaxassislar tayyorlash.",
  },
].map((program, i) => ({ ...program, level: "Bakalavriat", sortOrder: (i + 1) * 10 }));

export const seedCards = [
  {
    section: "university",
    title: "Taʼlim yoʻnalishlari va ilmiy salohiyat",
    image: unsplash("1524178232363-1fb2b075b655"),
    description:
      "Universitetda bakalavriat, magistratura va doktorantura bosqichlari faoliyat yuritadi. 20 dan ortiq taʼlim yoʻnalishi boʻyicha 10 000 dan ortiq talaba tahsil oladi.",
  },
  {
    section: "university",
    title: "Texnik va innovatsion imkoniyatlar",
    image: unsplash("1531482615713-2afd69097998"),
    description:
      "Talabalar zamonaviy kompyuter sinflari, IT laboratoriyalar, startap va ilmiy-innovatsion markazlarda amaliy bilim oladi. Axborot tizimlari va texnologiyalari kafedrasi dasturlash va veb-ishlab chiqish yoʻnalishlarida ilgʻor oʻquv dasturlarini taklif etadi.",
  },
  {
    section: "university",
    title: "Xalqaro aloqalar va hamkorlik",
    image: "https://static.tuit.uz/uploads/1/AZ8J40LCXpd2vy_zaDZhm0npWnxOc6Fj.jpg",
    description:
      "Universitet Turkiya, Janubiy Koreya, Rossiya, Polsha, Xitoy va Qozogʻiston universitetlari bilan hamkorlik qiladi. Talabalar Erasmus+, DAAD, KOICA kabi xalqaro dasturlar orqali xorijda oʻqish va stajirovka oʻtash imkoniyatiga ega.",
  },
  {
    section: "department",
    title: "Kafedra yoʻnalishlari",
    image: unsplash("1581091226033-d5c48150dbaa"),
    description:
      "Kafedraga biriktirilgan taʼlim yoʻnalishlari: Axborot tizimlari va texnologiyalari, Axborot xavfsizligi, Kompyuter injiniringi, Dasturiy injiniring, Kasb taʼlimi.",
  },
  {
    section: "department",
    title: "Ilmiy ishlar va loyihalar",
    image: unsplash("1553877522-43269d4ea984"),
    description:
      "2025-yilda kafedra professor-oʻqituvchilari tomonidan Scopus bazasidagi jurnallarda 5 ta, xalqaro jurnallarda 20 dan ortiq maqola chop etildi, 2 ta xalqaro grant yutildi va xalqaro konferensiyalarda 60 dan ortiq tezis eʼlon qilindi.",
  },
  {
    section: "department",
    title: "Maqsad va vazifalar",
    image: unsplash("1522202176988-66273c2fd55f"),
    description:
      "Axborot texnologiyalari sohasida zamonaviy bilim va amaliy koʻnikmalarga ega, raqobatbardosh yetuk mutaxassislar tayyorlash.",
  },
].map((card, i) => ({ ...card, sortOrder: (i + 1) * 10 }));

export const seedLinks = [
  { title: "Namangan davlat texnika universiteti", url: "https://namdtu.uz" },
  { title: "Oliy taʼlim, fan va innovatsiyalar vazirligi", url: "https://edu.uz" },
  { title: "ZiyoNET taʼlim portali", url: "https://ziyonet.uz" },
].map((link, i) => ({ ...link, sortOrder: (i + 1) * 10 }));
