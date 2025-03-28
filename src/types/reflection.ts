
export type ReflectionType = "quote" | "verse" | "hadith";

export interface Reflection {
  id: number;
  content: string;
  arabic?: string;
  source: string;
  type: ReflectionType;
  created_at?: string;
}
