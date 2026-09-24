import { useEffect, useState } from "react";

type TimeLeft = {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
};

const TARGET_DATE: Date = new Date("2027-05-23T09:30:00");

const ExamTimer: React.FC = () => {
  const [timeLeft, setTimeLeft] = useState<TimeLeft>(getTimeRemaining());

  function getTimeRemaining(): TimeLeft {
    const now: Date = new Date();
    const diff: number = TARGET_DATE.getTime() - now.getTime();

    if (diff <= 0) {
      return { days: 0, hours: 0, minutes: 0, seconds: 0 };
    }

    return {
      days: Math.floor(diff / (1000 * 60 * 60 * 24)),
      hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
      minutes: Math.floor((diff / (1000 * 60)) % 60),
      seconds: Math.floor((diff / 1000) % 60),
    };
  }

  useEffect((): (() => void) => {
    const timer: number = window.setInterval(() => {
      setTimeLeft(getTimeRemaining());
    }, 1000);

    return () => window.clearInterval(timer);
  }, []);

  return (
    <div className="bg-gradient-to-r from-primary via-primary to-tertiary text-white">
      <div className="container container-p mx-auto min-h-11 flex flex-col sm:flex-row sm:items-center justify-between gap-2 py-2 text-xs font-semibold">
        <div className="flex items-center justify-center sm:justify-start gap-2">
          <span className="h-2 w-2 rounded-full bg-accent" />
          <span>Let&apos;s Celebrate this Exam Festival</span>
        </div>
        <div className="flex items-center justify-center sm:justify-end gap-2">
          <span className="text-white/80">{String(timeLeft.days).padStart(2, "0")} Days</span>
          <TimeBox label="Hrs" value={timeLeft.hours} />
          <TimeBox label="Min" value={timeLeft.minutes} />
          <TimeBox label="Sec" value={timeLeft.seconds} />
        </div>
      </div>
    </div>
  );
};

type TimeBoxProps = {
  label: string;
  value: number;
};

const TimeBox: React.FC<TimeBoxProps> = ({ label, value }) => {
  return (
    <span className="rounded-md bg-white/15 px-2 py-1 transition-transform duration-300 hover:-translate-y-0.5">
      {String(value).padStart(2, "0")} {label}
    </span>
  );
};

export default ExamTimer;
