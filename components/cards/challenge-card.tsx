import { ChallengeLogic } from "@/domain/challenge-logic";
import type { Challenge } from "@/prisma/types";
import { Card } from "@chakra-ui/react";

interface ChallengeCardProps {
	challenge: Challenge;
	teamId: string | undefined;
}

export function ChallengeCard({ challenge, teamId }: ChallengeCardProps) {
	const isActive = teamId && ChallengeLogic.isActive(teamId)(challenge);
	return (
		<Card.Root>
			<Card.Header>
				<Card.Title>{challenge.name}</Card.Title>
				<Card.Footer></Card.Footer>
			</Card.Header>
		</Card.Root>
	);
}
