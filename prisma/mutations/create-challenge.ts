import type { PrismaClient } from "@/generated/prisma";
import z from "zod";

export const createChallengePayloadSchema = z.object({
	id: z.string().length(24, { message: "Must be 24 characters long" }),
	name: z
		.string()
		.min(5, "At least 5 characters")
		.max(100, "No more than 100 characters"),
	order: z.coerce.number().int(),
	level: z.coerce.number(),
	value: z.coerce.number().positive(),
	event_id: z.guid("Must be a valid GUID"),
});

export type CreateChallengePayload = z.infer<
	typeof createChallengePayloadSchema
>;

export const createChallenge =
	(prismaClient: PrismaClient) =>
	({ event_id, ...rest }: CreateChallengePayload) =>
		prismaClient.challenge.create({
			data: {
				...rest,
				event: { connect: { id: event_id } },
			},
		});
