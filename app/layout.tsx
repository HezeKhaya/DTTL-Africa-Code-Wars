import { Inter } from "next/font/google";
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
				<Provider>{children}</Provider>
			</body>
		</html>
	);
}
