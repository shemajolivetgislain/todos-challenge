// src/tests/setupTests.js (or wherever you set up your tests)
import "@testing-library/jest-dom";
import i18n from "i18next";
import { initReactI18next } from "react-i18next";

// Initialize i18next for testing
i18n
  .use(initReactI18next) // Passes i18n down to react-i18next
  .init({
    resources: {
      en: {
        translation: {
          // Add your translations here
          "Add Task Placeholder": "Add Task Placeholder", // Example
          AddTaskButton: "Add Task", // Example
        },
      },
    },
    lng: "en", // Default language
    fallbackLng: "en",
    interpolation: {
      escapeValue: false, // React already escapes values
    },
  });

// Now you can use this setup in your tests
