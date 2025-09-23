import type { EventWithUserTeam } from "@/prisma/queries/get-events-with-user-teams";
import { Box, Card, Center, Heading, Text } from "@chakra-ui/react";
import dayjs from "dayjs";
import advancedFormat from "dayjs/plugin/advancedFormat";
import Image from "next/image";
import { EventButtons } from "./event-buttons";

dayjs.extend(advancedFormat);

type EventCardProps = { event: EventWithUserTeam | undefined } & Pick<
	Card.RootProps,
	"flexGrow"
>;

export function EventCard({ event, ...rest }: EventCardProps) {
	if (!event) {
		return (
			<Center>
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
						alt="Green double couch with wooden legs"
						fill
						style={{ objectFit: "cover" }}
					/>
				)}
			</Box>
			<Card.Body
				gap="2"
				zIndex="docked"
				bgImage="linear-gradient({colors.gray.900} 30%, transparent)"
			>
				<Card.Title display="flex" flexDir="column" gap="1">
					<Text textStyle="3xl">{event.title}</Text>
					<Text
						textStyle="2xl"
						fontWeight="medium"
						letterSpacing="tight"
						mt="2"
					>
						{dayjs(event.start_date).format("dddd [the] Do MMMM")},{" "}
						{dayjs(event.start_time).format("HH:mm")} to{" "}
						{dayjs(event.end_time).format("HH:mm")}
					</Text>
				</Card.Title>
				<Card.Description textStyle="md">{event.blurb}</Card.Description>
			</Card.Body>
			<Card.Footer>
				<EventButtons event={event} />
			</Card.Footer>
		</Card.Root>
	);
}
