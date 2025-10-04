import type { FC } from "react";
import type { CardHeaderType } from "../../Types";

export const CardHeader: FC<CardHeaderType> = ({ title, icon, time }) => {
  return (
    <div className="flex justify-between text-sm md:text-lg font-semibold items-center flex-wrap gap-2">
      <h1>{title}</h1>
      <section className="flex gap-1">
        <span className="text-primary">{icon}</span>
        <span className="text-xs md:text-sm font-semibold ">{time}</span>
      </section>
    </div>
  );
};
