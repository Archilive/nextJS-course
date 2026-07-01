"use client";

import type { Locale } from "./server";

type LanguageSwitcherProps = {
  locale: Locale;
  labels: {
    label: string;
    fr: string;
    en: string;
  };
};

export function LanguageSwitcher({ locale, labels }: LanguageSwitcherProps) {
  function setLocale(nextLocale: Locale) {
    document.cookie = `NEXT_LOCALE=${nextLocale}; path=/; max-age=31536000; samesite=lax`;
    window.location.reload();
  }

  return (
    <div className="language-switcher" aria-label={labels.label}>
      <button
        aria-pressed={locale === "fr"}
        onClick={() => setLocale("fr")}
        type="button"
      >
        {labels.fr}
      </button>
      <button
        aria-pressed={locale === "en"}
        onClick={() => setLocale("en")}
        type="button"
      >
        {labels.en}
      </button>
    </div>
  );
}
