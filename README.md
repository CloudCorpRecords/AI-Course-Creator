# AI Coding Masterclass

**A complete course on building software with AI assistants, built and taught by Rene Turcios.**

This is the course I teach in live workshops, shipped as a real product: a web masterclass, a mobile companion app with full gamification (XP, levels, streaks, badges, quizzes, leaderboard), and the API behind them. Multi-module curriculum covering prompting, AI-assisted building workflows, and shipping real projects with tools like Replit, Cursor, and Claude.

If you are evaluating me for a Developer Relations, Applied AI, or Forward Deployed role, this repo is the teaching proof: curriculum design, lesson content, and the full-stack platform that delivers it.

**Stack:** TypeScript, React, Vite, Expo / React Native, Express 5, pnpm monorepo.

---

# AI Coding Masterclass — Workspace

A pnpm + TypeScript monorepo containing the **AI Coding Masterclass** — a
multi-module course on building software with AI assistants — together with
its supporting API and shared libraries.

## Artifacts

| Path | Kind | Description |
| --- | --- | --- |
| `artifacts/masterclass` | Web (React + Vite) | The public web masterclass: lesson sidebar, lesson pages, command-palette search, lesson completion. |
| `artifacts/masterclass-mobile` | Mobile (Expo / React Native) | Mobile companion that mirrors the web course content. Full gamification (XP, levels, daily streaks with one-day "freeze", badges, end-of-lesson MCQ quizzes, animated celebration overlay with haptics, opt-in 7pm streak reminder), persisted via AsyncStorage. Includes the global **Leaderboard** ("Ranks") tab. |
| `artifacts/api-server` | API (Express 5) | Backend for the leaderboard and other shared services. |
| `artifacts/mockup-sandbox` | Design | Component preview / canvas sandbox. |

## Shared libraries

- `@workspace/course-content` (`lib/course-content`) — single source of
  truth for the curriculum: lesson types, all 6 modules, helpers
  (`findLesson`, `getPrevNextLesson`, `getQuizForLesson`,
  `getTotalLessons`), and per-lesson MCQs. Used by both the web and
  mobile artifacts.
- `@workspace/gamification` (`lib/gamification`) — pure
  XP / level / streak / badge engine with vitest unit tests. Used by the
  mobile app and the leaderboard backend.
- `@workspace/db` (`lib/db`) — Drizzle ORM schema + client over Postgres.
- `@workspace/api-spec` (`lib/api-spec`) — OpenAPI source of truth.
- `@workspace/api-client-react` & `@workspace/api-zod` — generated clients
  and zod schemas (run via `pnpm --filter @workspace/api-spec run codegen`).

## Stack

- pnpm workspaces, Node.js 24, TypeScript 5.9
- Express 5 + PostgreSQL + Drizzle ORM
- `zod` (`zod/v4`) + `drizzle-zod`
- API codegen via Orval from the OpenAPI spec
- esbuild for backend bundling
- Expo SDK 54 + React Native (mobile)
- React + Vite (web)

## API

`artifacts/api-server` exposes:

- `GET /api/healthz` — health check.
- `GET /api/leaderboard?limit=N&deviceId=…` — top N entries (sorted by
  `xp desc, updated_at asc`) plus the caller's `self` row + rank and a
  `total` count.
- `POST /api/leaderboard` — upsert the caller's score
  `{deviceId, displayName, xp, level, streak}`; returns the entry with
  current rank.

Identity is intentionally **anonymous**: a local display name plus a
device-scoped id stored in AsyncStorage / localStorage. There is no
authentication.

### Database

- `leaderboard_entries` (`lib/db/src/schema/leaderboard.ts`):
  `device_id` (PK), `display_name`, `xp`, `level`, `streak`,
  `updated_at`. Tie-break for equal XP is the earlier `updated_at`.

Schema is applied via `drizzle-kit push` (no migration files committed
for app code, but `lib/db/drizzle/` contains the canonical generated
DDL for reference).

## Key commands

| Command | What it does |
| --- | --- |
| `pnpm install` | Install workspace dependencies. |
| `pnpm run typecheck` | Full typecheck across all packages. |
| `pnpm run build` | Typecheck + build all packages. |
| `pnpm --filter @workspace/api-spec run codegen` | Regenerate API hooks and zod schemas from `lib/api-spec/openapi.yaml`. |
| `pnpm --filter @workspace/db run push` | Push DB schema (dev only). |
| `pnpm --filter @workspace/api-server run dev` | Run the API server. |
| `pnpm --filter @workspace/masterclass run dev` | Run the web masterclass. |
| `pnpm --filter @workspace/masterclass-mobile run dev` | Run the Expo mobile app. |
| `pnpm --filter @workspace/gamification test` | Run the gamification engine unit tests (vitest). |
| `pnpm --filter @workspace/masterclass-mobile typecheck` | Typecheck the mobile app. |

### End-to-end tests

Playwright specs live in `tests/e2e/` with `playwright.config.ts` at the
repo root. They target `E2E_BASE_URL` (defaults to
`https://$REPLIT_DEV_DOMAIN`) and assume the dev workflows are running.

| Command | Coverage |
| --- | --- |
| `pnpm test:e2e` | Web + mobile (one-time: `pnpm exec playwright install chromium`). |
| `pnpm test:e2e:web` | `tests/e2e/web.spec.ts` — home → open lesson → mark complete → command-palette search → navigate to result. |
| `pnpm test:e2e:mobile` | `tests/e2e/mobile.spec.ts` — browse modules → complete a quiz → display-name onboarding → Profile shows updated XP/level/streak/badges → Achievements screen → Leaderboard self row highlighted and synced. |

## Repo layout

```
.
├── artifacts/
│   ├── api-server/           # Express API
│   ├── masterclass/          # Web app (React + Vite)
│   ├── masterclass-mobile/   # Mobile app (Expo)
│   └── mockup-sandbox/       # Component preview canvas
├── lib/
│   ├── api-client-react/     # Generated React Query hooks
│   ├── api-spec/             # OpenAPI source of truth
│   ├── api-zod/              # Generated zod schemas
│   ├── course-content/       # Shared curriculum
│   ├── db/                   # Drizzle schema + client
│   └── gamification/         # XP/level/streak/badge engine
├── tests/e2e/                # Playwright specs
├── playwright.config.ts
├── pnpm-workspace.yaml
└── replit.md                 # Workspace memory / agent notes
```

## License

MIT.
