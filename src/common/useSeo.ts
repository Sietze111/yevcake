import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { CONTACT, SITE_URL } from "./constants";

const JSONLD_ID = "ld-json-bakery";

const OG_LOCALES: Record<string, string> = {
	de: "de_CH",
	en: "en_GB",
	ru: "ru_RU",
	uk: "uk_UA",
};

const setMetaAttribute = (
	selector: string,
	attribute: string,
	value: string
): void => {
	let element = document.head.querySelector<HTMLMetaElement>(selector);
	if (!element) {
		element = document.createElement("meta");
		const [, property] = selector.match(/\[(?:name|property)='(.+)'\]/) ?? [];
		if (property) {
			if (selector.startsWith("meta[property")) {
				element.setAttribute("property", property);
			} else {
				element.setAttribute("name", property);
			}
			document.head.appendChild(element);
		}
	}
	element.setAttribute(attribute, value);
};

const buildJsonLd = (description: string): object => ({
	"@context": "https://schema.org",
	"@type": "Bakery",
	name: CONTACT.businessName,
	description,
	url: SITE_URL,
	image: `${SITE_URL}/cake_hero.jpg`,
	telephone: CONTACT.phoneDisplay.replace(/\s/gu, ""),
	email: CONTACT.email,
	priceRange: "CHF",
	address: {
		"@type": "PostalAddress",
		addressLocality: "Bern",
		addressCountry: "CH",
	},
	areaServed: "Bern, Switzerland",
	sameAs: [CONTACT.instagramHref],
});

export const useSeo = (): void => {
	const { i18n, t } = useTranslation();
	const language = i18n.resolvedLanguage ?? "de";

	useEffect(() => {
		document.documentElement.lang = language;
	}, [language]);

	useEffect(() => {
		const title = t("seo.title");
		const description = t("seo.description");

		document.title = title;
		setMetaAttribute("meta[name='description']", "content", description);
		setMetaAttribute("meta[property='og:title']", "content", title);
		setMetaAttribute("meta[property='og:description']", "content", description);
		setMetaAttribute("meta[property='og:url']", "content", SITE_URL);
		setMetaAttribute(
			"meta[property='og:locale']",
			"content",
			OG_LOCALES[language] ?? "de_CH"
		);

		let script = document.getElementById(JSONLD_ID);
		if (!script) {
			script = document.createElement("script");
			script.id = JSONLD_ID;
			script.setAttribute("type", "application/ld+json");
			document.head.appendChild(script);
		}
		script.textContent = JSON.stringify(buildJsonLd(description));
	}, [i18n, language, t]);
};
