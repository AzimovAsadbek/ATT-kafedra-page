import Link from "next/link";
import { Avatar } from "./Portrait";

/** Lavozim va qo'shimcha vazifa/unvonni bitta qatorga yig'adi. */
export function positionLine(member) {
  const extra = member.departmentRole ?? (member.academicTitle !== member.position ? member.academicTitle : null);
  return extra ? `${member.position} · ${extra}` : member.position;
}

/** Ma'lumotnoma qatori: barcha xodimlar bir xil ko'rinishda (surat bor-yo'qligidan qat'i nazar). */
export default function StaffCard({ member }) {
  return (
    <li className="border-t border-line">
      <Link href={`/oqituvchilar/${member.slug}`} className="group flex items-start gap-4 py-5 sm:gap-5">
        <Avatar member={member} className="size-14 ring-1 ring-line sm:size-16" />
        <div className="min-w-0 pt-0.5">
          <h3 className="font-serif text-[17px] leading-snug font-semibold text-brand-950 decoration-gold-500 decoration-2 underline-offset-4 group-hover:underline">
            {member.fullName}
          </h3>
          <p className="mt-1 text-sm font-medium text-gold-700">{positionLine(member)}</p>
          {member.academicDegree && <p className="mt-0.5 text-sm leading-snug text-slate-500">{member.academicDegree}</p>}
        </div>
      </Link>
    </li>
  );
}
