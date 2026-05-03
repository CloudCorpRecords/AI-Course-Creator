import { Feather } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { Alert, Platform, Pressable, ScrollView, Switch, Text, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { useState } from "react";
import { TextInput } from "react-native";

import { BadgeGrid, MiniStatRow, XPProgressCard } from "@/components/Stats";
import { useColors } from "@/hooks/useColors";
import { useGamification } from "@/context/GamificationContext";
import { useLeaderboard } from "@/context/LeaderboardContext";
import { validateDisplayName } from "@/lib/leaderboard";

export default function ProfileScreen() {
  const colors = useColors();
  const insets = useSafeAreaInsets();
  const router = useRouter();
  const {
    streak,
    notificationsEnabled,
    setNotificationsEnabled,
    resetProgress,
    badges,
  } = useGamification();
  const {
    displayName,
    setDisplayName,
    syncStatus,
  } = useLeaderboard();
  const [nameDraft, setNameDraft] = useState(displayName ?? "");
  const [nameError, setNameError] = useState<string | null>(null);
  const [nameBusy, setNameBusy] = useState(false);
  const [nameSaved, setNameSaved] = useState(false);

  function saveName() {
    const err = validateDisplayName(nameDraft);
    if (err) {
      setNameError(err);
      return;
    }
    setNameError(null);
    setNameBusy(true);
    setDisplayName(nameDraft.trim())
      .then(() => {
        setNameSaved(true);
        setTimeout(() => setNameSaved(false), 1500);
      })
      .finally(() => setNameBusy(false));
  }

  const isWeb = Platform.OS === "web";

  function confirmReset() {
    Alert.alert(
      "Reset progress?",
      "This will erase all XP, badges, streaks, and quiz scores on this device.",
      [
        { text: "Cancel", style: "cancel" },
        {
          text: "Reset",
          style: "destructive",
          onPress: () => {
            resetProgress();
          },
        },
      ],
    );
  }

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
      <Text
        style={{
          color: colors.foreground,
          fontFamily: "Inter_700Bold",
          fontSize: 28,
        }}
      >
        Profile
      </Text>

      <XPProgressCard />
      <MiniStatRow />

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
        <View style={{ flexDirection: "row", alignItems: "center", gap: 10 }}>
          <Feather name="zap" size={18} color={colors.warning} />
          <Text
            style={{
              color: colors.foreground,
              fontFamily: "Inter_700Bold",
              fontSize: 18,
            }}
          >
            Streak
          </Text>
        </View>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Text
            style={{
              color: colors.foreground,
              fontFamily: "Inter_700Bold",
              fontSize: 36,
            }}
          >
            {streak.current}
            <Text
              style={{
                color: colors.mutedForeground,
                fontFamily: "Inter_500Medium",
                fontSize: 14,
              }}
            >
              {" "}
              days
            </Text>
          </Text>
          <View style={{ alignItems: "flex-end", gap: 2 }}>
            <Text
              style={{
                color: colors.mutedForeground,
                fontFamily: "Inter_500Medium",
                fontSize: 12,
              }}
            >
              Longest
            </Text>
            <Text
              style={{
                color: colors.foreground,
                fontFamily: "Inter_700Bold",
                fontSize: 22,
              }}
            >
              {streak.longest}
            </Text>
          </View>
        </View>
      </View>

      <View style={{ gap: 10 }}>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Text
            style={{
              color: colors.foreground,
              fontFamily: "Inter_700Bold",
              fontSize: 18,
            }}
          >
            Badges ({badges.length})
          </Text>
          <Pressable
            testID="see-all-achievements"
            onPress={() => router.push("/achievements")}
            style={({ pressed }) => ({
              flexDirection: "row",
              alignItems: "center",
              gap: 4,
              opacity: pressed ? 0.7 : 1,
            })}
          >
            <Text
              style={{
                color: colors.primary,
                fontFamily: "Inter_600SemiBold",
                fontSize: 13,
              }}
            >
              See all
            </Text>
            <Feather name="chevron-right" size={14} color={colors.primary} />
          </Pressable>
        </View>
        <BadgeGrid />
      </View>

      <View
        testID="display-name-card"
        style={{
          backgroundColor: colors.card,
          borderRadius: colors.radius,
          borderWidth: 1,
          borderColor: colors.border,
          padding: 16,
          gap: 10,
        }}
      >
        <Text
          style={{
            color: colors.foreground,
            fontFamily: "Inter_700Bold",
            fontSize: 16,
          }}
        >
          Leaderboard name
        </Text>
        <Text
          style={{
            color: colors.mutedForeground,
            fontFamily: "Inter_400Regular",
            fontSize: 12.5,
            lineHeight: 18,
          }}
        >
          How you appear to other learners. 2–24 characters.
        </Text>
        <TextInput
          testID="profile-display-name-input"
          value={nameDraft}
          onChangeText={(t) => {
            setNameDraft(t);
            if (nameError) setNameError(null);
          }}
          placeholder="Your name"
          placeholderTextColor={colors.mutedForeground}
          autoCapitalize="none"
          autoCorrect={false}
          maxLength={24}
          style={{
            backgroundColor: colors.background,
            borderRadius: 10,
            borderWidth: 1,
            borderColor: nameError ? colors.destructive : colors.border,
            paddingHorizontal: 12,
            paddingVertical: 10,
            color: colors.foreground,
            fontFamily: "Inter_500Medium",
            fontSize: 15,
          }}
        />
        {nameError ? (
          <Text
            style={{
              color: colors.destructive,
              fontFamily: "Inter_500Medium",
              fontSize: 12,
            }}
          >
            {nameError}
          </Text>
        ) : null}
        <Pressable
          testID="profile-display-name-save"
          disabled={nameBusy || nameDraft.trim() === (displayName ?? "")}
          onPress={saveName}
          style={({ pressed }) => ({
            backgroundColor: colors.primary,
            borderRadius: 10,
            paddingVertical: 11,
            alignItems: "center",
            opacity:
              nameBusy || pressed || nameDraft.trim() === (displayName ?? "")
                ? 0.6
                : 1,
          })}
        >
          <Text
            style={{
              color: colors.primaryForeground,
              fontFamily: "Inter_700Bold",
              fontSize: 14,
            }}
          >
            {nameBusy ? "Saving…" : nameSaved ? "Saved!" : "Update name"}
          </Text>
        </Pressable>
        <Text
          style={{
            color: colors.mutedForeground,
            fontFamily: "Inter_400Regular",
            fontSize: 11,
          }}
        >
          Sync status: {syncStatus}
        </Text>
      </View>

      <View
        style={{
          backgroundColor: colors.card,
          borderRadius: colors.radius,
          borderWidth: 1,
          borderColor: colors.border,
          padding: 16,
          gap: 14,
        }}
      >
        <Text
          style={{
            color: colors.foreground,
            fontFamily: "Inter_700Bold",
            fontSize: 16,
          }}
        >
          Settings
        </Text>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            gap: 14,
          }}
        >
          <View style={{ flex: 1, gap: 2 }}>
            <Text
              style={{
                color: colors.foreground,
                fontFamily: "Inter_600SemiBold",
                fontSize: 14.5,
              }}
            >
              Daily streak reminder
            </Text>
            <Text
              style={{
                color: colors.mutedForeground,
                fontFamily: "Inter_400Regular",
                fontSize: 12.5,
                lineHeight: 18,
              }}
            >
              Get a 7pm nudge to keep your streak alive
              {Platform.OS === "web" ? " (mobile only)" : ""}
            </Text>
          </View>
          <Switch
            value={notificationsEnabled}
            onValueChange={(v) => setNotificationsEnabled(v)}
            disabled={Platform.OS === "web"}
            trackColor={{
              true: colors.primary,
              false: colors.border,
            }}
            thumbColor="#fff"
          />
        </View>
        <Pressable
          testID="reset-progress"
          onPress={confirmReset}
          style={({ pressed }) => ({
            backgroundColor: colors.destructive + "22",
            borderRadius: 10,
            paddingVertical: 12,
            alignItems: "center",
            opacity: pressed ? 0.85 : 1,
          })}
        >
          <Text
            style={{
              color: colors.destructive,
              fontFamily: "Inter_600SemiBold",
              fontSize: 14,
            }}
          >
            Reset all progress
          </Text>
        </Pressable>
      </View>
    </ScrollView>
  );
}
