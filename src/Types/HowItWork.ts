import type { MessageStatus, PageStatus } from "./Common";

export interface HowItWorkType {
  _id: string;
  createdAt: string;
  createdBy: string;
  description: string;
  thumbnailImage: string;
  image: string;
  isBlocked: boolean;
  isDeleted: boolean;
  link: string;
  title: string;
  updatedAt: string;
  updatedBy: string;
}

export interface HowItWorkDataResponse extends PageStatus {
  how_it_work_data: HowItWorkType[];
}
export interface HowItWorkResponse extends MessageStatus {
  data: HowItWorkDataResponse;
}

export interface HowItWorkApiResponse {
  data: HowItWorkResponse;
  isLoading?: boolean;
}
