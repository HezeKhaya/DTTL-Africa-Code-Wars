import z from "zod";

export const createSubmissionPayloadSchema = z.object({
	challenge_id: z.bigint("Must be a valid integer"),
	team_id: z.guid("Must be a valid GUID"),
});
