import { Feather } from "@expo/vector-icons";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useEffect, useRef } from "react";
import {
  Platform,
  Pressable,
  ScrollView,
  Text,
  View,
  findNodeHandle,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { course } from "@workspace/course-content";

import { useColors } from "@/hooks/useColors";
import { useGamification } from "@/context/GamificationContext";

export default function LearnScreen() {
  const colors = useColors();
  const insets = useSafeAreaInsets();
  const router = useRouter();
  const { isCompleted, quizScores } = useGamification();
  const { focus } = useLocalSearchParams<{ focus?: string }>();

  const isWeb = Platform.OS === "web";
  const scrollRef = useRef<ScrollView | null>(null);
  const moduleRefs = useRef<Record<string, View | null>>({});

  useEffect(() => {
    if (!focus) return;
    const target = moduleRefs.current[focus];
    const scroll = scrollRef.current;
    if (target && scroll) {
      const node = findNodeHandle(scroll);
      if (node !== null) {
        target.measureLayout(
          node,
          (_x, y) => {
            scroll.scrollTo({ y: Math.max(0, y - 12), animated: true });
          },
          () => {},
        );
      }
    }
  }, [focus]);

  return (
    <ScrollView
      ref={scrollRef}
      style={{ flex: 1, backgroundColor: colors.background }}
      contentContainerStyle={{
        paddingTop: (isWeb ? 67 : insets.top) + 16,
        paddingBottom: (isWeb ? 84 : insets.bottom + 84) + 24,
        paddingHorizontal: 18,
        gap: 22,
      }}
    >
      <Text
        style={{
          color: colors.foreground,
          fontFamily: "Inter_700Bold",
          fontSize: 28,
        }}
      >
        Learn
      </Text>

      {course.modules.map((module) => (
        <View
          key={module.id}
          ref={(el) => {
            moduleRefs.current[module.id] = el;
          }}
          style={{ gap: 10 }}
        >
          <View style={{ gap: 4 }}>
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
                fontFamily: "Inter_700Bold",
                fontSize: 20,
              }}
            >
              {module.title}
            </Text>
            <Text
              style={{
                color: colors.mutedForeground,
                fontFamily: "Inter_400Regular",
                fontSize: 13.5,
                lineHeight: 20,
              }}
            >
              {module.subtitle}
            </Text>
          </View>

          <View
            style={{
              backgroundColor: colors.card,
              borderRadius: colors.radius,
              borderWidth: 1,
              borderColor: colors.border,
              overflow: "hidden",
            }}
          >
            {module.lessons.map((lesson, i) => {
              const done = isCompleted(lesson.id);
              const score = quizScores[lesson.id];
              return (
                <Pressable
                  key={lesson.id}
                  testID={`lesson-row-${lesson.id}`}
                  onPress={() =>
                    router.push({
                      pathname: "/lesson/[id]",
                      params: { id: lesson.id },
                    })
                  }
                  style={({ pressed }) => ({
                    flexDirection: "row",
                    alignItems: "center",
                    gap: 12,
                    padding: 14,
                    borderTopWidth: i === 0 ? 0 : 1,
                    borderTopColor: colors.border,
                    opacity: pressed ? 0.85 : 1,
                  })}
                >
                  <View
                    style={{
                      width: 32,
                      height: 32,
                      borderRadius: 16,
                      backgroundColor: done
                        ? colors.success + "26"
                        : colors.muted,
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    {done ? (
                      <Feather name="check" size={16} color={colors.success} />
                    ) : (
                      <Text
                        style={{
                          color: colors.mutedForeground,
                          fontFamily: "Inter_700Bold",
                          fontSize: 12,
                        }}
                      >
                        {i + 1}
                      </Text>
                    )}
                  </View>
                  <View style={{ flex: 1, gap: 3 }}>
                    <Text
                      style={{
                        color: colors.foreground,
                        fontFamily: "Inter_600SemiBold",
                        fontSize: 14.5,
                        lineHeight: 20,
                      }}
                    >
                      {lesson.title}
                    </Text>
                    <View style={{ flexDirection: "row", gap: 8 }}>
                      <Text
                        style={{
                          color: colors.mutedForeground,
                          fontFamily: "Inter_500Medium",
                          fontSize: 12,
                        }}
                      >
                        {lesson.estimatedMinutes} min
                      </Text>
                      {score && (
                        <Text
                          style={{
                            color:
                              score.correct === score.total
                                ? colors.warning
                                : colors.mutedForeground,
                            fontFamily: "Inter_500Medium",
                            fontSize: 12,
                          }}
                        >
                          · Quiz {score.correct}/{score.total}
                        </Text>
                      )}
                    </View>
                  </View>
                  <Feather
                    name="chevron-right"
                    size={18}
                    color={colors.mutedForeground}
                  />
                </Pressable>
              );
            })}
          </View>
        </View>
      ))}
    </ScrollView>
  );
}
