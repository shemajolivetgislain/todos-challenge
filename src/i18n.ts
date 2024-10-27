import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";
import Backend from "i18next-http-backend";
import enTranslation from "./locales/en/translation.json";
import frTranslation from "./locales/fr/translation.json";

import store, { persistor } from "./app/store/index.js";

// the translations
const resources = {
  en: {
    translation: enTranslation,
  },
  fr: {
    translation: frTranslation,
  },
};

persistor.subscribe(() => {
  const state = store.getState();
  const defaultLanguage = state.translation.defaultLanguage || "en";

  i18n
    .use(initReactI18next)
    .use(Backend)
    .use(LanguageDetector)
    .init({
      resources,
      lng: defaultLanguage,
      interpolation: {
        escapeValue: false, // React already escapes by default
      },
    });
});

export default i18n;
