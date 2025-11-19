import { Tab, Tabs } from "@mui/material";
import { Empty, Skeleton } from "antd";
import { useEffect, useState } from "react";
import { useGetApiQuery } from "../../Api/CommonApi";
import { FormButton } from "../../Attribute/FormFields";
import MyContestPastTestCard from "../../Components/Contest/MyContestPastTestCard";
import MyContestUpcomingCard from "../../Components/Contest/MyContestUpcomingCard";
import { URL_KEYS } from "../../Constants";
import type { ContestData } from "../../Types";
import { CardHeader } from "../../Components/Common/CardHeader";

const MyContest = () => {
  const [tabIndex, setTabIndex] = useState(0);
  const [tabOneLimit, setTabOneLimit] = useState(12);
  const [tabTwoLimit, setTabTwoLimit] = useState(12);

  const handleChange = (_event: React.SyntheticEvent, newValue: number) =>
    setTabIndex(newValue);

  const {
    data: ContestData,
    isLoading,
    refetch,
  } = useGetApiQuery({
    url: `${URL_KEYS.QA.ALL}?page=1&limit=${tabOneLimit}&contestFilter=upcoming,ongoing`,
  });
  const { data: PastContestData, isLoading: isLoadingPast } = useGetApiQuery({
    url: `${URL_KEYS.QA.ALL}?page=1&limit=${tabTwoLimit}&contestFilter=completed`,
  });

  const Contest = ContestData?.data.contest_type_data;
  const PastContest = PastContestData?.data.contest_type_data;

  useEffect(() => {
    refetch();
  }, []);

  return (
    <div className="sub-container pt-4">
      <CardHeader title="My Contest" />
      <hr className="text-card-border my-4" />
      <div className="flex flex-col gap-6">
        <div className="flex justify-center">
          <Tabs
            className="horizontal-tabs w-fit"
            orientation="horizontal"
            variant="scrollable"
            value={tabIndex}
            onChange={handleChange}
          >
            <Tab label="Upcoming Test" />
            <Tab label="Past Test" />
          </Tabs>
        </div>

        <div hidden={tabIndex !== 0} className="flex flex-col gap-5">
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
            {isLoading ? (
              [...Array(6)].map((_, i) => (
                <Skeleton.Node
                  key={i}
                  active
                  style={{ width: "100%", height: 300, borderRadius: 10 }}
                />
              ))
            ) : Contest?.length === 0 ? (
              <div className="flex items-center justify-center w-full col-span-4">
                <Empty />
              </div>
            ) : (
              Contest?.map((contest: ContestData, index: number) => (
                <MyContestUpcomingCard key={index} contestData={contest} />
              ))
            )}
          </div>
          {Contest?.length >= tabOneLimit && Contest?.length > 0 && (
            <div className="w-full flex justify-center">
              <FormButton
                text="View More"
                className="custom-button button button--mimas text-center w-fit !p-4 !px-8 !h-12 uppercase flex items-end-safe"
                onClick={() => setTabOneLimit(tabOneLimit + 12)}
              />
            </div>
          )}
        </div>

        <div hidden={tabIndex !== 1} className="flex flex-col gap-5">
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
            {isLoadingPast ? (
              [...Array(6)].map((_, i) => (
                <Skeleton.Node
                  key={i}
                  active
                  style={{ width: "100%", height: 300, borderRadius: 10 }}
                />
              ))
            ) : PastContest?.length === 0 ? (
              <div className="flex items-center justify-center w-full col-span-4">
                <Empty />
              </div>
            ) : (
              PastContest?.map((contest: ContestData, index: number) => (
                <MyContestPastTestCard key={index} contestData={contest} />
              ))
            )}
          </div>
          {PastContest?.length >= tabTwoLimit && PastContest?.length > 0 && (
            <div className="w-full flex justify-center">
              <FormButton
                text="View More"
                className="custom-button button button--mimas text-center w-fit !p-4 !px-8 !h-12 uppercase flex items-end-safe"
                onClick={() => setTabTwoLimit(tabTwoLimit + 12)}
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default MyContest;
