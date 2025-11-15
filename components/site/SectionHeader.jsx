export default function SectionHeader({ eyebrow, title, description, inverted = false }) {
  return (
    <div className="mx-auto mb-12 max-w-3xl text-center lg:mb-16">
      <p
        className={`mb-3 inline-flex items-center gap-2 text-sm font-bold tracking-widest uppercase ${
          inverted ? "text-teal-300" : "text-teal-700"
        }`}
      >
        <span className="h-px w-6 bg-current" aria-hidden="true" />
        {eyebrow}
        <span className="h-px w-6 bg-current" aria-hidden="true" />
      </p>
      <h2 className={`text-3xl font-extrabold tracking-tight sm:text-4xl ${inverted ? "text-white" : ""}`}>
        {title}
      </h2>
      {description && (
        <p className={`mt-5 text-lg leading-relaxed ${inverted ? "text-brand-100" : "text-slate-600"}`}>
          {description}
        </p>
      )}
    </div>
  );
}
