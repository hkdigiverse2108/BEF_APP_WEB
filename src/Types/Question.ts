import type { MessageStatus } from "./Common";

export interface StatementQuestion {
  combined: string;
}

export interface PairQuestion {
  combined: string;
}

export interface QuestionLanguage {
  options: Record<string, string>;
  question: string;
  statementQuestion: StatementQuestion[];
  pairQuestion: PairQuestion[];
  answer?: string;
  solution?: string;
  lastQuestion?: string;
  link?: string;
}
export type LanguageKey = "englishQuestion" | "hindiQuestion";

export interface StrategyUsageType {
  type: string;
  percentage: string;
  rightAnswer: number;
  totalQuestion: number;
}

export interface QuestionAnswer {
  englishQuestion: QuestionLanguage;
  hindiQuestion: QuestionLanguage;
  _id: string;
  subjectId: string;
  classesId: string;
  subtopicId: string;
  type: string;
  questionType: "normal" | "pair" | "statement";
  fullLengthSubjectId: string;
  isDeleted: boolean;
  isBlocked: boolean;
  createdBy: string;
  strategyUsage: StrategyUsageType[];
  createdAt: string;
  updatedAt: string;
  questionBank?: string;
  userAnswer?:{
    confidenceType?:string;
    eliminateOption?: Record<number, number>;
    option?: Record<number, number>;
    answersType?:string[]
  }
}

export interface QuestionType {
  _id: string;
  userId: string;
  classesId: string;
  contestId: string;
  subjectId: {
    name: string;
  };
  stackNumber: number;
  totalPoints: number;
  totalRightAnswer: number;
  totalWrongAnswer: number;
  totalSkippedAnswer: number;
  contestStartDate: string;
  contestEndDate: string;
  contestStartTime: string | null;
  contestEndTime: string | null;
  isFullLength: boolean;
  rank: number | null;
  winningPrice: number;
  contestRankId: string | null;
  isSubjectShow: boolean;
  status: string;
  positiveMarks: number;
  negativeMarks: number;
  strategyUsage: boolean;
  userWiseStrategy: boolean;
  isPlayed: boolean;
  isDeleted: boolean;
  isBlocked: boolean;
  createdBy: string;
  updatedBy: string;
  createdAt: string;
  updatedAt: string;
  answers: QuestionAnswer[];
}

export interface QuestionResponse extends MessageStatus {
  data: QuestionType;
}

export interface QuestionApiResponse {
  data: QuestionResponse;
  isLoading: boolean;
}
