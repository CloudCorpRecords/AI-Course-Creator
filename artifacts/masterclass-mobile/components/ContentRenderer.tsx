import { Feather } from "@expo/vector-icons";
import { useState } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";

import { useColors } from "@/hooks/useColors";
import type { ContentBlock } from "@workspace/course-content/types";

export function ContentRenderer({ blocks }: { blocks: ContentBlock[] }) {
  return (
    <View style={{ gap: 14 }}>
      {blocks.map((block, i) => (
        <Block key={i} block={block} />
      ))}
    </View>
  );
}

function Block({ block }: { block: ContentBlock }) {
  const colors = useColors();
  switch (block.type) {
    case "paragraph":
      return (
        <Text
          style={{
            color: colors.foreground,
            fontFamily: "Inter_400Regular",
            fontSize: 15.5,
            lineHeight: 25,
            opacity: 0.92,
          }}
        >
          {block.text}
        </Text>
      );
    case "heading":
      return (
        <Text
          style={{
            color: colors.foreground,
            fontFamily:
              block.level === 2 ? "Inter_700Bold" : "Inter_600SemiBold",
            fontSize: block.level === 2 ? 22 : 17,
            marginTop: block.level === 2 ? 18 : 10,
            marginBottom: 4,
          }}
        >
          {block.text}
        </Text>
      );
    case "code":
      return <CodeBlockView block={block} />;
    case "tip":
    case "warning":
    case "insight":
      return <CalloutView block={block} />;
    case "exercise":
      return <ExerciseView block={block} />;
    case "takeaways":
      return <TakeawaysView items={block.items} />;
    case "quote":
      return <QuoteView text={block.text} attribution={block.attribution} />;
    case "list":
      return <ListView ordered={!!block.ordered} items={block.items} />;
    default:
      return null;
  }
}

function CodeBlockView({
  block,
}: {
  block: Extract<ContentBlock, { type: "code" }>;
}) {
  const colors = useColors();
  return (
    <View
      style={{
        backgroundColor: "#0a0c12",
        borderRadius: 10,
        borderWidth: 1,
        borderColor: colors.border,
        overflow: "hidden",
      }}
    >
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
          paddingHorizontal: 12,
          paddingVertical: 8,
          borderBottomWidth: 1,
          borderBottomColor: colors.border,
        }}
      >
        <Text
          style={{
            color: colors.mutedForeground,
            fontFamily: "Inter_500Medium",
            fontSize: 11,
          }}
          numberOfLines={1}
        >
          {block.caption ?? " "}
        </Text>
        <Text
          style={{
            color: colors.mutedForeground,
            fontFamily: "Inter_600SemiBold",
            fontSize: 10,
            letterSpacing: 1,
            textTransform: "uppercase",
          }}
        >
          {block.language}
        </Text>
      </View>
      <Text
        style={{
          color: "#cbd5e1",
          fontFamily: "Inter_400Regular",
          fontSize: 12.5,
          lineHeight: 20,
          padding: 14,
        }}
      >
        {block.code}
      </Text>
    </View>
  );
}

const CALLOUT_CONFIG = {
  tip: { icon: "zap" as const, color: "#10b981" },
  warning: { icon: "alert-triangle" as const, color: "#f59e0b" },
  insight: { icon: "star" as const, color: "#7c6af7" },
};

function CalloutView({
  block,
}: {
  block: Extract<ContentBlock, { type: "tip" | "warning" | "insight" }>;
}) {
  const colors = useColors();
  const cfg = CALLOUT_CONFIG[block.type];
  return (
    <View
      style={{
        backgroundColor: colors.card,
        borderRadius: 12,
        borderWidth: 1,
        borderColor: colors.border,
        padding: 14,
        gap: 8,
        borderLeftWidth: 3,
        borderLeftColor: cfg.color,
      }}
    >
      <View style={{ flexDirection: "row", alignItems: "center", gap: 8 }}>
        <Feather name={cfg.icon} size={14} color={cfg.color} />
        <Text
          style={{
            color: cfg.color,
            fontFamily: "Inter_600SemiBold",
            fontSize: 13,
          }}
        >
          {block.title}
        </Text>
      </View>
      <Text
        style={{
          color: colors.foreground,
          opacity: 0.88,
          fontFamily: "Inter_400Regular",
          fontSize: 14.5,
          lineHeight: 22,
        }}
      >
        {block.text}
      </Text>
    </View>
  );
}

