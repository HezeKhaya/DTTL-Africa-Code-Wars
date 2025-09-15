import { createBrowserClient } from "@supabase/ssr";
import { getSupabaseConfig } from "./utils";

export function createClient() {
	const config = getSupabaseConfig();

	return createBrowserClient(config.url, config.key);
}
