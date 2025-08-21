export interface Subject {
  id: string;
  title: string;
}

export interface Unit {
  id: string;
  subjectId: string;
  title: string;
}

export type QuestionType = 'mc' | 'tf';

export interface Question {
  id: string;
  subjectId: string;
  unitId: string;
  type: QuestionType;
  prompt: string;
  choices?: string[];
  answer: number | boolean;
  explanation: string;
}

export interface ReviewItem {
  questionId: string;
  ease: number;
  interval: number;
  repetition: number;
  due: string;
}
