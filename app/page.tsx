import UserGreetText from "@/components/user-greet-text";
import {
	Box,
	Button,
	Checkbox,
	ClientOnly,
	HStack,
	Progress,
	RadioGroup,
	Skeleton,
	Text,
	VStack,
} from "@chakra-ui/react";
import Image from "next/image";
import { ColorModeToggle } from "../components/color-mode-toggle";
import LoginButton from "../components/login-logout-button";

export default async function Page() {
	return (
		<Box textAlign="center" fontSize="xl" pt="30vh">
			<VStack gap="8">
				<Image
					alt="chakra logo"
					src="/static/sword-logo.svg"
					width="120"
					height="120"
				/>
				<UserGreetText />
				<Text textStyle={"5xl"} fontFamily={"heading"}>
					Code Wars Kata Arena
				</Text>

				<HStack>
					<LoginButton />
				</HStack>
			</VStack>

			<Box pos="absolute" top="4" right="4">
				<ClientOnly fallback={<Skeleton w="10" h="10" rounded="md" />}>
					<ColorModeToggle />
				</ClientOnly>
			</Box>
		</Box>
	);
}
