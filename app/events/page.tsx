import { PrismaClient } from "@/generated/prisma";
import { getAbilities } from "@/lib/auth/get-abilities";
import { createClient } from "@/lib/supabase/server";
import { Grid, GridItem, List, ListItem } from "@chakra-ui/react";
import dayjs from "dayjs";
import isSameOrAfter from "dayjs/plugin/isSameOrAfter";
import { notFound } from "next/navigation";
import { EventCard } from "./components/event-card";
import { getNext, getPastTen } from "./utils";

dayjs.extend(isSameOrAfter);

export default async function UsersPage() {
	const supabase = await createClient();
	const claimCollection = await supabase.auth.getClaims();

	const abilities = getAbilities(claimCollection?.data?.claims);

	if (abilities.cannot("read", "Event")) {
		return notFound();
	}

	const userResponse = await supabase.auth.getUser();

	if (userResponse.error) {
		throw new Error(userResponse.error.message);
	}

	const user_id = userResponse.data.user.id;

	const prismaClient = new PrismaClient();

	const data = await prismaClient.events.findMany({
		include: {
			teams: {
				where: {
					user_teams: {
						some: {
							user_id,
						},
					},
				},
			},
		},
	});

	const nextEvent = getNext(data);
	const pastEvents = getPastTen(data);

	return (
		<Grid templateColumns={{ base: "1fr", md: "repeat(3, 1fr)" }} gap={4}>
			<GridItem colSpan={{ base: 1, md: 2 }}>
				<EventCard event={nextEvent} />
			</GridItem>
			<GridItem>
				<List.Root>
					{pastEvents.map((event) => (
						<ListItem key={event.id}>{event.title}</ListItem>
					))}
				</List.Root>
			</GridItem>
		</Grid>
	);
}
