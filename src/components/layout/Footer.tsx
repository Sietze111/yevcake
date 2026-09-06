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

export const Footer = (): FunctionComponent => {
	const { t } = useTranslation();

	return (
		<footer className="on-dark bg-nb-black text-nb-cream pt-16 pb-8">
			<div className="max-w-7xl mx-auto px-6 lg:px-12">
				<div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12">
					<div className="space-y-3">
						<span className="block font-mono text-2xl font-bold text-nb-yellow uppercase">
							YEVHENIIA&#39;S
						</span>
						<span className="block font-mono text-[10px] tracking-[0.2em] text-nb-yellow/70 uppercase">
							Cake Atelier · Bern
						</span>
						<p className="font-sans text-sm text-nb-cream/60 leading-relaxed max-w-sm">
							{t("footer.tagline")}
						</p>
						<a
							className="inline-flex items-center gap-1.5 font-mono text-xs font-bold text-nb-yellow uppercase tracking-wider border-b border-nb-yellow pb-0.5 hover:text-nb-cream hover:border-nb-cream transition-colors"
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
					</div>

					<div className="space-y-4">
						<h4 className="font-mono text-lg font-bold text-nb-yellow uppercase">
							{t("nav.contact")}
						</h4>
						<ul className="space-y-3 font-sans text-sm text-nb-cream/70">
							<li className="flex items-center gap-3">
								<MapPinIcon className="h-5 w-5 text-nb-yellow flex-shrink-0" />
								<span>{t("footer.address")}</span>
							</li>
							<li className="flex items-center gap-3">
								<EnvelopeIcon className="h-5 w-5 text-nb-yellow flex-shrink-0" />
								<a
									className="hover:text-nb-yellow transition-colors"
									href={`mailto:${CONTACT.email}`}
								>
									{CONTACT.email}
								</a>
							</li>
							<li className="flex items-center gap-3">
								<PhoneIcon className="h-5 w-5 text-nb-yellow flex-shrink-0" />
								<a
									className="hover:text-nb-yellow transition-colors"
									href={CONTACT.phoneHref}
								>
									{CONTACT.phoneDisplay}
								</a>
							</li>
						</ul>
					</div>

					<div className="space-y-4">
						<h4 className="font-mono text-lg font-bold text-nb-yellow uppercase">
							{t("common.location")}
						</h4>
						<div className="border border-nb-yellow/70 bg-nb-black/40 rounded-3xl p-6 flex flex-col items-center justify-center gap-2 shadow-[0_8px_20px_rgba(0,0,0,0.35)]">
							<MapPinIcon className="h-8 w-8 text-nb-yellow/80" />
							<span className="font-mono text-sm font-bold text-nb-yellow">
								Atelier &middot; Bern
							</span>
							<span className="font-sans text-[10px] uppercase tracking-widest text-nb-cream/50">
								{t("common.collectionByAppointment")}
							</span>
						</div>
					</div>
				</div>

				<div className="pt-8 border-t-2 border-nb-cream/20 text-center font-mono text-xs text-nb-cream/40 uppercase space-y-2">
					<p>
						&copy; {new Date().getFullYear()} Yevheniia&#39;s Cake Atelier.{" "}
						{t("footer.rights")}
					</p>
					<p className="flex justify-center gap-4">
						<Link
							className="hover:text-nb-yellow transition-colors underline underline-offset-2"
							to="/impressum"
						>
							{t("nav.impressum")}
						</Link>
						<Link
							className="hover:text-nb-yellow transition-colors underline underline-offset-2"
							to="/privacy"
						>
							{t("nav.privacy")}
						</Link>
					</p>
				</div>
			</div>
		</footer>
	);
};
