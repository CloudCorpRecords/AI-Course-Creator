import { useState } from "react";
import {
  Modal,
  Platform,
  Pressable,
  Text,
  TextInput,
  View,
} from "react-native";

import { useColors } from "@/hooks/useColors";
import { useLeaderboard } from "@/context/LeaderboardContext";
import { validateDisplayName } from "@/lib/leaderboard";

export function DisplayNamePrompt() {
  const colors = useColors();
  const { needsName, setDisplayName } = useLeaderboard();
  const [name, setName] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);

  function handleSave() {
    const err = validateDisplayName(name);
    if (err) {
      setError(err);
      return;
    }
    setBusy(true);
    setDisplayName(name.trim()).finally(() => {
      setBusy(false);
      setName("");
    });
  }

  return (
    <Modal
      visible={needsName}
      transparent
      animationType={Platform.OS === "web" ? "fade" : "slide"}
    >
      <View
        style={{
          flex: 1,
          backgroundColor: "rgba(2,6,23,0.85)",
          justifyContent: "center",
          padding: 24,
        }}
      >
        <View
          testID="display-name-prompt"
          style={{
            backgroundColor: colors.card,
            borderRadius: 18,
            padding: 22,
            gap: 14,
            borderWidth: 1,
            borderColor: colors.border,
          }}
        >
          <Text
            style={{
              color: colors.foreground,
              fontFamily: "Inter_700Bold",
              fontSize: 20,
            }}
          >
            Pick a leaderboard name
          </Text>
          <Text
            style={{
              color: colors.mutedForeground,
              fontFamily: "Inter_500Medium",
              fontSize: 13.5,
              lineHeight: 19,
            }}
          >
            This is how you'll appear on the global leaderboard. You can change
            it any time from Profile.
          </Text>
          <TextInput
            testID="display-name-input"
            value={name}
            onChangeText={(t) => {
              setName(t);
              if (error) setError(null);
            }}
            placeholder="e.g. CodeNinja"
            placeholderTextColor={colors.mutedForeground}
            autoCapitalize="none"
            autoCorrect={false}
            maxLength={24}
            style={{
              backgroundColor: colors.background,
              borderRadius: 12,
              borderWidth: 1,
              borderColor: error ? colors.destructive : colors.border,
              paddingHorizontal: 14,
              paddingVertical: 12,
              fontFamily: "Inter_500Medium",
              fontSize: 16,
              color: colors.foreground,
            }}
          />
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
          <Pressable
            testID="display-name-save"
            disabled={busy}
            onPress={handleSave}
            style={({ pressed }) => ({
              backgroundColor: colors.primary,
              borderRadius: 12,
              paddingVertical: 13,
              alignItems: "center",
              opacity: busy || pressed ? 0.8 : 1,
            })}
          >
            <Text
              style={{
                color: colors.primaryForeground,
                fontFamily: "Inter_700Bold",
                fontSize: 15,
              }}
            >
              {busy ? "Saving…" : "Save name"}
            </Text>
          </Pressable>
        </View>
      </View>
    </Modal>
  );
}
