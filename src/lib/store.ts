"use client";

import { useSyncExternalStore, useCallback, useMemo } from "react";
import type { Prompt, WritingResponse, Draft, UserPreferences, UserStats } from "./types";
import { SAMPLE_PROMPTS, FEATURED_RESPONSES } from "./prompts";
import { PROMPT_CATEGORIES, MAX_WORDS, type PromptCategory } from "./constants";

// ─── Storage Keys ──────────────────────────────
const KEYS = {
  RESPONSES: "wordspin:responses",
  DRAFTS: "wordspin:drafts",
  PREFERENCES: "wordspin:preferences",
  REACTIONS: "wordspin:reactions",
  SAVED_PROMPTS: "wordspin:saved-prompts",
  STATS: "wordspin:stats",
} as const;

// ─── Storage Helpers ───────────────────────────
function getItem<T>(key: string, fallback: T): T {
  if (typeof window === "undefined") return fallback;
  try {
    const raw = localStorage.getItem(key);
    return raw ? (JSON.parse(raw) as T) : fallback;
  } catch {
    return fallback;
  }
}

function setItem<T>(key: string, value: T): void {
  if (typeof window === "undefined") return;
  localStorage.setItem(key, JSON.stringify(value));
}

// ─── External Store for Reactivity ─────────────
let storeVersion = 0;
const listeners = new Set<() => void>();

function subscribe(listener: () => void) {
  listeners.add(listener);
  return () => {
    listeners.delete(listener);
  };
}

function notifyAll() {
  storeVersion++;
  listeners.forEach((l) => l());
}

function getSnapshot() {
  return storeVersion;
}

function getServerSnapshot() {
  return 0;
}

// ─── One-time seed at module load (client only) ─
// This runs exactly once when this module is first imported in the browser.
// It is NOT inside any component, so it never conflicts with React rendering.
if (typeof window !== "undefined") {
  try {
    if (!localStorage.getItem(KEYS.RESPONSES)) {
      const seeded = FEATURED_RESPONSES.map((r) => ({ ...r, isSeeded: true }));
      localStorage.setItem(KEYS.RESPONSES, JSON.stringify(seeded));
    }
  } catch {
    // localStorage may be unavailable (private mode, etc.) — silently ignore
  }
}

// ─── All Prompts (static) ──────────────────────
export function getAllPrompts(): Prompt[] {
  return SAMPLE_PROMPTS;
}

export function getPromptById(id: string): Prompt | undefined {
  return SAMPLE_PROMPTS.find((p) => p.id === id);
}

// ─── Hook: useResponses ────────────────────────
export function useResponses(promptId?: string) {
  useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);

  const responses = getItem<WritingResponse[]>(KEYS.RESPONSES, []);

  const filtered = promptId
    ? responses.filter((r) => r.promptId === promptId)
    : responses;

  const sorted = [...filtered].sort(
    (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  );

  const addResponse = useCallback(
    (response: Omit<WritingResponse, "id" | "createdAt" | "readingTimeSeconds">) => {
      const all = getItem<WritingResponse[]>(KEYS.RESPONSES, []);
      const newResponse: WritingResponse = {
        ...response,
        id: `r-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`,
        createdAt: new Date().toISOString(),
        readingTimeSeconds: Math.max(10, Math.round((response.wordCount / MAX_WORDS) * 60)),
        reactions: 0,
        saved: false,
        isSeeded: false,
      };
      setItem(KEYS.RESPONSES, [newResponse, ...all]);

      // Update stats
      const today = new Date().toISOString().slice(0, 10);
      const stats = getItem<UserStats>(KEYS.STATS, {
        totalResponses: 0,
        currentStreak: 0,
        longestStreak: 0,
        responseDates: [],
      });
      stats.totalResponses += 1;
      if (!stats.responseDates.includes(today)) {
        stats.responseDates.push(today);
        stats.responseDates.sort();
      }
      const dates = [...stats.responseDates].sort().reverse();
      let streak = 1;
      for (let i = 0; i < dates.length - 1; i++) {
        const curr = new Date(dates[i]);
        const prev = new Date(dates[i + 1]);
        const diffDays = (curr.getTime() - prev.getTime()) / (1000 * 60 * 60 * 24);
        if (diffDays <= 1) streak++;
        else break;
      }
      stats.currentStreak = streak;
      stats.longestStreak = Math.max(stats.longestStreak, streak);
      setItem(KEYS.STATS, stats);

      notifyAll();
      return newResponse;
    },
    []
  );

  return { responses: sorted, addResponse };
}

// ─── Hook: usePrompts ──────────────────────────
export function usePrompts(category?: PromptCategory) {
  const prompts = useMemo(() => {
    const all = getAllPrompts();
    return category ? all.filter((p) => p.category === category) : all;
  }, [category]);

  const getRandomPrompt = useCallback(
    (excludeIds: string[] = []) => {
      const available = prompts.filter((p) => !excludeIds.includes(p.id));
      if (available.length === 0) return prompts[0];
      return available[Math.floor(Math.random() * available.length)];
    },
    [prompts]
  );

  return { prompts, getRandomPrompt, categories: PROMPT_CATEGORIES };
}

