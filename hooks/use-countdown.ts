import { differenceInCalendarDays, intervalToDuration } from "date-fns";
import { useEffect, useState } from "react";

type Countdown = {
	days: number;
	hours: number;
	minutes: number;
	seconds: number;
};

export const useCountDown = (referenceDate: Date) => {
	const [countdown, setCountdown] = useState(calculateRemaining(referenceDate));

	useEffect(() => {
		const countDownInterval = setInterval(() => {
			setCountdown(calculateRemaining(referenceDate));
		}, 1000);

		return () => clearInterval(countDownInterval);
	}, [referenceDate]);

	return { countdown, format: formatCountDown };
};

function calculateRemaining(reference: Date) {
	const start = new Date();

	if (start > reference) {
		return { days: 0, hours: 0, minutes: 0, seconds: 0, isComplete: true };
	}

	const interval = { start: new Date(), end: reference };
	const { hours = 0, minutes = 0, seconds = 0 } = intervalToDuration(interval);

	const days = Math.max(
		differenceInCalendarDays(interval.end, interval.start) - 1,
		0,
	);

	return { days, hours, minutes, seconds, isComplete: false };
}

function formatCountDown(countdown: Countdown) {
	const hours = String(countdown.hours ?? 0).padStart(2, "0");
	const minutes = String(countdown.minutes ?? 0).padStart(2, "0");
	const seconds = String(countdown.seconds ?? 0).padStart(2, "0");

	return `${countdown.days}d ${hours}:${minutes}:${seconds}`;
}
