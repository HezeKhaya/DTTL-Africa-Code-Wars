import type { Event } from "@/prisma/types";
import { isPast } from "date-fns";
import { getHours, getMinutes, setHours, setMinutes } from "date-fns/fp";
import { filter, firstBy, pipe, piped, prop, sortBy, take } from "remeda";

const setTime = (source: Date) =>
	piped(setHours(getHours(source)), setMinutes(getMinutes(source)));

export const EventLogic = {
	isPast: <T extends Event>(event: T) => {
		const end = EventLogic.getEndDateTime(event);
		return isPast(end);
	},
	isUpcoming: <T extends Event>(event: T) => !EventLogic.isPast(event),
	getNextEvent: <T extends Event>(events: T[]) =>
		pipe(
			events,
			filter(EventLogic.isUpcoming),
			firstBy([prop("start_date"), "asc"]),
		),
	getPastEvents: <T extends Event>(events: T[]) =>
		pipe(
			events,
			filter(EventLogic.isPast),
			sortBy([prop("start_date"), "desc"]),
			take(10),
		),
	getStartDateTime: <T extends Event>({ start_date, start_time }: T) => {
		return setTime(start_time)(start_date);
	},
	getEndDateTime: <T extends Event>({ start_date, start_time }: T) => {
		return setTime(start_time)(start_date);
	},
};
