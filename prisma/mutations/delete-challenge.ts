import type { PrismaClient } from "@/generated/prisma";

export const deleteChallenge = (prismaClient: PrismaClient) => (id: string) =>
	prismaClient.challenge.delete({
		where: { id },
	});
