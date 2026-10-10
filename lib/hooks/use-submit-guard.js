"use client";

import { useEffect, useRef } from "react";

/**
 * Forma javobi kelmaguncha qayta yuborishni bloklaydi (tez ikki marta bosish, bosish + Enter).
 * React form action'lari navbatga qo'yiladi, shuning uchun ikkinchi yuborish ham bajarilardi.
 * `state` — useActionState holati: u o'zgarganda (javob kelganda) forma yana ochiladi.
 * @returns {(event: SubmitEvent) => void} formaning onSubmit ishlovchisi
 */
export function useSubmitGuard(state) {
  const submitting = useRef(false);

  useEffect(() => {
    submitting.current = false;
  }, [state]);

  return (event) => {
    if (submitting.current) {
      event.preventDefault();
      return;
    }
    submitting.current = true;
  };
}
