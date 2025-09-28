"use client";

import { getQueryClient } from "@/lib/tanstack/get-query-client";
import theme from "@/theme";
import { ChakraProvider } from "@chakra-ui/react";
import { QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { ThemeProvider } from "next-themes";
import type { PropsWithChildren } from "react";
import { AbilityProvider } from "../components/auth/ability-context";

export default function RootProviders({
	children,
	claims,
}: PropsWithChildren<{
	claims: Record<string, unknown> | undefined;
}>) {
	const queryClient = getQueryClient();

	return (
		<QueryClientProvider client={queryClient}>
			<ChakraProvider value={theme}>
				<ThemeProvider attribute="class" disableTransitionOnChange>
					<AbilityProvider claims={claims}>{children}</AbilityProvider>
				</ThemeProvider>
			</ChakraProvider>
			<ReactQueryDevtools initialIsOpen={false} />
		</QueryClientProvider>
	);
}
