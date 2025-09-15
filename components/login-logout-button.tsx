"use client";
import { signout } from "@/lib/auth-actions";
import { createClient } from "@/lib/supabase/client";
import { Button } from "@chakra-ui/react";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

const LoginButton = () => {
	const [user, setUser] = useState<any>(null);
	const router = useRouter();
	const supabase = createClient();
	useEffect(() => {
		const fetchUser = async () => {
			const {
				data: { user },
			} = await supabase.auth.getUser();
			setUser(user);
		};
		fetchUser();
	}, [supabase.auth.getUser]);

	if (user) {
		return (
			<Button
				onClick={() => {
					signout();
					setUser(null);
				}}
			>
				Log out
			</Button>
		);
	}
	return (
		<Button
			variant="outline"
			onClick={() => {
				router.push("/auth/login");
			}}
		>
			Login
		</Button>
	);
};

export default LoginButton;
