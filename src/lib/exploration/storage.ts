import { ExplorationState } from "./types";

const KEY = "agix_exploration_state_v1";

export function loadState(): ExplorationState | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = sessionStorage.getItem(KEY);
    return raw ? (JSON.parse(raw) as ExplorationState) : null;
  } catch {
    return null;
  }
}

export function saveState(state: ExplorationState) {
  if (typeof window === "undefined") return;
  try {
    sessionStorage.setItem(KEY, JSON.stringify(state));
  } catch {
    // Handle quota exceeded or other errors silently
  }
}

export function resetState() {
  if (typeof window === "undefined") return;
  sessionStorage.removeItem(KEY);
}
