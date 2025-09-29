import { EventCard } from "@/components";
import { EventLogic } from "@/domain/event-logic";
import { PrismaClient } from "@/generated/prisma";
import { getClaims, getUserId } from "@/lib/auth";
import { getAbilities } from "@/lib/auth/get-abilities";
import { createClient } from "@/lib/supabase/server";
import { getEventsWithUserTeams } from "@/prisma/queries/get-events-with-user-teams";
import { Grid, GridItem, Heading, Stack } from "@chakra-ui/react";
import dayjs from "dayjs";
import isSameOrAfter from "dayjs/plugin/isSameOrAfter";
import { notFound } from "next/navigation";
import { PastEventCard } from "./components/past-event-card";

dayjs.extend(isSameOrAfter);

export default async function UsersPage() {
	const supabase = await createClient();

	const abilities = getAbilities(await getClaims(supabase));

	if (abilities.cannot("read", "Event")) {
		return notFound();
	}

	const userId = await getUserId(supabase);

	const prismaClient = new PrismaClient();

	const data = await getEventsWithUserTeams(prismaClient)(userId);

	const nextEvent = EventLogic.getNextEvent(data);
	const pastEvents = EventLogic.getPastEvents(data);
	const userTeam = nextEvent?.teams[0];

	return (
		<Grid
			templateColumns={{ base: "1fr", md: "repeat(3, 1fr)" }}
			gap={4}
			flexGrow={1}
		>
			<GridItem
				colSpan={{ base: 1, md: 2 }}
				display="flex"
				justifyContent="stretch"
				flexDir="column"
			>
				<Stack flexGrow={1}>
					<Heading>Next Event</Heading>
					<EventCard event={nextEvent} userTeam={userTeam} flexGrow={1} />
				</Stack>
			</GridItem>
			<GridItem>
				<Stack>
					<Heading>Past Events</Heading>
					{pastEvents.map((event) => (
						<PastEventCard key={event.id} event={event} />
					))}
				</Stack>
			</GridItem>
		</Grid>
	);
}
