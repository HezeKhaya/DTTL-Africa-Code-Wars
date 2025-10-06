import type { Challenge } from "@/prisma/types";
import { Card } from "@chakra-ui/react";
import { SubmitSolutionButton } from "./components/submit-solution-button";

interface ChallengeCardProps {
	challenge: Challenge;
	teamId: string | undefined;
}

export function ChallengeCard({ challenge, teamId }: ChallengeCardProps) {
	return (
		<Card.Root>
			<Card.Header>
				<Card.Title>{challenge.name}</Card.Title>
				<Card.Footer justifyContent="flex-start">
					<SubmitSolutionButton challenge={challenge} teamId={teamId} />
				</Card.Footer>
			</Card.Header>
		</Card.Root>
	);
}
