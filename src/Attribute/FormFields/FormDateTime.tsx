import type { TimePickerProps } from "antd";
import { DatePicker, Form, TimePicker } from "antd";
import dayjs from "dayjs";
import type { FC } from "react";
import type { FormDateTimeProps } from "../../Types";

const FormDateTime: FC<FormDateTimeProps> = ({ name, label, type = "date", rules, required, disablePast, ...rest }) => {
  return (
    <Form.Item name={name} label={label} rules={rules || (required ? [{ required: true, message: `${label || name} is required` }] : [])}>
      {type === "time" ? <TimePicker size="large" style={{ width: "100%" }} {...(rest as TimePickerProps)} /> : <DatePicker size="large" style={{ width: "100%" }} disabledDate={disablePast ? (current) => current && current < dayjs().startOf("day") : undefined} {...rest} />}
    </Form.Item>
  );
};

export default FormDateTime;
