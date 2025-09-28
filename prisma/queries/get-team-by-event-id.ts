import type { PrismaClient } from "@/generated/prisma";

export const getTeamByEventId =
	(prismaClient: PrismaClient) =>
	({ user_id, event_id }: { user_id: string; event_id: string }) =>
		prismaClient.team.findFirst({
			where: {
				event_id,
				user_teams: {
					some: {
						user_id,
					},
				},
			},
		});

export type Team = Awaited<ReturnType<ReturnType<typeof getTeamByEventId>>>;
