import type { PrismaClient } from "@/generated/prisma";

export const getChallengesByEventId =
	(prismaClient: PrismaClient) =>
	(event_id: string, filters: { team_id: string } | undefined = undefined) =>
		prismaClient.challenge.findMany({
			where: {
				event_id,
			},
			include: {
				submissions: { where: { team_id: filters?.team_id } },
			},
		});

export type Team = Awaited<
	ReturnType<ReturnType<typeof getChallengesByEventId>>
>;
