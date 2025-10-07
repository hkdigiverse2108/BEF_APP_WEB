import { Form, Select } from "antd";
import type { FC } from "react";
import type { FormSelectProps } from "../../Types";

const FormSelect: FC<FormSelectProps> = ({
  name,
  label,
  placeholder,
  options,
  rules,
  className = "",
  required,
  ...rest
}) => {
  console.log(className);
  return (
    <Form.Item
      name={name}
      label={label}
      rules={
        rules ||
        (required ? [{ required: true, message: `${label} is required` }] : [])
      }
      {...rest}
      className={className}
    >
      <Select
        placeholder={placeholder || `Select ${label}`}
        allowClear
        size="large"
      >
        {options?.map((opt) => (
          <Select.Option key={opt.value} value={opt.value}>
            {opt.label}
          </Select.Option>
        ))}
      </Select>
    </Form.Item>
  );
};

export default FormSelect;
