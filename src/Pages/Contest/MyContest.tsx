import { FormButton } from "../../Attribute/FormFields";
import { Tab, Tabs } from "@mui/material";
import { BsFillAlarmFill } from "react-icons/bs";
import MyContestCard from "../../Components/Contest/MyContestCard";
import { useGetApiQuery } from "../../Api/CommonApi";
import { URL_KEYS } from "../../Constants";
import { CardHeader } from "../../Components/Common/CardHeader";
import { useState } from "react";

const MyContest = () => {
  const [tabIndex, setTabIndex] = useState(0);
  const handleChange = (_event: React.SyntheticEvent, newValue: number) =>
    setTabIndex(newValue);

  const { data: ClassesData } = useGetApiQuery({
    url: `${URL_KEYS.CONTEST.ALL}?page=1&limit=10`,
  });

  const classes = ClassesData?.data.contest_data;

  console.log(classes);

  // const ContestCards = () => {
  //   return (
  //     <div className="flex flex-col gap-6">
  //       <CardHeader
  //         title="GK Showdown"
  //         icon={<BsFillAlarmFill />}
  //         time="25 Min 10s Left"
  //       />

  //       <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-5">
  //         <MyContestCard />
  //         <MyContestCard />
  //         <MyContestCard />
  //         <MyContestCard />
  //       </div>
  //     </div>
  //   );
  // };

  return (
    <div className="sub-container">
      <div className=" mt-12 flex flex-col gap-6 ">
        <Tabs
          className="horizontal-tabs"
          orientation="horizontal"
          variant="scrollable"
          value={tabIndex}
          onChange={handleChange}
        >
          <Tab label="Sub wise" />
          <Tab label="Attempting Strategy wise" />
        </Tabs>
        <CardHeader
          title="GK Showdown"
          icon={<BsFillAlarmFill />}
          time="25 Min 10s Left"
        />
        <div
          hidden={tabIndex !== 0}
          className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-5 mt-6"
        >
          <MyContestCard />
          <MyContestCard />
          <MyContestCard />
          <MyContestCard />
          <MyContestCard />
        </div>

        <div
          hidden={tabIndex !== 1}
          className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-5 mt-6"
        >
          <MyContestCard />
          <MyContestCard />
          <MyContestCard />
        </div>
        {/* <Tabs
          className="bg-amber-"
          onChange={onChange}
          type="card"
          items={[
            {
              key: "Upcoming",
              label: "Upcoming",
              children: (
                <>
                  <ContestCards />
                </>
              ),
            },
            {
              key: "Past-Test",
              label: "Past Test",
              children: (
                <>
                  <h1>2</h1>
                  <ContestCards />
                </>
              ),
            },
          ]}
        /> */}
      </div>
      <div className=" mt-6">
        <div className="w-full flex justify-center">
          <FormButton
            text="View More"
            className="custom-button button button--mimas text-center w-fit !p-4 !px-8 !h-12 uppercase flex items-end-safe"
            onClick={() => console.log("view More")}
          />
        </div>
      </div>
    </div>
  );
};

export default MyContest;
