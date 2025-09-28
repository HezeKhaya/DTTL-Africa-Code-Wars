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
import ky from "ky";
import { Controller, useForm } from "react-hook-form";

interface CreateTeamFormProps {
	eventId: string;
	userId: string;
	formId: string;
}

const frameworks = [
	{ label: "React", value: "react" },
	{ label: "Vue", value: "vue" },
	{ label: "Angular", value: "angular" },
	{ label: "Svelte", value: "svelte" },
	{ label: "Solid", value: "solid" },
	{ label: "Qwik", value: "qwik" },
	{ label: "Lit", value: "lit" },
	{ label: "Alpine", value: "alpine" },
];

export function CreateTeamForm({
	eventId,
	userId,
	formId,
}: CreateTeamFormProps) {
	const {
		register,
		handleSubmit,
		formState: { errors },
		control,
	} = useForm<CreateTeamPayload>({
		values: {
			event_id: eventId,
			captain_id: userId,
			name: "",
		},
	});

	const onSubmit = handleSubmit((data) => console.log(data));

	const { contains } = useFilter({ sensitivity: "base" });

	const { collection, filter } = useListCollection({
		initialItems: frameworks,
		filter: contains,
	});

	return (
		<form id={formId} onSubmit={onSubmit}>
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
									{(field.value ?? []).map((skill) => (
										<Badge key={skill}>{skill}</Badge>
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
		filter(details.inputValue);
	}
}
