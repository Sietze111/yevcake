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
				className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[60] focus:rounded-full focus:bg-raspberry-800 focus:px-4 focus:py-2 focus:font-sans focus:text-xs focus:font-medium focus:text-cream-50"
				href="#main-content"
			>
				{t("a11y.skipToContent")}
			</a>
			<Outlet />
		</>
	);
};
