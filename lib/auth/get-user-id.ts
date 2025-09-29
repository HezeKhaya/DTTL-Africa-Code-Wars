import type { SupabaseClient } from "@supabase/supabase-js";

export async function getUserId(supabase: SupabaseClient) {
	const userResponse = await supabase.auth.getUser();

	if (userResponse.error) {
		throw new Error(userResponse.error.message);
	}

	return userResponse.data.user.id;
}
