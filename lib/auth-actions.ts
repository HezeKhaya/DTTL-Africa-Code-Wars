"use server";

import { createClient } from "@/lib/supabase/server";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export async function login(formData: FormData) {
	const supabase = await createClient();

	// type-casting here for convenience
	// in practice, you should validate your inputs
	const data = {
		email: formData.get("email") as string,
		password: formData.get("password") as string,
	};

	const { error } = await supabase.auth.signInWithPassword(data);

	if (error) {
		redirect("/error");
	}

	revalidatePath("/", "layout");
	redirect("/");
}

export async function signup(formData: FormData) {
	const supabase = await createClient();

	// type-casting here for convenience
	// in practice, you should validate your inputs
	const firstName = formData.get("firstName") as string;
	const lastName = formData.get("lastName") as string;
	const data = {
		email: formData.get("email") as string,
		password: formData.get("password") as string,
		options: {
			data: {
				full_name: `${firstName} ${lastName}`,
				email: formData.get("email") as string,
			},
		},
	};

	const { error } = await supabase.auth.signUp(data);

	if (error) {
		redirect("/error");
	}

	revalidatePath("/", "layout");
	redirect("/");
}

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
				`${process.env.NEXT_PUBLIC_APP_URL}/auth/callback`,
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

	console.log("Google sign-in data:", data);
	redirect(data.url);
}

export async function signInWithGitHub(){
	const supabase = await createClient();
	const { data, error } = await supabase.auth.signInWithOAuth({
		provider: "github",
		options: {
			redirectTo:
				process.env.NEXT_PUBLIC_APP_URL &&
				`${process.env.NEXT_PUBLIC_APP_URL}/auth/callback`,
			queryParams: {
				access_type: "offline",
				prompt: "consent",
			},
		}
	});

	if (error) {
		console.error("Error signing in with GitHub:", error);
		redirect("/auth/error");
	}

	console.log("GitHub sign-in data:", data);
	redirect(data.url);
}
