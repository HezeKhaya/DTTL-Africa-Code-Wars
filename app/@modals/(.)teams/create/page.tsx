import { BackButton } from "@/components/buttons/back-button";
import { CreateTeamForm } from "@/components/forms/create-team-form";
import { createClient } from "@/lib/supabase/server";
import { getQueryClient } from "@/lib/tanstack/get-query-client";
import { userQueryOptions } from "@/prisma/queries/get-users";
import { Button, Dialog, Portal } from "@chakra-ui/react";
import { dehydrate, HydrationBoundary } from "@tanstack/react-query";

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
	const queryClient = getQueryClient();

	void queryClient.prefetchQuery(userQueryOptions);

	return (
		<HydrationBoundary state={dehydrate(queryClient)}>
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
		</HydrationBoundary>
	);
}
