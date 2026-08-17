import i18n, { type InitOptions } from "i18next";
import LanguageDetector from "i18next-browser-languagedetector";
import { initReactI18next } from "react-i18next";

import translationDE from "../assets/locales/de/translations.json";
import translationEN from "../assets/locales/en/translations.json";
import translationRU from "../assets/locales/ru/translations.json";
import translationUK from "../assets/locales/uk/translations.json";

import { isProduction } from "./utilities";

export const defaultNS = "translations";

export const resources = {
	de: {
		translations: translationDE,
	},
	en: {
		translations: translationEN,
	},
	ru: {
		translations: translationRU,
	},
	uk: {
		translations: translationUK,
	},
} as const;

const i18nOptions: InitOptions = {
	resources,

	defaultNS,
	ns: [defaultNS],

	debug: !isProduction,

	// Only allow languages for which we actually have translations.
	supportedLngs: ["de", "en", "ru", "uk"],

	// Use German when no supported language is detected.
	fallbackLng: "de",

	interpolation: {
		escapeValue: false,
	},

	detection: {
		order: ["localStorage", "navigator"],
		caches: ["localStorage"],
	},
};

void i18n.use(initReactI18next).use(LanguageDetector).init(i18nOptions);

export default i18n;
