import Link from "next/link";

export const metadata = { title: "Sahifa topilmadi" };

export default function NotFound() {
  return (
    <div className="grid min-h-dvh place-items-center bg-slate-50 px-4 text-center">
      <div>
        <p className="font-display text-7xl font-extrabold text-brand-900">404</p>
        <h1 className="mt-4 text-2xl font-bold">Sahifa topilmadi</h1>
        <p className="mt-2 text-slate-500">Siz qidirayotgan sahifa mavjud emas yoki koʻchirilgan.</p>
        <Link
          href="/"
          className="mt-8 inline-flex rounded-full bg-brand-900 px-6 py-3 font-semibold text-white hover:bg-brand-800"
        >
          Bosh sahifaga qaytish
        </Link>
      </div>
    </div>
  );
}
