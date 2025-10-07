"use server";

import { PrismaClient } from "@/generated/prisma";
import { getAbilities, getClaims, getUserId } from "@/lib/auth";
import { createClient } from "@/lib/supabase/server";
import {
	type CreateChallengePayload,
	createChallenge as createChallengeMutation,
	createChallengePayloadSchema,
} from "@/prisma/mutations/create-challenge";
import {
	type CreateSubmissionPayload,
	createSubmission as createSubmissionMutation,
} from "@/prisma/mutations/create-submission";
import { deleteChallenge as deleteChallengeMutation } from "@/prisma/mutations/delete-challenge";
import { getTeamUserNames } from "@/prisma/queries/get-team-user-names";
import { completeChallengesResponseSchema } from "@/schemas/codewars";
import { createSubmissionPayloadSchema } from "@/schemas/create-submission-payload-schema";
import ky from "ky";
import { flat, mapValues } from "remeda";
import z from "zod";
import type { FormState } from "./types";
import { isUniqueConstraintError } from "./utils";

export async function createSubmission(
	payload: Omit<CreateSubmissionPayload, "submitted_by">,
): Promise<
	| {
			success: false;
			error: string;
	  }
	| { success: true; submissionId: bigint }
> {
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
		const userNames = await getTeamUserNames(prismaClient)(parsed.data.team_id);

		const verified = await verifySubmission(userNames, payload);

		if (!verified) {
			return {
				success: false,
				error: "Could not find a team member who has submitted a solution",
			};
		}

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

		console.error(error);

		return {
			success: false,
			error: "Internal server error",
		};
	}
}

export async function createChallengeAction(
	_prevState: FormState<CreateChallengePayload, { challengeId: string }>,
	payload: FormData,
): Promise<FormState<CreateChallengePayload, { challengeId: string }>> {
	console.log(payload);
	if (!(payload instanceof FormData)) {
		return {
			success: false,
			error: "Invalid form data",
		};
	}

	const formData = Object.fromEntries(payload.entries());

	const parsed = createChallengePayloadSchema.safeParse(formData);

	if (!parsed.success) {
		const { properties = {} } = z.treeifyError(parsed.error);
		const fields: Record<string, string> = {};

		for (const key of Object.keys(formData)) {
			fields[key] = formData[key].toString();
		}

		return {
			success: false,
			error: "",
			errors: mapValues(properties, (val) => val.errors[0]),
		};
	}

	const challengeId = parsed.data.id;

	if (!(await verifyChallengeId(challengeId))) {
		return {
			success: false,
			error: `Could not find a Codewars challenge with ID '${challengeId}'`,
		};
	}

	const prismaClient = new PrismaClient();

	try {
		const result = await createChallengeMutation(prismaClient)(parsed.data);

		return { success: true, challengeId: result.id };
	} catch (error) {
		if (isUniqueConstraintError(error)) {
			return {
				success: false,
				error: "Challenge already exists",
			};
		}

		console.error(error);

		return {
			success: false,
			error: "Internal server error",
		};
	}
}

export async function deleteChallenge(
	id: string,
): Promise<{ success: true } | { success: false; error: string }> {
	const supabase = await createClient();
	const abilities = getAbilities(await getClaims(supabase));

	if (!abilities.can("update", "Event")) {
		return { success: false as const, error: "Unauthorised" };
	}

	const prismaClient = new PrismaClient();

	try {
		await deleteChallengeMutation(prismaClient)(id);

		return { success: true as const };
	} catch (error) {
		console.error(error);

		return {
			success: false as const,
			error: "Internal server error",
		};
	}
}

async function verifySubmission(
	userNames: string[],
	payload: Omit<CreateSubmissionPayload, "submitted_by">,
) {
	const getCompletedChallengeIds = userNames.map(async (userName) => {
		let page = 0;
		let totalPages = 1;
		let completedIds: string[] = [];

		do {
			const response = await ky.get<unknown>(
				`https://www.codewars.com/api/v1/users/${userName}/code-challenges/completed?page=${page}`,
			);
			const reponseJson = await response.json();
			const parsed = completeChallengesResponseSchema.parse(reponseJson);

			totalPages = parsed.totalPages;
			completedIds = [...completedIds, ...parsed.data.map((item) => item.id)];

			page++;
		} while (page < totalPages);

		return completedIds;
	});

	const completedChallengeIds = flat(
		await Promise.all(getCompletedChallengeIds),
	);

	const verified = completedChallengeIds.includes(payload.challenge_id);
	return verified;
}

async function verifyChallengeId(challengId: string) {
	const response = await ky.get<unknown>(
		`https://www.codewars.com/api/v1/code-challenges/${challengId}`,
	);

	return response.status === 200;
}
