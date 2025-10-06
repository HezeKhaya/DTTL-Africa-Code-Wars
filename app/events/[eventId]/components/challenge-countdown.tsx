"use client";

import { EventLogic } from "@/domain/event-logic";
import { useCountDown } from "@/hooks";
import type { Event } from "@/prisma/types";
import { Card, CardBody, Heading, Text } from "@chakra-ui/react";

export function ChallengeCountdown({ event }: { event: Event }) {
	const startDateTime = EventLogic.getStartDateTime(event);
	const { countdown, format } = useCountDown(startDateTime);

	if (!countdown.isComplete) {
		return null;
	}

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
