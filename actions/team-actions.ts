"use server";

import { createTeamPayloadSchema } from "@/schemas/create-team-payload-schema";
import { mapValues } from "remeda";
import "server-only";
import z from "zod";

type FormState = {
	success: boolean;
	fields?: Record<string, string>;
	errors?: Record<string, string>;
};

export async function createTeamAction(
	prevState: FormState,
	payload: FormData,
): Promise<FormState> {
	console.log("payload received", payload);

	if (!(payload instanceof FormData)) {
		return {
			success: false,
			errors: { form: "Invalid form data" },
		};
	}

	const formData = Object.fromEntries(payload.entries());

	const parsed = createTeamPayloadSchema.safeParse(formData);

	if (!parsed.success) {
		const { properties = {} } = z.treeifyError(parsed.error);
		const fields: Record<string, string> = {};

		for (const key of Object.keys(formData)) {
			fields[key] = formData[key].toString();
		}

		return {
			success: false,
			fields,
			errors: mapValues(properties, (val) => val.errors[0]),
		};
	}

	console.log(parsed);

	return {
		success: true,
	};
}
