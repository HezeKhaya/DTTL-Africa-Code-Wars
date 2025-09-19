import { database } from "@/database";
import { getAbilities } from "@/lib/auth/get-abilities";
import { createClient } from "@/lib/supabase/server";
import { List, ListItem } from "@chakra-ui/react";
import { notFound } from "next/navigation";

export default async function UsersPage() {
	const supabase = await createClient();

	const claimCollection = await supabase.auth.getClaims();

	const abilities = getAbilities(claimCollection?.data?.claims);

	if (abilities.cannot("read", "all")) {
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
