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
    CONTEST_DETAILS: "/contest/details",
  },
  EXAM: {
    INSTRUCTION: "/exam/instruction",
  },
} as const;
