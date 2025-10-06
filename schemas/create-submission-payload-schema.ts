import z from "zod";

export const createSubmissionPayloadSchema = z.object({
	challenge_id: z.string().length(24),
	team_id: z.guid("Must be a valid GUID"),
});