function ExerciseView({
  block,
}: {
  block: Extract<ContentBlock, { type: "exercise" }>;
}) {
  const colors = useColors();
  const [open, setOpen] = useState(false);
  return (
    <View
      style={{
        backgroundColor: colors.card,
        borderRadius: 12,
        borderWidth: 1,
        borderColor: colors.border,
        padding: 14,
        gap: 10,
      }}
    >
      <View style={{ flexDirection: "row", alignItems: "center", gap: 8 }}>
        <Feather name="target" size={14} color={colors.primary} />
        <Text
          style={{
            color: colors.primary,
            fontFamily: "Inter_700Bold",
            fontSize: 11,
            letterSpacing: 1,
            textTransform: "uppercase",
          }}
        >
          Exercise
        </Text>
      </View>
      <Text
        style={{
          color: colors.foreground,
          fontFamily: "Inter_600SemiBold",
          fontSize: 15,
        }}
      >
        {block.title}
      </Text>
      <Text
        style={{
          color: colors.foreground,
          opacity: 0.85,
          fontFamily: "Inter_400Regular",
          fontSize: 14,
          lineHeight: 22,
        }}
      >
        {block.description}
      </Text>
      {block.hints.length > 0 && (
        <Pressable
          onPress={() => setOpen((o) => !o)}
          style={{ flexDirection: "row", alignItems: "center", gap: 6 }}
        >
          <Feather
            name={open ? "chevron-up" : "chevron-down"}
            size={14}
            color={colors.primary}
          />
          <Text
            style={{
              color: colors.primary,
              fontFamily: "Inter_600SemiBold",
              fontSize: 13,
            }}
          >
            {open
              ? "Hide hints"
              : `Show ${block.hints.length} hint${block.hints.length > 1 ? "s" : ""}`}
          </Text>
        </Pressable>
      )}
      {open && (
        <View style={{ gap: 6 }}>
          {block.hints.map((h, i) => (
            <View key={i} style={{ flexDirection: "row", gap: 8 }}>
              <Text style={{ color: colors.primary }}>→</Text>
              <Text
                style={{
                  color: colors.foreground,
                  opacity: 0.82,
                  fontFamily: "Inter_400Regular",
                  fontSize: 14,
                  lineHeight: 21,
                  flex: 1,
                }}
              >
                {h}
              </Text>
            </View>
          ))}
        </View>
      )}
    </View>
  );
}

function TakeawaysView({ items }: { items: string[] }) {
  const colors = useColors();
  return (
    <View
      style={{
        backgroundColor: colors.card,
        borderRadius: 12,
        borderWidth: 1,
        borderColor: colors.border,
        padding: 14,
        gap: 10,
        borderLeftWidth: 3,
        borderLeftColor: colors.success,
      }}
    >
      <View style={{ flexDirection: "row", alignItems: "center", gap: 8 }}>
        <Feather name="check-square" size={14} color={colors.success} />
        <Text
          style={{
            color: colors.success,
            fontFamily: "Inter_700Bold",
            fontSize: 11,
            letterSpacing: 1,
            textTransform: "uppercase",
          }}
        >
          Key Takeaways
        </Text>
      </View>
      {items.map((it, i) => (
        <View key={i} style={{ flexDirection: "row", gap: 8 }}>
          <Feather
            name="check"
            size={14}
            color={colors.success}
            style={{ marginTop: 4 }}
          />
          <Text
            style={{
              flex: 1,
              color: colors.foreground,
              opacity: 0.9,
              fontFamily: "Inter_400Regular",
              fontSize: 14.5,
              lineHeight: 22,
            }}
          >
            {it}
          </Text>
        </View>
      ))}
    </View>
  );
}

function QuoteView({ text, attribution }: { text: string; attribution?: string }) {
  const colors = useColors();
  return (
    <View
      style={{
        borderLeftWidth: 3,
        borderLeftColor: colors.primary,
        paddingLeft: 14,
        paddingVertical: 4,
      }}
    >
      <Text
        style={{
          color: colors.foreground,
          opacity: 0.92,
          fontFamily: "Inter_400Regular",
          fontStyle: "italic",
          fontSize: 16,
          lineHeight: 24,
        }}
      >
        &ldquo;{text}&rdquo;
      </Text>
      {attribution && (
        <Text
          style={{
            color: colors.mutedForeground,
            marginTop: 6,
            fontFamily: "Inter_500Medium",
            fontSize: 13,
          }}
        >
          — {attribution}
        </Text>
      )}
    </View>
  );
}

function ListView({ ordered, items }: { ordered: boolean; items: string[] }) {
  const colors = useColors();
  return (
    <View style={{ gap: 8 }}>
      {items.map((it, i) => (
        <View key={i} style={{ flexDirection: "row", gap: 10 }}>
          {ordered ? (
            <View
              style={[
                styles.numberBadge,
                { backgroundColor: colors.primary + "26" },
              ]}
            >
              <Text
                style={{
                  color: colors.primary,
                  fontFamily: "Inter_700Bold",
                  fontSize: 11,
                }}
              >
                {i + 1}
              </Text>
            </View>
          ) : (
            <View
              style={{
                width: 6,
                height: 6,
                borderRadius: 3,
                backgroundColor: colors.primary,
                marginTop: 9,
              }}
            />
          )}
          <Text
            style={{
              flex: 1,
              color: colors.foreground,
              opacity: 0.9,
              fontFamily: "Inter_400Regular",
              fontSize: 14.5,
              lineHeight: 22,
            }}
          >
            {it}
          </Text>
        </View>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  numberBadge: {
    width: 22,
    height: 22,
    borderRadius: 11,
    alignItems: "center",
    justifyContent: "center",
  },
});
