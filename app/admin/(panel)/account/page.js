import PageHeader from "@/components/admin/PageHeader";
import PasswordForm from "@/components/admin/PasswordForm";
import { requireAdmin } from "@/lib/auth/session";

export const metadata = { title: "Hisob va parol" };

export default async function AccountPage() {
  const user = await requireAdmin();

  return (
    <>
      <PageHeader title="Hisob va parol" description={`${user.name} (${user.username})`} />
      <section className="max-w-xl rounded-3xl bg-white p-6 shadow-sm ring-1 ring-slate-200 sm:p-8">
        <h2 className="mb-6 text-lg font-bold">Parolni almashtirish</h2>
        <PasswordForm />
      </section>
    </>
  );
}
