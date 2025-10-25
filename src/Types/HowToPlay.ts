import type { MessageStatus, PageStatus } from "./Common";

export interface HowToPlayType {
  _id: string;
  createdAt: string;
  createdBy: string;
  description: string;
  image: string;
  isBlocked: boolean;
  isDeleted: boolean;
  link: string;
  title: string;
  updatedAt: string;
  updatedBy: string;
}

export interface HowToPlayDataResponse extends PageStatus {
  how_to_play_data: HowToPlayType[];
}
export interface HowToPlayResponse extends MessageStatus {
  data: HowToPlayDataResponse;
}

export interface HowToPlayApiResponse {
  data: HowToPlayResponse;
  isLoading?: boolean;
}
