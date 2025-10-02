import { Dayjs } from "dayjs";

export interface LoginForm {
    countryCode: string;
    uniqueId: string;
    password: string;
    userType: string;
}

export interface RegisterForm {
    firstName: string;
    lastName: string;
    email: string;
    gender?: string;

    dob?: Dayjs;        // AntD DatePicker returns Dayjs
    city?: string;
    language: string;
    contact: {
        countryCode: string;
        mobile: string;
    };

    referralCode?: string;
    examTypeId: string; // in form it's single value
    upscNumber: string;
    password: string;
}

// Payload after formatting for API
export interface RegisterPayload extends Omit<RegisterForm, "dob" | "examTypeId"> {
    dob: string | null;        // formatted to YYYY-MM-DD
    examTypeId: string[];      // wrapped in array
}