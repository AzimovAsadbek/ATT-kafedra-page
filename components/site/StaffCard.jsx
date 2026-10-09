import Link from "next/link";
import Portrait from "./Portrait";

/** Lavozim va qo'shimcha vazifa/unvonni bitta qatorga yig'adi. */
export function positionLine(member) {
  const extra = member.departmentRole ?? (member.academicTitle !== member.position ? member.academicTitle : null);
  return extra ? `${member.position} · ${extra}` : member.position;
}

export default function StaffCard({ member }) {
  return (
    <li>
      <Link href={`/oqituvchilar/${member.slug}`} className="group block">
        <Portrait
          member={member}
          sizes="(min-width: 1280px) 300px, (min-width: 640px) 33vw, 50vw"
          className="transition duration-300 group-hover:brightness-[0.97]"
        />
        <div className="border-b border-line pt-4 pb-5">
          <h3 className="font-serif text-lg leading-snug font-semibold text-brand-950 decoration-gold-500 decoration-2 underline-offset-4 group-hover:underline">
            {member.fullName}
          </h3>
          <p className="mt-1.5 text-sm font-medium text-gold-700">{positionLine(member)}</p>
          {member.academicDegree && <p className="mt-1 text-sm leading-snug text-slate-500">{member.academicDegree}</p>}
        </div>
      </Link>
    </li>
  );
}
