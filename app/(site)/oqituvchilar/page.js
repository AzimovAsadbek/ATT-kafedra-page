import PageHeader from "@/components/site/PageHeader";
import StaffDirectory from "@/components/site/StaffDirectory";
import { getPublishedStaff, getSettings, getStaffStats } from "@/lib/data/site";

export const revalidate = 3600;

export const metadata = {
  title: "Professor-oʻqituvchilar",
  description:
    "Axborot tizimlari va texnologiyalari kafedrasi professor-oʻqituvchilari: ilmiy daraja, unvon, mutaxassislik va mehnat faoliyati.",
  alternates: { canonical: "/oqituvchilar" },
};

export default async function StaffPage() {
  const [staff, settings] = await Promise.all([getPublishedStaff(), getSettings()]);
  const stats = getStaffStats(staff);

  return (
    <>
      <PageHeader crumbs={[{ href: "/", label: "Bosh sahifa" }]} title="Professor-oʻqituvchilar">
        <div className="mt-6 grid gap-8 lg:grid-cols-12">
          {settings.staff_intro && (
            <p className="max-w-2xl text-[17px] leading-relaxed text-slate-600 lg:col-span-7">{settings.staff_intro}</p>
          )}
          <dl className="flex gap-10 lg:col-span-5 lg:justify-end">
            {[
              { value: stats.staff, label: "nafar xodim" },
              { value: stats.withDegree, label: "ilmiy darajali" },
              { value: stats.withTitle, label: "ilmiy unvonli" },
            ].map(({ value, label }) => (
              <div key={label} className="flex flex-col-reverse">
                <dt className="text-sm text-slate-500">{label}</dt>
                <dd className="font-serif text-4xl font-semibold text-brand-950 tabular-nums">{value}</dd>
              </div>
            ))}
          </dl>
        </div>
      </PageHeader>

      <section className="container-page py-12 lg:py-16">
        <StaffDirectory staff={staff} />
      </section>
    </>
  );
}
