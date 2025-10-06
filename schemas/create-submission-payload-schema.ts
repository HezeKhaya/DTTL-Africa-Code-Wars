import z from "zod";

export const createSubmissionPayloadSchema = z.object({
	challenge_id: z.number().int("Must be a valid integer"),
	team_id: z.guid("Must be a valid GUID"),
});
