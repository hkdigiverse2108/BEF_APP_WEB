import type { FC } from "react";
import { FormButton } from "../../../Attribute/FormFields";
import { ImagePath, ROUTES } from "../../../Constants";
import type { ContestData } from "../../../Types";
import { useNavigate } from "react-router-dom";
import { Skeleton } from "antd";

const ResultBanner: FC<{ contest: ContestData; qaId: string; contestId: string; loading: boolean }> = ({ contest, qaId, contestId, loading }) => {
  const navigate = useNavigate();
  return (
    <div className="w-full sm:h-[380px] rounded-2xl p-6 shadow-sm lg:flex-row max-sm:bg-center flex justify-center sm:justify-end items-center" style={{ backgroundImage: `url(${ImagePath}result/Result-bg1.jpg)` }}>
      <div className="max-sm:w-full h-fit bg-white rounded-2xl text-center p-4">
        <h2 className="text-xl font-semibold capitalize">{loading ? <Skeleton.Input active style={{ height: 30, borderRadius: 5 }} block /> : contest?.contest?.name}</h2>
        <div className="border-y border-card-border p-4 my-5 ">
          <div className="flex flex-row max-sm:flex-col items-center sm:gap-4 w-full h-full">
            {loading ? (
              <Skeleton avatar paragraph={{ rows: 0 }} />
            ) : (
              <>
                <img className="object-cover w-16 h-16 sm:w-12 sm:h-12 rounded-full border-2 border-white" src={contest?.subject?.image} alt={contest?.subject?.name} />
                <div className="grid gap-1 w-full">
                  <h3 className="text-lg max-sm:text-center text-left font-medium tracking-tight">{contest?.subject?.name}</h3>
                </div>
              </>
            )}
          </div>
        </div>
        <FormButton onClick={() => navigate(`${ROUTES.EXAM.SOLUTION.replace(":id", qaId)}?contestId=${contestId}`)} text="view solution" className="custom-button button button--mimas text-center w-full !p-4 !h-12 uppercase flex items-end-safe" />
      </div>
    </div>
  );
};

export default ResultBanner;
