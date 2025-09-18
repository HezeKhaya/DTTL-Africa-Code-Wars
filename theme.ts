import { createSystem, defaultConfig, defineConfig } from "@chakra-ui/react";
import * as recipes from "./recipes";

const config = defineConfig({
	theme: {
		recipes,
	},
});

export default createSystem(defaultConfig, config);
