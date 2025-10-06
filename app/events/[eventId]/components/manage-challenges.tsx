import { Can } from "@/components";
import { ChallengeCard } from "@/components/cards/challenge-card";
import { ChallengeLogic } from "@/domain/challenge-logic";
import { PrismaClient } from "@/generated/prisma";
import { getChallengesByEventId } from "@/prisma/queries/get-challenges-by-event-id";
import { Card, HStack, IconButton, Spacer } from "@chakra-ui/react";
import { LuPlus } from "react-icons/lu";

interface ManageChallengesProps {
	eventId: string;
	teamId: string | undefined;
}

export async function ManageChallenges({
	eventId,
	teamId,
}: ManageChallengesProps) {
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
		<Can I="create" a="Event">
			<Card.Root variant="subtle">
				<Card.Header>
					<Card.Title>
						<HStack>
							Manage Challenges
							<Spacer />
							<IconButton size="xs" aria-label="Search database">
								<LuPlus />
							</IconButton>
						</HStack>
					</Card.Title>
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
		</Can>
	);
}
