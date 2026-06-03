import { Progress } from "antd";
import dayjs from "dayjs";
import type { FC } from "react";
import { useNavigate } from "react-router-dom";
import { ImagePath, ROUTES } from "../../Constants";
import type { ContestDetailCardProps } from "../../Types";

const MyContestUpcomingCard: FC<ContestDetailCardProps> = ({ contestData }) => {
  const navigate = useNavigate();

  const { contestId: { _id = "", name = "Untitled Contest", pricePool = 0, filledSpots = 0, totalSpots = 1 } = {}, subjectId: { image: subjectImage = "", name: subjectName = "" } = {}, contestStartDate = "" } = contestData ?? {};

  const progress = (filledSpots / totalSpots) * 100;

  const handleJoin = (e: any) => {
    e.stopPropagation();
    if (contestData?.contestStartTime && contestData?.contestEndTime) {
      navigate(ROUTES.EXAM.COUNT_DOWN, {
        state: {
          contestStartDate: contestData?.contestStartDate || "",
          contestEndDate: contestData?.contestEndDate || "",
        },
      });
    } else {
      navigate(`${ROUTES.EXAM.INSTRUCTION}?contestId=${_id}`, {
        state: contestData,
      });
    }
  };
  const contestDataTime = {
    contestStartTime: contestData?.contestStartTime,
    contestEndTime: contestData?.contestEndTime,
    contestStartDate: contestData?.contestStartDate,
    contestEndDate: contestData?.contestEndDate,
  };

  return (
    <div
      onClick={() =>
        navigate(ROUTES.CONTEST.CONTEST_DETAILS, {
          state: {
            contestData: contestData?.contestId,
            type: "myContest",
            contestDataTime,
          },
        })
      }
      className="border border-black/10  rounded-t-xl rounded-b-md overflow-hidden capitalize flex flex-col justify-between cursor-pointer"
    >
      {/* Header */}
      <div className="flex flex-col lg:flex-row bg-primary! border border-primary px-2 md:px-4">
        <div className="flex flex-row max-sm:flex-col items-center gap-4 w-full h-full p-3">
          <div className="grid gap-1 w-full">
            <div className="flex items-center gap-2 flex-wrap">
              <h3 className="text-white text-lg max-sm:text-center text-left font-medium tracking-tight">{name}</h3>
              {contestData?.contestId?.isLifetime && (
                <span className="bg-white text-primary text-xs px-2.5 py-0.5 rounded-full font-bold uppercase tracking-wider animate-pulse">
                  Lifetime Free
                </span>
              )}
            </div>
          </div>
        </div>
      </div>
      {/* Body */}
      <div className="px-2 md:px-4 py-2">
        <div className="py-2 flex flex-col gap-2 text-black">
          {contestData?.contestId?.isLifetime ? (
            <div className="flex flex-col gap-1 py-1 text-sm font-semibold">
              <div className="flex justify-between">
                <span className="text-gray-600">Entry Fee:</span>
                <span className="text-green-600 font-bold">FREE</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Attempts:</span>
                <span className="text-primary font-bold">Unlimited</span>
              </div>
              <div className="flex justify-between items-center mt-2">
                <span className="text-gray-600">Validity: <span className="text-primary font-bold">Lifetime</span></span>
                <section onClick={(e) => handleJoin(e)}>
                  <p className="font-semibold text-base bg-success text-white px-6 py-1 w-fit rounded cursor-pointer hover:opacity-90">Join</p>
                </section>
              </div>
            </div>
          ) : (
            <>
              <div className="flex justify-between text-sm font-normal">
                <section className="flex flex-col gap-2">
                  <h1>Get Scholarship</h1>
                  <p className="font-semibold text-lg">₹{pricePool}</p>
                </section>

                <section onClick={(e) => handleJoin(e)} className="flex flex-col justify-end items-end gap-2">
                  <p className="font-semibold text-lg bg-success text-white px-6 py-1 w-fit rounded">Join</p>
                </section>
              </div>

              <Progress percent={progress} showInfo={false} strokeColor="green" />

              <section className="flex justify-between items-center font-normal">
                <h1 className="text-gray-600">{filledSpots} Filled</h1>
                <h1>{totalSpots} Total Spots</h1>
              </section>
            </>
          )}
        </div>
      </div>

      {/* Footer */}
      <div className="flex max-sm:flex-col justify-between items-center border-t border-gray-200 px-1 text-sm font-normal">
        <div className="flex max-sm:justify-center items-center gap-4 w-full h-full p-3">
          <img className="object-cover w-12 sm:w-11 sm:h-11 rounded-full border-2 border-white" src={subjectImage || `${ImagePath}contest/ContestIcon.png`} alt={subjectName} />

          <div className="grid w-full">
            <h3 className="text-lg text-left font-medium tracking-tight">{subjectName}</h3>
            <span className="text-sm font-bold">{dayjs(contestStartDate).format("MMM DD, YYYY h:mm A")}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyContestUpcomingCard;
