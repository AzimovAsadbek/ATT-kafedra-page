import { ArrowRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function HomeHero({ settings, stats }) {
  const statItems = [
    { value: stats.staff, label: "professor-oʻqituvchi" },
    { value: stats.withDegree, label: "ilmiy darajaga ega" },
    { value: stats.withTitle, label: "ilmiy unvonga ega" },
    { value: stats.programs, label: "taʼlim yoʻnalishi" },
  ];
  const image = settings.hero_image;

  return (
    <section className="border-b border-line bg-paper">
      <div className="container-page grid gap-10 py-12 sm:py-16 lg:grid-cols-12 lg:items-center lg:gap-14 lg:py-20">
        <div className={image ? "lg:col-span-6" : "lg:col-span-9"}>
          {settings.dept_faculty && <p className="text-[15px] font-medium text-gold-700">{settings.dept_faculty}</p>}
          <h1 className="mt-4 font-serif text-[2.35rem] leading-[1.08] font-semibold tracking-tight text-brand-950 sm:text-[3.4rem] xl:text-[3.9rem]">
            {settings.hero_title}
          </h1>
          {settings.hero_subtitle && (
            <p className="mt-6 max-w-xl text-lg leading-relaxed text-slate-600">{settings.hero_subtitle}</p>
          )}
          <div className="mt-9 flex flex-wrap items-center gap-x-8 gap-y-4">
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

        {image && (
          <figure className="lg:col-span-6">
            <div className="relative aspect-[4/3] overflow-hidden bg-sand">
              <Image
                src={image}
                alt={settings.hero_image_caption || ""}
                fill
                preload
                sizes="(min-width: 1440px) 660px, (min-width: 1024px) 46vw, 100vw"
                className="object-cover"
              />
            </div>
            {settings.hero_image_caption && (
              <figcaption className="mt-3 border-l-2 border-gold-500 pl-3 text-sm text-slate-500">
                {settings.hero_image_caption}
              </figcaption>
            )}
          </figure>
        )}
      </div>

      <div className="border-t border-line">
        <div className="container-page">
          {/* gap-px + bg-line: kataklar orasida ingichka ajratuvchi chiziqlar */}
          <dl className="grid grid-cols-2 gap-px bg-line lg:grid-cols-4">
            {statItems.map(({ value, label }, index) => (
              <div
                key={label}
                className={`flex flex-col-reverse gap-1 bg-paper py-6 lg:py-8 ${index % 2 ? "pl-6" : "pl-0"} ${
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
