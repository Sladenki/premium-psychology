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

  if (!name || name.length < 2) {
    return { ok: false, error: "Укажите имя." };
  }
  if (name.length > 120) {
    return { ok: false, error: "Имя слишком длинное." };
  }
  if (!phone || phone.length < 5) {
    return { ok: false, error: "Укажите телефон." };
  }
  if (phone.length > 40) {
    return { ok: false, error: "Телефон слишком длинный." };
  }
  if (!details || details.length < 5) {
    return { ok: false, error: "Напишите короткий комментарий." };
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
