import { Progress } from "antd";
import dayjs from "dayjs";
import { useState, type FC } from "react";
import { useNavigate } from "react-router-dom";
import { ImagePath, ROUTES, URL_KEYS, STORAGE_KEYS } from "../../Constants";
import type { ContestDetailCardProps } from "../../Types";
import { AntMessage } from "../Common/AntMessage";
import ReattemptModal from "../Exam/Result/ReattemptModal";
import axios from "axios";
import { Storage } from "../../Utils";

const MyContestUpcomingCard: FC<ContestDetailCardProps> = ({ contestData }) => {
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [startingAttempt, setStartingAttempt] = useState(false);

  const { contestId: { _id = "", name = "Untitled Contest", pricePool = 0, filledSpots = 0, totalSpots = 1, isLifetime } = {}, subjectId: { image: subjectImage = "", name: subjectName = "" } = {}, contestStartDate = "" } = contestData ?? {};

  const progress = (filledSpots / totalSpots) * 100;

  const isCompleted = contestData && contestData._id && (contestData.status === "completed" || (contestData as any).result === true);

  const handleJoin = async (e: any) => {
    e.stopPropagation();
    console.log("contestData", contestData);

    const isLifetime = contestData?.contestId?.isLifetime || contestData?.isLifetime;

    // If it's a lifetime contest and is already completed, start a new attempt
    if (isLifetime && contestData?.status === "completed") {
      if (startingAttempt) return;
      setStartingAttempt(true);
      try {
        const token = Storage.getItem(STORAGE_KEYS.TOKEN) || "";
        const payload = {
          contestId: _id,
          subjectId: contestData.subjectId?._id || contestData.subjectId,
          classesId: contestData.classesId?._id || contestData.classesId,
          contestStartDate: contestData.contestStartDate || contestData.contestId?.startDate,
          contestEndDate: contestData.contestEndDate || contestData.contestId?.endDate,
          isPractice: false
        };
        const res = await axios.post(`/api${URL_KEYS.QA.ADD}`, payload, {
          headers: { authorization: token }
        });
        if (res.data?.status === 200) {
          const newQaId = res.data?.data?.qa?._id;
          AntMessage("success", "Started new exam attempt.");
          navigate(`${ROUTES.EXAM.INSTRUCTION}?contestId=${_id}&isLifetime=true${newQaId ? `&qaId=${newQaId}` : ""}`, {
            state: { contestStartDate: contestData.contestStartDate, isLifetime: true, qaId: newQaId }
          });
        } else {
          AntMessage("error", res.data?.message || "Failed to start attempt.");
        }
      } catch (error) {
        console.error(error);
        AntMessage("error", "Error creating attempt.");
      } finally {
        setStartingAttempt(false);
      }
      return;
    }

    if (contestData?.contestStartTime && contestData?.contestEndTime && !isLifetime) {
      console.log("enter", contestData?.contestStartDate, contestData?.contestEndDate);

      navigate(ROUTES.EXAM.COUNT_DOWN, {
        state: {
          contestStartDate: contestData?.contestStartDate || "",
          contestEndDate: contestData?.contestEndDate || "",
        },
      });
    } else {
      console.log("enter2----------", contestData);
      navigate(`${ROUTES.EXAM.INSTRUCTION}?contestId=${_id}${contestData?._id ? `&qaId=${contestData._id}` : ""}`, {
        state: contestData,
      });
    }
  };

  const [checkingAttempts, setCheckingAttempts] = useState(false);

  const handleResult = async (e: any) => {
    e.stopPropagation();
    if (checkingAttempts) return;

    setCheckingAttempts(true);
    try {
      const token = Storage.getItem(STORAGE_KEYS.TOKEN) || "";
      const response = await axios.get(`/api${URL_KEYS.QA.ALL}?contestFilter=completed,ongoing,upcoming&contestId=${_id}`, {
        headers: { authorization: token }
      });
      const allQAs = response.data?.data?.contest_type_data || [];
      const matchingAttempts = allQAs.filter((qa: any) => {
        const cId = qa.contestId?._id || qa.contestId;
        return cId && cId.toString() === _id.toString();
      });

      if (matchingAttempts.length <= 1) {
        // If 1 or 0 attempts, navigate directly to result page
        const qaId = matchingAttempts[0]?._id || contestData?._id;
        if (qaId) {
          navigate(`${ROUTES.EXAM.RESULT}?qaFilter=${qaId}&contestFilter=${_id}`);
        } else {
          AntMessage("error", "This Contest is Over And No One Is Participate.");
        }
      } else {
        // If multiple attempts, open the pop-up modal
        setIsModalOpen(true);
      }
    } catch (error) {
      console.error("Error checking attempts:", error);
      if (contestData?._id) {
        navigate(`${ROUTES.EXAM.RESULT}?qaFilter=${contestData._id}&contestFilter=${_id}`);
      } else {
        AntMessage("error", "Failed to retrieve results.");
      }
    } finally {
      setCheckingAttempts(false);
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
              {contestData?.contestId?.isLifetime && <span className="bg-white text-primary text-xs px-2.5 py-0.5 rounded-full font-bold uppercase tracking-wider animate-pulse">Lifetime Free</span>}
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
              <div className="flex justify-between">
                <span className="text-gray-600">Validity:</span>
                <span className="text-primary font-bold">Lifetime</span>
              </div>
              <div className="flex justify-between items-center mt-2 gap-2">
                <section onClick={(e) => handleJoin(e)}>
                  <p className="font-semibold text-base bg-success text-white px-6 py-1 w-fit rounded cursor-pointer hover:opacity-90">
                    {startingAttempt ? "Loading..." : (contestData.status === "ongoing" ? "Resume" : "Join")}
                  </p>
                </section>
                {((contestData as any).result === true || contestData.status === "completed") && (
                  <section onClick={(e) => handleResult(e)}>
                    <p className="font-semibold text-base bg-primary text-white px-6 py-1 w-fit rounded cursor-pointer hover:opacity-90">
                      {checkingAttempts ? "Loading..." : "Result"}
                    </p>
                  </section>
                )}
              </div>
            </div>
          ) : (
            <>
              <div className="flex justify-between text-sm font-normal">
                <section className="flex flex-col gap-2">
                  <h1>Get Scholarship</h1>
                  <p className="font-semibold text-lg">₹{pricePool}</p>
                </section>

                <div className="flex items-center gap-2">
                  {contestData.status !== "completed" && (
                    <section onClick={(e) => handleJoin(e)}>
                      <p className="font-semibold text-lg bg-success text-white px-6 py-1 w-fit rounded cursor-pointer hover:opacity-90">
                        {contestData.status === "ongoing" ? "Resume" : "Join"}
                      </p>
                    </section>
                  )}
                  {(contestData.status === "completed" || (contestData as any).result === true) && (
                    <section onClick={(e) => handleResult(e)}>
                      <p className="font-semibold text-lg bg-primary text-white px-6 py-1 w-fit rounded cursor-pointer hover:opacity-90 text-center">
                        {checkingAttempts ? "Loading..." : "Result"}
                      </p>
                    </section>
                  )}
                </div>
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
      <ReattemptModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        contest={contestData}
        contestId={_id}
      />
    </div>
  );
};

export default MyContestUpcomingCard;
