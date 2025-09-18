"use client";

import theme from "@/theme";
import { ChakraProvider } from "@chakra-ui/react";
import { ThemeProvider } from "next-themes";

export default function RootLayout(props: { children: React.ReactNode }) {
	return (
		<ChakraProvider value={theme}>
			<ThemeProvider attribute="class" disableTransitionOnChange>
				{props.children}
			</ThemeProvider>
		</ChakraProvider>
	);
}
