import "server-only";
import { inArray, sql } from "drizzle-orm";
import { db, settings } from "@/lib/db";

// Telegram sozlamalari `settings` jadvalida saqlanadi (admin → Telegram sahifasi).
// Env o'zgaruvchilar (TELEGRAM_BOT_TOKEN, TELEGRAM_CHAT_ID) zaxira sifatida ishlaydi.
const KEYS = {
  token: "telegram_bot_token",
  chatIds: "telegram_chat_ids",
  enabled: "telegram_enabled",
};

const TOKEN_RE = /^\d{6,12}:[\w-]{30,60}$/;
const CHAT_ID_RE = /^(-?\d{5,20}|@\w{5,32})$/;
const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "";
// Sinov uchun (masalan, lokal soxta server) almashtirish mumkin.
const API_URL = process.env.TELEGRAM_API_URL || "https://api.telegram.org";

export const isValidBotToken = (token) => TOKEN_RE.test(token);

/** Vergul, bo'sh joy yoki yangi qator bilan ajratilgan chat ID'larni ajratib oladi. */
export function parseChatIds(text) {
  const items = String(text ?? "")
    .split(/[\s,;]+/)
    .map((item) => item.trim())
    .filter(Boolean);
  return {
    valid: [...new Set(items.filter((item) => CHAT_ID_RE.test(item)))],
    invalid: items.filter((item) => !CHAT_ID_RE.test(item)),
  };
}

export async function getTelegramConfig() {
  const rows = await db.select().from(settings).where(inArray(settings.key, Object.values(KEYS)));
  const stored = Object.fromEntries(rows.map((row) => [row.key, row.value]));

  const token = stored[KEYS.token] || process.env.TELEGRAM_BOT_TOKEN || "";
  const chatIds = parseChatIds(stored[KEYS.chatIds] ?? process.env.TELEGRAM_CHAT_ID).valid;
  const enabled = (stored[KEYS.enabled] ?? "1") === "1";

  return { token, chatIds, enabled, isReady: Boolean(enabled && token && chatIds.length) };
}

export async function saveTelegramConfig({ token, chatIds, enabled }) {
  const values = [
    { key: KEYS.chatIds, value: chatIds.join("\n") },
    { key: KEYS.enabled, value: enabled ? "1" : "0" },
  ];
  if (token !== undefined) values.push({ key: KEYS.token, value: token });

  await db
    .insert(settings)
    .values(values)
    .onConflictDoUpdate({ target: settings.key, set: { value: sql`excluded.value` } });
}

/** Telegram Bot API chaqiruvi. Xatolarni otmaydi — `{ ok, result, error }` qaytaradi. */
async function callTelegram(token, method, payload) {
  try {
    const response = await fetch(`${API_URL}/bot${token}/${method}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload ?? {}),
      signal: AbortSignal.timeout(8000),
    });
    const data = await response.json();
    return data.ok ? { ok: true, result: data.result } : { ok: false, error: data.description || `HTTP ${response.status}` };
  } catch (error) {
    return { ok: false, error: error.name === "TimeoutError" ? "Telegram javob bermadi (timeout)" : error.message };
  }
}

export async function getBotInfo(token) {
  const response = await callTelegram(token, "getMe");
  return response.ok ? { ok: true, username: response.result.username, name: response.result.first_name } : response;
}

/**
 * Botga yaqinda yozgan (yoki bot qo'shilgan guruh/kanal) chatlar ro'yxati.
 * Telegram faqat oxirgi 24 soatdagi yangilanishlarni saqlaydi.
 */
export async function findRecentChats(token) {
  const response = await callTelegram(token, "getUpdates", { limit: 100 });
  if (!response.ok) return response;

  const chats = new Map();
  for (const update of response.result) {
    const chat = (update.message ?? update.channel_post ?? update.my_chat_member ?? update.edited_message)?.chat;
    if (!chat) continue;
    const name = chat.title || [chat.first_name, chat.last_name].filter(Boolean).join(" ") || chat.username;
    chats.set(String(chat.id), { id: String(chat.id), name, username: chat.username ?? null, type: chat.type });
  }
  return { ok: true, chats: [...chats.values()] };
}

const escapeHtml = (text) =>
  String(text).replaceAll("&", "&amp;").replaceAll("<", "&lt;").replaceAll(">", "&gt;");

/** Barcha qabul qiluvchilarga yuboradi. @returns {Promise<Array<{ chatId, ok, error? }>>} */
export async function sendTelegramMessage(config, html, { buttons } = {}) {
  const replyMarkup = buttons?.length ? { inline_keyboard: buttons.map((button) => [button]) } : undefined;

  return Promise.all(
    config.chatIds.map(async (chatId) => {
      const response = await callTelegram(config.token, "sendMessage", {
        chat_id: chatId,
        text: html,
        parse_mode: "HTML",
        link_preview_options: { is_disabled: true },
        reply_markup: replyMarkup,
      });
      return { chatId, ok: response.ok, error: response.error };
    }),
  );
}

/** Telegram tugmalari faqat ommaviy https manzillarni qabul qiladi (localhost emas). */
function adminButtons(path) {
  return SITE_URL.startsWith("https://") ? [{ text: "Admin panelda ochish", url: `${SITE_URL}${path}` }] : [];
}

/** Yangi murojaat haqida xabar. Telegram sozlanmagan bo'lsa, jimgina o'tkazib yuboriladi. */
export async function notifyNewMessage(message) {
  const config = await getTelegramConfig();
  if (!config.isReady) return;

  const lines = [
    `📩 <b>Yangi murojaat #${message.id}</b>`,
    "",
    `<b>Mavzu:</b> ${escapeHtml(message.subject)}`,
    `<b>Ism:</b> ${escapeHtml(message.name)}`,
    `<b>Email:</b> ${escapeHtml(message.email)}`,
    message.phone && `<b>Telefon:</b> ${escapeHtml(message.phone)}`,
    "",
    `<blockquote>${escapeHtml(message.body.slice(0, 3000))}</blockquote>`,
  ].filter((line) => typeof line === "string");

  const results = await sendTelegramMessage(config, lines.join("\n"), { buttons: adminButtons("/admin/messages") });
  for (const result of results.filter((item) => !item.ok)) {
    console.error(`Telegram xabari yuborilmadi (chat ${result.chatId}):`, result.error);
  }
}

export function sendTestMessage(config) {
  const html = [
    "✅ <b>Sinov xabari</b>",
    "",
    "Axborot tizimlari va texnologiyalari kafedrasi saytidagi murojaatlar shu chatga yuboriladi.",
  ].join("\n");
  return sendTelegramMessage(config, html, { buttons: adminButtons("/admin/telegram") });
}
