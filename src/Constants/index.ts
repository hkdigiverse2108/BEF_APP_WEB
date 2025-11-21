import { ROUTES } from "./Routes";
import { HTTP_STATUS } from "./HttpStatus";
import { URL_KEYS } from "./Url";
import { STORAGE_KEYS } from "./StorageKeys";

export const Href: string = "#Javascript";
export const ImagePath: string = "/assets/images/";
export const HK_DIGIVERSE_URL = "https://hkdigiverse.com/";

export const CONTACT = {
  NUMBER: "+91 84604 64463",
  EMAILINFO: "info@bharatexamfest.com",
  EMAILHELP: "help@bharatexamfest.com",
  EMAILSALES: "sales@bharatexamfest.com",
  ADDRESS: "501-502, Silver Trade Center, Mota Varachhha, Surat, Gujarat, India-394101.",
} as const;

export const PAYMENT_STATUS = {
  COMPLETED: "COMPLETED",
  FAILED: "FAILED",
} as const;

export const TRANSACTION_TYPE = {
  DEPOSIT: "deposit",
  WITHDRAW: "withdraw",
} as const;

export const TRANSACTION_STATUS = {
  SUCCESS: "success",
  FAILED: "failed",
} as const;

export const EARNING_TYPE = {
  CONTEST: "contest",
  CONTEST_PAID_USER: "contestPaidUser",
  REWARD: "reward",
  CONTEST_USER_REFERRAL: "userReferral",
  CONTEST_WINNING: "contestWinning",
  COURSE: "course",
  WORKSHOP: "workshop",
} as const;

export { ROUTES, HTTP_STATUS, URL_KEYS, STORAGE_KEYS };
