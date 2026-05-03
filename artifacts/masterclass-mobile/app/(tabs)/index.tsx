import { Feather } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { Link, useRouter } from "expo-router";
import { Platform, Pressable, ScrollView, Text, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { course, findLesson, type Module } from "@workspace/course-content";

import {
  MiniStatRow,
  StreakWarningBanner,
  XPProgressCard,
} from "@/components/Stats";
import { useColors } from "@/hooks/useColors";
import { useGamification } from "@/context/GamificationContext";

export default function HomeScreen() {
  const colors = useColors();
  const insets = useSafeAreaInsets();
  const router = useRouter();
  const {
    lastVisitedLesson,
    completedCount,
    totalLessons,
    streak,
    isCompleted,
  } = useGamification();

  const isWeb = Platform.OS === "web";
  const allLessons = course.modules.flatMap((m: Module) =>
    m.lessons.map((l) => ({
      ...l,
      moduleNumber: m.number,
      moduleTitle: m.title,
    })),
  );
  const continueLesson = lastVisitedLesson
    ? findLesson(lastVisitedLesson)
    : null;
  const nextLesson =
    continueLesson ??
    {
      module: course.modules[0]!,
      lesson: allLessons.find((l) => !isCompleted(l.id)) ?? allLessons[0]!,
    };

  const moduleProgress = course.modules.map((m: Module) => {
    const done = m.lessons.filter((l) => isCompleted(l.id)).length;
    return { module: m, done, total: m.lessons.length };
  });

  return (
    <ScrollView
      style={{ flex: 1, backgroundColor: colors.background }}
      contentContainerStyle={{
        paddingTop: (isWeb ? 67 : insets.top) + 16,
        paddingBottom: (isWeb ? 84 : insets.bottom + 84) + 24,
        paddingHorizontal: 18,
        gap: 18,
      }}
    >
      <View style={{ gap: 4 }}>
        <Text
          style={{
            color: colors.mutedForeground,
            fontFamily: "Inter_500Medium",
            fontSize: 13,
          }}
        >
          {streak.current > 0
            ? `🔥 ${streak.current}-day streak — keep it going`
            : "Start your streak today"}
        </Text>
        <Text
          style={{
            color: colors.foreground,
            fontFamily: "Inter_700Bold",
            fontSize: 28,
            lineHeight: 34,
          }}
        >
          Coding with AI
        </Text>
        <Text
          style={{
            color: colors.mutedForeground,
            fontFamily: "Inter_400Regular",
            fontSize: 14,
          }}
        >
          {completedCount} of {totalLessons} lessons complete
        </Text>
      </View>

      <StreakWarningBanner />

      <Pressable
        onPress={() =>
          router.push({
            pathname: "/lesson/[id]",
            params: { id: nextLesson.lesson.id },
          })
        }
        style={({ pressed }) => ({
          borderRadius: 18,
          overflow: "hidden",
          opacity: pressed ? 0.92 : 1,
        })}
      >
        <LinearGradient
          colors={[colors.primary, "#06b6d4"]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={{ padding: 18, gap: 10 }}
        >
          <Text
            style={{
              color: "#fff",
              fontFamily: "Inter_600SemiBold",
              fontSize: 11,
              letterSpacing: 1,
              textTransform: "uppercase",
              opacity: 0.9,
            }}
          >
            {continueLesson ? "Continue learning" : "Start here"}
          </Text>
          <Text
            style={{
              color: "#fff",
              fontFamily: "Inter_700Bold",
              fontSize: 20,
              lineHeight: 26,
            }}
          >
            {nextLesson.lesson.title}
          </Text>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
              marginTop: 4,
            }}
          >
            <Text
              style={{
                color: "rgba(255,255,255,0.9)",
                fontFamily: "Inter_500Medium",
                fontSize: 13,
              }}
            >
              Module {nextLesson.module.number} ·{" "}
              {nextLesson.lesson.estimatedMinutes} min
            </Text>
            <View
              style={{
                width: 40,
                height: 40,
                borderRadius: 20,
                backgroundColor: "rgba(255,255,255,0.2)",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Feather name="play" size={18} color="#fff" />
            </View>
          </View>
        </LinearGradient>
      </Pressable>

      <XPProgressCard />
      <MiniStatRow />

      <View style={{ gap: 10 }}>
        <Text
          style={{
            color: colors.foreground,
            fontFamily: "Inter_700Bold",
            fontSize: 18,
          }}
        >
          Modules
        </Text>
        {moduleProgress.map(
          ({
            module,
            done,
            total,
          }: {
            module: Module;
            done: number;
            total: number;
          }) => {
            const pct = total === 0 ? 0 : done / total;
            return (
              <Link
                key={module.id}
                href={{
                  pathname: "/(tabs)/learn",
                  params: { focus: module.id },
                }}
                asChild
              >
                <Pressable
                  style={({ pressed }) => ({
                    backgroundColor: colors.card,
                    borderRadius: colors.radius,
                    borderWidth: 1,
                    borderColor: colors.border,
                    padding: 14,
                    gap: 8,
                    opacity: pressed ? 0.9 : 1,
                  })}
                >
                  <View
                    style={{
                      flexDirection: "row",
                      justifyContent: "space-between",
                      alignItems: "flex-start",
                      gap: 12,
                    }}
                  >
                    <View style={{ flex: 1, gap: 2 }}>
                      <Text
                        style={{
                          color: colors.primary,
                          fontFamily: "Inter_700Bold",
                          fontSize: 11,
                          letterSpacing: 1,
                          textTransform: "uppercase",
                        }}
                      >
                        Module {module.number}
                      </Text>
                      <Text
                        style={{
                          color: colors.foreground,
                          fontFamily: "Inter_600SemiBold",
                          fontSize: 15,
                          lineHeight: 21,
                        }}
                      >
                        {module.title}
                      </Text>
                    </View>
                    <Text
                      style={{
                        color: colors.mutedForeground,
                        fontFamily: "Inter_500Medium",
                        fontSize: 12,
                      }}
                    >
                      {done}/{total}
                    </Text>
                  </View>
                  <View
                    style={{
                      height: 4,
                      borderRadius: 2,
                      backgroundColor: colors.border,
                      overflow: "hidden",
                    }}
                  >
                    <View
                      style={{
                        width: `${pct * 100}%`,
                        height: 4,
                        backgroundColor: colors.primary,
                      }}
                    />
                  </View>
                </Pressable>
              </Link>
            );
          },
        )}
      </View>
    </ScrollView>
  );
}
