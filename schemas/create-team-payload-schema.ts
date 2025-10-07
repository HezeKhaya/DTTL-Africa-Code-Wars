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
