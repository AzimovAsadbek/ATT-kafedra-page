"use client";

import { LoaderCircle } from "lucide-react";
import { useFormStatus } from "react-dom";

export default function SubmitButton({ children, pendingText = "Saqlanmoqda…", className = "" }) {
  const { pending } = useFormStatus();

  return (
    <button
      type="submit"
      disabled={pending}
      className={`inline-flex items-center justify-center gap-2 rounded-md bg-brand-900 px-5 py-2.5 font-semibold text-white transition hover:bg-brand-800 disabled:cursor-wait disabled:opacity-70 ${className}`}
    >
      {pending && <LoaderCircle className="size-4 animate-spin" aria-hidden="true" />}
      {pending ? pendingText : children}
    </button>
  );
}
