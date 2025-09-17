"use client";
import { createClient } from "@/lib/supabase/client";
import type { User } from "@supabase/supabase-js";
import { useEffect, useState } from "react";

const UserGreetText = () => {
	const [user, setUser] = useState<User | null>(null);
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

	if (user !== null) {
		return (
			<header className="fixed left-0 top-0 flex w-full justify-center border-b border-gray-300 bg-gradient-to-b from-zinc-200 pb-6 pt-8 backdrop-blur-2xl dark:border-neutral-800 dark:bg-zinc-800/30 dark:from-inherit lg:static lg:w-auto  lg:rounded-xl lg:border lg:bg-gray-200 lg:p-4 lg:dark:bg-zinc-800/30">
				Welcome&nbsp;
				<code className="font-mono font-bold">
					{user.user_metadata.full_name ?? "user"}!
				</code>
			</header>
		);
	}
};

export default UserGreetText;
