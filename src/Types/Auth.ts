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

    dob?: Dayjs;    
    city?: string;
    language: string;
    contact: {
        countryCode: string;
        mobile: string;
    };

    referralCode?: string;
    examTypeId: string;
    upscNumber: string;
    password: string;
}

export interface RegisterPayload extends Omit<RegisterForm, "dob" | "examTypeId"> {
    dob: string | null;        
    examTypeId: string[];    
}