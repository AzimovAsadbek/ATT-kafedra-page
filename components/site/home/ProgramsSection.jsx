import Link from "next/link";
import { PROGRAM_LEVELS } from "@/lib/content-config";
import SectionHeading from "../SectionHeading";

function ProgramRow({ program }) {
  return (
    <li className="grid gap-4 py-7 md:grid-cols-12 md:gap-8">
      <p className="font-serif text-xl font-semibold text-gold-700 tabular-nums md:col-span-2">{program.code}</p>
      <div className="md:col-span-6">
        <h4 className="font-serif text-xl leading-snug font-semibold text-brand-950">{program.title}</h4>
        {program.description && <p className="mt-2 leading-relaxed text-slate-600">{program.description}</p>}
      </div>
      {program.coordinators.length > 0 && (
        <div className="md:col-span-4">
          <p className="label-caps mb-2 text-[11px] text-slate-500">Masʼul oʻqituvchilar</p>
          <ul className="space-y-1">
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
      <div className="container-page">
        <SectionHeading index="02" label="Taʼlim" title="Taʼlim yoʻnalishlari" description={intro} />

        {groups.length === 0 && <p className="text-slate-500">Yoʻnalishlar tez orada qoʻshiladi.</p>}

        <div className="space-y-14">
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
