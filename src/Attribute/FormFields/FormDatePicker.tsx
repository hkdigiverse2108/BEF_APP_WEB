import { DatePicker, Form } from "antd";
import type { FC } from "react";
import type { FormDatePickerProps } from "../../Types";

const FormDatePicker: FC<FormDatePickerProps> = ({ name, label, rules, required }) => {
  return (
    <Form.Item name={name} label={label} rules={rules || (required ? [{ required: true, message: `${label} is required` }] : [])}>
      <DatePicker className="w-full" size="large" />
    </Form.Item>
  );
};

export default FormDatePicker;
