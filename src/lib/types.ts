export type { PromptCategory } from "./constants";

export interface Prompt {
  id: string;
  text: string;
  category: import("./constants").PromptCategory;
}

export interface WritingResponse {
  id: string;
  promptId: string;
  prompt: Prompt;
  body: string;
  wordCount: number;
  author: string | null;
  createdAt: string;
  readingTimeSeconds: number;
  reactions?: number;
  saved?: boolean;
}

export interface Draft {
  promptId: string;
  body: string;
  wordCount: number;
  lastSaved: string;
  isSubmitted: boolean;
}

export interface UserPreferences {
  authorName: string;
  preferAnonymous: boolean;
  seenPromptIds: string[];
}
