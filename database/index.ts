import { getEnvironmentVariable } from "@/lib/get-environment-variable";
import { Kysely } from "kysely";
import { PostgresJSDialect } from "kysely-postgres-js";
import type { KyselifyDatabase } from "kysely-supabase";
import postgres from "postgres";
import type { Database } from "./database";

export const database = new Kysely<KyselifyDatabase<Database>>({
	dialect: new PostgresJSDialect({
		postgres: postgres({
			database: getEnvironmentVariable("DATABASE_NAME"),
			host: getEnvironmentVariable("DATABASE_HOST"),
			max: 10,
			port: Number.parseInt(getEnvironmentVariable("DATABASE_PORT"), 10),
			user: getEnvironmentVariable("DATABASE_USER"),
			password: getEnvironmentVariable("DATABASE_PASSWORD"),
		}),
	}),
});
