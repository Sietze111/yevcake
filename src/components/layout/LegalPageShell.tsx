import type { ReactNode } from "react";
import { useTranslation } from "react-i18next";
import { ArrowLeftIcon } from "@heroicons/react/24/outline";
import { Link } from "@tanstack/react-router";
import type { FunctionComponent } from "../../common/types";

interface LegalPageShellProps {
	children: ReactNode;
	title: string;
}

export const LegalPageShell = ({
	children,
	title,
}: LegalPageShellProps): FunctionComponent => {
	const { t } = useTranslation();

	return (
		<main
			className="min-h-screen bg-nb-cream pt-28 pb-20 font-sans text-nb-black"
			id="main-content"
		>
			<div className="mx-auto max-w-3xl px-6">
				<Link
					className="font-sans text-xs font-medium text-chocolate-900 uppercase tracking-[0.18em] inline-flex items-center gap-2 border-b border-chocolate-900 pb-1 hover:border-raspberry-800 hover:text-raspberry-800 transition-colors"
					to="/"
				>
					<ArrowLeftIcon aria-hidden="true" className="h-4 w-4" />
					{t("common.backHome")}
				</Link>

				<h1 className="mt-10 mb-10 font-mono text-5xl font-medium tracking-[-0.02em] uppercase leading-tight">
					{title}
				</h1>

				<div className="space-y-6 text-sm leading-relaxed text-nb-black/80">
					{children}
				</div>
			</div>
		</main>
	);
};

interface InfoRowProps {
	label: string;
	children: ReactNode;
}

export const InfoRow = ({
	label,
	children,
}: InfoRowProps): FunctionComponent => (
	<div className="flex flex-col sm:flex-row sm:gap-4 gap-1">
		<span className="font-sans text-[11px] font-medium uppercase tracking-[0.18em] sm:w-56 shrink-0 pt-0.5 text-chocolate-900/70">
			{label}
		</span>
		<div>{children}</div>
	</div>
);

interface SectionHeadingProps {
	title: string;
}

export const LegalSectionHeading = ({
	title,
}: SectionHeadingProps): FunctionComponent => (
	<h2 className="pt-4 font-mono text-2xl font-medium tracking-[-0.02em]">
		{title}
	</h2>
);
