import type { PrismaClient, Role } from "@/generated/prisma";

export type CreateTeamPayload = {
	name: string;
	captain_id: string;
	event_id: string;
	member_ids?: string[];
};

export const createTeam =
	(prismaClient: PrismaClient) =>
	({ name, event_id, captain_id, member_ids }: CreateTeamPayload) =>
		prismaClient.team.create({
			data: {
				name: name,
				event: { connect: { id: event_id } },
				user: {
					connect: { id: captain_id },
				},
				user_teams: {
					create: [
						{
							role: "captain",
							user_id: captain_id,
						},
						...(member_ids?.map((user_id) => ({
							role: "member" as Role,
							user_id: user_id,
						})) ?? []),
					],
				},
			},
		});
