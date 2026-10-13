// Bo'sh bazani to'ldirish uchun boshlang'ich ma'lumotlar (scripts/setup.mjs).
// Asosiy manba — namdtu.uz rasmiy sayti.
// Keyinchalik barcha ma'lumotlar admin panel orqali tahrirlanadi.
import { slugify } from "../slug.js";

const lines = (...items) => items.join("\n");

export const seedSettings = {
  hero_image: "/images/site/campus.webp",
  hero_image_caption: "Namangan davlat texnika universiteti oʻquv binosi",
  hero_title: "Axborot tizimlari va texnologiyalari kafedrasi",
  hero_subtitle:
    "Taʼlim jarayonini xalqaro standartlar asosida tashkil etib, zamonaviy axborot texnologiyalarini oʻqitish va amaliyotga joriy etish orqali raqobatbardosh mutaxassislar tayyorlaymiz.",

  dept_faculty: "Axborot texnologiyalari va sunʼiy intellekt fakulteti",
  dept_founded: "1993-yil (2025-yilda qayta nomlangan)",
  dept_location: "4-bino",
  department_intro:
    "Namangan davlat texnika universitetining “Axborot tizimlari va texnologiyalari” kafedrasi oʻz faoliyatini taʼlim jarayonini xalqaro standartlar asosida tashkil etish, zamonaviy axborot texnologiyalarini oʻqitish va amaliyotga joriy etish orqali raqobatbardosh mutaxassislar tayyorlashga yoʻnaltirgan.",
  dept_accreditation:
    "Kafedra Germaniyaning ASIIN xalqaro akkreditatsiya agentligi bilan hamkorlikda “Axborot tizimlari va texnologiyalari” bakalavriat yoʻnalishi hamda “Kompyuter tizimlari va ularning dasturiy taʼminoti” magistratura mutaxassisligi dasturlarini xalqaro akkreditatsiyadan oʻtkazishni rejalashtirgan.",
  dept_tasks: lines(
    "Oʻquv reja va kurslarni zamonaviy standartlar va mehnat bozori talablari asosida yangilash",
    "Amaliyotga yoʻnaltirilgan — dual taʼlimni yoʻlga qoʻyish",
    "Ilmiy tadqiqotlarni kuchaytirish: Scopus va Web of Science bazalarida nashrlar, grantlar va patentlar",
    "Sanoat bilan integratsiya: buyurtmachi loyihalar, stajirovkalar va mentorlik dasturlari",
    "Xalqaro hamkorlik: qoʻshma kurslar, akademik almashinuv va xalqaro grantlarda ishtirok",
    "Oʻqituvchilar malakasini oshirish, sertifikatsiya va treninglarni tizimli yoʻlga qoʻyish",
    "Taʼlim sifati va akademik halollikni taʼminlash: monitoring, KPI va akkreditatsiya jarayonlari",
  ),

  programs_intro:
    "Kafedra bakalavriat va magistratura bosqichlarida quyidagi yoʻnalishlar boʻyicha mutaxassislar tayyorlaydi. Har bir yoʻnalishga masʼul oʻqituvchilar biriktirilgan.",
  staff_intro:
    "Kafedrada fan doktorlari, falsafa doktorlari (PhD), dotsentlar va yosh oʻqituvchilar faoliyat olib boradi. Har bir oʻqituvchining ilmiy yoʻnalishi va mehnat faoliyati bilan uning sahifasida tanishishingiz mumkin.",
  contact_intro: "Savollaringiz boʻlsa, kafedraga murojaat qoldiring — xabaringiz masʼul xodimga yetkaziladi.",
  footer_about:
    "Namangan davlat texnika universiteti, Axborot texnologiyalari va sunʼiy intellekt fakulteti tarkibidagi kafedra.",

  university_intro:
    "Namangan davlat texnika universiteti Oʻzbekiston Respublikasi Prezidentining 2025-yil 24-yanvardagi PQ-23-son qaroriga asosan Namangan muhandislik-texnologiya instituti, Namangan muhandislik-qurilish instituti va Namangan toʻqimachilik sanoati instituti negizida tashkil etilgan. Universitet muhandislik, qurilish, axborot texnologiyalari va ishlab chiqarish sohalari uchun kadrlar tayyorlaydi.",
  university_rector: "Ergashev Oybek Karimovich — fanlar doktori (DSc), professor",
  university_address: "Namangan shahri, Yangi Namangan tumani, I. Karimov koʻchasi, 12-uy",
  university_phone: "+998 69 234-14-30",
  university_email: "namdtu_info@edu.uz",
  university_website: "https://namdtu.uz",

  contact_address: "Namangan shahri, Yangi Namangan tumani, I. Karimov koʻchasi, 12-uy, 4-bino",
  contact_phone: "+998 99 783 31 85",
  contact_email: "durbekrahmonov@gmail.com",
  contact_hours: "Dushanba – Shanba",
  map_embed_url:
    "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3010.8915329724296!2d71.64098787663586!3d41.00574721957972!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x38bb4b872becc29b%3A0xf429ffdd938d2cd!2sNamangan%20muhandislik-qurilish%20instituti!5e0!3m2!1sen!2s!4v1762435231245!5m2!1sen!2s",
  social_telegram: "https://t.me/NamDTU_Asosiy",
  social_instagram: "https://www.instagram.com/namdtu.uz/",
  social_facebook: "https://www.facebook.com/groups/541812625099560/",
  social_youtube: "https://www.youtube.com/channel/UCSZXFN85VpGeOcynxu2kFog",
  social_linkedin: "",
};

