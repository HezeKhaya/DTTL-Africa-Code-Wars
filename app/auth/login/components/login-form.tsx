import {
	Card,
	CardBody,
	CardDescription,
	CardHeader,
	CardTitle,
	Stack,
} from "@chakra-ui/react";
import SignInWithGoogleButton from "./sign-in-with-google-button";
import SignInWithGitHubButton from "./sign-in-with-github-button";

export function LoginForm() {
	return (
		<Card.Root className="mx-auto max-w-sm">
			<CardHeader>
				<CardTitle className="text-2xl">Login</CardTitle>
				<CardDescription>
					Select your preferred sign-in option below
				</CardDescription>
			</CardHeader>
			<CardBody>
				<Stack>
					<SignInWithGoogleButton />
					<SignInWithGitHubButton />
				</Stack>
			</CardBody>
		</Card.Root>
	);
}
