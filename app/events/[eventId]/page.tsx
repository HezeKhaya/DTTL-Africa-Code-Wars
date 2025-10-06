import { EventCard } from "@/components";
import { EventLogic } from "@/domain/event-logic";
import { PrismaClient } from "@/generated/prisma";
import { getUserId } from "@/lib/auth";
import { createClient } from "@/lib/supabase/server";
import { getEventById } from "@/prisma/queries/get-event-by-id";
import { Grid, GridItem, Stack } from "@chakra-ui/react";
import { ChallengeCountdown } from "./components/challenge-countdown";
import { TeamChallenges } from "./components/team-challenges";

export default async function EventPage({
	params,
}: {
	params: Promise<{ eventId: string }>;
}) {
	const { eventId } = await params;

	const prismaClient = new PrismaClient();
	const supabase = await createClient();

	const event = await getEventById(prismaClient)(eventId);
	const userId = await getUserId(supabase);

	const userTeam = event.teams.find((team) =>
		team.user_teams.some((user_team) => user_team.user.id === userId),
	);

	return (
		<Stack>
			<Grid templateColumns={{ base: "1fr", md: "repeat(3, 1fr)" }} gap={4}>
				<GridItem colSpan={3}>
					<EventCard event={event} userTeam={userTeam} flexGrow={1} />
				</GridItem>
				{/* <GridItem colSpan={2}>
					<ChallengeCountdown
						startDateTime={EventLogic.getStartDateTime(event)}
					></ChallengeCountdown>
				</GridItem> */}
				<GridItem colSpan={2}>
					<TeamChallenges eventId={eventId} teamId={userTeam?.id} />
				</GridItem>
			</Grid>
		</Stack>
	);
}
