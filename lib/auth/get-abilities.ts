import {
	type AbilityTuple,
	defineAbility,
	type MongoAbility,
} from "@casl/ability";
import { z } from "zod";
import { createClient } from "../supabase/server";

const schema = z.object({
	app_metadata: z.object({
		admin: z.coerce.boolean(),
		roles: z
			.object({ captain: z.array(z.guid()), member: z.array(z.guid()) })
			.partial(),
	}),
});

const defaultClaim: z.infer<typeof schema>["app_metadata"] = {
	admin: false,
	roles: { captain: [], member: [] },
};

type AppSubject = "Team" | "all" | "Event";
type AppAbilities = "manage" | "read";
type AppAbility = MongoAbility<AbilityTuple<AppAbilities, AppSubject>>;

export async function getAbilities(): Promise<
	ReturnType<typeof defineAbility<AppAbility>>
> {
	const supabase = await createClient();

	const { data } = await supabase.auth.getClaims();

	const claims = data ? schema.parse(data.claims).app_metadata : defaultClaim;

	return defineAbility<AppAbility>((can, _) => {
		if (claims.admin) {
			can("manage", "all");
			can("read", "all");
		}

		for (const teamId of claims.roles.captain ?? []) {
			can("manage", "Team", teamId);
			can("read", "Team", teamId);
		}

		for (const teamId of claims.roles.member ?? []) {
			can("read", "Team", teamId);
		}
	});
}
