export type FeedbackPayload = {
  name: string;
  phone: string;
  details: string;
};

export type FeedbackValidationResult =
  | { ok: true; data: FeedbackPayload }
  | { ok: false; error: string };

function asString(value: unknown): string {
  return typeof value === "string" ? value.trim() : "";
}

function hasConsent(value: unknown): boolean {
  return value === true || value === "yes" || value === "on";
}

export function validateFeedback(body: unknown): FeedbackValidationResult {
  if (!body || typeof body !== "object") {
    return { ok: false, error: "Некорректные данные формы." };
  }

  const raw = body as Record<string, unknown>;

  if (asString(raw.website)) {
    return { ok: false, error: "Некорректные данные формы." };
  }

  const name = asString(raw.name);
  const phone = asString(raw.phone);
  const details = asString(raw.details);
  const phoneDigits = phone.replace(/\D/g, "");

  if (!name || name.length < 2) {
    return { ok: false, error: "Напишите, как к вам обращаться." };
  }
  if (name.length > 120) {
    return { ok: false, error: "Имя слишком длинное." };
  }
  if (!/^[\p{L}\s'’.-]+$/u.test(name)) {
    return { ok: false, error: "В имени только буквы, без цифр." };
  }
  if (!phone) {
    return { ok: false, error: "Укажите телефон." };
  }
  if (!/^[\d+()\-\s]+$/.test(phone) || phoneDigits.length < 10 || phoneDigits.length > 15) {
    return { ok: false, error: "Укажите телефон цифрами, без букв." };
  }
  if (!details || details.length < 5) {
    return { ok: false, error: "Напишите пару слов о ситуации." };
  }
  if (details.length > 4000) {
    return { ok: false, error: "Текст заявки слишком длинный." };
  }
  if (!hasConsent(raw.consent)) {
    return { ok: false, error: "Нужно согласие на обработку персональных данных." };
  }

  return {
    ok: true,
    data: { name, phone, details },
  };
}

export function formatFeedbackMessage(data: FeedbackPayload): string {
  const when = new Intl.DateTimeFormat("ru-RU", {
    dateStyle: "short",
    timeStyle: "short",
    timeZone: "Europe/Moscow",
  }).format(new Date());

  return [
    "📩 НОВАЯ ЗАЯВКА",
    "",
    `👤 Имя: ${data.name}`,
    `📱 Телефон: ${data.phone}`,
    "",
    "💬 Комментарий:",
    data.details,
    "",
    `⏰ Время: ${when}`,
  ].join("\n");
}
