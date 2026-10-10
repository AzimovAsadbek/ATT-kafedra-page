import Image from "next/image";
import SectionHeading from "../SectionHeading";

export default function ActivitySection({ cards }) {
  if (!cards.length) return null;

  return (
    <section id="faoliyat" className="bg-brand-950 py-20 lg:py-28">
      <div className="container-page">
        <SectionHeading label="Faoliyat" title="Ilmiy ishlar va hamkorlik" inverted />

        <ul className="divide-y divide-white/10 border-y border-white/10">
          {cards.map((card) => (
            <li key={card.id} className="grid gap-6 py-10 md:grid-cols-12 md:gap-10 lg:py-12">
              {card.image && (
                <div className="relative aspect-[3/2] overflow-hidden bg-brand-900 md:col-span-5 lg:col-span-4">
                  <Image
                    src={card.image}
                    alt=""
                    fill
                    sizes="(min-width: 1440px) 440px, (min-width: 1024px) 30vw, (min-width: 768px) 40vw, 100vw"
                    className="object-cover"
                  />
                </div>
              )}
              <div className={card.image ? "md:col-span-7 lg:col-span-8 lg:pl-4" : "md:col-span-12 lg:col-span-8 lg:col-start-5 lg:pl-4"}>
                <h3 className="font-serif text-2xl font-semibold text-white sm:text-[1.75rem]">{card.title}</h3>
                {card.description && (
                  <p className="mt-4 max-w-3xl text-[17px] leading-relaxed text-brand-200">{card.description}</p>
                )}
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
