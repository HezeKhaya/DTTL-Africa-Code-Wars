import type { Event } from "@/generated/prisma";
import type { TeamSubject } from "@/prisma/types";
import { Box, Card, Center, Heading, Text } from "@chakra-ui/react";
import { format } from "date-fns";
import Image from "next/image";
import { EventButtons } from "./components/event-buttons";

type EventCardProps = {
	event: Event | undefined;
	userTeam: TeamSubject | undefined;
} & Pick<Card.RootProps, "flexGrow">;

export function EventCard({ event, userTeam, ...rest }: EventCardProps) {
	if (!event) {
		return (
			<Center {...rest}>
				<Heading>No upcoming events!</Heading>
			</Center>
		);
	}

	return (
		<Card.Root overflow="hidden" {...rest}>
			<Box width="full" height="full" position="absolute">
				{event.banner_url && (
					<Image
						src={event.banner_url}
						alt="Event image"
						fill
						style={{ objectFit: "cover" }}
					/>
				)}
			</Box>
			<Card.Body
				gap="2"
				zIndex="docked"
				bgImage="linear-gradient({colors.bg}, {colors.bg/50}, transparent)"
				position="relative"
			>
				<Card.Title display="flex" flexDir="column" gap="1" zIndex={10}>
					<Text textStyle="3xl">{event.title}</Text>
					<Text
						textStyle="2xl"
						fontWeight="medium"
						letterSpacing="tight"
						mt="2"
					>
						{format(event.start_date, "eeee 'the' do MMMM")},{" "}
						{format(event.start_time, "HH:mm")} to{" "}
						{format(event.end_time, "HH:mm")}
					</Text>
				</Card.Title>
				<Card.Description textStyle="md" pb={20} color="fg">
					{event.blurb}
				</Card.Description>
			</Card.Body>
			<Card.Footer>
				<EventButtons eventId={event.id} userTeam={userTeam} />
			</Card.Footer>
		</Card.Root>
	);
}
