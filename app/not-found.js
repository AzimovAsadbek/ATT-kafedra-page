import Link from "next/link";

export const metadata = { title: "Sahifa topilmadi" };

export default function NotFound() {
  return (
    <div className="grid min-h-dvh place-items-center bg-paper px-5">
      <div className="max-w-md">
        <p className="label-caps text-gold-700">Xato 404</p>
        <h1 className="mt-4 font-serif text-4xl font-semibold text-brand-950">Sahifa topilmadi</h1>
        <p className="mt-3 text-slate-600">Siz qidirayotgan sahifa mavjud emas yoki boshqa manzilga koʻchirilgan.</p>
        <div className="mt-8 flex flex-wrap gap-6">
          <Link href="/" className="bg-brand-900 px-6 py-3 font-medium text-white hover:bg-brand-800">
            Bosh sahifa
          </Link>
          <Link href="/oqituvchilar" className="link-underline self-center font-medium text-brand-950">
            Professor-oʻqituvchilar
          </Link>
        </div>
      </div>
    </div>
  );
}
