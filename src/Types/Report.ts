
export interface ReportPayload {
  contestId: string | null; 
  questionId: string | null;  
  qaId: string | null;      
  message?: string;        
}

export interface ReportModalProps {
  payload: ReportPayload;
}
