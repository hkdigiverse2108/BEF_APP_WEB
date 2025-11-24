import { useLocation, useNavigate } from "react-router-dom";
import { useCountDown } from "../../../Utils/Hook";
import { useEffect, type FC } from "react";
import { ImagePath, ROUTES } from "../../../Constants";

const CountDown = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const { hours, minutes, seconds, isFinished } = useCountDown(location.state?.contestStartDate || "", location.state?.contestEndDate || "");

  if (isFinished) navigate(ROUTES.CONTEST.MY_CONTEST);

  useEffect(() => {
    // 🔙 Block Back Button only
    const handleBack = (e: PopStateEvent) => {
      e.preventDefault();
      window.history.pushState(null, "", window.location.href);
    };
    window.history.pushState(null, "", window.location.href);
    window.addEventListener("popstate", handleBack);

    return () => {
      window.removeEventListener("popstate", handleBack);
    };
  }, []);

  return (
    <div className="w-full min-h-screen flex flex-col items-center justify-center  bg-cover bg-center" style={{ backgroundImage: `url(${ImagePath}CountDown1.jpg)` }}>
      {/* Timer Wrapper */}
      <div className="mb-0">
        <div className="flex items-center gap-6">
          {/* ITEM */}
          <TimeBox title="HOUR" value={hours} />
          <TimeBox title="MIN" value={minutes} />
          <TimeBox title="SEC" value={seconds} />
        </div>

        {/* Message */}
        <p className="mt-8 px-5 py-3 rounded-md font-semibold text-center uppercase">Result will be announced soon</p>
      </div>
    </div>
  );
};

const TimeBox: FC<{ title: string; value: string }> = ({ title, value }) => {
  const radius = 50;
  const circumference = 2 * Math.PI * radius;

  const percent = title === "HOUR" ? (Number(value) / 24) * 100 : title === "MIN" ? (Number(value) / 60) * 100 : title === "SEC" ? (Number(value) / 60) * 100 : 0;

  const progress = (percent / 100) * circumference;

  return (
    <div className="flex flex-col items-center">
      {/* Circular container */}
      <div className="relative w-28 h-28 sm:w-32 sm:h-32 flex items-center justify-center">
        {/* Background Circle */}
        <svg className="absolute -rotate-90" width="100%" height="100%">
          <circle cx="64" cy="64" r={radius} stroke="white" strokeWidth="5" fill="transparent" />
        </svg>

        {/* Gradient Progress Line */}
        <svg className="absolute -rotate-90" width="100%" height="100%">
          <defs>
            <linearGradient id="gradientBorder" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="var(--primary)" />
              <stop offset="100%" stopColor="var(--success)" />
            </linearGradient>
          </defs>

          <circle cx="64" cy="64" r={radius} stroke="url(#gradientBorder)" strokeWidth="5" strokeLinecap="round" fill="transparent" strokeDasharray={circumference} strokeDashoffset={circumference - progress} className="transition-all duration-700" />
        </svg>

        {/* VALUE */}
        <p className="text-3xl sm:text-4xl font-semibold text-success z-10">{value}</p>
      </div>

      {/* Label */}
      <p className="text-black font-bold mt-3">{title}</p>
    </div>
  );
};

export default CountDown;

// import { useLocation, useNavigate } from "react-router-dom";
// import { useCountDown } from "../../../Utils/Hook";
// import { useEffect, type FC } from "react";
// import { ImagePath, ROUTES } from "../../../Constants";

// const CountDown = () => {
//   const location = useLocation();
//   const navigate = useNavigate();

//   const { hours, minutes, seconds, isFinished } = useCountDown(location.state?.contestStartDate || "", location.state?.contestEndDate || "");

//   if (isFinished) navigate(ROUTES.CONTEST.MY_CONTEST);

//   useEffect(() => {
//     // 🔙 Block Back Button only
//     const handleBack = (e: PopStateEvent) => {
//       e.preventDefault();
//       window.history.pushState(null, "", window.location.href);
//     };
//     window.history.pushState(null, "", window.location.href);
//     window.addEventListener("popstate", handleBack);

//     return () => {
//       window.removeEventListener("popstate", handleBack);
//     };
//   }, []);

//   return (
//     <div className="w-full min-h-screen flex flex-col items-center justify-center  bg-cover bg-center" style={{ backgroundImage: `url(${ImagePath}CountDown1.jpg)` }}>
//       {/* Timer Wrapper */}
//       <div className="mb-0">
//         <div className="flex items-center gap-6">
//           {/* ITEM */}
//           <TimeBox title="HOUR" value={hours} />
//           <TimeBox title="MIN" value={minutes} />
//           <TimeBox title="SEC" value={seconds} />
//         </div>

//         {/* Message */}
//         <p className="mt-8 px-5 py-3 rounded-md font-normal text-center bg-radial from-black/80 to-blue-600 text-white shadow-2xl">Result will be announced soon</p>
//       </div>
//     </div>
//   );
// };

// const TimeBox: FC<{ title: string; value: string }> = ({ title, value }) => (
//   <div className="flex flex-col items-center rounded-xl shadow-2xl overflow-hidden bg-radial from-blue-800 to-black/90 py-2 sm:py-4 px-5 sm:px-11">
//     <p className="text-3xl sm:text-4xl font-semibold text-white">{value}</p>
//     <p className="text-white font-bold text-center text-base">{title}</p>
//   </div>
// );

// export default CountDown;

// import { useLocation, useNavigate } from "react-router-dom";
// import { useCountDown } from "../../../Utils/Hook";
// import { useEffect, type FC } from "react";
// import { ImagePath, ROUTES } from "../../../Constants";

// const CountDown = () => {
//   const location = useLocation();
//   const navigate = useNavigate();

//   const { hours, minutes, seconds, isFinished } = useCountDown(location.state?.contestStartDate || "", location.state?.contestEndDate || "");

//   if (isFinished) navigate(ROUTES.CONTEST.MY_CONTEST);

//   useEffect(() => {
//     // 🔙 Block Back Button only
//     const handleBack = (e: PopStateEvent) => {
//       e.preventDefault();
//       window.history.pushState(null, "", window.location.href);
//     };
//     window.history.pushState(null, "", window.location.href);
//     window.addEventListener("popstate", handleBack);

//     return () => {
//       window.removeEventListener("popstate", handleBack);
//     };
//   }, []);

//   return (
//     <div className="w-full min-h-screen flex flex-col items-center justify-center  bg-cover bg-center" style={{ backgroundImage: `url(${ImagePath}CountDown1.jpg)` }}>
//       {/* Timer Wrapper */}
//       <div className="mb-0">
//         <div className="flex items-center gap-6">
//           {/* ITEM */}
//           <TimeBox title="HOUR" value={hours} />
//           <TimeBox title="MIN" value={minutes} />
//           <TimeBox title="SEC" value={seconds} />
//         </div>

//         {/* Message */}
//         <p className="mt-8 px-5 py-3 rounded-md font-normal text-center bg-linear-to-r from-(--primary) to-(--success) text-white shadow-2xl">Result will be announced soon</p>
//       </div>
//     </div>
//   );
// };

// const TimeBox: FC<{ title: string; value: string }> = ({ title, value }) => (
//   <div className="flex flex-col items-center rounded-xl shadow-2xl overflow-hidden bg-linear-to-br from-(--primary) to-(--success) py-2 sm:py-4 px-5 sm:px-11">
//     <p className="text-3xl sm:text-4xl font-semibold text-white">{value}</p>
//     <p className="text-white font-bold text-center text-base">{title}</p>
//   </div>
// );

// export default CountDown;
