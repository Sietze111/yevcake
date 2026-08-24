import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { RouterProvider } from "@tanstack/react-router";
import type { FunctionComponent } from "./common/types";
import type { TanstackRouter } from "./main";
import { isProduction } from "./common/utilities";
import { TanStackRouterDevelopmentTools } from "./components/utils/development-tools/TanStackRouterDevelopmentTools";
import { ReactQueryDevelopmentTools } from "./components/utils/development-tools/ReactQueryDevelopmentTools";

const queryClient = new QueryClient();

type AppProps = { router: TanstackRouter };

const App = ({ router }: AppProps): FunctionComponent => {
	return (
		<QueryClientProvider client={queryClient}>
			<RouterProvider router={router} />
			{!isProduction && (
				<>
					<TanStackRouterDevelopmentTools
						initialIsOpen={false}
						position="bottom-left"
						router={router}
					/>
					<ReactQueryDevelopmentTools initialIsOpen={false} position="bottom" />
				</>
			)}
		</QueryClientProvider>
	);
};

export default App;
