import PageHeader from "@/components/admin/PageHeader";
import SettingsForm from "@/components/admin/SettingsForm";
import { requireAdmin } from "@/lib/auth/session";
import { getSettings } from "@/lib/data/site";

export const metadata = { title: "Sayt sozlamalari" };

export default async function SettingsPage() {
  await requireAdmin();
  const settings = await getSettings();

  return (
    <>
      <PageHeader title="Sayt sozlamalari" description="Bosh ekran, boʻlim matnlari, aloqa maʼlumotlari va ijtimoiy tarmoqlar" />
      <SettingsForm settings={settings} />
    </>
  );
}
