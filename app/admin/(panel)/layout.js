import { count, eq } from "drizzle-orm";
import AdminShell from "@/components/admin/AdminShell";
import { requireAdmin } from "@/lib/auth/session";
import { db, messages } from "@/lib/db";

export default async function AdminPanelLayout({ children }) {
  const user = await requireAdmin();
  const [{ newMessages }] = await db
    .select({ newMessages: count() })
    .from(messages)
    .where(eq(messages.status, "new"));

  return (
    <AdminShell user={user} badges={{ newMessages }}>
      {children}
    </AdminShell>
  );
}
