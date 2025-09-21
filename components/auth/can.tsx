"use client";

import type { AppActions, AppSubjects } from "@/lib/auth/get-abilities";
import type { PropsWithChildren } from "react";
import { useAbility } from "./ability-context";

type CanProps = PropsWithChildren<
	{ I: AppActions } & ({ this: AppSubjects } | { a: "Team" | "Event" })
>;

export function Can({ I: action, children, ...rest }: CanProps) {
	const subject = "this" in rest ? rest.this : rest.a;
	const ability = useAbility();

	if (ability.can(action, subject)) {
		return children;
	}

	return null;
}
