"use client";

import { deleteChallenge } from "@/actions/challenge-actions";
import { Can } from "@/components/auth/can";
import { ConfirmDialog } from "@/components/ui/confirm-dialog";
import { toaster } from "@/components/ui/toaster";
import { useBusy } from "@/hooks/use-busy";
import type { Challenge } from "@/prisma/types";
import { IconButton } from "@chakra-ui/react";
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
			<ConfirmDialog
				heading="Delete Challenge"
				message="This will remove the challenge from the event. Continue?"
				open={open}
				onOpenChange={(e) => setOpen(e.open)}
				colorPalette="red"
				loading={isSubmitting}
				loadingText="Submitting..."
				onConfirm={handleDeleteChallenge}
			>
				<IconButton size="2xs" variant="outline">
					<LuTrash />
				</IconButton>
			</ConfirmDialog>
		</Can>
	);

	async function handleDeleteChallenge() {
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
