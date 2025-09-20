import { getEnvironmentVariable } from "@/lib/get-environment-variable";
import { Kysely } from "kysely";
import { PostgresJSDialect } from "kysely-postgres-js";
import type { KyselifyDatabase } from "kysely-supabase";
import postgres from "postgres";
import type { Database } from "./types";

export const database = new Kysely<KyselifyDatabase<Database>>({
	dialect: new PostgresJSDialect({
		postgres: postgres(getEnvironmentVariable("DATABASE_URL")),
	}),
});
