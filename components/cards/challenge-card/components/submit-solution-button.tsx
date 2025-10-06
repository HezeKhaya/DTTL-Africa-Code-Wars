"use client";

import { createSubmission } from "@/actions/challenge-actions";
import { toaster } from "@/components/ui/toaster";
import { ChallengeLogic } from "@/domain/challenge-logic";
import { useBusy } from "@/hooks/use-busy";
import type { Challenge } from "@/prisma/types";
import { Button, CloseButton, Dialog, Portal } from "@chakra-ui/react";
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

	const submitted =
		teamId && ChallengeLogic.isCompletedByTeam(teamId)(challenge);

	if (submitted) {
		return null;
	}

	return (
		<Dialog.Root lazyMount open={open} onOpenChange={(e) => setOpen(e.open)}>
			<Dialog.Trigger asChild>
				<Button size="sm">Submit</Button>
			</Dialog.Trigger>
			<Portal>
				<Dialog.Backdrop />
				<Dialog.Positioner>
					<Dialog.Content>
						<Dialog.Header>
							<Dialog.Title>Submit Solution</Dialog.Title>
						</Dialog.Header>
						<Dialog.Body>
							This will inform the event organiser that you are ready for your
							solution to be verified. Continue?
						</Dialog.Body>
						<Dialog.Footer>
							<Dialog.ActionTrigger asChild>
								<Button disabled={isSubmitting} variant="outline">
									Cancel
								</Button>
							</Dialog.ActionTrigger>
							<Button
								loading={isSubmitting}
								loadingText="Submitting..."
								onClick={submitSolution}
							>
								Ok
							</Button>
						</Dialog.Footer>
						<Dialog.CloseTrigger asChild>
							<CloseButton size="sm" />
						</Dialog.CloseTrigger>
					</Dialog.Content>
				</Dialog.Positioner>
			</Portal>
		</Dialog.Root>
	);

	async function submitSolution() {
		if (!teamId) {
			throw new Error("Cannot submit a solution if no team id is specified");
		}

		const result = await withBusy(
			createSubmission({ challenge_id: challenge.id, team_id: teamId }),
		);

		if (result.success) {
			setOpen(false);
			toaster.create({
				description: "Submission created",
				type: "success",
			});
		} else {
			toaster.create({
				description: `Submission failed: ${result.error}`,
				type: "error",
			});
		}
	}
}
