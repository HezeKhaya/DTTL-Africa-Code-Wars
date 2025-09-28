import { CreateTeamForm } from "@/components/forms/create-team-form";
import { PrismaClient } from "@/generated/prisma";
import { createClient } from "@/lib/supabase/server";
import { getTeamByEventId } from "@/prisma/queries/get-team-by-event-id";
import { getUsersNotAssignedToEvent } from "@/prisma/queries/get-users-not-assigned-to-event";
import { Dialog, Portal } from "@chakra-ui/react";
import { RedirectType, redirect } from "next/navigation";

export default async function CreateTeamModalPage({
	searchParams,
}: {
	searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
	const supabase = await createClient();
	const userResponse = await supabase.auth.getUser();

	if (userResponse.error) {
		throw new Error(userResponse.error.message);
	}

	const userId = userResponse.data.user.id;
	const eventId = (await searchParams).eventId as string;
	const prismaClient = new PrismaClient();
	const [availableTeamMembers, existingTeam] = await Promise.all([
		getUsersNotAssignedToEvent(prismaClient)(eventId),
		getTeamByEventId(prismaClient)({ event_id: eventId, user_id: userId }),
	]);

	if (existingTeam) {
		redirect(
			`/events/${eventId}/teams/${existingTeam.id}`,
			RedirectType.replace,
		);
	}

	return (
		<Dialog.Root size="sm" open>
			<Portal>
				<Dialog.Backdrop />
				<Dialog.Positioner>
					<Dialog.Content>
						<Dialog.Header>Register Team</Dialog.Header>
						<Dialog.Body>
							<CreateTeamForm
								eventId={eventId}
								userId={userId}
								availableTeamMembers={availableTeamMembers}
							/>
						</Dialog.Body>
					</Dialog.Content>
				</Dialog.Positioner>
			</Portal>
		</Dialog.Root>
	);
}
