import { Heading } from "@chakra-ui/react";

export default async function EventTeamPage({
	params,
}: {
	params: Promise<{ eventId: string; teamId: string }>;
}) {
	const { teamId } = await params;

	return <Heading>Huzzah! {teamId}</Heading>;
}
