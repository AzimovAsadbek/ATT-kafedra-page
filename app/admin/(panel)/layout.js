import { count, eq } from "drizzle-orm";
import AdminShell from "@/components/admin/AdminShell";
import { requireAdmin } from "@/lib/auth/session";
import { db, messages } from "@/lib/db";
import { getTelegramConfig } from "@/lib/telegram";

export default async function AdminPanelLayout({ children }) {
  const user = await requireAdmin();
  const [[{ newMessages }], telegram] = await Promise.all([
    db.select({ newMessages: count() }).from(messages).where(eq(messages.status, "new")),
    getTelegramConfig(),
  ]);

  return (
    <AdminShell user={user} badges={{ newMessages, telegramSetup: telegram.isReady ? null : "!" }}>
      {children}
    </AdminShell>
  );
}
