import { Empty, Skeleton } from "antd";
import { useGetApiQuery } from "../../Api/CommonApi";
import { ROUTES, URL_KEYS } from "../../Constants";
import type { ContestData } from "../../Types";
import MyContestUpcomingCard from "../Contest/MyContestUpcomingCard";
import SectionHeader from "../Common/SectionHeader";

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
            <SectionHeader title="Lifetime Exam" link={ROUTES.CONTEST.MY_CONTEST} showViewAll={(Contest?.length || 0) >= 3} />
            <div className="grid gap-4 sm:gap-5 grid-cols-1 md:grid-cols-2 xl:grid-cols-3">
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
          <div className="mt-8 sm:mt-12 border-t border-border" />
        </>
      )}
    </>
  );
};

export default Contest;
