import { signInWithGitHub, signInWithGoogle } from "@/lib/auth-actions";
import {
	Button,
	Card,
	CardBody,
	CardDescription,
	CardHeader,
	CardTitle,
	Stack,
} from "@chakra-ui/react";

export function LoginForm() {
	return (
		<Card.Root>
			<CardHeader>
				<CardTitle>Login</CardTitle>
				<CardDescription>
					Select your preferred sign-in option below
				</CardDescription>
			</CardHeader>
			<CardBody>
				<Stack>
					<Button type="button" variant="outline" onClick={signInWithGoogle}>
						Login with Google
					</Button>
					<Button type="button" variant="outline" onClick={signInWithGitHub}>
						Login with GitHub
					</Button>
				</Stack>
			</CardBody>
		</Card.Root>
	);
}
