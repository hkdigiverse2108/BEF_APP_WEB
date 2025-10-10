
export interface WinnerType {
  name: string;
  rank: string;
  img: string;
  amount: string;
}

export interface ContestWinnerCardProps {
  winner: WinnerType;
}

export interface ContestType {
  name?: string;
}
export interface PayloadTime {
  startTime?: string;
  endTime?: string;
}

export interface Contest {
  _id?: string;
  name?: string;
  pricePool?: string | number;
  filledSpots?: number;
  totalSpots?: number;
  fees?: string | number;
  winnerPercentage?: string | number;
  winningAmountPerFee?: number;
  status?: string;
  slots?: string[];
  payload?: PayloadTime;
}

export interface ContestDetailCardProps {
  contest: Contest;
}

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
}