const PHD_TECH = "Texnika fanlari boʻyicha falsafa doktori (PhD)";
const PHD_PHYS = "Fizika-matematika fanlari boʻyicha falsafa doktori (PhD)";
const SPEC_MECHATRONICS = "05.02.03 – Texnologik mashinalar. Robotlar, mexatronika va mashina detallari";
const SPEC_SEMICONDUCTORS = "01.04.10 – Yarim oʻtkazgichlar fizikasi";
const SPEC_COMPUTING =
  "05.01.04 – Hisoblash mashinalari, majmualari va kompyuter tarmoqlarining matematik va dasturiy taʼminoti";
const NAMDTU_ATT = "Namangan davlat texnika universiteti “Axborot tizimlari va texnologiyalari” kafedrasi";

// Tarkib, ism-familiyalar, lavozim, ilmiy daraja va mutaxassislik — namdtu.uz kafedra sahifasi
// ("Kafedra tarkibi" va xodimlar profillari) bo'yicha; ilmiy daraja ixtisosligi va yili —
// "Kafedra tarkibi - 2026.xlsx" dan. Shaxsiy maydonlar (telefon, tug'ilgan yil, stavka) repo'da
// saqlanmaydi: ular git'ga kirmaydigan private/staff-private.json orqali import qilinadi.
const staffSeed = [
  {
    fullName: "Roxmonov Durbek Azamjonovich",
    position: "Kafedra mudiri",
    academicDegree: PHD_TECH,
    degreeSpecialty: SPEC_MECHATRONICS,
    degreeYear: 2022,
    academicTitle: "Dotsent",
    titleSpecialty: SPEC_MECHATRONICS,
    titleYear: 2024,
    specialization: "Informatika va axborot texnologiyalari",
    email: "durbekrahmonov@gmail.com",
    photo: true,
    workExperience: lines(
      "2002–2005 — Namangan muhandislik-pedagogika instituti talabasi",
      "2005–2006 — Toshkent axborot texnologiyalari universiteti Fargʻona filiali talabasi",
      "2006–2007 — Namangan muhandislik-pedagogika instituti Axborot texnologiyalari markazida 1-toifali muhandis-dasturchi",
      "2007–2008 — Namangan muhandislik-iqtisodiyot instituti Axborot texnologiyalari va masofaviy oʻqitishni rivojlantirish markazida muhandis-dasturchi",
      "2008–2009 — Namangan muhandislik-iqtisodiyot instituti Axborot texnologiyalari markazining dasturiy taʼminot boʻlimi boshligʻi",
      "2009–2010 — Namangan muhandislik-iqtisodiyot instituti Axborot texnologiyalari markazi rahbari",
      "2010–2012 — Toshkent axborot texnologiyalari universiteti Fargʻona filiali talabasi (magistratura)",
      "2012–2016 — Namangan muhandislik-iqtisodiyot instituti Axborot texnologiyalari markazi muhandis-dasturchisi, Oliy matematika kafedrasi assistenti (oʻrindoshlik)",
      "2016–2018 — Namangan muhandislik-texnologiya instituti Axborot texnologiyalari markazi rahbari",
      "2018–2019 — Agrosanoat majmui ustidan nazorat qilish inspeksiyasi Namangan viloyati boshqarmasi AKTni joriy etish shoʻbasi bosh inspektori",
      "2019–2022 — Namangan muhandislik-texnologiya instituti “Texnologik jarayonlarni avtomatlashtirish va boshqarish va informatsion texnologiyalar” kafedrasi katta oʻqituvchisi",
      "2022–2023 — Namangan muhandislik-texnologiya instituti “Informatsion texnologiyalar” kafedrasi katta oʻqituvchisi",
      "2023–2025 — Namangan muhandislik-texnologiya instituti “Informatsion texnologiyalar” kafedrasi dotsenti",
      `2025–2026 — ${NAMDTU_ATT} dotsenti`,
      `2026 – h.v. — ${NAMDTU_ATT} mudiri`,
    ),
  },
  {
    fullName: "Erkaboyev Ulugʻbek Inayatillayevich",
    position: "Professor",
    academicDegree: "Fizika-matematika fanlari doktori (DSc)",
    degreeSpecialty: SPEC_SEMICONDUCTORS,
    degreeYear: 2019,
    academicTitle: "Professor",
    titleSpecialty: SPEC_SEMICONDUCTORS,
    titleYear: 2023,
    researchArea: "01.04.10 – Yarimoʻtkazgichlar fizikasi",
    achievements:
      "14 ta monografiya, 6 ta oʻquv qoʻllanma, 10 dan ortiq oʻquv-uslubiy majmua, 200 dan ortiq ilmiy maqola va tezislar muallifi. 5 nafar PhD, 15 nafar magistr va 20 nafar bitiruv malakaviy ishiga ilmiy rahbarlik qilgan.",
    subjects:
      "Ilmiy tadqiqot metodologiyasi; Elektronika va sxemalar; Analog va raqamli sxemotexnika; Sxemotexnika; Axborot-kommunikatsiya tizimlarini ishlab chiqish texnologiyasi, arxitekturasi va nanotexnologiyasi",
    email: "erkaboev1983@gmail.com",
    photo: true,
  },
  {
    fullName: "Turakulov Azambek Abdullayevich",
    position: "Dotsent",
    academicDegree: "Texnika fanlari nomzodi",
    degreeSpecialty: "01.01.01 (01.01.03) – Hisoblash matematikasi va diskret matematika",
    degreeYear: 1997,
    academicTitle: "Dotsent",
    titleSpecialty: "05.01.08 – Texnologik jarayonlar va ishlab chiqarishni avtomatlashtirish va boshqarish",
    titleYear: 2020,
    specialization:
      "Matematika, informatika va axborot texnologiyalari, texnologik jarayonlar va ishlab chiqarishni avtomatlashtirish va boshqarish",
    achievements:
      "Jami 142 ta ilmiy va oʻquv-uslubiy ish: 80 ta ilmiy maqola va tezis, 22 ta darslik va oʻquv qoʻllanma, 16 ta monografiya, 24 ta oʻquv-uslubiy ish.",
    email: "aturakulov1961@gmail.com",
    photo: true,
    workExperience: lines(
      "1979–1983 — Toshkent davlat universiteti talabasi",
      "1984–1990 — Toshkent toʻqimachilik va yengil sanoat instituti Namangan filiali umumtexnika fanlari kafedrasi katta laboranti",
      "1990–1993 — Novosibirsk davlat universiteti aspiranti",
      "1993–1997 — Namangan muhandislik-iqtisodiyot instituti “Oliy matematika” kafedrasi assistenti, dotsenti",
      "1997–1999 — Namangan muhandislik-iqtisodiyot instituti Hisoblash markazi boshligʻi",
      "1999–2005 — Namangan muhandislik-iqtisodiyot instituti “Iqtisodiyotda axborotlar tizimi” kafedrasi mudiri",
      "2005–2008 — Namangan muhandislik-iqtisodiyot instituti moliya, soʻngra menejment fakulteti dekani v.b.",
      "2008–2011 — Namangan muhandislik-iqtisodiyot instituti “Amaliy matematika” kafedrasi dotsenti, mudiri",
      "2011–2015 — Namangan muhandislik-texnologiya instituti oʻquv ishlari boʻyicha prorektori",
      "2015–2017 — Namangan muhandislik-texnologiya instituti “Oliy matematika” kafedrasi dotsenti",
      "2017–2022 — Namangan muhandislik-texnologiya instituti “Texnologik jarayonlarni avtomatlashtirish va boshqarish va informatsion texnologiyalar” kafedrasi mudiri v.b., dotsenti",
      "2022–2025 — Namangan muhandislik-texnologiya instituti “Informatsion texnologiyalar” kafedrasi dotsenti",
      `2025 – h.v. — ${NAMDTU_ATT} professori v.b.`,
    ),
  },
  {
    fullName: "Ismanova Klara Dulanboyevna",
    photo: true,
    position: "Dotsent",
    academicDegree: PHD_TECH,
    degreeSpecialty: "05.13.01 – Tizimli tahlil, boshqaruv va axborotni qayta ishlash",
    degreeYear: 2010,
    academicTitle: "Dotsent",
    titleSpecialty: "05.01.02 – Tizimli tahlil, boshqaruv va axborotni qayta ishlash",
    titleYear: 2018,
    specialization: "Matematika",
  },
  {
    fullName: "Uzoqov Farxod Gʻafforovich",
    position: "Dotsent v.b.",
    academicDegree: PHD_PHYS,
    academicTitle: "Dotsent",
    specialization: "Avtomatlashtirilgan tizimlar va hisoblash texnikasining dasturiy taʼminoti",
    researchArea:
      "Jin kolosnigi va uning uzellarini tadqiq etish hamda modellashtirish orqali resurs tejamkorligini oshirish maqsadida parametrlarini optimallashtirish",
    achievements:
      "3 ta oʻquv qoʻllanma, 2 ta monografiya, 50 dan ortiq ilmiy maqola va tezis, 20 dan ortiq oʻquv-uslubiy majmua. Hammualliflikda EHM uchun 20 dan ortiq dasturiy mahsulot guvohnomasi olingan. 6 ta bitiruv malakaviy ishiga rahbarlik qilgan.",
    email: "farxodjonuzoqov@gmail.com",
    photo: true,
    workExperience: lines(`2024 – h.v. — ${NAMDTU_ATT} dotsenti`),
  },
  {
    fullName: "Mullajonova Fotima Tuychibayevna",
    photo: true,
    position: "Dotsent",
    academicDegree: PHD_PHYS,
    degreeSpecialty: SPEC_COMPUTING,
    degreeYear: 2023,
    academicTitle: "Dotsent",
    titleSpecialty: SPEC_COMPUTING,
    titleYear: 2024,
    specialization: "Informatika va axborot texnologiyalari",
  },
  {
    fullName: "Mirzayev Jasurbek Israilovich",
    position: "Dotsent",
    academicDegree: PHD_PHYS,
    degreeSpecialty: SPEC_SEMICONDUCTORS,
    degreeYear: 2023,
    academicTitle: "Dotsent",
    titleSpecialty: SPEC_SEMICONDUCTORS,
    titleYear: 2025,
    specialization: "Axborotlarni yigʻish, qayta ishlash va aks ettirish elektron asboblari va qurilmalari",
    researchArea:
      "Mashinali oʻrganish (ML), yarimoʻtkazgichlar fizikasi, nanooʻlchamli materiallar bilan ishlash texnologiyasining nazariy va amaliy asoslari",
    achievements:
      "5 ta monografiya, 100 dan ortiq ilmiy maqola va tezis, 30 dan ortiq oʻquv-uslubiy majmua, EHM uchun 20 dan ortiq dasturiy mahsulot guvohnomasi hammuallifi.",
    email: "jasmirfir@gmail.com",
    photo: true,
    workExperience: lines(
      "2011–2016 — Namangan muhandislik-pedagogika instituti “Informatika va axborot texnologiyalari” kafedrasi assistenti",
      "2016–2020 — Namangan muhandislik-texnologiya instituti “Texnologik jarayonlarni avtomatlashtirish va boshqarish va informatsion texnologiyalar” kafedrasi assistenti",
      "2020–2023 — Namangan muhandislik-texnologiya instituti “Informatsion texnologiyalar” kafedrasi katta oʻqituvchisi",
      `2023 – h.v. — ${NAMDTU_ATT} dotsenti`,
    ),
  },
  {
    fullName: "Ikromova Musharrafxon Nematillayevna",
    position: "Dotsent",
    academicDegree: "Pedagogika fanlari boʻyicha falsafa doktori (PhD)",
    academicTitle: "Dotsent",
    specialization: "Raqamli texnika va elektr aloqaning boshqaruv tizimlari",
    researchArea: "Maktabgacha yoshdagi bolalarning algoritmik fikrlash koʻnikmalarini shakllantirish metodikasi",
    achievements:
      "80 dan ortiq ilmiy maqola va tezis, 20 dan ortiq oʻquv-uslubiy qoʻllanma, 2 ta oʻquv qoʻllanma va 2 ta monografiya muallifi. 1 nafar magistr va 10 dan ortiq bitiruv malakaviy ishiga rahbarlik qilgan.",
    email: "ikromovamusharraf@gmail.com",
    photo: true,
    workExperience: lines("2000 — Mehnat faoliyatini boshlagan", `2024 – h.v. — ${NAMDTU_ATT} dotsenti`),
  },
  {
    fullName: "Sabirova Ozoda Shermaxamatovna",
    photo: true,
    position: "Dotsent v.b.",
    academicDegree: PHD_TECH,
    academicTitle: "Dotsent",
    specialization: "Taʼlimda axborot texnologiyalari",
  },
  {
    fullName: "Sayidov Nozimjon Abdulnosirovich",
    position: "Dotsent v.b.",
    academicDegree: PHD_PHYS,
    academicTitle: "Dotsent",
    specialization: "Axborot uzatish qurilmalari va tizimlari",
    researchArea:
      "Yarimoʻtkazgichlar fizikasi; hisoblash mashinalari, majmualari va kompyuter tarmoqlarining matematik va dasturiy taʼminoti",
    achievements:
      "4 ta oʻquv qoʻllanma, 100 dan ortiq ilmiy maqola va tezis, 20 dan ortiq oʻquv-uslubiy majmua hammuallifi. Shogirdlari orasida Beruniy nomidagi davlat stipendiyasi sohibi va “Mirzo Ulugʻbek vorislari” tanlovi gʻolibi bor.",
    subjects:
      "Kompyuter tarmoqlari; Kompyuter tizimlari va tarmoqlari; Axborot xavfsizligi; Kiberxavfsizlik asoslari; Kriptografiyaning matematik asoslari; Axborot tizimlariga ommaviy xizmat koʻrsatish",
    email: "sayidovnozimjon@gmail.com",
    photo: true,
    workExperience: lines(
      "2008–2012 — Toshkent axborot texnologiyalari universiteti talabasi",
      "2012–2014 — Toshkent axborot texnologiyalari universiteti magistranti",
      "2014 — Yashnobod kompyuter texnologiyalari kasb-hunar kolleji informatika fani oʻqituvchisi",
      "2014–2016 — Mirzo Ulugʻbek transport kasb-hunar kolleji informatika fani oʻqituvchisi",
      "2016–2017 — Toshkent telekommunikatsiya texnologiyalari kasb-hunar kolleji ishlab chiqarish taʼlimi ustasi",
      "2017–2018 — Namangan qurilish va ijtimoiy-iqtisodiyot kasb-hunar kolleji maxsus fan oʻqituvchisi",
      "2018–2019 — Namangan viloyati Favqulodda vaziyatlar boshqarmasi tezkor navbatchilar guruhi navbatchi dispetcheri",
      "2019–2021 — Namangan muhandislik-texnologiya instituti TJABIT kafedrasi assistenti",
      "2021–2023 — Namangan muhandislik-texnologiya instituti doktoranti",
      "2024–2025 — Namangan muhandislik-texnologiya instituti “Informatsion texnologiyalar” kafedrasi katta oʻqituvchisi",
      `2025 – h.v. — ${NAMDTU_ATT} dotsenti`,
    ),
  },
  {
    fullName: "Raximov Rashid Gʻulomjonovich",
    position: "Katta oʻqituvchi",
    academicDegree: PHD_TECH,
    degreeYear: 2024,
    academicTitle: "Dotsent",
    titleSpecialty: SPEC_COMPUTING,
    titleYear: 2025,
    specialization: "Informatika va axborot texnologiyalari",
  },
  {
    fullName: "Pirnazarov Ulugʻbek Umataliyevich",
    position: "Katta oʻqituvchi",
    academicDegree: PHD_TECH,
    specialization: "Amaliy matematika va axborot texnologiyalari",
    researchArea: "05.02.03 – Texnologik mashinalar. Robotlar, mexatronika va robototexnika tizimlari",
    achievements:
      "Monografiya, 30 dan ortiq ilmiy maqola va tezis, 20 dan ortiq oʻquv-uslubiy majmua muallifi. 2 nafar bitiruv malakaviy ishiga rahbarlik qilgan.",
    email: "upirnazarov909@gmail.com",
    photo: true,
    workExperience: lines(
      "2012–2016 — Namangan muhandislik-texnologiya instituti talabasi",
      "2019–2021 — Namangan davlat universiteti magistranti",
      "2021 — Namangan muhandislik-texnologiya instituti “Informatsion texnologiyalar” kafedrasi laboranti",
      "2022 — Namangan muhandislik-texnologiya instituti “Informatsion texnologiyalar” kafedrasi assistenti",
      `2025 – h.v. — ${NAMDTU_ATT} katta oʻqituvchisi`,
    ),
  },
  {
    fullName: "Dadamirzayev Muzaffar Gʻulomqodirovich",
    position: "Katta oʻqituvchi",
    academicDegree: PHD_PHYS,
    degreeSpecialty: SPEC_SEMICONDUCTORS,
    degreeYear: 2025,
    specialization:
      "Hisoblash mashinalari, komplekslari, tizimlari va tarmoqlarining matematik va dasturiy taʼminoti",
    researchArea: "01.04.10 – Yarimoʻtkazgichlar fizikasi",
    achievements:
      "3 ta oʻquv qoʻllanma, 4 ta monografiya, 100 dan ortiq ilmiy maqola va tezis, 10 dan ortiq oʻquv-uslubiy majmua. 2 nafar bitiruv malakaviy ishiga ilmiy rahbarlik qilgan.",
    email: "muzaffardadamir81@gmail.com",
    photo: true,
    workExperience: lines(
      "1998–2002 — Namangan muhandislik-pedagogika instituti talabasi",
      "2002–2004 — Namangan muhandislik-pedagogika instituti magistranti",
      "2004–2006 — Namangan muhandislik-pedagogika instituti “Informatika va kompyuter texnikasi” kafedrasi assistenti",
      "2010–2016 — Namangan muhandislik-pedagogika instituti “Hisoblash texnikasi” kafedrasi katta oʻqituvchisi",
      "2016–2021 — Namangan muhandislik-qurilish instituti “Axborot texnologiyalari” kafedrasi katta oʻqituvchisi",
      "2021–2022 — Namangan muhandislik-qurilish instituti stajyor-tadqiqotchisi",
      "2022–2025 — Namangan muhandislik-texnologiya instituti tayanch doktoranti",
      "2025 — Namangan muhandislik-texnologiya instituti “Informatsion texnologiyalar” kafedrasi katta oʻqituvchisi",
      `2025 – h.v. — ${NAMDTU_ATT} katta oʻqituvchisi`,
    ),
  },
  {
    fullName: "Negmatov Ulugʻbek Mirzabaxrom oʻgʻli",
    photo: true,
    position: "Katta oʻqituvchi",
    specialization: "Informatika va axborot texnologiyalari",
  },
  {
    fullName: "Isomaddinov Usmonali Mamurjonovich",
    position: "Katta oʻqituvchi",
    specialization: "Informatika va axborot texnologiyalari",
    photo: true,
  },
  {
    fullName: "Rajabov Jahongir Ikromjon oʻgʻli",
    position: "Oʻqituvchi",
    specialization: "Informatika va hisoblash texnikasi",
    achievements: "2 ta oʻquv qoʻllanma, 25 dan ortiq ilmiy maqola va tezis, 20 dan ortiq oʻquv-uslubiy majmua.",
    email: "rajabovjahongir3261692@gmail.com",
    photo: true,
    workExperience: lines(
      "2018–2022 — Namangan muhandislik-texnologiya instituti va Yu. A. Gagarin nomidagi Saratov davlat texnika universiteti (bakalavriat)",
      "2022–2024 — Yu. A. Gagarin nomidagi Saratov davlat texnika universiteti magistranti",
      "2024–2025 — Namangan muhandislik-texnologiya instituti assistenti",
      `2025 – h.v. — ${NAMDTU_ATT} oʻqituvchisi`,
    ),
  },
  {
    fullName: "Obidjanov Musobek Olimjon oʻgʻli",
    position: "Oʻqituvchi",
    departmentRole: "Kafedra mudiri yordamchisi",
    specialization: "Informatika va hisoblash texnikasi",
    researchArea: "Texnologik mashinalar. Robotlar, mexatronika va robototexnika tizimlari (mustaqil izlanuvchi)",
    achievements: "2 ta oʻquv qoʻllanma, 15 dan ortiq ilmiy maqola va tezis, 12 dan ortiq oʻquv-uslubiy majmua hammuallifi.",
    email: "musobek.obidjanov@yandex.com",
    photo: true,
    workExperience: lines(
      "2018–2022 — Namangan muhandislik-texnologiya instituti va Yu. A. Gagarin nomidagi Saratov davlat texnika universiteti (bakalavriat)",
      "2022–2024 — Yu. A. Gagarin nomidagi Saratov davlat texnika universiteti magistranti",
      "2024–2025 — Namangan muhandislik-texnologiya instituti assistenti",
      `2025 – h.v. — ${NAMDTU_ATT} oʻqituvchisi`,
    ),
  },
  {
    fullName: "Abdugʻaniyev Nodirbek Nabijon oʻgʻli",
    position: "Oʻqituvchi",
    specialization: "Informatika",
  },
  {
    fullName: "Tursunov Muxriddin Muxammad oʻgʻli",
    position: "Oʻqituvchi",
    specialization: "Amaliy matematika va informatika",
    researchArea:
      "Zamonaviy axborot texnologiyalari va dasturiy vositalarni taʼlim jarayonida hamda amaliy masalalarni yechishda samarali qoʻllash",
    achievements:
      "1 ta monografiya, 10 dan ortiq oʻquv-uslubiy qoʻllanma, 10 ta uslubiy koʻrsatma, 25 dan ortiq ilmiy maqola va tezis muallifi. Talabalarning kurs ishlari va bitiruv malakaviy ishlariga ilmiy rahbarlik qiladi.",
    subjects:
      "Dasturlash 1, 2; Operatsion tizimlar; Amaliy dasturlar paketi; Informatika; Axborot texnologiyalari; Algoritmlar va maʼlumotlar tuzilmasi",
    email: "m.tursunov@alumni.nsu.ru",
    photo: true,
  },
  {
    fullName: "Mirzamahmudov Azamatjon Baxtiyor oʻgʻli",
    photo: true,
    position: "Oʻqituvchi",
    specialization: "Kriptografiya va kriptoanaliz",
  },
  {
    fullName: "Temirov Qudratali Abduvahob oʻgʻli",
    position: "Oʻqituvchi",
    specialization: "Amaliy informatika",
    researchArea: "Kichik oʻlchamli yarimoʻtkazgichli strukturalarda kvant Xoll effektiga deformatsiya va haroratning taʼsiri",
    achievements: "1 ta monografiya, 20 dan ortiq ilmiy maqola va tezis, 8 dan ortiq oʻquv-uslubiy majmua.",
    email: "t.q.a.1997@gmail.com",
    photo: true,
    workExperience: lines(
      "2016–2020 — Qozon federal universiteti talabasi (bakalavriat)",
      "2020–2021 — “KamAZ” PAJ 3-toifali muhandis-texnologi",
      "2021–2023 — Qozon federal universiteti magistranti",
      "2023–2024 — Namangan muhandislik-qurilish instituti “Umumtexnika fanlari” kafedrasi laboranti",
      "2024–2025 — Namangan muhandislik-texnologiya instituti “Informatsion texnologiyalar” kafedrasi assistenti",
      `2025 – h.v. — ${NAMDTU_ATT} oʻqituvchisi`,
    ),
  },
  {
    fullName: "Faxriddinov Jamoliddin Shamsiddin oʻgʻli",
    position: "Oʻqituvchi",
    specialization: "Amaliy matematika va informatika",
    photo: true,
    workExperience: lines(
      "2017–2021 — Namangan davlat universiteti talabasi",
      "2020 — “Ziyonur” oʻquv markazida matematika oʻqituvchisi",
      "2021–2023 — Novosibirsk davlat universiteti talabasi",
      "2023–2025 — Namangan muhandislik-texnologiya instituti assistent-oʻqituvchisi",
      `2025 – h.v. — ${NAMDTU_ATT} assistent-oʻqituvchisi`,
    ),
  },
  {
    fullName: "Yandashaliyev Dilshodbek Xamidullo oʻgʻli",
    photo: true,
    position: "Stajyor-oʻqituvchi",
    specialization: "Amaliy matematika (sohalar boʻyicha)",
  },
  {
    fullName: "Umarova Benazir Botirjon qizi",
    photo: true,
    position: "Oʻqituvchi",
    departmentRole: "Ilmiy kotib",
    specialization: "Amaliy matematika (sohalar boʻyicha)",
  },
];

