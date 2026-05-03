import { Feather } from "@expo/vector-icons";
import * as Haptics from "expo-haptics";
import { Stack, useLocalSearchParams, useRouter } from "expo-router";
import { useEffect, useMemo, useState } from "react";
import { Platform, Pressable, ScrollView, Text, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import {
  findLesson,
  getPrevNextLesson,
  getQuizForLesson,
} from "@workspace/course-content";

import { ContentRenderer } from "@/components/ContentRenderer";
import { Quiz } from "@/components/Quiz";
import { useColors } from "@/hooks/useColors";
import { useGamification } from "@/context/GamificationContext";

export default function LessonScreen() {
  const colors = useColors();
  const insets = useSafeAreaInsets();
  const router = useRouter();
  const { id } = useLocalSearchParams<{ id: string }>();
  const { setLastVisited, completeLesson, isCompleted } = useGamification();

  const found = useMemo(() => (id ? findLesson(id) : null), [id]);
  const adjacent = useMemo(
    () => (id ? getPrevNextLesson(id) : { prev: null, next: null }),
    [id],
  );
  const quiz = useMemo(() => (id ? getQuizForLesson(id) : null), [id]);

  const [quizResult, setQuizResult] = useState<{
    correct: number;
    total: number;
  } | null>(null);
  const [completedThisSession, setCompletedThisSession] = useState(false);

  useEffect(() => {
    if (id) setLastVisited(id);
    setQuizResult(null);
    setCompletedThisSession(false);
  }, [id, setLastVisited]);

  if (!found) {
    return (
      <View
        style={{
          flex: 1,
          backgroundColor: colors.background,
          alignItems: "center",
          justifyContent: "center",
          padding: 24,
        }}
      >
        <Feather name="alert-circle" size={32} color={colors.mutedForeground} />
        <Text
          style={{
            color: colors.foreground,
            fontFamily: "Inter_600SemiBold",
            fontSize: 16,
            marginTop: 10,
          }}
        >
          Lesson not found
        </Text>
      </View>
    );
  }

  const { module, lesson } = found;
  const alreadyDone = isCompleted(lesson.id);
  const isWeb = Platform.OS === "web";

  function finishLesson(result?: { correct: number; total: number }) {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium).catch(() => {});
    completeLesson(lesson.id, result);
    setCompletedThisSession(true);
  }

  return (
    <View style={{ flex: 1, backgroundColor: colors.background }}>
      <Stack.Screen
        options={{
          headerTitle: `Module ${module.number}`,
          headerTransparent: false,
          headerStyle: { backgroundColor: colors.background },
          headerTintColor: colors.foreground,
        }}
      />
      <ScrollView
        contentContainerStyle={{
          paddingTop: 16,
          paddingBottom: insets.bottom + 32,
          paddingHorizontal: 18,
          gap: 14,
        }}
      >
        <View style={{ gap: 6 }}>
          <Text
            style={{
              color: colors.primary,
              fontFamily: "Inter_700Bold",
              fontSize: 11,
              letterSpacing: 1,
              textTransform: "uppercase",
            }}
          >
            Lesson {lesson.id}
          </Text>
          <Text
            style={{
              color: colors.foreground,
              fontFamily: "Inter_700Bold",
              fontSize: 24,
              lineHeight: 30,
            }}
          >
            {lesson.title}
          </Text>
          <View style={{ flexDirection: "row", gap: 10, marginTop: 4 }}>
            <View style={{ flexDirection: "row", alignItems: "center", gap: 5 }}>
              <Feather name="clock" size={13} color={colors.mutedForeground} />
              <Text
                style={{
                  color: colors.mutedForeground,
                  fontFamily: "Inter_500Medium",
                  fontSize: 12.5,
                }}
              >
                {lesson.estimatedMinutes} min
              </Text>
            </View>
            {(alreadyDone || completedThisSession) && (
              <View
                style={{ flexDirection: "row", alignItems: "center", gap: 5 }}
              >
                <Feather name="check-circle" size={13} color={colors.success} />
                <Text
                  style={{
                    color: colors.success,
                    fontFamily: "Inter_500Medium",
                    fontSize: 12.5,
                  }}
                >
                  Completed
                </Text>
              </View>
            )}
          </View>
        </View>

        <ContentRenderer blocks={lesson.content} />

        <View style={{ marginTop: 6, gap: 12 }}>
          {quiz ? (
            !quizResult ? (
              <Quiz
                quiz={quiz}
                onFinish={(result) => {
                  setQuizResult(result);
                  finishLesson(result);
                }}
              />
            ) : (
              <View
                style={{
                  backgroundColor: colors.card,
                  borderRadius: colors.radius,
                  borderWidth: 1,
                  borderColor: colors.border,
                  padding: 16,
                  gap: 6,
                }}
              >
                <Text
                  style={{
                    color: colors.foreground,
                    fontFamily: "Inter_700Bold",
                    fontSize: 16,
                  }}
                >
                  Quiz score: {quizResult.correct}/{quizResult.total}
                </Text>
                <Text
                  style={{
                    color: colors.mutedForeground,
                    fontFamily: "Inter_400Regular",
                    fontSize: 13,
                  }}
                >
                  Lesson saved to your progress.
                </Text>
              </View>
            )
          ) : (
            <Pressable
              testID="mark-complete"
              onPress={() => finishLesson()}
              disabled={completedThisSession}
              style={({ pressed }) => ({
                backgroundColor: completedThisSession
                  ? colors.success + "22"
                  : colors.primary,
                paddingVertical: 14,
                borderRadius: 12,
                alignItems: "center",
                flexDirection: "row",
                justifyContent: "center",
                gap: 8,
                opacity: pressed ? 0.9 : 1,
              })}
            >
              <Feather
                name={completedThisSession ? "check" : "check-circle"}
                size={16}
                color={
                  completedThisSession
                    ? colors.success
                    : colors.primaryForeground
                }
              />
              <Text
                style={{
                  color: completedThisSession
                    ? colors.success
                    : colors.primaryForeground,
                  fontFamily: "Inter_600SemiBold",
                  fontSize: 15,
                }}
              >
                {completedThisSession ? "Lesson saved" : "Mark complete"}
              </Text>
            </Pressable>
          )}

          <View
            style={{
              flexDirection: "row",
              gap: 10,
              marginTop: 4,
              marginBottom: isWeb ? 24 : 0,
            }}
          >
            <NavButton
              label="Previous"
              icon="arrow-left"
              disabled={!adjacent.prev}
              onPress={() => {
                if (adjacent.prev)
                  router.replace({
                    pathname: "/lesson/[id]",
                    params: { id: adjacent.prev.id },
                  });
              }}
              align="left"
            />
            <NavButton
              label="Next"
              icon="arrow-right"
              disabled={!adjacent.next}
              onPress={() => {
                if (adjacent.next)
                  router.replace({
                    pathname: "/lesson/[id]",
                    params: { id: adjacent.next.id },
                  });
              }}
              align="right"
            />
          </View>
        </View>
      </ScrollView>
    </View>
  );
}

function NavButton({
  label,
  icon,
  onPress,
  disabled,
  align,
}: {
  label: string;
  icon: keyof typeof Feather.glyphMap;
  onPress: () => void;
  disabled: boolean;
  align: "left" | "right";
}) {
  const colors = useColors();
  return (
    <Pressable
      onPress={onPress}
      disabled={disabled}
      style={({ pressed }) => ({
        flex: 1,
        backgroundColor: colors.card,
        borderWidth: 1,
        borderColor: colors.border,
        borderRadius: 12,
        paddingVertical: 12,
        paddingHorizontal: 14,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: align === "left" ? "flex-start" : "flex-end",
        gap: 8,
        opacity: disabled ? 0.4 : pressed ? 0.85 : 1,
      })}
    >
      {align === "left" && (
        <Feather name={icon} size={14} color={colors.foreground} />
      )}
      <Text
        style={{
          color: colors.foreground,
          fontFamily: "Inter_600SemiBold",
          fontSize: 13,
        }}
      >
        {label}
      </Text>
      {align === "right" && (
        <Feather name={icon} size={14} color={colors.foreground} />
      )}
    </Pressable>
  );
}
