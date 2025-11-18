import { CONTACT, ROUTES } from "../../Constants";
import { Link, useLocation } from "react-router-dom";
import { IoCall } from "react-icons/io5";
import { Popover } from "antd";
import { IoLogoWhatsapp } from "react-icons/io";
import { MdSupportAgent } from "react-icons/md";

const GlobalContactContent = () => {
  return (
    <div
      className="flex flex-col gap-4  transition-all duration-200 max-w-65  sm:max-w-90"
      onClick={(e) => e.stopPropagation()}
    >
      <div className="flex justify-between space-y-2">
        <section className="space-y-1">
          <h1 className=" text-lg sm:text-xl font-semibold">
            Talk to a counsellor
          </h1>
          <p className="font-medium   ">
            Have doubts? Our support team will be happy to assist you!
          </p>
        </section>
        <MdSupportAgent className="text-5xl sm:text-7xl " />
      </div>
      <div className="space-y-2 font-semibold">
        <Link
          to={`tel:${CONTACT?.NUMBER}`}
          className="flex flex-nowrap gap-2 cursor-pointer text-black! border p-2 rounded-md border-gray-200 hover:border-gray-400 "
        >
          <IoCall className="me-2 text-xl text-success" />
          {CONTACT?.NUMBER.split("+91")}
        </Link>
        <Link
          to={`https://api.whatsapp.com/send?phone=${
            CONTACT?.NUMBER
          }&text=${encodeURIComponent(`I Need Help In Bharat Exam Fest Web`)}`}
          target="_blank"
          rel="noopener noreferrer"
          className="flex flex-nowrap gap-2 cursor-pointer text-black! border p-2 rounded-md border-gray-200 hover:border-gray-400 "
        >
          <IoLogoWhatsapp className="me-2 text-xl text-success" /> Chat With Us
        </Link>
      </div>
    </div>
  );
};

const WhatsappIcon = () => {
  const location = useLocation();

  const isCourseDetails = location.pathname.startsWith(
    ROUTES.WORKSHOP.DETAILS.replace(":id", "")
  );
  const isWorkshopDetails = location.pathname.startsWith("/workshop/details");

  return (
    <Popover
      placement="topRight"
      content={GlobalContactContent}
      trigger="click"
    >
      <div
        className={`fixed bottom-5  right-5 z-10 bg-primary p-4 rounded-full group ${
          location.pathname === ROUTES.COURSE.DETAILS ||
          location.pathname === ROUTES.WORKSHOP.WORKSHOP
            ? "bottom-37"
            : "bottom-0"
        }`}
      >
        <IoCall className="text-3xl group-hover:animate-spin text-white! cursor-pointer  transition-transform" />
      </div>
    </Popover>
  );
};

export default WhatsappIcon;
