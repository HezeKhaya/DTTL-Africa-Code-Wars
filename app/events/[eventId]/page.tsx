import { EventCard } from "@/components";
import { PrismaClient } from "@/generated/prisma";
import { getUserId } from "@/lib/auth";
import { createClient } from "@/lib/supabase/server";
import { getEventById } from "@/prisma/queries/get-event-by-id";

export default async function EventPage({
	params,
}: {
	params: Promise<{ eventId: string }>;
}) {
	const { eventId } = await params;

	const prismaClient = new PrismaClient();
	const supabase = await createClient();

	const event = await getEventById(prismaClient)(eventId);
	const userId = await getUserId(supabase);

	const userTeam = event.teams.find((team) =>
		team.user_teams.some((user_team) => user_team.user.id === userId),
	);

	return <EventCard event={event} userTeam={userTeam} />;
}
