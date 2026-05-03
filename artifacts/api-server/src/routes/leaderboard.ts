import { Router, type IRouter } from "express";
import { and, desc, eq, gt, or, sql } from "drizzle-orm";
import { db, leaderboardEntries } from "@workspace/db";
import {
  GetLeaderboardQueryParams,
  UpsertLeaderboardEntryBody,
} from "@workspace/api-zod";

const router: IRouter = Router();

interface ApiLeaderboardEntry {
  deviceId: string;
  displayName: string;
  xp: number;
  level: number;
  streak: number;
  rank: number;
  updatedAt: string;
}

function serialize(
  row: typeof leaderboardEntries.$inferSelect,
  rank: number,
): ApiLeaderboardEntry {
  return {
    deviceId: row.deviceId,
    displayName: row.displayName,
    xp: row.xp,
    level: row.level,
    streak: row.streak,
    rank,
    updatedAt: row.updatedAt.toISOString(),
  };
}

async function rankOf(deviceId: string): Promise<number | null> {
  const self = await db
    .select()
    .from(leaderboardEntries)
    .where(eq(leaderboardEntries.deviceId, deviceId))
    .limit(1);
  if (self.length === 0) return null;
  const row = self[0]!;
  // Rank = 1 + count of entries that strictly outrank this one. A row
  // outranks another if it has more XP, or equal XP with an earlier
  // updated_at timestamp (deterministic tie-break).
  const ahead = await db
    .select({ c: sql<number>`count(*)::int` })
    .from(leaderboardEntries)
    .where(
      or(
        gt(leaderboardEntries.xp, row.xp),
        and(
          eq(leaderboardEntries.xp, row.xp),
          sql`${leaderboardEntries.updatedAt} < ${row.updatedAt}`,
        ),
      ),
    );
  return (ahead[0]?.c ?? 0) + 1;
}

router.get("/leaderboard", async (req, res) => {
  const parsed = GetLeaderboardQueryParams.safeParse(req.query);
  if (!parsed.success) {
    res.status(400).json({ error: "invalid_query", detail: parsed.error.message });
    return;
  }
  const { deviceId, limit } = parsed.data;

  const rows = await db
    .select()
    .from(leaderboardEntries)
    .orderBy(desc(leaderboardEntries.xp), leaderboardEntries.updatedAt)
    .limit(limit);

  const entries: ApiLeaderboardEntry[] = rows.map((row, idx) =>
    serialize(row, idx + 1),
  );

  const totalRow = await db
    .select({ c: sql<number>`count(*)::int` })
    .from(leaderboardEntries);
  const total = totalRow[0]?.c ?? 0;

  let self: ApiLeaderboardEntry | null = null;
  if (deviceId) {
    const inTop = entries.find((e) => e.deviceId === deviceId);
    if (inTop) {
      self = inTop;
    } else {
      const found = await db
        .select()
        .from(leaderboardEntries)
        .where(eq(leaderboardEntries.deviceId, deviceId))
        .limit(1);
      if (found.length > 0) {
        const rank = (await rankOf(deviceId)) ?? entries.length + 1;
        self = serialize(found[0]!, rank);
      }
    }
  }

  res.json({ entries, self, total });
});

router.post("/leaderboard", async (req, res) => {
  const parsed = UpsertLeaderboardEntryBody.safeParse(req.body);
  if (!parsed.success) {
    res
      .status(400)
      .json({ error: "invalid_body", detail: parsed.error.message });
    return;
  }
  const { deviceId, displayName, xp, level, streak } = parsed.data;

  const [row] = await db
    .insert(leaderboardEntries)
    .values({
      deviceId,
      displayName,
      xp,
      level,
      streak,
    })
    .onConflictDoUpdate({
      target: leaderboardEntries.deviceId,
      set: {
        displayName,
        xp,
        level,
        streak,
        updatedAt: new Date(),
      },
    })
    .returning();

  if (!row) {
    res.status(500).json({ error: "upsert_failed" });
    return;
  }

  const rank = (await rankOf(deviceId)) ?? 1;
  res.json({ entry: serialize(row, rank) });
});

export default router;
