import { BsFillAlarmFill } from "react-icons/bs";
import { ROUTES, ImagePath } from "../../Constants";
import { useNavigate } from "react-router-dom";
import dayjs from "dayjs";
import type { ContestDetailCardProps } from "../../Types";

const MyContestPastTestCard: React.FC<ContestDetailCardProps> = ({
  contestData,
}) => {
  const navigate = useNavigate();

  const {
    contestStartDate,
    rank = 0,
    winningPrice = 0,
    subject: {
      name: subjectName = "Unknown Subject",
      image: subjectImage = `${ImagePath}contest/ContestIcon.png`,
    } = {},
    contest: { name: contestName = "Untitled Contest", pricePool = 0 } = {},
  } = contestData ?? {};

  return (
    <div
      onClick={() =>
        navigate(ROUTES.CONTEST.CONTEST_DETAILS, { state: { contestData } })
      }
      className="border border-primary-light rounded-xl overflow-hidden capitalize flex flex-col justify-between cursor-pointer"
    >
      {/* Header */}
      <div className="flex flex-col lg:flex-row !bg-primary-light px-2 md:px-4">
        <div className="flex flex-row max-sm:flex-col items-center gap-4 w-full h-full p-3">
          <div className="grid gap-1 w-full">
            <h3 className="text-lg max-sm:text-center text-left font-medium tracking-tight">
              {contestName}
            </h3>
          </div>
        </div>
      </div>

      {/* Body */}
      <div className="px-2 md:px-4 py-2">
        <div className="py-2 flex flex-col gap-2 text-black">
          <div className="flex justify-between text-sm font-semibold">
            <section className="flex flex-col gap-2">
              <h1>Get Scholarship</h1>
              <p className="font-bold text-lg">₹{pricePool}</p>
            </section>

            <span className="flex border border-gray-100 w-fit my-2" />

            <section className="flex flex-col justify-end items-end gap-2">
              <h1>Achieved Scholarship</h1>
              <p className="font-bold text-lg bg-success text-white px-3 py-1 w-fit rounded">
                ₹{winningPrice}
              </p>
            </section>
          </div>

          <span className="flex border border-gray-200 w-full my-2" />

          <section className="flex justify-between items-center font-bold">
            <h1>All India Rank</h1>
            <h1 className="font-semibold border bg-input-box border-card-border px-4 py-1 rounded-md">
              {rank || 0}
            </h1>
          </section>
        </div>
      </div>

      {/* Footer */}
      <div className="flex justify-between items-center border-t border-gray-200 px-4 text-sm font-semibold">
        <div className="flex flex-row max-sm:flex-col items-center gap-4 w-full h-full p-3">
          <img
            className="object-cover w-10 h-10 rounded-full border-2 border-white"
            src={subjectImage}
            alt={subjectName}
          />
          <div className="grid gap-1 w-full">
            <h3 className="text-lg max-sm:text-center text-left font-medium tracking-tight">
              {subjectName}
            </h3>
          </div>
        </div>

        <section className="flex gap-1 w-full lg:w-1/2 me-2 justify-end lg:justify-center items-center text-nowrap">
          <span className="text-2xl">
            <BsFillAlarmFill />
          </span>
          <div className="flex flex-col text-xs font-bold">
            <span>{dayjs(contestStartDate).format("h:mm A")}</span>
            <span>{dayjs(contestStartDate).format("MMM DD, YYYY")}</span>
          </div>
        </section>
      </div>
    </div>
  );
};

export default MyContestPastTestCard;
