import { CheckCircleFilled, CloseCircleFilled, CloseCircleOutlined } from "@ant-design/icons";
import { Badge, message, Tooltip } from "antd";
import { FaRegCircle } from "react-icons/fa";
import { IoLanguage } from "react-icons/io5";
import { FormButton } from "../../../Attribute/FormFields";
import { CardHeader } from "../../../Components/Common/CardHeader";
import { InstructionButtons } from "../../../Data";
import { useLocation, useNavigate } from "react-router-dom";
import { ROUTES } from "../../../Constants";

const ExamInstruction = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [messageApi, contextHolder] = message.useMessage();

  const contestStartDate = location?.state?.contestStartDate;
  const queryParam = new URLSearchParams(location.search);
  const contestId = queryParam.get("contestId");

  console.log(contestStartDate);
  const handleNextButton = () => {
    // const now = Date.now();
    // const start = new Date(contestStartDate).getTime();
    // const endLimit = start + 10 * 60 * 1000;

    // if (now >= start && now <= endLimit) {
    //   navigate(`${ROUTES.EXAM.QUESTION}?contestId=${contestId}`);
    // } else {
    //   if (now <= start) {
    //     messageApi.warning("Contest has not started yet!");
    //   } else {
    //     messageApi.warning("Contest time window is closed!");
    //   }
    // }

    const now = new Date();
    now.setSeconds(0, 0); // remove seconds + ms

    const startDate = new Date(contestStartDate);
    startDate.setSeconds(0, 0); // remove seconds + ms

    const nowMs = now.getTime();
    const startMs = startDate.getTime();

    // 10 min window
    const endLimit = startMs + 10 * 60 * 1000;

    if (nowMs >= startMs && nowMs <= endLimit) {
      navigate(`${ROUTES.EXAM.QUESTION}?contestId=${contestId}`);
    } else {
      if (nowMs < startMs) {
        messageApi.warning("Contest has not started yet!");
      } else {
        messageApi.warning("Contest time window is closed!");
      }
    }
  };

  return (
    <>
      {contextHolder}
      <div className="sub-container pt-8">
        <CardHeader title="Exam Instructions" />
        <hr className="text-card-border my-4" />

        <div className="flex flex-col gap-10 mt-6">
          <div>
            <h2 className="font-semibold text-lg mb-3">1. Practice Actively Label Each Statement True Or False!</h2>
            <div className="grid grid-cols-1 2xl:grid-cols-2">
              <div className="border border-card-border p-4 shadow-sm rounded-lg flex max-sm:flex-col justify-center items-center w-full gap-3 question">
                <span className="flex-1 font-medium">1. Both Statement-1 and statement-2 are correct and Statement-2 explains Statement-1</span>
                <div className="flex justify-end max-sm:w-full">
                  <Tooltip title="Click if statement is True" color="#dcfce7" open placement="left" zIndex={40}>
                    <CheckCircleFilled style={{ color: "#288F66" }} className="px-2" />
                  </Tooltip>
                  <Tooltip title="Click if statement is False" color="#ffe2e2" open placement="bottom" zIndex={40}>
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
                  <Tooltip title="Click if you want to eliminate option" color="#ffe2e2" open zIndex={40}>
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
            <div className="flex justify-center">
              <div className="w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                {InstructionButtons.map((btn, i) => (
                  <div key={i} className="grid grid-cols-1 xl:grid-cols-3 xl:items-center gap-5">
                    <button className={`flex items-center gap-3 shadow-btn-shadow py-3 px-4 h-fit text-sm font-semibold text-white rounded-xl transition-all duration-200 hover:scale-105 ${btn.color}`}>
                      {btn.icon}
                      {btn.label}
                    </button>
                    <div className="xl:col-span-2 relative bg-input-box p-3 rounded-lg shadow-md">
                      <div className="absolute block w-4 h-4 bg-input-box rotate-45 top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 xl:top-1/2 xl:-left-0 xl:-translate-x-1/2 xl:-translate-y-1/2" />
                      <p className="text-sm text-center xl:text-left">{btn.tooltipLabel}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
          <span className="border-t border-card-border flex w-full" />
          <div>
            <h2 className="font-semibold text-lg mb-3">4. "2X The Stakes, 2X The Thrill!"</h2>
            <div className="pt-4 flex items-center gap-3">
              <div className="flex max-sm:flex-col items-center gap-5">
                <Badge count={"2X"} color="#FE6E13">
                  <div className="text-sm py-2 px-4 bg-input-box shadow-btn-shadow">
                    <span className="font-bold rounded">Question : 01</span>
                  </div>
                </Badge>
                <div className="sm:col-span-2 relative bg-input-box p-3 rounded-lg shadow-md">
                  <div className="absolute block w-4 h-4 bg-input-box rotate-45 top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 sm:top-1/2 sm:-left-0 sm:-translate-x-1/2 sm:-translate-y-1/2" />
                  <p className="text-sm text-center sm:text-left">Answer correctly: Earn double marks. Answer wrong: Lose double marks.</p>
                </div>
              </div>
            </div>
          </div>
          <span className="border-t border-card-border flex w-full" />

          <div>
            <h2 className="font-semibold text-lg mb-3">5. You Can Change Language</h2>
            <div className="flex items-center gap-3">
              <Tooltip title="English / Hindi" color="#ffe2e2" open placement="right" zIndex={40}>
                <span className="text-sm font-bold  flex flex-nowrap gap-2">
                  <IoLanguage className="text-xl" />
                  Language
                </span>
              </Tooltip>
            </div>
          </div>
        </div>
        <div className="w-full flex justify-end mt-8">
          <FormButton onClick={handleNextButton} text="NEXT" className="custom-button w-full sm:w-40 button button--mimas text-center !p-4 !h-12 uppercase" />
        </div>
      </div>
    </>
  );
};

export default ExamInstruction;
