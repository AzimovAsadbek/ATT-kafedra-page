import { ArrowUpRight } from "lucide-react";

export default function UniversitySection({ settings, cards }) {
  const facts = [
    { label: "Rektor", value: settings.university_rector },
    { label: "Manzil", value: settings.university_address },
    { label: "Telefon", value: settings.university_phone },
    {
      label: "Email",
      value: settings.university_email,
      href: `mailto:${settings.university_email}`,
    },
  ].filter((fact) => fact.value);

  return (
    <section id="universitet" className="border-b border-line bg-paper py-20 lg:py-28">
      <div className="container-page">
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-12">
          <div className="lg:col-span-7">
            <p className="text-[15px] font-medium text-gold-700">Universitet</p>
            <h2 className="mt-2 font-serif text-[2rem] leading-[1.15] font-semibold tracking-tight text-brand-950 sm:text-[2.5rem]">
              Namangan davlat texnika universiteti
            </h2>
            {settings.university_intro && (
              <p className="mt-8 font-serif text-xl leading-relaxed text-slate-800 sm:text-[1.4rem]">
                {settings.university_intro}
              </p>
            )}
            {settings.university_website && (
              <a
                href={settings.university_website}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-8 inline-flex items-center gap-2 font-medium text-brand-950 link-underline"
              >
                Universitetning rasmiy sayti
                <ArrowUpRight className="size-4" aria-hidden="true" />
              </a>
            )}
          </div>

          {facts.length > 0 && (
            <div className="self-end lg:col-span-5 lg:pl-12">
              <dl className="border-t-2 border-brand-950">
                {facts.map(({ label, value, href }) => (
                  <div key={label} className="grid grid-cols-3 gap-4 border-b border-line py-4">
                    <dt className="text-sm text-slate-500">{label}</dt>
                    <dd className="col-span-2 font-medium break-words text-slate-800">
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
            </div>
          )}
        </div>

        {cards.length > 0 && (
          <ul className="mt-16 grid gap-10 sm:grid-cols-2 lg:grid-cols-3 lg:gap-12">
            {cards.map((card) => (
              <li key={card.id} className="border-t border-gold-500 pt-5">
                <h3 className="font-serif text-xl font-semibold text-brand-950">{card.title}</h3>
                {card.description && <p className="mt-3 leading-relaxed text-slate-600">{card.description}</p>}
              </li>
            ))}
          </ul>
        )}
      </div>
    </section>
  );
}
