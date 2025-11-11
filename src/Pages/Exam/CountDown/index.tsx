import { useLocation, useNavigate } from "react-router-dom";
import { useCountDown } from "../../../Utils/Hook";
import type { FC } from "react";
import { ROUTES } from "../../../Constants";

const CountDown = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const { hours, minutes, seconds, isFinished } = useCountDown(location.state?.contestStartDate || "", location.state?.contestEndDate || "");

  if (isFinished) navigate(ROUTES.EXAM.RESULT);

  return (
    <div className="w-full min-h-screen flex flex-col items-center justify-center ">
      {/* Timer Wrapper */}
      <div className="mb-40">
        <div className="flex items-center gap-6">
          {/* ITEM */}
          <TimeBox title="HOUR" value={hours} />
          <span className="text-3xl font-bold text-black">:</span>
          <TimeBox title="MIN" value={minutes} />
          <span className="text-3xl font-bold text-black">:</span>
          <TimeBox title="SEC" value={seconds} />
        </div>

        {/* Message */}
        <p className="mt-8 border border-orange-400 px-5 py-3 rounded-md font-semibold text-center bg-white/40 backdrop-blur-md">Result will be announced soon</p>
      </div>
    </div>
  );
};

const TimeBox: FC<{ title: string; value: string }> = ({ title, value }) => (
  <div className="flex flex-col items-center bg-white rounded-xl shadow overflow-hidden w-[150px]">
    <div className="bg-primary text-white font-bold w-full text-center py-3 text-lg">{title}</div>
    <div className=" px-6 py-3 text-3xl font-semibold text-green-600">{value}</div>
  </div>
);

export default CountDown;
