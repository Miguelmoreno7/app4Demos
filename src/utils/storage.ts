export type Profile = {
  name: string;
  avatarUrl: string;
};

export type Message = {
  from: "user" | "agent";
  text: string;
};

export type AppState = {
  profile: Profile;
  messages: Message[];
};

const STORAGE_KEY = "whatsdemo-state";

export const loadState = (): AppState | null => {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw) as AppState;
    if (!parsed.profile || !Array.isArray(parsed.messages)) return null;
    return parsed;
  } catch {
    return null;
  }
};

export const saveState = (state: AppState) => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  } catch {
    // ignore write errors
  }
};
