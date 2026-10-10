"use client";

import { Eye, EyeOff } from "lucide-react";
import { useActionState, useState } from "react";
import Alert from "@/components/ui/Alert";
import Field, { inputClass } from "@/components/ui/Field";
import SubmitButton from "@/components/ui/SubmitButton";
import { login } from "@/lib/actions/auth";
import { useSubmitGuard } from "@/lib/hooks/use-submit-guard";

export default function LoginForm() {
  const [state, formAction] = useActionState(login, {});
  const guardSubmit = useSubmitGuard(state);
  const [showPassword, setShowPassword] = useState(false);

  return (
    <form action={formAction} onSubmit={guardSubmit} className="mt-8 space-y-5">
      {state.error && <Alert variant="error">{state.error}</Alert>}

      <Field id="username" label="Login">
        <input
          id="username"
          name="username"
          autoComplete="username"
          required
          autoFocus
          defaultValue={state.values?.username ?? ""}
          className={inputClass}
        />
      </Field>

      <Field id="password" label="Parol">
        <div className="relative">
          <input
            id="password"
            name="password"
            type={showPassword ? "text" : "password"}
            autoComplete="current-password"
            required
            className={`${inputClass} pr-12`}
          />
          <button
            type="button"
            onClick={() => setShowPassword((value) => !value)}
            aria-label={showPassword ? "Parolni yashirish" : "Parolni koʻrsatish"}
            className="absolute inset-y-0 right-0 grid w-12 place-items-center text-slate-400 hover:text-slate-600"
          >
            {showPassword ? <EyeOff className="size-5" /> : <Eye className="size-5" />}
          </button>
        </div>
      </Field>

      <SubmitButton pendingText="Tekshirilmoqda…" className="w-full py-3">
        Kirish
      </SubmitButton>
    </form>
  );
}
