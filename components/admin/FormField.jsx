"use client";

import Field, { inputClass } from "@/components/ui/Field";
import ImageInput from "./ImageInput";

const INPUT_TYPES = { text: "text", email: "email", tel: "tel", url: "url", number: "number" };

/** lib/content-config.js dagi maydon tavsifi asosida mos input'ni chizadi. */
export default function FormField({ field, value, error }) {
  const id = `field-${field.name}`;

  if (field.type === "relation") {
    const selected = new Set(value ?? []);
    return (
      <fieldset>
        <legend className="mb-1.5 block text-sm font-semibold text-slate-800">{field.label}</legend>
        {field.hint && <p className="mb-3 text-sm text-slate-500">{field.hint}</p>}
        <div className="grid max-h-72 gap-1 overflow-y-auto rounded-xl p-2 ring-1 ring-slate-200 sm:grid-cols-2 lg:grid-cols-3">
          {field.options.map((option) => (
            <label
              key={option.value}
              className="flex cursor-pointer items-center gap-2.5 rounded-lg px-2.5 py-2 text-sm text-slate-700 hover:bg-slate-50"
            >
              <input
                type="checkbox"
                name={field.name}
                value={option.value}
                defaultChecked={selected.has(option.value)}
                className="size-4 shrink-0 rounded border-slate-300 accent-brand-700"
              />
              <span className="truncate">{option.label}</span>
            </label>
          ))}
        </div>
      </fieldset>
    );
  }

  if (field.type === "checkbox") {
    return (
      <label htmlFor={id} className="flex cursor-pointer items-center gap-3 rounded-xl bg-slate-50 p-4 ring-1 ring-slate-200">
        <input
          id={id}
          name={field.name}
          type="checkbox"
          defaultChecked={Boolean(value)}
          className="size-5 rounded border-slate-300 accent-brand-700"
        />
        <span className="text-sm font-semibold text-slate-800">{field.label}</span>
      </label>
    );
  }

  return (
    <Field id={id} label={field.label} hint={field.hint} error={error} required={field.required}>
      {({ describedBy, invalid }) => {
        const common = {
          id,
          name: field.name,
          "aria-describedby": describedBy,
          "aria-invalid": invalid || undefined,
        };

        switch (field.type) {
          case "image":
            return (
              <ImageInput id={id} name={field.name} currentSrc={value} describedBy={describedBy} invalid={invalid} />
            );
          case "textarea":
            return (
              <textarea
                {...common}
                rows={field.rows ?? 4}
                maxLength={field.maxLength}
                defaultValue={value ?? ""}
                className={`${inputClass} resize-y`}
              />
            );
          case "select":
            return (
              <select {...common} defaultValue={value ?? ""} className={inputClass}>
                <option value="" disabled={field.required}>
                  {field.required ? "Tanlang…" : "— Yoʻq —"}
                </option>
                {field.options.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>
            );
          default:
            return (
              <input
                {...common}
                type={INPUT_TYPES[field.type] ?? "text"}
                maxLength={field.maxLength}
                step={field.step}
                min={field.min}
                max={field.max}
                defaultValue={value ?? ""}
                className={inputClass}
              />
            );
        }
      }}
    </Field>
  );
}
