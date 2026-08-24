import { useTranslation } from "react-i18next";
import { HomeIcon } from "@heroicons/react/24/outline";
import { Link } from "@tanstack/react-router";
import type { FunctionComponent } from "../../common/types";

export const NotFoundPage = (): FunctionComponent => {
	const { t } = useTranslation();

	return (
		<main className="flex min-h-screen items-center justify-center bg-nb-cream px-6">
			<div className="max-w-xl border-3 border-nb-black bg-nb-white p-10 text-center shadow-[8px_8px_0px_0px_#0D0D0D]">
				<p className="font-mono text-6xl font-bold text-nb-black">404</p>
				<h1 className="mt-4 font-mono text-2xl font-bold text-nb-black uppercase">
					{t("common.notFoundTitle")}
				</h1>
				<p className="mt-3 font-sans text-sm leading-relaxed text-nb-black/70">
					{t("common.notFoundText")}
				</p>
				<div className="mt-8 flex justify-center">
					<Link
						className="nb-btn bg-nb-yellow text-nb-black flex items-center gap-2 text-xs"
						to="/"
					>
						<HomeIcon aria-hidden="true" className="h-4 w-4" />
						{t("common.backHome")}
					</Link>
				</div>
			</div>
		</main>
	);
};
