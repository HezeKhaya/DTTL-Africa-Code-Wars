import { database } from "@/database";
import { getAbilities } from "@/lib/auth/get-abilities";
import { List, ListItem } from "@chakra-ui/react";
import { notFound } from "next/navigation";

export default async function UsersPage() {
	const abilities = await getAbilities();

	if (abilities.cannot("manage", "all")) {
		return notFound();
	}

	const data = await database.selectFrom("users").selectAll().execute();

	return (
		<List.Root>
			{data.map((user) => (
				<ListItem key={user.id}>{user.full_name}</ListItem>
			))}
		</List.Root>
	);
}
