import { useEffect, useMemo, useState, type ReactElement } from "react";
import { useTranslation } from "react-i18next";
import {
	Menu,
	MenuButton,
	MenuItem,
	MenuItems,
	Transition,
} from "@headlessui/react";
import {
	GlobeAltIcon,
	Bars3Icon,
	XMarkIcon,
} from "@heroicons/react/24/outline";

import type { FunctionComponent } from "../../common/types";
import { useActiveSection } from "../../hooks/useActiveSection";

const languages = [
	{ code: "de", label: "Deutsch" },
	{ code: "en", label: "English" },
	{ code: "ru", label: "\u0420\u0443\u0441\u0441\u043a\u0438\u0439" },
	{
		code: "uk",
		label: "\u0423\u043a\u0440\u0430\u0457\u043d\u0441\u044c\u043a\u0430",
	},
];

export const Navbar = (): FunctionComponent => {
	const { t, i18n } = useTranslation();
	const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
	const [scrolled, setScrolled] = useState(false);

	const currentLanguage = languages.find(
		(lang) => lang.code === i18n.resolvedLanguage
	) ?? {
		code: "de",
		label: "Deutsch",
	};

	const handleLanguageChange = async (langCode: string): Promise<void> => {
		await i18n.changeLanguage(langCode);
	};

	const navLinks = useMemo(
		() => [
			{ href: "#home", id: "home", label: t("nav.home") },
			{ href: "#about", id: "about", label: t("nav.about") },
			{ href: "#flavors", id: "flavors", label: t("nav.flavors") },
			{ href: "#gallery", id: "gallery", label: t("nav.gallery") },
			{ href: "#configurator", id: "configurator", label: t("nav.designer") },
			{ href: "#reviews", id: "reviews", label: t("nav.reviews") },
			{ href: "#inquiry", id: "inquiry", label: t("nav.order") },
		],
		[t]
	);

	const activeSection = useActiveSection(
		useMemo(() => navLinks.map((link) => link.id), [navLinks])
	);

	useEffect(() => {
		const handleScroll = (): void => {
			setScrolled(window.scrollY > 24);
		};
		handleScroll();
		window.addEventListener("scroll", handleScroll, { passive: true });
		return (): void => {
			window.removeEventListener("scroll", handleScroll);
		};
	}, []);

	const languageMenu = (className: string): ReactElement => (
		<Menu as="div" className="relative inline-block text-left">
			<MenuButton className={`nb-tag cursor-pointer gap-1.5 ${className}`}>
				<GlobeAltIcon aria-hidden="true" className="h-3 w-3" />
				<span className="uppercase">{currentLanguage.code.toUpperCase()}</span>
			</MenuButton>
			<Transition
				enter="transition ease-out duration-100"
				enterFrom="transform opacity-0 scale-95"
				enterTo="transform opacity-100 scale-100"
				leave="transition ease-in duration-75"
				leaveFrom="transform opacity-100 scale-100"
				leaveTo="transform opacity-0 scale-95"
			>
				<MenuItems className="absolute right-0 z-10 mt-2 w-40 origin-top-right bg-cream-50 border border-almond-300 shadow-[0_20px_60px_rgba(50,23,13,0.12)] focus:outline-none">
					<div className="py-1">
						{languages.map((lang) => (
							<MenuItem key={lang.code}>
								{({ active }) => (
									<button
										className={`block w-full text-left px-4 py-2 font-sans text-xs font-medium uppercase tracking-wider transition-colors duration-100 ${
											active
												? "bg-raspberry-100 text-raspberry-800"
												: "text-chocolate-900"
										}`}
										onClick={() => handleLanguageChange(lang.code)}
									>
										{lang.label}
									</button>
								)}
							</MenuItem>
						))}
					</div>
				</MenuItems>
			</Transition>
		</Menu>
	);

	return (
		<nav
			className={`fixed top-0 left-0 right-0 z-50 transition-colors duration-300 ${
				scrolled
					? "bg-background border-b border-almond-300"
					: "bg-transparent border-b border-transparent"
			}`}
		>
			<div className="max-w-[1440px] mx-auto px-6 sm:px-8 lg:px-16">
				<div className="flex justify-between h-20">
					<div className="flex-shrink-0 flex items-center">
						<a className="flex flex-col leading-none group" href="#home">
							<span className="font-mono text-3xl font-semibold tracking-[-0.02em] text-chocolate-900">
								Yevheniia&rsquo;s
								<span className="text-raspberry-800">.</span>
							</span>
							<span className="font-sans text-[9px] font-medium tracking-[0.32em] text-chocolate-900/60 uppercase mt-1">
								Cake Atelier &middot; Bern
							</span>
						</a>
					</div>

					<div className="hidden md:flex items-center gap-5">
						{navLinks.map((link) => (
							<a
								key={link.href}
								aria-current={activeSection === link.id ? "true" : undefined}
								href={link.href}
								className={`font-sans text-xs font-medium tracking-[0.14em] text-chocolate-900 uppercase py-2 border-b transition-colors duration-300 ${
									activeSection === link.id
										? "border-raspberry-800 text-raspberry-800"
										: "border-transparent hover:text-raspberry-800"
								}`}
							>
								{link.label}
							</a>
						))}

						{languageMenu(
							"bg-raspberry-100 text-raspberry-800 border-raspberry-800/20"
						)}
					</div>

					<div className="flex items-center md:hidden gap-2">
						{languageMenu(
							"bg-raspberry-100 text-raspberry-800 border-raspberry-800/20"
						)}
						<button
							aria-expanded={mobileMenuOpen}
							className="border border-raspberry-800/30 p-2 text-chocolate-900 hover:bg-raspberry-100 transition-colors"
							aria-label={
								mobileMenuOpen ? t("nav.closeMenu") : t("nav.openMenu")
							}
							onClick={() => {
								setMobileMenuOpen(!mobileMenuOpen);
							}}
						>
							{mobileMenuOpen ? (
								<XMarkIcon aria-hidden="true" className="block h-5 w-5" />
							) : (
								<Bars3Icon aria-hidden="true" className="block h-5 w-5" />
							)}
						</button>
					</div>
				</div>
			</div>

			{mobileMenuOpen && (
				<div className="md:hidden fixed inset-0 top-20 bg-background overflow-y-auto">
					<div className="flex flex-col px-8 pt-10 pb-16">
						<div className="flex items-center gap-6 mb-10">
							<span className="h-px w-10 bg-raspberry-800/50" />
							<span className="font-mono text-xl text-raspberry-800">
								{"\u2661"}
							</span>
							<span className="h-px flex-1 bg-raspberry-800/50" />
						</div>
						<div className="space-y-1">
							{navLinks.map((link) => (
								<a
									key={link.href}
									href={link.href}
									className={`block py-3 font-mono font-medium text-4xl tracking-[-0.03em] ${
										activeSection === link.id
											? "text-raspberry-800"
											: "text-chocolate-900"
									}`}
									onClick={() => {
										setMobileMenuOpen(false);
									}}
								>
									{link.label}
								</a>
							))}
						</div>
						<p className="mt-16 font-sans text-[10px] uppercase tracking-[0.3em] text-chocolate-900/50">
							{`${"\u2661"} `}
							{t("common.collectionByAppointment")}
						</p>
					</div>
				</div>
			)}
		</nav>
	);
};
