import React from "react";
import { isProduction } from "../../../common/utilities";

export const ReactQueryDevelopmentTools = isProduction
	? (): null => null
	: React.lazy(() =>
			import("@tanstack/react-query-devtools").then((result) => ({
				default: result.ReactQueryDevtools,
			}))
		);
