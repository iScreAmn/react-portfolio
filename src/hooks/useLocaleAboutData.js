import { useMemo } from "react";
import { useLocale } from "../context/LocaleContext";
import * as englishAboutData from "../data/english/aboutData";
import * as russianAboutData from "../data/russian/aboutData";

export function useLocaleAboutData() {
  const { locale } = useLocale();
  return useMemo(
    () => (locale === "ru" ? russianAboutData : englishAboutData),
    [locale]
  );
}
