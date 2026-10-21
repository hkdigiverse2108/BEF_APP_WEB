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

const ContestDetailCard: FC<ContestDetailCardProps> = ({ contestData, type, contestDataTime, isUnlocked = true }) => {
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
      className="bef-card w-full h-fit overflow-hidden cursor-pointer capitalize transition-all duration-300 hover:-translate-y-1 hover:border-accent"
    >
      <div className="bef-card-strip" />
      <div className="p-5">
        <div className="flex items-start justify-between gap-4">
          <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-secondary text-lg font-extrabold text-primary">
            {(name || "C").charAt(0).toUpperCase()}
          </span>
          {contestData.isLifetime && <span className="bef-badge animate-pulse">Lifetime Free</span>}
        </div>
        <h3 className="mt-4 font-heading text-base font-bold text-foreground truncate">{name}</h3>

        <div className="mt-3">
          {contestData.isLifetime ? (
            <div className="space-y-2 rounded-xl bg-secondary p-3 text-xs">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Entry Fee</span>
                <strong className="text-tertiary">FREE</strong>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Attempts Allowed</span>
                <strong className="text-primary">Unlimited</strong>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Validity</span>
                <strong className="text-primary">Lifetime</strong>
              </div>
            </div>
          ) : (
            <div className="space-y-2 rounded-xl bg-secondary p-3 text-xs">
              <div className="flex justify-between font-semibold">
                <span className="text-muted-foreground">Get Scholarship</span>
                <strong className="text-primary">₹{pricePool}</strong>
              </div>
              <Progress percent={progress} showInfo={false} strokeColor="#114598" />
              <div className="flex justify-between font-semibold">
                <span className="text-muted-foreground">{filledSpots} Filled</span>
                <span className="text-foreground">{totalSpots} Total Student</span>
              </div>
            </div>
          )}
        </div>

        <div className="mt-4" onClick={(e) => e.stopPropagation()}>
          {isUnlocked ? ( //
            <FormButton htmlType="submit" text={`Join ${type === "myContest" ? "" : `- ₹${fees}`}`} onClick={(e) => handleSubtopicDrawer(e)} className="bef-btn-primary w-full uppercase" />
          ) : (
            <FormButton htmlType="submit" disabled={true} text="Locked (Purchase Course)" className="bef-btn-primary w-full uppercase opacity-60 disabled !cursor-no-drop" />
          )}
        </div>
      </div>

      <div className="border-t border-border px-5 py-3">
        <div className="flex items-center text-[11px] sm:text-xs font-semibold text-muted-foreground justify-center gap-2 sm:gap-4">
          {firstRankPrice ? (
            <>
              <section className="flex gap-1.5 items-center">
                <FaAward className="text-primary" />
                <span>{`₹${firstRankPrice}`}</span>
              </section>
              <span className="h-3 border-l border-border"></span>
            </>
          ) : null}

          <section className="flex gap-1.5 items-center">
            <IoMdTrophy className="text-primary" />
            <span>{winnerPercentage}</span>
          </section>
          <span className="h-3 border-l border-border"></span>
          <section className="flex gap-1.5 items-center">
            <HiCheckBadge className="text-primary" />
            <span>Flexible</span>
          </section>
        </div>
      </div>  
    </div>
  );
};

export default ContestDetailCard;
