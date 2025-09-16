import { Center } from "@chakra-ui/react";
import type { PropsWithChildren } from "react";

export default function AuthLayout({ children }: PropsWithChildren) {
	return (
		<Center minH="100svh" py="10">
			{children}
		</Center>
	);
}
