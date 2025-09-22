import { Can } from "@/components/auth/can";
import type { Event } from "@/prisma/types";
import { Button, ButtonGroup } from "@chakra-ui/react";

export function EventButtons({ event }: { event: Event }) {
	return (
		<ButtonGroup>
			<Can I="create" a="Team">
				<Button>Enter Team</Button>
			</Can>
			<Can I="update" this={event}>
				<Button>Manage Event</Button>
			</Can>
		</ButtonGroup>
	);
}
