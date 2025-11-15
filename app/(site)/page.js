import Contact from "@/components/site/Contact";
import FeatureCards from "@/components/site/FeatureCards";
import Hero from "@/components/site/Hero";
import Programs from "@/components/site/Programs";
import SectionHeader from "@/components/site/SectionHeader";
import StaffDirectory from "@/components/site/StaffDirectory";
import { getHomePageData } from "@/lib/data/site";

// Sahifa statik generatsiya qilinadi va admin paneldagi har bir o'zgarishdan so'ng
// revalidatePath() orqali yangilanadi. Qo'shimcha xavfsizlik uchun — har soatda.
export const revalidate = 3600;

function jsonLd(settings) {
  const data = {
    "@context": "https://schema.org",
    "@type": "EducationalOrganization",
    name: "Axborot tizimlari va texnologiyalari kafedrasi",
    parentOrganization: { "@type": "CollegeOrUniversity", name: "Namangan davlat texnika universiteti" },
    url: process.env.NEXT_PUBLIC_SITE_URL,
    email: settings.contact_email || undefined,
    telephone: settings.contact_phone || undefined,
    address: settings.contact_address || undefined,
  };
  return JSON.stringify(data).replace(/</g, "\\u003c");
}

export default async function HomePage() {
  const { settings, staff, programs, universityCards, departmentCards, stats } = await getHomePageData();

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLd(settings) }} />

      <Hero settings={settings} stats={stats} />

      <section id="university" className="py-20 lg:py-28">
        <div className="container-page">
          <SectionHeader
            eyebrow="Bizning universitet"
            title="Universitet tarixi va imkoniyatlari"
            description={settings.university_intro}
          />
          <FeatureCards cards={universityCards} />
        </div>
      </section>

      <section id="department" className="bg-slate-50 py-20 lg:py-28">
        <div className="container-page">
          <SectionHeader eyebrow="Tanishuv" title="Kafedra haqida" description={settings.department_intro} />
          <FeatureCards cards={departmentCards} />
        </div>
      </section>

      <Programs programs={programs} intro={settings.programs_intro} />

      <section id="staff" className="py-20 lg:py-28">
        <div className="container-page">
          <SectionHeader eyebrow="Professor-oʻqituvchilar" title="Kafedra jamoasi" description={settings.staff_intro} />
          <StaffDirectory staff={staff} />
        </div>
      </section>

      <Contact settings={settings} />
    </>
  );
}
