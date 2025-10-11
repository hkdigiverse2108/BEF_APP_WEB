import { FormButton } from "../../Attribute/FormFields";
import { Tab, Tabs } from "@mui/material";
import { useGetApiQuery } from "../../Api/CommonApi";
import { URL_KEYS } from "../../Constants";
import { useEffect, useState } from "react";
import MyContestUpcomingCard from "../../Components/Contest/MyContestUpcomingCard";
import MyContestPastTestCard from "../../Components/Contest/MyContestPastTestCard";
import Loader from "../../Components/Common/Loader";
import type { ContestData } from "../../Types";

const MyContest = () => {
  const [tabIndex, setTabIndex] = useState(0);
  const [tabOnelimit, setTabOneLimit] = useState(6);
  const [tabTwolimit, setTabTwoLimit] = useState(6);

  const [queryFilter, setQueryFilter] = useState(
    `limit=${
      tabIndex === 1 ? tabTwolimit : tabOnelimit
    }&contestFilter=upcoming,ongoing`
  );

  const handleChange = (_event: React.SyntheticEvent, newValue: number) =>
    setTabIndex(newValue);

  const { data: ContestData, isLoading } = useGetApiQuery({
    url: `${URL_KEYS.QA.ALL}?page=1&${queryFilter}`,
  });

  const Contest = ContestData?.data.contest_type_data;

  // console.log(Contest);

  useEffect(() => {
    if (tabIndex === 1) {
      setQueryFilter(
        `limit=${
          tabIndex === 1 ? tabTwolimit : tabOnelimit
        }&contestFilter=completed`
      );
    } else {
      setQueryFilter(
        `limit=${
          tabIndex === 1 ? tabTwolimit : tabOnelimit
        }&contestFilter=upcoming,ongoing`
      );
    }
  }, [tabIndex, tabTwolimit, tabOnelimit]);



  return (
    <div className="sub-container">
      <div className=" mt-12 flex flex-col gap-6 ">
        <div className=" flex justify-center ">
          <Tabs
            className="horizontal-tabs w-fit "
            orientation="horizontal"
            variant="scrollable"
            value={tabIndex}
            onChange={handleChange}
          >
            <Tab label="Upcoming" />
            <Tab label="Past Test" />
          </Tabs>
        </div>
        {isLoading ? (
          <Loader />
        ) : (
          <>
            <div hidden={tabIndex !== 0} className="flex flex-col gap-5 mt-6">
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3  gap-5 mt-6">
                {Contest?.map((contest: ContestData, index: number) => (
                  <MyContestUpcomingCard key={index} contestData={contest} />
                ))}
              </div>
              {Contest?.length < tabOnelimit ? (
                ""
              ) : (
                <div className="w-full flex justify-center">
                  <FormButton
                    text="View More"
                    className="custom-button button button--mimas text-center w-fit !p-4 !px-8 !h-12 uppercase flex items-end-safe"
                    onClick={() => setTabOneLimit(tabOnelimit + 6)}
                  />
                </div>
              )}
            </div>

            <div hidden={tabIndex !== 1} className="flex flex-col gap-5 mt-6">
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3  gap-5 mt-6">
                {Contest?.map((contest: ContestData, index: number) => (
                  <MyContestPastTestCard key={index} contestData={contest} />
                ))}
              </div>
              {Contest?.length < tabTwolimit ? (
                ""
              ) : (
                <div className="w-full flex justify-center">
                  <FormButton
                    text="View More"
                    className="custom-button button button--mimas text-center w-fit !p-4 !px-8 !h-12 uppercase flex items-end-safe"
                    onClick={() => setTabTwoLimit(tabTwolimit + 6)}
                  />
                </div>
              )}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default MyContest;
