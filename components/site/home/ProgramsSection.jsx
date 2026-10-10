import Link from "next/link";
import { PROGRAM_LEVELS } from "@/lib/content-config";

function ProgramRow({ program }) {
  return (
    <li className="grid gap-3 py-7 md:grid-cols-12 md:gap-x-8 md:gap-y-4">
      <p className="font-serif text-xl font-semibold text-gold-700 tabular-nums md:col-span-3">{program.code}</p>
      <div className="md:col-span-9">
        <h4 className="font-serif text-xl leading-snug font-semibold text-brand-950">{program.title}</h4>
        {program.description && <p className="mt-2 leading-relaxed text-slate-600">{program.description}</p>}
      </div>
      {program.coordinators.length > 0 && (
        <div className="md:col-span-9 md:col-start-4">
          <p className="mb-1.5 text-sm text-slate-500">Masʼul oʻqituvchilar</p>
          <ul className="flex flex-wrap gap-x-5 gap-y-1">
            {program.coordinators.map((coordinator) => (
              <li key={coordinator.slug}>
                <Link href={`/oqituvchilar/${coordinator.slug}`} className="link-underline text-[15px] text-brand-900">
                  {coordinator.fullName}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      )}
    </li>
  );
}

export default function ProgramsSection({ programs, intro }) {
  const groups = PROGRAM_LEVELS.map((level) => ({
    level,
    items: programs.filter((program) => program.level === level),
  })).filter((group) => group.items.length);

  return (
    <section id="yonalishlar" className="border-y border-line bg-paper py-20 lg:py-28">
      <div className="container-page grid gap-12 lg:grid-cols-12 lg:gap-12">
        <div className="lg:col-span-4">
          <div className="lg:sticky lg:top-28">
            <p className="text-[15px] font-medium text-gold-700">Taʼlim</p>
            <h2 className="mt-2 font-serif text-[2rem] leading-[1.15] font-semibold tracking-tight text-brand-950 sm:text-[2.5rem]">
              Taʼlim yoʻnalishlari
            </h2>
            {intro && <p className="mt-5 text-[17px] leading-relaxed text-slate-600">{intro}</p>}
            {groups.length > 0 && (
              <ul className="mt-8 hidden space-y-2 border-l border-line pl-5 text-[15px] lg:block">
                {groups.map(({ level, items }) => (
                  <li key={level} className="flex justify-between gap-4 text-slate-600">
                    <span>{level}</span>
                    <span className="text-slate-400 tabular-nums">{items.length}</span>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>

        <div className="space-y-14 lg:col-span-8">
          {groups.length === 0 && <p className="text-slate-500">Yoʻnalishlar tez orada qoʻshiladi.</p>}
          {groups.map(({ level, items }) => (
            <div key={level}>
              <h3 className="flex items-baseline justify-between border-b-2 border-brand-950 pb-3">
                <span className="font-serif text-2xl font-semibold text-brand-950">{level}</span>
                <span className="text-sm text-slate-500">{items.length} ta yoʻnalish</span>
              </h3>
              <ul className="divide-y divide-line">
                {items.map((program) => (
                  <ProgramRow key={program.id} program={program} />
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
