import { Checkbox } from "antd";
import { CheckCircleFilled, CheckCircleOutlined, CloseCircleFilled, CloseCircleOutlined } from "@ant-design/icons";

export interface StatementQuestionProps {
  id: number;
  statements: string | undefined;
  answers?: Record<number, number | undefined>;
  onCheck?: (id: number, type: "true" | "false") => void;
}

export const StatementQuestion = ({ id, statements, answers, onCheck }: StatementQuestionProps) => {
  return (
    <div className="flex max-sm:flex-col justify-center items-center w-full gap-3 question">
      <span className="w-full font-medium">{`${id + 1}. ${statements}`}</span>
      {(onCheck && answers) && (
        <div className="flex justify-end max-sm:w-full gap-2">
          <Checkbox checked={answers[id] === 1} onChange={() => onCheck(id, "true")}>
            {answers[id] === 1 ? <CheckCircleFilled style={{ color: "green" }} className="icon" /> : <CheckCircleOutlined style={{ color: "green" }} className="icon" />}
          </Checkbox>

          <Checkbox checked={answers[id] === 0} onChange={() => onCheck(id, "false")}>
            {answers[id] === 0 ? <CloseCircleFilled style={{ color: "red" }} className="icon" /> : <CloseCircleOutlined style={{ color: "red" }} className="icon" />}
          </Checkbox>
        </div>
      )}
    </div>
  );
};
