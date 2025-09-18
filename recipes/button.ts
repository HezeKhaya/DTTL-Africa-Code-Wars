import { defineRecipe } from "@chakra-ui/react";

export const button = defineRecipe({
	variants: {
		size: {
			menu: {
				w: "2xs",
				h: "3xs",
				boxShadow: "md",
				borderRadius: "xl",
				display: "flex",
				flexDir: "column",
				gap: 4,
				transition: "all 0.2s ease-in-out",
				_hover: {
					boxShadow: "xl",
					transform: "translateY(-5px)",
				},
			},
		},
	},
});
