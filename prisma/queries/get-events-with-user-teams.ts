import type { PrismaClient } from "@/generated/prisma";

export const getEventsWithUserTeams =
	(prismaClient: PrismaClient) => (user_id: string) =>
		prismaClient.event.findMany({
			include: {
				teams: {
					where: {
						user_teams: {
							some: {
								user_id,
							},
						},
					},
				},
			},
		});

export type EventWithUserTeam = Awaited<
	ReturnType<ReturnType<typeof getEventsWithUserTeams>>
>[0];
