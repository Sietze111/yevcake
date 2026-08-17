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
		{ code: "ru", label: "\u0420\u0443\u0441\u0441\u043a\u0438\u0439" },
		{ code: "uk", label: "\u0423\u043a\u0440\u0430\u0457\u043d\u0441\u044c\u043a\u0430" },
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
		<nav className="fixed top-0 left-0 right-0 z-50 bg-nb-yellow border-b-4 border-nb-black shadow-[0_4px_0px_0px_#0D0D0D]">
			<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
				<div className="flex justify-between h-16">
					<div className="flex-shrink-0 flex items-center">
						<a className="flex flex-col leading-none" href="#home">
							<span className="font-mono text-xl font-bold tracking-tight text-nb-black uppercase">
								{"YEVHENIIA'S"}
							</span>
							<span className="font-mono text-[9px] tracking-[0.15em] text-nb-black/70 uppercase">
								Cake Atelier &middot; Bern
							</span>
						</a>
					</div>

					<div className="hidden md:flex items-center gap-1">
						{navLinks.map((link) => (
							<a
								key={link.href}
								className="font-mono text-[10px] font-bold tracking-wider text-nb-black uppercase px-3 py-1.5 hover:bg-nb-black hover:text-nb-yellow transition-colors duration-100 border border-transparent hover:border-nb-black"
								href={link.href}
							>
								{link.label}
							</a>
						))}

						<Menu as="div" className="relative inline-block text-left ml-2">
							<div>
								<MenuButton className="nb-tag bg-nb-pink hover:bg-nb-black hover:text-nb-yellow transition-colors cursor-pointer gap-1.5">
									<GlobeAltIcon
										aria-hidden="true"
										className="h-3 w-3"
									/>
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
								<MenuItems className="absolute right-0 z-10 mt-2 w-40 origin-top-right bg-nb-cream border-2 border-nb-black shadow-[4px_4px_0px_0px_#0D0D0D] focus:outline-none">
									<div className="py-1">
										{languages.map((lang) => (
											<MenuItem key={lang.code}>
												{({ active }) => (
													<button
														className={active ? "bg-nb-yellow text-nb-black block w-full text-left px-4 py-2 font-mono text-xs font-bold uppercase tracking-wide" : "text-nb-black block w-full text-left px-4 py-2 font-mono text-xs font-bold uppercase tracking-wide"}
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
								<MenuItems className="absolute right-0 z-10 mt-2 w-36 origin-top-right bg-nb-cream border-2 border-nb-black shadow-[4px_4px_0px_0px_#0D0D0D] focus:outline-none">
									<div className="py-1">
										{languages.map((lang) => (
											<MenuItem key={lang.code}>
												{({ active }) => (
													<button
														className={active ? "bg-nb-yellow text-nb-black block w-full text-left px-3 py-2 font-mono text-xs font-bold uppercase" : "text-nb-black block w-full text-left px-3 py-2 font-mono text-xs font-bold uppercase"}
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
							className="border-2 border-nb-black p-1.5 hover:bg-nb-black hover:text-nb-yellow transition-colors"
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
				<div className="md:hidden bg-nb-yellow border-t-4 border-nb-black">
					<div className="px-2 pt-2 pb-4 space-y-0.5">
						{navLinks.map((link) => (
							<a
								key={link.href}
								className="block px-4 py-2.5 font-mono text-sm font-bold text-nb-black uppercase tracking-wide hover:bg-nb-black hover:text-nb-yellow transition-colors"
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
