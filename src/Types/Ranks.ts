import type { MessageStatus } from "./Common";

export interface WinnersRankType {
  userId: string;
  rank: number;
  profileImage: string;
  points: number;
  firstName: string;
  lastName: string;
  _id: string;
}

export interface RankListType {
  endPlace: string;
  startPlace: string;
  price: number;
  winners: WinnersRankType[];
  _id: string;
}

export interface RanksType {
  _id: string;
  createdAt: string;
  updatedAt: string;
  contestStartDate: string;
  contestEndDate: string;
  isUserBalanceUpdated: boolean;
  isUserRankUpdated: boolean;
  ranks: RankListType[];
  qaIds: string[];
}

export interface RanksResponse extends MessageStatus {
  data: RanksType[];
}

export interface RanksApiResponse {
  data: RanksResponse;
  isLoading?: boolean;
}
