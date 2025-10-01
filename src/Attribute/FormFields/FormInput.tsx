import { Form, Input } from "antd";
import type { FC } from "react";
import type { FormInputProps } from "../../Types";

const FormInput: FC<FormInputProps> = ({ name, label, placeholder, rules, required, type = "text" }) => {
  return (
    <Form.Item name={name} label={label} rules={rules || (required ? [{ required: true, message: `${label} is required` }] : [])}>
      {
        type === "password" ?
        <Input.Password type={type} size="large" placeholder={placeholder || label} />
        :
        <Input type={type} size="large" placeholder={placeholder || label} />
      }
    </Form.Item>
  );
};

export default FormInput;
