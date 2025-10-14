import { CheckCircleFilled, CloseCircleFilled, CloseCircleOutlined } from "@ant-design/icons";
import { Badge, Tooltip } from "antd";
import { FaRegCircle } from "react-icons/fa";
import { IoLanguage } from "react-icons/io5";
import { FormButton } from "../../../Attribute/FormFields";
import { CardHeader } from "../../../Components/Common/CardHeader";

const ExamInstruction = () => {
  const buttons = [
    { label: "100% Sure", color: "bg-blue-600", placement: "topLeft", tooltipLabel: "Confident about your answer? Select this when you’re absolutely certain it’s correct!", tooltipColor: "#dbeafe" },
    { label: "Logic Play", color: "bg-rose-500", placement: "top", tooltipLabel: "Use elimination or aptitude techniques to solve the question! Click here to showcase your tactical skills!", tooltipColor: "#fce7f3" },
    { label: "Intuition Hit", color: "bg-sky-500", placement: "topRight", tooltipLabel: "Trusting your gut? Select this when you feel the answer is in your reach, even without full certainty!", tooltipColor: "#dff2fe" },
    { label: "Blind Fire", color: "bg-amber-500", placement: "bottomLeft", tooltipLabel: "Taking a wild guess? Choose this when you're answering without any clue!", tooltipColor: "#fef3c6" },
    { label: "Skip", color: "bg-purple-700", placement: "bottom", tooltipLabel: "Want to skip this one? No problem, move ahead confidently!", tooltipColor: "#f3e8ff" },
    { label: "Fear - Driver Skip", color: "bg-green-700", placement: "bottomRight", tooltipLabel: "Feeling uncertain? Select this to skip due to lack of confidence.", tooltipColor: "#dcfce7" },
  ];
  return (
    <div className="sub-container pt-8">
      <CardHeader title="Exam Instructions" />

      <div className="flex flex-col gap-10 mt-6">
        <div>
          <h2 className="font-semibold text-lg mb-3">1. Practice Actively Label Each Statement True Or False!</h2>
          <div className="grid grid-cols-1 2xl:grid-cols-2">
            <div className="border border-card-border p-4 shadow-sm rounded-lg flex max-sm:flex-col justify-center items-center w-full gap-3 question">
              <span className="flex-1 font-medium">1. Both Statement-1 and statement-2 are correct and Statement-2 explains Statement-1</span>
              <div className="flex justify-end max-sm:w-full">
                <Tooltip title="Click if statement is True" color="#dcfce7" open placement="left">
                  <CheckCircleFilled style={{ color: "#288F66" }} className="px-2" />
                </Tooltip>
                <Tooltip title="Click if statement is False" color="#ffe2e2" open placement="top">
                  <CloseCircleFilled style={{ color: "red" }} className="px-2" />
                </Tooltip>
              </div>
            </div>
          </div>
        </div>
        <span className="border-t border-card-border flex w-full" />
        <div>
          <h2 className="font-semibold text-lg mb-3">2. Improve accuracy : use the elimination icon for 50-50 or 33-33-33!</h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-3">
            <div className="border border-card-border p-4 shadow-sm rounded-lg flex max-sm:flex-col justify-center items-center w-full gap-3 question">
              <div className="flex items-center w-full">
                <FaRegCircle style={{ color: "gray" }} />
                <span className="flex-1 font-medium px-2">Both Statement-1 and statement-2 are correct and Statement-2 explains Statement-1</span>
                <Tooltip title="Click if you want to eliminate option" color="#ffe2e2" open>
                  <CloseCircleOutlined style={{ color: "red" }} className="px-2" />
                </Tooltip>
              </div>
            </div>
            <div className="border border-red-500 bg-red-50 p-4 shadow-sm rounded-lg flex max-sm:flex-col justify-center items-center w-full gap-3 question">
              <div className="flex items-center w-full">
                <FaRegCircle style={{ color: "gray" }} />
                <span className="flex-1 font-medium px-2">Statement-1 is incorrect, but statement-2 is correct</span>
                <CloseCircleFilled style={{ color: "red" }} className="px-2" />
              </div>
            </div>
          </div>
        </div>
        <span className="border-t border-card-border flex w-full" />

        <div className="min-h-48">
          <h2 className="font-semibold text-lg mb-3">3. Strategize Your Answers: Button Actions Explained</h2>
          <div className=" flex justify-center">
            <div className="w-4xl grid grid-cols-1 sm:grid-cols-3  gap-4">
              {buttons.map((btn, i) => (
                <Tooltip key={i} title={btn.tooltipLabel} color={btn.tooltipColor} placement={btn.placement} open>
                  <button className={`shadow-btn-shadow p-3 text-sm font-semibold text-white rounded-xl transition-all duration-200 hover:scale-105 ${btn.color}`}>{btn.label}</button>
                </Tooltip>
              ))}
            </div>
          </div>
        </div>
        <div className="min-h-48">
          <h2 className="font-semibold text-lg mb-3">3. Strategize Your Answers: Button Actions Explained</h2>
          <div className="flex justify-center">
            <div className="w-full grid grid-cols-1 sm:grid-cols-3  gap-4">
              {buttons.map((btn, i) => (
                <div key={i} className="flex">
                  <button className={`shadow-btn-shadow p-3 text-sm font-semibold text-white rounded-xl transition-all duration-200 hover:scale-105 ${btn.color}`}>{btn.label}</button>
                  <div className="custom-tooltip"></div>
                </div>
              ))}
            </div>
          </div>
        </div>
        <span className="border-t border-card-border flex w-full" />
        <div>
          <h2 className="font-semibold text-lg mb-3">4. "2X The Stakes, 2X The Thrill!"</h2>
          <div className="pt-4 flex items-center gap-3">
            <Tooltip title="Answer correctly: Earn double marks. Answer wrong: Lose double marks." color="#dcfce7" open placement="right">
              <Badge count={"2X"} color="#FE6E13">
                <div className="text-sm py-2 px-4 bg-input-box">
                  <span className="font-bold rounded">Question : 01</span>
                </div>
              </Badge>
            </Tooltip>
          </div>
        </div>
        <span className="border-t border-card-border flex w-full" />

        <div>
          <h2 className="font-semibold text-lg mb-3">5. You Can Change Language</h2>
          <div className="flex items-center gap-3">
            <Tooltip title="English / Hindi" color="#ffe2e2" open placement="right">
              <span className="text-sm font-bold  flex flex-nowrap gap-2">
                <IoLanguage className="text-xl" />
                Language
              </span>
            </Tooltip>
          </div>
        </div>
      </div>

      <div className="w-full flex justify-end my-8">
        <FormButton text="NEXT" className="custom-button w-full sm:w-40 button button--mimas text-center !p-4 !h-12 uppercase" />
      </div>
    </div>
  );
};

export default ExamInstruction;
