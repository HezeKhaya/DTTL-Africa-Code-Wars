"use server";

import { PrismaClient } from "@/generated/prisma";
import {
	type CreateTeamPayload,
	createTeam,
	createTeamPayloadSchema,
} from "@/prisma/mutations/create-team";
import { mapValues } from "remeda";
import "server-only";
import z from "zod";
import type { FormState } from "./types";

export async function createTeamAction(
	_prevState: FormState<CreateTeamPayload, { teamId: string }>,
	payload: FormData,
): Promise<FormState<CreateTeamPayload, { teamId: string }>> {
	if (!(payload instanceof FormData)) {
		return {
			success: false,
			error: "Invalid form data",
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
			error: "",
			errors: mapValues(properties, (val) => val.errors[0]),
		};
	}

	const prismaClient = new PrismaClient();

	try {
		const result = await createTeam(prismaClient)(parsed.data);

		return { success: true, teamId: result.id };
	} catch {
		return {
			success: false,
			error: "Internal server error",
		};
	}
}
