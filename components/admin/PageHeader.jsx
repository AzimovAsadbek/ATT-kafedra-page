import { ChevronLeft } from "lucide-react";
import Link from "next/link";

export default function PageHeader({ title, description, backHref, actions }) {
  return (
    <div className="mb-8">
      {backHref && (
        <Link
          href={backHref}
          className="mb-3 inline-flex items-center gap-1 text-sm font-semibold text-slate-500 hover:text-brand-700"
        >
          <ChevronLeft className="size-4" aria-hidden="true" />
          Orqaga
        </Link>
      )}
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <h1 className="text-2xl font-extrabold tracking-tight sm:text-3xl">{title}</h1>
          {description && <p className="mt-1.5 text-slate-500">{description}</p>}
        </div>
        {actions && <div className="flex flex-wrap gap-3">{actions}</div>}
      </div>
    </div>
  );
}
