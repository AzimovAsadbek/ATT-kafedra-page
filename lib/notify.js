import "server-only";

/**
 * Yangi murojaat haqida Telegram orqali xabar yuboradi.
 * TELEGRAM_BOT_TOKEN va TELEGRAM_CHAT_ID berilmagan bo'lsa, hech narsa qilmaydi.
 */
export async function notifyNewMessage(message) {
  const token = process.env.TELEGRAM_BOT_TOKEN;
  const chatId = process.env.TELEGRAM_CHAT_ID;
  if (!token || !chatId) return;

  const text = [
    "📩 Saytdan yangi murojaat",
    "",
    `Ism: ${message.name}`,
    `Email: ${message.email}`,
    message.phone && `Telefon: ${message.phone}`,
    `Mavzu: ${message.subject}`,
    "",
    message.body,
  ]
    .filter((line) => typeof line === "string")
    .join("\n");

  try {
    const response = await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ chat_id: chatId, text: text.slice(0, 4000) }),
      signal: AbortSignal.timeout(5000),
    });
    if (!response.ok) console.error("Telegram xabari yuborilmadi:", response.status);
  } catch (error) {
    console.error("Telegram xabari yuborilmadi:", error);
  }
}
