"use client";

import { useActionState } from "react";
import Alert from "@/components/ui/Alert";
import Field, { inputClass } from "@/components/ui/Field";
import SubmitButton from "@/components/ui/SubmitButton";
import { submitContact } from "@/lib/actions/contact";

const FIELDS = [
  { name: "name", label: "Ismingiz", autoComplete: "name", required: true },
  { name: "email", label: "Email manzilingiz", type: "email", autoComplete: "email", required: true },
  { name: "phone", label: "Telefon raqamingiz", type: "tel", autoComplete: "tel", placeholder: "+998 90 123 45 67" },
  { name: "subject", label: "Mavzu", required: true },
];

export default function ContactForm() {
  const [state, formAction] = useActionState(submitContact, { status: "idle" });
  const values = state.values ?? {};
  const errors = state.errors ?? {};

  return (
    <form action={formAction} className="relative space-y-5" noValidate>
      {state.status === "success" && <Alert>Murojaatingiz qabul qilindi. Tez orada siz bilan bogʻlanamiz.</Alert>}
      {state.message && <Alert variant="error">{state.message}</Alert>}

      <div className="grid gap-5 sm:grid-cols-2">
        {FIELDS.map(({ name, label, required, ...inputProps }) => (
          <Field key={name} id={`contact-${name}`} label={label} required={required} error={errors[name]}>
            {({ describedBy, invalid }) => (
              <input
                id={`contact-${name}`}
                name={name}
                type="text"
                required={required}
                defaultValue={values[name] ?? ""}
                aria-invalid={invalid || undefined}
                aria-describedby={describedBy}
                className={inputClass}
                {...inputProps}
              />
            )}
          </Field>
        ))}
      </div>

      <Field id="contact-body" label="Xabaringiz" required error={errors.body}>
        {({ describedBy, invalid }) => (
          <textarea
            id="contact-body"
            name="body"
            rows={6}
            required
            defaultValue={values.body ?? ""}
            aria-invalid={invalid || undefined}
            aria-describedby={describedBy}
            className={`${inputClass} resize-y`}
          />
        )}
      </Field>

      {/* Spam-botlar uchun tuzoq: foydalanuvchilarga ko'rinmaydi */}
      <div className="absolute -left-[9999px]" aria-hidden="true">
        <label>
          Veb-sayt
          <input type="text" name="website" tabIndex={-1} autoComplete="off" />
        </label>
      </div>

      <SubmitButton pendingText="Yuborilmoqda…" className="w-full py-3.5 sm:w-auto sm:px-8">
        Xabarni yuborish
      </SubmitButton>
    </form>
  );
}
