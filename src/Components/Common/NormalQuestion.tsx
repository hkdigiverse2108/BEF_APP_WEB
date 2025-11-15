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
    <div className="flex max-sm:flex-col justify-center items-center w-full question" onClick={() => onCheck(id, "true")}>
      {/* Desktop True Checkbox */}
      <div className="flex w-full py-4 px-4 max-sm:pe-4">
        <div onClick={(e) => e.stopPropagation()} className="flex items-center">
          <Checkbox checked={answers[id] === 1} onChange={() => onCheck(id, "true")} className="">
            <div className="relative">
              {answers[id] === 1 ? <FaRegCircle style={{ color: "green", width: "21px", height: "21px" }} /> : <FaRegCircle style={{ color: "gray", width: "21px", height: "21px" }} />}
              <span className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-xs ${answers[id] === 1 ? "text-success" : ""}`}>{opt}</span>
            </div>
          </Checkbox>
        </div>

        {/* Text */}
        <span className={`flex-1 font-medium capitalize ${answers[id] === 0 ? "line-through" : ""}`}>{text}</span>
        {/* </div> */}

        {/* Mobile True + False */}
        {/* <div className="flex justify-end max-sm:w-full max-sm:gap-2"> */}
        {/* <div className="sm:hidden max-sm:pb-3 sm:!py-4">
          <div onClick={(e) => e.stopPropagation()}>
            <Checkbox checked={answers[id] === 1} onChange={() => onCheck(id, "true")}>
              <div className="relative">
                {answers[id] === 1 ? <FaRegCircle style={{ color: "green" }} /> : <FaRegCircle style={{ color: "gray" }} />}
                <span className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-xs ${answers[id] === 1 ? "text-success" : ""}`}>{opt}</span>
              </div>
            </Checkbox>
          </div>
        </div> */}
        <div onClick={(e) => e.stopPropagation()} className="flex items-center">
          <Checkbox checked={answers[id] === 0} onChange={() => onCheck(id, "false")}>
            {answers[id] === 0 ? <CloseCircleFilled style={{ color: "red" }} className="icon"/> : <CloseCircleOutlined style={{ color: "red" }} className="icon"/>}
          </Checkbox>
        </div>
      </div>
    </div>
  );
};
