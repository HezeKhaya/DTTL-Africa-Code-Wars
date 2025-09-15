export function getSupabaseConfig() {
	if (
		!process.env.NEXT_PUBLIC_SUPABASE_URL ||
		!process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_OR_ANON_KEY
	) {
		throw new Error(
			"Could not get Supabase config. One or more of the required environment variables is not set.",
		);
	}

	return {
		url: process.env.NEXT_PUBLIC_SUPABASE_URL,
		key: process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_OR_ANON_KEY,
	};
}
