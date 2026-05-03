import { Feather } from "@expo/vector-icons";
import * as Haptics from "expo-haptics";
import { useMemo, useState } from "react";
import { Pressable, Text, View } from "react-native";

import { useColors } from "@/hooks/useColors";
import type { Quiz as QuizData } from "@workspace/course-content";

interface Props {
  quiz: QuizData;
  onFinish: (result: { correct: number; total: number }) => void;
}

export function Quiz({ quiz, onFinish }: Props) {
  const colors = useColors();
  const [index, setIndex] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);
  const [revealed, setRevealed] = useState(false);
  const [correctCount, setCorrectCount] = useState(0);
  const [done, setDone] = useState(false);

  const total = quiz.questions.length;
  const q = quiz.questions[index]!;
  const progress = useMemo(() => (index + 1) / total, [index, total]);

  function pick(optionIndex: number) {
    if (revealed) return;
    setSelected(optionIndex);
  }

  function check() {
    if (selected === null) return;
    setRevealed(true);
    const isCorrect = selected === q.correctIndex;
    if (isCorrect) {
      setCorrectCount((c) => c + 1);
      Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success).catch(
        () => {},
      );
    } else {
      Haptics.notificationAsync(Haptics.NotificationFeedbackType.Warning).catch(
        () => {},
      );
    }
  }

  function next() {
    if (index + 1 >= total) {
      setDone(true);
      onFinish({
        correct: correctCount,
        total,
      });
      return;
    }
    setIndex((i) => i + 1);
    setSelected(null);
    setRevealed(false);
  }

  if (done) {
    const isPerfect = correctCount === total;
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
          name={isPerfect ? "award" : "check-circle"}
          size={36}
          color={isPerfect ? colors.warning : colors.success}
        />
        <Text
          style={{
            color: colors.foreground,
            fontFamily: "Inter_700Bold",
            fontSize: 20,
          }}
        >
          {isPerfect ? "Perfect score!" : "Quiz complete"}
        </Text>
        <Text
          style={{
            color: colors.mutedForeground,
            fontFamily: "Inter_500Medium",
            fontSize: 14,
          }}
        >
          {correctCount} / {total} correct
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
            Quiz · {index + 1} of {total}
          </Text>
          <Text
            style={{
              color: colors.mutedForeground,
              fontFamily: "Inter_500Medium",
              fontSize: 12,
            }}
          >
            {correctCount} correct
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
        {q.options.map((opt, i) => {
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
            {index + 1 >= total ? "Finish quiz" : "Next question"}
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
