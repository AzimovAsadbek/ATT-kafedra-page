import { Source_Sans_3, Source_Serif_4 } from "next/font/google";
import "./globals.css";

// Ikkala shriftda ham o'zbekcha ʻ/ʼ (U+02BB/U+02BC) belgilari normal kenglikda chiziladi
// (masalan, IBM Plex Sans'da ular juda keng bo'lib, "o ʻ qituvchi" kabi ko'rinadi).
const heading = Source_Serif_4({
  subsets: ["latin", "latin-ext"],
  variable: "--font-heading",
  display: "swap",
});

const body = Source_Sans_3({
  subsets: ["latin", "latin-ext"],
  variable: "--font-body",
  display: "swap",
});

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";
const TITLE = "Axborot tizimlari va texnologiyalari kafedrasi";
const DESCRIPTION =
  "Namangan davlat texnika universiteti “Axborot tizimlari va texnologiyalari” kafedrasining rasmiy sahifasi: taʼlim yoʻnalishlari, professor-oʻqituvchilar va bogʻlanish.";

export const metadata = {
  metadataBase: new URL(SITE_URL),
  title: { default: TITLE, template: `%s | ATT kafedrasi` },
  description: DESCRIPTION,
  keywords: ["ATT kafedrasi", "Axborot tizimlari", "NamDTU", "Namangan davlat texnika universiteti", "IT taʼlim"],
  openGraph: {
    type: "website",
    locale: "uz_UZ",
    url: "/",
    siteName: "ATT kafedrasi",
    title: TITLE,
    description: DESCRIPTION,
  },
  alternates: { canonical: "/" },
};

export const viewport = {
  themeColor: "#0e182f",
};

export default function RootLayout({ children }) {
  return (
    <html lang="uz" data-scroll-behavior="smooth" className={`${heading.variable} ${body.variable}`}>
      <body>{children}</body>
    </html>
  );
}
