"use client";

import { deleteChallenge } from "@/actions/challenge-actions";
import { Can } from "@/components/auth/can";
import { toaster } from "@/components/ui/toaster";
import { useBusy } from "@/hooks/use-busy";
import type { Challenge } from "@/prisma/types";
import {
	Button,
	CloseButton,
	Dialog,
	IconButton,
	Portal,
} from "@chakra-ui/react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { LuTrash } from "react-icons/lu";

interface DeleteButtonProps {
	challenge: Challenge;
}

export function DeleteButton({ challenge }: DeleteButtonProps) {
	const { isBusy: isSubmitting, withBusy } = useBusy();
	const [open, setOpen] = useState(false);
	const { refresh } = useRouter();

	return (
		<Can I="update" a="Event">
			<Dialog.Root lazyMount open={open} onOpenChange={(e) => setOpen(e.open)}>
				<Dialog.Trigger asChild>
					<IconButton size="2xs" variant="outline">
						<LuTrash />
					</IconButton>
				</Dialog.Trigger>
				<Portal>
					<Dialog.Backdrop />
					<Dialog.Positioner>
						<Dialog.Content>
							<Dialog.Header>
								<Dialog.Title>Delete Challenge</Dialog.Title>
							</Dialog.Header>
							<Dialog.Body>
								This will remove the challenge from the event. Continue?
							</Dialog.Body>
							<Dialog.Footer>
								<Dialog.ActionTrigger asChild>
									<Button disabled={isSubmitting} variant="outline">
										Cancel
									</Button>
								</Dialog.ActionTrigger>
								<Button
									colorPalette="red"
									loading={isSubmitting}
									loadingText="Submitting..."
									onClick={submitSolution}
								>
									Delete
								</Button>
							</Dialog.Footer>
							<Dialog.CloseTrigger asChild>
								<CloseButton size="sm" />
							</Dialog.CloseTrigger>
						</Dialog.Content>
					</Dialog.Positioner>
				</Portal>
			</Dialog.Root>
		</Can>
	);

	async function submitSolution() {
		const result = await withBusy(deleteChallenge(challenge.id));

		if (result.success) {
			setOpen(false);
			toaster.create({
				description: "Challenge deleted",
				type: "success",
			});

			refresh();
		} else {
			toaster.create({
				description: `Delete failed: ${result.error}`,
				type: "error",
			});
		}
	}
}
