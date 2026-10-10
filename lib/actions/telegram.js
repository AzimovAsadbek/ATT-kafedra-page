"use server";

import { revalidatePath } from "next/cache";
import { requireAdmin } from "@/lib/auth/session";
import {
  findRecentChats,
  getBotInfo,
  getTelegramConfig,
  isValidBotToken,
  parseChatIds,
  saveTelegramConfig,
  sendTestMessage,
} from "@/lib/telegram";

export async function saveTelegramSettings(_prevState, formData) {
  await requireAdmin();

  const newToken = String(formData.get("token") ?? "").trim();
  const removeToken = formData.get("removeToken") === "on";
  const chatIdsText = String(formData.get("chatIds") ?? "");
  const enabled = formData.get("enabled") === "on";
  const errors = {};

  const { valid: chatIds, invalid } = parseChatIds(chatIdsText);
  if (invalid.length) errors.chatIds = `Notoʻgʻri chat ID: ${invalid.join(", ")}`;

  let token;
  if (removeToken) {
    token = "";
  } else if (newToken) {
    if (!isValidBotToken(newToken)) {
      errors.token = "Token formati notoʻgʻri. U @BotFather bergan “123456789:AA…” koʻrinishida boʻladi";
    } else {
      const bot = await getBotInfo(newToken);
      if (!bot.ok) errors.token = `Telegram tokenni qabul qilmadi: ${bot.error}`;
      else token = newToken;
    }
  }

  if (Object.keys(errors).length) return { status: "error", errors, values: { chatIds: chatIdsText, enabled } };

  await saveTelegramConfig({ token, chatIds, enabled });
  revalidatePath("/admin", "layout");
  return { status: "success", message: "Telegram sozlamalari saqlandi" };
}

export async function detectTelegramChats() {
  await requireAdmin();
  const config = await getTelegramConfig();
  if (!config.token) return { status: "error", message: "Avval bot tokenini saqlang" };

  const response = await findRecentChats(config.token);
  if (!response.ok) return { status: "error", message: `Telegram xatosi: ${response.error}` };
  if (!response.chats.length) {
    return {
      status: "error",
      message: "Hech qanday chat topilmadi. Botga Telegram'da /start yozing (yoki botni guruhga qoʻshing) va qayta urining.",
    };
  }
  return { status: "success", chats: response.chats };
}

export async function sendTelegramTest() {
  await requireAdmin();
  const config = await getTelegramConfig();
  if (!config.token) return { status: "error", message: "Bot tokeni saqlanmagan" };
  if (!config.chatIds.length) return { status: "error", message: "Qabul qiluvchi chat ID kiritilmagan" };

  const results = await sendTestMessage(config);
  const failed = results.filter((result) => !result.ok);
  return failed.length
    ? {
        status: "error",
        message: failed.map((result) => `${result.chatId}: ${result.error}`).join("; "),
      }
    : { status: "success", message: `Sinov xabari ${results.length} ta chatga yuborildi` };
}
