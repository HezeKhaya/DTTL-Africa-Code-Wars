import type { Prisma } from "@/generated/prisma";

export type Event = Prisma.EventGetPayload<null>;
export type Team = Prisma.TeamGetPayload<null>;
export type Challenge = Prisma.ChallengeGetPayload<{
	include: { submissions: true };
}>;

export type TeamSubject = Pick<Team, "id" | "event_id">;
export type EventSubject = Pick<Event, "id" | "start_date">;
