import { Form, Input } from "antd";
import type { FC } from "react";
import type { FormInputProps } from "../../Types";
import type { TextAreaProps } from "antd/es/input";

const FormInput: FC<FormInputProps> = ({ name, label, placeholder, rules, required, type = "text",formItemProps ,...inputProps}) => {
  return (
    <Form.Item className={`${type === "otp" ? " -left" : "text-left"}`} name={name} label={label} rules={rules || (required ? [{ required: true, message: `${type === "otp" ? name : label}  is required` }] : [])} {...formItemProps}>
      {
        type === "password" ?
          <Input.Password type={type} size="large" placeholder={placeholder || label} {...inputProps} />
          :
          type === "otp" ?
            <Input.OTP type={type} size="large" />
            :
            type === "textArea"?
            <Input.TextArea size="large" placeholder={placeholder || label} {...inputProps as TextAreaProps} />
            :
            <Input type={type} size="large" placeholder={placeholder || label} {...inputProps} />
      }
    </Form.Item>
  );
};

export default FormInput;
