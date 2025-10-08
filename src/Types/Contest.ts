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

export interface Contest {
  _id?: string;
  name?: string;
  "contest-type"?: ContestType; // matches your destructuring
  pricePool?: string | number;
  filledSpots?: number;
  totalSpots?: number;
  fees?: string | number;
  winnerPercentage?: string | number;
  winningAmountPerFee?: number;
  status?: string;
}

export interface ContestDetailCardProps {
  contest?: Contest;
}
