import type { Event, EventSubject, Team, TeamSubject } from "@/prisma/types";
import {
	AbilityBuilder,
	createMongoAbility,
	type InferSubjects,
	type MongoQuery,
	type PureAbility,
} from "@casl/ability";
import type { JwtPayload } from "@supabase/supabase-js";
import { z } from "zod";

const schema = z.object({
	app_metadata: z.object({
		admin: z.coerce.boolean(),
		roles: z
			.object({ captain: z.array(z.guid()), member: z.array(z.guid()) })
			.partial(),
	}),
});

export type AppClaim = z.infer<typeof schema>["app_metadata"];

const defaultClaim: AppClaim = {
	admin: false,
	roles: { captain: [], member: [] },
};

export type RawClaim = z.infer<typeof schema> | JwtPayload;

type SubjectUnion =
	| Event
	| EventSubject
	| Team
	| TeamSubject
	| "Event"
	| "Team";
export type AppSubjects = InferSubjects<SubjectUnion, true> | "all";
export type AppActions = "create" | "read" | "update" | "delete";
export type AppAbility = PureAbility<
	[AppActions, AppSubjects],
	MongoQuery<SubjectUnion>
>;

export const CRUDActions: AppActions[] = ["create", "read", "update", "delete"];

export function getAbilities(rawClaims: RawClaim | undefined): AppAbility {
	const isLoggedIn = !!rawClaims;

	const parseResult = schema.safeParse(rawClaims);

	const claims = parseResult.success
		? parseResult.data.app_metadata
		: defaultClaim;

	const { can, build } = new AbilityBuilder<AppAbility>(createMongoAbility);

	if (isLoggedIn) {
		can("create", "Team");
		can("read", "Event");
	}

	if (claims.admin) {
		can(CRUDActions, "Team");
		can(CRUDActions, "Event");
	}

	for (const teamId of claims.roles.captain ?? []) {
		can("read", "Team", { id: teamId });
		can("update", "Team", { id: teamId });
	}

	for (const teamId of claims.roles.member ?? []) {
		can("read", "Team", { id: teamId });
	}

	return build({
		detectSubjectType: (subject) => {
			if ((subject as Partial<Team>).event_id) {
				return "Team";
			} else if ((subject as Partial<Event>).start_date) {
				return "Event";
			}

			return "all";
		},
	});
}
