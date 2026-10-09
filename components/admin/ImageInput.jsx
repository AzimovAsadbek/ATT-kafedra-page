"use client";

import { ImagePlus } from "lucide-react";
import { useEffect, useRef, useState } from "react";

/**
 * Rasm tanlash maydoni. Server tomonda `${name}__file` (yangi fayl) va
 * `${name}__remove` (rasmni olib tashlash) qiymatlari o'qiladi.
 */
export default function ImageInput({ id, name, currentSrc, describedBy, invalid }) {
  const [previewUrl, setPreviewUrl] = useState(null);
  const [removed, setRemoved] = useState(false);
  const inputRef = useRef(null);

  useEffect(() => () => previewUrl && URL.revokeObjectURL(previewUrl), [previewUrl]);

  // React forma yuborilgandan so'ng uni tozalaydi (form.reset) — ko'rinishni ham tiklaymiz.
  useEffect(() => {
    const form = inputRef.current?.form;
    if (!form) return;
    const handleReset = () => {
      setPreviewUrl(null);
      setRemoved(false);
    };
    form.addEventListener("reset", handleReset);
    return () => form.removeEventListener("reset", handleReset);
  }, []);

  const handleFileChange = (event) => {
    const file = event.target.files?.[0];
    setPreviewUrl(file ? URL.createObjectURL(file) : null);
    if (file) setRemoved(false);
  };

  const shownSrc = previewUrl ?? (removed ? null : currentSrc);

  return (
    <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
      <div className="grid size-28 shrink-0 place-items-center overflow-hidden rounded-2xl bg-slate-100 ring-1 ring-slate-200">
        {shownSrc ? (
          // eslint-disable-next-line @next/next/no-img-element -- blob: URL'lar next/image orqali ko'rsatilmaydi
          <img src={shownSrc} alt="" className="size-full object-cover" />
        ) : (
          <ImagePlus className="size-8 text-slate-400" aria-hidden="true" />
        )}
      </div>

      <div className="space-y-3">
        <input
          ref={inputRef}
          id={id}
          name={`${name}__file`}
          type="file"
          accept="image/jpeg,image/png,image/webp,image/avif,image/gif"
          onChange={handleFileChange}
          aria-describedby={describedBy}
          aria-invalid={invalid || undefined}
          className="block w-full text-sm text-slate-600 file:mr-4 file:rounded-lg file:border-0 file:bg-brand-50 file:px-4 file:py-2 file:text-sm file:font-semibold file:text-brand-800 hover:file:bg-brand-100"
        />
        {currentSrc && !previewUrl && (
          <label className="flex items-center gap-2 text-sm text-slate-600">
            <input
              type="checkbox"
              name={`${name}__remove`}
              checked={removed}
              onChange={(event) => setRemoved(event.target.checked)}
              className="size-4 rounded border-slate-300 text-red-600"
            />
            Joriy rasmni olib tashlash
          </label>
        )}
        <p className="text-xs text-slate-500">JPG, PNG, WEBP, AVIF yoki GIF · maksimal 5 MB</p>
      </div>
    </div>
  );
}
