import type { FC } from "react";
import type { CardHeaderType } from "../../Types";
import { NavLink } from "react-router-dom";
import { IoMdArrowRoundBack } from "react-icons/io";

export const CardHeader: FC<CardHeaderType> = ({
  title,
  icon,
  time,
  goBack = "",
}) => {
  return (
    <div className="flex justify-between text-lg xl:text-2xl font-bold items-center flex-wrap gap-2">
      <section className="flex gap-2">
        {goBack && (
          <NavLink to={goBack}>
            <IoMdArrowRoundBack />
          </NavLink>
        )}
        {title && <h1>{title}</h1>}
      </section>
      {icon && time && (
        <section className="flex gap-1">
          <span className="text-primary">{icon}</span>
          <span className="text-xs md:text-sm xl:text-lg font-semibold ">
            {time}
          </span>
        </section>
      )}
    </div>
  );
};
