import { ChevronRight } from "lucide-react";
import Link from "next/link";

/** Ichki sahifalar sarlavhasi: "non bo'lakchalari" (breadcrumbs) va sarlavha. */
export default function PageHeader({ crumbs, title, children }) {
  return (
    <div className="border-b border-line bg-paper">
      <div className="container-page py-10 lg:py-14">
        <nav aria-label="Sahifa yoʻli">
          <ol className="flex flex-wrap items-center gap-1.5 text-sm text-slate-500">
            {crumbs.map((crumb) => (
              <li key={crumb.href} className="flex items-center gap-1.5">
                <Link href={crumb.href} className="hover:text-brand-950">
                  {crumb.label}
                </Link>
                <ChevronRight className="size-3.5" aria-hidden="true" />
              </li>
            ))}
            <li aria-current="page" className="text-slate-700">
              {title}
            </li>
          </ol>
        </nav>
        <h1 className="mt-5 font-serif text-4xl leading-tight font-semibold tracking-tight text-brand-950 sm:text-5xl">
          {title}
        </h1>
        {children}
      </div>
    </div>
  );
}
