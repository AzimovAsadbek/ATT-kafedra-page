export default function Logo({ inverted = false }) {
  return (
    <span className="flex items-center gap-3">
      <span
        className={`grid size-10 shrink-0 place-items-center rounded-xl ${
          inverted ? "bg-white/10 text-white ring-1 ring-white/20" : "bg-brand-900 text-white"
        }`}
      >
        <svg viewBox="0 0 24 24" fill="none" className="size-6" aria-hidden="true">
          <path d="M12 2 2 7v10l10 5 10-5V7L12 2Z" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round" />
          <path d="m7 7 10 10M7 17 17 7" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
        </svg>
      </span>
      <span className="leading-tight">
        <span className={`block font-display text-lg font-extrabold ${inverted ? "text-white" : "text-brand-900"}`}>
          ATT kafedrasi
        </span>
        <span className={`block text-xs font-medium ${inverted ? "text-brand-200" : "text-slate-500"}`}>
          NamDTU
        </span>
      </span>
    </span>
  );
}
