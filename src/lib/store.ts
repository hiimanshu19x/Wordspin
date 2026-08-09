"use client";

import { useSyncExternalStore, useCallback, useMemo } from "react";
import type { Prompt, WritingResponse, Draft, UserPreferences } from "./types";
import { SAMPLE_PROMPTS, FEATURED_RESPONSES } from "./prompts";
import { PROMPT_CATEGORIES, type PromptCategory } from "./constants";

// ─── Storage Keys ──────────────────────────────
const KEYS = {
  RESPONSES: "wordspin:responses",
  DRAFTS: "wordspin:drafts",
  PREFERENCES: "wordspin:preferences",
  SEEN_PROMPTS: "wordspin:seen",
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
  // Notify all subscribers
  window.dispatchEvent(new StorageEvent("storage", { key }));
}

// ─── External Store for Reactivity ─────────────
let storeVersion = 0;
const listeners = new Set<() => void>();

function subscribe(listener: () => void) {
  listeners.add(listener);

  const handleStorage = () => {
    storeVersion++;
    listener();
  };

  window.addEventListener("storage", handleStorage);
  return () => {
    listeners.delete(listener);
    window.removeEventListener("storage", handleStorage);
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

// ─── Seed Data ─────────────────────────────────
function ensureSeeded() {
  if (typeof window === "undefined") return;
  const existing = localStorage.getItem(KEYS.RESPONSES);
  if (!existing) {
    setItem(KEYS.RESPONSES, FEATURED_RESPONSES);
  }
}

// ─── All Prompts (static + deterministic daily) ─
export function getAllPrompts(): Prompt[] {
  return SAMPLE_PROMPTS;
}

export function getPromptById(id: string): Prompt | undefined {
  return SAMPLE_PROMPTS.find((p) => p.id === id);
}

// ─── Hook: useResponses ────────────────────────
export function useResponses(promptId?: string) {
  useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
  ensureSeeded();

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
        readingTimeSeconds: Math.max(10, Math.round((response.wordCount / 200) * 60)),
        reactions: 0,
        saved: false,
      };
      setItem(KEYS.RESPONSES, [newResponse, ...all]);
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
      if (available.length === 0) return prompts[0]; // cycle back
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

  // Deterministic daily prompt based on date
  const today = new Date();
  const dayIndex =
    (today.getFullYear() * 366 + today.getMonth() * 31 + today.getDate()) %
    allPrompts.length;

  const todayPrompt = allPrompts[dayIndex];

  // Past daily prompts (last 7 days)
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
  }, []);

  return { todayPrompt, pastPrompts };
}

// ─── Hook: useResponseCount ────────────────────
export function useResponseCount(promptId: string): number {
  useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
  const responses = getItem<WritingResponse[]>(KEYS.RESPONSES, []);
  return responses.filter((r) => r.promptId === promptId).length;
}
