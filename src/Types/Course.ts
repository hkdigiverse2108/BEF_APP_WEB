import type { MessageStatus, PageStatus } from "./Common";

export interface CourseItem {
  _id: string;
  title: string;
  image: string;
  language: string;
  syllabus: {
    subjectLevel: string;
    fullSyllabus: string;
  };
  courseMoneyBack: string;
  totalLecture: number;
  totalTest: number;
  description: string;
  pdf: string;
  price: number;
  discountPrice: number;
  payingPrice: number;
  priceInStruction: string;
  courseUpgradePrice: number;
  isDeleted: boolean;
  createdBy: string;
  updatedBy: string;
  createdAt: string;
  updatedAt: string;
}

export interface CourseType extends PageStatus {
  course_data: CourseItem[];
}

export interface CourseResponse extends MessageStatus {
  data: CourseType;
}

export interface CourseApiResponse {
  data: CourseResponse;
  isLoading: boolean;
}
export interface CourseDetailsResponse extends MessageStatus {
  data: CourseItem;
}

export interface CourseDetailsApiResponse{
  data: CourseDetailsResponse;
}
