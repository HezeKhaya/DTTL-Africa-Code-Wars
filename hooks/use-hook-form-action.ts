import type { FormState } from "@/actions/types";
import { zodResolver } from "@hookform/resolvers/zod";
import {
	type FormEvent,
	startTransition,
	useActionState,
	useCallback,
	useEffect,
	useMemo,
	useRef,
} from "react";
import { type UseFormProps, useForm } from "react-hook-form";
import { entries, filter, fromEntries, merge, pipe } from "remeda";
import type { ZodObject, ZodRawShape } from "zod";
import type { $InferObjectInput, $InferObjectOutput } from "zod/v4/core";

interface HookFormActionOptions<
	TPayload extends ZodRawShape,
	TResult extends object,
	TContext = unknown,
	TSchema extends ZodObject<TPayload> = ZodObject<TPayload>,
> {
	schema: TSchema;
	action: (
		prevState: FormState<TSchema, TResult>,
		payload: FormData,
	) => Promise<FormState<TSchema, TResult>>;
	options: Omit<
		UseFormProps<
			$InferObjectInput<TPayload, {}>,
			TContext,
			$InferObjectOutput<TPayload, {}>
		>,
		"resolver"
	>;
	onSuccess?: (result: TResult) => void;
}

export const useHookFormAction = <
	TPayload extends ZodRawShape,
	TResult extends object,
	TContext = unknown,
>({
	schema,
	action,
	options,
	onSuccess,
}: HookFormActionOptions<TPayload, TResult, TContext>) => {
	const [actionState, formAction, isPending] = useActionState(action, {
		success: false,
		error: "",
	});
	const hookform = useForm({ ...options, resolver: zodResolver(schema) });

	useEffect(() => {
		if (onSuccess && actionState.success) {
			onSuccess(actionState);
		}
	}, [actionState, onSuccess]);

	const ref = useRef<HTMLFormElement>(null);

	const errors: Partial<Record<keyof TPayload, string>> = useMemo(
		() =>
			merge(
				pipe(
					hookform.formState.errors,
					entries,
					filter((_, val) => val !== undefined),
					fromEntries,
				),
				actionState.success ? {} : actionState.errors,
			),
		[actionState, hookform.formState],
	);

	const handleSubmit = useCallback(
		(e: FormEvent<HTMLFormElement>) => {
			e.preventDefault();
			hookform.handleSubmit(() => {
				startTransition(() =>
					formAction(new FormData(ref.current ?? undefined)),
				);
			})(e);
		},
		[formAction, hookform.handleSubmit],
	);

	return {
		...hookform,
		handleSubmit,
		errors,
		actionState,
		formAction,
		ref,
		isPending,
	};
};
