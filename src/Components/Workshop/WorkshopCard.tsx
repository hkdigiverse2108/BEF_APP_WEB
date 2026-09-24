import { useState, type FC } from "react";
import { TbPhoneCall } from "react-icons/tb";
import { useNavigate } from "react-router-dom";
import { FormButton } from "../../Attribute/FormFields";
import { ROUTES } from "../../Constants";
import type { WorkshopItem } from "../../Types";
import { Popover } from "antd";
import ContactContent from "../WorkshopCourseCommon/ContactContent";

const WorkshopCard: FC<{ data: WorkshopItem }> = ({ data }) => {
  const [imageLoaded, setImageLoaded] = useState(false);
  const navigate = useNavigate();

  const title = "Have questions about this Workshop?";
  const subtitle = "Talk to a counsellor";

  return (
    <div className="bef-card relative cursor-pointer transition-all duration-300 hover:-translate-y-1 hover:border-accent flex flex-col">
      <div className="bef-card-strip" />
      <div className="relative w-full overflow-hidden">
        <img
          src={data?.image}
          onLoad={() => setImageLoaded(true)}
          className={`w-full h-52 sm:h-56 object-cover transition-all duration-500 hover:scale-105 ${
            imageLoaded ? "opacity-100" : "opacity-0"
          }`}
        />
        <div className="flex justify-between gap-2 absolute top-3 left-3 right-3 z-10">
          <span className="rounded-full bg-card/90 px-3 py-1 text-[11px] font-bold text-foreground backdrop-blur-md">
            {data?.language}
          </span>
          <span className="rounded-full bg-card/90 px-3 py-1 text-[11px] font-bold text-foreground backdrop-blur-md">
            {data?.syllabus}
          </span>
        </div>
      </div>

      <div className="bg-card p-4 sm:p-5 grid gap-3">
        <div className="flex flex-wrap items-center text-xs sm:text-sm justify-between gap-2">
          <span className="font-semibold text-muted-foreground">{title}</span>
          <div
            onClick={(e) => {
              e.preventDefault();
            }}
          >
            <Popover
              content={ContactContent}
              trigger="click"
              className="w-fit text-nowrap transition-all duration-300 hover:border-accent hover:text-accent border border-border bg-secondary font-semibold text-xs px-3 py-2 rounded-xl capitalize flex items-center cursor-pointer"
            >
              <TbPhoneCall className="me-2 text-base text-accent" />
              {subtitle}
            </Popover>
          </div>
        </div>

        <FormButton
          htmlType="button"
          text={"VIEW BATCH DETAILS"}
          onClick={() =>
            navigate(ROUTES.WORKSHOP.DETAILS.replace(":id", data?._id))
          }
          className="bef-btn-primary w-full uppercase"
        />
      </div>
    </div>
  );
};

export default WorkshopCard;
