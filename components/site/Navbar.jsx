"use client";

import { Menu, X } from "lucide-react";
import { useEffect, useState, useSyncExternalStore } from "react";
import Logo from "./Logo";
import { NAV_ITEMS } from "./nav-items";

function subscribeToScroll(callback) {
  window.addEventListener("scroll", callback, { passive: true });
  return () => window.removeEventListener("scroll", callback);
}

const useIsScrolled = () =>
  useSyncExternalStore(
    subscribeToScroll,
    () => window.scrollY > 16,
    () => false,
  );

/** Ekran o'rtasidan o'tayotgan bo'limni aniqlaydi. */
function useActiveSection(ids) {
  const [activeId, setActiveId] = useState(ids[0]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) setActiveId(entry.target.id);
        }
      },
      { rootMargin: "-45% 0px -50% 0px" },
    );
    for (const id of ids) {
      const section = document.getElementById(id);
      if (section) observer.observe(section);
    }
    return () => observer.disconnect();
  }, [ids]);

  return activeId;
}

const LINK_STYLES = {
  solid: { active: "bg-brand-50 text-brand-800", idle: "text-slate-600 hover:text-brand-800" },
  transparent: { active: "bg-white/15 text-white", idle: "text-white/80 hover:text-white" },
};

const SECTION_IDS = NAV_ITEMS.map((item) => item.id);
const LINK_ITEMS = NAV_ITEMS.filter((item) => item.id !== "contact");

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const scrolled = useIsScrolled();
  const activeId = useActiveSection(SECTION_IDS);
  const solid = scrolled || menuOpen;

  useEffect(() => {
    if (!menuOpen) return;
    const onKeyDown = (event) => event.key === "Escape" && setMenuOpen(false);
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [menuOpen]);

  const closeMenu = () => setMenuOpen(false);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-colors duration-300 ${
        solid ? "border-b border-slate-200/80 bg-white/90 shadow-sm backdrop-blur-md" : "bg-transparent"
      }`}
    >
      <nav className="container-page flex h-18 items-center justify-between gap-6" aria-label="Asosiy menyu">
        <a href="#home" onClick={closeMenu} aria-label="ATT kafedrasi — bosh sahifa">
          <Logo inverted={!solid} />
        </a>

        <ul className="hidden items-center gap-1 lg:flex">
          {LINK_ITEMS.map(({ id, label }) => {
            const isActive = activeId === id;
            const style = LINK_STYLES[solid ? "solid" : "transparent"][isActive ? "active" : "idle"];
            return (
              <li key={id}>
                <a
                  href={`#${id}`}
                  aria-current={isActive ? "true" : undefined}
                  className={`rounded-full px-4 py-2 text-sm font-semibold transition-colors ${style}`}
                >
                  {label}
                </a>
              </li>
            );
          })}
        </ul>

        <a
          href="#contact"
          className={`hidden rounded-full px-5 py-2.5 text-sm font-semibold transition-colors lg:inline-flex ${
            solid ? "bg-brand-900 text-white hover:bg-brand-800" : "bg-white text-brand-900 hover:bg-brand-50"
          }`}
        >
          Bogʻlanish
        </a>

        <button
          type="button"
          onClick={() => setMenuOpen((open) => !open)}
          aria-expanded={menuOpen}
          aria-controls="mobile-menu"
          aria-label={menuOpen ? "Menyuni yopish" : "Menyuni ochish"}
          className={`grid size-11 place-items-center rounded-xl lg:hidden ${
            solid ? "text-slate-800 hover:bg-slate-100" : "text-white hover:bg-white/10"
          }`}
        >
          {menuOpen ? <X className="size-6" /> : <Menu className="size-6" />}
        </button>
      </nav>

      {menuOpen && (
        <div id="mobile-menu" className="border-t border-slate-200 bg-white lg:hidden">
          <ul className="container-page flex flex-col gap-1 py-4">
            {NAV_ITEMS.map(({ id, label }) => (
              <li key={id}>
                <a
                  href={`#${id}`}
                  onClick={closeMenu}
                  className={`block rounded-xl px-4 py-3 font-semibold ${
                    activeId === id ? "bg-brand-50 text-brand-800" : "text-slate-700 hover:bg-slate-50"
                  }`}
                >
                  {label}
                </a>
              </li>
            ))}
          </ul>
        </div>
      )}
    </header>
  );
}
