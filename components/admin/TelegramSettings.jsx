"use client";

import { CircleCheck, CircleDashed, Plus, Search, Send } from "lucide-react";
import { useActionState, useState } from "react";
import Alert from "@/components/ui/Alert";
import Field, { inputClass } from "@/components/ui/Field";
import SubmitButton from "@/components/ui/SubmitButton";
import { detectTelegramChats, saveTelegramSettings, sendTelegramTest } from "@/lib/actions/telegram";
import { useSubmitGuard } from "@/lib/hooks/use-submit-guard";

const CHAT_TYPES = { private: "Shaxsiy chat", group: "Guruh", supergroup: "Guruh", channel: "Kanal" };

function StatusCard({ bot, botError, chatCount, enabled }) {
  const ready = bot && chatCount > 0 && enabled;
  const Icon = ready ? CircleCheck : CircleDashed;
  return (
    <section
      className={`flex items-start gap-4 rounded-3xl p-6 shadow-sm ring-1 ${
        ready ? "bg-emerald-50 ring-emerald-200" : "bg-white ring-slate-200"
      }`}
    >
      <Icon className={`mt-0.5 size-6 shrink-0 ${ready ? "text-emerald-600" : "text-slate-400"}`} aria-hidden="true" />
      <div className="space-y-1 text-sm">
        <p className="text-base font-bold text-slate-900">
          {ready ? "Telegram ulangan — yangi murojaatlar yuboriladi" : "Telegram hali toʻliq sozlanmagan"}
        </p>
        <p className="text-slate-600">
          Bot:{" "}
          {bot ? (
            <a href={`https://t.me/${bot.username}`} target="_blank" rel="noopener noreferrer" className="font-semibold text-brand-700 underline">
              @{bot.username}
            </a>
          ) : (
            <span className="font-semibold">{botError ? `xato — ${botError}` : "token kiritilmagan"}</span>
          )}
          {" · "}Qabul qiluvchilar: <span className="font-semibold">{chatCount}</span>
          {" · "}Holati: <span className="font-semibold">{enabled ? "yoqilgan" : "oʻchirilgan"}</span>
        </p>
      </div>
    </section>
  );
}

function Steps({ bot }) {
  const steps = [
    <>
      Telegramʼda{" "}
      <a href="https://t.me/BotFather" target="_blank" rel="noopener noreferrer" className="font-semibold text-brand-700 underline">
        @BotFather
      </a>{" "}
      ga <code className="rounded bg-slate-100 px-1">/newbot</code> yozing va bot yarating. U bergan tokenni quyida kiritib saqlang.
    </>,
    <>
      Xabar qabul qiladigan har bir kishi {bot ? <b>@{bot.username}</b> : "botingiz"} ga <code className="rounded bg-slate-100 px-1">/start</code>{" "}
      yozsin. Guruhga yuborish uchun botni guruhga qoʻshing.
    </>,
    <>
      <b>“Chatlarni aniqlash”</b> tugmasini bosing va kerakli chatlarni roʻyxatga qoʻshib, saqlang.
    </>,
    <>
      <b>“Sinov xabari”</b> bilan tekshiring. Shundan soʻng saytdagi har bir murojaat avtomatik Telegramʼga keladi.
    </>,
  ];
  return (
    <section className="rounded-3xl bg-white p-6 shadow-sm ring-1 ring-slate-200 sm:p-8">
      <h2 className="text-lg font-bold">Qanday ulanadi?</h2>
      <ol className="mt-4 space-y-3 text-sm text-slate-700">
        {steps.map((step, index) => (
          <li key={index} className="flex gap-3">
            <span className="grid size-6 shrink-0 place-items-center rounded-full bg-brand-900 text-xs font-bold text-white">
              {index + 1}
            </span>
            <span className="pt-0.5">{step}</span>
          </li>
        ))}
      </ol>
    </section>
  );
}

