/**
 * Tahririy uslubdagi bo'lim sarlavhasi: chapda raqam va sarlavha, o'ngda izoh.
 * `aside` — sarlavha yonidagi qo'shimcha element (masalan, "Barchasi" havolasi).
 */
export default function SectionHeading({ index, label, title, description, aside, inverted = false }) {
  return (
    <div className="mb-12 grid gap-6 lg:mb-16 lg:grid-cols-12 lg:gap-12">
      <div className="lg:col-span-5">
        <p className={`label-caps flex items-center gap-3 ${inverted ? "text-gold-300" : "text-gold-700"}`}>
          <span className="tabular-nums">{index}</span>
          <span className={`h-px w-8 ${inverted ? "bg-gold-300/60" : "bg-gold-500/60"}`} aria-hidden="true" />
          {label}
        </p>
        <h2
          className={`mt-4 font-serif text-[2rem] leading-[1.15] font-semibold tracking-tight sm:text-[2.5rem] ${
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
