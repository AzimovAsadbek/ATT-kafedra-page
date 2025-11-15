import { GraduationCap } from "lucide-react";
import SectionHeader from "./SectionHeader";

export default function Programs({ programs, intro }) {
  return (
    <section id="programs" className="relative overflow-hidden bg-brand-950 py-20 lg:py-28">
      <div className="bg-grid absolute inset-0 mask-[linear-gradient(to_bottom,black,transparent)]" aria-hidden="true" />
      <div className="container-page relative">
        <SectionHeader eyebrow="Taʼlim" title="Taʼlim yoʻnalishlari" description={intro} inverted />

        {programs.length > 0 ? (
          <ol className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {programs.map((program, index) => (
              <li
                key={program.id}
                className="group relative flex flex-col rounded-3xl bg-white/5 p-7 ring-1 ring-white/10 transition hover:bg-white/10 hover:ring-teal-400/40"
              >
                <div className="mb-6 flex items-center justify-between">
                  <span className="grid size-12 place-items-center rounded-2xl bg-teal-400/15 text-teal-300">
                    <GraduationCap className="size-6" aria-hidden="true" />
                  </span>
                  <span className="font-display text-4xl font-extrabold text-white/10 transition group-hover:text-white/20">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                </div>
                <h3 className="text-xl font-bold text-white">{program.title}</h3>
                <div className="mt-3 flex flex-wrap gap-2 text-xs font-semibold">
                  <span className="rounded-full bg-teal-400/15 px-3 py-1 text-teal-200">{program.level}</span>
                  {program.code && (
                    <span className="rounded-full bg-white/10 px-3 py-1 text-brand-100">{program.code}</span>
                  )}
                </div>
                {program.description && (
                  <p className="mt-4 leading-relaxed text-brand-100/90">{program.description}</p>
                )}
              </li>
            ))}
          </ol>
        ) : (
          <p className="text-center text-brand-100">Yoʻnalishlar tez orada qoʻshiladi.</p>
        )}
      </div>
    </section>
  );
}
