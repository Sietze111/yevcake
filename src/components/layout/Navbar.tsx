import { useMemo, useState } from "react";
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

export const Navbar = (): FunctionComponent => {
	const { t, i18n } = useTranslation();
	const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

	const languages = [
		{ code: "de", label: "Deutsch" },
		{ code: "en", label: "English" },
		{ code: "ru", label: "\u0420\u0443\u0441\u0441\u043a\u0438\u0439" },
		{
			code: "uk",
			label: "\u0423\u043a\u0440\u0430\u0457\u043d\u0441\u044c\u043a\u0430",
		},
	];

	const currentLanguage = languages.find(
		(lang) => lang.code === i18n.resolvedLanguage
	) ?? { code: "de", label: "Deutsch" };

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

	return (
		<nav className="fixed top-0 left-0 right-0 z-50 bg-nb-cream/95 backdrop-blur-md border-b border-nb-line shadow-[0_6px_20px_rgba(61,43,31,0.08)]">
			<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
				<div className="flex justify-between h-16">
					<div className="flex-shrink-0 flex items-center">
						<a className="flex flex-col leading-none group" href="#home">
							<span className="font-mono text-2xl font-bold tracking-tight text-nb-black">
								{"Yevheniia\u2019s"}
								<span className="text-nb-pink">.</span>
							</span>
							<span className="font-sans text-[9px] font-medium tracking-[0.32em] text-nb-black/60 uppercase">
								Cake Atelier &middot; Bern
							</span>
						</a>
					</div>

					<div className="hidden md:flex items-center gap-1">
						{navLinks.map((link) => (
							<a
								key={link.href}
								aria-current={activeSection === link.id ? "true" : undefined}
								href={link.href}
								className={`font-sans text-[11px] font-medium tracking-wider text-nb-black uppercase px-3 py-2 rounded-full transition-colors duration-150 ${
									activeSection === link.id
										? "bg-nb-black text-nb-cream"
										: "hover:bg-nb-yellow/40"
								}`}
							>
								{link.label}
							</a>
						))}

						<Menu as="div" className="relative inline-block text-left ml-2">
							<div>
								<MenuButton className="nb-tag bg-nb-pink hover:bg-nb-black hover:text-nb-cream transition-colors cursor-pointer gap-1.5">
									<GlobeAltIcon aria-hidden="true" className="h-3 w-3" />
									{currentLanguage.code.toUpperCase()}
								</MenuButton>
							</div>
							<Transition
								enter="transition ease-out duration-100"
								enterFrom="transform opacity-0 scale-95"
								enterTo="transform opacity-100 scale-100"
								leave="transition ease-in duration-75"
								leaveFrom="transform opacity-100 scale-100"
								leaveTo="transform opacity-0 scale-95"
							>
								<MenuItems className="absolute right-0 z-10 mt-2 w-40 origin-top-right bg-nb-cream border border-nb-line rounded-xl shadow-[0_12px_26px_rgba(61,43,31,0.18)] focus:outline-none">
									<div className="py-1">
										{languages.map((lang) => (
											<MenuItem key={lang.code}>
												{({ active }) => (
													<button
														className={
															active
																? "bg-nb-yellow/70 text-nb-black block w-full text-left px-4 py-2 font-sans text-xs font-medium uppercase tracking-wider"
																: "text-nb-black block w-full text-left px-4 py-2 font-sans text-xs font-medium uppercase tracking-wider"
														}
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
					</div>

					<div className="flex items-center md:hidden gap-2">
						<Menu as="div" className="relative inline-block text-left">
							<div>
								<MenuButton className="nb-tag bg-nb-pink cursor-pointer gap-1">
									<GlobeAltIcon className="h-3 w-3" />
									<span className="uppercase">{currentLanguage.code}</span>
								</MenuButton>
							</div>
							<Transition
								enter="transition ease-out duration-100"
								enterFrom="transform opacity-0 scale-95"
								enterTo="transform opacity-100 scale-100"
								leave="transition ease-in duration-75"
								leaveFrom="transform opacity-100 scale-100"
								leaveTo="transform opacity-0 scale-95"
							>
								<MenuItems className="absolute right-0 z-10 mt-2 w-36 origin-top-right bg-nb-cream border border-nb-line rounded-xl shadow-[0_12px_26px_rgba(61,43,31,0.18)] focus:outline-none">
									<div className="py-1">
										{languages.map((lang) => (
											<MenuItem key={lang.code}>
												{({ active }) => (
													<button
														className={
															active
																? "bg-nb-yellow/70 text-nb-black block w-full text-left px-3 py-2 font-sans text-xs font-medium uppercase"
																: "text-nb-black block w-full text-left px-3 py-2 font-sans text-xs font-medium uppercase"
														}
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

						<button
							aria-expanded={mobileMenuOpen}
							className="border border-nb-line rounded-lg p-2 text-nb-black hover:bg-nb-yellow/50 transition-colors"
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
				<div className="md:hidden bg-nb-cream/95 border-t border-nb-line">
					<div className="px-2 pt-2 pb-4 space-y-0.5">
						{navLinks.map((link) => (
							<a
								key={link.href}
								className="block px-4 py-2.5 font-sans text-sm font-medium text-nb-black uppercase tracking-wide hover:bg-nb-yellow/40 rounded-lg transition-colors"
								href={link.href}
								onClick={() => {
									setMobileMenuOpen(false);
								}}
							>
								{link.label}
							</a>
						))}
					</div>
				</div>
			)}
		</nav>
	);
};
