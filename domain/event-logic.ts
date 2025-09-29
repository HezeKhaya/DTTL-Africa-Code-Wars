import type { Event } from "@/prisma/types";
import dayjs from "dayjs";
import isSameOrAfter from "dayjs/plugin/isSameOrAfter";
import { filter, firstBy, pipe, prop, sortBy, take } from "remeda";

dayjs.extend(isSameOrAfter);

export const EventLogic = {
	isPast: <T extends Event>(event: T) => !EventLogic.isUpcoming(event),
	isUpcoming: <T extends Event>(event: T) => {
		const start = EventLogic.getStartDateTime(event);
		const now = dayjs(Date.now());
		return start > now;
	},
	getNextEvent: <T extends Event>(events: T[]) =>
		pipe(
			events,
			filter(EventLogic.isUpcoming),
			firstBy([prop("start_date"), "desc"]),
		),
	getPastEvents: <T extends Event>(events: T[]) =>
		pipe(
			events,
			filter(EventLogic.isPast),
			sortBy([prop("start_date"), "desc"]),
			take(10),
		),
	getStartDateTime: <T extends Event>({ start_date, end_time }: T) => {
		return dayjs(start_date)
			.startOf("day")
			.set("hours", end_time.getHours())
			.set("minutes", end_time.getMinutes());
	},
};
