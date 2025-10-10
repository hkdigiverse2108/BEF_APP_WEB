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
  const [queryFilter, setQueryFilter] = useState("upcoming,ongoing");
  const [limit, setLimit] = useState(6);

  const handleChange = (_event: React.SyntheticEvent, newValue: number) =>
    setTabIndex(newValue);

  const { data: ContestData } = useGetApiQuery({
    url: `${URL_KEYS.QA.ALL}?page=1&limit=${limit}&contestFilter=${queryFilter}`,
  });

  const Contest = ContestData?.data.contest_type_data;

  console.log(Contest);

  useEffect(() => {
    if (tabIndex === 1) {
      setQueryFilter("completed");
    } else {
      setQueryFilter("upcoming,ongoing");
    }
  }, [tabIndex]);

  if (!Contest) return <Loader />;

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

        <div
          hidden={tabIndex !== 0}
          className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5 mt-6"
        >
          {Contest?.map((contest: ContestData) => (
            <MyContestUpcomingCard contestData={contest} />
          ))}
        </div>

        <div
          hidden={tabIndex !== 1}
          className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3  gap-5 mt-6"
        >
          {Contest?.map((contest: ContestData) => (
            <MyContestPastTestCard contestData={contest} />
            // <MyContestUpcomingCard contestData={contest} />
          ))}
        </div>
      </div>
      <div className=" my-6">
        <div className="w-full flex justify-center">
          <FormButton
            text="View More"
            className="custom-button button button--mimas text-center w-fit !p-4 !px-8 !h-12 uppercase flex items-end-safe"
            onClick={() => setLimit(limit + 6)}
          />
        </div>
      </div>
    </div>
  );
};

export default MyContest;
