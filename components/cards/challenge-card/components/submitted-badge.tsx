import { ChallengeLogic } from "@/domain/challenge-logic";
import type { Challenge } from "@/prisma/types";
import { Badge } from "@chakra-ui/react";
import { LuCheck } from "react-icons/lu";

interface SubmittedBadgeProps {
	challenge: Challenge;
	teamId: string | undefined;
}

export function SubmittedBadge({ challenge, teamId }: SubmittedBadgeProps) {
	const submitted =
		teamId && ChallengeLogic.isCompletedByTeam(teamId)(challenge);

	if (!submitted) {
		return null;
	}

	return (
		<Badge colorPalette="green">
			Submitted
			<LuCheck />
		</Badge>
	);
}
