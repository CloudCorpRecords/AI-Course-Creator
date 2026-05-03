import { Feather } from "@expo/vector-icons";
import { Text, View } from "react-native";

import { BADGES, type BadgeDef } from "@workspace/gamification";

import { useColors } from "@/hooks/useColors";
import { useGamification } from "@/context/GamificationContext";

export function StreakWarningBanner() {
  const colors = useColors();
  const { streakAtRisk, streak } = useGamification();
  if (!streakAtRisk) return null;
  const freezesLeft = streak.freezesAvailable ?? 0;
  return (
    <View
      style={{
        flexDirection: "row",
        alignItems: "center",
        gap: 10,
        backgroundColor: colors.warning + "1f",
        borderColor: colors.warning + "55",
        borderWidth: 1,
        borderRadius: 12,
        padding: 12,
      }}
    >
      <Feather name="alert-triangle" size={18} color={colors.warning} />
      <View style={{ flex: 1, gap: 2 }}>
        <Text
          style={{
            color: colors.foreground,
            fontFamily: "Inter_700Bold",
            fontSize: 13.5,
          }}
        >
          Your {streak.current}-day streak is at risk
        </Text>
        <Text
          style={{
            color: colors.mutedForeground,
            fontFamily: "Inter_500Medium",
            fontSize: 12,
            lineHeight: 17,
          }}
        >
          {freezesLeft > 0
            ? `Finish a lesson today, or a streak freeze will protect it once.`
            : `Finish a lesson today to keep it alive — no freezes left.`}
        </Text>
      </View>
    </View>
  );
}

export function XPProgressCard() {
  const colors = useColors();
  const { xp, level } = useGamification();
  return (
    <View
      style={{
        backgroundColor: colors.card,
        borderRadius: colors.radius,
        borderWidth: 1,
        borderColor: colors.border,
        padding: 16,
        gap: 12,
      }}
    >
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <View style={{ gap: 2 }}>
          <Text
            style={{
              color: colors.mutedForeground,
              fontFamily: "Inter_600SemiBold",
              fontSize: 11,
              letterSpacing: 1,
              textTransform: "uppercase",
            }}
          >
            Level
          </Text>
          <Text
            style={{
              color: colors.foreground,
              fontFamily: "Inter_700Bold",
              fontSize: 32,
            }}
          >
            {level.level}
          </Text>
        </View>
        <View style={{ alignItems: "flex-end", gap: 2 }}>
          <Text
            style={{
              color: colors.mutedForeground,
              fontFamily: "Inter_600SemiBold",
              fontSize: 11,
              letterSpacing: 1,
              textTransform: "uppercase",
            }}
          >
            Total XP
          </Text>
          <Text
            style={{
              color: colors.primary,
              fontFamily: "Inter_700Bold",
              fontSize: 24,
            }}
          >
            {xp}
          </Text>
        </View>
      </View>
      <View style={{ gap: 6 }}>
        <View
          style={{
            height: 8,
            borderRadius: 4,
            backgroundColor: colors.border,
            overflow: "hidden",
          }}
        >
          <View
            style={{
              width: `${level.progress * 100}%`,
              height: 8,
              backgroundColor: colors.primary,
              borderRadius: 4,
            }}
          />
        </View>
        <Text
          style={{
            color: colors.mutedForeground,
            fontFamily: "Inter_500Medium",
            fontSize: 12,
          }}
        >
          {level.xpForNextLevel > 0
            ? `${level.xpForNextLevel} XP to Level ${level.level + 1}`
            : "Max level reached"}
        </Text>
      </View>
    </View>
  );
}

export function MiniStatRow() {
  const colors = useColors();
  const { streak, completedCount, totalLessons, badges } = useGamification();
  const stats: { icon: keyof typeof Feather.glyphMap; label: string; value: string; color: string }[] =
    [
      {
        icon: "zap",
        label: "Streak",
        value: `${streak.current}d`,
        color: "#f59e0b",
      },
      {
        icon: "book-open",
        label: "Lessons",
        value: `${completedCount}/${totalLessons}`,
        color: colors.primary,
      },
      {
        icon: "award",
        label: "Badges",
        value: `${badges.length}/${BADGES.length}`,
        color: colors.accent,
      },
    ];
  return (
    <View style={{ flexDirection: "row", gap: 10 }}>
      {stats.map((s) => (
        <View
          key={s.label}
          style={{
            flex: 1,
            backgroundColor: colors.card,
            borderRadius: colors.radius,
            borderWidth: 1,
            borderColor: colors.border,
            padding: 12,
            gap: 6,
          }}
        >
          <View style={{ flexDirection: "row", alignItems: "center", gap: 6 }}>
            <Feather name={s.icon} size={13} color={s.color} />
            <Text
              style={{
                color: colors.mutedForeground,
                fontFamily: "Inter_600SemiBold",
                fontSize: 11,
                textTransform: "uppercase",
                letterSpacing: 0.5,
              }}
            >
              {s.label}
            </Text>
          </View>
          <Text
            style={{
              color: colors.foreground,
              fontFamily: "Inter_700Bold",
              fontSize: 18,
            }}
          >
            {s.value}
          </Text>
        </View>
      ))}
    </View>
  );
}

export function BadgeGrid() {
  const colors = useColors();
  const { badges } = useGamification();
  const earned = new Set(badges);
  return (
    <View
      style={{
        flexDirection: "row",
        flexWrap: "wrap",
        gap: 10,
      }}
    >
      {BADGES.map((b: BadgeDef) => {
        const isEarned = earned.has(b.id);
        return (
          <View
            key={b.id}
            style={{
              width: "31%",
              backgroundColor: colors.card,
              borderRadius: colors.radius,
              borderWidth: 1,
              borderColor: isEarned ? colors.primary + "55" : colors.border,
              padding: 12,
              alignItems: "center",
              gap: 4,
              opacity: isEarned ? 1 : 0.45,
            }}
          >
            <Text style={{ fontSize: 28 }}>{b.emoji}</Text>
            <Text
              style={{
                color: colors.foreground,
                fontFamily: "Inter_600SemiBold",
                fontSize: 12,
                textAlign: "center",
              }}
              numberOfLines={1}
            >
              {b.title}
            </Text>
            <Text
              style={{
                color: colors.mutedForeground,
                fontFamily: "Inter_400Regular",
                fontSize: 10.5,
                textAlign: "center",
                lineHeight: 14,
              }}
              numberOfLines={2}
            >
              {b.description}
            </Text>
          </View>
        );
      })}
    </View>
  );
}
