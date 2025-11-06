import { ExclamationCircleOutlined } from "@ant-design/icons";
import { type FC } from "react";
import { ImagePath } from "../../../Constants";
import type { ContestData, OverviewCardType, PolityType } from "../../../Types";
import { Skeleton } from "antd";
import dayjs from "dayjs";

const Overview: FC<{ data: PolityType; isLoading: boolean; contest: ContestData }> = ({ data, isLoading, contest }) => {
  const OverviewCard: FC<OverviewCardType> = ({ img, label, value, subValue }) => (
    <div className="relative bg-input-box rounded-xl p-4 flex flex-col justify-between h-36">
      <div className="w-1 h-[60%] bg-orange-500 rounded-r absolute left-0" />
      <div className="flex items-start justify-between">
        <div className="text-2xl">
          <img className="object-cover w-11 max-sm:w-10" src={`${ImagePath}${img}`} />
        </div>
      </div>
      <div className="text-left">
        <p className="text-base font-bold mt-1 uppercase">{label}</p>
        <h3 className="text-xl font-extrabold">
          {value} {subValue && <span className="text-base text-neutral-500">{subValue}</span>}
        </h3>
      </div>
    </div>
  );

  const totalQuestion = data?.correct + data?.unanswered + data?.incorrect;

  return (
    <>
      <div className="relative px-4 mb-4">
        <div className="w-1 h-[100%] bg-success rounded-full absolute left-0 top-0" />
        <h2 className="text-xl font-bold ">Overview</h2>
        <span className="text-base font-bold text-neutral-400">Summary of marks scored in the test attempted on {dayjs(contest?.contestStartDate).format("MMM DD , h:mm A")}</span>
      </div>
      <section className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5">
        {isLoading ? (
          [...Array(6)].map((_, i) => <Skeleton.Node key={i} active style={{ width: "100%", height: 150, borderRadius: 10 }} />)
        ) : (
          <>
            <OverviewCard img={"result/Total.png"} label="Total Marks Scored" value={`${data?.totalPoints.toFixed(2)} /`} subValue={`${Math.round(((totalQuestion * 11) / 10) * data?.positiveMarks)} Marks`} />
            <OverviewCard img={"result/Correct.png"} label="Correct" value={data?.correct} subValue={"Marks"} />
            <OverviewCard img={"result/Incorrect.png"} label="Incorrect" value={data?.incorrect} subValue={"Marks"} />
            <OverviewCard img={"result/Unanswered.png"} label="Unanswered" value={data?.unanswered} subValue={"Marks"} />
            <OverviewCard img={"result/Rank.png"} label="Rank" value={data?.rank} />
            <OverviewCard img={"result/Time.png"} label="Time" value={data?.time} />
          </>
        )}
      </section>
      <div className="mt-4 border border-red-600 bg-red-50 rounded-md p-3 text-sm text-gray-600 flex items-start gap-2">
        <ExclamationCircleOutlined className="text-red-600 mt-0.5" />
        <p>The contest is live for 24 hours so your rank is constantly shifting! Reattempt to boost your rank and practice more new questions. Every attempt gets you closer to the top!</p>
      </div>
    </>
  );
};

export default Overview;
