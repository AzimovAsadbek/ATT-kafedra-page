import erkabayev from "@/public/images/erkaboyev_ulugbek.jpg";

import turakulov from "@/public/images/turakulov_a.jpg";
import rahmonov from "@/public/images/rahmonov_d.jpg";
import dadamirzayev from "@/public/images/dadamirzayev_m.jpg";
import faxriddinov from "@/public/images/faxriddinov_j.jpg";
import isomaddinov from "@/public/images/isomaddinov_u.jpg";
import sayidov from "@/public/images/sayidov_n.jpg";
import tursunov from "@/public/images/tursunov_m.jpg";
const staffData = [
  {
    name: "Erkaboyev Ulug'bek Inayatillayevich",
    position: "Kaf.mud. Professor",
    subject: "Erkaboyev Ulug'bek Inayatillayevich",
    email: "Erkaboyev Ulug'bek Inayatillayevich",
    photo: erkabayev,
  },
  {
    name: "Turakulov Azambek Abdullayevich",
    position: "Dotsent",
    subject: "Turakulov Azambek Abdullayevich",
    email: "Turakulov Azambek Abdullayevich",
    photo: turakulov,
  },
  {
    name: "Ismanova Klara Do'lanboyeva",
    position: "Dotsent",
    subject: "Ismanova Klara Do'lanboyeva",
    email: "Ismanova Klara Do'lanboyeva",
    // photo:
    //   "https://st5.depositphotos.com/2760050/74592/i/450/depositphotos_745925384-stock-photo-businessman-portrait-outdoor-smiling-mature.jpg",
  },
  {
    name: "Mullajonova Fotima To'ychiboyevna",
    position: "Dotsent",
    subject: "Mullajonova Fotima To'ychiboyevna",
    email: "Mullajonova Fotima To'ychiboyevna",
    // photo:
    //   "https://st5.depositphotos.com/2760050/74592/i/450/depositphotos_745925384-stock-photo-businessman-portrait-outdoor-smiling-mature.jpg",
  },
  {
    name: "Roxmonov Durbek A'zamovich",
    position: "Dotsent",
    subject: "Roxmonov Durbek A'zamovich",
    email: "Roxmonov Durbek A'zamovich",
    photo: rahmonov,
  },
  {
    name: "Mirzayev Jasurbek Isroilovich",
    position: "Dotsent",
    subject: "Mirzayev Jasurbek Isroilovich",
    email: "Mirzayev Jasurbek Isroilovich",
    // photo:
    //   "https://st5.depositphotos.com/2760050/74592/i/450/depositphotos_745925384-stock-photo-businessman-portrait-outdoor-smiling-mature.jpg",
  },
  {
    name: "Uzoqov Farhod",
    position: "Dotsent",
    subject: "Uzoqov Farhod",
    email: "Uzoqov Farhod",
    // photo:
    //   "https://st5.depositphotos.com/2760050/74592/i/450/depositphotos_745925384-stock-photo-businessman-portrait-outdoor-smiling-mature.jpg",
  },
  {
    name: "Ikromova Musharrafxon Nematullayevna",
    position: "Dotsent",
    subject: "Ikromova Musharrafxon Nematullayevna",
    email: "Ikromova Musharrafxon Nematullayevna",
    // photo:
    //   "https://st5.depositphotos.com/2760050/74592/i/450/depositphotos_745925384-stock-photo-businessman-portrait-outdoor-smiling-mature.jpg",
  },
  {
    name: "Sabirova Ozoda",
    position: "Dotsent",
    subject: "Sabirova Ozoda",
    email: "Sabirova Ozoda",
    // photo:
    //   "https://st5.depositphotos.com/2760050/74592/i/450/depositphotos_745925384-stock-photo-businessman-portrait-outdoor-smiling-mature.jpg",
  },
  {
    name: "Sayidov Nozimjon Abdulnosirovich",
    position: "Dotsent",
    subject: "Sayidov Nozimjon Abdulnosirovich",
    email: "Sayidov Nozimjon Abdulnosirovich",
    // photo:
    //   "https://st5.depositphotos.com/2760050/74592/i/450/depositphotos_745925384-stock-photo-businessman-portrait-outdoor-smiling-mature.jpg",
  },
  {
    name: "Pirnazarov Ulug'bek Ummatillayevich",
    position: "Kat.o‘q (PhD)",
    subject: "Pirnazarov Ulug'bek Ummatillayevich",
    email: "Pirnazarov Ulug'bek Ummatillayevich",
    // photo:
    //   "https://st5.depositphotos.com/2760050/74592/i/450/depositphotos_745925384-stock-photo-businessman-portrait-outdoor-smiling-mature.jpg",
  },
  {
    name: "Dadamirzayev Muzaffar G‘ulomqorivich",
    position: "Kat.o‘q.",
    subject: "Dadamirzayev Muzaffar G‘ulomqorivich",
    email: "Dadamirzayev Muzaffar G‘ulomqorivich",
    photo: dadamirzayev,
  },
  {
    name: "Negmatov Ulug'bek Mirzabahrom o'g'li",
    position: "Kat.o‘q.",
    subject: "Negmatov Ulug'bek Mirzabahrom o'g'li",
    email: "Negmatov Ulug'bek Mirzabahrom o'g'li",
    // photo:
    //   "https://st5.depositphotos.com/2760050/74592/i/450/depositphotos_745925384-stock-photo-businessman-portrait-outdoor-smiling-mature.jpg",
  },
  {
    name: "Isomaddinov Usmonali",
    position: "Kat.o‘q.",
    subject: "Isomaddinov Usmonali",
    email: "Isomaddinov Usmonali",
    photo: isomaddinov,
  },
  {
    name: "Tursunov Muxriddin Muxammad o'g'li",
    position: "O‘qituvchi",
    subject: "Tursunov Muxriddin Muxammad o'g'li",
    email: "Tursunov Muxriddin Muxammad o'g'li",
    photo: tursunov,
  },
  {
    name: "Faxriddinov Jamoliddin Shamsiddin o'g'li",
    position: "O‘qituvchi",
    subject: "Faxriddinov Jamoliddin Shamsiddin o'g'li",
    email: "Faxriddinov Jamoliddin Shamsiddin o'g'li",
    photo: faxriddinov,
  },
  {
    name: "Mirzamaxmudov Azamat Baxtiyor o'g'li",
    position: "O‘qituvchi",
    subject: "Mirzamaxmudov Azamat Baxtiyor o'g'li",
    email: "Mirzamaxmudov Azamat Baxtiyor o'g'li",
    // photo:
    //   "https://st5.depositphotos.com/2760050/74592/i/450/depositphotos_745925384-stock-photo-businessman-portrait-outdoor-smiling-mature.jpg",
  },
  {
    name: "Rajabov Jahongir",
    position: "O‘qituvchi",
    subject: "Rajabov Jahongir",
    email: "Rajabov Jahongir",
    // photo:
    //   "https://st5.depositphotos.com/2760050/74592/i/450/depositphotos_745925384-stock-photo-businessman-portrait-outdoor-smiling-mature.jpg",
  },
  {
    name: "Abdug'aniyev Nodirbek",
    position: "O‘qituvchi",
    subject: "Abdug'aniyev Nodirbek",
    email: "Abdug'aniyev Nodirbek",
    // photo:
    //   "https://st5.depositphotos.com/2760050/74592/i/450/depositphotos_745925384-stock-photo-businessman-portrait-outdoor-smiling-mature.jpg",
  },
  {
    name: "Temirov Qudratali",
    position: "O‘qituvchi",
    subject: "Temirov Qudratali",
    email: "Temirov Qudratali",
    // photo:
    //   "https://st5.depositphotos.com/2760050/74592/i/450/depositphotos_745925384-stock-photo-businessman-portrait-outdoor-smiling-mature.jpg",
  },
  {
    name: "Obidjanov Musobek",
    position: "O‘qituvchi",
    subject: "Obidjanov Musobek",
    email: "Obidjanov Musobek",
    // photo:
    //   "https://st5.depositphotos.com/2760050/74592/i/450/depositphotos_745925384-stock-photo-businessman-portrait-outdoor-smiling-mature.jpg",
  },
  {
    name: "Raximov Rashid",
    position: "Kat.o‘q (PhD)",
    subject: "Raximov Rashid",
    email: "Raximov Rashid",
    // photo:
    //   "https://st5.depositphotos.com/2760050/74592/i/450/depositphotos_745925384-stock-photo-businessman-portrait-outdoor-smiling-mature.jpg",
  },
];

export default staffData;
