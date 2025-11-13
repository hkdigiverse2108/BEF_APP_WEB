import type { MessageStatus } from "./Common";

// ************ My Winning ***********

interface RanksType {
  endPlace: string;
  price: number;
  startPlace: string;
  _id: string;
}

export interface MyWinningContestsListType {
  subject: string;
  totalWin: number;
  contestName: string;
  winnerPercentage: number;
  ranks: RanksType[];
}

export interface MyWinningListType {
  contests: MyWinningContestsListType[];
  totalWinning: number;
}

// ************ Mistake Map Report ***********

export interface MistakeMapReportType {
  accuracy: number;
  correct: number;
  total: number;
  whyFalse: string;
}

// ************ Elimination Skill Report ***********
interface EliminationPercentage {
  correctPercentage: number;
  incorrectPercentage: number;
}

interface QaTypeItem {
  fiftyFifty: EliminationPercentage;
  oneEliminate: EliminationPercentage;
}
interface QaTypeMetricItem extends QaTypeItem {
  fiftyRightEliminatedYes: number;
  fiftyRightChosenAfterEliminationYes: number;
  oneEliminateCorrectEliminationYes: number;
  oneEliminateRightAnswerFromCorrectEliminationYes: number;
  totalFiftyQuestions: number;
  totalOneEliminateQuestions: number;
}

type QaCategory = "100%Sure" | "logicPlay" | "intuitionHit" | "blindFire" | "skip" | "fearDriverSkip";

type QaChartType = Record<QaCategory, QaTypeItem>;

export interface Sec2FirstPoweredReportType {
  qa: QaChartType;
  qaTypeMetrics: QaTypeMetricItem[];
}

// ************ Summary ***********

export interface SubjectSummaryItem {
  percentage: number;
  subjectName?: string;
  subtopicId?: string;
  type: string;
}

export type SubjectSummaryGroup = "Average" | "Strong" | "Very Strong" | "Very Weak" | "Weak";

export type SubjectSummaryType = Partial<Record<SubjectSummaryGroup, SubjectSummaryItem[]>>;

// ************ AI Powered Report Analysis ***********

export interface FirstPoweredReportType {
  average: number;
  type: string;
}

export interface QaTypeSummaryType {
  average: {
    direct: number;
    fiftyFifty: number;
    oneEliminate: number;
  };
}

export interface FullFestReportSec1Type {
  firstPoweredReport: FirstPoweredReportType[];
  qaTypeSummary: QaTypeSummaryType;
  subjectSummary: SubjectSummaryType;
}

export interface FullFestReportSec2Type {
  qaTypeSummary: SubjectSummaryType;
  firstPoweredReport: Sec2FirstPoweredReportType;
}

export interface FullFestReportSec3Type {
  mistakeMapReport: MistakeMapReportType[];
  myWinningList: MyWinningListType;
}

export interface FullFestReportType {
  sec1: FullFestReportSec1Type;
  sec2: FullFestReportSec2Type;
  sec3: FullFestReportSec3Type;
}

export interface FullFestReportResponse extends MessageStatus {
  data: FullFestReportType;
}

export interface FullFestReportApiResponse {
  data: FullFestReportResponse;
  isLoading: boolean;
}
