import { defineRecipe } from "@chakra-ui/react";

export const link = defineRecipe({
	variants: {
		variant: {
			unstyled: {
				color: "colorPalette.fg",
			},
		},
	},
});
