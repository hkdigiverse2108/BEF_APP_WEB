import dayjs from "dayjs";
import type { FC } from "react";
import { useNavigate } from "react-router-dom";
import { ImagePath, ROUTES } from "../../Constants";
import type { ContestDetailCardProps } from "../../Types";
// import { useCountDown } from "../../Utils/Hook";
import { AntMessage } from "../Common/AntMessage";

const MyContestPastTestCard: FC<ContestDetailCardProps> = ({ contestData }) => {
  const navigate = useNavigate();
  const { _id: QaId, contestStartDate, rank = 0, winningPrice = 0, subjectId: { name: subjectName = "Unknown Subject", image: subjectImage = `${ImagePath}contest/ContestIcon.png` } = {}, contestId: { name: contestName = "Untitled Contest", pricePool = 0, _id: ContestId } = {} } = contestData ?? {};
  // const { isFinished } = useCountDown(contestData?.contestStartDate || "", contestData?.contestEndDate || "");

  const handleResult = () => {
    const now = dayjs();
    const endTime = dayjs(contestData?.contestEndDate);
    if (contestData?.answers?.length !== 0) {
      if (endTime.isBefore(now)) {
        navigate(`${ROUTES.EXAM.RESULT}?qaFilter=${QaId}&contestFilter=${ContestId}`);
      } else {
        navigate(ROUTES.EXAM.COUNT_DOWN, {
          state: {
            contestStartDate: contestData?.contestStartDate || "",
            contestEndDate: contestData?.contestEndDate || "",
          },
        });
      }
    } else {
      AntMessage("error", "This Contest is Over And No One Is Participate.");
    }
  };

  return (
    <>
      <div onClick={() => handleResult()} className="bef-card capitalize flex flex-col justify-between cursor-pointer transition-all duration-300 hover:-translate-y-1 hover:border-accent">
        <div className="bef-card-strip" />
        {/* Body */}
        <div className="p-5">
          <div className="flex items-start justify-between gap-4">
            <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-secondary text-lg font-extrabold text-primary">
              {(contestName || "C").charAt(0).toUpperCase()}
            </span>
            <span className="bef-badge">Past Test</span>
          </div>
          <h3 className="mt-4 font-heading text-base font-bold text-foreground truncate">{contestName}</h3>
          <div className="mt-3 space-y-2 rounded-xl bg-secondary p-3 text-xs">
            <div className="flex justify-between">
              <span className="text-muted-foreground">Get Scholarship</span>
              <strong className="text-primary">₹{pricePool}</strong>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Achieved Scholarship</span>
              <strong className="text-tertiary">₹{winningPrice}</strong>
            </div>
            <div className="h-px bg-border" />
            <div className="flex justify-between items-center font-semibold">
              <span className="text-muted-foreground">All India Rank</span>
              <span className="rounded-lg border border-border bg-card px-4 py-1 text-foreground">{rank || 0}</span>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between gap-3 border-t border-border px-5 py-3">
          <div className="flex min-w-0 items-center gap-3">
            <img className="h-9 w-9 shrink-0 rounded-full border border-border object-cover" src={subjectImage} alt={subjectName} />
            <h3 className="truncate text-sm font-bold text-foreground">{subjectName}</h3>
          </div>
          {contestStartDate && dayjs(contestStartDate).isValid() && (
            <span className="shrink-0 text-[10px] font-semibold text-muted-foreground">{dayjs(contestStartDate).format("MMM DD, YYYY h:mm A")}</span>
          )}
        </div>
      </div>
    </>
  );
};

export default MyContestPastTestCard;
