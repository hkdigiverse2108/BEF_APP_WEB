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
    SUBJECT: "/subject",
  },
  SUB_TOPIC: {
    ID: "/sub-topic/",
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
    EDIT: "/qa/edit",
    ALL: "/qa/all",
    CONTEST_RANKS: "/qa/contest/ranks",
    MISTAKE_MAP: "/qa/mistake-map/",
    CONTEST_QUESTION: "/qa/contest/question",
    WHY_FALSE: "/qa/why-false",
  },
  QUESTION: {
    ID: "/question/",
    AI_MENTOR: "/question/ai-mentor",
  },
  TERMS_CONDITION: {
    TERMS_CONDITION: "/terms-condition",
  },
  PRIVACY_POLICY: {
    PRIVACY_POLICY: "/privacy-policy",
  },
  LEGALITY: {
    LEGALITY: "/illegality",
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
    ADD: "/transaction/add",
    ALL: "/transaction/all",
  },
  RESULT_REPORT: {
    ID: "/result-report/",
    ADD: "/result-report/add",
  },
  REPORT: {
    REPORT: "/report",
  },
  FULL_FEST: {
    FULL_FEST: "/full-fest",
  },
  WORKSHOP: {
    ALL: "workshop/all",
    ID: "/workshop/",
    TESTIMONIAL: "workshop-testimonial/all",
    REGISTER_ADD: "/workshop-register/add",
  },
  COURSE: {
    ALL: "/course/all",
    ID: "/course/",
    PURCHASE_ADD: "course-purchase/add",
  },
  MODULE: {
    ALL: "/module/all",
  },
  FAQ: {
    ALL: "/faq/public",
  },
  LECTURE: {
    ALL: "/lecture/all",
  },
  BALANCE: {
    ALL: "/balance/all",
    ADD: "/balance/add",
    ID: "/balance/",
    VERIFY: "/balance/verify-payment",
  },
  GOAL: {
    GOAL: "/goal",
  },
  SETTINGS: {
    ALL: "/setting",
  },
  WITHDRAW: {
    WITHDRAW: "/withdraw",
    REQUEST: "/withdraw/request",
  },
  CONTACT_US: {
    ADD: "/contact-us/add",
  },
  COUPON: {
    ALL: "/coupon/all",
    CHECK: "/coupon/check",
  },
  YOUTUBE_VISUALS: {
    All: "/youtube-visuals/all",
  },
  BANK_ACCOUNT: {
    ADD: "/bank-account/add",
    EDIT: "/bank-account/edit",
    ALL: "/bank-account/all",
    DELETE: "/bank-account/delete",
  },
} as const;
