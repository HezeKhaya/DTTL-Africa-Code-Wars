import type { Event } from "@/prisma/types";
import { afterEach, before, beforeEach } from "node:test";
import type * as DateFns from "date-fns";
import { addDays, isPast } from "date-fns";
import { range } from "remeda";
import { afterAll, beforeAll, describe, expect, it, vi } from "vitest";
import { EventLogic } from "./event-logic";

const now = new Date(2025, 1, 1, 13, 0);

vi.mock("date-fns", async (importOriginal: () => Promise<typeof DateFns>) => {
	const mod = await importOriginal();
	return {
		...mod,
		isPast: (date: string | number | Date) => new Date(date) < now,
	};
});

describe("EventLogic", () => {
	const stubUpcomingEvent = {
		start_date: addDays(now, 1),
		start_time: new Date(0, 0, 0, 11, 30),
		end_time: new Date(0, 0, 0, 13, 30),
	} as unknown as Event;

	const stubFutureEvent = {
		start_date: addDays(now, 5),
		start_time: new Date(0, 0, 0, 12, 30),
		end_time: new Date(0, 0, 0, 14, 30),
	} as unknown as Event;

	const makePastEvent = (daysAgo: number) =>
		({
			id: daysAgo.toString(),
			start_date: addDays(now, -daysAgo),
			start_time: new Date(0, 0, 0, 7, 30),
			end_time: new Date(0, 0, 0, 9, 30),
		}) as unknown as Event;

	const stubPastEvent = makePastEvent(1);

	beforeEach(() => {
		vi.useFakeTimers();
		vi.setSystemTime(now);
	});

	afterEach(() => {
		vi.useRealTimers();
		vi.clearAllMocks();
	});

	describe("test", () => {
		it("should set time of to the start_time", () => {
			expect(isPast(addDays(now, 1))).toBeFalsy();
		});
	});

	describe("isPast", () => {
		it("should return true if start date is in past", () => {
			const result = EventLogic.isPast(stubPastEvent);

			expect(result).toBeTruthy();
		});
		it("should return false if start date is in future", () => {
			const result = EventLogic.isPast(stubUpcomingEvent);

			expect(result).toBeFalsy();
		});
	});

	describe("isUpcoming", () => {
		it("should return false if start date is in past", () => {
			const result = EventLogic.isUpcoming(stubPastEvent);

			expect(result).toBeFalsy();
		});
		it("should return true if start date is in future", () => {
			const result = EventLogic.isUpcoming(stubUpcomingEvent);

			expect(result).toBeTruthy();
		});
	});

	describe("getNextEvent", () => {
		it("should return the next upcoming event", () => {
			const result = EventLogic.getNextEvent([
				stubPastEvent,
				stubUpcomingEvent,
			]);

			expect(result).toBe(stubUpcomingEvent);
		});
		it("should return the earliest upcoming event", () => {
			const result = EventLogic.getNextEvent([
				stubPastEvent,
				stubUpcomingEvent,
				stubFutureEvent,
			]);

			expect(result).toBe(stubUpcomingEvent);
		});
		it("should return null if all events are in the past", () => {
			const result = EventLogic.getNextEvent([stubPastEvent]);

			expect(result).toBeFalsy();
		});
	});

	describe("getNextEvent", () => {
		it("should return past events", () => {
			const result = EventLogic.getPastEvents([
				stubPastEvent,
				stubUpcomingEvent,
				stubFutureEvent,
			]);

			expect(result).toEqual([stubPastEvent]);
		});

		it("should return the earliest upcoming event", () => {
			const result = EventLogic.getPastEvents(range(0, 20).map(makePastEvent));

			expect(result).toHaveLength(10);
		});

		it("should order results", () => {
			const result = EventLogic.getPastEvents(range(0, 20).map(makePastEvent));

			result.map((item, index) => expect(item.id).toEqual(index.toString()));
		});
	});
});
