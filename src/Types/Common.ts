import type {
  ButtonProps,
  DatePickerProps,
  FormItemProps,
  InputProps,
  SelectProps,
} from "antd";
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
  backButton?: string;
  pricePool?: { icon: ReactNode; price: string };
  sliderButton?: {
    swiperRefs : any ;
    index?: number;
    // prev: { swiperRef: any };
    // next: { swiperRef: any };
  };
}
