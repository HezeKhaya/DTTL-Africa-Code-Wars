import type { PrismaClient, Role } from "@/generated/prisma";
import z from "zod";

const guidSchema = z.guid("Must be a valid GUID");

export const createTeamPayloadSchema = z.object({
	name: z.coerce
		.string()
		.trim()
		.min(5, "At least 5 characters")
		.max(100, "Less than 100 characters"),
	captain_id: guidSchema,
	event_id: guidSchema,
	team_ids: z.array(guidSchema).optional(),
});

export type CreateTeamPayload = z.infer<typeof createTeamPayloadSchema>;

export const createTeam =
	(prismaClient: PrismaClient) =>
	({ name, event_id, captain_id, team_ids }: CreateTeamPayload) =>
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
						...(team_ids?.map((user_id) => ({
							role: "member" as Role,
							user_id: user_id,
						})) ?? []),
					],
				},
			},
		});
