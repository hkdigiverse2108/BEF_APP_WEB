import { type FC } from "react";
import { TbPhoneCall } from "react-icons/tb";
import { useNavigate } from "react-router-dom";
import { FormButton } from "../../Attribute/FormFields";
import { ROUTES } from "../../Constants";
import type { CourseItem } from "../../Types";

const CourseCard: FC<{ data: CourseItem; onCallClick?: () => void }> = ({ data, onCallClick }) => {
  const navigate = useNavigate();
  return (
    <div className="relative rounded-2xl overflow-hidden cursor-pointer shadow-xl flex flex-col justify-end">
      <div className="w-full rounded-t-2xl overflow-hidden bg-input-box-dark">
        <img src={data?.image} alt="Course" className="object-cover w-full h-full" />
        <div className="p-2 rounded-t-xl flex justify-between gap-7 mb-0.5 absolute top-0 left-0 w-full z-10">
          <span className="bg-white/20 text-white font-bold text-sm p-1 px-3 rounded backdrop-blur-md">{data?.language}</span>
          <span className="bg-white/20 text-white font-bold text-sm p-1 px-3 rounded backdrop-blur-md">{data?.syllabus?.subjectLevel}</span>
        </div>
      </div>

      <div className="bg-white p-4 grid gap-3">
        <div className="flex flex-wrap items-center text-xs sm:text-sm justify-between gap-2">
          <span className="font-normal text-base sm:text-lg">Have questions about this Course?</span>
          <span onClick={onCallClick} className="transition-colors hover:bg-input-box-dark/60 border border-input-box-dark font-semibold text-sm p-1 px-3 rounded-sm capitalize flex items-center cursor-pointer">
            <TbPhoneCall className="me-2 text-lg text-success" />
            Talk to a counsellor
          </span>
        </div>

        <FormButton htmlType="button" text={"VIEW BATCH DETAILS"} onClick={() => navigate(ROUTES.COURSE.DETAILS.replace(":id", data?._id))} className="!font-bold custom-button light button button--mimas w-full !h-auto uppercase" />
      </div>
    </div>
  );
};

export default CourseCard;
