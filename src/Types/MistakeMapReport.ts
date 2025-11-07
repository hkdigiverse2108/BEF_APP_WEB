import type { MessageStatus } from "./Common";

export interface CategorySubtopic {
  [subtopic: string]: number;
}

export interface CategoryItem {
  total: number;
  subtopics: CategorySubtopic;
}

export interface CategoriesType {
  sillyMistake: CategoryItem;
  conceptMistake: CategoryItem;
  revisionLacking: CategoryItem;
  outOfMaterial: CategoryItem;
  currentAffairNotRead: CategoryItem;
}

export interface MistakeMapReportType {
  categories: CategoriesType;
  mistakeMapped: number;
  totalIncorrect: number;
}

export interface MistakeMapReportResponse extends MessageStatus {
  data: MistakeMapReportType;
}

export interface MistakeMapReportApiResponse {
  data: MistakeMapReportResponse;
  isLoading: boolean;
}
