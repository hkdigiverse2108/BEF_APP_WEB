export const ROUTES = {
  HOME: "/",
  AUTH: {
    LOGIN: "/login",
    REGISTER: "/register",
    VERIFY_OTP: "/verify-otp",
    FORGOT_PASSWORD: "/forgot-password",
    RESET_PASSWORD: "/reset-password",
  },
  CONTEST: {
    CONTEST: "/contest",
    MY_CONTEST: "/my-contest",
    CONTEST_DETAILS: "/contest/details",
    CONTEST_WINNERS: "/contest/winners",
  },
  EXAM: {
    INSTRUCTION: "/exam/instruction",
    QUESTION: "/exam/question",
    RESULT: "/exam/result",
    MISTAKE_MAP_REPORT: "/exam/mistake-map-report",
    SOLUTION: "/exam/solution",
  },
  KYC: {
    KYC: "/kyc",
    KYC_VERIFICATION: "/kyc/verification",
  },
  RECHARGE: { RECHARGE: "/recharge" },
  MY_INFO: { MY_INFO: "/my-info" },
  GET_SCHOLARSHIP: { GET_SCHOLARSHIP: "/get-scholarship" },
  HISTORY: { HISTORY: "/history" },
  HOW_TO_PLAY: { HOW_TO_PLAY: "/how-to-play" },
} as const;
