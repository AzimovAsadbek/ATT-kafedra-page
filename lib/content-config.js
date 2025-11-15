// Admin paneldagi barcha boshqariladigan kontent turlari va sozlamalar tavsifi.
// Bu yerda faqat oddiy (serializable) ma'lumot bor: fayl ham server, ham client
// komponentlarida ishlatiladi. Maydon turlari: text | textarea | email | tel | url |
// number | select | checkbox | image | relation (ko'pga-ko'p bog'lanish, lib/data/content.js).

export const STAFF_POSITIONS = [
  "Kafedra mudiri",
  "Professor",
  "Dotsent",
  "Katta oʻqituvchi",
  "Oʻqituvchi",
  "Stajyor-oʻqituvchi",
  "Assistent",
];

export const ACADEMIC_TITLES = ["Professor", "Dotsent", "Katta ilmiy xodim"];

export const EMPLOYMENT_TYPES = ["Asosiy", "Oʻrindosh"];

export const PROGRAM_LEVELS = ["Bakalavriat", "Magistratura", "Doktorantura"];

const orderingFields = [
  {
    name: "sortOrder",
    label: "Tartib raqami",
    type: "number",
    default: 0,
    hint: "Kichik raqamlar birinchi koʻrsatiladi",
  },
  { name: "isPublished", label: "Saytda koʻrsatish", type: "checkbox", default: true },
];

const cardFields = [
  { name: "title", label: "Sarlavha", type: "text", required: true, maxLength: 120 },
  { name: "description", label: "Matn", type: "textarea", rows: 5, maxLength: 1000 },
  { name: "image", label: "Rasm (ixtiyoriy)", type: "image" },
  ...orderingFields,
];

