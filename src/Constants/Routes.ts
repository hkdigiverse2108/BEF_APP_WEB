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
    MISTAKE_MAP_REPORT: "/exam/mistake-map-report"
  },
} as const;