// ─── Hook: useDraft ────────────────────────────
export function useDraft(promptId: string) {
  useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);

  const drafts = getItem<Record<string, Draft>>(KEYS.DRAFTS, {});
  const draft = drafts[promptId] || null;

  const saveDraft = useCallback(
    (body: string) => {
      const all = getItem<Record<string, Draft>>(KEYS.DRAFTS, {});
      const wordCount = body.trim() ? body.trim().split(/\s+/).length : 0;
      all[promptId] = {
        promptId,
        body,
        wordCount,
        lastSaved: new Date().toISOString(),
        isSubmitted: false,
      };
      setItem(KEYS.DRAFTS, all);
      notifyAll();
    },
    [promptId]
  );

  const clearDraft = useCallback(() => {
    const all = getItem<Record<string, Draft>>(KEYS.DRAFTS, {});
    delete all[promptId];
    setItem(KEYS.DRAFTS, all);
    notifyAll();
  }, [promptId]);

  return { draft, saveDraft, clearDraft };
}

// ─── Hook: usePreferences ──────────────────────
const DEFAULT_PREFS: UserPreferences = {
  authorName: "",
  preferAnonymous: true,
  seenPromptIds: [],
};

export function usePreferences() {
  useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);

  const preferences = getItem<UserPreferences>(KEYS.PREFERENCES, DEFAULT_PREFS);

  const updatePreferences = useCallback((updates: Partial<UserPreferences>) => {
    const current = getItem<UserPreferences>(KEYS.PREFERENCES, DEFAULT_PREFS);
    setItem(KEYS.PREFERENCES, { ...current, ...updates });
    notifyAll();
  }, []);

  return { preferences, updatePreferences };
}

// ─── Hook: useDailyPrompt ──────────────────────
export function useDailyPrompt() {
  const allPrompts = getAllPrompts();

  const today = new Date();
  const dayIndex =
    (today.getFullYear() * 366 + today.getMonth() * 31 + today.getDate()) %
    allPrompts.length;

  const todayPrompt = allPrompts[dayIndex];

  const pastPrompts = useMemo(() => {
    const result: { date: string; prompt: Prompt }[] = [];
    for (let i = 1; i <= 7; i++) {
      const d = new Date(today);
      d.setDate(d.getDate() - i);
      const idx =
        (d.getFullYear() * 366 + d.getMonth() * 31 + d.getDate()) %
        allPrompts.length;
      result.push({
        date: d.toLocaleDateString("en-US", {
          weekday: "short",
          month: "short",
          day: "numeric",
        }),
        prompt: allPrompts[idx],
      });
    }
    return result;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [today.toDateString()]);

  return { todayPrompt, pastPrompts };
}

// ─── Hook: useResponseCount ────────────────────
export function useResponseCount(promptId: string): number {
  useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
  const responses = getItem<WritingResponse[]>(KEYS.RESPONSES, []);
  return responses.filter((r) => r.promptId === promptId).length;
}

// ─── Hook: useReactions ────────────────────────
export function useReactions() {
  useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);

  const likedIds = getItem<string[]>(KEYS.REACTIONS, []);

  const isLiked = useCallback(
    (responseId: string) => likedIds.includes(responseId),
    [likedIds]
  );

  const toggleReaction = useCallback((responseId: string) => {
    const current = getItem<string[]>(KEYS.REACTIONS, []);
    const newLiked = current.includes(responseId)
      ? current.filter((id) => id !== responseId)
      : [...current, responseId];
    setItem(KEYS.REACTIONS, newLiked);
    notifyAll();
  }, []);

  return { likedIds, isLiked, toggleReaction };
}

// ─── Hook: useSavedPrompts ─────────────────────
export function useSavedPrompts() {
  useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);

  const savedIds = getItem<string[]>(KEYS.SAVED_PROMPTS, []);

  const isSaved = useCallback(
    (promptId: string) => savedIds.includes(promptId),
    [savedIds]
  );

  const toggleSave = useCallback((promptId: string) => {
    const current = getItem<string[]>(KEYS.SAVED_PROMPTS, []);
    const updated = current.includes(promptId)
      ? current.filter((id) => id !== promptId)
      : [...current, promptId];
    setItem(KEYS.SAVED_PROMPTS, updated);
    notifyAll();
  }, []);

  const savedPrompts = useMemo(() => {
    return savedIds
      .map((id) => SAMPLE_PROMPTS.find((p) => p.id === id))
      .filter(Boolean) as Prompt[];
  }, [savedIds]);

  return { savedIds, savedPrompts, isSaved, toggleSave };
}

// ─── Hook: useUserStats ────────────────────────
export function useUserStats(): UserStats {
  useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);

  return getItem<UserStats>(KEYS.STATS, {
    totalResponses: 0,
    currentStreak: 0,
    longestStreak: 0,
    responseDates: [],
  });
}
