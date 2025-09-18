import { Container, Flex, Spacer } from "@chakra-ui/react";
import { Inter } from "next/font/google";
import { Header } from "./header";
import Provider from "./provider";

const inter = Inter({
	subsets: ["latin"],
	display: "swap",
});

export default function RootLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<html lang="en-ZA" className={inter.className} suppressHydrationWarning>
			<head />
			<body>
				<Provider>
					<Flex flexDir="column" justifyContent="stretch" minH="100svh">
						<Header />
						<Container
							display="flex"
							justifyContent="center"
							py={20}
							flexGrow={1}
						>
							{children}
						</Container>
					</Flex>
				</Provider>
			</body>
		</html>
	);
}
