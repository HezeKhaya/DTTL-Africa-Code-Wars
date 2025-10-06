"use client";

import { useMemo, useState } from "react";

export const useBoolean = (
	initial: boolean = false,
): [boolean, { on: () => void; off: () => void; toggle: () => void }] => {
	const [value, setValue] = useState(initial);
	const callbacks = useMemo(
		() => ({
			on: () => setValue(true),
			off: () => setValue(false),
			toggle: () => setValue((prev) => !prev),
		}),
		[],
	);

	return [value, callbacks];
};
