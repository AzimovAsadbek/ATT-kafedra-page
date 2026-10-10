"use client";

import { useActionState, useEffect, useRef } from "react";
import Alert from "@/components/ui/Alert";
import Field, { inputClass } from "@/components/ui/Field";
import SubmitButton from "@/components/ui/SubmitButton";
import { submitContact } from "@/lib/actions/contact";
import { useSubmitGuard } from "@/lib/hooks/use-submit-guard";

const FIELDS = [
  { name: "name", label: "Ismingiz", autoComplete: "name", required: true },
  { name: "email", label: "Email manzilingiz", type: "email", autoComplete: "email", required: true },
  { name: "phone", label: "Telefon raqamingiz", type: "tel", autoComplete: "tel", placeholder: "+998 90 123 45 67" },
  { name: "subject", label: "Mavzu", required: true },
];

export default function ContactForm() {
  const [state, formAction] = useActionState(submitContact, { status: "idle", sent: 0 });
  const guardSubmit = useSubmitGuard(state);
  // Murojaatning noyob ID'si faqat brauzerda, birinchi yuborishda yaratiladi (sahifa statik,
  // shuning uchun render paytida yaratib bo'lmaydi) va muvaffaqiyatli javobgacha o'zgarmaydi:
  // takroriy yuborish serverda e'tiborsiz qoldiriladi.
  const submissionId = useRef(null);
  const values = state.values ?? {};
  const errors = state.errors ?? {};

  useEffect(() => {
    if (state.status === "success") submissionId.current = null;
  }, [state]);

  const handleSubmit = (event) => {
    submissionId.current ??= crypto.randomUUID?.() ?? `${Date.now().toString(36)}-${Math.random().toString(36).slice(2)}`;
    event.currentTarget.elements.submissionId.value = submissionId.current;
    guardSubmit(event);
  };

  return (
    <form action={formAction} onSubmit={handleSubmit} className="relative space-y-5" noValidate>
      <input type="hidden" name="submissionId" defaultValue="" />
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
