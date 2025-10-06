"use server";

import { PrismaClient } from "@/generated/prisma";
import { getUserId } from "@/lib/auth";
import { createClient } from "@/lib/supabase/server";
import { createSubmission as createSubmissionMutation } from "@/prisma/mutations/create-submission";
import { createSubmissionPayloadSchema } from "@/schemas/create-submission-payload-schema";
import { mapValues } from "remeda";
import "server-only";
import z from "zod";

type FormState =
	| {
			success: false;
			error: string;
			fields?: Record<string, string>;
			errors?: Record<string, string>;
	  }
	| { success: true; submissionId: number };

export async function createSubmission(
	_prevState: FormState,
	payload: FormData,
): Promise<FormState> {
	const supabase = await createClient();
	const submitted_by = await getUserId(supabase);

	if (!(payload instanceof FormData)) {
		return {
			success: false,
			error: "Invalid form data",
		};
	}

	const formData = Object.fromEntries(payload.entries());

	const parsed = createSubmissionPayloadSchema.safeParse(formData);

	if (!parsed.success) {
		const { properties = {} } = z.treeifyError(parsed.error);
		const fields: Record<string, string> = {};

		for (const key of Object.keys(formData)) {
			fields[key] = formData[key].toString();
		}

		return {
			success: false,
			fields,
			error: "",
			errors: mapValues(properties, (val) => val.errors[0]),
		};
	}

	const prismaClient = new PrismaClient();

	try {
		const result = await createSubmissionMutation(prismaClient)({
			...parsed.data,
			submitted_by,
		});

		return { success: true, submissionId: Number(result.id) };
	} catch {
		return {
			success: false,
			error: "Internal server error",
		};
	}
}
