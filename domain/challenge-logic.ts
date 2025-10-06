import type { Challenge } from "@/prisma/types";
import { filter, firstBy, isNot, pipe, prop, sortBy } from "remeda";

export const ChallengeLogic = {
	getActiveChallenge:
		(teamId: string) =>
		<T extends Challenge>(challenges: T[]) =>
			pipe(
				challenges,
				filter(isNot(ChallengeLogic.isCompletedByTeam(teamId))),
				firstBy([prop("order"), "asc"]),
			),
	getSubmittedChallenges:
		(teamId: string) =>
		<T extends Challenge>(challenges: T[]) =>
			pipe(
				challenges,
				filter(ChallengeLogic.isCompletedByTeam(teamId)),
				sortBy([prop("order"), "asc"]),
			),
	isCompletedByTeam:
		(teamId: string) =>
		<T extends Challenge>(challenge: T) =>
			challenge.submissions.filter((s) => s.team_id === teamId).length > 0,
	isActive: (teamId: string) => isNot(ChallengeLogic.isCompletedByTeam(teamId)),
};
