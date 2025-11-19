import type { MessageStatus, PageStatus } from "./Common";

export interface QaApiResponse {
  data: QaResponse;
  isLoading: boolean;
}

export interface QaResponse extends MessageStatus{
  data: QaData;
}

export interface QaData extends PageStatus{
  contest_type_data: ContestTypeData[];
  accuracy: number;
  questionAccuracy: QuestionAccuracy[];
}

export interface QuestionAccuracy {
  _id: string;
  totalAttempts: number;
  correctAnswers: number;
  questionId: string;
  accuracy: number;
}

export interface ContestTypeData {
  _id: string;
  userId: string;
  classesId: string;
  contestId: string;
  subjectId: string;
  stackNumber: number;
  totalPoints: number;
  totalRightAnswer: number;
  totalWrongAnswer: number;
  totalSkippedAnswer: number;
  contestStartDate: string;
  contestEndDate: string;
  contestStartTime: string;
  contestEndTime: string;
  isFullLength: boolean;
  rank: number;
  winningPrice: number | null;
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
  answers: Answer[];
  createdAt: string;
  updatedAt: string;
  contest: Contest;
  classes: Classes;
  subject: SubjectType;
  userRank: number;
}

export interface Answer {
  type: string;
  answer: string;
  rightAnswer: string;
  is2XStack: boolean;
  eliminateOption: number;
  eliminateOptionA: boolean;
  eliminateOptionB: boolean;
  eliminateOptionC: boolean;
  eliminateOptionD: boolean;
  whyFalse: string | null;
  isAnsweredTrue: boolean | null;
  _id: string;
  qaNumber: number;
  questionId: Question;
}

export interface Contest {
  _id: string;
  classesIds: string[];
  name: string;
  contestTypeId: string;
  startDate: string;
  endDate: string;
  totalSpots: number;
  filledSpots: number;
  fees: number;
  winningAmountPerFee: number;
  pricePool: number;
  ranks: ContestRank[];
  slots: any[];
  status: string;
  winnerPercentage: number;
  totalQuestions: number;
  totalTime: string;
  totalMarks: number;
  isUserBalanceUpdated: boolean;
  currentPricePool: ContestRank[];
  ["contest-type"]: ContestType;
}

export interface ContestRank {
  startPlace: string;
  endPlace: string | null;
  price: number;
  _id: string;
}

export interface ContestType {
  _id: string;
  name: string;
}

export interface Classes {
  _id: string;
  name: string;
  ownerName: string;
  contact: {
    countryCode: string;
    mobile: string;
  };
  email: string;
  referralCode: string;
  password: string;
  image: string;
  userType: string;
  isForAllUsers: boolean;
  isEmailVerified: boolean;
  otp: string;
  subjectIds: string[];
  userIds: string[];
  negativeMarks: number;
  positiveMarks: number;
  examTypeId: string;
}

export interface SubjectType {
  _id: string;
  name: string;
  image: string;
  subTopicIds: string[];
  isFullLength: boolean;
}

export interface Question {
  _id: string;
  subjectId: string;
  classesId: string;
  subtopicId: {
    name: string;
  };
  type: string;
  questionType: string;
  englishQuestion: QuestionLang;
  hindiQuestion: QuestionLang;
  isDeleted: boolean;
  isBlocked: boolean;
  createdBy: string;
  updatedBy?: string;
  createdAt: string;
  updatedAt: string;
  strategyPercentage: string;
  strategyType: string;
  strategyUsage?: StrategyUsage[];
  answerDetails: Answer;
}

export interface QuestionLang {
  question: string;
  statementQuestion: { combined: string }[];
  lastQuestion: string;
  options: Record<string, string>;
  answer: string;
  solution: string;
  pairQuestion: { combined: string }[];
}

export interface StrategyUsage {
  type: string;
  percentage: string;
  rightAnswer: number;
  totalQuestion: number;
  _id: string;
}

