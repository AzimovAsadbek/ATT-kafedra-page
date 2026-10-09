import { ArrowRight } from "lucide-react";
import Link from "next/link";
import Portrait from "../Portrait";

export default function HomeHero({ settings, stats, portraits }) {
  const statItems = [
    { value: stats.staff, label: "professor-oʻqituvchi" },
    { value: stats.withDegree, label: "ilmiy darajaga ega" },
    { value: stats.withTitle, label: "ilmiy unvonga ega" },
    { value: stats.programs, label: "taʼlim yoʻnalishi" },
  ];
  const showMosaic = portraits.length >= 3;

  return (
    <section className="border-b border-line bg-paper">
      <div className="container-page grid gap-14 py-14 sm:py-20 lg:grid-cols-12 lg:gap-16 lg:py-24">
        <div className={`flex flex-col justify-center ${showMosaic ? "lg:col-span-7" : "lg:col-span-10"}`}>
          <p className="label-caps flex items-center gap-3 text-gold-700">
            <span className="h-px w-10 bg-gold-500" aria-hidden="true" />
            Namangan davlat texnika universiteti
          </p>
          <h1 className="mt-6 font-serif text-[2.4rem] leading-[1.05] font-semibold tracking-tight text-brand-950 sm:text-6xl xl:text-[4.5rem]">
            {settings.hero_title}
          </h1>
          {settings.hero_subtitle && (
            <p className="mt-7 max-w-xl text-lg leading-relaxed text-slate-600">{settings.hero_subtitle}</p>
          )}
          <div className="mt-10 flex flex-wrap items-center gap-x-8 gap-y-4">
            <Link
              href="/#yonalishlar"
              className="inline-flex items-center gap-3 bg-brand-900 px-6 py-3.5 font-medium text-white transition hover:bg-brand-800"
            >
              Taʼlim yoʻnalishlari
              <ArrowRight className="size-4" aria-hidden="true" />
            </Link>
            <Link href="/oqituvchilar" className="link-underline font-medium text-brand-950">
              Professor-oʻqituvchilar
            </Link>
          </div>
        </div>

        {showMosaic && (
          <div className="lg:col-span-5">
            <ul className="grid grid-cols-3 gap-3 sm:gap-4" aria-label="Kafedra jamoasi">
              {portraits.map((member, index) => (
                <li key={member.id} className={index % 3 === 1 ? "translate-y-6 sm:translate-y-10" : undefined}>
                  <Link href={`/oqituvchilar/${member.slug}`} title={member.fullName} className="block">
                    <Portrait member={member} sizes="(min-width: 1024px) 180px, 30vw" preload={index < 3} />
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>

      <div className="border-t border-line">
        <div className="container-page">
          {/* gap-px + bg-line: kataklar orasida ingichka ajratuvchi chiziqlar */}
          <dl className="grid grid-cols-2 gap-px bg-line lg:grid-cols-4">
            {statItems.map(({ value, label }, index) => (
              <div
                key={label}
                className={`flex flex-col-reverse gap-1 bg-paper py-7 lg:py-9 ${index % 2 ? "pl-6" : "pl-0"} ${
                  index ? "lg:pl-10" : "lg:pl-0"
                }`}
              >
                <dt className="text-sm text-slate-600">{label}</dt>
                <dd className="font-serif text-4xl font-semibold text-brand-950 tabular-nums sm:text-5xl">{value}</dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </section>
  );
}
