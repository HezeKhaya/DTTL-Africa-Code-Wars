"use client";

import { Card, CardBody, Heading, Text } from "@chakra-ui/react";
import { intervalToDuration } from "date-fns";
import { useEffect, useState } from "react";

function calculateRemaining(reference: Date) {
	const duration = intervalToDuration({ start: new Date(), end: reference });

	const days = duration.days ?? 0;
	const hours = String(duration.hours ?? 0).padStart(2, "0");
	const minutes = String(duration.minutes ?? 0).padStart(2, "0");
	const seconds = String(duration.seconds ?? 0).padStart(2, "0");

	return `${days}d ${hours}:${minutes}:${seconds}`;
}

export function Locked({ startDateTime }: { startDateTime: Date }) {
	const [remaining, setRemaining] = useState(calculateRemaining(startDateTime));

	useEffect(() => {
		const countDownInterval = setInterval(() => {
			setRemaining(calculateRemaining(startDateTime));
		}, 1000);

		return () => clearInterval(countDownInterval);
	}, [startDateTime]);

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
						{remaining}
					</Heading>
				</Card.Title>
			</CardBody>
		</Card.Root>
	);
}

export namespace Challenges {
	Locked;
}
