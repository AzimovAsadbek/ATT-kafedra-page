import Image from "next/image";

// Rasm asl kengligidan ko'pi bilan shuncha marta kattalashtiriladi; undan kichik
// rasmlar xira cho'zilmasdan, fon ichida markazda ko'rsatiladi.
const MAX_UPSCALE = 1.6;

export function getInitials(fullName) {
  return fullName
    .split(/\s+/)
    .slice(0, 2)
    .map((word) => word[0])
    .join("");
}

/**
 * 3:4 portret; rasm bo'lmasa — ism bosh harflari. Ota-element o'lchamni belgilaydi.
 * `member.photoWidth` (lib/data/site.js) ma'lum bo'lsa, past sifatli rasm cho'zilmaydi.
 */
export default function Portrait({ member, sizes, preload = false, className = "" }) {
  const maxWidth = member.photoWidth ? Math.round(member.photoWidth * MAX_UPSCALE) : null;

  return (
    <div className={`relative aspect-[3/4] overflow-hidden bg-sand ${className}`}>
      {member.photo ? (
        <div
          className="absolute inset-x-0 top-1/2 mx-auto aspect-[3/4] w-full -translate-y-1/2"
          style={maxWidth ? { maxWidth } : undefined}
        >
          <Image
            src={member.photo}
            alt={member.fullName}
            fill
            sizes={sizes}
            preload={preload}
            className="object-cover object-top"
          />
        </div>
      ) : (
        <div className="grid h-full place-items-center" aria-hidden="true">
          <span className="font-serif text-[clamp(1.5rem,5vw,3rem)] font-medium tracking-wide text-brand-300">
            {getInitials(member.fullName)}
          </span>
        </div>
      )}
    </div>
  );
}

/** Dumaloq kichik surat (ro'yxatlar uchun); surat bo'lmasa — to'q ko'k fonda bosh harflar. */
export function Avatar({ member, className = "size-16" }) {
  return (
    <div className={`relative shrink-0 overflow-hidden rounded-full bg-brand-900 ${className}`}>
      {member.photo ? (
        <Image src={member.photo} alt="" fill sizes="80px" className="object-cover object-top" />
      ) : (
        <span className="grid size-full place-items-center font-serif text-lg font-medium tracking-wide text-gold-300" aria-hidden="true">
          {getInitials(member.fullName)}
        </span>
      )}
    </div>
  );
}
