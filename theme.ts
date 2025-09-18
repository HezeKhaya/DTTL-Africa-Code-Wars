import { createSystem, defaultConfig, defineConfig } from "@chakra-ui/react";
import { button } from "./recipes";

const config = defineConfig({
	theme: {
		recipes: { button },
	},
});

export default createSystem(defaultConfig, config);
