import { database } from "@/database";
import { List, ListItem } from "@chakra-ui/react";

export default async function UsersPage() {
	const data = await database.selectFrom("users").selectAll().execute();

	return (
		<List.Root>
			{data.map((user) => (
				<ListItem key={user.id}>{user.full_name}</ListItem>
			))}
		</List.Root>
	);
}
