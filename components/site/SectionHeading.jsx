/**
 * Bo'lim sarlavhasi: chapda yorliq va sarlavha, o'ngda izoh.
 * `aside` — sarlavha yonidagi qo'shimcha element (masalan, "Barchasi" havolasi).
 */
export default function SectionHeading({ label, title, description, aside, inverted = false }) {
  return (
    <div className="mb-12 grid gap-6 lg:mb-14 lg:grid-cols-12 lg:gap-12">
      <div className="lg:col-span-5">
        {label && (
          <p className={`text-[15px] font-medium ${inverted ? "text-gold-300" : "text-gold-700"}`}>{label}</p>
        )}
        <h2
          className={`mt-2 font-serif text-[2rem] leading-[1.15] font-semibold tracking-tight sm:text-[2.5rem] ${
            inverted ? "text-white" : "text-brand-950"
          }`}
        >
          {title}
        </h2>
      </div>
      {(description || aside) && (
        <div className="flex flex-col justify-end gap-5 lg:col-span-7 lg:pl-12">
          {description && (
            <p className={`max-w-2xl text-[17px] leading-relaxed ${inverted ? "text-brand-200" : "text-slate-600"}`}>
              {description}
            </p>
          )}
          {aside}
        </div>
      )}
    </div>
  );
}
