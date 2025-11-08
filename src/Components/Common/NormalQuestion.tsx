import { CloseCircleFilled, CloseCircleOutlined } from "@ant-design/icons";
import { Checkbox } from "antd";
import { FaRegCircle } from "react-icons/fa";

export interface NormalQuestionProps {
  id: number;
  opt: string;
  text: string;
  answers: Record<number, number | undefined>;
  onCheck: (id: number, type: "true" | "false") => void;
}

export const NormalQuestion = ({ id, opt, text, answers, onCheck }: NormalQuestionProps) => {
  return (
    <div className="flex max-sm:flex-col justify-center items-center w-full gap-3 question">
      {/* Desktop True Checkbox */}
      <div onClick={() => onCheck(id, "true")} className="flex w-full">
        <div className="hidden sm:flex items-center">
          <Checkbox checked={answers[id] === 1} onChange={() => onCheck(id, "true")}>
            <div className="relative">
              {answers[id] === 1 ? <FaRegCircle style={{ color: "green" }} /> : <FaRegCircle style={{ color: "gray" }} />}
              <span className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-xs ${answers[id] === 1 ? "text-success" : ""}`}>{opt}</span>
            </div>
          </Checkbox>
        </div>

        {/* Text */}
        <span className={`flex-1 font-medium capitalize ${answers[id] === 0 ? "line-through" : ""}`}>{text}</span>
      </div>

      {/* Mobile True + False */}
      <div className="flex justify-end max-sm:w-full gap-2">
        <div className="sm:hidden">
          <Checkbox checked={answers[id] === 1} onChange={() => onCheck(id, "true")}>
            <div className="relative">
              {answers[id] === 1 ? <FaRegCircle style={{ color: "green" }} /> : <FaRegCircle style={{ color: "gray" }} />}
              <span className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-xs ${answers[id] === 1 ? "text-success" : ""}`}>{opt}</span>
            </div>
          </Checkbox>
        </div>

        <Checkbox checked={answers[id] === 0} onChange={() => onCheck(id, "false")}>
          {answers[id] === 0 ? <CloseCircleFilled style={{ color: "red" }} /> : <CloseCircleOutlined style={{ color: "red" }} />}
        </Checkbox>
      </div>
    </div>
  );
};
