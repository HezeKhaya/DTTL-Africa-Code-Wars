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
	const interval = { start: new Date(), end: reference };
	const { hours = 0, minutes = 0, seconds = 0 } = intervalToDuration(interval);

	const days = differenceInCalendarDays(interval.end, interval.start);

	return { days, hours, minutes, seconds };
}

function formatCountDown(countdown: Countdown) {
	const hours = String(countdown.hours ?? 0).padStart(2, "0");
	const minutes = String(countdown.minutes ?? 0).padStart(2, "0");
	const seconds = String(countdown.seconds ?? 0).padStart(2, "0");

	return `${countdown.days}d ${hours}:${minutes}:${seconds}`;
}
