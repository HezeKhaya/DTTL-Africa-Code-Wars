import z from "zod";

export const challengeSchema = z.object({
	id: z.string(),
	name: z.string(),
	slug: z.string(),
	completedAt: z.coerce.date(),
	completedLanguages: z.array(z.string()),
});

export const completeChallengesResponseSchema = z.object({
	totalPages: z.number(),
	totalItems: z.number(),
	data: z.array(challengeSchema),
});
