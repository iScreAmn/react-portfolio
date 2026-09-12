import { useCallback, useEffect, useState } from "react";

const THEME_STORAGE_KEY = "saved-theme";

const listeners = new Set();

const readSavedTheme = () => {
  if (typeof window === "undefined") return "light";
  return window.localStorage.getItem(THEME_STORAGE_KEY) === "dark"
    ? "dark"
    : "light";
};

let currentTheme = readSavedTheme();

const applyTheme = (theme) => {
  document.body.classList.toggle("dark-theme", theme === "dark");
};

// Сохранённая тема применяется при загрузке модуля, а не при монтировании
// компонента: переключатель живёт только в меню, но тема нужна всей странице.
if (typeof document !== "undefined") {
  applyTheme(currentTheme);
}

/**
 * The theme lives in this module rather than in a component, so any switch can
 * read and write it without a provider.
 */
export function useTheme() {
  const [theme, setThemeState] = useState(currentTheme);

  useEffect(() => {
    applyTheme(currentTheme);
    setThemeState(currentTheme);
    listeners.add(setThemeState);
    return () => listeners.delete(setThemeState);
  }, []);

  const setTheme = useCallback((next) => {
    if (next === currentTheme) return;

    currentTheme = next;
    applyTheme(next);
    window.localStorage.setItem(THEME_STORAGE_KEY, next);
    listeners.forEach((listener) => listener(next));
  }, []);

  const toggleTheme = useCallback(() => {
    setTheme(currentTheme === "light" ? "dark" : "light");
  }, [setTheme]);

  return { theme, setTheme, toggleTheme };
}
