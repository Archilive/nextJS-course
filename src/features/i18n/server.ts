import { cookies } from "next/headers";
import en from "./dictionaries/en.json";
import fr from "./dictionaries/fr.json";

export const LOCALE_COOKIE = "NEXT_LOCALE";
export const locales = ["fr", "en"] as const;

export type Locale = (typeof locales)[number];
export type Dictionary = typeof fr;

const dictionaries: Record<Locale, Dictionary> = {
  fr,
  en,
};

export function normalizeLocale(value: string | null | undefined): Locale | null {
  return value === "en" || value === "fr" ? value : null;
}

export function getDictionary(locale: Locale) {
  return dictionaries[locale];
}

export async function getRequestLocale(): Promise<Locale> {
  const cookieStore = await cookies();

  return normalizeLocale(cookieStore.get(LOCALE_COOKIE)?.value) ?? "fr";
}
