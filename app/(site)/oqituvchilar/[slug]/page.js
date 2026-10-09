import { ArrowLeft, ArrowRight, Mail } from "lucide-react";
import Link from "next/link";
import { notFound } from "next/navigation";
import PageHeader from "@/components/site/PageHeader";
import Portrait from "@/components/site/Portrait";
import { positionLine } from "@/components/site/StaffCard";
import { getPublishedStaff, getPublishedStaffSlugs, getStaffProfile } from "@/lib/data/site";

export const revalidate = 3600;

export async function generateStaticParams() {
  return getPublishedStaffSlugs();
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const member = await getStaffProfile(slug);
  if (!member) return { title: "Xodim topilmadi" };

  const description = [positionLine(member), member.academicDegree, member.specialization].filter(Boolean).join(". ");
  return {
    title: member.fullName,
    description,
    alternates: { canonical: `/oqituvchilar/${member.slug}` },
    openGraph: { title: member.fullName, description, images: member.photo ? [member.photo] : undefined },
  };
}

/** "2016–2020 — Lavozim" qatorlarini { period, text } ko'rinishiga keltiradi. */
function parseTimeline(text) {
  return (text ?? "")
    .split("\n")
    .map((line) => line.trim())
    .filter(Boolean)
    .map((line) => {
      const [period, ...rest] = line.split(" — ");
      return rest.length ? { period, text: rest.join(" — ") } : { period: null, text: line };
    });
}

const splitList = (text) =>
  (text ?? "")
    .split(/[;\n]/)
    .map((item) => item.trim())
    .filter(Boolean);

function ProfileSection({ title, children }) {
  return (
    <section className="grid gap-3 border-t border-line py-8 md:grid-cols-4 md:gap-8">
      <h2 className="label-caps pt-1 text-slate-500">{title}</h2>
      <div className="md:col-span-3">{children}</div>
    </section>
  );
}

function personJsonLd(member) {
  const data = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: member.fullName,
    jobTitle: member.position,
    email: member.email || undefined,
    worksFor: {
      "@type": "EducationalOrganization",
      name: "Axborot tizimlari va texnologiyalari kafedrasi, Namangan davlat texnika universiteti",
    },
  };
  return JSON.stringify(data).replace(/</g, "\\u003c");
}

