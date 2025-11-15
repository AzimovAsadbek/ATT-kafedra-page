"use client";

import Link from "next/link";
import { Fragment, useActionState } from "react";
import Alert from "@/components/ui/Alert";
import SubmitButton from "@/components/ui/SubmitButton";
import FormField from "./FormField";

const isWide = (field) => field.wide || ["textarea", "image", "checkbox", "relation"].includes(field.type);

/**
 * Har qanday kontent turi uchun umumiy yaratish/tahrirlash formasi.
 * @param {Function} action saveItem.bind(null, resourceKey, id) server action'i
 */
export default function ResourceForm({ action, fields, item, cancelHref }) {
  const [state, formAction] = useActionState(action, {});
  const values = state.values ?? item;
  const errors = state.errors ?? {};

  return (
    <form action={formAction} className="space-y-6" noValidate>
      {state.message && <Alert variant="error">{state.message}</Alert>}
      {state.errors && <Alert variant="error">Formada xatolar bor. Belgilangan maydonlarni tekshiring.</Alert>}

      <div className="grid gap-6 rounded-3xl bg-white p-6 shadow-sm ring-1 ring-slate-200 sm:grid-cols-2 sm:p-8">
        {fields.map((field, index) => (
          <Fragment key={field.name}>
            {field.group && (
              <h2
                className={`text-sm font-bold tracking-wider text-brand-700 uppercase sm:col-span-2 ${
                  index > 0 ? "mt-4 border-t border-slate-100 pt-6" : ""
                }`}
              >
                {field.group}
              </h2>
            )}
            <div className={isWide(field) ? "sm:col-span-2" : undefined}>
              {/* Rasm maydoni har doim bazadagi joriy qiymatni ko'rsatadi */}
              <FormField
                field={field}
                value={field.type === "image" ? item[field.name] : values[field.name]}
                error={errors[field.name]}
              />
            </div>
          </Fragment>
        ))}
      </div>

      <div className="flex flex-wrap items-center gap-3">
        <SubmitButton>Saqlash</SubmitButton>
        <Link href={cancelHref} className="rounded-xl px-5 py-2.5 font-semibold text-slate-600 hover:bg-slate-100">
          Bekor qilish
        </Link>
      </div>
    </form>
  );
}
