import type { MessageStatus, PageStatus } from "./Common";

export interface HistoryType {
  contestId: string;
  createdAt: string;
  createdBy: string;
  description: string;
  earningType: string;
  isBlocked: boolean;
  isDeleted: boolean;
  method: string;
  title: string;
  transactionId: string;
  transactionStatus: string;
  transactionType: string;
  updatedAt: string;
  updatedBy: string;
  userId: string;
  _id: string;
  amount: number;
}

export interface HistoryDataResponse extends PageStatus {
  transaction_data: HistoryType[];
}
export interface HistoryResponse extends MessageStatus {
  data: HistoryDataResponse;
}

export interface HistoryApiResponse {
  data: HistoryResponse;
  isLoading?: boolean;
}
