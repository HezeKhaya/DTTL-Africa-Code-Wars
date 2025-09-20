import type { Database } from "./types";

export type DatabaseType<T extends keyof Database["public"]["Tables"]> =
	Database["public"]["Tables"][T]["Row"];

export type Team = DatabaseType<"teams">;
export type Event = DatabaseType<"events">;
