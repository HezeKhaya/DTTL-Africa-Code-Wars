"use client";

import { createChallengeAction } from "@/actions/challenge-actions";
import type { CreateChallengePayload } from "@/prisma/mutations/create-challenge";
import { getCodewarsChallenge } from "@/prisma/queries/get-codewars-challenge";
import {
	Button,
	ButtonGroup,
	Field,
	Group,
	IconButton,
	Input,
	Stack,
	Text,
} from "@chakra-ui/react";
import { useRouter } from "next/navigation";
import { type ChangeEvent, useActionState, useEffect, useState } from "react";
import { LuRefreshCcw } from "react-icons/lu";

interface CreateChallengeFormProps {
	eventId: string;
	onSuccess: () => void;
}

export function CreateChallengeForm({
	eventId,
	onSuccess,
}: CreateChallengeFormProps) {
	const [payload, setPayload] = useState<
		Omit<CreateChallengePayload, "event_id">
	>({ id: "", name: "", order: 1, level: 0, value: 0 });
	const [formState, formAction, isPending] = useActionState(
		createChallengeAction,
		{
			success: false,
			error: "",
		},
	);
	const router = useRouter();

	useEffect(() => {
		if (formState.success) {
			onSuccess();
		}
	}, [formState.success, onSuccess]);

	const errors = formState.success ? {} : (formState.errors ?? {});
	const error = formState.success ? "" : formState.error;

	const handleChange =
		(key: keyof CreateChallengePayload) => (e: ChangeEvent<HTMLInputElement>) =>
			setPayload((prev) => ({ ...prev, [key]: e.target.value }));

	async function handleSync() {
		if (!payload.id) {
			return;
		}

		try {
			const result = await getCodewarsChallenge(payload.id);
			setPayload((prev) => ({
				...prev,
				name: result.name,
				level: Math.abs(result.rank.id),
			}));
		} catch (error) {
			console.error(error);
		}
	}

	return (
		<Stack gap="4" align="stretch" asChild>
			<form action={formAction}>
				<Text>{JSON.stringify(errors)}</Text>
				<Input name="event_id" defaultValue={eventId} display="none" />
				<Field.Root invalid={!!errors.id}>
					<Field.Label>Challenge Id</Field.Label>
					<Group attached w="full">
						<Input
							name="id"
							flex={1}
							placeholder="Enter a challenge id"
							value={payload.id}
							onChange={handleChange("id")}
						/>
						<IconButton bg="bg.subtle" variant="outline">
							<LuRefreshCcw onClick={handleSync} />
						</IconButton>
					</Group>
					<Field.HelperText>
						After entering an id, click the refresh button to pull other fields
					</Field.HelperText>
					<Field.ErrorText>{errors.id}</Field.ErrorText>
				</Field.Root>
				<Field.Root invalid={!!errors.name}>
					<Field.Label>Challenge Name</Field.Label>
					<Input
						name="name"
						placeholder="Enter a challenge name"
						value={payload.name}
						onChange={handleChange("name")}
					/>
					<Field.ErrorText>{errors.name}</Field.ErrorText>
				</Field.Root>
				<Field.Root invalid={!!errors.order}>
					<Field.Label>Order</Field.Label>
					<Input
						type="number"
						name="order"
						placeholder="Challenge order"
						value={payload.order}
						onChange={handleChange("order")}
					/>
					<Field.ErrorText>{errors.order}</Field.ErrorText>
				</Field.Root>
				<Field.Root invalid={!!errors.level} readOnly>
					<Field.Label>Level</Field.Label>
					<Input
						type="number"
						name="level"
						placeholder="Challenge level"
						value={payload.level}
						onChange={handleChange("level")}
					/>
					<Field.ErrorText>{errors.level}</Field.ErrorText>
				</Field.Root>
				<Field.Root invalid={!!errors.value}>
					<Field.Label>Value</Field.Label>
					<Input
						type="number"
						name="value"
						placeholder="Scoring value"
						value={payload.value}
						onChange={handleChange("value")}
					/>
					<Field.ErrorText>{errors.value}</Field.ErrorText>
				</Field.Root>
				<Text>{error}</Text>

				{/* TODO: Add error text for general error */}

				<ButtonGroup flexDirection="row-reverse">
					<Button loading={isPending} type="submit">
						Create
					</Button>
					<Button disabled={isPending} onClick={router.back} variant="outline">
						Cancel
					</Button>
				</ButtonGroup>
			</form>
		</Stack>
	);
}
