import type { PrismaClient } from "@/generated/prisma";

export type CreateSubmissionPayload = {
	challenge_id: bigint;
	team_id: string;
	submitted_by: string;
};

export const createSubmission =
	(prismaClient: PrismaClient) =>
	({ challenge_id, team_id, submitted_by }: CreateSubmissionPayload) =>
		prismaClient.submission.create({
			data: {
				challenge: { connect: { id: challenge_id } },
				team: { connect: { id: team_id } },
				submitted_by_user: {
					connect: { id: submitted_by },
				},
			},
		});
