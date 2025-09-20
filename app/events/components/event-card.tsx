import type { Event } from "@/database/models";
import { Box, Button, Card, Center, Heading, Text } from "@chakra-ui/react";
import dayjs from "dayjs";
import advancedFormat from "dayjs/plugin/advancedFormat";
import customParseFormat from "dayjs/plugin/customParseFormat";
import Image from "next/image";

dayjs.extend(customParseFormat);
dayjs.extend(advancedFormat);

export function EventCard({ event }: { event: Event | undefined }) {
	if (!event) {
		return (
			<Center>
				<Heading>No upcoming events!</Heading>
			</Center>
		);
	}

	return (
		<Card.Root minW="full" aspectRatio={2} overflow="hidden" position="relatve">
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
						{dayjs(event.start_time, "HH:mm:ssZZ").format("HH:mm")} to{" "}
						{dayjs(event.end_time, "HH:mm:ssZZ").format("HH:mm")}
					</Text>
				</Card.Title>
				<Card.Description textStyle="md">{event.blurb}</Card.Description>
			</Card.Body>
			<Card.Footer>
				<Button>Test</Button>
			</Card.Footer>
		</Card.Root>
	);
}
