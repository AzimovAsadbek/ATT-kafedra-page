import { ArrowRight } from "lucide-react";
import Link from "next/link";
import StaffCard from "../StaffCard";

const PREVIEW_COUNT = 8;

export default function StaffPreview({ staff, intro }) {
  if (!staff.length) return null;

  return (
    <section id="oqituvchilar" className="py-20 lg:py-28">
      <div className="container-page">
        <div className="mb-10 flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between lg:gap-12">
          <div className="max-w-3xl">
            <p className="text-[15px] font-medium text-gold-700">Jamoa</p>
            <h2 className="mt-2 font-serif text-[2rem] leading-[1.15] font-semibold tracking-tight text-brand-950 sm:text-[2.5rem]">
              Professor-oʻqituvchilar
            </h2>
            {intro && <p className="mt-5 text-[17px] leading-relaxed text-slate-600">{intro}</p>}
          </div>
          <Link
            href="/oqituvchilar"
            className="inline-flex shrink-0 items-center gap-2 self-start border border-brand-950 px-5 py-3 font-medium text-brand-950 transition hover:bg-brand-950 hover:text-white lg:self-auto"
          >
            Barcha xodimlar — {staff.length} nafar
            <ArrowRight className="size-4" aria-hidden="true" />
          </Link>
        </div>

        <ul className="grid grid-cols-2 gap-x-4 gap-y-10 sm:grid-cols-3 sm:gap-x-6 lg:grid-cols-4 lg:gap-x-8">
          {staff.slice(0, PREVIEW_COUNT).map((member) => (
            <StaffCard key={member.id} member={member} />
          ))}
        </ul>
      </div>
    </section>
  );
}
