export type FormState<
	TPayload extends object,
	TResult extends object = Record<string, never>,
> =
	| {
			success: false;
			error: string;
			errors?: Partial<Record<keyof TPayload, string>>;
	  }
	| ({ success: true } & TResult);
