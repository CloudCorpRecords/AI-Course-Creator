# Workspace

## Overview

pnpm workspace monorepo using TypeScript. Each package manages its own dependencies.

## Stack

- **Monorepo tool**: pnpm workspaces
- **Node.js version**: 24
- **Package manager**: pnpm
- **TypeScript version**: 5.9
- **API framework**: Express 5
- **Database**: PostgreSQL + Drizzle ORM
- **Validation**: Zod (`zod/v4`), `drizzle-zod`
- **API codegen**: Orval (from OpenAPI spec)
- **Build**: esbuild (CJS bundle)

## Key Commands

- `pnpm run typecheck` — full typecheck across all packages
- `pnpm run build` — typecheck + build all packages
- `pnpm --filter @workspace/api-spec run codegen` — regenerate API hooks and Zod schemas from OpenAPI spec
- `pnpm --filter @workspace/db run push` — push DB schema changes (dev only)
- `pnpm --filter @workspace/api-server run dev` — run API server locally
- `pnpm --filter @workspace/gamification test` — run the gamification engine unit tests (vitest)
- `pnpm --filter @workspace/masterclass-mobile typecheck` — typecheck the Expo mobile app

See the `pnpm-workspace` skill for workspace structure, TypeScript setup, and package details.

## Artifacts

- `artifacts/api-server` — Express API. Routes:
  - `GET /api/healthz`
  - `GET /api/leaderboard?limit=N&deviceId=…` — top N entries (sorted by `xp desc, updated_at asc`) plus the caller's `self` row + rank and `total` count.
  - `POST /api/leaderboard` — upsert the caller's score `{deviceId, displayName, xp, level, streak}`; returns the updated entry with current rank.
- `artifacts/masterclass` — React + Vite "Coding with AI" web masterclass.
- `artifacts/masterclass-mobile` — Expo React Native mobile companion.
  Mirrors the web course content (sourced from `@workspace/course-content`)
  with full gamification: XP, levels, daily streaks with one-day "freeze"
  protection, badges, end-of-lesson MCQ quizzes that gate completion (must
  ace, with retry-only-the-missed-questions support), animated celebration
  overlay with haptics, and an opt-in 7pm daily streak reminder via
  `expo-notifications`. Progress is persisted via AsyncStorage. Includes a
  global Leaderboard tab ("Ranks") backed by the API server: a debounced,
  retrying background sync pushes XP/level/streak updates whenever they
  change, with idle/syncing/synced/offline status surfaced in the UI. On
  the first XP gain a one-time display-name prompt collects the learner's
  name (editable later from Profile); identity = local display name +
  anonymous device id (no auth). The leaderboard screen lists the top 25
  with the caller's row highlighted and pinned at the bottom when outside
  the top N, plus pull-to-refresh.
- `artifacts/mockup-sandbox` — design canvas / component preview.

## Shared libraries

- `@workspace/course-content` (`lib/course-content`) — single source of truth
  for the masterclass curriculum: lesson types, all 6 modules, helpers
  (`findLesson`, `getPrevNextLesson`, `getQuizForLesson`, `getTotalLessons`),
  and per-lesson MCQ quizzes. Consumed by both the web and mobile artifacts.
- `@workspace/gamification` (`lib/gamification`) — pure XP/level/streak/badge
  engine with vitest unit tests. Consumed by the mobile app and the
  leaderboard backend.

## Database schema

- `leaderboard_entries` (`lib/db/src/schema/leaderboard.ts`): `device_id`
  PK, `display_name`, `xp`, `level`, `streak`, `updated_at`. Read by the
  leaderboard API; tie-break for equal XP is earlier `updated_at`.

## End-to-end tests

Run interactively via the testing skill (`runTest`). Coverage:
- **Web** (`artifacts/masterclass`): home → open lesson → mark complete →
  command palette search → navigate to result.
- **Mobile** (`artifacts/masterclass-mobile`, Expo web): browse modules →
  complete lesson quiz → display-name onboarding → Profile shows updated
  XP/level/streak/badges → Leaderboard tab shows self row highlighted and
  synced.
