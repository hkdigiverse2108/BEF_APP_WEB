// types/ClassTypes.ts
export interface ClassItem {
  _id: string;
  name: string;
  description?: string;
  image?: string;
}

export interface ClassesApiResponse {
  data: {
    classes_data: ClassItem[];
  };
}
