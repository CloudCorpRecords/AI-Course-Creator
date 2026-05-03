import * as Notifications from "expo-notifications";
import { Platform } from "react-native";

const STREAK_NOTIFICATION_ID = "daily-streak-reminder";

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowBanner: true,
    shouldShowList: true,
    shouldPlaySound: false,
    shouldSetBadge: false,
  }),
});

export async function ensureNotificationPermission(): Promise<boolean> {
  if (Platform.OS === "web") return false;
  const settings = await Notifications.getPermissionsAsync();
  if (settings.granted) return true;
  if (!settings.canAskAgain) return false;
  const req = await Notifications.requestPermissionsAsync();
  return req.granted;
}

export async function scheduleDailyStreakReminder(
  hour: number = 19,
  minute: number = 0,
): Promise<boolean> {
  if (Platform.OS === "web") return false;
  const granted = await ensureNotificationPermission();
  if (!granted) return false;

  await Notifications.cancelScheduledNotificationAsync(
    STREAK_NOTIFICATION_ID,
  ).catch(() => {});

  await Notifications.scheduleNotificationAsync({
    identifier: STREAK_NOTIFICATION_ID,
    content: {
      title: "Keep your streak alive 🔥",
      body: "A quick lesson today keeps the momentum going.",
    },
    trigger: {
      type: Notifications.SchedulableTriggerInputTypes.DAILY,
      hour,
      minute,
    },
  });
  return true;
}

export async function cancelStreakReminder(): Promise<void> {
  if (Platform.OS === "web") return;
  await Notifications.cancelScheduledNotificationAsync(
    STREAK_NOTIFICATION_ID,
  ).catch(() => {});
}
