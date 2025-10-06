import { PrismaClient } from "@/generated/prisma";
import { getChallengesByEventId } from "@/prisma/queries/get-challenges-by-event-id";
import type { Event } from "@/prisma/types";
import { ChallengeCountdown } from "./challenge-countdown";
import { TeamChallenges } from "./team-challenges";

interface ChallengesProps {
	event: Event;
	teamId: string | undefined;
}

export async function Challenges({ event, teamId }: ChallengesProps) {
	const prismaClient = new PrismaClient();
	const challenges = await getChallengesByEventId(prismaClient)(
		event.id,
		teamId
			? {
					team_id: teamId,
				}
			: undefined,
	);

	return (
		<>
			<ChallengeCountdown event={event} />
			<TeamChallenges challenges={challenges} teamId={teamId} />
		</>
	);
}
