import { ArrowRight } from "lucide-react";
import Link from "next/link";
import SectionHeading from "../SectionHeading";
import StaffCard from "../StaffCard";

const PREVIEW_COUNT = 8;

export default function StaffPreview({ staff, intro }) {
  if (!staff.length) return null;

  return (
    <section id="oqituvchilar" className="py-20 lg:py-28">
      <div className="container-page">
        <SectionHeading
          index="03"
          label="Jamoa"
          title="Professor-oʻqituvchilar"
          description={intro}
          aside={
            <Link
              href="/oqituvchilar"
              className="inline-flex items-center gap-2 self-start font-medium text-brand-950 hover:text-gold-700"
            >
              Barcha xodimlar — {staff.length} nafar
              <ArrowRight className="size-4" aria-hidden="true" />
            </Link>
          }
        />

        <ul className="grid grid-cols-2 gap-x-5 gap-y-10 sm:grid-cols-3 lg:grid-cols-4 lg:gap-x-8">
          {staff.slice(0, PREVIEW_COUNT).map((member) => (
            <StaffCard key={member.id} member={member} />
          ))}
        </ul>
      </div>
    </section>
  );
}
