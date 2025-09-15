import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { signup } from "@/lib/auth-actions";
import {
	Button,
	Card,
	CardBody,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@chakra-ui/react";
import Link from "next/link";

export function SignUpForm() {
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
					<div className="grid gap-4">
						<div className="grid grid-cols-2 gap-4">
							<div className="grid gap-2">
								<Label htmlFor="first-name">First name</Label>
								<Input
									name="first-name"
									id="first-name"
									placeholder="Max"
									required
								/>
							</div>
							<div className="grid gap-2">
								<Label htmlFor="last-name">Last name</Label>
								<Input
									name="last-name"
									id="last-name"
									placeholder="Robinson"
									required
								/>
							</div>
						</div>
						<div className="grid gap-2">
							<Label htmlFor="email">Email</Label>
							<Input
								name="email"
								id="email"
								type="email"
								placeholder="m@example.com"
								required
							/>
						</div>
						<div className="grid gap-2">
							<Label htmlFor="password">Password</Label>
							<Input name="password" id="password" type="password" />
						</div>
						<Button formAction={signup} type="submit" className="w-full">
							Create an account
						</Button>
					</div>
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
