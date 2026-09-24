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

  const { contestId: { _id = "", name = "Untitled Contest", pricePool = 0, filledSpots = 0, totalSpots = 1 } = {}, subjectId: { image: subjectImage = "", name: subjectName = "" } = {}, contestStartDate = "" } = contestData ?? {};

  const progress = (filledSpots / totalSpots) * 100;

  const isLifetimeCard = Boolean(contestData?.contestId?.isLifetime);
  const showJoin = isLifetimeCard || contestData.status !== "completed";

  // const isCompleted = contestData && contestData._id && (contestData.status === "completed" || (contestData as any).result === true);

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
          isPractice: false,
        };
        const res = await axios.post(`/api${URL_KEYS.QA.ADD}`, payload, {
          headers: { authorization: token },
        });
        if (res.data?.status === 200) {
          const newQaId = res.data?.data?.qa?._id;
          AntMessage("success", "Started new exam attempt.");
          navigate(`${ROUTES.EXAM.INSTRUCTION}?contestId=${_id}&isLifetime=true${newQaId ? `&qaId=${newQaId}` : ""}`, {
            state: { contestStartDate: contestData.contestStartDate, isLifetime: true, qaId: newQaId },
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
        headers: { authorization: token },
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
    <>
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
        className="bef-card capitalize flex flex-col justify-between cursor-pointer transition-all duration-300 hover:-translate-y-1 hover:border-accent"
      >
        <div className="bef-card-strip" />
        {/* Body */}
        <div className="p-5">
          <div className="flex items-start justify-between gap-4">
            <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-secondary text-lg font-extrabold text-primary">
              {(name || "C").charAt(0).toUpperCase()}
            </span>
            {contestData?.contestId?.isLifetime && <span className="bef-badge animate-pulse">Lifetime Free</span>}
          </div>
          <h3 className="mt-4 font-heading text-base font-bold text-foreground truncate">{name}</h3>
          <div className="mt-3">
            {contestData?.contestId?.isLifetime ? (
              <div className="space-y-2 rounded-xl bg-secondary p-3 text-xs">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Entry Fee</span>
                  <strong className="text-tertiary">FREE</strong>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Attempts</span>
                  <strong className="text-primary">Unlimited</strong>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Validity</span>
                  <strong className="text-primary">Lifetime</strong>
                </div>
              </div>
            ) : (
              <div className="space-y-2 rounded-xl bg-secondary p-3 text-xs">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Get Scholarship</span>
                  <strong className="text-primary">₹{pricePool}</strong>
                </div>
                <Progress percent={progress} showInfo={false} strokeColor="#114598" />
                <div className="flex justify-between font-semibold">
                  <span className="text-muted-foreground">{filledSpots} Filled</span>
                  <span className="text-foreground">{totalSpots} Total Spots</span>
                </div>
              </div>
            )}
          </div>
          <div className="mt-4 flex gap-2">
            {showJoin && (
              <section onClick={(e) => handleJoin(e)} className="flex flex-1">
                <p className="bef-btn-primary w-full whitespace-nowrap">{startingAttempt ? "Loading..." : contestData.status === "ongoing" ? "Resume" : "Join →"}</p>
              </section>
            )}
            {((contestData as any).result === true || contestData.status === "completed") && (
              <section onClick={(e) => handleResult(e)} className="flex flex-1">
                <p className="inline-flex min-h-11 w-full items-center justify-center rounded-xl border border-primary bg-card px-3 text-xs font-bold text-primary transition-all duration-300 hover:border-accent hover:text-accent">{checkingAttempts ? "Loading..." : "Result"}</p>
              </section>
            )}
          </div>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between gap-3 border-t border-border px-5 py-3">
          <div className="flex min-w-0 items-center gap-3">
            <img className="h-9 w-9 shrink-0 rounded-full border border-border object-cover" src={subjectImage || `${ImagePath}contest/ContestIcon.png`} alt={subjectName} />
            <h3 className="truncate text-sm font-bold text-foreground">{subjectName}</h3>
          </div>
          <span className="shrink-0 text-[10px] font-semibold text-muted-foreground">{dayjs(contestStartDate).format("MMM DD, YYYY h:mm A")}</span>
        </div>
      </div>
      <ReattemptModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} contest={contestData} contestId={_id} />
    </>
  );
};

export default MyContestUpcomingCard;
