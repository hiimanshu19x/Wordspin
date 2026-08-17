export const SITE_NAME = "Wordspin";
export const SITE_DESCRIPTION =
  "Spin a prompt. Write your truth. Discover how others see the same world.";

export const SITE_URL = "https://wordspin.vercel.app";

export const MAX_WORDS = 200;

export const AUTOSAVE_DELAY_MS = 1500;
export const RESPONSE_TRUNCATION_CHARS = 300;
export const SUBMIT_PREVIEW_CHARS = 100;
export const SPIN_DURATION_MS = 400;

export const PROMPT_CATEGORIES = [
  "Memory",
  "Imagination",
  "Observation",
  "Emotion",
  "Question",
  "Scenario",
  "Reflection",
  "Life",
  "Relationships",
  "Dreams",
] as const;

export type PromptCategory = (typeof PROMPT_CATEGORIES)[number];

export const NAV_LINKS = [
  { label: "Explore", href: "/explore" },
  { label: "Daily Prompt", href: "/daily" },
  { label: "Saved", href: "/saved" },
  { label: "How It Works", href: "/#how-it-works" },
] as const;
