import type { Event } from "@/database/models";
import dayjs from "dayjs";
import isSameOrAfter from "dayjs/plugin/isSameOrAfter";
import { filter, firstBy, pipe, prop, sortBy, take } from "remeda";

dayjs.extend(isSameOrAfter);

const isUpcoming = (event: Event) => {
	const start = dayjs(event.start_date);
	return start.isAfter(dayjs(), "minute");
};

const isPast = (event: Event) => !isUpcoming(event);
const orderByStartDateDesc = sortBy<Event[]>([prop("start_date"), "desc"]);
const getPast = filter<Event[], boolean>(isPast);
const getUpcoming = filter<Event[], boolean>(isUpcoming);
const getEarliest = firstBy<Event[]>([(x) => dayjs(x.start_date), "desc"]);

export const getNext = (events: Event[]) =>
	pipe(events, getUpcoming, getEarliest);
export const getPastTen = (events: Event[]) =>
	pipe(events, getPast, orderByStartDateDesc, take(10));
