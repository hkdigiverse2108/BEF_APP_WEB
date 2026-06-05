import { Tab, Tabs, useMediaQuery, useTheme } from "@mui/material";
import { Empty, Skeleton } from "antd";
import { useState, type SyntheticEvent } from "react";
import { useGetApiQuery } from "../../../Api/CommonApi";
import { URL_KEYS } from "../../../Constants";
import ContestFilterDrawer from "../../../Pages/Contest/ContestFilterDrawer";
import type { ContestCore, ModuleType } from "../../../Types";
import ContestDetailCard from "../../Contest/ContestDetailCard";
import SubtopicDrawer from "../../Home/SubtopicDrawer";
import { useParams } from "react-router-dom";

const CourseTestsTab = ({ Modules, isUnlocked }: { Modules: ModuleType[]; isUnlocked: boolean }) => {
  const [selectedModule, setSelectedModule] = useState(Modules[0]?._id);
  const { id }: { id?: string } = useParams();
  const theme = useTheme();
  const isMdUp = useMediaQuery(theme.breakpoints.up("sm"));

  const { data, isLoading } = useGetApiQuery({ url: `${URL_KEYS.CONTEST.ALL}?moduleFilter=${selectedModule}&courseFilter=${id}&typeFilter=course` }, { skip: !selectedModule });

  const Contests = data?.data?.contest_data || [];

  const handleTabChange = (_: SyntheticEvent, newValue: string) => {
    setSelectedModule(newValue);
  };

  if (isLoading) return false;

  return (
    <>
      <div className="flex max-sm:flex-col gap-4" data-aos="fade-up">
        <div className="sm:!w-1/2 md:!w-1/4">
          <Tabs
            value={selectedModule}
            onChange={handleTabChange}
            textColor="primary"
            variant="scrollable"
            scrollButtons="auto"
            orientation={isMdUp ? "vertical" : "horizontal"}
            aria-label="module tests tab selection"
            className="LecturesTabs max-sm:w-full! sm:!w-full !flex !justify-between !gap-4 border-b sm:border sm:rounded-lg border-gray-300 "
            sx={{
              "& .MuiTabs-flexContainer ": {
                justifyContent: "space-between",
              },
            }}
          >
            {Modules?.map((module: ModuleType, index) => {
              return <Tab key={index} value={module?._id} label={module?.name} />;
            })}
          </Tabs>
        </div>
        <div className="w-full flex flex-col gap-3">
          <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-2 2xl:grid-cols-3 gap-5">
            {isLoading ? (
              [...Array(4)]?.map((_, i) => <Skeleton.Node key={i} active style={{ width: "100%", height: 300, borderRadius: 15 }} />)
            ) : Contests?.length > 0 ? (
              Contests?.map((item: ContestCore, i: number) => <ContestDetailCard key={i} contestData={item} isUnlocked={isUnlocked} />)
            ) : (
              <div className="flex items-center justify-center w-full col-span-4">
                <Empty />
              </div>
            )}
          </div>
        </div>
      </div>
      <ContestFilterDrawer />
      <SubtopicDrawer />
    </>
  );
};

export default CourseTestsTab;
