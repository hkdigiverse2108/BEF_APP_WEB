import { Tab, Tabs } from "@mui/material";
import { Skeleton } from "antd";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useGetApiQuery } from "../../Api/CommonApi";
import { CardHeader } from "../../Components/Common/CardHeader";
import ContestDetailCard from "../../Components/Contest/ContestDetailCard";
import SubtopicDrawer from "../../Components/Home/SubtopicDrawer";
import { ImagePath, ROUTES, URL_KEYS } from "../../Constants";
import type { ContestPrize } from "../../Types";

const ContestDetails = () => {
  const [tabIndex, setTabIndex] = useState(0);
  const navigate = useNavigate();
  const location = useLocation();
  const { contestData, type, contestDataTime } = location.state || {};

  const handleChange = (_event: React.SyntheticEvent, newValue: number) => setTabIndex(newValue);

  const { data: ContestDetailsData, isLoading } = useGetApiQuery({ url: `${URL_KEYS.CONTEST.ID}${contestData?._id}` }, { skip: false });

  useEffect(() => {
    if (!contestData && !contestDataTime) navigate(ROUTES.CONTEST.MY_CONTEST);
  }, [contestDataTime, contestData, navigate]);

  const PrizeTable = ({ prizes }: { prizes: ContestPrize[] }) => (
    <div className="bg-input-box border border-theme/10 p-4 rounded-2xl">
      <div className="w-full mx-auto rounded-xl overflow-hidden border border-theme/25">
        {/* Header */}
        <div className="relative bg-primary text-white font-bold flex justify-between px-6 py-3 text-lg sm:text-xl">
          <span>Ranks</span>
          <span>Scholarship</span>
          <div className="absolute inset-0 w-full h-full">
            <img src={`${ImagePath}contest/Contest-Bg-2.png`} alt="" className="w-full h-full object-cover -center" />
          </div>
        </div>

        {/* Rows */}
        <div className="divide-y max-h-[26rem] overflow-auto divide-theme/10 bg-white">
          {prizes.map((item, index) => {
            let rankDisplay;
            if (index === 0) rankDisplay = <img src={`${ImagePath}contest/Contest-Trophy-Rank-1.png`} className="w-8 h-8" />;
            else if (index === 1) rankDisplay = <img src={`${ImagePath}contest/Contest-Trophy-Rank-2.png`} className="w-8 h-8" />;
            else if (index === 2) rankDisplay = <img src={`${ImagePath}contest/Contest-Trophy-Rank-3.png`} className="w-8 h-8" />;
            else rankDisplay = item.endPlace ? `#${item.startPlace}-${item.endPlace}` : item.startPlace;

            return (
              <div key={index} className="flex justify-between px-6 py-3 hover:bg-theme-bg transition font-bold">
                <span>{rankDisplay}</span>
                <span>₹ {Number(item.price).toLocaleString()}</span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );

  const tabs = [
    { label: "AIR Scholarship", content: <PrizeTable prizes={ContestDetailsData?.data.ranks || []} /> },
    { label: "Flexible Scholarship", content: <PrizeTable prizes={ContestDetailsData?.data.currentPricePool || []} /> },
  ];

  return (
    <div className="sub-container">
      <div className="my-12 flex flex-col gap-6">
        <CardHeader title="Mega Contest" backButton={true} />

        <div className="flex flex-col lg:flex-row gap-5">
          <div className="w-full lg:w-2/3 skeleton">{isLoading ? <Skeleton.Node active style={{ width: "100%", height: 250, borderRadius: 15 }} /> : <ContestDetailCard contestData={contestData} type={type} contestDataTime={contestDataTime} />}</div>
          <div className="w-full mt-2 lg:mt-0 custom-tab-full">
            <Tabs className="horizontal-tabs" orientation="horizontal" variant="scrollable" value={tabIndex} onChange={handleChange}>
              {tabs.map((tab, idx) => (
                <Tab key={idx} label={tab.label} />
              ))}
            </Tabs>

            <div className="mt-6 skeleton">
              {isLoading ? (
                <Skeleton.Node active style={{ width: "100%", height: 200, borderRadius: 15 }} />
              ) : (
                tabs.map((tab, idx) => (
                  <div key={idx} hidden={tabIndex !== idx}>
                    {tab.content}
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      </div>

      <SubtopicDrawer />
    </div>
  );
};

export default ContestDetails;
