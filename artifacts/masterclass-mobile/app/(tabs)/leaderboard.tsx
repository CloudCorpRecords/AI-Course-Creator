import { Feather } from "@expo/vector-icons";
import { useCallback, useEffect, useState } from "react";
import {
  ActivityIndicator,
  FlatList,
  Platform,
  Pressable,
  RefreshControl,
  Text,
  View,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { useColors } from "@/hooks/useColors";
import {
  useLeaderboard,
  type LeaderboardRow,
  type LeaderboardSnapshot,
} from "@/context/LeaderboardContext";

export default function LeaderboardScreen() {
  const colors = useColors();
  const insets = useSafeAreaInsets();
  const isWeb = Platform.OS === "web";
  const { fetchLeaderboard, deviceId, syncStatus, lastError, displayName } =
    useLeaderboard();

  const [snapshot, setSnapshot] = useState<LeaderboardSnapshot | null>(null);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const load = useCallback(async () => {
    try {
      setError(null);
      const snap = await fetchLeaderboard(25);
      setSnapshot(snap);
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Couldn't load leaderboard");
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  }, [fetchLeaderboard]);

  useEffect(() => {
    load();
  }, [load]);

  function onRefresh() {
    setRefreshing(true);
    load();
  }

  const top = snapshot?.entries ?? [];
  const self = snapshot?.self ?? null;
  const selfInTop = !!self && top.some((e) => e.deviceId === self.deviceId);

  return (
    <View style={{ flex: 1, backgroundColor: colors.background }}>
      <FlatList
        testID="leaderboard-list"
        data={top}
        keyExtractor={(item) => item.deviceId}
        contentContainerStyle={{
          paddingTop: (isWeb ? 67 : insets.top) + 12,
          paddingBottom: (isWeb ? 84 : insets.bottom + 84) + 32,
          paddingHorizontal: 18,
          gap: 8,
        }}
        ListHeaderComponent={
          <View style={{ marginBottom: 12, gap: 8 }}>
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              <Text
                style={{
                  color: colors.foreground,
                  fontFamily: "Inter_700Bold",
                  fontSize: 28,
                }}
              >
                Leaderboard
              </Text>
              <SyncBadge status={syncStatus} />
            </View>
            <Text
              style={{
                color: colors.mutedForeground,
                fontFamily: "Inter_500Medium",
                fontSize: 13,
              }}
            >
              {displayName
                ? `Playing as ${displayName}`
                : "Pick a name to appear on the board."}
            </Text>
            {error ? (
              <Text
                style={{
                  color: colors.destructive,
                  fontFamily: "Inter_500Medium",
                  fontSize: 12.5,
                }}
              >
                {error}
              </Text>
            ) : null}
            {!error && lastError && syncStatus === "offline" ? (
              <Text
                style={{
                  color: colors.warning,
                  fontFamily: "Inter_500Medium",
                  fontSize: 12,
                }}
              >
                Score sync offline. We'll retry automatically.
              </Text>
            ) : null}
          </View>
        }
        ListEmptyComponent={
          loading ? (
            <View style={{ paddingVertical: 64, alignItems: "center" }}>
              <ActivityIndicator color={colors.primary} />
            </View>
          ) : (
            <View
              style={{
                padding: 24,
                borderRadius: 14,
                borderWidth: 1,
                borderColor: colors.border,
                backgroundColor: colors.card,
                alignItems: "center",
                gap: 6,
              }}
            >
              <Feather name="award" size={28} color={colors.mutedForeground} />
              <Text
                style={{
                  color: colors.foreground,
                  fontFamily: "Inter_600SemiBold",
                  fontSize: 15,
                }}
              >
                No entries yet
              </Text>
              <Text
                style={{
                  color: colors.mutedForeground,
                  fontFamily: "Inter_400Regular",
                  fontSize: 13,
                  textAlign: "center",
                }}
              >
                Complete a lesson to put yourself on the board.
              </Text>
            </View>
          )
        }
        renderItem={({ item }) => (
          <Row
            row={item}
            highlight={!!deviceId && item.deviceId === deviceId}
          />
        )}
        ListFooterComponent={
          self && !selfInTop ? (
            <View style={{ marginTop: 18, gap: 6 }}>
              <Text
                style={{
                  color: colors.mutedForeground,
                  fontFamily: "Inter_600SemiBold",
                  fontSize: 11,
                  letterSpacing: 1,
                  textTransform: "uppercase",
                }}
              >
                Your rank
              </Text>
              <Row row={self} highlight />
            </View>
          ) : null
        }
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            tintColor={colors.primary}
          />
        }
      />
    </View>
  );
}

function SyncBadge({ status }: { status: string }) {
  const colors = useColors();
  const map: Record<string, { label: string; color: string }> = {
    idle: { label: "Idle", color: colors.mutedForeground },
    syncing: { label: "Syncing…", color: colors.accent },
    synced: { label: "Synced", color: colors.success },
    offline: { label: "Offline", color: colors.warning },
  };
  const { label, color } = map[status] ?? map.idle!;
  return (
    <View
      testID={`leaderboard-sync-${status}`}
      style={{
        flexDirection: "row",
        alignItems: "center",
        gap: 6,
        paddingHorizontal: 10,
        paddingVertical: 5,
        borderRadius: 999,
        backgroundColor: color + "22",
      }}
    >
      <View
        style={{
          width: 7,
          height: 7,
          borderRadius: 7,
          backgroundColor: color,
        }}
      />
      <Text
        style={{
          color,
          fontFamily: "Inter_600SemiBold",
          fontSize: 11,
        }}
      >
        {label}
      </Text>
    </View>
  );
}

function Row({ row, highlight }: { row: LeaderboardRow; highlight: boolean }) {
  const colors = useColors();
  return (
    <View
      testID={highlight ? "leaderboard-row-self" : `leaderboard-row-${row.rank}`}
      style={{
        flexDirection: "row",
        alignItems: "center",
        gap: 12,
        padding: 14,
        borderRadius: 14,
        borderWidth: 1,
        borderColor: highlight ? colors.primary : colors.border,
        backgroundColor: highlight ? colors.primary + "1f" : colors.card,
      }}
    >
      <View
        style={{
          width: 36,
          height: 36,
          borderRadius: 18,
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: row.rank <= 3 ? colors.primary + "33" : colors.muted,
        }}
      >
        <Text
          style={{
            color: row.rank <= 3 ? colors.primary : colors.foreground,
            fontFamily: "Inter_700Bold",
            fontSize: 14,
          }}
        >
          {row.rank}
        </Text>
      </View>
      <View style={{ flex: 1, gap: 2 }}>
        <Text
          numberOfLines={1}
          style={{
            color: colors.foreground,
            fontFamily: "Inter_700Bold",
            fontSize: 15,
          }}
        >
          {row.displayName}
          {highlight ? "  · You" : ""}
        </Text>
        <Text
          style={{
            color: colors.mutedForeground,
            fontFamily: "Inter_500Medium",
            fontSize: 12,
          }}
        >
          Lv {row.level} · {row.streak}d streak
        </Text>
      </View>
      <Text
        style={{
          color: colors.foreground,
          fontFamily: "Inter_700Bold",
          fontSize: 16,
        }}
      >
        {row.xp.toLocaleString()} XP
      </Text>
    </View>
  );
}
