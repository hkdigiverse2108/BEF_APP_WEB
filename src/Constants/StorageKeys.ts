export const STORAGE_KEYS = {
  USER: "BEF_Web_User",
  TOKEN: "BEF-Web-Token",
  FORGOT_PASSWORD_EMAIL: "BEF_Web_Forgot_Password",
  OTP_EXPIRY_KEY: "BEF_Web_Otp_Expiry_Time",

  KYC: "BEF_Web_KYC",
  CONTEST_QA: "BEF_Web_Contest_Qa",

  // Contest Flow — Fixed Naming + No Duplicate Keys
  CONTEST_QA_EDIT: "BEF_Web_Contest_Qa_Edit",
  CONTEST_ANSWERS: "BEF_Web_Contest_Answers",
  CONTEST_CONFIDENCE: "BEF_Web_Contest_Confidence",
} as const;
