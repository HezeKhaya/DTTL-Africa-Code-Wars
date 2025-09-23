import type { Event } from "@/prisma/types";
import dayjs from "dayjs";
import { range } from "remeda";
import { afterAll, beforeAll, describe, expect, it, vi } from "vitest";
import { EventLogic } from "./event-logic";

describe("EventLogic", () => {
	const now = new Date(2025, 1, 1, 13, 0);

	const stubUpcomingEvent = {
		start_date: dayjs(now).add(1, "day").toDate(),
		end_time: new Date(0, 0, 0, 13, 30),
	} as unknown as Event;

	const stubFutureEvent = {
		start_date: dayjs(now).add(1, "day").toDate(),
		end_time: new Date(0, 0, 0, 14, 30),
	} as unknown as Event;

	const makePastEvent = (age: number) =>
		({
			id: age.toString(),
			start_date: dayjs(now).add(-Math.abs(age), "days").toDate(),
			end_time: new Date(0, 0, 0, 9, 30),
		}) as unknown as Event;

	const stubPastEvent = makePastEvent(1);

	beforeAll(() => {
		vi.setSystemTime(now);
	});

	afterAll(() => {
		vi.useRealTimers();
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
