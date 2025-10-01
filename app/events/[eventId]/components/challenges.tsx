"use client";

import { useCountDown } from "@/hooks";
import { Card, CardBody, Heading, Text } from "@chakra-ui/react";

export function Locked({ startDateTime }: { startDateTime: Date }) {
	const { countdown, format } = useCountDown(startDateTime);

	return (
		<Card.Root>
			<CardBody>
				<Card.Title
					alignItems="center"
					justifyContent="center"
					display="flex"
					flexDir="column"
				>
					<Text>Challenges unlocking in:</Text>
					<Heading as="p" suppressHydrationWarning textStyle="6xl">
						{format(countdown)}
					</Heading>
				</Card.Title>
			</CardBody>
		</Card.Root>
	);
}
