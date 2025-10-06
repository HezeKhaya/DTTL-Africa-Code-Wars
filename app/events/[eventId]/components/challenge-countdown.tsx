"use client";

import { useCountDown } from "@/hooks";
import { Card, CardBody, Heading, Text } from "@chakra-ui/react";

export function ChallengeCountdown({ startDateTime }: { startDateTime: Date }) {
	const { countdown, format } = useCountDown(startDateTime);

	return (
		<Card.Root>
			<CardBody my={20}>
				<Card.Title
					alignItems="center"
					justifyContent="center"
					display="flex"
					flexDir="column"
				>
					<Text>Challenges unlock in:</Text>
					<Heading
						as="p"
						suppressHydrationWarning
						textStyle="6xl"
						fontFamily="monospace"
					>
						{format(countdown)}
					</Heading>
				</Card.Title>
			</CardBody>
		</Card.Root>
	);
}
