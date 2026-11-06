import { useState } from "react";
import { CheckCircleFilled, CloseCircleFilled, CloseCircleOutlined } from "@ant-design/icons";
import { Badge, Tooltip } from "antd";
import { FaRegCircle } from "react-icons/fa";
import { IoLanguage } from "react-icons/io5";
import { FormButton } from "../../../Attribute/FormFields";
import { CardHeader } from "../../../Components/Common/CardHeader";
import { InstructionButtons } from "../../../Data";
import { useLocation, useNavigate } from "react-router-dom";
import { ROUTES } from "../../../Constants";
import { AntMessage } from "../../../Components/Common/AntMessage";
// Preserved tabbed screen (kept available as requested, not deleted)
import { ExamInstructionScreen } from "../../../Components/Exam/ExamInstructionScreen";

const ExamInstruction = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [selectedLang, setSelectedLang] = useState<"English" | "Hindi">("English");

  const contestStartDate = location?.state?.contestStartDate;
  const queryParam = new URLSearchParams(location.search);
  const isLifetime = location?.state?.isLifetime || location?.state?.contestId?.isLifetime || queryParam.get("isLifetime") === "true";
  const contestId = queryParam.get("contestId");
  const qaId = queryParam.get("qaId") || location?.state?.qaId || (location?.state?._id && !location?.state?.isSimulated ? location?.state?._id : null);
  const isPractice = queryParam.get("isPractice") === "true";

  const handleNextButton = (lang: "English" | "Hindi" = selectedLang) => {
    const langParam = lang === "Hindi" ? "hindi" : "english";
    const langKey = lang === "Hindi" ? "hindiQuestion" : "englishQuestion";

    if (isLifetime || isPractice) {
      // Practice or Lifetime mode bypasses live exam time checks!
      navigate(
        `${ROUTES.EXAM.QUESTION}?contestId=${contestId}${isLifetime ? "&isLifetime=true" : ""}${isPractice ? "&isPractice=true" : ""}${qaId ? `&qaId=${qaId}` : ""}&lang=${langParam}`,
        { state: { ...location.state, lang: langKey, language: langKey } }
      );
      return;
    } else {
      const now = new Date();
      now.setSeconds(0, 0); // remove seconds + ms

      const startDate = new Date(contestStartDate);
      startDate.setSeconds(0, 0); // remove seconds + ms

      const nowMs = now.getTime();
      const startMs = startDate.getTime();

      // 10 min window
      const endLimit = startMs + 10 * 60 * 1000;

      const timeIST = startDate.toLocaleTimeString("en-IN", {
        hour: "2-digit",
        minute: "2-digit",
        hour12: true,
        timeZone: "Asia/Kolkata",
      });

      if (nowMs >= startMs && nowMs <= endLimit) {
        navigate(
          `${ROUTES.EXAM.QUESTION}?contestId=${contestId}${qaId ? `&qaId=${qaId}` : ""}&lang=${langParam}`,
          { state: { ...location.state, lang: langKey, language: langKey } }
        );
      } else {
        if (nowMs < startMs) {
          AntMessage("error", `You can join after ${timeIST}`, {
            marginTop: "10vh",
          });
        } else {
          AntMessage("error", "Your time is up! Better luck next time...");
        }
      }
    }
  };

  return (
    <div className="sub-container pt-8 max-w-[1380px] mx-auto">
      <CardHeader title="Exam Instructions" />
      <hr className="text-card-border my-4" />

      <div className="flex flex-col gap-10 mt-6">
        {/* 1. True/False Statement Labeling */}
        <div>
          <h2 className="font-semibold text-lg text-foreground mb-3">1. Practice Actively Label Each Statement True Or False!</h2>
          <div className="grid grid-cols-1 2xl:grid-cols-2">
            <div className="border border-card-border p-4 shadow-sm rounded-lg flex max-sm:flex-col justify-center items-center w-full gap-3 bg-card question">
              <span className="flex-1 font-medium text-foreground">1. Both Statement-1 and statement-2 are correct and Statement-2 explains Statement-1</span>
              <div className="flex justify-end max-sm:w-full items-center">
                <Tooltip title={<span className="text-gray-900 font-medium">Click if statement is True</span>} color="#dcfce7" open placement="left" zIndex={40}>
                  <CheckCircleFilled style={{ color: "#F48224", fontSize: "18px" }} className="px-2 cursor-pointer hover:scale-110 transition" />
                </Tooltip>
                <Tooltip title={<span className="text-gray-900 font-medium">Click if statement is False</span>} color="#ffe2e2" open placement="bottom" zIndex={40}>
                  <CloseCircleFilled style={{ color: "red", fontSize: "18px" }} className="px-2 cursor-pointer hover:scale-110 transition" />
                </Tooltip>
              </div>
            </div>
          </div>
        </div>

        <span className="border-t border-card-border flex w-full" />

        {/* 2. Option Elimination */}
        <div>
          <h2 className="font-semibold text-lg text-foreground mb-3">2. Improve accuracy : use the elimination icon for 50-50 or 33-33-33!</h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-3">
            <div className="border border-card-border p-4 shadow-sm rounded-lg flex max-sm:flex-col justify-center items-center w-full gap-3 bg-card question">
              <div className="flex items-center w-full">
                <FaRegCircle style={{ color: "gray" }} className="shrink-0" />
                <span className="flex-1 font-medium px-2 text-foreground">Both Statement-1 and statement-2 are correct and Statement-2 explains Statement-1</span>
                <Tooltip title={<span className="text-gray-900 font-medium">Click if you want to eliminate option</span>} color="#ffe2e2" open zIndex={40}>
                  <CloseCircleOutlined style={{ color: "red", fontSize: "18px" }} className="px-2 cursor-pointer hover:scale-110 transition shrink-0" />
                </Tooltip>
              </div>
            </div>
            <div className="border border-red-500 bg-red-50 p-4 shadow-sm rounded-lg flex max-sm:flex-col justify-center items-center w-full gap-3 question">
              <div className="flex items-center w-full">
                <FaRegCircle style={{ color: "gray" }} className="shrink-0" />
                <span className="flex-1 font-medium px-2 text-red-600 line-through">Statement-1 is incorrect, but statement-2 is correct</span>
                <CloseCircleFilled style={{ color: "red", fontSize: "18px" }} className="px-2 shrink-0" />
              </div>
            </div>
          </div>
        </div>

        <span className="border-t border-card-border flex w-full" />

        {/* 3. Button Actions Explained */}
        <div className="min-h-48">
          <h2 className="font-semibold text-lg text-foreground mb-3">3. Strategize Your Answers: Button Actions Explained</h2>
          <div className="flex justify-center">
            <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-4 lg:gap-6">
              {InstructionButtons?.map((btn, i) => (
                <div key={i} className="flex flex-col sm:flex-row items-center gap-3 sm:gap-4">
                  <button
                    type="button"
                    className={`w-auto shrink-0 whitespace-nowrap flex items-center justify-center gap-2 py-2.5 px-3.5 sm:py-3 sm:px-4 text-xs sm:text-sm font-semibold text-white rounded-xl shadow-btn-shadow transition-all duration-200 hover:scale-105 ${btn.color}`}
                  >
                    <span className="shrink-0 text-base">{btn.icon}</span>
                    <span className="whitespace-nowrap">{btn.label}</span>
                  </button>
                  <div className="w-full sm:flex-1 relative bg-input-box p-3 sm:p-3.5 rounded-xl shadow-md border border-card-border/60">
                    <div className="absolute block w-3.5 h-3.5 bg-input-box rotate-45 top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 sm:top-1/2 sm:left-0 sm:-translate-x-1/2 sm:-translate-y-1/2 border-t border-r sm:border-r-0 sm:border-l border-card-border/60" />
                    <p className="text-xs sm:text-sm text-foreground text-center sm:text-left leading-relaxed m-0">
                      {btn.tooltipLabel}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <span className="border-t border-card-border flex w-full" />

        {/* 4. 2X Stakes */}
        <div>
          <h2 className="font-semibold text-lg text-foreground mb-3">4. "2X The Stakes, 2X The Thrill!"</h2>
          <div className="pt-4 flex items-center gap-3">
            <div className="flex max-sm:flex-col items-center gap-5">
              <Badge count={"2X"} color="#124699">
                <div className="text-sm py-2 px-4 bg-input-box shadow-btn-shadow border border-card-border rounded-lg">
                  <span className="font-semibold text-foreground rounded">Question : 01</span>
                </div>
              </Badge>
              <div className="sm:col-span-2 relative bg-input-box p-3 rounded-lg shadow-md border border-card-border/60">
                <div className="absolute block w-3.5 h-3.5 bg-input-box rotate-45 top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 sm:top-1/2 sm:left-0 sm:-translate-x-1/2 sm:-translate-y-1/2 border-t border-r sm:border-r-0 sm:border-l border-card-border/60" />
                <p className="text-sm text-foreground text-center sm:text-left">Answer correctly: Earn double marks. Answer wrong: Lose double marks.</p>
              </div>
            </div>
          </div>
        </div>

        <span className="border-t border-card-border flex w-full" />

        {/* 5. You Can Change Language */}
        <div>
          <h2 className="font-semibold text-lg text-foreground mb-4">5. You Can Change Language</h2>
          <div className="flex items-center gap-5 flex-wrap pt-3">
            <Tooltip
              title={<span className="text-gray-900 font-medium">English / Hindi</span>}
              color="#ffe2e2"
              open
              placement="top"
              zIndex={40}
            >
              <span className="text-sm font-semibold flex flex-nowrap gap-2 items-center text-foreground cursor-default">
                <IoLanguage className="text-xl text-primary" />
                Language
              </span>
            </Tooltip>
            <div className="inline-flex rounded-xl p-1 bg-input-box border border-card-border gap-1">
              <button
                type="button"
                onClick={() => setSelectedLang("English")}
                className={`px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                  selectedLang === "English"
                    ? "bg-primary text-white shadow-xs"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                English
              </button>
              <button
                type="button"
                onClick={() => setSelectedLang("Hindi")}
                className={`px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                  selectedLang === "Hindi"
                    ? "bg-primary text-white shadow-xs"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                Hindi
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="w-full flex justify-end mt-8">
        <FormButton
          onClick={() => handleNextButton(selectedLang)}
          text="NEXT"
          className="custom-button w-full sm:w-40 button button--mimas text-center !p-4 !h-12 uppercase cursor-pointer font-bold"
        />
      </div>

      {/* Hidden reference to preserve ExamInstructionScreen import */}
      <div style={{ display: "none" }} aria-hidden="true">
        <ExamInstructionScreen showHeader={false} showFooter={false} showStrip={false} />
      </div>
    </div>
  );
};

export default ExamInstruction;
