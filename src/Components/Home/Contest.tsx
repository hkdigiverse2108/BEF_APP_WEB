import { Empty, Skeleton } from "antd";
import { Link } from "react-router-dom";
import { useGetApiQuery } from "../../Api/CommonApi";
import { ROUTES, URL_KEYS } from "../../Constants";
import type { ContestData } from "../../Types";
import MyContestUpcomingCard from "../Contest/MyContestUpcomingCard";

const Contest = () => {
  const { data: ContestData, isLoading: UpcomingContestLoading } = useGetApiQuery({
    url: `${URL_KEYS.QA.ALL}?page=1&limit=10&contestFilter=upcoming,ongoing&lifetimeFilter=true`,
  });
  const Contest = ContestData?.data.contest_type_data;
  return (
    <>
      {(Contest?.length || 0) > 3 && (
        <>
          <div className="pb-5">
            <div className="flex justify-between items-center pb-5">
              <p className="text-lg font-semibold">Lifetime Exam</p>
              {(Contest?.length || 0) >= 3 && (
                <Link to={ROUTES.CONTEST.MY_CONTEST} className="text-base font-semibold bg-primary m-0 py-1 px-3 rounded text-white">
                  View All
                </Link>
              )}
            </div>
            <div className="grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
              {UpcomingContestLoading ? (
                [...Array(6)].map((_, i) => <Skeleton.Node key={i} active style={{ width: "100%", height: 300, borderRadius: 10 }} />)
              ) : Contest?.length === 0 ? (
                <div className="flex items-center justify-center w-full col-span-4">
                  <Empty />
                </div>
              ) : (
                Contest?.slice(0, 3).map((contest: ContestData, index: number) => <MyContestUpcomingCard key={index} contestData={contest} />)
              )}
            </div>
          </div>
          <hr className="w-[95%] mx-auto text-theme mt-2 mb-4 sm:my-8 opacity-20" />
        </>
      )}
    </>
  );
};

export default Contest;
