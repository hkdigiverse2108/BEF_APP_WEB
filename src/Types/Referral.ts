import type { MessageStatus, PageStatus } from "./Common";

export interface ReferralType {
  firstName: string;
  lastName: string;
  profileImage: string;
  amount: number;
  email: string;
  createdAt: string;
}

export interface ReferralDataResponse extends PageStatus {
  data: ReferralType[];
  totalAmount: number;
}
export interface ReferralResponse extends MessageStatus {
  data: ReferralDataResponse;
}

export interface ReferralApiResponse {
  data: ReferralResponse;
  isLoading?: boolean;
}
