import AsyncStorage from "@react-native-async-storage/async-storage";

const DEVICE_ID_KEY = "masterclass-mobile.leaderboard.deviceId";
const DISPLAY_NAME_KEY = "masterclass-mobile.leaderboard.displayName";

const ALPHABET = "abcdefghijklmnopqrstuvwxyz0123456789";

function randomId(length: number): string {
  let out = "";
  for (let i = 0; i < length; i++) {
    out += ALPHABET[Math.floor(Math.random() * ALPHABET.length)];
  }
  return out;
}

export async function getOrCreateDeviceId(): Promise<string> {
  const existing = await AsyncStorage.getItem(DEVICE_ID_KEY).catch(() => null);
  if (existing && existing.length >= 8) return existing;
  const fresh = `dev-${Date.now().toString(36)}-${randomId(12)}`;
  await AsyncStorage.setItem(DEVICE_ID_KEY, fresh).catch(() => {});
  return fresh;
}

export async function readDisplayName(): Promise<string | null> {
  const stored = await AsyncStorage.getItem(DISPLAY_NAME_KEY).catch(() => null);
  return stored && stored.length > 0 ? stored : null;
}

export async function writeDisplayName(name: string): Promise<void> {
  await AsyncStorage.setItem(DISPLAY_NAME_KEY, name).catch(() => {});
}

export const DISPLAY_NAME_PATTERN = /^[A-Za-z0-9_\- ]+$/;

export function validateDisplayName(name: string): string | null {
  const trimmed = name.trim();
  if (trimmed.length < 2) return "Pick a name with at least 2 characters.";
  if (trimmed.length > 24) return "Keep it under 24 characters.";
  if (!DISPLAY_NAME_PATTERN.test(trimmed))
    return "Use letters, numbers, spaces, dashes, or underscores only.";
  return null;
}