export const seedStaff = staffSeed.map(({ photo, ...member }, i) => {
  const slug = slugify(member.fullName);
  return {
    ...member,
    slug,
    photo: photo ? `/images/xodimlar/${slug}.webp` : null,
    sortOrder: (i + 1) * 10,
  };
});

/** `coordinators` — mas'ul o'qituvchilar familiyalari (seedStaff bilan bog'lanadi). */
export const seedPrograms = [
  {
    code: "60610100",
    title: "Axborot tizimlari va texnologiyalari",
    level: "Bakalavriat",
    description:
      "Axborot tizimlarini loyihalash, ishlab chiqish, joriy etish va ularga xizmat koʻrsatish. Dasturni ASIIN xalqaro akkreditatsiyasidan oʻtkazish rejalashtirilgan.",
    coordinators: ["Mirzayev", "Rajabov", "Temirov"],
  },
  {
    code: "60610200",
    title: "Axborot xavfsizligi",
    level: "Bakalavriat",
    description: "Maʼlumotlar va kompyuter tarmoqlarini himoyalash, xavfsizlik tahdidlarini aniqlash va bartaraf etish.",
    coordinators: ["Sayidov", "Mirzamahmudov", "Obidjanov"],
  },
  {
    code: "60610300",
    title: "Kompyuter injiniringi",
    level: "Bakalavriat",
    description: "Kompyuter tizimlari, tarmoqlar va apparat-dasturiy majmualarni loyihalash hamda ulardan foydalanish.",
    coordinators: ["Mirzayev", "Tursunov", "Faxriddinov"],
  },
  {
    code: "60610800",
    title: "Axborot texnologiyalarining dasturiy taʼminoti",
    level: "Bakalavriat",
    description: "Dasturiy taʼminotni loyihalash, ishlab chiqish, testlash va qoʻllab-quvvatlash.",
    coordinators: ["Uzoqov", "Pirnazarov", "Umarova"],
  },
  {
    code: "60611300",
    title: "Axborot-kommunikatsiya texnologiyalari sohasida kasb taʼlimi",
    level: "Bakalavriat",
    description: "Axborot-kommunikatsiya texnologiyalari fanlari boʻyicha pedagog-mutaxassislar tayyorlash.",
    coordinators: ["Ikromova", "Dadamirzayev", "Yandashaliyev"],
  },
  {
    code: "70610201",
    title: "Kompyuter tizimlari va ularning dasturiy taʼminoti (tarmoqlar va sohalar boʻyicha)",
    level: "Magistratura",
    description:
      "Kompyuter tizimlari va ularning dasturiy taʼminotini tadqiq etish va ishlab chiqish. Dasturni ASIIN xalqaro akkreditatsiyasidan oʻtkazish rejalashtirilgan.",
    coordinators: ["Erkaboyev", "Ismanova", "Roxmonov"],
  },
].map((program, i) => ({ ...program, sortOrder: (i + 1) * 10 }));

