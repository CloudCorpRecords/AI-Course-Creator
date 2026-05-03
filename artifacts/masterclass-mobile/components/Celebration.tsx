import { Feather } from "@expo/vector-icons";
import * as Haptics from "expo-haptics";
import { useEffect, useMemo } from "react";
import { Dimensions, Modal, Pressable, Text, View } from "react-native";
import Animated, {
  Easing,
  useAnimatedStyle,
  useSharedValue,
  withDelay,
  withRepeat,
  withSequence,
  withSpring,
  withTiming,
} from "react-native-reanimated";

import { BADGES } from "@workspace/gamification";

import { useColors } from "@/hooks/useColors";
import { useGamification } from "@/context/GamificationContext";

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get("window");

const CONFETTI_COLORS = [
  "#7c6af7",
  "#06b6d4",
  "#10b981",
  "#f59e0b",
  "#ef4444",
  "#ec4899",
];

interface ConfettiPieceProps {
  index: number;
  total: number;
}

function ConfettiPiece({ index, total }: ConfettiPieceProps) {
  const startX = useMemo(
    () => (SCREEN_WIDTH * (index + 0.5)) / total - 4,
    [index, total],
  );
  const drift = useMemo(() => (Math.random() - 0.5) * 220, []);
  const delay = useMemo(() => Math.random() * 250, []);
  const fallDuration = useMemo(() => 1700 + Math.random() * 900, []);
  const color = useMemo(
    () => CONFETTI_COLORS[index % CONFETTI_COLORS.length],
    [index],
  );
  const size = useMemo(() => 6 + Math.floor(Math.random() * 6), []);

  const translateY = useSharedValue(-40);
  const translateX = useSharedValue(0);
  const rotate = useSharedValue(0);

  useEffect(() => {
    translateY.value = withDelay(
      delay,
      withTiming(SCREEN_HEIGHT + 60, {
        duration: fallDuration,
        easing: Easing.in(Easing.quad),
      }),
    );
    translateX.value = withDelay(
      delay,
      withTiming(drift, { duration: fallDuration, easing: Easing.linear }),
    );
    rotate.value = withDelay(
      delay,
      withRepeat(
        withTiming(360, {
          duration: 1100 + Math.random() * 700,
          easing: Easing.linear,
        }),
        -1,
      ),
    );
  }, [delay, drift, fallDuration, translateY, translateX, rotate]);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [
      { translateY: translateY.value },
      { translateX: translateX.value },
      { rotate: `${rotate.value}deg` },
    ],
  }));

  return (
    <Animated.View
      style={[
        {
          position: "absolute",
          left: startX,
          top: 0,
          width: size,
          height: size * 1.4,
          backgroundColor: color,
          borderRadius: 1,
        },
        animatedStyle,
      ]}
    />
  );
}

function Confetti({ count = 60 }: { count?: number }) {
  const pieces = useMemo(() => Array.from({ length: count }), [count]);
  return (
    <View
      pointerEvents="none"
      style={{
        position: "absolute",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
      }}
    >
      {pieces.map((_, i) => (
        <ConfettiPiece key={i} index={i} total={count} />
      ))}
    </View>
  );
}

export function CelebrationOverlay() {
  const colors = useColors();
  const { pendingCelebration, acknowledgeCelebration } = useGamification();
  const visible = !!pendingCelebration;

  const cardScale = useSharedValue(0.6);
  const cardOpacity = useSharedValue(0);

  useEffect(() => {
    if (visible) {
      cardScale.value = 0.6;
      cardOpacity.value = 0;
      cardScale.value = withSequence(
        withSpring(1.06, { damping: 10, stiffness: 140 }),
        withSpring(1, { damping: 12, stiffness: 160 }),
      );
      cardOpacity.value = withTiming(1, { duration: 220 });
      Haptics.notificationAsync(
        Haptics.NotificationFeedbackType.Success,
      ).catch(() => {});
    }
  }, [visible, cardScale, cardOpacity]);

  const cardStyle = useAnimatedStyle(() => ({
    opacity: cardOpacity.value,
    transform: [{ scale: cardScale.value }],
  }));

  if (!pendingCelebration) return null;

  const { title, message, newBadges, leveledUp, newLevel } = pendingCelebration;
  const badgeDefs = newBadges
    .map((id: string) => BADGES.find((b) => b.id === id))
    .filter((b): b is (typeof BADGES)[number] => !!b);

  return (
    <Modal
      transparent
      visible={visible}
      animationType="fade"
      onRequestClose={acknowledgeCelebration}
    >
      <View
        style={{
          flex: 1,
          backgroundColor: "rgba(0,0,0,0.55)",
          alignItems: "center",
          justifyContent: "center",
          padding: 24,
        }}
      >
        <Confetti count={70} />
        <Animated.View
          style={[
            {
              backgroundColor: colors.card,
              borderRadius: 20,
              borderWidth: 1,
              borderColor: colors.border,
              padding: 24,
              alignItems: "center",
              gap: 12,
              maxWidth: 360,
              width: "100%",
            },
            cardStyle,
          ]}
        >
          <View
            style={{
              width: 72,
              height: 72,
              borderRadius: 36,
              backgroundColor: leveledUp
                ? colors.warning + "26"
                : colors.primary + "26",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Feather
              name={leveledUp ? "zap" : "award"}
              size={36}
              color={leveledUp ? colors.warning : colors.primary}
            />
          </View>
          <Text
            style={{
              color: colors.foreground,
              fontFamily: "Inter_700Bold",
              fontSize: 22,
              textAlign: "center",
            }}
          >
            {title}
          </Text>
          {leveledUp && newLevel !== undefined && (
            <Text
              style={{
                color: colors.warning,
                fontFamily: "Inter_700Bold",
                fontSize: 48,
                marginTop: -4,
              }}
            >
              Lv {newLevel}
            </Text>
          )}
          <Text
            style={{
              color: colors.mutedForeground,
              fontFamily: "Inter_500Medium",
              fontSize: 15,
              textAlign: "center",
            }}
          >
            {message}
          </Text>

          {badgeDefs.length > 0 && (
            <View
              style={{
                flexDirection: "row",
                flexWrap: "wrap",
                gap: 10,
                justifyContent: "center",
                marginTop: 6,
              }}
            >
              {badgeDefs.map((b) => (
                <View
                  key={b.id}
                  style={{
                    backgroundColor: colors.background,
                    borderRadius: 12,
                    borderWidth: 1,
                    borderColor: colors.border,
                    paddingHorizontal: 12,
                    paddingVertical: 8,
                    flexDirection: "row",
                    alignItems: "center",
                    gap: 8,
                  }}
                >
                  <Text style={{ fontSize: 18 }}>{b.emoji}</Text>
                  <Text
                    style={{
                      color: colors.foreground,
                      fontFamily: "Inter_600SemiBold",
                      fontSize: 13,
                    }}
                  >
                    {b.title}
                  </Text>
                </View>
              ))}
            </View>
          )}

          <Pressable
            onPress={acknowledgeCelebration}
            testID="celebration-dismiss"
            style={({ pressed }) => ({
              marginTop: 12,
              backgroundColor: colors.primary,
              paddingHorizontal: 28,
              paddingVertical: 12,
              borderRadius: 12,
              opacity: pressed ? 0.9 : 1,
            })}
          >
            <Text
              style={{
                color: colors.primaryForeground,
                fontFamily: "Inter_600SemiBold",
                fontSize: 15,
              }}
            >
              Continue
            </Text>
          </Pressable>
        </Animated.View>
      </View>
    </Modal>
  );
}
