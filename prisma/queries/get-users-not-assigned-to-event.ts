import type { PrismaClient } from "@/generated/prisma";

export const getUsersNotAssignedToEvent =
	(prismaClient: PrismaClient) => (eventId: string) =>
		prismaClient.user.findMany({
			select: { id: true, email: true, full_name: true, avatar_url: true },
			where: { user_teams: { none: { team: { event_id: eventId } } } },
		});
