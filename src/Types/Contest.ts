import type { Dayjs } from "dayjs";

/* ---------- WINNER TYPES ---------- */
export interface WinnerType {
  firstName: string;
  lastName: string;
  profileImage: string;
  totalAmount: string;
}

export interface ContestWinnerCardProps {
  winner: WinnerType;
  rank: number;
}

export interface WinnersBox {
  title: string;
  ListData: WinnerType[];
  index: number;
}

export interface WinnerApiResponse {
  data: {
    data: {
      lastMonthUsers: WinnerType[];
      lastWeekUsers: WinnerType[];
      todayUsers: WinnerType[];
      lastYearUsers: WinnerType[];
    };
  };
  isLoading: boolean;
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
  contestId?: string;
}

/* ---------- COMPONENT PROP ---------- */
export interface ContestDetailCardProps {
  contestData: ContestData;
  type?: string;
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

export type RangeOption = {
  label: string;
  min: number;
  max: number | null;
};

export type ContestFilters = {
  entry: RangeOption | null;
  spots: RangeOption | null;
  prizePool: RangeOption | null;
  contestType: string;
};

export interface ContestPrize {
  startPlace: string;
  endPlace?: string | null;
  price: number;
}
