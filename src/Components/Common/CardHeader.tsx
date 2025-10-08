import type { FC } from "react";
import type { CardHeaderType } from "../../Types";
import { NavLink, useNavigate } from "react-router-dom";
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
  const navigate = useNavigate();
  // console.log(sliderButton);
  return (
    <div className="w-full flex justify-between text-lg xl:text-2xl font-bold items-center flex-wrap gap-3">
      <section className="flex gap-2 flex-wrap">
        {backButton && (
          <button onClick={() => navigate(-1)}>
            <IoMdArrowRoundBack />
          </button>
        )}
        {title && <h1 className=" capitalize ">{title}</h1>}
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
          <div className="flex flex-nowrap   justify-end  ">
            <FormButton
              text={<IoIosArrowBack />}
              onClick={() => {
                if (typeof sliderButton.index === "number") {
                  sliderButton.swiperRefs.current[
                    sliderButton.index
                  ]?.slidePrev();
                } else {
                  sliderButton.swiperRefs.current?.slidePrev();
                }
              }}
              className="!bg-input-box !border-none !rounded-r-none "
            />
            <FormButton
              text={<IoIosArrowForward />}
              onClick={() => {
                if (typeof sliderButton.index === "number") {
                  sliderButton.swiperRefs.current[
                    sliderButton.index
                  ]?.slideNext();
                } else {
                  sliderButton.swiperRefs.current?.slideNext();
                }
              }}
              className="!bg-black !text-white !rounded-l-none"
            />
          </div>
        )}
      </section>
    </div>
  );
};
