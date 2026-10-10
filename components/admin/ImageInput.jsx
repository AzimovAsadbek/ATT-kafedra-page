"use client";

import { ImagePlus, LoaderCircle } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { compressImage, formatBytes, MAX_UPLOAD_BYTES } from "@/lib/image-compress";

/**
 * Rasm tanlash maydoni. Tanlangan rasm brauzerda kichraytirilib, input'ga qayta
 * yoziladi. Server tomonda `${name}__file` (yangi fayl) va `${name}__remove`
 * (rasmni olib tashlash) qiymatlari o'qiladi.
 */
export default function ImageInput({ id, name, currentSrc, describedBy, invalid }) {
  const [previewUrl, setPreviewUrl] = useState(null);
  const [removed, setRemoved] = useState(false);
  const [status, setStatus] = useState({ state: "idle" });
  const inputRef = useRef(null);

  useEffect(() => () => previewUrl && URL.revokeObjectURL(previewUrl), [previewUrl]);

  // React forma yuborilgandan so'ng uni tozalaydi (form.reset) — ko'rinishni ham tiklaymiz.
  useEffect(() => {
    const form = inputRef.current?.form;
    if (!form) return;
    const handleReset = () => {
      setPreviewUrl(null);
      setRemoved(false);
      setStatus({ state: "idle" });
    };
    form.addEventListener("reset", handleReset);
    return () => form.removeEventListener("reset", handleReset);
  }, []);

  const handleFileChange = async (event) => {
    const input = event.target;
    const original = input.files?.[0];
    setPreviewUrl(null);
    if (!original) {
      setStatus({ state: "idle" });
      return;
    }

    setStatus({ state: "processing" });
    try {
      const file = await compressImage(original);
      if (file.size > MAX_UPLOAD_BYTES) throw new Error("too-large");

      const transfer = new DataTransfer();
      transfer.items.add(file);
      input.files = transfer.files;

      setPreviewUrl(URL.createObjectURL(file));
      setRemoved(false);
      setStatus({ state: "ready", original: original.size, final: file.size });
    } catch (error) {
      input.value = "";
      setStatus({
        state: "error",
        message:
          error.message === "too-large"
            ? "Rasm juda katta. Kichikroq rasm tanlang."
            : "Bu rasmni oʻqib boʻlmadi. JPG yoki PNG formatidagi rasm tanlang.",
      });
    }
  };

  const shownSrc = previewUrl ?? (removed ? null : currentSrc);

  return (
    <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
      <div className="relative grid size-28 shrink-0 place-items-center overflow-hidden rounded-2xl bg-slate-100 ring-1 ring-slate-200">
        {shownSrc ? (
          // eslint-disable-next-line @next/next/no-img-element -- blob: URL'lar next/image orqali ko'rsatilmaydi
          <img src={shownSrc} alt="" className="size-full object-cover" />
        ) : (
          <ImagePlus className="size-8 text-slate-400" aria-hidden="true" />
        )}
        {status.state === "processing" && (
          <div className="absolute inset-0 grid place-items-center bg-white/70">
            <LoaderCircle className="size-6 animate-spin text-brand-700" aria-label="Rasm tayyorlanmoqda" />
          </div>
        )}
      </div>

      <div className="space-y-2">
        <input
          ref={inputRef}
          id={id}
          name={`${name}__file`}
          type="file"
          accept="image/jpeg,image/png,image/webp,image/avif,image/gif,image/heic,image/heif"
          onChange={handleFileChange}
          aria-describedby={describedBy}
          aria-invalid={invalid || status.state === "error" || undefined}
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
        {status.state === "ready" && (
          <p className="text-xs text-emerald-700">
            Rasm tayyor: {formatBytes(status.original)} → {formatBytes(status.final)}. Saqlash tugmasini bosing.
          </p>
        )}
        {status.state === "error" && <p className="text-sm text-red-600">{status.message}</p>}
        <p className="text-xs text-slate-500">
          JPG, PNG, WEBP yoki telefon rasmi — hajmi muhim emas, avtomatik kichraytiriladi
        </p>
      </div>
    </div>
  );
}
