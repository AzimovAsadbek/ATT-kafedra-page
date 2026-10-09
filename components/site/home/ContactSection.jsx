import ContactForm from "../ContactForm";
import SectionHeading from "../SectionHeading";

const telHref = (phone) => `tel:${phone.replace(/[^\d+]/g, "")}`;

export default function ContactSection({ settings }) {
  const items = [
    { label: "Manzil", value: settings.contact_address },
    { label: "Telefon", value: settings.contact_phone, href: settings.contact_phone && telHref(settings.contact_phone) },
    { label: "Email", value: settings.contact_email, href: settings.contact_email && `mailto:${settings.contact_email}` },
    { label: "Ish kunlari", value: settings.contact_hours },
  ].filter((item) => item.value);

  return (
    <section id="aloqa" className="py-20 lg:py-28">
      <div className="container-page">
        <SectionHeading index="06" label="Bogʻlanish" title="Kafedra bilan aloqa" description={settings.contact_intro} />

        <div className="grid gap-14 lg:grid-cols-12 lg:gap-12">
          <div className="lg:col-span-5">
            <dl className="border-t-2 border-brand-950">
              {items.map(({ label, value, href }) => (
                <div key={label} className="border-b border-line py-4">
                  <dt className="label-caps text-[11px] text-slate-500">{label}</dt>
                  <dd className="mt-1 font-medium break-words text-slate-800">
                    {href ? (
                      <a href={href} className="link-underline">
                        {value}
                      </a>
                    ) : (
                      value
                    )}
                  </dd>
                </div>
              ))}
            </dl>
            {settings.map_embed_url && (
              <iframe
                src={settings.map_embed_url}
                title="Kafedra joylashuvi xaritada"
                className="mt-8 block aspect-[4/3] w-full border border-line grayscale-[35%]"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                allowFullScreen
              />
            )}
          </div>

          <div className="border border-line p-6 sm:p-10 lg:col-span-7">
            <h3 className="font-serif text-2xl font-semibold text-brand-950">Onlayn murojaat</h3>
            <p className="mt-2 mb-8 text-slate-600">Barcha maydonlar toʻldirilishi shart, telefon raqami ixtiyoriy.</p>
            <ContactForm />
          </div>
        </div>
      </div>
    </section>
  );
}
