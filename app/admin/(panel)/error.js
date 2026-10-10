"use client";

import { CircleAlert, RotateCcw } from "lucide-react";
import Link from "next/link";
import { useEffect } from "react";

export default function AdminError({ error, retry }) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="mx-auto max-w-xl rounded-3xl bg-white p-8 text-center shadow-sm ring-1 ring-slate-200">
      <CircleAlert className="mx-auto size-10 text-red-500" aria-hidden="true" />
      <h1 className="mt-4 text-xl font-bold">Amalni bajarib boʻlmadi</h1>
      <p className="mt-2 text-slate-600">
        Internet aloqasini tekshirib, qayta urinib koʻring. Xato takrorlansa, sahifani yangilang.
      </p>
      {error?.digest && <p className="mt-3 font-mono text-xs text-slate-400">Kod: {error.digest}</p>}
      <div className="mt-6 flex justify-center gap-3">
        <button
          type="button"
          onClick={() => retry()}
          className="inline-flex items-center gap-2 rounded-md bg-brand-900 px-5 py-2.5 font-semibold text-white hover:bg-brand-800"
        >
          <RotateCcw className="size-4" aria-hidden="true" />
          Qayta urinish
        </button>
        <Link href="/admin" className="rounded-md px-5 py-2.5 font-semibold text-slate-600 hover:bg-slate-100">
          Boshqaruv paneli
        </Link>
      </div>
    </div>
  );
}
