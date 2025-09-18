import { useLayoutEffect, useState } from "react";

export const useScroll = () => {
	const [scrollPosition, setScrollPosition] = useState(0);

	useLayoutEffect(() => {
		function handleScroll() {
			setScrollPosition(window.pageYOffset);
		}

		window.addEventListener("scroll", handleScroll);

		return () => {
			window.removeEventListener("scroll", handleScroll);
		};
	}, []);

	return scrollPosition;
};