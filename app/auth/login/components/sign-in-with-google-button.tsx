"use client";

import { signInWithGoogle } from "@/lib/auth-actions";
import { Button } from "@chakra-ui/react";

const SignInWithGoogleButton = () => {
	return (
		<Button
			type="button"
			variant="outline"
			className="w-full"
			onClick={() => {
				signInWithGoogle();
			}}
		>
			Login with Google
		</Button>
	);
};

export default SignInWithGoogleButton;
