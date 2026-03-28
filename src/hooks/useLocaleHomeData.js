import { useMemo } from "react";
import { useLocale } from "../context/LocaleContext";
import * as englishHomeData from "../data/english/homeData";
import * as russianHomeData from "../data/russian/homeData";

export function useLocaleHomeData() {
  const { locale } = useLocale();
  return useMemo(
    () => (locale === "ru" ? russianHomeData : englishHomeData),
    [locale]
  );
}
