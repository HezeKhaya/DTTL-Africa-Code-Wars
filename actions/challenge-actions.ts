"use server";

import { PrismaClient } from "@/generated/prisma";
import { getUserId } from "@/lib/auth";
import { createClient } from "@/lib/supabase/server";
import {
	type CreateSubmissionPayload,
	createSubmission as createSubmissionMutation,
} from "@/prisma/mutations/create-submission";
import { createSubmissionPayloadSchema } from "@/schemas/create-submission-payload-schema";
import { isUniqueConstraintError } from "./utils";

type CreateSubmissionResult =
	| {
			success: false;
			error: string;
	  }
	| { success: true; submissionId: bigint };

export async function createSubmission(
	payload: Omit<CreateSubmissionPayload, "submitted_by">,
): Promise<CreateSubmissionResult> {
	const supabase = await createClient();
	const submitted_by = await getUserId(supabase);

	const parsed = createSubmissionPayloadSchema.safeParse(payload);

	if (!parsed.success) {
		return {
			success: false,
			error: parsed.error.issues[0].message,
		};
	}

	const prismaClient = new PrismaClient();

	try {
		const result = await createSubmissionMutation(prismaClient)({
			...parsed.data,
			submitted_by,
		});

		return { success: true, submissionId: result.id };
	} catch (error) {
		if (isUniqueConstraintError(error)) {
			return {
				success: false,
				error: "Already submitted",
			};
		}

		return {
			success: false,
			error: "Internal server error",
		};
	}
}
