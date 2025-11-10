import { useEffect, useState } from "react";

const useCountDown = (startTime: string, endTime: string) => {
  const [timeLeft, setTimeLeft] = useState(0);
  const [isFinished, setIsFinished] = useState(false);

  useEffect(() => {
    if (!startTime || !endTime) return;

    const start = new Date(startTime).getTime();
    const end = new Date(endTime).getTime();

    const timer = setInterval(() => {
      const now = Date.now();

      // If current time is before exam start
      if (now < start) {
        setTimeLeft(end - start);
        return;
      }

      const remain = end - now;

      if (remain <= 0) {
        setTimeLeft(0);
        setIsFinished(true);
        clearInterval(timer);
      } else {
        setTimeLeft(remain);
      }
    }, 1000);

    return () => clearInterval(timer);
  }, [startTime, endTime]);

  // convert ms → hh:mm:ss
  const totalSec = Math.floor(timeLeft / 1000);
  const hours = String(Math.floor(totalSec / 3600)).padStart(2, "0");
  const minutes = String(Math.floor((totalSec % 3600) / 60)).padStart(2, "0");
  const seconds = String(totalSec % 60).padStart(2, "0");

  return { hours, minutes, seconds, isFinished, timeLeft };
};

export default useCountDown;
