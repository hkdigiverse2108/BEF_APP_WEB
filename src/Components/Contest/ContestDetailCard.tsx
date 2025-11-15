import { FaAward } from "react-icons/fa";
import { HiCheckBadge } from "react-icons/hi2";
import { IoMdTrophy } from "react-icons/io";
import { FormButton } from "../../Attribute/FormFields";
import { Progress } from "antd";
import { ROUTES } from "../../Constants";
import { useAppDispatch } from "../../Store/hooks";
import { setSubtopicDrawer } from "../../Store/Slices/DrawerSlice";
import type { ContestCore, ContestDetailCardProps } from "../../Types";
import { useNavigate } from "react-router-dom";
import type { FC } from "react";

const ContestDetailCard: FC<ContestDetailCardProps> = ({ contestData, type ,contestDataTime}) => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { _id, name, pricePool, filledSpots, totalSpots, fees = 0, winnerPercentage = 0, winningAmountPerFee = 0 }: ContestCore = contestData;

  const progress = ((filledSpots ?? 0) / (totalSpots ?? 1)) * 100;

  const handleSubtopicDrawer = (e: any) => {
    e.stopPropagation();
    if (type === "myContest") {
      if (contestDataTime?.contestStartTime && contestDataTime?.contestEndTime) {
        navigate(ROUTES.EXAM.COUNT_DOWN, { state: { contestStartDate: contestDataTime?.contestStartDate || "", contestEndDate: contestDataTime?.contestEndDate || "" } });
      } else {
        navigate(`${ROUTES.EXAM.INSTRUCTION}?contestId=${_id}`, { state: contestData });
      }
    } else {
      dispatch(setSubtopicDrawer({ open: true, contest: contestData }));
    }
  };

  return (
    <div
      onClick={() =>
        navigate(ROUTES.CONTEST.CONTEST_DETAILS, {
          state: { contestData },
        })
      }
      className="w-full h-fit bg-primary rounded-2xl overflow-hidden cursor-pointer"
    >
      <div className="flex flex-row px-2 md:px-4 relative">
        <div className="flex flex-row max-sm:flex-col items-center gap-4 max-sm:gap-0 w-full h-full p-3   ">
          <div className="grid gap-0.5 w-full">
            <h3 className="text-xl max-sm:text-center text-left font-semibold tracking-tight capitalize text-white">
              {name}
              {/* {name || "Mega Contest"} */}
            </h3>
          </div>
        </div>

        {/* <div className="absolute overflow-hidden top-0 right-0  ">
          <img src="/assets/images/contest/Contest-Bg.png" alt="" />
        </div> */}
      </div>

      <div className="px-4 py-2 bg-white rounded-t-xl mx-0.5">
        <div className=" py-2 flex flex-col gap-1">
          <section className="flex justify-between text-sm md:text-lg  font-semibold flex-wrap ">
            <h3 className="capitalize">{name}</h3>
            <p>
              ₹{pricePool}
              {/* {pricePool || "₹7,50,000.00"} */}
            </p>
          </section>
          <section>
            <Progress percent={progress} showInfo={false} strokeColor={"green"} />
          </section>
          <section className="flex justify-between flex-wrap ">
            <h4>
              {filledSpots} Filled
              {/* {filledSpots || "25000 Filled"} */}
            </h4>
            <h4 className="font-semibold">
              {totalSpots} Total Student
              {/* {totalSpots || "50000 Spots"} */}
            </h4>
          </section>
        </div>

        <span className=" flex border border-gray-200 w-full my-2"></span>
        <div className="py-1">
          <FormButton htmlType="submit" text={`Join ${type === "myContest" ? "" : `- ₹${fees}`}`} onClick={(e) => handleSubtopicDrawer(e)} className="custom-button-light button button--mimas w-full !h-auto uppercase" />
        </div>
      </div>

      <div className="bg-success py-4 text-white">
        <div className=" flex items-center text-xs sm:text-sm justify-center gap-2 sm:gap-4 md:gap-8 ">
          <section className="flex gap-2 items-center  ">
            <FaAward />
            <span>
              {`₹${winningAmountPerFee}`}
              {/* {`₹${winningAmountPerFee || "1, 00, 000"}`} */}
            </span>
          </section>
          <span className="h-3 border border-l border-white/50"></span>
          <section className="flex gap-2 items-center ">
            <IoMdTrophy />
            <span>
              {winnerPercentage}
              {/* {winnerPercentage || "30%"} */}
            </span>
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
