"use client";

import { createTeamAction } from "@/actions/team-actions";
import type { User } from "@/prisma/queries/get-users";
import {
	Button,
	ButtonGroup,
	Combobox,
	Field,
	Input,
	Stack,
	Tag,
	useFilter,
	useListCollection,
	Wrap,
} from "@chakra-ui/react";
import { useRouter } from "next/navigation";
import { useActionState, useEffect, useState } from "react";
import { LuCrown } from "react-icons/lu";
import { filter, find, map, pipe, prop, sortBy } from "remeda";

interface CreateTeamFormProps {
	eventId: string;
	userId: string;
	availableTeamMembers: User[];
}

export function CreateTeamForm({
	eventId,
	userId,
	availableTeamMembers,
}: CreateTeamFormProps) {
	const [formState, formAction, isPending] = useActionState(createTeamAction, {
		success: false,
		error: "",
	});
	const [selectedTeamMemberIds, setSelectedTeamMemberIds] = useState<string[]>(
		[],
	);
	const router = useRouter();

	useEffect(() => {
		if (formState.success) {
			router.push(`/events/${eventId}/teams/${formState.teamId}`);
		}
	}, [formState, eventId, router.push]);

	const errors = formState.success ? {} : (formState.errors ?? {});

	const { contains } = useFilter({ sensitivity: "base" });

	const { collection, filter: filterCollection } = useListCollection({
		initialItems: toCollection(availableTeamMembers),
		filter: contains,
	});

	// TODO: Test team submission
	return (
		<form action={formAction}>
			<Stack gap="4" align="stretch" maxW="sm">
				<Input name="event_id" defaultValue={eventId} display="none" />
				<Input name="captain_id" defaultValue={userId} display="none" />
				<Field.Root invalid={!!errors.name}>
					<Field.Label>Team Name</Field.Label>
					<Input name="name" placeholder="Enter a team name" />
					<Field.ErrorText>{errors.name}</Field.ErrorText>
				</Field.Root>
				<Field.Root invalid={!!errors.team_ids}>
					<Field.Label>Team Members</Field.Label>
					<Combobox.Root
						multiple
						collection={collection}
						onInputValueChange={handleInputChange}
						positioning={{ strategy: "fixed", hideWhenDetached: true }}
						value={selectedTeamMemberIds}
						onValueChange={handleValueChange}
						name="team_ids"
					>
						<Wrap gap="2">
							<Tag.Root>
								<Tag.Label>{getUserName(userId)}</Tag.Label>
								<Tag.EndElement>
									<LuCrown />
								</Tag.EndElement>
							</Tag.Root>
							{selectedTeamMemberIds.map((userId) => (
								<Tag.Root key={userId}>
									<Tag.Label>{getUserName(userId)}</Tag.Label>
									<Tag.EndElement>
										<Tag.CloseTrigger
											onClick={() => handleRemoveTeamMember(userId)}
										/>
									</Tag.EndElement>
								</Tag.Root>
							))}
						</Wrap>
						<Combobox.Control>
							<Combobox.Input placeholder="Add team members" />
							<Combobox.IndicatorGroup>
								<Combobox.Trigger />
							</Combobox.IndicatorGroup>
						</Combobox.Control>

						<Combobox.Positioner>
							<Combobox.Content>
								<Combobox.Empty>No eligible users found</Combobox.Empty>
								{collection.items.map((item) => (
									<Combobox.Item key={item.value} item={item}>
										{item.label}
										<Combobox.ItemIndicator />
									</Combobox.Item>
								))}
							</Combobox.Content>
						</Combobox.Positioner>
					</Combobox.Root>
					<Field.ErrorText>{errors.team_ids}</Field.ErrorText>
				</Field.Root>

				{/* TODO: Add error text for general error */}

				<ButtonGroup flexDirection="row-reverse">
					<Button loading={isPending} type="submit">
						Register
					</Button>
					<Button disabled={isPending} onClick={router.back} variant="outline">
						Cancel
					</Button>
				</ButtonGroup>
			</Stack>
		</form>
	);

	function handleValueChange(details: Combobox.ValueChangeDetails) {
		setSelectedTeamMemberIds(details.value);
	}

	function handleInputChange(details: Combobox.InputValueChangeDetails) {
		filterCollection(details.inputValue);
	}

	function handleRemoveTeamMember(idToRemove: string) {
		setSelectedTeamMemberIds((previous) =>
			previous.filter((id) => id !== idToRemove),
		);
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
}
