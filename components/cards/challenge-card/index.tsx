import { ExternalLink } from "@/components";
import type { Challenge } from "@/prisma/types";
import { Card, HStack, Spacer } from "@chakra-ui/react";
import { SubmitSolutionButton } from "./components/submit-solution-button";
import { SubmittedBadge } from "./components/submitted-badge";

interface ChallengeCardProps {
	challenge: Challenge;
	teamId: string | undefined;
}

export function ChallengeCard({ challenge, teamId }: ChallengeCardProps) {
	return (
		<Card.Root size="sm">
			<Card.Header>
				<Card.Title>
					<HStack>
						<ExternalLink
							href={`https://www.codewars.com/kata/${challenge.slug}`}
						>
							{challenge.name}
						</ExternalLink>
						<Spacer />
						<SubmittedBadge challenge={challenge} teamId={teamId} />
					</HStack>
				</Card.Title>
				<Card.Footer justifyContent="flex-end">
					<SubmitSolutionButton challenge={challenge} teamId={teamId} />
				</Card.Footer>
			</Card.Header>
		</Card.Root>
	);
}
