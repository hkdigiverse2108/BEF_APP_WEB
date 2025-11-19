import type { ReactNode } from "react";
import type { MessageStatus } from "./Common";

// ************ Elimination Skill Report ***********

export interface EliminationPercentage {
  correctPercentage: number;
  incorrectPercentage: number;
}

export interface QaTypeMetricItem {
  fiftyRightEliminatedYes: number;
  fiftyRightChosenAfterEliminationYes: number;
  fiftyFifty: EliminationPercentage;
  oneEliminate: EliminationPercentage;
  oneEliminateCorrectEliminationYes: number;
  oneEliminateRightAnswerFromCorrectEliminationYes: number;
  totalFiftyQuestions: number;
  totalOneEliminateQuestions: number;
}

export type QaChartType =  Record<QaCategory, QaTypeMetricItem>

export interface EliminationReportType {
  qaTypeMetrics: QaTypeMetricItem[];
  qa:QaChartType
}

// ************ compare with your Competitor ***********

export interface QaStats {
  correct: number;
  incorrect: number;
  accuracy: number;
}

export interface QaStrategyComparisons {
  you: QaStats;
  others: QaStats;
  toppers: QaStats;
}

export interface SubtopicWiseReportItem extends QaStrategyComparisons {
  subtopicName: string;
}

export type SubtopicWiseReportType = Record<string, SubtopicWiseReportItem>;

export interface QaStats {
  correct: number;
  incorrect: number;
  accuracy: number;
}

export type CompetitorGroup = "you" | "others" | "toppers";

export type CompetitorStats = Record<CompetitorGroup, QaStats>;

export type QaType = "100%Sure" | "logicPlay" | "intuitionHit" | "blindFire" | "skip" | "fearDriverSkip" | "50-50" | "1-OPT Eliminate";

export type QaTypeStrategyReportType = Record<QaType, CompetitorStats>;

export interface CompareWithCompetitorItem {
  accuracy: number;
  correct: number;
  incorrect: number;
  skipped: number;
}

export type CompareWithCompetitorGroup = "others" | "toppers" | "you";

export type CompareWithCompetitorType = Partial<Record<CompareWithCompetitorGroup, CompareWithCompetitorItem>>;

// ************ Summary ***********

export interface QaSubtopicItem {
  percentage: number;
  subjectName: string;
  subtopicId: string;
}

export type QaSubtopicGroup = "Average" | "Strong" | "Very Strong" | "Very Weak" | "Weak";

export type QaSubtopicSummaryType = Partial<Record<QaSubtopicGroup, QaSubtopicItem[]>>;

export interface QaTypeSubtopicItem {
  percentage: number;
  type: string;
}

export type QaTypeSummaryReportType = Partial<Record<QaSubtopicGroup, QaTypeSubtopicItem[]>>;

// ************ AI Powered Report Analysis ***********

export interface AttemptType {
  correct: number;
  total: number;
}
export interface QaGroupType {
  direct: AttemptType;
  fiftyFifty: AttemptType;
  oneEliminate: AttemptType;
}

export type QaCategory = "100%Sure" | "logicPlay" | "intuitionHit" | "blindFire" | "skip" | "fearDriverSkip";

export type QaTypeMetricsType = Record<QaCategory, QaGroupType>;

// ************ Overview ***********

export interface PolityType {
  correct: number;
  incorrect: number;
  totalPoints: number;
  rank: number;
  unanswered: number;
  time: string;
  positiveMarks: number;
  negativeMarks: number;
  qaTypeMetrics: QaTypeMetricsType;
}

export interface OverviewCardType {
  img: ReactNode;
  label: string;
  value: string | number;
  subValue?: string;
}

export interface Sec1Type {
  polity: PolityType;
  qaSubtopicSummary: QaSubtopicSummaryType;
  qaTypeSummaryReport: QaTypeSummaryReportType;
}

export interface Sec2Type {
  compareWithCompetitor: CompareWithCompetitorType;
  qaTypeStrategyReport: QaTypeStrategyReportType;
  subtopicWiseReport: SubtopicWiseReportType;
}

export interface Sec3Type {
  eliminationReport: EliminationReportType;
}

export interface ResultType {
  sec1: Sec1Type;
  sec2: Sec2Type;
  sec3: Sec3Type;
}

export interface ResultResponse extends MessageStatus {
  data: ResultType;
}

export interface ResultApiResponse {
  data: ResultResponse;
  isLoading: boolean;
}
