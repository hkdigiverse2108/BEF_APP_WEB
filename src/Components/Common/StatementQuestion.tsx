import { Checkbox } from "antd";
import { CheckCircleFilled, CheckCircleOutlined, CloseCircleFilled, CloseCircleOutlined } from "@ant-design/icons";
import { isImage } from "../../Utils";

export interface StatementQuestionProps {
  id: number;
  statements: string | undefined;
  answers?: Record<number, number | undefined>;
  onCheck?: (id: number, type: "true" | "false") => void;
}

export const StatementQuestion = ({ id, statements, answers, onCheck }: StatementQuestionProps) => {
  const showImage = isImage(statements || "");
  return (
    <div className="flex max-sm:flex-col sm:justify-between items-center w-full gap-3 question">
      <div className="flex justify-start w-full font-normal capitalize gap-1">
        <span className="font-semibold">{id + 1}. </span>

        {showImage ? <img src={statements} className="transparent-img"/> : <span className="font-normal">{statements}</span>}
      </div>
      {onCheck && answers && (
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
