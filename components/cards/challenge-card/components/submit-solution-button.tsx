"use client";

import { createSubmission } from "@/actions/challenge-actions";
import { ConfirmDialog } from "@/components/ui/confirm-dialog";
import { toaster } from "@/components/ui/toaster";
import { ChallengeLogic } from "@/domain/challenge-logic";
import { useBusy } from "@/hooks/use-busy";
import type { Challenge } from "@/prisma/types";
import { Button } from "@chakra-ui/react";
import { useRouter } from "next/navigation";
import { useState } from "react";

interface SubmitSolutionButtonProps {
	challenge: Challenge;
	teamId: string | undefined;
}

export function SubmitSolutionButton({
	challenge,
	teamId,
}: SubmitSolutionButtonProps) {
	const { isBusy: isSubmitting, withBusy } = useBusy();
	const [open, setOpen] = useState(false);
	const { refresh } = useRouter();

	const submitted =
		teamId && ChallengeLogic.isCompletedByTeam(teamId)(challenge);

	if (submitted) {
		return null;
	}

	return (
		<ConfirmDialog
			heading="Submit Solution"
			message="This will inform the event organiser that you are ready for your solution to be verified. Continue?"
			open={open}
			onOpenChange={(e) => setOpen(e.open)}
			loading={isSubmitting}
			loadingText="Submitting..."
			onConfirm={submitSolution}
		>
			<Button size="sm">Submit</Button>
		</ConfirmDialog>
	);

	async function submitSolution() {
		if (!teamId) {
			throw new Error("Cannot submit a solution if no team id is specified");
		}

		const result = await withBusy(
			createSubmission({
				challenge_id: challenge.id,
				team_id: teamId,
			}),
		);

		if (result.success) {
			setOpen(false);
			toaster.create({
				description: "Submission created",
				type: "success",
			});

			refresh();
		} else {
			toaster.create({
				description: `Submission failed: ${result.error}`,
				type: "error",
			});
		}
	}
}
