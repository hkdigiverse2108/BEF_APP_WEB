import { useState, type FC } from "react";
import { TbPhoneCall } from "react-icons/tb";
import { Link, useNavigate } from "react-router-dom";
import { FormButton } from "../../Attribute/FormFields";
import { CONTACT, ROUTES } from "../../Constants";
import type { WorkshopItem } from "../../Types";
import { IoCall } from "react-icons/io5";
import { IoLogoWhatsapp } from "react-icons/io";
import { Popover } from "antd";

const WorkshopCard: FC<{ data: WorkshopItem }> = ({ data }) => {
  const [imageLoaded, setImageLoaded] = useState(false);
  const navigate = useNavigate();

  const title = "Have questions about this Workshop?";
  const subtitle = "Talk to a counsellor";

  const ContactContent = (
    <div className="flex flex-col gap-2" onClick={(e) => e.stopPropagation()}>
      <Link
        to={`tel:${CONTACT?.NUMBER}`}
        className="flex flex-nowrap gap-2 cursor-pointer text-black!"
      >
        <IoCall className="me-2 text-lg text-success" />
        {CONTACT?.NUMBER}
      </Link>
      <span className=" border-t flex border-gray-200  "></span>
      <Link
        to={`https://api.whatsapp.com/send?text=${CONTACT?.NUMBER}`}
        target="_blank"
        rel="noopener noreferrer"
        className="flex flex-nowrap gap-2 cursor-pointer text-black!"
      >
        <IoLogoWhatsapp className="me-2 text-lg text-success" /> Chat With Us
      </Link>
    </div>
  );

  return (
    <div className="relative rounded-2xl overflow-hidden cursor-pointer shadow-xl flex flex-col justify-end">
      <div className="w-full rounded-t-2xl overflow-hidden bg-input-box-dark">
        <img
          src={data?.image}
          // alt="Course"
          // className="object-cover w-full h-full"
          onLoad={() => setImageLoaded(true)}
          className={`w-full h-full max-h-100 md:max-h-70 transition-opacity duration-300 ${
            imageLoaded ? "opacity-100" : "opacity-0"
          }`}
        />
        <div className="p-2 rounded-t-xl flex justify-between gap-7 mb-0.5 absolute top-0 left-0 w-full z-10">
          <span className="bg-white/20 text-white font-bold text-sm p-1 px-3 rounded backdrop-blur-md">
            {data?.language}
          </span>
          <span className="bg-white/20 text-white font-bold text-sm p-1 px-3 rounded backdrop-blur-md">
            {data?.syllabus}
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
              // className="transition-colors text-nowrap hover:bg-input-box-dark/60 border border-input-box-dark font-semibold text-sm p-1 px-3 rounded-sm capitalize flex items-center cursor-pointer"

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
            className="transition-colors hover:bg-input-box-dark/60 border border-input-box-dark font-semibold text-sm p-1 px-3 rounded-sm capitalize flex items-center cursor-pointer"
          >
            <TbPhoneCall className="me-2 text-lg text-success" />
            Talk to a counsellor
          </span>
        </div> */}

        <FormButton
          htmlType="button"
          text={"VIEW BATCH DETAILS"}
          onClick={() =>
            navigate(ROUTES.WORKSHOP.DETAILS.replace(":id", data?._id))
          }
          className="font-bold! custom-button light button button--mimas w-full h-auto! uppercase"
        />
      </div>
    </div>
  );
};

export default WorkshopCard;
