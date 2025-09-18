"use server";

import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";

export async function signout() {
	const supabase = await createClient();
	const { error } = await supabase.auth.signOut();
	if (error) {
		console.log(error);
		redirect("/error");
	}

	redirect("/logout");
}

export async function signInWithGoogle() {
	const supabase = await createClient();

	const { data, error } = await supabase.auth.signInWithOAuth({
		provider: "google",
		options: {
			redirectTo:
				process.env.NEXT_PUBLIC_APP_URL &&
				`${process.env.NEXT_PUBLIC_APP_URL}/auth/callback?next=/teams`,
			queryParams: {
				access_type: "offline",
				prompt: "consent",
			},
		},
	});

	if (error) {
		console.error("Error signing in with Google:", error);
		redirect("/auth/error");
	}

	redirect(data.url);
}

export async function signInWithGitHub() {
	const supabase = await createClient();
	const { data, error } = await supabase.auth.signInWithOAuth({
		provider: "github",
		options: {
			redirectTo:
				process.env.NEXT_PUBLIC_APP_URL &&
				`${process.env.NEXT_PUBLIC_APP_URL}/auth/callback?next=/teams`,
			queryParams: {
				access_type: "offline",
				prompt: "consent",
			},
		},
	});

	if (error) {
		console.error("Error signing in with GitHub:", error);
		redirect("/auth/error");
	}

	redirect(data.url);
}
