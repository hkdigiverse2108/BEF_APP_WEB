import type { ModuleType } from "./Course";

export interface PriceInfo {
  discountPrice?: number;
  payingPrice?: number;
  price?: number;
}

export interface PurchaseData {
  id: string;
  type: "Course" | "Workshop";
  title?: string;
  price: PriceInfo;
  modulesData?: ModuleType[];
  // isDiscountPrice? : boolean;
}
