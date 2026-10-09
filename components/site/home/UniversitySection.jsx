import { ArrowUpRight } from "lucide-react";
import SectionHeading from "../SectionHeading";

export default function UniversitySection({ settings, cards }) {
  const facts = [
    { label: "Rektor", value: settings.university_rector },
    { label: "Manzil", value: settings.university_address },
    { label: "Telefon", value: settings.university_phone },
    { label: "Email", value: settings.university_email, href: `mailto:${settings.university_email}` },
  ].filter((fact) => fact.value);

  return (
    <section id="universitet" className="border-b border-line bg-paper py-20 lg:py-28">
      <div className="container-page">
        <SectionHeading
          index="05"
          label="Universitet"
          title="Namangan davlat texnika universiteti"
          description={settings.university_intro}
          aside={
            settings.university_website && (
              <a
                href={settings.university_website}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 self-start font-medium text-brand-950 hover:text-gold-700"
              >
                Universitetning rasmiy sayti
                <ArrowUpRight className="size-4" aria-hidden="true" />
              </a>
            )
          }
        />

        <div className="grid gap-14 lg:grid-cols-12 lg:gap-12">
          {cards.length > 0 && (
            <ul className="divide-y divide-line border-y border-line lg:col-span-7">
              {cards.map((card) => (
                <li key={card.id} className="grid gap-2 py-6 sm:grid-cols-3 sm:gap-8">
                  <h3 className="font-serif text-xl font-semibold text-brand-950">{card.title}</h3>
                  <p className="leading-relaxed text-slate-600 sm:col-span-2">{card.description}</p>
                </li>
              ))}
            </ul>
          )}

          {facts.length > 0 && (
            <dl className="self-start border-t-2 border-brand-950 lg:col-span-5 lg:pl-12">
              {facts.map(({ label, value, href }) => (
                <div key={label} className="border-b border-line py-4">
                  <dt className="label-caps text-[11px] text-slate-500">{label}</dt>
                  <dd className="mt-1 font-medium text-slate-800">
                    {href ? (
                      <a href={href} className="link-underline">
                        {value}
                      </a>
                    ) : (
                      value
                    )}
                  </dd>
                </div>
              ))}
            </dl>
          )}
        </div>
      </div>
    </section>
  );
}
