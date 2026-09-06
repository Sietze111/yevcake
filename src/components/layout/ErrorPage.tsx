import { useTranslation } from "react-i18next";
import { ArrowPathIcon, HomeIcon } from "@heroicons/react/24/outline";
import { Link } from "@tanstack/react-router";
import type { FunctionComponent } from "../../common/types";

interface ErrorPageProps {
	error?: Error;
}

export const ErrorPage = ({ error }: ErrorPageProps): FunctionComponent => {
	const { t } = useTranslation();

	return (
		<main className="flex min-h-screen items-center justify-center bg-nb-cream px-6">
			<div className="max-w-xl rounded-lg border border-nb-line bg-nb-white p-10 sm:p-14 text-center shadow-[0_20px_60px_rgba(50,23,13,0.08)]">
				<h1 className="font-mono text-4xl font-medium text-chocolate-900 uppercase">
					{t("common.errorTitle")}
				</h1>
				<p className="mt-3 font-sans text-sm leading-relaxed text-chocolate-900/70">
					{error?.message || t("common.errorText")}
				</p>
				<div className="mt-8 flex flex-wrap justify-center gap-4">
					<button
						className="nb-btn nb-btn-primary flex items-center gap-2 text-xs"
						type="button"
						onClick={() => {
							window.location.reload();
						}}
					>
						<ArrowPathIcon aria-hidden="true" className="h-4 w-4" />
						{t("order.retry")}
					</button>
					<Link
						className="nb-btn nb-btn-outline flex items-center gap-2 text-xs"
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
