"use client";

import { LoaderCircle } from "lucide-react";
import { useFormStatus } from "react-dom";

const VARIANTS = {
  primary: "bg-brand-900 text-white hover:bg-brand-800",
  secondary: "bg-white text-brand-800 ring-1 ring-brand-200 hover:bg-brand-50",
};

export default function SubmitButton({ children, pendingText = "Saqlanmoqda…", variant = "primary", className = "" }) {
  const { pending } = useFormStatus();

  return (
    <button
      type="submit"
      disabled={pending}
      className={`inline-flex items-center justify-center gap-2 rounded-md px-5 py-2.5 font-semibold transition disabled:cursor-wait disabled:opacity-70 ${VARIANTS[variant]} ${className}`}
    >
      {pending && <LoaderCircle className="size-4 animate-spin" aria-hidden="true" />}
      {pending ? pendingText : children}
    </button>
  );
}
