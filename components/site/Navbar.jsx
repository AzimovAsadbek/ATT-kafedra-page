"use client";

import { Menu, X } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import Logo from "./Logo";
import { NAV_ITEMS } from "./nav-items";

const SECTION_IDS = NAV_ITEMS.map((item) => item.section);

/** Bosh sahifada ekran o'rtasidan o'tayotgan bo'limni aniqlaydi. */
function useActiveSection(enabled) {
  const [activeId, setActiveId] = useState(null);

  useEffect(() => {
    if (!enabled) return;
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) setActiveId(entry.target.id);
        }
      },
      { rootMargin: "-45% 0px -50% 0px" },
    );
    for (const id of SECTION_IDS) {
      const section = document.getElementById(id);
      if (section) observer.observe(section);
    }
    return () => observer.disconnect();
  }, [enabled]);

  return enabled ? activeId : null;
}

export default function Navbar() {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);
  const activeSection = useActiveSection(pathname === "/");

  useEffect(() => {
    if (!menuOpen) return;
    const onKeyDown = (event) => event.key === "Escape" && setMenuOpen(false);
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [menuOpen]);

  const isActive = (item) =>
    (item.section === "oqituvchilar" && pathname.startsWith("/oqituvchilar")) || activeSection === item.section;
  const closeMenu = () => setMenuOpen(false);

  // Bosh sahifadagi bo'lim havolalari: mobil menyu yopilganda layout o'zgaradi va Next'ning
  // hash'ga aylantirishi bekor bo'lib qoladi, shuning uchun aylantirishni o'zimiz bajaramiz.
  const handleNavClick = (event, href) => {
    closeMenu();
    if (pathname !== "/" || !href.startsWith("/#")) return;

    const id = href.slice(2);
    const target = document.getElementById(id);
    if (!target) return;

    event.preventDefault();
    window.history.pushState(null, "", `#${id}`);
    requestAnimationFrame(() => target.scrollIntoView({ behavior: "smooth", block: "start" }));
  };

  return (
    <header className="sticky top-0 z-50 border-b border-line bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/85">
      <nav className="container-page flex h-[72px] items-center justify-between gap-8" aria-label="Asosiy menyu">
        <Link href="/" onClick={closeMenu} aria-label="Bosh sahifa">
          <Logo />
        </Link>

        <ul className="hidden items-center gap-7 xl:flex">
          {NAV_ITEMS.map((item) => {
            const active = isActive(item);
            return (
              <li key={item.href}>
                <Link
                  href={item.href}
                  onClick={(event) => handleNavClick(event, item.href)}
                  aria-current={active ? "true" : undefined}
                  className={`relative py-6 text-[15px] font-medium transition-colors after:absolute after:inset-x-0 after:-bottom-px after:h-0.5 after:transition-colors ${
                    active
                      ? "text-brand-950 after:bg-gold-500"
                      : "text-slate-600 after:bg-transparent hover:text-brand-950"
                  }`}
                >
                  {item.label}
                </Link>
              </li>
            );
          })}
        </ul>

        <button
          type="button"
          onClick={() => setMenuOpen((open) => !open)}
          aria-expanded={menuOpen}
          aria-controls="mobile-menu"
          aria-label={menuOpen ? "Menyuni yopish" : "Menyuni ochish"}
          className="grid size-11 place-items-center text-brand-950 hover:bg-sand xl:hidden"
        >
          {menuOpen ? <X className="size-6" /> : <Menu className="size-6" />}
        </button>
      </nav>

      {menuOpen && (
        <div id="mobile-menu" className="border-t border-line bg-white xl:hidden">
          <ul className="container-page divide-y divide-line py-2">
            {NAV_ITEMS.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  onClick={(event) => handleNavClick(event, item.href)}
                  className={`flex items-center justify-between py-3.5 font-medium ${
                    isActive(item) ? "text-brand-950" : "text-slate-600"
                  }`}
                >
                  {item.label}
                  {isActive(item) && <span className="size-1.5 bg-gold-500" aria-hidden="true" />}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      )}
    </header>
  );
}
