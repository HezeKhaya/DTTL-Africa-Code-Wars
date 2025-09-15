import { signup } from "@/lib/auth-actions";
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

export function SignUpForm() {
	const errors: Record<string, { message: string }> = {};
	return (
		<Card.Root className="mx-auto max-w-sm">
			<CardHeader>
				<CardTitle className="text-xl">Sign Up</CardTitle>
				<CardDescription>
					Enter your information to create an account
				</CardDescription>
			</CardHeader>
			<CardBody>
				<form action="">
					<Stack>
						<Field.Root invalid={!!errors.firstName}>
							<Field.Label>First Name</Field.Label>
							<Input name="firstName" placeholder="Max" required />
							<Field.ErrorText>{errors.firstName?.message}</Field.ErrorText>
						</Field.Root>
						<Field.Root invalid={!!errors.lastName}>
							<Field.Label>First Name</Field.Label>
							<Input name="lastName" placeholder="Robinson" required />
							<Field.ErrorText>{errors.lastName?.message}</Field.ErrorText>
						</Field.Root>
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
						<Button formAction={signup} type="submit" className="w-full">
							Create an account
						</Button>
					</Stack>
				</form>
				<div className="mt-4 text-center text-sm">
					Already have an account?{" "}
					<Link href="/auth/login" className="underline">
						Sign in
					</Link>
				</div>
			</CardBody>
		</Card.Root>
	);
}
