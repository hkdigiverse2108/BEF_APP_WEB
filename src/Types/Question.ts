// types.ts
export type LanguageKey = "hindiQuestion" | "englishQuestion";

export type QueType = "normal" | "statement" | "pair";

export interface OptionMap {
  [key: string]: string;
}

export interface PairItem {
  combined?: string;
  [k: string]: any;
}

export interface LocalQuestionLang {
  question?: string;
  options?: OptionMap;
  pairQuestion?: PairItem[];
  lastQuestion?: string;
}

export interface QuestionItem {
  _id: string;
  questionType: QueType;
  positiveMarks?: number;
  negativeMarks?: number;
  stackNumber?: number;
  hindiQuestion?: LocalQuestionLang;
  englishQuestion?: LocalQuestionLang;
  [k: string]: any;
}

export interface QAData {
  _id?: string;
  answers?: QuestionItem[];
  positiveMarks?: number;
  negativeMarks?: number;
  stackNumber?: number;
  [k: string]: any;
}

export type AnswerValue = 1 | 0 | undefined;

export type AnswersByQuestion = {
  // keyed by questionId -> { optionIndex: AnswerValue }
  [questionId: string]: { [optionIndex: number]: AnswerValue };
};

export type ConfidenceKey =
  | "sure"
  | "logic"
  | "intuition"
  | "blind"
  | "fear"
  | "skip"
  | string;

export type ConfidenceByQuestion = {
  [questionId: string]: ConfidenceKey | undefined;
};
