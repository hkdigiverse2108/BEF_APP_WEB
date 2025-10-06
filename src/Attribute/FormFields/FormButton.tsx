import { Button } from "antd";
import type { FC } from "react";
import type { FormButtonProps } from "../../Types";

const FormButton: FC<FormButtonProps> = ({ text, htmlType = "button", type = "default", className = "", onClick, ...rest }) => {
  return (
    <Button htmlType={htmlType} type={type} className={`outline-none ${className}`} onClick={onClick} {...rest}>
      <span>{text}</span>
    </Button>
  );
};

export default FormButton;
