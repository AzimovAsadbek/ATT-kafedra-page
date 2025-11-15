"use client";

import { useActionState } from "react";
import Alert from "@/components/ui/Alert";
import SubmitButton from "@/components/ui/SubmitButton";
import { SETTINGS_GROUPS } from "@/lib/content-config";
import { saveSettings } from "@/lib/actions/settings";
import FormField from "./FormField";

export default function SettingsForm({ settings }) {
  const [state, formAction] = useActionState(saveSettings, {});
  const values = state.values ?? settings;
  const errors = state.errors ?? {};

  return (
    <form action={formAction} className="space-y-6" noValidate>
      {state.status === "success" && <Alert>Sozlamalar saqlandi va saytda yangilandi.</Alert>}
      {state.status === "error" && (
        <Alert variant="error">Formada xatolar bor. Belgilangan maydonlarni tekshiring.</Alert>
      )}

      {SETTINGS_GROUPS.map((group) => (
        <section key={group.title} className="rounded-3xl bg-white p-6 shadow-sm ring-1 ring-slate-200 sm:p-8">
          <h2 className="text-lg font-bold">{group.title}</h2>
          {group.description && <p className="mt-1 text-sm text-slate-500">{group.description}</p>}
          <div className="mt-6 grid gap-6">
            {group.fields.map((field) => (
              <FormField
                key={field.name}
                field={field}
                value={field.type === "image" ? settings[field.name] || null : values[field.name]}
                error={errors[field.name]}
              />
            ))}
          </div>
        </section>
      ))}

      <div className="sticky bottom-4 z-10 flex justify-end">
        <SubmitButton className="shadow-lg shadow-brand-900/20">Sozlamalarni saqlash</SubmitButton>
      </div>
    </form>
  );
}
