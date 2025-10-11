import type { Dayjs } from "dayjs";

/* ---------- WINNER TYPES ---------- */
export interface WinnerType {
  name: string;
  rank: string;
  img: string;
  amount: string;
}

export interface ContestWinnerCardProps {
  winner: WinnerType;
}

/* ---------- COMMON BASE TYPES ---------- */
export interface ContestTypeInfo {
  name?: string;
}

export interface SubjectInfo {
  _id?: string;
  name?: string;
  image?: string;
}

export interface PayloadTime {
  startTime?: string;
  endTime?: string;
}

/* ---------- CORE CONTEST DATA ---------- */
export interface ContestCore {
  _id?: string;
  name?: string;
  pricePool?: number | string;
  filledSpots?: number;
  totalSpots?: number;
  fees?: number | string;
  winnerPercentage?: number | string;
  winningAmountPerFee?: number;
  status?: string;
  slots?: string[];
  endDate?: Dayjs;
  ranks?: string[];
  contestType?: ContestTypeInfo; // replaces "contest-type"
  payload?: PayloadTime;
}

/* ---------- PAST / UPCOMING CONTEST WRAPPER ---------- */
export interface ContestData {
  _id?: string;
  contestStartDate?: string;
  contestEndDate?: string;
  rank?: number | null;
  winningPrice?: number;
  status?: string;
  subject?: SubjectInfo;
  contest?: ContestCore;
}

/* ---------- COMPONENT PROP ---------- */
export interface ContestDetailCardProps {
  contestData: ContestData;
}

/* ---------- API RESPONSE STRUCTURES ---------- */
export interface ContestItem {
  _id: string;
  name: string;
  description?: string;
  image?: string;
  startDate?: string;
  endDate?: string;
  slots?: string[];
}

export interface ContestApiResponse {
  data: {
    data: {
      contest_data: ContestItem[];
    };
  };
  isLoading: boolean;
}
