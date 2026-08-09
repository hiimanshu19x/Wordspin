export const SITE_NAME = "Wordspin";
export const SITE_DESCRIPTION =
  "Spin a prompt. Write your truth. Discover how others see the same world.";
export const MAX_WORDS = 200;

export const NAV_LINKS = [
  { label: "Explore", href: "/explore" },
  { label: "Daily Prompt", href: "/daily" },
  { label: "How It Works", href: "/#how-it-works" },
] as const;

export const PROMPT_CATEGORIES = [
  "Memory",
  "Imagination",
  "Observation",
  "Emotion",
  "Question",
  "Scenario",
  "Reflection",
] as const;

export type PromptCategory = (typeof PROMPT_CATEGORIES)[number];
