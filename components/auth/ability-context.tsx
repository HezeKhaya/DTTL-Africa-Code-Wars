"use client";

import { type AppAbility, getAbilities } from "@/lib/auth/get-abilities";
import { createMongoAbility } from "@casl/ability";
import {
	createContext,
	type PropsWithChildren,
	useContext,
	useMemo,
} from "react";

const AbilityContext = createContext<AppAbility>(
	createMongoAbility<AppAbility>(),
);

export function AbilityProvider({
	claims,
	children,
}: PropsWithChildren<{
	claims: Record<string, unknown> | undefined;
}>) {
	const ability = useMemo(() => getAbilities(claims), [claims]);
	return (
		<AbilityContext.Provider value={ability}>
			{children}
		</AbilityContext.Provider>
	);
}

export const useAbility = () => useContext(AbilityContext);
