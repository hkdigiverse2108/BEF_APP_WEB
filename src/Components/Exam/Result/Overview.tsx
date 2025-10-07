import { ExclamationCircleOutlined } from "@ant-design/icons";
import React from "react";
import { ImagePath } from "../../../Constants";

const Overview = () => {
  const OverviewCard: React.FC<{ img: React.ReactNode; label: string; value: string; subValue?: string }> = ({ img, label, value, subValue }) => (
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

  return (
    <>
      <div className="relative px-4 mb-4">
        <div className="w-1 h-[100%] bg-success rounded-full absolute left-0 top-0" />
        <h2 className="text-xl font-bold ">Overview</h2>
        <span className="text-base font-bold text-neutral-400">Summary of marks scored in the test attempted on Sep 17, 6:45 PM</span>
      </div>
      <section className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5">
        <OverviewCard img={"result/Total.png"} label="Total Marks Scored" value="53.3 /" subValue={"100 Marks"} />
        <OverviewCard img={"result/Correct.png"} label="Correct" value="30 " subValue={"Marks"} />
        <OverviewCard img={"result/Incorrect.png"} label="Incorrect" value="10 " subValue={"Marks"} />
        <OverviewCard img={"result/Unanswered.png"} label="Unanswered" value="10 " subValue={"Marks"} />
        <OverviewCard img={"result/Rank.png"} label="Rank" value="1000" />
        <OverviewCard img={"result/Time.png"} label="Time" value="00:27:30" />
      </section>
      <div className="mt-4 border border-red-600 bg-red-50 rounded-md p-3 text-sm text-gray-600 flex items-start gap-2">
        <ExclamationCircleOutlined className="text-red-600 mt-0.5" />
        <p>By joining, you confirm you are not a resident of Assam, Odisha, Telangana, Nagaland, or Sikkim, and agree to NBA Fantasy’s T&Cs.</p>
      </div>
    </>
  );
};

export default Overview;
