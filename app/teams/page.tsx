"use client";

import {
	Button,
	Center,
	Flex,
	Heading,
	HStack,
	Icon,
	Text,
	VStack,
} from "@chakra-ui/react";
import { FaPlus, FaUsers } from "react-icons/fa";

export default function FindTeamPage() {
	return (
		<Center minH="full">
			<VStack gap={12}>
				<Heading as="h1" size="2xl">
					Find a Team
				</Heading>
				<HStack gap={8} flexWrap="wrap" align="center" justify="center">
					<Button size="menu">
						<Icon as={FaPlus} boxSize={12} color="teal.solid" />
						<Text fontSize="xl" fontWeight="semibold">
							Create Team
						</Text>
					</Button>
					<Button size="menu">
						<Icon as={FaUsers} boxSize={12} color="purple.focusRing" />
						<Text fontSize="xl" fontWeight="semibold">
							Join Team
						</Text>
					</Button>
				</HStack>
			</VStack>
		</Center>
	);
}
