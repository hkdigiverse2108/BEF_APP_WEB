import { Checkbox } from "antd";
import {
  CheckCircleFilled,
  CheckCircleOutlined,
  CloseCircleFilled,
  CloseCircleOutlined,
} from "@ant-design/icons";

export interface StatementQuestionProps {
  id: number;
  opt?: string;
  statements: string;
  answers: Record<number, number>;
  onCheck: (id: number, type: "true" | "false") => void;
}

export const StatementQuestion = ({
  id,
  opt,
  statements,
  answers,
  onCheck,
}: StatementQuestionProps) => {
  // console.log("STATEMENT : ", statements);
  return (
    <div className="flex max-sm:flex-col justify-center items-center w-full gap-3 question">
      <span className="flex-1 font-medium">
        {`${opt ? opt : id + 1}. ${statements}`}
      </span>
      <div className="flex justify-end max-sm:w-full gap-2">
        <Checkbox
          checked={answers[id] === 1}
          onChange={() => onCheck(id, "true")}
        >
          {answers[id] === 1 ? (
            <CheckCircleFilled style={{ color: "green" }} />
          ) : (
            <CheckCircleOutlined style={{ color: "green" }} />
          )}
        </Checkbox>

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
