export type FeedbackPayload = {
  name: string;
  company: string;
  phone: string;
  telegram: string;
  details: string;
};

export type FeedbackValidationResult =
  | { ok: true; data: FeedbackPayload }
  | { ok: false; error: string };

function asString(value: unknown): string {
  return typeof value === "string" ? value.trim() : "";
}

export function validateFeedback(body: unknown): FeedbackValidationResult {
  if (!body || typeof body !== "object") {
    return { ok: false, error: "Некорректные данные формы." };
  }

  const raw = body as Record<string, unknown>;

  // Honeypot: bots fill this; humans leave it empty.
  if (asString(raw.website)) {
    return { ok: false, error: "Некорректные данные формы." };
  }

  const name = asString(raw.name);
  const company = asString(raw.company);
  const phone = asString(raw.phone);
  const telegram = asString(raw.telegram);
  const details = asString(raw.details);

  if (!name || name.length < 2) {
    return { ok: false, error: "Укажите имя." };
  }
  if (name.length > 120) {
    return { ok: false, error: "Имя слишком длинное." };
  }
  if (company.length > 160) {
    return { ok: false, error: "Название компании слишком длинное." };
  }
  if (!phone || phone.length < 5) {
    return { ok: false, error: "Укажите телефон." };
  }
  if (phone.length > 40) {
    return { ok: false, error: "Телефон слишком длинный." };
  }
  if (telegram.length > 80) {
    return { ok: false, error: "Telegram слишком длинный." };
  }
  if (!details || details.length < 5) {
    return { ok: false, error: "Опишите задачу подробнее." };
  }
  if (details.length > 4000) {
    return { ok: false, error: "Текст заявки слишком длинный." };
  }

  return {
    ok: true,
    data: { name, company, phone, telegram, details },
  };
}

export function formatFeedbackMessage(data: FeedbackPayload): string {
  const when = new Intl.DateTimeFormat("ru-RU", {
    dateStyle: "short",
    timeStyle: "short",
    timeZone: "Europe/Moscow",
  }).format(new Date());

  const lines = [
    "📩 НОВАЯ ЗАЯВКА",
    "",
    `👤 Имя: ${data.name}`,
    `📱 Телефон: ${data.phone}`,
  ];

  if (data.company) {
    lines.push(`🏢 Компания: ${data.company}`);
  }
  if (data.telegram) {
    lines.push(`✈️ Telegram: ${data.telegram}`);
  }

  lines.push("", "💬 Детали:", data.details, "", `⏰ Время: ${when}`);

  return lines.join("\n");
}
