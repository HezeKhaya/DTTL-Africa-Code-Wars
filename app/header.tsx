import { ColorModeToggle } from "@/components";
import {
	Box,
	Container,
	Flex,
	HStack,
	Link,
	Spacer,
	Text,
} from "@chakra-ui/react";
import Image from "next/image";
import NextLink from "next/link";

export const Header = () => {
	return (
		<Box
			top={0}
			colorPalette="gray"
			position="sticky"
			zIndex="sticky"
			py={4}
			bg="bg"
		>
			<Container>
				<Flex as="nav" align="center" gap={4}>
					<Link asChild aria-label="Home" variant="unstyled">
						<NextLink href="/">
							<HStack>
								<Box
									w={8}
									h={8}
									position="relative"
									bg="red.emphasized"
									rounded="full"
								>
									<Image alt="chakra logo" src="/static/sword-logo.svg" fill />
								</Box>
								<Text textStyle={"xl"} fontFamily={"heading"}>
									Code Wars Kata Arena
								</Text>
							</HStack>
						</NextLink>
					</Link>
					<Spacer />
					<ColorModeToggle />
				</Flex>
			</Container>
		</Box>
	);
};
