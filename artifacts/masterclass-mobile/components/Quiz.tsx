import { Feather } from "@expo/vector-icons";
import * as Haptics from "expo-haptics";
import { useMemo, useState } from "react";
import { Pressable, Text, View } from "react-native";

import { useColors } from "@/hooks/useColors";
import type { Quiz as QuizData } from "@workspace/course-content";

interface Props {
  quiz: QuizData;
  /** Called only when the learner has answered every question correctly. */
  onPass: (result: {
    correct: number;
    total: number;
    attempts: number;
    perfectFirstTry: boolean;
  }) => void;
}

export function Quiz({ quiz, onPass }: Props) {
  const colors = useColors();
  const total = quiz.questions.length;

  const [queue, setQueue] = useState<number[]>(() =>
    quiz.questions.map((_, i) => i),
  );
  const [pos, setPos] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);
  const [revealed, setRevealed] = useState(false);
  const [correctIds, setCorrectIds] = useState<Set<number>>(() => new Set());
  const [missedThisAttempt, setMissedThisAttempt] = useState<number[]>([]);
  const [attempts, setAttempts] = useState(1);
  const [phase, setPhase] = useState<"answering" | "review" | "passed">(
    "answering",
  );

  const progress = useMemo(
    () => (queue.length === 0 ? 0 : (pos + 1) / queue.length),
    [pos, queue.length],
  );
  const questionIndex = queue[pos]!;
  const q = quiz.questions[questionIndex]!;

  function pick(optionIndex: number) {
    if (revealed) return;
    setSelected(optionIndex);
  }

  function check() {
    if (selected === null) return;
    setRevealed(true);
    const isCorrect = selected === q.correctIndex;
    if (isCorrect) {
      setCorrectIds((prev) => {
        const next = new Set(prev);
        next.add(questionIndex);
        return next;
      });
      Haptics.notificationAsync(
        Haptics.NotificationFeedbackType.Success,
      ).catch(() => {});
    } else {
      setMissedThisAttempt((prev) =>
        prev.includes(questionIndex) ? prev : [...prev, questionIndex],
      );
      Haptics.notificationAsync(
        Haptics.NotificationFeedbackType.Warning,
      ).catch(() => {});
    }
  }

  function next() {
    if (pos + 1 < queue.length) {
      setPos((p) => p + 1);
      setSelected(null);
      setRevealed(false);
      return;
    }
    // End of pass: did they ace this attempt's queue?
    if (missedThisAttempt.length === 0) {
      setPhase("passed");
      onPass({
        correct: total,
        total,
        attempts,
        perfectFirstTry: attempts === 1,
      });
    } else {
      setPhase("review");
    }
  }

  function retryMissed() {
    Haptics.selectionAsync().catch(() => {});
    setQueue(missedThisAttempt);
    setMissedThisAttempt([]);
    setPos(0);
    setSelected(null);
    setRevealed(false);
    setAttempts((a) => a + 1);
    setPhase("answering");
  }

  if (phase === "review") {
    return (
      <View
        style={{
          backgroundColor: colors.card,
          borderRadius: colors.radius,
          borderWidth: 1,
          borderColor: colors.border,
          padding: 18,
          gap: 12,
          alignItems: "center",
        }}
      >
        <Feather name="rotate-ccw" size={28} color={colors.warning} />
        <Text
          style={{
            color: colors.foreground,
            fontFamily: "Inter_700Bold",
            fontSize: 18,
            textAlign: "center",
          }}
        >
          Almost there
        </Text>
        <Text
          style={{
            color: colors.mutedForeground,
            fontFamily: "Inter_500Medium",
            fontSize: 13.5,
            textAlign: "center",
            lineHeight: 20,
          }}
        >
          You missed {missedThisAttempt.length} question
          {missedThisAttempt.length === 1 ? "" : "s"} this round. Retry the
          missed ones to complete the lesson.
        </Text>
        <Pressable
          testID="quiz-retry"
          onPress={retryMissed}
          style={({ pressed }) => ({
            marginTop: 4,
            backgroundColor: colors.primary,
            paddingHorizontal: 24,
            paddingVertical: 12,
            borderRadius: 10,
            opacity: pressed ? 0.9 : 1,
            flexDirection: "row",
            alignItems: "center",
            gap: 8,
          })}
        >
          <Feather name="refresh-cw" size={14} color={colors.primaryForeground} />
          <Text
            style={{
              color: colors.primaryForeground,
              fontFamily: "Inter_600SemiBold",
              fontSize: 14,
            }}
          >
            Retry missed questions
          </Text>
        </Pressable>
      </View>
    );
  }

  if (phase === "passed") {
    const perfect = attempts === 1;
    return (
      <View
        style={{
          backgroundColor: colors.card,
          borderRadius: colors.radius,
          borderWidth: 1,
          borderColor: colors.border,
          padding: 18,
          gap: 8,
          alignItems: "center",
        }}
      >
        <Feather
          name={perfect ? "award" : "check-circle"}
          size={36}
          color={perfect ? colors.warning : colors.success}
        />
        <Text
          style={{
            color: colors.foreground,
            fontFamily: "Inter_700Bold",
            fontSize: 20,
          }}
        >
          {perfect ? "Aced it on the first try!" : "Quiz passed"}
        </Text>
        <Text
          style={{
            color: colors.mutedForeground,
            fontFamily: "Inter_500Medium",
            fontSize: 14,
            textAlign: "center",
          }}
        >
          {perfect
            ? `Perfect ${total}/${total} — lesson saved.`
            : `Cleared in ${attempts} attempt${attempts > 1 ? "s" : ""}.`}
        </Text>
      </View>
    );
  }

  return (
    <View
      style={{
        backgroundColor: colors.card,
        borderRadius: colors.radius,
        borderWidth: 1,
        borderColor: colors.border,
        padding: 18,
        gap: 14,
      }}
    >
      <View style={{ gap: 8 }}>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Text
            style={{
              color: colors.primary,
              fontFamily: "Inter_700Bold",
              fontSize: 11,
              letterSpacing: 1,
              textTransform: "uppercase",
            }}
          >
            Quiz · {pos + 1} of {queue.length}
            {attempts > 1 ? " · Retry" : ""}
          </Text>
          <Text
            style={{
              color: colors.mutedForeground,
              fontFamily: "Inter_500Medium",
              fontSize: 12,
            }}
          >
            {correctIds.size}/{total} correct
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
              height: 4,
              width: `${progress * 100}%`,
              backgroundColor: colors.primary,
            }}
          />
        </View>
      </View>

      <Text
        style={{
          color: colors.foreground,
          fontFamily: "Inter_600SemiBold",
          fontSize: 16,
          lineHeight: 24,
        }}
      >
        {q.question}
      </Text>

      <View style={{ gap: 8 }}>
        {q.options.map((opt: string, i: number) => {
          const isSelected = selected === i;
          const isCorrectAnswer = i === q.correctIndex;
          const showCorrect = revealed && isCorrectAnswer;
          const showWrong = revealed && isSelected && !isCorrectAnswer;
          const borderColor = showCorrect
            ? colors.success
            : showWrong
              ? colors.destructive
              : isSelected
                ? colors.primary
                : colors.border;
          const bg = showCorrect
            ? colors.success + "1f"
            : showWrong
              ? colors.destructive + "1f"
              : isSelected
                ? colors.primary + "1a"
                : "transparent";
          return (
            <Pressable
              key={i}
              onPress={() => pick(i)}
              testID={`quiz-option-${i}`}
              style={({ pressed }) => ({
                borderWidth: 1,
                borderColor,
                backgroundColor: bg,
                borderRadius: 10,
                padding: 12,
                opacity: pressed && !revealed ? 0.85 : 1,
                flexDirection: "row",
                alignItems: "center",
                gap: 10,
              })}
            >
              <View
                style={{
                  width: 22,
                  height: 22,
                  borderRadius: 11,
                  borderWidth: 1,
                  borderColor: borderColor,
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                {showCorrect && (
                  <Feather name="check" size={12} color={colors.success} />
                )}
                {showWrong && (
                  <Feather name="x" size={12} color={colors.destructive} />
                )}
                {!revealed && isSelected && (
                  <View
                    style={{
                      width: 8,
                      height: 8,
                      borderRadius: 4,
                      backgroundColor: colors.primary,
                    }}
                  />
                )}
              </View>
              <Text
                style={{
                  flex: 1,
                  color: colors.foreground,
                  fontFamily: "Inter_500Medium",
                  fontSize: 14.5,
                  lineHeight: 21,
                }}
              >
                {opt}
              </Text>
            </Pressable>
          );
        })}
      </View>

      {revealed && q.explanation && (
        <Text
          style={{
            color: colors.mutedForeground,
            fontFamily: "Inter_400Regular",
            fontSize: 13.5,
            lineHeight: 20,
            fontStyle: "italic",
          }}
        >
          {q.explanation}
        </Text>
      )}

      {!revealed ? (
        <Pressable
          testID="quiz-check"
          onPress={check}
          disabled={selected === null}
          style={({ pressed }) => ({
            backgroundColor:
              selected === null ? colors.muted : colors.primary,
            paddingVertical: 13,
            borderRadius: 10,
            alignItems: "center",
            opacity: pressed ? 0.9 : 1,
          })}
        >
          <Text
            style={{
              color:
                selected === null
                  ? colors.mutedForeground
                  : colors.primaryForeground,
              fontFamily: "Inter_600SemiBold",
              fontSize: 15,
            }}
          >
            Check answer
          </Text>
        </Pressable>
      ) : (
        <Pressable
          testID="quiz-next"
          onPress={next}
          style={({ pressed }) => ({
            backgroundColor: colors.primary,
            paddingVertical: 13,
            borderRadius: 10,
            alignItems: "center",
            opacity: pressed ? 0.9 : 1,
            flexDirection: "row",
            justifyContent: "center",
            gap: 8,
          })}
        >
          <Text
            style={{
              color: colors.primaryForeground,
              fontFamily: "Inter_600SemiBold",
              fontSize: 15,
            }}
          >
            {pos + 1 >= queue.length ? "Continue" : "Next question"}
          </Text>
          <Feather
            name="arrow-right"
            size={16}
            color={colors.primaryForeground}
          />
        </Pressable>
      )}
    </View>
  );
}
