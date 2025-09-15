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

export function LoginForm() {
	const errors: Record<string, { message: string }> = {};
	return (
		<Card.Root className="mx-auto max-w-sm">
			<CardHeader>
				<CardTitle className="text-2xl">Login</CardTitle>
				<CardDescription>
					Enter your email below to login to your account
				</CardDescription>
			</CardHeader>
			<CardBody>
				<form action="">
					<Stack>
						<Field.Root invalid={!!errors.email}>
							<Field.Label>Email</Field.Label>
							<Input
								name="email"
								type="email"
								placeholder="m@example.com"
								required
							/>
							<Field.ErrorText>{errors.email?.message}</Field.ErrorText>
						</Field.Root>
						<Field.Root invalid={!!errors.password}>
							<Field.Label>Password</Field.Label>
							<Input name="password" type="password" required />
							<Field.ErrorText>{errors.password?.message}</Field.ErrorText>
						</Field.Root>
						<Button type="submit" formAction={login} className="w-full">
							Login
						</Button>
						<SignInWithGoogleButton />
					</Stack>
				</form>
				<div className="mt-4 text-center text-sm">
					Don&apos;t have an account?{" "}
					<Link href="/auth/sign-up" className="underline">
						Sign up
					</Link>
				</div>
			</CardBody>
		</Card.Root>
	);
}
