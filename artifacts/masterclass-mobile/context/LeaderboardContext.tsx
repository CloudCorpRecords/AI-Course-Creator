import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
  type ReactNode,
} from "react";

import {
  getOrCreateDeviceId,
  readDisplayName,
  writeDisplayName,
} from "@/lib/leaderboard";
import { useGamification } from "@/context/GamificationContext";

function resolveApiOrigin(): string {
  if (process.env.EXPO_PUBLIC_DOMAIN) {
    return `https://${process.env.EXPO_PUBLIC_DOMAIN}`;
  }
  if (typeof window !== "undefined" && window.location?.origin) {
    return window.location.origin;
  }
  return "http://localhost";
}

const API_BASE = `${resolveApiOrigin()}/api`;

export interface LeaderboardRow {
  deviceId: string;
  displayName: string;
  xp: number;
  level: number;
  streak: number;
  rank: number;
  updatedAt: string;
}

export interface LeaderboardSnapshot {
  entries: LeaderboardRow[];
  self: LeaderboardRow | null;
  total: number;
}

type SyncStatus = "idle" | "syncing" | "synced" | "offline";

interface LeaderboardValue {
  ready: boolean;
  deviceId: string | null;
  displayName: string | null;
  setDisplayName: (name: string) => Promise<void>;
  needsName: boolean;
  syncStatus: SyncStatus;
  lastError: string | null;
  fetchLeaderboard: (limit?: number) => Promise<LeaderboardSnapshot>;
}

const LeaderboardContext = createContext<LeaderboardValue | null>(null);

async function postEntry(payload: {
  deviceId: string;
  displayName: string;
  xp: number;
  level: number;
  streak: number;
}): Promise<void> {
  const res = await fetch(`${API_BASE}/leaderboard`, {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify(payload),
  });
  if (!res.ok) {
    const text = await res.text().catch(() => "");
    throw new Error(`HTTP ${res.status}: ${text || res.statusText}`);
  }
}

export function LeaderboardProvider({ children }: { children: ReactNode }) {
  const { ready: gameReady, xp, level, streak } = useGamification();
  const [deviceId, setDeviceId] = useState<string | null>(null);
  const [displayName, setDisplayNameState] = useState<string | null>(null);
  const [bootstrapped, setBootstrapped] = useState(false);
  const [syncStatus, setSyncStatus] = useState<SyncStatus>("idle");
  const [lastError, setLastError] = useState<string | null>(null);
  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const lastSentRef = useRef<string | null>(null);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      const id = await getOrCreateDeviceId();
      const name = await readDisplayName();
      if (cancelled) return;
      setDeviceId(id);
      setDisplayNameState(name);
      setBootstrapped(true);
    })();
    return () => {
      cancelled = true;
    };
  }, []);

  const submit = useCallback(
    async (
      payload: {
        deviceId: string;
        displayName: string;
        xp: number;
        level: number;
        streak: number;
      },
      attempt: number = 0,
    ): Promise<void> => {
      try {
        setSyncStatus("syncing");
        await postEntry(payload);
        lastSentRef.current = JSON.stringify(payload);
        setSyncStatus("synced");
        setLastError(null);
      } catch (err: unknown) {
        const message =
          err instanceof Error ? err.message : "Failed to sync score";
        if (attempt < 2) {
          await new Promise((r) => setTimeout(r, 500 * (attempt + 1)));
          return submit(payload, attempt + 1);
        }
        setSyncStatus("offline");
        setLastError(message);
      }
    },
    [],
  );

  // Background sync whenever score signals change.
  useEffect(() => {
    if (!bootstrapped || !gameReady) return;
    if (!deviceId || !displayName) return;
    if (xp <= 0) return;

    const payload = {
      deviceId,
      displayName,
      xp,
      level: level.level,
      streak: streak.current,
    };
    const serialized = JSON.stringify(payload);
    if (serialized === lastSentRef.current) return;

    if (debounceRef.current) clearTimeout(debounceRef.current);
    debounceRef.current = setTimeout(() => {
      submit(payload).catch(() => {});
    }, 400);
    return () => {
      if (debounceRef.current) clearTimeout(debounceRef.current);
    };
  }, [bootstrapped, gameReady, deviceId, displayName, xp, level.level, streak.current, submit]);

  const setDisplayName = useCallback(
    async (name: string) => {
      const trimmed = name.trim();
      await writeDisplayName(trimmed);
      setDisplayNameState(trimmed);
      // Force a fresh push after a name change.
      lastSentRef.current = null;
    },
    [],
  );

  const fetchLeaderboard = useCallback(
    async (limit: number = 25): Promise<LeaderboardSnapshot> => {
      const url = new URL(`${API_BASE}/leaderboard`);
      url.searchParams.set("limit", String(limit));
      if (deviceId) url.searchParams.set("deviceId", deviceId);
      const res = await fetch(url.toString());
      if (!res.ok) {
        throw new Error(`HTTP ${res.status}`);
      }
      const json = (await res.json()) as LeaderboardSnapshot;
      return {
        entries: json.entries ?? [],
        self: json.self ?? null,
        total: json.total ?? 0,
      };
    },
    [deviceId],
  );

  const value = useMemo<LeaderboardValue>(
    () => ({
      ready: bootstrapped,
      deviceId,
      displayName,
      setDisplayName,
      needsName: bootstrapped && !displayName,
      syncStatus,
      lastError,
      fetchLeaderboard,
    }),
    [
      bootstrapped,
      deviceId,
      displayName,
      setDisplayName,
      syncStatus,
      lastError,
      fetchLeaderboard,
    ],
  );

  return (
    <LeaderboardContext.Provider value={value}>
      {children}
    </LeaderboardContext.Provider>
  );
}

export function useLeaderboard(): LeaderboardValue {
  const ctx = useContext(LeaderboardContext);
  if (!ctx) {
    throw new Error("useLeaderboard must be used inside <LeaderboardProvider>");
  }
  return ctx;
}
