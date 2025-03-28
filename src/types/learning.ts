
export interface Lesson {
  id: number;
  title: string;
  description: string;
  duration: string;
  difficulty: "Beginner" | "Intermediate" | "Advanced";
  completed: boolean;
  category: string;
  created_at?: string;
}

export interface LessonSection {
  id: number;
  title: string;
  content: string;
  type: "introduction" | "content" | "application" | "reflection" | "summary";
}

export interface QuizQuestion {
  id: number;
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
}

export interface LessonProgress {
  lessonId: number;
  completedSections: number[];
  quizScore?: number;
  completed: boolean;
  lastAccessedSection: number;
}
