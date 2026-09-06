import { useTranslation } from "react-i18next";
import { HomeIcon } from "@heroicons/react/24/outline";
import { Link } from "@tanstack/react-router";
import type { FunctionComponent } from "../../common/types";

export const NotFoundPage = (): FunctionComponent => {
	const { t } = useTranslation();

	return (
		<main className="flex min-h-screen items-center justify-center bg-nb-cream px-6">
			<div className="max-w-xl rounded-lg border border-nb-line bg-nb-white p-10 sm:p-14 text-center shadow-[0_20px_60px_rgba(50,23,13,0.08)]">
				<p className="font-mono text-7xl font-medium text-raspberry-800">404</p>
				<h1 className="mt-4 font-mono text-3xl font-medium text-chocolate-900 uppercase">
					{t("common.notFoundTitle")}
				</h1>
				<p className="mt-3 font-sans text-sm leading-relaxed text-chocolate-900/70">
					{t("common.notFoundText")}
				</p>
				<div className="mt-8 flex justify-center">
					<Link
						className="nb-btn nb-btn-primary flex items-center gap-2 text-xs"
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
