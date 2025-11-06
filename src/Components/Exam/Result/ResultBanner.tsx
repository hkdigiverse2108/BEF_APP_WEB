import type { FC } from "react";
import { FormButton } from "../../../Attribute/FormFields";
import { ImagePath, ROUTES } from "../../../Constants";
import type { ContestData } from "../../../Types";
import { useNavigate } from "react-router-dom";

const ResultBanner: FC<{ contest: ContestData }> = ({ contest }) => {
  const navigate = useNavigate()
  return (
    <div className="w-full h-full rounded-2xl p-6 shadow-sm lg:flex-row bg-cover bg-center" style={{ backgroundImage: `url(${ImagePath}result/Result-bg.jpg)` }}>
      <div className="sm:w-90 h-full bg-white rounded-2xl text-center p-4">
        <h2 className="text-xl font-bold capitalize">{contest?.contest?.name}</h2>
        <div className="border-y border-card-border py-4 my-5 ps-4">
          <div className="flex flex-row max-sm:flex-col items-center gap-4 w-full h-full">
            <img className="object-cover w-10 h-10 rounded-full border-2 border-white" src={contest?.subject?.image} alt={contest?.subject?.name} />
            <div className="grid gap-1 w-full">
              <h3 className="text-lg max-sm:text-center text-left font-medium tracking-tight">{contest?.subject?.name}</h3>
            </div>
          </div>
        </div>
        <FormButton onClick={() => navigate(ROUTES.EXAM.SOLUTION)} text="view solution" className="custom-button button button--mimas text-center w-full !p-4 !h-12 uppercase flex items-end-safe" />
      </div>
    </div>
  );
};

export default ResultBanner;
