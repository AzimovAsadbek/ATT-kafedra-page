import { count, desc, eq } from "drizzle-orm";
import { Archive, ChevronLeft, ChevronRight, Mail, MailOpen, Phone, Reply, Trash2 } from "lucide-react";
import Link from "next/link";
import ActionButton from "@/components/admin/ActionButton";
import PageHeader from "@/components/admin/PageHeader";
import { deleteMessage, setMessageStatus } from "@/lib/actions/messages";
import { requireAdmin } from "@/lib/auth/session";
import { db, messages } from "@/lib/db";
import { formatDateTime } from "@/lib/format";

export const metadata = { title: "Murojaatlar" };

const PAGE_SIZE = 20;
const TABS = [
  { value: "new", label: "Yangi" },
  { value: "read", label: "Oʻqilgan" },
  { value: "archived", label: "Arxiv" },
  { value: "all", label: "Barchasi" },
];

function buildHref(status, page) {
  const query = new URLSearchParams({ status });
  if (page > 1) query.set("page", String(page));
  return `/admin/messages?${query}`;
}

export default async function MessagesPage({ searchParams }) {
  await requireAdmin();
  const params = await searchParams;
  const status = TABS.some((tab) => tab.value === params.status) ? params.status : "new";
  const page = Math.max(1, Number.parseInt(params.page, 10) || 1);
  const where = status === "all" ? undefined : eq(messages.status, status);

  const [rows, [{ total }]] = await Promise.all([
    db
      .select()
      .from(messages)
      .where(where)
      .orderBy(desc(messages.createdAt), desc(messages.id))
      .limit(PAGE_SIZE)
      .offset((page - 1) * PAGE_SIZE),
    db.select({ total: count() }).from(messages).where(where),
  ]);
  const pageCount = Math.max(1, Math.ceil(total / PAGE_SIZE));

  return (
    <>
      <PageHeader title="Murojaatlar" description="Saytdagi “Onlayn murojaat” formasi orqali kelgan xabarlar" />

      <nav className="mb-6 flex gap-2 overflow-x-auto pb-1" aria-label="Holat boʻyicha saralash">
        {TABS.map((tab) => (
          <Link
            key={tab.value}
            href={buildHref(tab.value, 1)}
            aria-current={tab.value === status ? "page" : undefined}
            className={`shrink-0 rounded-full px-4 py-2 text-sm font-semibold transition ${
              tab.value === status
                ? "bg-brand-900 text-white"
                : "bg-white text-slate-600 ring-1 ring-slate-200 hover:text-brand-800"
            }`}
          >
            {tab.label}
          </Link>
        ))}
      </nav>

      {rows.length === 0 ? (
        <p className="rounded-3xl bg-white px-6 py-16 text-center text-slate-500 shadow-sm ring-1 ring-slate-200">
          Bu boʻlimda murojaatlar yoʻq
        </p>
      ) : (
        <ul className="space-y-4">
          {rows.map((message) => (
            <li
              key={message.id}
              className={`rounded-3xl bg-white p-6 shadow-sm ring-1 ${message.status === "new" ? "ring-teal-300" : "ring-slate-200"}`}
            >
              <div className="flex flex-wrap items-start justify-between gap-3">
                <div className="min-w-0">
                  <div className="flex flex-wrap items-center gap-2">
                    {message.status === "new" && (
                      <span className="rounded-full bg-teal-50 px-2.5 py-0.5 text-xs font-bold text-teal-700">Yangi</span>
                    )}
                    {message.status === "archived" && (
                      <span className="rounded-full bg-slate-100 px-2.5 py-0.5 text-xs font-bold text-slate-500">Arxiv</span>
                    )}
                    <h2 className="font-bold break-words text-slate-900">{message.subject}</h2>
                  </div>
                  <p className="mt-1 flex flex-wrap gap-x-4 gap-y-1 text-sm text-slate-500">
                    <span className="font-semibold text-slate-700">{message.name}</span>
                    <a href={`mailto:${message.email}`} className="inline-flex items-center gap-1 hover:text-brand-700">
                      <Mail className="size-3.5" aria-hidden="true" />
                      {message.email}
                    </a>
                    {message.phone && (
                      <a href={`tel:${message.phone.replace(/[^\d+]/g, "")}`} className="inline-flex items-center gap-1 hover:text-brand-700">
                        <Phone className="size-3.5" aria-hidden="true" />
                        {message.phone}
                      </a>
                    )}
                  </p>
                </div>
                <time className="text-xs text-slate-400" dateTime={message.createdAt.toISOString()}>
                  {formatDateTime(message.createdAt)}
                </time>
              </div>

              <p className="mt-4 text-sm leading-relaxed break-words whitespace-pre-line text-slate-700">{message.body}</p>

              <div className="mt-5 flex flex-wrap items-center gap-1 border-t border-slate-100 pt-4">
                <a
                  href={`mailto:${message.email}?subject=${encodeURIComponent(`Re: ${message.subject}`)}`}
                  className="inline-flex items-center gap-1.5 rounded-lg px-2.5 py-2 text-sm font-semibold text-brand-700 hover:bg-brand-50"
                >
                  <Reply className="size-4" aria-hidden="true" />
                  Javob yozish
                </a>
                {message.status === "new" ? (
                  <ActionButton action={setMessageStatus.bind(null, message.id, "read")} label="Oʻqilgan deb belgilash">
                    <MailOpen className="size-4" aria-hidden="true" />
                    Oʻqildi
                  </ActionButton>
                ) : (
                  <ActionButton action={setMessageStatus.bind(null, message.id, "new")} label="Yangi deb belgilash">
                    <Mail className="size-4" aria-hidden="true" />
                    Yangi
                  </ActionButton>
                )}
                {message.status !== "archived" && (
                  <ActionButton action={setMessageStatus.bind(null, message.id, "archived")} label="Arxivlash">
                    <Archive className="size-4" aria-hidden="true" />
                    Arxivlash
                  </ActionButton>
                )}
                <ActionButton
                  action={deleteMessage.bind(null, message.id)}
                  label="Oʻchirish"
                  variant="danger"
                  confirmMessage="Murojaat butunlay oʻchirilsinmi?"
                >
                  <Trash2 className="size-4" aria-hidden="true" />
                  Oʻchirish
                </ActionButton>
              </div>
            </li>
          ))}
        </ul>
      )}

      {pageCount > 1 && (
        <nav className="mt-8 flex items-center justify-between" aria-label="Sahifalar">
          {page > 1 ? (
            <Link href={buildHref(status, page - 1)} className="inline-flex items-center gap-1 rounded-xl px-4 py-2 font-semibold text-brand-700 hover:bg-brand-50">
              <ChevronLeft className="size-4" aria-hidden="true" /> Oldingi
            </Link>
          ) : (
            <span />
          )}
          <span className="text-sm text-slate-500">
            {page} / {pageCount}
          </span>
          {page < pageCount ? (
            <Link href={buildHref(status, page + 1)} className="inline-flex items-center gap-1 rounded-xl px-4 py-2 font-semibold text-brand-700 hover:bg-brand-50">
              Keyingi <ChevronRight className="size-4" aria-hidden="true" />
            </Link>
          ) : (
            <span />
          )}
        </nav>
      )}
    </>
  );
}
