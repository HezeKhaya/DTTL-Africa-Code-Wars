"use client";

import { getAbilities } from "@/lib/auth/get-abilities";
import {
	createContext,
	type PropsWithChildren,
	useContext,
	useMemo,
} from "react";

const AbilityContext = createContext<ReturnType<typeof getAbilities> | null>(
	null,
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

export const useAbilities = () => useContext(AbilityContext);
