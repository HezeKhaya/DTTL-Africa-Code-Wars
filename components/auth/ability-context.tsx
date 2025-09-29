"use client";

import { type AppAbility, getAbilities } from "@/lib/auth/get-abilities";
import { createMongoAbility } from "@casl/ability";
import type { JwtPayload } from "@supabase/supabase-js";
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
	claims: JwtPayload | undefined;
}>) {
	const ability = useMemo(() => getAbilities(claims), [claims]);
	return (
		<AbilityContext.Provider value={ability}>
			{children}
		</AbilityContext.Provider>
	);
}

export const useAbility = () => useContext(AbilityContext);
