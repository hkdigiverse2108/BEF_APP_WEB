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
    WINNER_LIST: "/user/winner-list",
  },
  EXAM: {
    TYPE: "/exam-type",
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
    ID: "/contest/",
    ALL: "/contest/all",
    TYPE: {
      TYPE: "/contest-type",
    },
  },
  QA: {
    ADD: "/qa/add",
    ALL: "/qa/all",
  },
  TERMS_CONDITION: {
    TERMS_CONDITION: "/terms-condition",
  },
  PRIVACY_POLICY: {
    PRIVACY_POLICY: "/privacy-policy",
  },
  ILLEGALITY: {
    ILLEGALITY: "/illegality",
  },
  ABOUT_US: {
    ABOUT_US: "/about-us",
  },
  HOW_TO_PLAY: {
    ALL: "/how-to-play/all",
  },
} as const;
