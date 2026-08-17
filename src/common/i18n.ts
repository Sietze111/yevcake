import i18n, { type InitOptions } from "i18next";
import LanguageDetector from "i18next-browser-languagedetector";
import Backend, { type HttpBackendOptions } from "i18next-http-backend";
import { initReactI18next } from "react-i18next";
import translationDE from "../assets/locales/de/translations.json";
import translationEN from "../assets/locales/en/translations.json";
import translationRU from "../assets/locales/ru/translations.json";
import translationUK from "../assets/locales/uk/translations.json";
import { isProduction } from "./utilities";

export const defaultNS = "translations";
export const resources = {
	de: { translations: translationDE },
	en: { translations: translationEN },
	ru: { translations: translationRU },
	uk: { translations: translationUK },
} as const;

const i18nOptions: InitOptions<HttpBackendOptions> = {
	defaultNS,
	ns: [defaultNS],
	debug: !isProduction,
	fallbackLng: "de",
	interpolation: {
		escapeValue: false, // not needed for react as it escapes by default
	},
	backend: {
		loadPath: isProduction
			? "locales/{{lng}}/translations.json"
			: "src/assets/locales/{{lng}}/translations.json",
	},
};

void i18n
	.use(initReactI18next)
	.use(LanguageDetector)
	.use(Backend)
	.init<HttpBackendOptions>(i18nOptions);
