import type { PrismaClient } from "@/generated/prisma";

export const getUsers = (prismaClient: PrismaClient) => () =>
	prismaClient.user.findMany({
		select: { id: true, email: true, full_name: true, avatar_url: true },
	});

export type User = Awaited<ReturnType<ReturnType<typeof getUsers>>>[0];
