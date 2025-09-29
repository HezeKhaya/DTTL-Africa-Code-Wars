import type { SupabaseClient } from "@supabase/supabase-js";

export async function getClaims(supabase: SupabaseClient) {
	const claimCollection = await supabase.auth.getClaims();

	return claimCollection?.data?.claims;
}
