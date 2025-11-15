import { Progress } from "antd";
import { FormButton } from "../../Attribute/FormFields";
import { BsFillAlarmFill } from "react-icons/bs";
import { ImagePath, ROUTES } from "../../Constants";
import { useNavigate } from "react-router-dom";

const ContestCard = () => {
  const navigate = useNavigate();
  return (
    <div
      onClick={() => navigate(ROUTES.CONTEST.CONTEST_DETAILS)}
      className="border-1 border-primary rounded-xl overflow-hidden"
    >
      <div className="flex flex-col lg:flex-row !bg-primary px-2 md:px-4 py-2 text-white">
        <div className="flex flex-row max-sm:flex-col items-center  gap-4 max-sm:gap-0 w-full h-full p-3  ">
          <img
            className="object-cover  max-sm:w-15 rounded-full border-2 border-white "
            src={`${ImagePath}contest/ContestIcon.png`}
          />

          <div className="grid gap-1 w-full ">
            <h3 className="text-lg max-sm:text-center text-left font-medium tracking-tight ">
              Modern History
            </h3>
            <p className=" font-normal max-sm:text-center text-left ">
              Explore events from 18th century to independence.
            </p>
          </div>
        </div>

        <section className="flex gap-1 w-full lg:w-1/4 justify-end lg:justify-center items-center text-nowrap ">
          <span className="text-primary-light ">
            <BsFillAlarmFill />
          </span>
          <span>9:00 AM</span>
        </section>
      </div>
      <div className="px-2 md:px-4 py-2 ">
        <div className=" py-2 flex flex-col gap-2 text-black">
          <section className="flex justify-between text-sm md:text-lg lg:text-xl font-semibold ">
            <h1 className="uppercase">Prize Pool</h1>
            <p>$1 Crore</p>
          </section>
          <section>
            <Progress percent={90} showInfo={false} strokeColor={"green"} />
          </section>
          <section className="flex justify-between  ">
            <h1>434 Left </h1>
            <h1 className="text-black font-normal">1,500 Spots</h1>
          </section>
        </div>
        <span className=" flex border border-gray-200 w-full my-2  "></span>
        <div className=" py-2 ">
          <FormButton
            htmlType="submit"
            text="pay - 200.00"
            onClick={(e) => e.stopPropagation()}
            className="custom-button button button--mimas w-full !h-auto z-10 "
          />
        </div>
      </div>
    </div>
  );
};

export default ContestCard;
