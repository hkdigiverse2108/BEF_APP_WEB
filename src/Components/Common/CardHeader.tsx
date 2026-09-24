import type { FC } from "react";
import type { CardHeaderType } from "../../Types";
import {  useNavigate } from "react-router-dom";
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
  return (
    <div className="w-full flex justify-between items-center flex-wrap gap-3">
      <section className="flex items-center gap-3 min-w-0">
        {backButton && (
          <button onClick={() => navigate(-1)} aria-label="Go back" className="flex h-10 w-10 sm:h-11 sm:w-11 shrink-0 items-center justify-center rounded-xl bg-secondary text-primary transition-all duration-300 hover:border hover:border-accent hover:text-accent">
            <IoMdArrowRoundBack />
          </button>
        )}
        {title && (
          <div className="flex items-center gap-3 min-w-0">
            <span className="bef-section-bar shrink-0" />
            <div className="min-w-0">
              <h1 className="capitalize font-heading text-base sm:text-xl font-bold text-foreground truncate">{title}</h1>
              <span className="bef-section-dot mt-1" />
            </div>
          </div>
        )}
        {pricePool && (
          <section className="flex gap-2 bg-secondary border border-border text-primary text-xs sm:text-sm items-center rounded-full font-bold px-3 py-1.5">
            <span className="text-base text-accent">{pricePool.icon}</span>
            <span>{pricePool.price}</span>
          </section>
        )}
      </section>
      <section className="flex gap-4 items-center justify-end">
        {icon && time && (
          <section className="flex gap-1 items-center">
            <span className="text-primary">{icon}</span>
            <span className="text-sm xl:text-lg font-normal text-muted-foreground">
              {time}
            </span>
          </section>
        )}
        {sliderButton && (
          <div className="flex flex-nowrap justify-end gap-2">
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
              className="!bg-card !border !border-border !text-foreground !rounded-lg !h-11 !w-11 hover:!border-primary hover:!text-primary"
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
              className="!bg-primary !text-white !border !border-primary !rounded-lg !h-11 !w-11 hover:!bg-tertiary"
            />
          </div>
        )}
      </section>
    </div>
  );
};
