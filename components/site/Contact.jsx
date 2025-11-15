import { Clock, Mail, MapPin, Phone } from "lucide-react";
import ContactForm from "./ContactForm";
import SectionHeader from "./SectionHeader";

const telHref = (phone) => `tel:${phone.replace(/[^\d+]/g, "")}`;

export default function Contact({ settings }) {
  const items = [
    { icon: MapPin, label: "Manzil", value: settings.contact_address },
    { icon: Phone, label: "Telefon", value: settings.contact_phone, href: settings.contact_phone && telHref(settings.contact_phone) },
    { icon: Mail, label: "Email", value: settings.contact_email, href: settings.contact_email && `mailto:${settings.contact_email}` },
    { icon: Clock, label: "Ish vaqti", value: settings.contact_hours },
  ].filter((item) => item.value);

  return (
    <section id="contact" className="bg-slate-50 py-20 lg:py-28">
      <div className="container-page">
        <SectionHeader eyebrow="Biz bilan aloqa" title="Savollaringiz bormi?" description={settings.contact_intro} />

        <div className="grid gap-6 lg:grid-cols-5 lg:gap-8">
          <aside className="relative overflow-hidden rounded-3xl bg-brand-900 p-7 text-white sm:p-9 lg:col-span-2">
            <div className="bg-grid absolute inset-0 opacity-60" aria-hidden="true" />
            <div className="relative">
              <h3 className="text-2xl font-bold text-white">Kafedra maʼlumotlari</h3>
              <p className="mt-2 text-brand-100">Quyidagi maʼlumotlar orqali biz bilan bogʻlaning.</p>
              <ul className="mt-8 space-y-6">
                {items.map(({ icon: Icon, label, value, href }) => (
                  <li key={label} className="flex gap-4">
                    <span className="grid size-11 shrink-0 place-items-center rounded-xl bg-white/10 text-teal-300">
                      <Icon className="size-5" aria-hidden="true" />
                    </span>
                    <div>
                      <p className="text-sm font-medium text-brand-200">{label}</p>
                      {href ? (
                        <a href={href} className="font-semibold break-words text-white hover:text-teal-200">
                          {value}
                        </a>
                      ) : (
                        <p className="font-semibold text-white">{value}</p>
                      )}
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </aside>

          <div className="rounded-3xl bg-white p-7 shadow-sm ring-1 ring-slate-200/80 sm:p-9 lg:col-span-3">
            <h3 className="mb-6 text-2xl font-bold">Onlayn murojaat</h3>
            <ContactForm />
          </div>
        </div>

        {settings.map_embed_url && (
          <div className="mt-8 overflow-hidden rounded-3xl shadow-sm ring-1 ring-slate-200/80">
            <iframe
              src={settings.map_embed_url}
              title="Kafedra joylashuvi xaritada"
              className="block h-80 w-full sm:h-105"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              allowFullScreen
            />
          </div>
        )}
      </div>
    </section>
  );
}
