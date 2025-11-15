"use client";

import { useFormStatus } from "react-dom";

const VARIANTS = {
  default: "text-slate-600 hover:bg-slate-100 hover:text-slate-900",
  primary: "text-brand-700 hover:bg-brand-50",
  danger: "text-red-600 hover:bg-red-50",
};

function PendingButton({ label, variant, children }) {
  const { pending } = useFormStatus();
  return (
    <button
      type="submit"
      disabled={pending}
      title={label}
      aria-label={label}
      className={`inline-flex items-center gap-1.5 rounded-lg px-2.5 py-2 text-sm font-semibold transition disabled:opacity-50 ${VARIANTS[variant]}`}
    >
      {children}
    </button>
  );
}

/** Server action'ni chaqiruvchi kichik tugma (ixtiyoriy tasdiqlash bilan). */
export default function ActionButton({ action, label, confirmMessage, variant = "default", children }) {
  const handleSubmit = (event) => {
    if (confirmMessage && !window.confirm(confirmMessage)) event.preventDefault();
  };

  return (
    <form action={action} onSubmit={handleSubmit}>
      <PendingButton label={label} variant={variant}>
        {children ?? label}
      </PendingButton>
    </form>
  );
}
