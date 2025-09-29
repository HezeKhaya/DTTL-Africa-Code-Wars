import type { EventWithUserTeam } from "@/prisma/queries/get-events-with-user-teams";
import { Box, Stack, Text } from "@chakra-ui/react";
import { format } from "date-fns";
import Image from "next/image";

export function PastEventCard({ event }: { event: EventWithUserTeam }) {
	return (
		<Box position="relative" borderRadius="md" overflow="clip">
			<Box width="full" height="full" position="absolute" zIndex={0}>
				{event.banner_url && (
					<Image
						src={event.banner_url}
						alt="Event banner"
						fill
						style={{ objectFit: "cover" }}
					/>
				)}
			</Box>
			<Stack
				zIndex="100"
				position="relative"
				p={4}
				bgImage="linear-gradient({colors.gray.900} 30%, transparent)"
			>
				<Text textStyle="lg">{event.title}</Text>
				<Text textStyle="md" fontWeight="medium" letterSpacing="tight" mt="2">
					{format(event.start_date, "eeee 'the' do MMMM")},{" "}
					{format(event.start_time, "HH:mm")} to{" "}
					{format(event.end_time, "HH:mm")}
				</Text>
			</Stack>
		</Box>
	);
}
