import type { ButtonProps } from "antd";

export interface FormInputProps {
  name: string;
  label?: string;
  placeholder?: string;
  rules?: any[];
  required?: boolean;
  type?: string;
}

export interface OptionType {
  label: string;
  value: string;
}

export interface FormSelectProps {
  name: string;
  label: string;
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
  text: string;
  htmlType?: "button" | "submit" | "reset";
  type?: "default" | "primary" | "dashed" | "link" | "text";
  className?: string;
  onClick?: React.MouseEventHandler<HTMLElement>;
}