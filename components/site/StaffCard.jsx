import Link from "next/link";
import Portrait from "./Portrait";

/** Lavozim va qo'shimcha vazifa/unvonni bitta qatorga yig'adi. */
export function positionLine(member) {
  const extra = member.departmentRole ?? (member.academicTitle !== member.position ? member.academicTitle : null);
  return extra ? `${member.position} · ${extra}` : member.position;
}

export default function StaffCard({ member, preload = false }) {
  return (
    <li>
      <Link href={`/oqituvchilar/${member.slug}`} className="group block">
        <Portrait
          member={member}
          preload={preload}
          sizes="(min-width: 1440px) 320px, (min-width: 1024px) 24vw, (min-width: 640px) 32vw, 50vw"
          className="ring-1 ring-black/5 ring-inset"
          imageClassName="transition duration-500 ease-out group-hover:scale-[1.03]"
        />
        <div className="mt-4">
          <h3 className="font-serif text-[15px] leading-snug font-semibold text-brand-950 decoration-gold-500 decoration-2 underline-offset-4 group-hover:underline sm:text-[17px]">
            {member.fullName}
          </h3>
          <p className="mt-1.5 text-[13px] font-medium text-gold-700 sm:text-sm">{positionLine(member)}</p>
          {member.academicDegree && (
            <p className="mt-1 text-[13px] leading-snug text-slate-500 sm:text-sm">{member.academicDegree}</p>
          )}
        </div>
      </Link>
    </li>
  );
}
