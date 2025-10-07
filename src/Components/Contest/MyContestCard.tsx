import { BsFillAlarmFill } from "react-icons/bs";
import { ImagePath, ROUTES } from "../../Constants";
import { useNavigate } from "react-router-dom";

const MyContestCard = () => {
  const navigate = useNavigate();

  return (
    <div
      onClick={() => navigate(ROUTES.CONTEST.CONTEST_DETAILS)}
      className="border-1 border-primary rounded-xl overflow-hidden capitalize"
    >
      <div className="flex flex-col lg:flex-row !bg-primary px-2 md:px-4 py-2 text-white ">
        <div className="flex flex-row max-sm:flex-col items-center  gap-4 max-sm:gap-0 w-full h-full p-3   ">
          <img
            className="object-cover w-10 rounded-full border-2 border-white "
            src={`${ImagePath}contest/ContestIcon.png`}
          />

          <div className="grid gap-1 w-full ">
            <h3 className="text-lg max-sm:text-center text-left font-medium tracking-tight ">
              Economics & Agriculture
            </h3>
          </div>
        </div>

        <section className="flex gap-1 w-full lg:w-1/4 justify-end lg:justify-center items-center text-nowrap ">
          <span className="text-primary-light text-2xl ">
            <BsFillAlarmFill />
          </span>
          <div className="flex flex-col text-xs">
            <span>9:00 AM</span>
            <span>June 07 , 2025</span>
          </div>
        </section>
      </div>
      <div className="px-2 md:px-4 py-2 ">
        <div className=" py-2 flex flex-col gap-2 text-black ">
          <div className="flex justify-between text-sm   font-semibold ">
            <section className="flex flex-col justify-between ">
              <h1>Prize Pool</h1>
              <p className="font-bold text-lg">₹10,000.00</p>
            </section>
            <span className=" flex border border-gray-100 w-fit my-2   "></span>

            <section className="flex flex-col justify-end items-end gap-2  ">
              <h1>Achived Scholarship</h1>
              <p className="font-bold text-lg bg-success text-white px-3 py-1 w-fit rounded">
                ₹10,000.00
              </p>
            </section>
          </div>
          <span className=" flex border border-gray-200 w-full my-2  "></span>
          <section className="flex justify-between items-center font-bold  ">
            <h1>All india rank </h1>
            <h1 className=" font-semibold border bg-input-box border-card-border px-4 py-1 rounded-md  ">
              01
            </h1>
          </section>
        </div>
      </div>
    </div>
  );
};

export default MyContestCard;
