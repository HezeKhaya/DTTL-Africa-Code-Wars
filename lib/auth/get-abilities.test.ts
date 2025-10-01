import type { Event, Team } from "@/prisma/types";
import { describe, expect, test } from "vitest";
import { CRUDActions, getAbilities, type RawClaim } from "./get-abilities";

describe("getAbilities", () => {
	const stubTeam = {
		id: "aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa",
		event_id: 1,
	} as unknown as Team;

	const stubOtherTeam = {
		id: "ffffffff-ffff-ffff-ffff-ffffffffffff",
		event_id: 1,
	} as unknown as Team;

	const stubEvent = {
		id: "ffffffff-ffff-ffff-ffff-ffffffffffff",
		start_date: new Date().toISOString(),
	} as unknown as Event;

	const stubAuthorizedClaims: RawClaim = {
		app_metadata: { admin: false, roles: {} },
	};

	const stubAdminClaims: RawClaim = {
		app_metadata: { admin: true, roles: {} },
	};

	const stubCaptainClaims: RawClaim = {
		app_metadata: { admin: false, roles: { captain: [stubTeam.id] } },
	};

	const stubMemberClaims: RawClaim = {
		app_metadata: { admin: false, roles: { member: [stubTeam.id] } },
	};

	test("is should prevent all actions for unauthorized users", () => {
		const result = getAbilities(undefined);

		for (const action of CRUDActions) {
			expect(result.can(action, "Event")).toBeFalsy();
			expect(result.can(action, "Team")).toBeFalsy();
		}
	});

	test("is should allow all actions for admin users", () => {
		const result = getAbilities(stubAdminClaims);

		for (const action of CRUDActions) {
			expect(result.can(action, "Event")).toBeTruthy();
			expect(result.can(action, "Team")).toBeTruthy();
		}
	});

	test("is should allow all actions on an object for admin users", () => {
		const result = getAbilities(stubAdminClaims);

		for (const action of CRUDActions) {
			expect(result.can(action, stubTeam)).toBeTruthy();
			expect(result.can(action, stubEvent)).toBeTruthy();
		}
	});

	test("is should allow read event for authorized users", () => {
		const result = getAbilities(stubAdminClaims);

		expect(result.can("read", "Event")).toBeTruthy();
	});

	test("is should allow create event for authorized users", () => {
		const result = getAbilities(stubAuthorizedClaims);

		expect(result.can("create", "Team")).toBeTruthy();
	});

	test("is should allow read team for captain and member", () => {
		const results = [
			getAbilities(stubCaptainClaims),
			getAbilities(stubMemberClaims),
		];

		for (const result of results) {
			expect(result.can("read", stubTeam)).toBeTruthy();
		}
	});

	test("is should prevent read other team for captain and member", () => {
		const results = [
			getAbilities(stubCaptainClaims),
			getAbilities(stubMemberClaims),
		];

		for (const result of results) {
			expect(result.can("read", stubOtherTeam)).toBeFalsy();
		}
	});

	test("is should allow update team for captain", () => {
		const result = getAbilities(stubCaptainClaims);

		expect(result.can("update", stubTeam)).toBeTruthy();
	});

	test("is should prevent update team for member", () => {
		const result = getAbilities(stubMemberClaims);

		expect(result.can("update", stubTeam)).toBeFalsy();
	});
});
