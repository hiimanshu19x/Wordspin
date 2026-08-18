/**
 * Server-safe prompt data access.
 * This file has NO React hooks — safe to import in Server Components.
 */
import { SAMPLE_PROMPTS } from "./prompts";
import type { Prompt } from "./types";

export function getAllPrompts(): Prompt[] {
  return SAMPLE_PROMPTS;
}

export function getPromptById(id: string): Prompt | undefined {
  return SAMPLE_PROMPTS.find((p) => p.id === id);
}
