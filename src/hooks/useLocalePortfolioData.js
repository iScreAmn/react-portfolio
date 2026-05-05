import { useMemo } from "react";
import { useLocale } from "../context/LocaleContext";
import * as englishPortfolioData from "../data/english/portfolioData";
import * as russianPortfolioData from "../data/russian/portfolioData";

export function useLocalePortfolioData() {
  const { locale } = useLocale();

  return useMemo(
    () => (locale === "ru" ? russianPortfolioData : englishPortfolioData),
    [locale]
  );
}
