CREATE TABLE "leaderboard_entries" (
	"device_id" text PRIMARY KEY NOT NULL,
	"display_name" text NOT NULL,
	"xp" integer DEFAULT 0 NOT NULL,
	"level" integer DEFAULT 1 NOT NULL,
	"streak" integer DEFAULT 0 NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
