import type { ModuleType } from "./Course";
import type { LectureType } from "./Lecture";

export interface PriceInfo {
  discountPrice?: number;
  payingPrice?: number;
  price?: number;
}

export interface PurchaseData {
  id: string;
  title?: string;
  price: PriceInfo;
  modulesData?: ModuleType[];
  lecturesData?: LectureType[];
  priceInStruction?: string;
}
