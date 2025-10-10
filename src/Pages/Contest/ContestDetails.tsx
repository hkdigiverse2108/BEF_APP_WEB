import { BsFillAlarmFill } from "react-icons/bs";
import { CardHeader } from "../../Components/Common/CardHeader";
import ContestDetailCatd from "../../Components/Contest/ContestDetailCatd";
import { useLocation, useNavigate } from "react-router-dom";
import SubtopicDrawer from "../../Components/Home/SubtopicDrawer";
import { Tab, Tabs } from "@mui/material";
import { useEffect, useState } from "react";
import { ROUTES } from "../../Constants";

const prizeData = [
  {
    rank: (
      <img
        src="/assets/images/contest/Contest-Trophy.png"
        className="w-8 h-8"
      />
    ),
    amount: "₹5,00,000",
  },
  {
    rank: (
      <img
        src="/assets/images/contest/Contest-Trophy.png"
        className="w-8 h-8"
      />
    ),
    amount: "₹2,50,000",
  },
  {
    rank: (
      <img
        src="/assets/images/contest/Contest-Trophy.png"
        className="w-8 h-8"
      />
    ),
    amount: "₹1,00,000",
  },
  { rank: "#4-10", amount: "₹25,000" },
  { rank: "#11-20", amount: "₹25,000" },
  { rank: "#21-55", amount: "₹25,000" },
  { rank: "#56-90", amount: "₹25,000" },
  { rank: "#91-130", amount: "₹25,000" },
  { rank: "#131-170", amount: "₹25,000" },
  { rank: "#21-55", amount: "₹25,000" },
  { rank: "#56-90", amount: "₹25,000" },
  { rank: "#91-130", amount: "₹25,000" },
  { rank: "#131-170", amount: "₹25,000" },
  { rank: "#21-55", amount: "₹25,000" },
  { rank: "#56-90", amount: "₹25,000" },
  { rank: "#91-130", amount: "₹25,000" },
  { rank: "#131-170", amount: "₹25,000" },
];

const ContestDetails = () => {
  const [tabIndex, setTabIndex] = useState(0);
  const navigate = useNavigate();
  const location = useLocation();
  const { contestData } = location.state || {};

  const handleChange = (_event: React.SyntheticEvent, newValue: number) =>
    setTabIndex(newValue);

  console.log("Contest data:", contestData);

  useEffect(() => {
    if (!contestData) navigate(ROUTES.CONTEST.MY_CONTEST);
  }, []);

  const Winning = () => {
    return (
      <div className="bg-input-box border border-gray-200 p-4 rounded-2xl">
        <div className="w-full  mx-auto  rounded-2xl overflow-hidden border border-gray-200">
          {/* Header */}
          <div className="relative  bg-primary text-white font-semibold flex justify-between px-6 py-3">
            <span>Ranks</span>
            <span>Winners</span>

            <div className="absolute inset-0 w-full h-full">
              <img
                src="/assets/images/contest/Contest-Bg-2.png"
                alt=""
                className="w-full h-full object-cover   -center"
              />
            </div>
          </div>

          {/* Rows */}
          <div className="divide-y max-h-[26rem] overflow-auto divide-gray-200 bg-white">
            {prizeData.map((item, index) => (
              <div
                key={index}
                className="flex justify-between px-6 py-3 text-gray-700 hover:bg-orange-50 transition font-bold "
              >
                <span>{item.rank}</span>
                <span>{item.amount}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="sub-container">
      <div className="my-12 flex flex-col gap-6">
        <CardHeader
          title="Mega Contest"
          icon={<BsFillAlarmFill />}
          time="25 Min 10s Left"
          backButton={true}
        />

        <div className="flex flex-col lg:flex-row gap-4">
          <ContestDetailCatd contestData={contestData} />
          <div className="w-full mt-8 lg:mt-0 custom-tab-full">
            <Tabs
              className="horizontal-tabs "
              orientation="horizontal"
              variant="scrollable"
              value={tabIndex}
              onChange={handleChange}
            >
              <Tab label="Upcoming" />
              <Tab label="Past Test" />
            </Tabs>

            <div hidden={tabIndex !== 0} className=" mt-6">
              <Winning />
            </div>

            <div hidden={tabIndex !== 1} className=" mt-6">
              <Winning />
            </div>
          </div>
        </div>
      </div>
      <SubtopicDrawer />
    </div>
  );
};

export default ContestDetails;
