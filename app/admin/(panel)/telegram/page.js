import PageHeader from "@/components/admin/PageHeader";
import TelegramSettings from "@/components/admin/TelegramSettings";
import { requireAdmin } from "@/lib/auth/session";
import { getBotInfo, getTelegramConfig } from "@/lib/telegram";

export const metadata = { title: "Telegram xabarnomalari" };

export default async function TelegramPage() {
  await requireAdmin();
  const config = await getTelegramConfig();
  const bot = config.token ? await getBotInfo(config.token) : null;

  return (
    <>
      <PageHeader
        title="Telegram xabarnomalari"
        description="Saytdagi “Onlayn murojaat” formasi orqali kelgan xabarlar Telegram'ga yuboriladi"
      />
      <TelegramSettings
        // Token klientga yuborilmaydi — faqat oxirgi 4 belgisi koʻrsatiladi.
        tokenHint={config.token ? `••••${config.token.slice(-4)}` : null}
        chatIds={config.chatIds.join("\n")}
        enabled={config.enabled}
        bot={bot?.ok ? { username: bot.username, name: bot.name } : null}
        botError={bot && !bot.ok ? bot.error : null}
      />
    </>
  );
}
