import type { Database } from "./database";

export type Team = Database["public"]["Tables"]["teams"]["Row"] & {
	kind: "Team";
};
export type Event = Database["public"]["Tables"]["events"]["Row"] & {
	kind: "Event";
};
