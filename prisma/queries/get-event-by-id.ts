import type { PrismaClient } from "@/generated/prisma";

export const getEventById =
	(prismaClient: PrismaClient) => (event_id: string) =>
		prismaClient.event.findFirstOrThrow({
			where: { id: event_id },
			include: {
				teams: {
					select: {
						id: true,
						name: true,
						event_id: true,
						user_teams: {
							select: {
								role: true,
								user: { select: { id: true, full_name: true } },
							},
							orderBy: { user: { full_name: "asc" } },
						},
					},
					orderBy: { name: "asc" },
				},
				challenges: {
					select: {
						id: true,
						name: true,
						submissions: true,
						value: true,
					},
					orderBy: { order: "asc" },
				},
			},
		});

export type Event = Awaited<ReturnType<ReturnType<typeof getEventById>>>;
