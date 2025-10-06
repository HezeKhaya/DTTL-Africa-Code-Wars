import type { PrismaClient } from "@/generated/prisma";

export const getTeamUserNames = (prismaClient: PrismaClient) => (id: string) =>
	prismaClient.team
		.findFirstOrThrow({
			where: {
				id,
			},
			select: {
				user_teams: {
					select: {
						user_id: true,
						user: {
							select: {
								codewars_name: true,
							},
						},
					},
				},
			},
		})
		.then((result) =>
			result.user_teams
				.flatMap((ut) => ut.user.codewars_name || "")
				.filter((n) => !!n),
		);

export type Team = Awaited<ReturnType<ReturnType<typeof getTeamUserNames>>>;
