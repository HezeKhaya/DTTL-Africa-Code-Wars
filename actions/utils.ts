import { PrismaClientKnownRequestError } from "@/generated/prisma/runtime/library";

export function isUniqueConstraintError(error: unknown) {
	return (
		error instanceof PrismaClientKnownRequestError &&
		error.message.includes("Unique constraint failed")
	);
}
