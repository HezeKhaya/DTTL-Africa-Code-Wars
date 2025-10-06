import {
	Button,
	type ButtonProps,
	CloseButton,
	Dialog,
	type DialogRootProps,
	Portal,
} from "@chakra-ui/react";
import type { ReactNode } from "react";

type ConfirmDialogProps = Pick<DialogRootProps, "open" | "onOpenChange"> &
	Pick<ButtonProps, "colorPalette" | "loading" | "loadingText"> & {
		children: ReactNode;
		heading: ReactNode | undefined;
		message: ReactNode;
		onConfirm: () => void;
		confirmLabel?: string;
	};

export function ConfirmDialog({
	children,
	heading,
	message,
	open,
	onOpenChange,
	colorPalette,
	loading,
	loadingText,
	onConfirm,
	confirmLabel = "Ok",
}: ConfirmDialogProps) {
	return (
		<Dialog.Root lazyMount open={open} onOpenChange={onOpenChange}>
			<Dialog.Trigger asChild>{children}</Dialog.Trigger>
			<Portal>
				<Dialog.Backdrop />
				<Dialog.Positioner>
					<Dialog.Content>
						{heading && (
							<Dialog.Header>
								<Dialog.Title>{heading}</Dialog.Title>
							</Dialog.Header>
						)}
						<Dialog.Body>{message}</Dialog.Body>
						<Dialog.Footer>
							<Dialog.ActionTrigger asChild>
								<Button disabled={loading} variant="outline">
									Cancel
								</Button>
							</Dialog.ActionTrigger>
							<Button
								colorPalette={colorPalette}
								loading={loading}
								loadingText={loadingText}
								onClick={onConfirm}
							>
								{confirmLabel}
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
}
