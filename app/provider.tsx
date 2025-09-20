"use client";

import theme from "@/theme";
import { ChakraProvider } from "@chakra-ui/react";
import { ThemeProvider } from "next-themes";
import type { PropsWithChildren } from "react";
import { AbilityProvider } from "./components/abilities-context";

export default function RootProviders({
	children,
	claims,
}: PropsWithChildren<{
	claims: Record<string, unknown> | undefined;
}>) {
	return (
		<ChakraProvider value={theme}>
			<ThemeProvider attribute="class" disableTransitionOnChange>
				<AbilityProvider claims={claims}>{children}</AbilityProvider>
			</ThemeProvider>
		</ChakraProvider>
	);
}
