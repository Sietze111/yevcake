import { useTranslation } from "react-i18next";
import { Outlet } from "@tanstack/react-router";
import type { FunctionComponent } from "../common/types";
import { useSeo } from "../common/useSeo";

export const RootLayout = (): FunctionComponent => {
	const { t } = useTranslation();
	useSeo();

	return (
		<>
			<a
				className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[60] focus:border-3 focus:border-nb-black focus:bg-nb-yellow focus:px-4 focus:py-2 focus:font-mono focus:text-xs focus:font-bold focus:text-nb-black focus:uppercase"
				href="#main-content"
			>
				{t("a11y.skipToContent")}
			</a>
			<Outlet />
		</>
	);
};
