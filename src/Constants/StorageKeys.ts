export const STORAGE_KEYS = {
  USER: "BEF_Web_User",
  TOKEN: "BEF-Web-Token",
  FORGOT_PASSWORD_EMAIL: "BEF_Web_Forgot_Password",
  OTP_EXPIRY_KEY: "BEF_Web_Otp_Expiry_Time",

  KYC: "BEF_Web_KYC",
  CONTEST_QA: "BEF_Web_Contest_Qa",

  // Contest Flow — Fixed Naming + No Duplicate Keys
  EXAM_QA_ALL: "BEF_Web_Exam_Qa_All",
  EXAM_QA_ANSWERS: "BEF_Web_Exam_Qa_Answers",
  EXAM_QA_SOLUTION: "BEF_Web_Exam_Qa_Solution",
} as const;
