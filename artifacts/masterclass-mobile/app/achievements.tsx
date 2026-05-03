import { Feather } from "@expo/vector-icons";
import { Stack } from "expo-router";
import { ScrollView, Text, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { BADGES, type BadgeDef } from "@workspace/gamification";

import { useColors } from "@/hooks/useColors";
import { useGamification } from "@/context/GamificationContext";

export default function AchievementsScreen() {
  const colors = useColors();
  const insets = useSafeAreaInsets();
  const { badges, level, perfectQuizCount, streak, completedCount, totalLessons } =
    useGamification();
  const earned = new Set(badges);

  return (
    <View style={{ flex: 1, backgroundColor: colors.background }}>
      <Stack.Screen
        options={{
          headerTitle: "Achievements",
          headerStyle: { backgroundColor: colors.background },
          headerTintColor: colors.foreground,
        }}
      />
      <ScrollView
        contentContainerStyle={{
          paddingTop: 12,
          paddingBottom: insets.bottom + 32,
          paddingHorizontal: 18,
          gap: 18,
        }}
      >
        <View
          style={{
            backgroundColor: colors.card,
            borderRadius: colors.radius,
            borderWidth: 1,
            borderColor: colors.border,
            padding: 16,
            gap: 8,
          }}
        >
          <Text
            style={{
              color: colors.foreground,
              fontFamily: "Inter_700Bold",
              fontSize: 22,
            }}
          >
            {earned.size} / {BADGES.length} unlocked
          </Text>
          <View
            style={{ flexDirection: "row", flexWrap: "wrap", gap: 14 }}
          >
            <Stat label="Level" value={String(level.level)} />
            <Stat
              label="Lessons"
              value={`${completedCount}/${totalLessons}`}
            />
            <Stat
              label="Streak"
              value={`${streak.current}d (best ${streak.longest})`}
            />
            <Stat label="Perfect quizzes" value={String(perfectQuizCount)} />
          </View>
        </View>

        <View style={{ gap: 10 }}>
          {BADGES.map((b: BadgeDef) => {
            const isEarned = earned.has(b.id);
            return (
              <View
                key={b.id}
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  gap: 12,
                  backgroundColor: colors.card,
                  borderWidth: 1,
                  borderColor: isEarned ? colors.primary + "55" : colors.border,
                  borderRadius: colors.radius,
                  padding: 14,
                  opacity: isEarned ? 1 : 0.55,
                }}
              >
                <View
                  style={{
                    width: 44,
                    height: 44,
                    borderRadius: 22,
                    backgroundColor: isEarned
                      ? colors.primary + "22"
                      : colors.muted,
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <Text style={{ fontSize: 22 }}>{b.emoji}</Text>
                </View>
                <View style={{ flex: 1, gap: 2 }}>
                  <Text
                    style={{
                      color: colors.foreground,
                      fontFamily: "Inter_700Bold",
                      fontSize: 14.5,
                    }}
                  >
                    {b.title}
                  </Text>
                  <Text
                    style={{
                      color: colors.mutedForeground,
                      fontFamily: "Inter_400Regular",
                      fontSize: 12.5,
                      lineHeight: 18,
                    }}
                  >
                    {b.description}
                  </Text>
                </View>
                {isEarned ? (
                  <Feather name="check-circle" size={18} color={colors.success} />
                ) : (
                  <Feather name="lock" size={16} color={colors.mutedForeground} />
                )}
              </View>
            );
          })}
        </View>
      </ScrollView>
    </View>
  );
}

function Stat({ label, value }: { label: string; value: string }) {
  const colors = useColors();
  return (
    <View style={{ minWidth: 90, gap: 2 }}>
      <Text
        style={{
          color: colors.mutedForeground,
          fontFamily: "Inter_500Medium",
          fontSize: 11,
          letterSpacing: 0.5,
          textTransform: "uppercase",
        }}
      >
        {label}
      </Text>
      <Text
        style={{
          color: colors.foreground,
          fontFamily: "Inter_700Bold",
          fontSize: 16,
        }}
      >
        {value}
      </Text>
    </View>
  );
}
