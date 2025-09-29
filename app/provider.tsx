"use client";

import theme from "@/theme";
import { ChakraProvider } from "@chakra-ui/react";
import type { JwtPayload } from "@supabase/supabase-js";
import { ThemeProvider } from "next-themes";
import type { PropsWithChildren } from "react";
import { AbilityProvider } from "../components/auth/ability-context";

export default function RootProviders({
	children,
	claims,
}: PropsWithChildren<{
	claims: JwtPayload | undefined;
}>) {
	return (
		<ChakraProvider value={theme}>
			<ThemeProvider attribute="class" disableTransitionOnChange>
				<AbilityProvider claims={claims}>{children}</AbilityProvider>
			</ThemeProvider>
		</ChakraProvider>
	);
}
