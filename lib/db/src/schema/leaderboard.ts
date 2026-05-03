import { integer, pgTable, text, timestamp } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod/v4";

export const leaderboardEntries = pgTable("leaderboard_entries", {
  deviceId: text("device_id").primaryKey(),
  displayName: text("display_name").notNull(),
  xp: integer("xp").notNull().default(0),
  level: integer("level").notNull().default(1),
  streak: integer("streak").notNull().default(0),
  updatedAt: timestamp("updated_at", { withTimezone: false })
    .notNull()
    .defaultNow(),
});

export const insertLeaderboardEntrySchema = createInsertSchema(
  leaderboardEntries,
  {
    deviceId: (s) => s.min(8).max(128),
    displayName: (s) =>
      s
        .min(2)
        .max(24)
        .regex(/^[A-Za-z0-9_\- ]+$/),
    xp: (s) => s.int().min(0).max(10_000_000),
    level: (s) => s.int().min(1).max(1000),
    streak: (s) => s.int().min(0).max(10_000),
  },
).omit({ updatedAt: true });

export type InsertLeaderboardEntry = z.infer<
  typeof insertLeaderboardEntrySchema
>;
export type LeaderboardEntry = typeof leaderboardEntries.$inferSelect;