export const RESOURCES = {
  staff: {
    table: "staff",
    title: "Oʻqituvchilar",
    singular: "Oʻqituvchi",
    description: "Kafedra professor-oʻqituvchilari va xodimlari roʻyxati",
    titleField: "fullName",
    imageField: "photo",
    columns: [
      { name: "fullName", label: "F.I.Sh." },
      { name: "position", label: "Lavozimi" },
      { name: "employmentType", label: "Faoliyat turi" },
      { name: "rate", label: "Stavka" },
    ],
    fields: [
      { group: "Asosiy maʼlumotlar", name: "fullName", label: "F.I.Sh.", type: "text", required: true, maxLength: 120 },
      {
        name: "slug",
        label: "Sahifa manzili (slug)",
        type: "text",
        maxLength: 80,
        pattern: "slug",
        hint: "/oqituvchilar/<slug>. Boʻsh qoldirilsa, F.I.Sh. dan avtomatik yaratiladi",
      },
      { name: "position", label: "Lavozimi", type: "select", required: true, options: STAFF_POSITIONS },
      {
        name: "departmentRole",
        label: "Kafedradagi qoʻshimcha vazifasi",
        type: "text",
        maxLength: 80,
        hint: "Masalan: Kafedra mudiri yordamchisi, Ilmiy kotib",
      },
      {
        name: "employmentType",
        label: "Faoliyat turi",
        type: "select",
        required: true,
        options: EMPLOYMENT_TYPES,
        default: "Asosiy",
      },
      {
        name: "rate",
        label: "Stavkasi",
        type: "number",
        step: 0.25,
        min: 0,
        max: 2,
        default: 1,
        hint: "Asosiy va ichki oʻrindoshlik stavkalari yigʻindisi (masalan, 1,25)",
      },
      {
        name: "birthYear",
        label: "Tugʻilgan yili",
        type: "number",
        min: 1930,
        max: 2015,
        hint: "Saytda koʻrsatilmaydi",
      },
      {
        group: "Ilmiy daraja va unvon",
        name: "academicDegree",
        label: "Ilmiy darajasi",
        type: "text",
        maxLength: 150,
        hint: "Masalan: Texnika fanlari boʻyicha falsafa doktori (PhD)",
      },
      { name: "degreeYear", label: "Ilmiy daraja olgan yili", type: "number", min: 1950, max: 2100 },
      {
        name: "degreeSpecialty",
        label: "Ilmiy daraja ixtisosligi (shifri va nomi)",
        type: "text",
        maxLength: 255,
        wide: true,
      },
      { name: "academicTitle", label: "Ilmiy unvoni", type: "select", options: ACADEMIC_TITLES },
      { name: "titleYear", label: "Ilmiy unvon olgan yili", type: "number", min: 1950, max: 2100 },
      {
        name: "titleSpecialty",
        label: "Ilmiy unvon ixtisosligi (shifri va nomi)",
        type: "text",
        maxLength: 255,
        wide: true,
      },
      {
        group: "Profil",
        name: "specialization",
        label: "Mutaxassisligi",
        type: "text",
        maxLength: 200,
        wide: true,
      },
      { name: "researchArea", label: "Ilmiy yoʻnalishi", type: "textarea", rows: 2, maxLength: 600 },
      {
        name: "achievements",
        label: "Ilmiy-oʻquv natijalari",
        type: "textarea",
        rows: 3,
        maxLength: 1500,
        hint: "Monografiyalar, maqolalar, oʻquv qoʻllanmalar, ilmiy rahbarlik",
      },
      {
        name: "workExperience",
        label: "Mehnat faoliyati",
        type: "textarea",
        rows: 8,
        maxLength: 6000,
        hint: "Har bir qatorga bittadan: «2016–2020 — Lavozim va tashkilot»",
      },
      {
        name: "subjects",
        label: "Oʻtadigan fanlari",
        type: "textarea",
        rows: 3,
        maxLength: 500,
        hint: "Fanlarni vergul bilan ajrating",
      },
      { group: "Aloqa va rasm", name: "email", label: "Email", type: "email", hint: "Saytda koʻrsatiladi" },
      { name: "phone", label: "Bogʻlanish raqami", type: "tel", hint: "Shaxsiy raqam — saytda koʻrsatilmaydi" },
      { name: "photo", label: "Rasm", type: "image", hint: "Portret (3:4) rasm tavsiya etiladi" },
      { group: "Koʻrinish", ...orderingFields[0] },
      orderingFields[1],
    ],
  },
  programs: {
    table: "programs",
    title: "Taʼlim yoʻnalishlari",
    singular: "Yoʻnalish",
    description: "Kafedra tayyorlov olib boradigan yoʻnalishlar",
    titleField: "title",
    columns: [
      { name: "title", label: "Nomi" },
      { name: "level", label: "Bosqich" },
      { name: "code", label: "Shifr" },
    ],
    fields: [
      { name: "title", label: "Yoʻnalish nomi", type: "text", required: true, maxLength: 150 },
      { name: "code", label: "Shifr", type: "text", maxLength: 20, hint: "Masalan: 60610500" },
      {
        name: "level",
        label: "Taʼlim bosqichi",
        type: "select",
        required: true,
        options: PROGRAM_LEVELS,
      },
      { name: "description", label: "Tavsif", type: "textarea", rows: 4, maxLength: 800 },
      {
        name: "coordinatorIds",
        label: "Masʼul oʻqituvchilar",
        type: "relation",
        relation: "coordinators",
        hint: "Yoʻnalish sahifasida va oʻqituvchi profilida koʻrsatiladi",
      },
      ...orderingFields,
    ],
  },
  "department-cards": {
    table: "cards",
    scope: { section: "department" },
    title: "Kafedra faoliyati",
    singular: "Karta",
    description: "“Faoliyat” boʻlimidagi bloklar: ilmiy ishlar, xalqaro hamkorlik va boshqalar",
    titleField: "title",
    imageField: "image",
    columns: [{ name: "title", label: "Sarlavha" }],
    fields: cardFields,
  },
  "university-cards": {
    table: "cards",
    scope: { section: "university" },
    title: "Universitet maʼlumotlari",
    singular: "Karta",
    description: "“Universitet” boʻlimidagi qisqa maʼlumot bloklari",
    titleField: "title",
    imageField: "image",
    columns: [{ name: "title", label: "Sarlavha" }],
    fields: cardFields,
  },
  links: {
    table: "links",
    title: "Foydali havolalar",
    singular: "Havola",
    description: "Sayt pastki qismidagi (footer) havolalar",
    titleField: "title",
    columns: [
      { name: "title", label: "Nomi" },
      { name: "url", label: "Manzil" },
    ],
    fields: [
      { name: "title", label: "Nomi", type: "text", required: true, maxLength: 80 },
      { name: "url", label: "Havola (URL)", type: "url", required: true },
      ...orderingFields,
    ],
  },
};

