import { useState } from "react";
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

export const Navbar = (): FunctionComponent => {
	const { t, i18n } = useTranslation();
	const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

	const languages = [
		{ code: "de", label: "Deutsch" },
		{ code: "en", label: "English" },
		{ code: "ru", label: "Русский" },
		{ code: "uk", label: "Українська" },
	];

	const currentLanguage = languages.find(
		(lang) => lang.code === i18n.resolvedLanguage
	) ?? { code: "de", label: "Deutsch" };

	const handleLanguageChange = async (langCode: string): Promise<void> => {
		await i18n.changeLanguage(langCode);
	};

	const navLinks = [
		{ href: "#home", label: t("nav.home") },
		{ href: "#about", label: t("nav.about") },
		{ href: "#flavors", label: t("nav.flavors") },
		{ href: "#gallery", label: t("nav.gallery") },
		{ href: "#prices", label: t("nav.prices") },
		{ href: "#faq", label: t("nav.faq") },
		{ href: "#reviews", label: t("nav.reviews") },
		{ href: "#inquiry", label: t("nav.order") },
	];

	return (
		<nav className="fixed top-0 left-0 right-0 z-50 glass-panel shadow-sm transition-all duration-300">
			<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
				<div className="flex justify-between h-20">
					{/* Logo / Branding */}
					<div className="flex-shrink-0 flex items-center">
						<a className="flex flex-col" href="#home">
							<span className="font-serif text-2xl tracking-widest text-brand-dark font-semibold">
								YEVHENIIA'S
							</span>
							<span className="font-sans text-[10px] tracking-[0.25em] text-brand-accent uppercase -mt-1 font-semibold">
								Cake Atelier • Bern
							</span>
						</a>
					</div>

					{/* Desktop Navigation */}
					<div className="hidden md:flex items-center space-x-8">
						{navLinks.map((link) => (
							<a
								key={link.href}
								className="font-sans text-sm tracking-wide text-brand-dark/80 hover:text-brand-gold transition-colors duration-200 uppercase font-medium"
								href={link.href}
							>
								{link.label}
							</a>
						))}

						{/* Language Selector Dropdown */}
						<Menu as="div" className="relative inline-block text-left">
							<div>
								<MenuButton className="inline-flex items-center justify-center gap-x-1.5 rounded-full px-3 py-1.5 text-xs font-semibold text-brand-dark/95 shadow-sm ring-1 ring-brand-gold/30 hover:bg-brand-champagne/40 transition-all duration-200">
									<GlobeAltIcon
										aria-hidden="true"
										className="-ml-0.5 h-4 w-4 text-brand-accent"
									/>
									{currentLanguage.label}
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
								<MenuItems className="absolute right-0 z-10 mt-2 w-40 origin-top-right rounded-xl bg-white shadow-lg ring-1 ring-black/5 focus:outline-none overflow-hidden">
									<div className="py-1">
										{languages.map((lang) => (
											<MenuItem key={lang.code}>
												{({ active }) => (
													<button
														className={`${
															active
																? "bg-brand-champagne/50 text-brand-accent"
																: "text-brand-dark"
														} block w-full text-left px-4 py-2 text-xs font-semibold`}
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

					{/* Mobile hamburger menu toggle */}
					<div className="flex items-center md:hidden gap-4">
						{/* Language Selector in Mobile Header */}
						<Menu as="div" className="relative inline-block text-left">
							<div>
								<MenuButton className="inline-flex items-center gap-x-1 rounded-full p-1.5 text-xs text-brand-dark shadow-sm ring-1 ring-brand-gold/30">
									<GlobeAltIcon className="h-4 w-4 text-brand-accent" />
									<span className="uppercase text-[10px] font-bold">
										{currentLanguage.code}
									</span>
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
								<MenuItems className="absolute right-0 z-10 mt-2 w-32 origin-top-right rounded-lg bg-white shadow-lg ring-1 ring-black/5 focus:outline-none">
									<div className="py-1">
										{languages.map((lang) => (
											<MenuItem key={lang.code}>
												{({ active }) => (
													<button
														className={`${
															active
																? "bg-brand-champagne/50 text-brand-accent"
																: "text-brand-dark"
														} block w-full text-left px-3 py-1.5 text-xs font-semibold`}
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
							className="inline-flex items-center justify-center p-2 rounded-md text-brand-dark hover:bg-brand-champagne/30 focus:outline-none"
							onClick={() => {
								setMobileMenuOpen(!mobileMenuOpen);
							}}
						>
							{mobileMenuOpen ? (
								<XMarkIcon aria-hidden="true" className="block h-6 w-6" />
							) : (
								<Bars3Icon aria-hidden="true" className="block h-6 w-6" />
							)}
						</button>
					</div>
				</div>
			</div>

			{/* Mobile Menu Panel */}
			{mobileMenuOpen && (
				<div className="md:hidden glass-panel border-t border-brand-gold/20 shadow-md">
					<div className="px-2 pt-2 pb-4 space-y-1 sm:px-3">
						{navLinks.map((link) => (
							<a
								key={link.href}
								className="block px-3 py-2.5 rounded-md text-base font-medium text-brand-dark hover:bg-brand-champagne/40 hover:text-brand-gold transition-all"
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
