import { Progress } from "antd";
import type { FC } from "react";
import { FaAward } from "react-icons/fa";
import { HiCheckBadge } from "react-icons/hi2";
import { IoMdTrophy } from "react-icons/io";
import { useNavigate } from "react-router-dom";
import { FormButton } from "../../Attribute/FormFields";
import { ROUTES } from "../../Constants";
import { useAppDispatch } from "../../Store/hooks";
import { setSubtopicDrawer } from "../../Store/Slices/DrawerSlice";
import type { ContestCore, ContestDetailCardProps, contestRank } from "../../Types";

const ContestDetailCard: FC<ContestDetailCardProps> = ({ contestData, type, contestDataTime, isUnlocked }) => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { _id, name, pricePool, filledSpots, totalSpots, fees = 0, winnerPercentage = 0, ranks, isLifetime }: ContestCore = contestData;

  const progress = ((filledSpots ?? 0) / (totalSpots ?? 1)) * 100;

  const handleSubtopicDrawer = (e: any) => {
    e.stopPropagation();
    if (type === "myContest") {
      if (contestDataTime?.contestStartTime && contestDataTime?.contestEndTime) {
        navigate(ROUTES.EXAM.COUNT_DOWN, { state: { contestStartDate: contestDataTime?.contestStartDate || "", contestEndDate: contestDataTime?.contestEndDate || "" } });
      } else {
        navigate(`${ROUTES.EXAM.INSTRUCTION}?contestId=${_id}`, { state: { contestStartDate: contestDataTime?.contestStartDate } });
      }
    } else {
      dispatch(setSubtopicDrawer({ open: true, contest: contestData }));
    }
  };

  let firstRank =
    ranks?.filter((rank: contestRank) => {
      if (rank.startPlace == "1") return rank.price;
      return false;
    }) ?? [];

  let firstRankPrice = firstRank[0]?.price ?? 0;

  return (
    <div
      onClick={() =>
        !isLifetime
          ? navigate(ROUTES.CONTEST.CONTEST_DETAILS, {
              state: { contestData },
            })
          : {}
      }
      className="w-full h-fit bg-primary rounded-2xl overflow-hidden cursor-pointer"
    >
      <div className="flex flex-row px-2 md:px-4 relative">
        <div className="flex flex-row max-sm:flex-col items-center gap-4 max-sm:gap-0 w-full h-full p-3">
          <div className="grid gap-0.5 w-full">
            <div className="flex items-center gap-2 flex-wrap">
              <h3 className="text-xl max-sm:text-center text-left font-semibold tracking-tight capitalize text-white">{name}</h3>
              {contestData.isLifetime && <span className="bg-white text-primary text-xs px-2.5 py-0.5 rounded-full font-bold uppercase tracking-wider animate-pulse">Lifetime Free</span>}
            </div>
          </div>
        </div>
      </div>

      <div className="px-4 py-2 bg-white rounded-t-xl mx-0.5">
        <div className="py-2 flex flex-col gap-1.5 text-slate-700">
          {contestData.isLifetime ? (
            <div className="flex flex-col gap-1 py-1 text-sm font-semibold">
              <div className="flex justify-between">
                <span className="text-gray-600">Entry Fee:</span>
                <span className="text-green-600 font-bold">FREE</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Attempts Allowed:</span>
                <span className="text-primary font-bold">Unlimited</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Validity:</span>
                <span className="text-primary font-bold">Lifetime</span>
              </div>
            </div>
          ) : (
            <>
              <section className="flex justify-between text-sm md:text-lg  font-semibold flex-wrap ">
                <h3 className="capitalize">Get Scholarship</h3>
                <p>₹{pricePool}</p>
              </section>
              <section>
                <Progress percent={progress} showInfo={false} strokeColor={"green"} />
              </section>
              <section className="flex justify-between flex-wrap ">
                <h4>{filledSpots} Filled</h4>
                <h4 className="font-semibold">{totalSpots} Total Student</h4>
              </section>
            </>
          )}
        </div>

        <span className=" flex border border-gray-200 w-full my-2"></span>
        <div className="py-1" onClick={(e) => e.stopPropagation()}>
          {isUnlocked ? ( //
            <FormButton htmlType="submit" text={`Join ${type === "myContest" ? "" : `- ₹${fees}`}`} onClick={(e) => handleSubtopicDrawer(e)} className="custom-button-light button button--mimas w-full !h-auto uppercase" />
          ) : (
            <FormButton htmlType="submit" disabled={true} text="Locked (Purchase Course" className="custom-button-light button button--mimas w-full !h-auto uppercase disabled !cursor-no-drop" />
          )}
        </div>
      </div>

      <div className="bg-success py-4 text-white">
        <div className=" flex items-center text-xs sm:text-sm justify-center gap-2 sm:gap-4 md:gap-8 ">
          {firstRankPrice && (
            <>
              <section className="flex gap-2 items-center  ">
                <FaAward />
                <span>{`₹${firstRankPrice}`}</span>
              </section>
              <span className="h-3 border border-l border-white/50"></span>
            </>
          )}

          <section className="flex gap-2 items-center ">
            <IoMdTrophy />
            <span>{winnerPercentage}</span>
          </section>
          <span className="h-3 border border-l border-white/50"></span>
          <section className="flex gap-2 items-center ">
            <HiCheckBadge />
            <span>Flexible</span>
          </section>
        </div>
      </div>
    </div>
  );
};

export default ContestDetailCard;
