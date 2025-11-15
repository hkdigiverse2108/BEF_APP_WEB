import { useState, type FC } from "react";
import { TbPhoneCall } from "react-icons/tb";
import { useNavigate } from "react-router-dom";
import { FormButton } from "../../Attribute/FormFields";
import { ROUTES } from "../../Constants";
import type { CourseItem } from "../../Types";
import { Popover } from "antd";
import ContactContent from "../WorkshopCourseCommon/ContactContent";

const CourseCard: FC<{ data: CourseItem }> = ({ data }) => {
  const [imageLoaded, setImageLoaded] = useState(false);
  const navigate = useNavigate();

  const title = "Have questions about this Course?";
  const subtitle = "Talk to a counsellor";

  return (
    <div className="relative rounded-2xl bg-input-box-dark overflow-hidden cursor-pointer shadow-xl flex flex-col justify-end">
      <div className="w-full rounded-t-2xl overflow-hidden ">
        <img
          src={data?.image}
          onLoad={() => setImageLoaded(true)}
          className={`w-full h-full min-h-20 max-h-100 md:max-h-85 transition-opacity duration-300 ${
            imageLoaded ? "opacity-100" : "opacity-0"
          }`}
        />
        <div className="p-2 rounded-t-xl flex justify-between gap-7 mb-0.5 absolute top-0 left-0 w-full z-10">
          <span className="bg-white/20 text-white font-semibold text-sm p-1 px-1.5 rounded backdrop-blur-md">
            {data?.language}
          </span>
          <span className="bg-white/20 text-white font-semibold text-sm p-1 px-1.5 rounded backdrop-blur-md">
            {data?.syllabus?.subjectLevel}
          </span>
        </div>
      </div>

      <div className="bg-white p-4 grid gap-3">
        <div className="flex flex-nowrap items-center text-xs sm:text-sm justify-between gap-2">
          <span className="font-normal text-xs  sm:text-sm  ">{title}</span>
          <div
            onClick={(e) => {
              e.preventDefault();
            }}
          >
            <Popover
              content={ContactContent}
              trigger="click"
              // className="transition-colors text-nowrap hover:bg-input-box-dark/60 border border-input-box-dark font-normal text-sm p-1 px-3 rounded-sm capitalize flex items-center cursor-pointer"

              className="w-fit text-nowrap transition-colors hover:bg-input-box-dark/60 border border-input-box-dark  font-normal text-xs p-1 px-3 rounded-sm capitalize flex items-center cursor-pointer"
            >
              <TbPhoneCall className="me-2 text-lg text-success" />
              {subtitle}
            </Popover>
          </div>
        </div>

        {/* <div className="flex flex-wrap items-center text-xs sm:text-sm justify-between gap-2">
          <span className="font-normal text-base sm:text-lg">
            Have questions about this Course?
          </span>
          <span
            onClick={onCallClick}
            className="transition-colors hover:bg-input-box-dark/60 border border-input-box-dark font-normal text-sm p-1 px-3 rounded-sm capitalize flex items-center cursor-pointer"
          >
            <TbPhoneCall className="me-2 text-lg text-success" />
            Talk to a counsellor
          </span>
        </div> */}

        <FormButton
          htmlType="button"
          text={"VIEW BATCH DETAILS"}
          onClick={() =>
            navigate(ROUTES.COURSE.DETAILS.replace(":id", data?._id))
          }
          className="font-semibold! custom-button light button button--mimas w-full h-auto! uppercase"
        />
      </div>
    </div>
  );
};

export default CourseCard;
