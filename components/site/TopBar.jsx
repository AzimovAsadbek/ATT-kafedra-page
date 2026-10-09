import { Mail, Phone } from "lucide-react";

const telHref = (phone) => `tel:${phone.replace(/[^\d+]/g, "")}`;

export default function TopBar({ settings }) {
  return (
    <div className="hidden bg-brand-950 text-[13px] text-brand-200 md:block">
      <div className="container-page flex h-10 items-center justify-between gap-6">
        <p className="truncate">
          {settings.university_website ? (
            <a href={settings.university_website} target="_blank" rel="noopener noreferrer" className="hover:text-white">
              Namangan davlat texnika universiteti
            </a>
          ) : (
            "Namangan davlat texnika universiteti"
          )}
          {settings.dept_faculty && <span className="text-brand-400"> · {settings.dept_faculty}</span>}
        </p>
        <div className="flex shrink-0 items-center gap-6">
          {settings.contact_phone && (
            <a href={telHref(settings.contact_phone)} className="inline-flex items-center gap-2 hover:text-white">
              <Phone className="size-3.5" aria-hidden="true" />
              {settings.contact_phone}
            </a>
          )}
          {settings.contact_email && (
            <a href={`mailto:${settings.contact_email}`} className="inline-flex items-center gap-2 hover:text-white">
              <Mail className="size-3.5" aria-hidden="true" />
              {settings.contact_email}
            </a>
          )}
        </div>
      </div>
    </div>
  );
}
