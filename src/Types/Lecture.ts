export interface LectureType {
  _id: string;
  courseId: string;
  moduleId: string;
  language: string;
  subjectName: string;
  title: string;
  subtitle: string;
  image: string;
  pdf: string;
  link: string;
  date?: string;
  isLocked: boolean;
}
