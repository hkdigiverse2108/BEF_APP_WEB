import { Form, Input } from "antd";
import type { FC } from "react";
import type { FormInputProps } from "../../Types";

const FormInput: FC<FormInputProps> = ({ name, label, placeholder, rules, required, type = "text",formItemProps ,...inputProps}) => {
  return (
    <Form.Item className={`${type === "otp" ? "" : "text-left"}`} name={name} label={label} rules={rules || (required ? [{ required: true, message: `${type === "otp" ? name : label}  is required` }] : [])} {...formItemProps}>
      {
        type === "password" ?
          <Input.Password type={type} size="large" placeholder={placeholder || label} {...inputProps} />
          :
          type === "otp" ?
            <Input.OTP type={type} size="large" />
            :
            <Input type={type} size="large" placeholder={placeholder || label} {...inputProps} />
      }
    </Form.Item>
  );
};

export default FormInput;