export default async function StaffProfilePage({ params }) {
  const { slug } = await params;
  const [member, allStaff] = await Promise.all([getStaffProfile(slug), getPublishedStaff()]);
  if (!member) notFound();

  const timeline = parseTimeline(member.workExperience);
  const subjects = splitList(member.subjects);
  const index = allStaff.findIndex((item) => item.id === member.id);
  const previous = allStaff[index - 1];
  const next = allStaff[index + 1];

  const credentials = [
    member.academicDegree && {
      label: "Ilmiy darajasi",
      value: member.academicDegree,
      detail: [member.degreeSpecialty, member.degreeYear && `${member.degreeYear}-yil`].filter(Boolean).join(", "),
    },
    member.academicTitle && {
      label: "Ilmiy unvoni",
      value: member.academicTitle,
      detail: [member.titleSpecialty, member.titleYear && `${member.titleYear}-yil`].filter(Boolean).join(", "),
    },
  ].filter(Boolean);

  const hasDetails =
    credentials.length || member.specialization || member.researchArea || member.achievements || subjects.length ||
    member.programs.length || timeline.length;

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: personJsonLd(member) }} />
      <PageHeader
        crumbs={[
          { href: "/", label: "Bosh sahifa" },
          { href: "/oqituvchilar", label: "Professor-oʻqituvchilar" },
        ]}
        title={member.fullName}
      >
        <p className="mt-3 text-lg font-medium text-gold-700">{positionLine(member)}</p>
      </PageHeader>

      <div className="container-page grid gap-12 py-12 lg:grid-cols-12 lg:gap-16 lg:py-16">
        <aside className="lg:col-span-4 xl:col-span-3">
          <div className="lg:sticky lg:top-28">
            <Portrait member={member} sizes="(min-width: 1024px) 340px, 100vw" preload className="max-w-sm" />
            <dl className="mt-6 max-w-sm divide-y divide-line border-y border-line text-[15px]">
              <div className="py-3">
                <dt className="text-sm text-slate-500">Lavozimi</dt>
                <dd className="font-medium text-slate-800">{member.position}</dd>
              </div>
              {member.departmentRole && (
                <div className="py-3">
                  <dt className="text-sm text-slate-500">Kafedradagi vazifasi</dt>
                  <dd className="font-medium text-slate-800">{member.departmentRole}</dd>
                </div>
              )}
              {member.email && (
                <div className="py-3">
                  <dt className="text-sm text-slate-500">Email</dt>
                  <dd>
                    <a
                      href={`mailto:${member.email}`}
                      className="link-underline inline-flex items-center gap-2 font-medium break-all text-brand-900"
                    >
                      <Mail className="size-4 shrink-0" aria-hidden="true" />
                      {member.email}
                    </a>
                  </dd>
                </div>
              )}
            </dl>
          </div>
        </aside>

        <article className="lg:col-span-8 xl:col-span-9">
          {credentials.length > 0 && (
            <ProfileSection title="Ilmiy daraja va unvon">
              <ul className="space-y-5">
                {credentials.map(({ label, value, detail }) => (
                  <li key={label}>
                    <p className="text-sm text-slate-500">{label}</p>
                    <p className="font-serif text-xl font-semibold text-brand-950">{value}</p>
                    {detail && <p className="mt-1 text-slate-600">{detail}</p>}
                  </li>
                ))}
              </ul>
            </ProfileSection>
          )}

          {member.specialization && (
            <ProfileSection title="Mutaxassisligi">
              <p className="text-[17px] text-slate-800">{member.specialization}</p>
            </ProfileSection>
          )}

          {member.researchArea && (
            <ProfileSection title="Ilmiy yoʻnalishi">
              <p className="text-[17px] leading-relaxed text-slate-800">{member.researchArea}</p>
            </ProfileSection>
          )}

          {member.achievements && (
            <ProfileSection title="Ilmiy-oʻquv natijalari">
              <p className="text-[17px] leading-relaxed text-slate-800">{member.achievements}</p>
            </ProfileSection>
          )}

          {subjects.length > 0 && (
            <ProfileSection title="Oʻtadigan fanlari">
              <ul className="flex flex-wrap gap-2">
                {subjects.map((subject) => (
                  <li key={subject} className="border border-line bg-paper px-3 py-1.5 text-[15px] text-slate-700">
                    {subject}
                  </li>
                ))}
              </ul>
            </ProfileSection>
          )}

          {member.programs.length > 0 && (
            <ProfileSection title="Masʼul yoʻnalishlar">
              <ul className="space-y-2">
                {member.programs.map((program) => (
                  <li key={program.id} className="flex gap-4">
                    <span className="w-24 shrink-0 font-serif font-semibold text-gold-700 tabular-nums">{program.code}</span>
                    <Link href="/#yonalishlar" className="link-underline text-slate-800">
                      {program.title}
                      <span className="text-slate-500"> · {program.level}</span>
                    </Link>
                  </li>
                ))}
              </ul>
            </ProfileSection>
          )}

          {timeline.length > 0 && (
            <ProfileSection title="Mehnat faoliyati">
              <ol className="relative border-l border-line">
                {timeline.map((entry, i) => (
                  <li key={i} className="relative pb-6 pl-6 last:pb-0">
                    <span
                      className={`absolute top-2 -left-[4.5px] size-2 ${i === timeline.length - 1 ? "bg-gold-500" : "bg-brand-300"}`}
                      aria-hidden="true"
                    />
                    {entry.period && <p className="text-sm font-semibold text-brand-900 tabular-nums">{entry.period}</p>}
                    <p className="mt-0.5 text-slate-700">{entry.text}</p>
                  </li>
                ))}
              </ol>
            </ProfileSection>
          )}

          {!hasDetails && (
            <p className="border-y border-line py-10 text-slate-500">
              Ushbu oʻqituvchi haqida batafsil maʼlumot tez orada qoʻshiladi.
            </p>
          )}

          <nav className="mt-4 grid gap-4 border-t-2 border-brand-950 pt-6 sm:grid-cols-2" aria-label="Boshqa oʻqituvchilar">
            {previous ? (
              <Link href={`/oqituvchilar/${previous.slug}`} className="group">
                <span className="inline-flex items-center gap-2 text-sm text-slate-500">
                  <ArrowLeft className="size-4" aria-hidden="true" /> Oldingi
                </span>
                <span className="mt-1 block font-serif text-lg font-semibold text-brand-950 group-hover:text-gold-700">
                  {previous.fullName}
                </span>
              </Link>
            ) : (
              <span />
            )}
            {next && (
              <Link href={`/oqituvchilar/${next.slug}`} className="group sm:text-right">
                <span className="inline-flex items-center gap-2 text-sm text-slate-500">
                  Keyingi <ArrowRight className="size-4" aria-hidden="true" />
                </span>
                <span className="mt-1 block font-serif text-lg font-semibold text-brand-950 group-hover:text-gold-700">
                  {next.fullName}
                </span>
              </Link>
            )}
          </nav>
        </article>
      </div>
    </>
  );
}
