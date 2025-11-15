export const inputClass =
  "block w-full rounded-xl border-0 bg-white px-4 py-2.5 text-slate-900 ring-1 ring-slate-300 transition placeholder:text-slate-400 focus:ring-2 focus:ring-brand-500 focus:outline-none aria-invalid:ring-red-400 disabled:bg-slate-50";

/** Yorliq, yordamchi matn va xato xabari bilan forma maydoni o'rami. */
export default function Field({ id, label, hint, error, required = false, children, className = "" }) {
  const describedBy = error ? `${id}-error` : hint ? `${id}-hint` : undefined;

  return (
    <div className={className}>
      <label htmlFor={id} className="mb-1.5 block text-sm font-semibold text-slate-800">
        {label}
        {required && <span className="ml-0.5 text-red-500" aria-hidden="true">*</span>}
      </label>
      {typeof children === "function" ? children({ describedBy, invalid: Boolean(error) }) : children}
      {error ? (
        <p id={`${id}-error`} className="mt-1.5 text-sm text-red-600">
          {error}
        </p>
      ) : (
        hint && (
          <p id={`${id}-hint`} className="mt-1.5 text-sm text-slate-500">
            {hint}
          </p>
        )
      )}
    </div>
  );
}
