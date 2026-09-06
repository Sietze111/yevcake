import { useTranslation } from "react-i18next";
import {
	EnvelopeIcon,
	MapPinIcon,
	PhoneIcon,
	ArrowTopRightOnSquareIcon,
} from "@heroicons/react/24/outline";
import { Link } from "@tanstack/react-router";
import type { FunctionComponent } from "../../common/types";
import { CONTACT } from "../../common/constants";

const footerNav = [
	{ href: "#about", id: "about", labelKey: "nav.about" },
	{ href: "#flavors", id: "flavors", labelKey: "nav.flavors" },
	{ href: "#gallery", id: "gallery", labelKey: "nav.gallery" },
	{ href: "#configurator", id: "configurator", labelKey: "nav.designer" },
	{ href: "#reviews", id: "reviews", labelKey: "nav.reviews" },
	{ href: "#inquiry", id: "inquiry", labelKey: "nav.order" },
] as const;

export const Footer = (): FunctionComponent => {
	const { t } = useTranslation();

	return (
		<footer className="on-dark bg-chocolate-950 text-cream-50 pt-20 pb-10">
			<div className="max-w-[1440px] mx-auto px-6 sm:px-8 lg:px-16">
				<div className="flex flex-col items-center text-center mb-14">
					<span
						aria-hidden="true"
						className="font-mono text-3xl text-raspberry-300"
					>
						{"\u2661"}
					</span>
					<span className="font-mono text-2xl font-semibold tracking-[-0.02em] text-cream-50 mt-3">
						Yevheniia&rsquo;s
						<span className="text-raspberry-300">.</span>
					</span>
					<span className="font-sans text-[10px] uppercase tracking-[0.32em] text-cream-50/70 mt-2">
						Cake Atelier &middot; Bern
					</span>
					<span
						aria-hidden="true"
						className="h-px w-40 bg-raspberry-300/50 mt-8"
					/>
				</div>

				<div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12">
					<div className="space-y-4">
						<h4 className="font-sans text-xs font-medium uppercase tracking-[0.2em] text-raspberry-300">
							{t("nav.contact")}
						</h4>
						<ul className="space-y-3 font-sans text-sm text-cream-50/80">
							<li className="flex items-center gap-3">
								<MapPinIcon className="h-4 w-4 text-raspberry-300 flex-shrink-0" />
								<span>{t("footer.address")}</span>
							</li>
							<li className="flex items-center gap-3">
								<EnvelopeIcon className="h-4 w-4 text-raspberry-300 flex-shrink-0" />
								<a
									className="hover:text-raspberry-300 transition-colors"
									href={`mailto:${CONTACT.email}`}
								>
									{CONTACT.email}
								</a>
							</li>
							<li className="flex items-center gap-3">
								<PhoneIcon className="h-4 w-4 text-raspberry-300 flex-shrink-0" />
								<a
									className="hover:text-raspberry-300 transition-colors"
									href={CONTACT.phoneHref}
								>
									{CONTACT.phoneDisplay}
								</a>
							</li>
						</ul>
						<p className="font-sans text-xs text-cream-50/60 leading-relaxed max-w-xs">
							{t("footer.tagline")}
						</p>
					</div>

					<div className="space-y-4">
						<h4 className="font-sans text-xs font-medium uppercase tracking-[0.2em] text-raspberry-300">
							{t("nav.showcase")}
						</h4>
						<ul className="space-y-2.5">
							{footerNav.map((item) => (
								<li key={item.id}>
									<a
										className="font-sans text-sm text-cream-50/80 hover:text-raspberry-300 transition-colors"
										href={item.href}
									>
										{t(item.labelKey)}
									</a>
								</li>
							))}
						</ul>
					</div>

					<div className="space-y-4">
						<h4 className="font-sans text-xs font-medium uppercase tracking-[0.2em] text-raspberry-300">
							{t("footer.followUs")}
						</h4>
						<a
							className="inline-flex items-center gap-1.5 font-sans text-xs font-medium uppercase tracking-[0.18em] text-cream-50 border-b border-raspberry-300/50 pb-1 hover:text-raspberry-300 hover:border-raspberry-300 transition-colors"
							href={CONTACT.instagramHref}
							rel="noreferrer"
							target="_blank"
						>
							{t("footer.instagram")}
							<ArrowTopRightOnSquareIcon
								aria-hidden="true"
								className="h-3.5 w-3.5"
							/>
						</a>
						<div className="border border-cream-50/15 p-6 flex flex-col items-center justify-center gap-2 mt-6">
							<MapPinIcon className="h-6 w-6 text-raspberry-300" />
							<span className="font-mono text-sm text-cream-50">
								Atelier &middot; Bern
							</span>
							<span className="font-sans text-[10px] uppercase tracking-[0.25em] text-cream-50/60">
								{t("common.collectionByAppointment")}
							</span>
						</div>
					</div>
				</div>

				<div className="pt-8 border-t border-cream-50/15 text-center space-y-4">
					<p className="flex items-center justify-center gap-2 font-sans text-[10px] uppercase tracking-[0.25em] text-cream-50/60">
						{t("footer.madeWith")}
						<span aria-hidden="true" className="text-raspberry-300 text-sm">
							{"\u2661"}
						</span>
						{t("footer.madeInBern")}
					</p>
					<p className="font-sans text-[10px] uppercase tracking-[0.2em] text-cream-50/50 flex flex-wrap justify-center gap-x-6 gap-y-2">
						<span>
							&copy; {new Date().getFullYear()} Yevheniia&rsquo;s Cake Atelier.{" "}
							{t("footer.rights")}
						</span>
						<span className="flex gap-4">
							<Link
								className="hover:text-raspberry-300 transition-colors underline underline-offset-2"
								to="/impressum"
							>
								{t("nav.impressum")}
							</Link>
							<Link
								className="hover:text-raspberry-300 transition-colors underline underline-offset-2"
								to="/privacy"
							>
								{t("nav.privacy")}
							</Link>
						</span>
					</p>
				</div>
			</div>
		</footer>
	);
};
