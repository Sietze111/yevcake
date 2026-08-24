import { useTranslation } from "react-i18next";
import {
	EnvelopeIcon,
	MapPinIcon,
	PhoneIcon,
} from "@heroicons/react/24/outline";
import type { FunctionComponent } from "../../common/types";

export const Footer = (): FunctionComponent => {
	const { t } = useTranslation();

	return (
		<footer className="bg-nb-black text-nb-cream pt-16 pb-8">
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
					</div>

					<div className="space-y-4">
						<h4 className="font-mono text-lg font-bold text-nb-yellow uppercase">
							{t("nav.contact")}
						</h4>
						<ul className="space-y-3 font-sans text-sm text-nb-cream/70">
							<li className="flex items-center gap-3">
								<MapPinIcon className="h-5 w-5 text-nb-yellow flex-shrink-0" />
								<span>Bern, Switzerland</span>
							</li>
							<li className="flex items-center gap-3">
								<EnvelopeIcon className="h-5 w-5 text-nb-yellow flex-shrink-0" />
								<a
									className="hover:text-nb-yellow transition-colors"
									href="mailto:yevheniia@cakeatelier.ch"
								>
									yevheniia@cakeatelier.ch
								</a>
							</li>
							<li className="flex items-center gap-3">
								<PhoneIcon className="h-5 w-5 text-nb-yellow flex-shrink-0" />
								<a
									className="hover:text-nb-yellow transition-colors"
									href="tel:+41790000000"
								>
									+41 79 000 00 00
								</a>
							</li>
						</ul>
					</div>

					<div className="space-y-4">
						<h4 className="font-mono text-lg font-bold text-nb-yellow uppercase">
							Location
						</h4>
						<div className="border-3 border-nb-yellow bg-nb-black/50 p-6 flex flex-col items-center justify-center gap-2 shadow-[4px_4px_0px_0px_#FFE566]">
							<MapPinIcon className="h-10 w-10 text-nb-yellow animate-bounce" />
							<span className="font-mono text-xs font-bold text-nb-yellow uppercase tracking-wider">
								Atelier in Bern
							</span>
							<span className="font-mono text-[10px] text-nb-cream/50">
								Collection by appointment
							</span>
						</div>
					</div>
				</div>

				<div className="pt-8 border-t-2 border-nb-cream/20 text-center font-mono text-xs text-nb-cream/40 uppercase">
					<p>
						&copy; {new Date().getFullYear()} Yevheniia&#39;s Cake Atelier.{" "}
						{t("footer.rights")}
					</p>
				</div>
			</div>
		</footer>
	);
};
