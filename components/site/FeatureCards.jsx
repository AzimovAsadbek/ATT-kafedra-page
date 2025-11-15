import { ImageIcon } from "lucide-react";
import Image from "next/image";

export default function FeatureCards({ cards }) {
  if (!cards.length) return null;

  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 lg:gap-8">
      {cards.map((card) => (
        <article
          key={card.id}
          className="group flex flex-col overflow-hidden rounded-3xl bg-white shadow-sm ring-1 ring-slate-200/80 transition duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-brand-900/10"
        >
          <div className="relative aspect-16/10 overflow-hidden bg-slate-100">
            {card.image ? (
              <Image
                src={card.image}
                alt={card.title}
                fill
                sizes="(min-width: 1024px) 400px, (min-width: 640px) 50vw, 100vw"
                className="object-cover transition duration-500 group-hover:scale-105"
              />
            ) : (
              <div className="grid h-full place-items-center text-slate-300">
                <ImageIcon className="size-10" aria-hidden="true" />
              </div>
            )}
          </div>
          <div className="flex flex-1 flex-col p-6 lg:p-7">
            <h3 className="text-xl font-bold">{card.title}</h3>
            <span className="mt-3 mb-4 h-1 w-12 rounded-full bg-teal-400" aria-hidden="true" />
            {card.description && <p className="leading-relaxed text-slate-600">{card.description}</p>}
          </div>
        </article>
      ))}
    </div>
  );
}
