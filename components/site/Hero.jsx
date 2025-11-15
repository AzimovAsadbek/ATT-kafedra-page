import { ArrowRight, Award, BookOpen, GraduationCap, Users } from "lucide-react";
import Image from "next/image";

export default function Hero({ settings, stats }) {
  const statItems = [
    { icon: Users, value: stats.staff, label: "Professor-oʻqituvchilar" },
    { icon: GraduationCap, value: stats.withDegree, label: "Ilmiy darajaga ega" },
    { icon: Award, value: stats.withTitle, label: "Ilmiy unvonga ega" },
    { icon: BookOpen, value: stats.programs, label: "Taʼlim yoʻnalishlari" },
  ];

  return (
    <section id="home" className="relative isolate overflow-hidden bg-brand-950 text-white">
      {settings.hero_image && (
        <Image
          src={settings.hero_image}
          alt=""
          fill
          preload
          sizes="100vw"
          className="-z-20 object-cover opacity-30"
        />
      )}
      <div
        className="absolute inset-0 -z-10 bg-linear-to-br from-brand-950 via-brand-900/90 to-brand-700/60"
        aria-hidden="true"
      />
      <div
        className="bg-grid absolute inset-0 -z-10 mask-[radial-gradient(ellipse_at_top_left,black,transparent_70%)]"
        aria-hidden="true"
      />

      <div className="container-page pt-36 pb-20 sm:pt-40 lg:pt-48 lg:pb-28">
        <div className="max-w-3xl animate-fade-up">
          <p className="mb-6 inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-1.5 text-sm font-medium text-brand-100 ring-1 ring-white/15">
            <span className="size-2 rounded-full bg-teal-400" aria-hidden="true" />
            Namangan davlat texnika universiteti
          </p>
          <h1 className="text-4xl leading-[1.1] font-extrabold tracking-tight text-white sm:text-5xl lg:text-6xl">
            {settings.hero_title}
          </h1>
          {settings.hero_subtitle && (
            <p className="mt-6 max-w-2xl text-lg leading-relaxed text-brand-100 sm:text-xl">
              {settings.hero_subtitle}
            </p>
          )}
          <div className="mt-10 flex flex-wrap gap-4">
            <a
              href="#department"
              className="inline-flex items-center gap-2 rounded-full bg-teal-400 px-6 py-3.5 font-semibold text-brand-950 shadow-lg shadow-teal-500/25 transition hover:-translate-y-0.5 hover:bg-teal-300"
            >
              Kafedra haqida
              <ArrowRight className="size-5" aria-hidden="true" />
            </a>
            <a
              href="#programs"
              className="inline-flex items-center gap-2 rounded-full px-6 py-3.5 font-semibold text-white ring-1 ring-white/40 transition hover:bg-white/10"
            >
              Taʼlim yoʻnalishlari
            </a>
          </div>
        </div>

        <dl className="mt-14 grid max-w-4xl grid-cols-2 gap-3 sm:gap-4 lg:mt-20 lg:grid-cols-4">
          {statItems.map(({ icon: Icon, value, label }) => (
            <div
              key={label}
              className="flex items-center gap-4 rounded-2xl bg-white/5 p-4 ring-1 ring-white/10 backdrop-blur-sm sm:p-5"
            >
              <span className="hidden size-11 shrink-0 place-items-center rounded-xl bg-teal-400/15 text-teal-300 sm:grid">
                <Icon className="size-6" aria-hidden="true" />
              </span>
              <div className="flex flex-col-reverse">
                <dt className="text-xs leading-snug text-brand-100 sm:text-sm">{label}</dt>
                <dd className="font-display text-2xl font-extrabold text-white sm:text-3xl">{value}</dd>
              </div>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
