"use client";

import { useEffect } from "react";

export default function Error({ error, retry }) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="grid min-h-dvh place-items-center bg-slate-50 px-4 text-center">
      <div>
        <h1 className="text-2xl font-bold">Kutilmagan xatolik yuz berdi</h1>
        <p className="mt-2 text-slate-500">Iltimos, birozdan soʻng qayta urinib koʻring.</p>
        <button
          type="button"
          onClick={() => retry()}
          className="mt-8 inline-flex rounded-full bg-brand-900 px-6 py-3 font-semibold text-white hover:bg-brand-800"
        >
          Qayta urinish
        </button>
      </div>
    </div>
  );
}
