import { Toaster } from "@/components/ui/toaster";
import { createClient } from "@/lib/supabase/server";
import { Container, Flex } from "@chakra-ui/react";
import { Inter } from "next/font/google";
import type { PropsWithChildren, ReactNode } from "react";
import { Header } from "./header";
import Provider from "./provider";

const inter = Inter({
	subsets: ["latin"],
	display: "swap",
});

type RootLayoutProps = Readonly<
	PropsWithChildren<{
		modals: ReactNode;
	}>
>;

export default async function RootLayout({
	children,
	modals,
}: RootLayoutProps) {
	const supabase = await createClient();

	const claimCollection = await supabase.auth.getClaims();

	return (
		<html lang="en-ZA" className={inter.className} suppressHydrationWarning>
			<head />
			<body>
				<Provider claims={claimCollection?.data?.claims}>
					<Flex flexDir="column" justifyContent="stretch" minH="100svh">
						<Header />
						<Container
							display="flex"
							justifyContent="stretch"
							alignItems="stretch"
							py={20}
							flexGrow={1}
							flexDir="column"
						>
							{children}
							{modals}
						</Container>
					</Flex>
					<Toaster />
				</Provider>
			</body>
		</html>
	);
}
