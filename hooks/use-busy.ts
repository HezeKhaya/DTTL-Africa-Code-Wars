"use client";

import { useCallback } from "react";
import { useBoolean } from "./use-boolean";

export type useBusyReturnValue = {
	isBusy: boolean;
	withBusy: <T>(action: Promise<T>) => Promise<T>;
};

/**
 * Custom hook for managing busy state
 *
 * @param initial - The initial value for the busy state.
 * @return An object containing the busy state and related functions.
 * ```json
 *  {
 *    isBusy: a boolean indicating whether the component is busy or not,
 *    withBusy: a function that takes an async action and wraps it to set the busy state to true while the action is being performed,
 *    BusyButton: a component that renders a button with a spinner that is displayed when the component is busy,
 *  }
 * ```
 */
export const useBusy = (initial = false): useBusyReturnValue => {
	const [isBusy, { on, off }] = useBoolean(initial);

	const withBusy = useCallback(
		async <T>(action: Promise<T>) => {
			try {
				on();
				return await action;
			} finally {
				off();
			}
		},
		[off, on],
	);

	return { isBusy, withBusy };
};
