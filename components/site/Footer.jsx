import { ArrowUpRight } from "lucide-react";
import Link from "next/link";
import Logo from "./Logo";
import { NAV_ITEMS } from "./nav-items";
import SocialLinks from "./SocialLinks";

function FooterColumn({ title, children, className = "" }) {
  return (
    <div className={className}>
      <h2 className="label-caps mb-5 text-gold-300">{title}</h2>
      {children}
    </div>
  );
}

export default function Footer({ settings, links }) {
  const contacts = [settings.contact_address, settings.contact_phone, settings.contact_email].filter(Boolean);

  return (
    <footer className="bg-brand-950 text-brand-200">
      <div className="container-page grid gap-12 py-16 sm:grid-cols-2 lg:grid-cols-12 lg:gap-10 lg:py-20">
        <div className="sm:col-span-2 lg:col-span-4">
          <Logo inverted />
          {settings.footer_about && <p className="mt-6 max-w-sm text-[15px] leading-relaxed">{settings.footer_about}</p>}
          <div className="mt-7">
            <SocialLinks settings={settings} />
          </div>
        </div>

        <FooterColumn title="Boʻlimlar" className="lg:col-span-2">
          <ul className="space-y-2.5 text-[15px]">
            {NAV_ITEMS.map((item) => (
              <li key={item.href}>
                <Link href={item.href} className="transition hover:text-white">
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </FooterColumn>

        {links.length > 0 && (
          <FooterColumn title="Foydali havolalar" className="lg:col-span-3">
            <ul className="space-y-2.5 text-[15px]">
              {links.map((link) => (
                <li key={link.id}>
                  <a href={link.url} target="_blank" rel="noopener noreferrer" className="group transition hover:text-white">
                    {link.title}
                    <ArrowUpRight className="ml-1 inline size-3.5 align-baseline opacity-60 group-hover:opacity-100" aria-hidden="true" />
                  </a>
                </li>
              ))}
            </ul>
          </FooterColumn>
        )}

        {contacts.length > 0 && (
          <FooterColumn title="Aloqa" className="lg:col-span-3">
            <ul className="space-y-2.5 text-[15px]">
              {contacts.map((value) => (
                <li key={value} className="break-words">
                  {value}
                </li>
              ))}
            </ul>
          </FooterColumn>
        )}
      </div>

      <div className="border-t border-white/10">
        <div className="container-page flex flex-col gap-2 py-6 text-sm text-brand-300 sm:flex-row sm:justify-between">
          <p>© {new Date().getFullYear()} Axborot tizimlari va texnologiyalari kafedrasi</p>
          <p>Namangan davlat texnika universiteti</p>
        </div>
      </div>
    </footer>
  );
}
