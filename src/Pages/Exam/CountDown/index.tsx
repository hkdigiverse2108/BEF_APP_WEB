import { useLocation, useNavigate } from "react-router-dom";
import { useCountDown } from "../../../Utils/Hook";
import type { FC } from "react";
import { ImagePath, ROUTES } from "../../../Constants";

const CountDown = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const { hours, minutes, seconds, isFinished } = useCountDown(location.state?.contestStartDate || "", location.state?.contestEndDate || "");

  if (isFinished) navigate(ROUTES.CONTEST.MY_CONTEST);

  return (
    <div className="w-full min-h-screen flex flex-col items-center justify-center  bg-cover bg-center" style={{backgroundImage: `url(${ImagePath}CountDown.jpg)`}}>
      {/* Timer Wrapper */}
      <div className="mb-40">
        <div className="flex items-center gap-6">
          {/* ITEM */}
          <TimeBox title="HOUR" value={hours} />
          {/* <span className="text-3xl font-semibold text-black">:</span> */}
          <TimeBox title="MIN" value={minutes} />
          {/* <span className="text-3xl font-semibold text-black">:</span> */}
          <TimeBox title="SEC" value={seconds} />
        </div>

        {/* Message */}
        <p className="mt-8 px-5 py-3 rounded-md font-normal text-center bg-white/45 backdrop-blur-md shadow-2xl">Result will be announced soon</p>
      </div>
    </div>
  );
};

const TimeBox: FC<{ title: string; value: string }> = ({ title, value }) => (
  <div className="flex flex-col items-center rounded-xl shadow-2xl overflow-hidden bg-white/30 py-2 sm:py-4 backdrop-blur-md px-5 sm:px-11" >
    <p className="text-3xl sm:text-4xl font-normal text-green-600">{value}</p>
    <p className="text-black font-semibold text-center text-base">{title}</p>
  </div>
);

export default CountDown;
