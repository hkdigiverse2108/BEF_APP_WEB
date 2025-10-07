export interface WinnerType {
  name: string;
  rank: string;
  img: string;
  amount: string;
}

export interface ContestWinnerCardProps {
  winner: WinnerType;
}
