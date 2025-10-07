export interface Subject {
  _id: string;
  name: string;
  desc?: string;
  image?: string;
}
export interface SubjectApiResponse {
  isLoading: boolean;
  data: {
    data: {
      subject_data: Subject[];
    };
  };
}

export interface DrawerState {
  open: boolean;
  id?: string;
}
