"use client";

import {
  Building2,
  ExternalLink,
  GraduationCap,
  Inbox,
  KeyRound,
  Landmark,
  LayoutDashboard,
  Link2,
  LogOut,
  Menu,
  Settings,
  Users,
  X,
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import Logo from "@/components/site/Logo";
import { logout } from "@/lib/actions/auth";

const NAV_GROUPS = [
  {
    items: [
      { href: "/admin", label: "Boshqaruv paneli", icon: LayoutDashboard, exact: true },
      { href: "/admin/messages", label: "Murojaatlar", icon: Inbox, badgeKey: "newMessages" },
    ],
  },
  {
    title: "Kontent",
    items: [
      { href: "/admin/staff", label: "Oʻqituvchilar", icon: Users },
      { href: "/admin/programs", label: "Yoʻnalishlar", icon: GraduationCap },
      { href: "/admin/department-cards", label: "Kafedra kartalari", icon: Building2 },
      { href: "/admin/university-cards", label: "Universitet kartalari", icon: Landmark },
      { href: "/admin/links", label: "Foydali havolalar", icon: Link2 },
    ],
  },
  {
    title: "Tizim",
    items: [
      { href: "/admin/settings", label: "Sayt sozlamalari", icon: Settings },
      { href: "/admin/account", label: "Hisob va parol", icon: KeyRound },
    ],
  },
];

function isActive(pathname, { href, exact }) {
  return exact ? pathname === href : pathname === href || pathname.startsWith(`${href}/`);
}

function Sidebar({ user, badges, onNavigate }) {
  const pathname = usePathname();

  return (
    <div className="flex h-full flex-col bg-brand-950 text-brand-100">
      <div className="flex h-18 items-center px-6">
        <Link href="/admin" onClick={onNavigate}>
          <Logo inverted />
        </Link>
      </div>

      <nav className="flex-1 space-y-6 overflow-y-auto px-3 py-4" aria-label="Admin menyu">
        {NAV_GROUPS.map((group, index) => (
          <div key={group.title ?? index}>
            {group.title && (
              <p className="mb-2 px-3 text-xs font-bold tracking-widest text-brand-300/70 uppercase">{group.title}</p>
            )}
            <ul className="space-y-1">
              {group.items.map((item) => {
                const active = isActive(pathname, item);
                const badge = item.badgeKey ? badges[item.badgeKey] : 0;
                return (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      onClick={onNavigate}
                      aria-current={active ? "page" : undefined}
                      className={`flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-semibold transition ${
                        active ? "bg-white/10 text-white" : "hover:bg-white/5 hover:text-white"
                      }`}
                    >
                      <item.icon className={`size-5 ${active ? "text-teal-300" : "text-brand-300"}`} aria-hidden="true" />
                      <span className="flex-1">{item.label}</span>
                      {badge > 0 && (
                        <span className="rounded-full bg-teal-400 px-2 py-0.5 text-xs font-bold text-brand-950">{badge}</span>
                      )}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>
        ))}
      </nav>

      <div className="space-y-1 border-t border-white/10 p-3">
        <a
          href="/"
          target="_blank"
          className="flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-semibold transition hover:bg-white/5 hover:text-white"
        >
          <ExternalLink className="size-5 text-brand-300" aria-hidden="true" />
          Saytni koʻrish
        </a>
        <form action={logout}>
          <button
            type="submit"
            className="flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-semibold transition hover:bg-white/5 hover:text-white"
          >
            <LogOut className="size-5 text-brand-300" aria-hidden="true" />
            Chiqish
          </button>
        </form>
        <p className="truncate px-3 pt-2 text-xs text-brand-300">
          {user.name} · {user.username}
        </p>
      </div>
    </div>
  );
}

export default function AdminShell({ user, badges, children }) {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const closeDrawer = () => setDrawerOpen(false);

  return (
    <div className="min-h-dvh lg:pl-72">
      <aside className="fixed inset-y-0 left-0 hidden w-72 lg:block">
        <Sidebar user={user} badges={badges} />
      </aside>

      {drawerOpen && (
        <div className="fixed inset-0 z-50 lg:hidden" role="dialog" aria-modal="true" aria-label="Admin menyu">
          <button type="button" className="absolute inset-0 bg-slate-900/60" onClick={closeDrawer} aria-label="Menyuni yopish" />
          <div className="relative h-full w-72 max-w-[85vw] shadow-2xl">
            <Sidebar user={user} badges={badges} onNavigate={closeDrawer} />
          </div>
        </div>
      )}

      <header className="sticky top-0 z-40 flex h-16 items-center justify-between border-b border-slate-200 bg-white/90 px-4 backdrop-blur lg:hidden">
        <Link href="/admin">
          <Logo />
        </Link>
        <button
          type="button"
          onClick={() => setDrawerOpen((open) => !open)}
          className="grid size-11 place-items-center rounded-xl text-slate-700 hover:bg-slate-100"
          aria-label={drawerOpen ? "Menyuni yopish" : "Menyuni ochish"}
          aria-expanded={drawerOpen}
        >
          {drawerOpen ? <X className="size-6" /> : <Menu className="size-6" />}
        </button>
      </header>

      <main className="mx-auto max-w-6xl px-4 py-8 sm:px-6 lg:px-10 lg:py-10">{children}</main>
    </div>
  );
}
