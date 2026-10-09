import { count, desc, eq } from "drizzle-orm";
import { ArrowRight, GraduationCap, Inbox, MailOpen, Plus, Settings, Users } from "lucide-react";
import Link from "next/link";
import PageHeader from "@/components/admin/PageHeader";
import { requireAdmin } from "@/lib/auth/session";
import { db, messages, programs, staff } from "@/lib/db";
import { formatDateTime } from "@/lib/format";

export const metadata = { title: "Boshqaruv paneli" };

async function getDashboardData() {
  const totalOf = (table, where) =>
    db
      .select({ total: count() })
      .from(table)
      .where(where)
      .then(([row]) => row.total);

  const [staffTotal, programsTotal, newMessages, messagesTotal, recentMessages] = await Promise.all([
    totalOf(staff),
    totalOf(programs),
    totalOf(messages, eq(messages.status, "new")),
    totalOf(messages),
    db.select().from(messages).orderBy(desc(messages.createdAt), desc(messages.id)).limit(5),
  ]);

  return { staffTotal, programsTotal, newMessages, messagesTotal, recentMessages };
}

export default async function DashboardPage() {
  const user = await requireAdmin();
  const data = await getDashboardData();

  const stats = [
    { label: "Yangi murojaatlar", value: data.newMessages, icon: Inbox, href: "/admin/messages", accent: true },
    { label: "Jami murojaatlar", value: data.messagesTotal, icon: MailOpen, href: "/admin/messages?status=all" },
    { label: "Oʻqituvchilar", value: data.staffTotal, icon: Users, href: "/admin/staff" },
    { label: "Taʼlim yoʻnalishlari", value: data.programsTotal, icon: GraduationCap, href: "/admin/programs" },
  ];

  const quickActions = [
    { label: "Oʻqituvchi qoʻshish", href: "/admin/staff/new", icon: Plus },
    { label: "Yoʻnalish qoʻshish", href: "/admin/programs/new", icon: Plus },
    { label: "Sayt sozlamalari", href: "/admin/settings", icon: Settings },
  ];

  return (
    <>
      <PageHeader title={`Xush kelibsiz, ${user.name}!`} description="Sayt holati va soʻnggi murojaatlar" />

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {stats.map(({ label, value, icon: Icon, href, accent }) => (
          <Link
            key={label}
            href={href}
            className={`group rounded-3xl p-6 shadow-sm ring-1 transition hover:-translate-y-0.5 hover:shadow-md ${
              accent ? "bg-brand-900 text-white ring-brand-900" : "bg-white ring-slate-200"
            }`}
          >
            <Icon className={`size-6 ${accent ? "text-teal-300" : "text-brand-600"}`} aria-hidden="true" />
            <p className={`mt-4 font-display text-4xl font-extrabold ${accent ? "text-white" : "text-slate-900"}`}>
              {value}
            </p>
            <p className={`mt-1 text-sm font-medium ${accent ? "text-brand-100" : "text-slate-500"}`}>{label}</p>
          </Link>
        ))}
      </div>

      <div className="mt-8 grid gap-6 lg:grid-cols-3">
        <section className="rounded-3xl bg-white shadow-sm ring-1 ring-slate-200 lg:col-span-2">
          <div className="flex items-center justify-between border-b border-slate-100 px-6 py-4">
            <h2 className="font-bold">Soʻnggi murojaatlar</h2>
            <Link href="/admin/messages?status=all" className="inline-flex items-center gap-1 text-sm font-semibold text-brand-700 hover:text-brand-900">
              Barchasi <ArrowRight className="size-4" aria-hidden="true" />
            </Link>
          </div>
          {data.recentMessages.length > 0 ? (
            <ul className="divide-y divide-slate-100">
              {data.recentMessages.map((message) => (
                <li key={message.id} className="flex items-start gap-4 px-6 py-4">
                  <span
                    className={`mt-2 size-2 shrink-0 rounded-full ${message.status === "new" ? "bg-teal-500" : "bg-slate-200"}`}
                    aria-label={message.status === "new" ? "Yangi" : undefined}
                  />
                  <div className="min-w-0 flex-1">
                    <p className="truncate font-semibold text-slate-900">{message.subject}</p>
                    <p className="truncate text-sm text-slate-500">
                      {message.name} · {message.email}
                    </p>
                  </div>
                  <time className="shrink-0 text-xs text-slate-400" dateTime={message.createdAt.toISOString()}>
                    {formatDateTime(message.createdAt)}
                  </time>
                </li>
              ))}
            </ul>
          ) : (
            <p className="px-6 py-12 text-center text-slate-500">Hozircha murojaatlar yoʻq</p>
          )}
        </section>

        <section className="rounded-3xl bg-white p-6 shadow-sm ring-1 ring-slate-200">
          <h2 className="font-bold">Tezkor amallar</h2>
          <ul className="mt-4 space-y-2">
            {quickActions.map(({ label, href, icon: Icon }) => (
              <li key={href}>
                <Link
                  href={href}
                  className="flex items-center gap-3 rounded-xl px-4 py-3 font-semibold text-slate-700 ring-1 ring-slate-200 transition hover:bg-brand-50 hover:text-brand-800 hover:ring-brand-200"
                >
                  <Icon className="size-5 text-brand-600" aria-hidden="true" />
                  {label}
                </Link>
              </li>
            ))}
          </ul>
        </section>
      </div>
    </>
  );
}
