import { createContext, useContext, useEffect, useMemo, useState } from "react";

const LocaleContext = createContext(null);

const DEFAULT_LOCALE = "en";
const SUPPORTED_LOCALES = ["en", "ru"];
const LOCALE_STORAGE_KEY = "portfolio-locale";

const resolveInitialLocale = () => {
  if (typeof window === "undefined") {
    return DEFAULT_LOCALE;
  }

  const savedLocale = window.localStorage.getItem(LOCALE_STORAGE_KEY);

  if (SUPPORTED_LOCALES.includes(savedLocale)) {
    return savedLocale;
  }

  return window.navigator.language?.toLowerCase().startsWith("ru")
    ? "ru"
    : DEFAULT_LOCALE;
};

export const LocaleProvider = ({ children }) => {
  const [locale, setLocale] = useState(resolveInitialLocale);

  useEffect(() => {
    document.documentElement.lang = locale;
    window.localStorage.setItem(LOCALE_STORAGE_KEY, locale);
  }, [locale]);

  const value = useMemo(
    () => ({
      locale,
      setLocale,
      supportedLocales: SUPPORTED_LOCALES,
    }),
    [locale]
  );

  return <LocaleContext.Provider value={value}>{children}</LocaleContext.Provider>;
};

// eslint-disable-next-line react-refresh/only-export-components
export const useLocale = () => {
  const context = useContext(LocaleContext);

  if (!context) {
    throw new Error("useLocale must be used within a LocaleProvider");
  }

  return context;
};
