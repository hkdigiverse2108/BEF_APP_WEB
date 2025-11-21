import type { MessageStatus } from "./Common";

export interface BankAccountData {
  accountHolderName: string;
  accountNumber: string;
  accountType: string;
  bankName: string;
  branchName: string;
  createdAt: string;
  createdBy: string;
  ifscCode: string;
  isBlocked: boolean;
  isDefault: boolean;
  isDeleted: boolean;
  updatedAt: string;
  updatedBy: string;
  userId: string;
  _id: string;
}

export interface BankAccountType {
  bank_account_data: BankAccountData[];
}

export interface BankAccountResponse extends MessageStatus {
  data: BankAccountType;
}

export interface BankAccountApiResponse {
  data: BankAccountResponse;
  isLoading: boolean;
}