export const seedCards = [
  {
    section: "department",
    title: "Ilmiy faoliyat",
    image: "/images/site/akkreditatsiya.webp",
    description:
      "Kafedra oʻqituvchilari Belarus milliy texnika universiteti (BNTU) bilan hamkorlikda “Yuqori harorat va kuchli mikrotoʻlqinli maydondagi nanostrukturali yarimoʻtkazgichlarda magnitqarshilik, magnit singdiruvchanlik va magnitooptik yutilish koeffitsiyentlarini aniqlash” mavzusidagi umumiy qiymati 2 427 631 000 soʻm boʻlgan fundamental loyiha ustida ishlamoqda. Har yili Scopus va Web of Science bazalarida maqolalar chop etiladi, EHM uchun dasturlar rasmiy roʻyxatdan oʻtkaziladi.",
  },
  {
    section: "department",
    title: "Xalqaro hamkorlik",
    image: "/images/site/hamkorlik.webp",
    description:
      "Belarus milliy texnika universiteti hamda Xitoy Xalq Respublikasining yetakchi oliy taʼlim va ilmiy muassasalari bilan qoʻshma ilmiy loyihalar rejalashtirilgan. Erasmus+ dasturi doirasidagi konsorsiumlar, qoʻshma oʻquv kurslari va nashrlar ustida ish olib borilmoqda.",
  },
  {
    section: "department",
    title: "Amaliyot va laboratoriyalar",
    image: "/images/site/ochiq-dars.webp",
    description:
      "Talabalar zamonaviy kompyuter sinflari, internetga ulangan oʻquv laboratoriyalari hamda elektronika va raqamli texnologiyalar laboratoriyalarida taʼlim oladi. Amaliyot bazalari: IT Park, Infinbank, UzChasys.",
  },
  {
    section: "university",
    title: "Tashkil topishi",
    description:
      "2025-yil 24-yanvardagi PQ-23-son Prezident qarori asosida uchta institut negizida tashkil etilgan.",
  },
  {
    section: "university",
    title: "8 ta fakultet",
    description:
      "Arxitektura va qurilish; Yashil transformatsiya va texnologiya; Mexanika va yengil sanoat muhandisligi; Biznesni boshqarish; Iqtisodiyot; Transport va logistika; Energetika muhandisligi; Axborot texnologiyalari va sunʼiy intellekt.",
  },
  {
    section: "university",
    title: "Fakultet salohiyati",
    description:
      "Axborot texnologiyalari va sunʼiy intellekt fakultetida 105 nafar professor-oʻqituvchi faoliyat yuritadi: 7 nafar fan doktori va professor, 40 nafar fan nomzodi va dotsent.",
  },
].map((card, i) => ({ ...card, sortOrder: (i + 1) * 10 }));

export const seedLinks = [
  { title: "Namangan davlat texnika universiteti", url: "https://namdtu.uz" },
  { title: "Oliy taʼlim, fan va innovatsiyalar vazirligi", url: "https://edu.uz" },
  { title: "ZiyoNET taʼlim portali", url: "https://ziyonet.uz" },
].map((link, i) => ({ ...link, sortOrder: (i + 1) * 10 }));
