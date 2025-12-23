import type { ButtonProps, DatePickerProps, FormItemProps, GetProp, InputProps, SelectProps, UploadProps } from "antd";
import type { GlobalConfigProps } from "antd/es/config-provider";
import type { UploadListType } from "antd/es/upload/interface";
import type { ReactNode } from "react";

export interface FormInputProps extends InputProps {
  name: string;
  label?: string;
  placeholder?: string;
  rules?: any[];
  required?: boolean;
  type?: string;
  formItemProps?: FormItemProps;
}

export interface OptionType {
  label: string;
  value: string;
}

export interface FormSelectProps extends SelectProps {
  name: string;
  label?: string;
  placeholder?: string;
  options: OptionType[];
  rules?: any[];
  required?: boolean;
  multiple?: "multiple" | "tags" | undefined;
}

export interface FormDatePickerProps {
  name: string;
  label: string;
  rules?: any[];
  required?: boolean;
}

export interface FormButtonProps extends ButtonProps {
  text: string | ReactNode;
  htmlType?: "button" | "submit" | "reset";
  type?: "default" | "primary" | "dashed" | "link" | "text";
  className?: string;
  icon?: any;
  onClick?: React.MouseEventHandler<HTMLElement>;
}

export interface FormDateTimeProps extends DatePickerProps {
  name: string;
  label?: string;
  type?: "date" | "time";
  rules?: any[];
  required?: boolean;
  disablePast?: boolean;
}

export interface CardHeaderType {
  title: string;
  icon?: ReactNode;
  time?: string;
  backButton?: boolean;
  pricePool?: { icon: ReactNode; price: string };
  sliderButton?: {
    swiperRefs: any;
    index?: number;
  };
}

export type AntdNotificationType = "success" | "error" | "info" | "warning" | "open";

export interface GlobalConfigPropsWithStack extends GlobalConfigProps {
  stack?: {
    threshold?: number;
  };
}

export interface FAQ {
  id: number | string;
  question: string;
  answer: string;
}

export interface Params {
  [key: string]: any;
}

// ************ Basic Table Filter Helper Options ***********

export interface UseBasicFilterHelperOptions {
  initialParams?: Params;
  debounceDelay?: number;
  sortKey?: string;
}

// ************ Common Api Data Type ***********

export interface PageState {
  page: number;
  limit: number;
  page_limit: number;
}

export interface PageStatus {
  totalData: number;
  state: PageState;
}

export interface MessageStatus {
  status: number;
  message: string;
  error: Record<string, unknown>;
}

// ************ Upload ***********

export interface UploadResponse {
  data: string;
  error: Record<string, unknown>;
  message: string;
  status: number;
}

export type FileType = Parameters<GetProp<UploadProps, "beforeUpload">>[0];

export interface ImageUploadProps {
  multiple?: boolean;
  name?: string;
  accept?: string;
  isListType?: UploadListType;
  label?: string;
  required?: boolean;
  disabled?: boolean;
  value?: string[];
  onChange?: (value: string[]) => void;
}

// ************ Contact ***********

export interface ContactFormData {
  name: string;
  email: string;
  phone: string;
  website: string;
  company: string;
  message: string;
}

// ************ Testimonial ***********
export interface TestimonialType {
  name: string;
  designation: string;
  description: string;
  rating: number;
  image: string;
}

export interface GlobalConfigPropsWithStack extends GlobalConfigProps {
  stack?: {
    threshold?: number;
  };
}
