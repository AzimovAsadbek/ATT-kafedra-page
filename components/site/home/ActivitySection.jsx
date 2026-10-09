import Image from "next/image";
import SectionHeading from "../SectionHeading";

export default function ActivitySection({ cards }) {
  if (!cards.length) return null;

  return (
    <section id="faoliyat" className="bg-brand-950 py-20 lg:py-28">
      <div className="container-page">
        <SectionHeading index="04" label="Faoliyat" title="Ilmiy ishlar va hamkorlik" inverted />

        <ul className="grid gap-12 md:grid-cols-2 lg:grid-cols-3 lg:gap-10">
          {cards.map((card) => (
            <li key={card.id} className="border-t border-gold-400/70 pt-6">
              {card.image && (
                <div className="relative mb-6 aspect-[16/10] overflow-hidden bg-brand-900">
                  <Image src={card.image} alt="" fill sizes="(min-width: 1024px) 420px, 100vw" className="object-cover" />
                </div>
              )}
              <h3 className="font-serif text-2xl font-semibold text-white">{card.title}</h3>
              {card.description && <p className="mt-4 leading-relaxed text-brand-200">{card.description}</p>}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
