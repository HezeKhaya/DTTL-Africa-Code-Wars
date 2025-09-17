"use client";

import { Flex, Heading, HStack, Icon, Text, VStack } from "@chakra-ui/react";
import { FaPlus, FaUsers } from "react-icons/fa";

export default function FindTeamPage() {
	return (
		<Flex minHeight="100vh" align="center" justify="center" bg="gray.50">
			<VStack gap={12}>
				<Heading as="h1" size="2xl" color="gray.700">
					Find a Team
				</Heading>

				<HStack gap={8}>
					<Flex
						as="button"
						direction="column"
						align="center"
						justify="center"
						p={10}
						w="250px"
						h="200px"
						bg="white"
						border="2px"
						borderColor="teal.400"
						borderRadius="xl"
						boxShadow="md"
						transition="all 0.2s ease-in-out"
						_hover={{
							boxShadow: "xl",
							transform: "translateY(-5px)",
						}}
					>
						<Icon as={FaPlus} boxSize={12} color="teal.500" />
						<Text mt={4} fontSize="xl" fontWeight="semibold" color="gray.600">
							Create Team
						</Text>
					</Flex>

					<Flex
						as="button"
						direction="column"
						align="center"
						justify="center"
						p={10}
						w="250px"
						h="200px"
						bg="white"
						border="2px"
						borderColor="purple.400"
						borderRadius="xl"
						boxShadow="md"
						transition="all 0.2s ease-in-out"
						_hover={{
							boxShadow: "xl",
							transform: "translateY(-5px)",
						}}
					>
						<Icon as={FaUsers} boxSize={12} color="purple.500" />
						<Text mt={4} fontSize="xl" fontWeight="semibold" color="gray.600">
							Join Team
						</Text>
					</Flex>
				</HStack>
			</VStack>
		</Flex>
	);
}
