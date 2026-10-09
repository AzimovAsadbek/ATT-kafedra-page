"use client";

import { useEffect } from "react";

export default function Error({ error, retry }) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="grid min-h-dvh place-items-center bg-paper px-5">
      <div>
        <h1 className="font-serif text-3xl font-semibold text-brand-950">Kutilmagan xatolik yuz berdi</h1>
        <p className="mt-2 text-slate-500">Iltimos, birozdan soʻng qayta urinib koʻring.</p>
        <button
          type="button"
          onClick={() => retry()}
          className="mt-8 inline-flex bg-brand-900 px-6 py-3 font-medium text-white hover:bg-brand-800"
        >
          Qayta urinish
        </button>
      </div>
    </div>
  );
}
