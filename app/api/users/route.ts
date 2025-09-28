import { getUsers } from "@/prisma/queries/get-users";
import { PrismaClient } from "@prisma/client";

export async function GET() {
	const prisma = new PrismaClient();

	const data = await getUsers(prisma)();

	return Response.json({ data });
}
