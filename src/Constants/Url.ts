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
    ID: "/user/",
    EDIT: "/user/edit",
    REFERRAL: "/user/referrals",
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
    CONTEST_RANKS: "/qa/contest/ranks",
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
  HOW_IT_WORK: {
    ALL: "/how-it-work/all",
  },
  KYC: {
    ALL: "/kyc/all",
    ID: "/kyc/",
    ADD: "/kyc/add",
  },
  UPLOAD: {
    ADD: "/upload",
  },
  TRANSACTION: {
    ALL: "/transaction/all",
  },
  RESULT_REPORT: {
    ID: "/result-report/",
  },
  REPORT: {
    REPORT: "/report",
  },
  FULL_FEST: {
    FULL_FEST: "/full-fest",
  },
  COURSE: {
    ALL: "/course/all",
    ID: "/course/",
  },
  MODULE: {
    COURSE_WISE: "/module/course/",
    ALL: "/module/all",
  },
  FAQ: {
    ALL: "/faq/public",
  },
  LECTURE: {
    COURSE_WISE: "/lecture/course/",
    ALL: "/lecture/all",
  },
  BALANCE: {
    ALL: "/balance/all",
    ID: "/balance/",
  },
  GOAL: {
    GOAL: "/goal",
  },
  SETTINGS: {
    ALL: "setting",
  },
} as const;
