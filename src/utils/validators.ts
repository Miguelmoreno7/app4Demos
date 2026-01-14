import type { AppState, Message, Profile } from "./storage";

type ValidationResult =
  | { ok: true; data: AppState }
  | { ok: false; error: string };

const isNonEmptyString = (value: unknown): value is string =>
  typeof value === "string" && value.trim().length > 0;

const isMessage = (value: unknown): value is Message => {
  if (!value || typeof value !== "object") return false;
  const record = value as { from?: unknown; text?: unknown };
  return (
    (record.from === "user" || record.from === "agent") &&
    typeof record.text === "string"
  );
};

export const validateImportData = (value: unknown): ValidationResult => {
  if (!value || typeof value !== "object") {
    return { ok: false, error: "El JSON debe ser un objeto raíz." };
  }

  const record = value as { profile?: unknown; messages?: unknown };

  if (!record.profile || typeof record.profile !== "object") {
    return { ok: false, error: "Falta el objeto profile." };
  }

  const profile = record.profile as Profile;
  if (!isNonEmptyString(profile.name)) {
    return { ok: false, error: "profile.name debe ser un texto no vacío." };
  }

  if (typeof profile.avatarUrl !== "string") {
    return { ok: false, error: "profile.avatarUrl debe ser texto (puede ser vacío)." };
  }

  if (!Array.isArray(record.messages)) {
    return { ok: false, error: "messages debe ser un arreglo." };
  }

  const invalidIndex = record.messages.findIndex((item) => !isMessage(item));
  if (invalidIndex >= 0) {
    return {
      ok: false,
      error: `Mensaje inválido en la posición ${invalidIndex + 1}.`,
    };
  }

  return {
    ok: true,
    data: {
      profile: {
        name: profile.name.trim(),
        avatarUrl: profile.avatarUrl.trim(),
      },
      messages: record.messages.map((item) => ({
        from: item.from,
        text: item.text.trim(),
      })),
    },
  };
};
