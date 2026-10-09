import ActivitySection from "@/components/site/home/ActivitySection";
import ContactSection from "@/components/site/home/ContactSection";
import DepartmentSection from "@/components/site/home/DepartmentSection";
import HomeHero from "@/components/site/home/HomeHero";
import ProgramsSection from "@/components/site/home/ProgramsSection";
import StaffPreview from "@/components/site/home/StaffPreview";
import UniversitySection from "@/components/site/home/UniversitySection";
import { getHomePageData } from "@/lib/data/site";

// Sahifa statik generatsiya qilinadi va admin paneldagi har bir o'zgarishdan so'ng
// revalidatePath() orqali yangilanadi. Qo'shimcha xavfsizlik uchun — har soatda.
export const revalidate = 3600;

function jsonLd(settings) {
  const data = {
    "@context": "https://schema.org",
    "@type": "EducationalOrganization",
    name: "Axborot tizimlari va texnologiyalari kafedrasi",
    parentOrganization: {
      "@type": "CollegeOrUniversity",
      name: "Namangan davlat texnika universiteti",
      url: settings.university_website || undefined,
    },
    url: process.env.NEXT_PUBLIC_SITE_URL,
    email: settings.contact_email || undefined,
    telephone: settings.contact_phone || undefined,
    address: settings.contact_address || undefined,
  };
  return JSON.stringify(data).replace(/</g, "\\u003c");
}

export default async function HomePage() {
  const { settings, staff, portraits, programs, universityCards, departmentCards, stats } = await getHomePageData();

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLd(settings) }} />
      <HomeHero settings={settings} stats={stats} portraits={portraits} />
      <DepartmentSection settings={settings} staff={staff} />
      <ProgramsSection programs={programs} intro={settings.programs_intro} />
      <StaffPreview staff={staff} intro={settings.staff_intro} />
      <ActivitySection cards={departmentCards} />
      <UniversitySection settings={settings} cards={universityCards} />
      <ContactSection settings={settings} />
    </>
  );
}
