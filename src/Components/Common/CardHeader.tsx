import type { FC } from "react";
import type { CardHeaderType } from "../../Types";
import { NavLink } from "react-router-dom";
import {
  IoIosArrowBack,
  IoIosArrowForward,
  IoMdArrowRoundBack,
} from "react-icons/io";
import { FormButton } from "../../Attribute/FormFields";

export const CardHeader: FC<CardHeaderType> = ({
  title,
  icon,
  time,
  backButton = "",
  pricePool,
  sliderButton,
}) => {
  return (
    <div className="flex justify-center sm:justify-between text-lg xl:text-2xl font-bold items-center flex-wrap gap-3">
      <section className="flex gap-2">
        {backButton && (
          <NavLink to={backButton}>
            <IoMdArrowRoundBack />
          </NavLink>
        )}
        {title && <h1>{title}</h1>}
        {pricePool && (
          <section className="flex  gap-2 bg-success text-white text-sm items-center rounded font-semibold  px-3 py-1">
            <span className="text-xl">{pricePool.icon}</span>
            <span>{pricePool.price}</span>
          </section>
        )}
      </section>
      <section className="flex gap-4 items-center justify-end  ">
        {icon && time && (
          <section className="flex gap-1">
            <span className="text-primary">{icon}</span>
            <span className="text-xs md:text-sm xl:text-lg font-semibold ">
              {time}
            </span>
          </section>
        )}
        {sliderButton && (
          <div>
            <FormButton
              text={<IoIosArrowBack />}
              className="!bg-input-box !border-none !rounded-r-none "
            />
            <FormButton
              text={<IoIosArrowForward />}
              className="!bg-black !text-white !rounded-l-none"
            />
          </div>
        )}
      </section>
    </div>
  );
};
