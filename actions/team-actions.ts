"use server";

import { PrismaClient } from "@/generated/prisma";
import { createTeam } from "@/prisma/mutations/create-team";
import { createTeamPayloadSchema } from "@/schemas/create-team-payload-schema";
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
	| { success: true; teamId: string };

export async function createTeamAction(
	_prevState: FormState,
	payload: FormData,
): Promise<FormState> {
	console.log("payload received", payload);

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
			fields,
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
