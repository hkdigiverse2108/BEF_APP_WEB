export interface WorkshopItem {
  _id: string;
  title: string;
  image: string;
  language: string;
  syllabus: string;
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
  isUnlocked: boolean;
  createdBy: string;
  updatedBy: string;
  createdAt: string;
  updatedAt: string;
}
