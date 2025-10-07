export interface WinnerType {
  name: string;
  rank: number;
  img: string;
  amount: string;
}

export interface ContestWinnerCardProps {
  winner: WinnerType;
}
