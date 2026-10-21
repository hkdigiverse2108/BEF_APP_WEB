import { useLocation, useNavigate } from "react-router-dom";
import { ROUTES } from "../../../Constants";
import { AntMessage } from "../../../Components/Common/AntMessage";
import { ExamInstructionScreen } from "../../../Components/Exam/ExamInstructionScreen";
import { useAppSelector } from "../../../Store/hooks";

const ExamInstruction = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { user } = useAppSelector((state) => state.auth);

  const contestStartDate = location?.state?.contestStartDate;
  const queryParam = new URLSearchParams(location.search);
  const isLifetime = location?.state?.isLifetime || location?.state?.contestId?.isLifetime || queryParam.get("isLifetime") === "true";
  const contestId = queryParam.get("contestId");
  const qaId = queryParam.get("qaId") || location?.state?.qaId || (location?.state?._id && !location?.state?.isSimulated ? location?.state?._id : null);
  const isPractice = queryParam.get("isPractice") === "true";

  const handleNextButton = (lang: "English" | "Hindi" = "English") => {
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

  const fullName = [user?.firstName, user?.lastName].filter(Boolean).join(" ") || "Student";

  return (
    <div className="w-full">
      <ExamInstructionScreen
        onStartExam={handleNextButton}
        showHeader={false}
        showFooter={false}
        showStrip={false}
        userName={fullName}
        userRole={user?.userType === "admin" ? "Admin" : "Student"}
        examTitle="Exam Instructions"
        actionButtonText="Start Exam"
      />
    </div>
  );
};

export default ExamInstruction;
