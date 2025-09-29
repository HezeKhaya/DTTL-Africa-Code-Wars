"use client";

import { Card, CardBody, Heading, Text } from "@chakra-ui/react";
import dayjs from "dayjs";
import { useEffect, useState } from "react";

function calculateRemaining(reference: Date) {
	return Math.abs(dayjs(reference).diff(dayjs()));
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
						{dayjs(remaining).format("D[d] HH:mm:ss")}
					</Heading>
				</Card.Title>
			</CardBody>
		</Card.Root>
	);
}

export namespace Challenges {
	Locked;
}
