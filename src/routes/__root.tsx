import { createRootRoute } from "@tanstack/react-router";
import { RootLayout } from "../pages/RootLayout";
import { ErrorPage } from "../components/layout/ErrorPage";
import { NotFoundPage } from "../components/layout/NotFoundPage";

export const Route = createRootRoute({
	component: RootLayout,
	errorComponent: ({ error }) => <ErrorPage error={error} />,
	notFoundComponent: NotFoundPage,
});
