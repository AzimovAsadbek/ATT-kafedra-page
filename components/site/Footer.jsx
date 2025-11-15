import { ArrowUpRight, Mail, MapPin, Phone } from "lucide-react";
import Logo from "./Logo";
import { NAV_ITEMS } from "./nav-items";
import SocialLinks from "./SocialLinks";

function FooterColumn({ title, children }) {
  return (
    <div>
      <h2 className="mb-5 text-sm font-bold tracking-widest text-white uppercase">{title}</h2>
      {children}
    </div>
  );
}

export default function Footer({ settings, links }) {
  const contacts = [
    { icon: MapPin, value: settings.contact_address },
    { icon: Phone, value: settings.contact_phone },
    { icon: Mail, value: settings.contact_email },
  ].filter((item) => item.value);

  return (
    <footer className="bg-brand-950 text-brand-100">
      <div className="container-page grid gap-12 py-16 sm:grid-cols-2 lg:grid-cols-12 lg:gap-8">
        <div className="sm:col-span-2 lg:col-span-4">
          <Logo inverted />
          {settings.footer_about && <p className="mt-5 max-w-sm leading-relaxed">{settings.footer_about}</p>}
          <div className="mt-6">
            <SocialLinks settings={settings} />
          </div>
        </div>

        <div className="lg:col-span-2">
          <FooterColumn title="Sahifalar">
            <ul className="space-y-3">
              {NAV_ITEMS.map(({ id, label }) => (
                <li key={id}>
                  <a href={`#${id}`} className="transition hover:text-white">
                    {label}
                  </a>
                </li>
              ))}
            </ul>
          </FooterColumn>
        </div>

        {links.length > 0 && (
          <div className="lg:col-span-3">
            <FooterColumn title="Foydali havolalar">
              <ul className="space-y-3">
                {links.map((link) => (
                  <li key={link.id}>
                    <a
                      href={link.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group transition hover:text-white"
                    >
                      {link.title}
                      <ArrowUpRight
                        className="ml-1 inline size-4 align-text-top opacity-50 transition group-hover:opacity-100"
                        aria-hidden="true"
                      />
                    </a>
                  </li>
                ))}
              </ul>
            </FooterColumn>
          </div>
        )}

        {contacts.length > 0 && (
          <div className="lg:col-span-3">
            <FooterColumn title="Aloqa">
              <ul className="space-y-4">
                {contacts.map(({ icon: Icon, value }) => (
                  <li key={value} className="flex gap-3">
                    <Icon className="mt-0.5 size-5 shrink-0 text-teal-300" aria-hidden="true" />
                    <span className="break-words">{value}</span>
                  </li>
                ))}
              </ul>
            </FooterColumn>
          </div>
        )}
      </div>

      <div className="border-t border-white/10">
        <p className="container-page py-6 text-center text-sm text-brand-200">
          © {new Date().getFullYear()} Axborot tizimlari va texnologiyalari kafedrasi. Barcha huquqlar himoyalangan.
        </p>
      </div>
    </footer>
  );
}
