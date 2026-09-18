"use client";

import { useCallback } from "react";
import { useStore } from "@/store/zerobet-store";
import { t, type Language } from "./dictionary";

/**
 * useT — translation hook bound to the current user language.
 *
 * Returns a memoized `translate(key, params?)` function that pulls the
 * active language from the Zustand store. Use it in any client component:
 *
 * ```tsx
 * const t = useT();
 * return <h1>{t("welcomeTitle")}</h1>;
 * ```
 *
 * The returned function is stable for a given language, so it's safe to
 * pass down to memoized children.
 */
export function useT() {
  const language = useStore((s) => s.language);

  const translate = useCallback(
    (key: string, params?: Record<string, string | number>) =>
      t(language as Language, key, params),
    [language]
  );

  return translate;
}

/**
 * useLanguage — returns the currently selected language code.
 *
 * Useful when a component needs the raw language code (e.g., to pass to
 * `Intl.DateTimeFormat`, switch fonts, or render language-aware UI) rather
 * than a translate function.
 */
export function useLanguage(): Language {
  const language = useStore((s) => s.language);
  return language as Language;
}

export default useT;
