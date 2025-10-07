import ky from "ky";
import z from "zod";

const codewarsChallengeSchema = z.object({
	id: z.string(),
	name: z.string(),
	slug: z.string(),
	rank: z.object({
		id: z.number().int(),
		name: z.string(),
		color: z.string(),
	}),
});

export const getCodewarsChallenge = async (id: string) => {
	const result = await ky.get<unknown>(
		`https://www.codewars.com/api/v1/code-challenges/${id}`,
	);

	return codewarsChallengeSchema.parse(await result.json());
};
