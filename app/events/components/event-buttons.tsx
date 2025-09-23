import { Can } from "@/components/auth/can";
import type { EventWithUserTeam } from "@/prisma/queries/get-events-with-user-teams";
import { Button, ButtonGroup, Link as ChakraLink } from "@chakra-ui/react";
import NextLink from "next/link";

export function EventButtons({ event }: { event: EventWithUserTeam }) {
	const myTeam = event.teams[0];
	return (
		<ButtonGroup>
			{myTeam ? (
				<Can I="read" this={myTeam}>
					<Button>My Team</Button>
				</Can>
			) : (
				<Can I="create" a="Team">
					<Button>Enter Team</Button>
				</Can>
			)}
			<Can I="update" a="Event">
				<Button>Manage Event</Button>
			</Can>
			<ChakraLink asChild>
				<NextLink href={`/teams/create?eventId=${event.id}`}>
					Click here
				</NextLink>
			</ChakraLink>
		</ButtonGroup>
	);
}