export default function TelegramSettings({ tokenHint, chatIds: initialChatIds, enabled, bot, botError }) {
  const [saveState, saveAction] = useActionState(saveTelegramSettings, {});
  const guardSave = useSubmitGuard(saveState);
  const [detectState, detectAction] = useActionState(detectTelegramChats, {});
  const [testState, testAction] = useActionState(sendTelegramTest, {});
  const [chatIds, setChatIds] = useState(initialChatIds);

  const chatIdList = chatIds.split(/[\s,;]+/).filter(Boolean);
  const addChat = (id) => setChatIds((current) => [...current.split(/[\s,;]+/).filter(Boolean), id].join("\n"));
  const errors = saveState.errors ?? {};

  return (
    <div className="space-y-6">
      <StatusCard bot={bot} botError={botError} chatCount={initialChatIds.split(/\s+/).filter(Boolean).length} enabled={enabled} />
      <Steps bot={bot} />

      <form action={saveAction} onSubmit={guardSave} className="space-y-6 rounded-3xl bg-white p-6 shadow-sm ring-1 ring-slate-200 sm:p-8" noValidate>
        <h2 className="text-lg font-bold">Sozlamalar</h2>
        {saveState.status === "success" && <Alert>{saveState.message}</Alert>}
        {saveState.status === "error" && <Alert variant="error">Formada xatolar bor. Belgilangan maydonlarni tekshiring.</Alert>}

        <Field
          id="telegram-token"
          label="Bot tokeni"
          error={errors.token}
          hint={tokenHint ? `Saqlangan token: ${tokenHint}. Almashtirish uchun yangisini kiriting.` : "@BotFather bergan token"}
        >
          {({ describedBy, invalid }) => (
            <input
              id="telegram-token"
              name="token"
              type="password"
              autoComplete="off"
              placeholder={tokenHint ? "Oʻzgartirmaslik uchun boʻsh qoldiring" : "123456789:AA…"}
              aria-describedby={describedBy}
              aria-invalid={invalid || undefined}
              className={inputClass}
            />
          )}
        </Field>
        {tokenHint && (
          <label className="flex items-center gap-2 text-sm text-slate-600">
            <input type="checkbox" name="removeToken" className="size-4 accent-red-600" />
            Saqlangan tokenni oʻchirish
          </label>
        )}

        <Field
          id="telegram-chats"
          label="Qabul qiluvchi chat ID'lar"
          error={errors.chatIds}
          hint="Har bir qatorga bittadan. Shaxsiy chat — musbat son, guruh — manfiy son, kanal — @kanal_nomi"
        >
          {({ describedBy, invalid }) => (
            <textarea
              id="telegram-chats"
              name="chatIds"
              rows={4}
              value={chatIds}
              onChange={(event) => setChatIds(event.target.value)}
              aria-describedby={describedBy}
              aria-invalid={invalid || undefined}
              className={`${inputClass} font-mono text-sm`}
            />
          )}
        </Field>

        <label className="flex cursor-pointer items-center gap-3 rounded-xl bg-slate-50 p-4 ring-1 ring-slate-200">
          <input
            type="checkbox"
            name="enabled"
            defaultChecked={saveState.values?.enabled ?? enabled}
            className="size-5 accent-brand-700"
          />
          <span className="text-sm font-semibold text-slate-800">Yangi murojaatlarni Telegramʼga yuborish</span>
        </label>

        <SubmitButton>Saqlash</SubmitButton>
      </form>

      <section className="space-y-4 rounded-3xl bg-white p-6 shadow-sm ring-1 ring-slate-200 sm:p-8">
        <h2 className="text-lg font-bold">Chatlarni aniqlash va sinash</h2>
        <p className="text-sm text-slate-600">
          Botga oxirgi 24 soatda yozgan chatlar koʻrsatiladi. Kerakligini roʻyxatga qoʻshing va yuqorida <b>Saqlash</b>ni bosing.
        </p>

        <div className="flex flex-wrap gap-3">
          <form action={detectAction}>
            <SubmitButton pendingText="Qidirilmoqda…" variant="secondary">
              <Search className="size-4" aria-hidden="true" />
              Chatlarni aniqlash
            </SubmitButton>
          </form>
          <form action={testAction}>
            <SubmitButton pendingText="Yuborilmoqda…">
              <Send className="size-4" aria-hidden="true" />
              Sinov xabari
            </SubmitButton>
          </form>
        </div>

        {detectState.status === "error" && <Alert variant="error">{detectState.message}</Alert>}
        {testState.status && <Alert variant={testState.status === "success" ? "success" : "error"}>{testState.message}</Alert>}

        {detectState.chats?.length > 0 && (
          <ul className="divide-y divide-slate-100 rounded-xl ring-1 ring-slate-200">
            {detectState.chats.map((chat) => {
              const added = chatIdList.includes(chat.id);
              return (
                <li key={chat.id} className="flex flex-wrap items-center justify-between gap-3 px-4 py-3 text-sm">
                  <div>
                    <p className="font-semibold text-slate-900">
                      {chat.name}
                      {chat.username && <span className="font-normal text-slate-500"> @{chat.username}</span>}
                    </p>
                    <p className="font-mono text-xs text-slate-500">
                      {chat.id} · {CHAT_TYPES[chat.type] ?? chat.type}
                    </p>
                  </div>
                  <button
                    type="button"
                    disabled={added}
                    onClick={() => addChat(chat.id)}
                    className="inline-flex items-center gap-1.5 rounded-lg px-3 py-1.5 font-semibold text-brand-700 ring-1 ring-brand-200 hover:bg-brand-50 disabled:text-emerald-700 disabled:ring-emerald-200"
                  >
                    {added ? <CircleCheck className="size-4" aria-hidden="true" /> : <Plus className="size-4" aria-hidden="true" />}
                    {added ? "Qoʻshilgan" : "Qoʻshish"}
                  </button>
                </li>
              );
            })}
          </ul>
        )}
      </section>
    </div>
  );
}
