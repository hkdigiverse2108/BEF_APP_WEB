import { Checkbox } from "antd";
import {
  CheckCircleFilled,
  CheckCircleOutlined,
  CloseCircleFilled,
  CloseCircleOutlined,
} from "@ant-design/icons";
import { FaRegCircle } from "react-icons/fa";

export interface NormalQuestionProps {
  id: number;
  opt: string;
  text: string;
  answers: Record<number, number>;
  onCheck: (id: number, type: "true" | "false") => void;
}

export const NormalQuestion = ({
  id,
  opt,
  text,
  answers,
  onCheck,
}: NormalQuestionProps) => {
  return (
    <div className="flex max-sm:flex-col justify-center items-center w-full gap-3 question">
      {/* Desktop True Checkbox */}
      <div
        onClick={() => onCheck(id, "true")}
        className=" bg-amber-500 flex w-full"
      >
        <div className="hidden sm:flex">
          <Checkbox
            checked={answers[id] === 1}
            onChange={() => onCheck(id, "true")}
          >
            {answers[id] === 1 ? (
              <CheckCircleFilled style={{ color: "green" }} />
            ) : (
              <FaRegCircle style={{ color: "gray" }} />
            )}
          </Checkbox>
        </div>

        {/* Text */}
        <span className="flex-1 font-medium">{`${opt}. ${text}`}</span>
      </div>

      {/* Mobile True + False */}
      <div className="flex justify-end max-sm:w-full gap-2">
        <div className="sm:hidden">
          <Checkbox
            checked={answers[id] === 1}
            onChange={() => onCheck(id, "true")}
          >
            {answers[id] === 1 ? (
              <CheckCircleFilled style={{ color: "green" }} />
            ) : (
              <CheckCircleOutlined style={{ color: "gray" }} />
            )}
          </Checkbox>
        </div>

        <Checkbox
          checked={answers[id] === 0}
          onChange={() => onCheck(id, "false")}
        >
          {answers[id] === 0 ? (
            <CloseCircleFilled style={{ color: "red" }} />
          ) : (
            <CloseCircleOutlined style={{ color: "red" }} />
          )}
        </Checkbox>
      </div>
    </div>
  );
};
