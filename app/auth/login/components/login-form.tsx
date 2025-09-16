import { login } from "@/lib/auth-actions";
import {
	Button,
	Card,
	CardBody,
	CardDescription,
	CardHeader,
	CardTitle,
	Field,
	Input,
	Stack,
} from "@chakra-ui/react";
import Link from "next/link";
import SignInWithGoogleButton from "./sign-in-with-google-button";
import SignInWithGitHubButton from "./sign-in-with-github-button";

export function LoginForm() {
	const errors: Record<string, { message: string }> = {};
	return (
		<Card.Root className="mx-auto max-w-sm">
			<CardHeader>
				<CardTitle className="text-2xl">Login</CardTitle>
				<CardDescription>
					Select your preferred sign-in option below
				</CardDescription>
			</CardHeader>
			<CardBody>
				<form action="">
					<Stack>
						<SignInWithGoogleButton />
						<SignInWithGitHubButton />
					</Stack>
				</form>
			</CardBody>
		</Card.Root>
	);
}
