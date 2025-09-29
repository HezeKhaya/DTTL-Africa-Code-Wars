import { Can } from "@/components/auth/can";
import type { TeamSubject } from "@/prisma/types";
import { Button, ButtonGroup } from "@chakra-ui/react";
import NextLink from "next/link";

type EventButtonProps = { eventId: string; userTeam: TeamSubject | undefined };

export function EventButtons({ eventId, userTeam }: EventButtonProps) {
	return (
		<ButtonGroup>
			{userTeam ? (
				<Can I="read" this={userTeam}>
					<Button asChild>
						<NextLink href={`/events/${eventId}/teams/${userTeam.id}`}>
							My Team
						</NextLink>
					</Button>
				</Can>
			) : (
				<Can I="create" a="Team">
					<NextLink href={`/teams/create?eventId=${eventId}`}>
						Enter a Team
					</NextLink>
				</Can>
			)}
			<Can I="update" a="Event">
				<Button>
					<NextLink href={`/events/${eventId}`}>Manage Event</NextLink>
				</Button>
			</Can>
		</ButtonGroup>
	);
}
