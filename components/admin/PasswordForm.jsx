"use client";

import { useActionState } from "react";
import Alert from "@/components/ui/Alert";
import Field, { inputClass } from "@/components/ui/Field";
import SubmitButton from "@/components/ui/SubmitButton";
import { changePassword } from "@/lib/actions/account";

const FIELDS = [
  { name: "currentPassword", label: "Joriy parol", autoComplete: "current-password" },
  { name: "newPassword", label: "Yangi parol", autoComplete: "new-password", hint: "Kamida 8 ta belgi" },
  { name: "confirmPassword", label: "Yangi parolni takrorlang", autoComplete: "new-password" },
];

export default function PasswordForm() {
  const [state, formAction] = useActionState(changePassword, {});
  const errors = state.errors ?? {};

  return (
    <form action={formAction} className="space-y-5" noValidate>
      {state.status === "success" && (
        <Alert>Parol muvaffaqiyatli almashtirildi. Boshqa qurilmalardagi sessiyalar yopildi.</Alert>
      )}
      {FIELDS.map(({ name, label, autoComplete, hint }) => (
        <Field key={name} id={name} label={label} hint={hint} error={errors[name]}>
          {({ describedBy, invalid }) => (
            <input
              id={name}
              name={name}
              type="password"
              autoComplete={autoComplete}
              aria-describedby={describedBy}
              aria-invalid={invalid || undefined}
              className={inputClass}
            />
          )}
        </Field>
      ))}
      <SubmitButton>Parolni almashtirish</SubmitButton>
    </form>
  );
}
