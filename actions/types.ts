import type { ZodObject, ZodRawShape, z } from "zod";

export type FormState<
	TPayload extends ZodObject<ZodRawShape>,
	TResult extends object,
> =
	| {
			success: false;
			error: string;
			errors?: Partial<Record<keyof z.infer<TPayload>, string>>;
	  }
	| ({ success: true } & TResult);
