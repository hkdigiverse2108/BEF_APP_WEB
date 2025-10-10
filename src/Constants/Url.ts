export const URL_KEYS = {
  AUTH: {
    LOGIN: "/auth/login",
    REGISTER: "/user/add",
    RESET_PASSWORD: "/auth/reset-password",
    FORGOT_PASSWORD: "/auth/forgot-password",
    CHANGE_PASSWORD: "/auth/change-password",
    VERIFY_OTP: "/auth/otp/verify",
    RESEND_OTP: "/auth/resend-otp",
  },
  USER: {
    CHECK: "/user/check",
  },
  EXAM_TYPE: {
    EXAM_TYPE: "/exam-type",
  },
  BANNER: {
    ALL: "/banner/all",
  },
  CLASSES: {
    ALL: "/classes/all",
  },
  SUBJECT: {
    ALL: "/subject/all",
  },
  SUB_TOPIC: {
    ALL: "/sub-topic/all",
  },
  CONTEST: {
    ALL: "/contest/all",
  },
  QA: {
    ADD: "/qa/add",
    ALL: "/qa/all",
  },
} as const;
