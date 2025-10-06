import { ChallengeCard } from "@/components/cards/challenge-card";
import { ChallengeLogic } from "@/domain/challenge-logic";
import { PrismaClient } from "@/generated/prisma";
import { getChallengesByEventId } from "@/prisma/queries/get-challenges-by-event-id";
import { Card } from "@chakra-ui/react";

interface TeamChallengesProps {
	eventId: string;
	teamId: string | undefined;
}

export async function TeamChallenges({ eventId, teamId }: TeamChallengesProps) {
	const prismaClient = new PrismaClient();
	const challenges = await getChallengesByEventId(prismaClient)(
		eventId,
		teamId
			? {
					team_id: teamId,
				}
			: undefined,
	);
	const activeChallenge = teamId
		? ChallengeLogic.getActiveChallenge(teamId)(challenges)
		: undefined;
	const submittedChallenges = teamId
		? ChallengeLogic.getSubmittedChallenges(teamId)(challenges)
		: [];

	return (
		<Card.Root>
			<Card.Header>
				<Card.Title>Challenges</Card.Title>
			</Card.Header>
			<Card.Body>
				{activeChallenge && (
					<ChallengeCard challenge={activeChallenge} teamId={teamId} />
				)}
				{submittedChallenges.map((challenge) => (
					<ChallengeCard
						key={challenge.id}
						challenge={challenge}
						teamId={teamId}
					/>
				))}
			</Card.Body>
		</Card.Root>
	);
}
