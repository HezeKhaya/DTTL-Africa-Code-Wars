"use client";

import {
	Button,
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
		<Flex minHeight="100vh" align="center" justify="center">
			<VStack gap={12}>
				<Heading as="h1" size="2xl">
					Find a Team
				</Heading>
				<HStack gap={8}>
					<Button size="menu">
						focusRing
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
		</Flex>
	);
}
