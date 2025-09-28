"use client";

import type { CreateTeamPayload } from "@/prisma/mutations/create-team";
import type { User } from "@/prisma/queries/get-users";
import {
	Badge,
	Combobox,
	Field,
	Input,
	Stack,
	useFilter,
	useListCollection,
	Wrap,
} from "@chakra-ui/react";
import { Controller, useForm } from "react-hook-form";
import { filter, find, map, pipe, prop, sortBy } from "remeda";

interface CreateTeamFormProps {
	eventId: string;
	userId: string;
	formId: string;
	availableTeamMembers: User[];
	onSubmit: (payload: CreateTeamPayload) => void;
}

export function CreateTeamForm({
	eventId,
	userId,
	formId,
	availableTeamMembers,
	onSubmit,
}: CreateTeamFormProps) {
	const {
		register,
		handleSubmit: handleHookFormSubmit,
		formState: { errors },
		control,
	} = useForm<CreateTeamPayload>({
		values: {
			event_id: eventId,
			captain_id: userId,
			name: "",
		},
	});

	const { contains } = useFilter({ sensitivity: "base" });

	const { collection, filter: filterCollection } = useListCollection({
		initialItems: toCollection(availableTeamMembers),
		filter: contains,
	});

	return (
		<form id={formId} onSubmit={handleSubmit}>
			<Stack gap="4" align="stretch" maxW="sm">
				<Field.Root invalid={!!errors.name}>
					<Field.Label>Team name</Field.Label>
					<Input
						{...register("name", {
							required: "Required",
							minLength: { value: 5, message: "At least 5 characters" },
						})}
					/>
					<Field.ErrorText>{errors.name?.message}</Field.ErrorText>
				</Field.Root>

				<Field.Root invalid={!!errors.member_ids}>
					<Field.Label>Team Members</Field.Label>
					<Controller
						control={control}
						name="member_ids"
						render={({ field }) => (
							<Combobox.Root
								multiple
								collection={collection}
								value={field.value ?? []}
								onValueChange={({ value }) => field.onChange(value)}
								onInputValueChange={handleInputChange}
								onInteractOutside={() => field.onBlur()}
								positioning={{ strategy: "fixed", hideWhenDetached: true }}
							>
								<Wrap gap="2">
									<Badge>{getUserName(userId)}</Badge>
									{(field.value ?? []).map((userId) => (
										<Badge key={userId}>{getUserName(userId)}</Badge>
									))}
								</Wrap>
								<Combobox.Control>
									<Combobox.Input placeholder="Select framework" />
									<Combobox.IndicatorGroup>
										<Combobox.ClearTrigger />
										<Combobox.Trigger />
									</Combobox.IndicatorGroup>
								</Combobox.Control>

								<Combobox.Positioner>
									<Combobox.Content>
										<Combobox.Empty>No frameworks found</Combobox.Empty>
										{collection.items.map((item) => (
											<Combobox.Item key={item.value} item={item}>
												{item.label}
												<Combobox.ItemIndicator />
											</Combobox.Item>
										))}
									</Combobox.Content>
								</Combobox.Positioner>
							</Combobox.Root>
						)}
					/>
					<Field.ErrorText>{errors.member_ids?.message}</Field.ErrorText>
				</Field.Root>
			</Stack>
		</form>
	);

	function handleInputChange(details: Combobox.InputValueChangeDetails) {
		filterCollection(details.inputValue);
	}

	function toCollection(users: User[]) {
		return pipe(
			users,
			filter((user) => user.full_name !== null && user.id !== userId),
			map((user) => ({ ...user, full_name: user.full_name ?? "" })),
			sortBy(prop("full_name")),
			map((user) => ({ label: user.full_name, value: user.id })),
		);
	}

	function getUserName(userId: string) {
		return find(availableTeamMembers, (user) => user.id === userId)?.full_name;
	}

	function handleSubmit() {
		handleHookFormSubmit(onSubmit);
	}
}
