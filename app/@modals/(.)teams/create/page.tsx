import { BackButton } from "@/components/buttons/back-button";
import { CreateTeamForm } from "@/components/forms/create-team-form";
import { PrismaClient } from "@/generated/prisma";
import { createClient } from "@/lib/supabase/server";
import type { CreateTeamPayload } from "@/prisma/mutations/create-team";
import { getUsersNotAssignedToEvent } from "@/prisma/queries/get-users-not-assigned-to-event";
import { Button, Dialog, Portal } from "@chakra-ui/react";

export default async function CreateTeamModalPage({
	searchParams,
}: {
	searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
	const supabase = await createClient();
	const userResponse = await supabase.auth.getUser();
	const formId = "create-team-form";

	if (userResponse.error) {
		throw new Error(userResponse.error.message);
	}

	const userId = userResponse.data.user.id;
	const eventId = (await searchParams).eventId as string;
	const prismaClient = new PrismaClient();
	const availableTeamMembers =
		await getUsersNotAssignedToEvent(prismaClient)(eventId);

	return (
		<Dialog.Root size="sm" open>
			<Portal>
				<Dialog.Backdrop />
				<Dialog.Positioner>
					<Dialog.Content>
						<Dialog.Header>Register Team</Dialog.Header>
						<Dialog.Body>
							<CreateTeamForm
								formId={formId}
								eventId={eventId}
								userId={userId}
								availableTeamMembers={availableTeamMembers}
								onSubmit={createTeam}
							/>
						</Dialog.Body>
						<Dialog.Footer>
							<BackButton>
								<Button variant="outline">Cancel</Button>
							</BackButton>
							<Button type="submit" form={formId}>
								Register
							</Button>
						</Dialog.Footer>
					</Dialog.Content>
				</Dialog.Positioner>
			</Portal>
		</Dialog.Root>
	);

	async function createTeam(payload: CreateTeamPayload) {
		"use server";

		console.log(payload);
	}
}
