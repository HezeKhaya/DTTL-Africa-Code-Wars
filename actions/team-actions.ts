"use server";

import { PrismaClient } from "@/generated/prisma";
import { createTeam } from "@/prisma/mutations/create-team";
import { createTeamPayloadSchema } from "@/schemas/create-team-payload-schema";
import { mapValues } from "remeda";
import "server-only";
import z from "zod";
import type { FormState } from "./types";

export async function createTeamAction(
	_prevState: FormState<typeof createTeamPayloadSchema, { teamId: string }>,
	payload: FormData,
): Promise<FormState<typeof createTeamPayloadSchema, { teamId: string }>> {
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