export const SETTINGS_GROUPS = [
  {
    title: "Bosh ekran",
    fields: [
      { name: "hero_title", label: "Sarlavha", type: "text", required: true, maxLength: 160 },
      { name: "hero_subtitle", label: "Qisqa tavsif", type: "textarea", rows: 3, maxLength: 400 },
    ],
  },
  {
    title: "Kafedra",
    fields: [
      { name: "dept_faculty", label: "Fakultet", type: "text", maxLength: 150 },
      { name: "dept_founded", label: "Tashkil topgan", type: "text", maxLength: 100 },
      { name: "dept_location", label: "Joylashuvi", type: "text", maxLength: 100 },
      { name: "department_intro", label: "Maqsad (asosiy matn)", type: "textarea", rows: 4, maxLength: 1500 },
      { name: "dept_accreditation", label: "Akkreditatsiya", type: "textarea", rows: 3, maxLength: 800 },
      {
        name: "dept_tasks",
        label: "Vazifalar",
        type: "textarea",
        rows: 7,
        maxLength: 2000,
        hint: "Har bir qatorga bitta vazifa",
      },
    ],
  },
  {
    title: "Boʻlim matnlari",
    fields: [
      { name: "programs_intro", label: "Taʼlim yoʻnalishlari", type: "textarea", rows: 3, maxLength: 600 },
      { name: "staff_intro", label: "Professor-oʻqituvchilar", type: "textarea", rows: 3, maxLength: 600 },
      { name: "contact_intro", label: "Bogʻlanish", type: "textarea", rows: 3, maxLength: 600 },
      { name: "footer_about", label: "Footer matni", type: "textarea", rows: 3, maxLength: 400 },
    ],
  },
  {
    title: "Universitet",
    fields: [
      { name: "university_intro", label: "Universitet haqida", type: "textarea", rows: 5, maxLength: 1500 },
      { name: "university_rector", label: "Rektor", type: "text", maxLength: 200 },
      { name: "university_address", label: "Manzil", type: "text", maxLength: 200 },
      { name: "university_phone", label: "Telefon", type: "tel" },
      { name: "university_email", label: "Email", type: "email" },
      { name: "university_website", label: "Rasmiy sayt", type: "url" },
    ],
  },
  {
    title: "Kafedra bilan aloqa",
    fields: [
      { name: "contact_address", label: "Manzil", type: "text", maxLength: 200 },
      { name: "contact_phone", label: "Telefon", type: "tel" },
      { name: "contact_email", label: "Email", type: "email" },
      { name: "contact_hours", label: "Ish kunlari / vaqti", type: "text", maxLength: 100 },
      {
        name: "map_embed_url",
        label: "Google Maps embed havolasi",
        type: "url",
        allowedPrefix: "https://www.google.com/maps/embed",
        hint: "Google Maps → Ulashish → Xaritani joylashtirish → src qiymati",
      },
    ],
  },
  {
    title: "Ijtimoiy tarmoqlar",
    description: "Boʻsh qoldirilgan tarmoqlar saytda koʻrsatilmaydi",
    fields: [
      { name: "social_telegram", label: "Telegram", type: "url" },
      { name: "social_instagram", label: "Instagram", type: "url" },
      { name: "social_facebook", label: "Facebook", type: "url" },
      { name: "social_youtube", label: "YouTube", type: "url" },
      { name: "social_linkedin", label: "LinkedIn", type: "url" },
    ],
  },
];

export const SETTINGS_FIELDS = SETTINGS_GROUPS.flatMap((group) => group.fields);
