import { ChallengeCard } from "@/components/cards/challenge-card";
import { ChallengeLogic } from "@/domain/challenge-logic";
import type { ChallengeWithSubmission } from "@/prisma/queries/get-challenges-by-event-id";
import { Card } from "@chakra-ui/react";

interface TeamChallengesProps {
	challenges: ChallengeWithSubmission[];
	teamId: string | undefined;
}

export function TeamChallenges({ challenges, teamId }: TeamChallengesProps) {
	if (!teamId) {
		return null;
	}

	const activeChallenge = teamId
		? ChallengeLogic.getActiveChallenge(teamId)(challenges)
		: undefined;
	const submittedChallenges = teamId
		? ChallengeLogic.getSubmittedChallenges(teamId)(challenges)
		: [];

	return (
		<Card.Root variant="subtle">
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
