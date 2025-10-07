"use client";

import { Can } from "@/components/auth/can";
import { CreateChallengeForm } from "@/components/forms/create-challenge-form";
import { CloseButton, Dialog, IconButton, Portal } from "@chakra-ui/react";
import { useState } from "react";
import { LuPlus } from "react-icons/lu";

interface AddButtonProps {
	eventId: string;
}

export function AddButton({ eventId }: AddButtonProps) {
	const [open, setOpen] = useState(false);
	return (
		<Can I="update" a="Event">
			<Dialog.Root lazyMount open={open} onOpenChange={(e) => setOpen(e.open)}>
				<Dialog.Trigger asChild>
					<IconButton size="2xs" variant="outline">
						<LuPlus />
					</IconButton>
				</Dialog.Trigger>
				<Portal>
					<Dialog.Backdrop />
					<Dialog.Positioner>
						<Dialog.Content>
							<Dialog.Header>
								<Dialog.Title>Add Challenge</Dialog.Title>
							</Dialog.Header>
							<Dialog.Body>
								<CreateChallengeForm eventId={eventId} onSuccess={hideDialog} />
							</Dialog.Body>
							<Dialog.CloseTrigger asChild>
								<CloseButton size="sm" />
							</Dialog.CloseTrigger>
						</Dialog.Content>
					</Dialog.Positioner>
				</Portal>
			</Dialog.Root>
		</Can>
	);

	function hideDialog() {
		setOpen(false);
	}
}
