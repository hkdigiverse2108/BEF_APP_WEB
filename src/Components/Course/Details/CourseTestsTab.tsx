import { Tab, Tabs, useMediaQuery, useTheme } from "@mui/material";
import { Empty, Skeleton } from "antd";
import { useState, useEffect, type SyntheticEvent } from "react";
import { useGetApiQuery } from "../../../Api/CommonApi";
import { URL_KEYS } from "../../../Constants";
import ContestFilterDrawer from "../../../Pages/Contest/ContestFilterDrawer";
import type { ContestCore, ModuleType } from "../../../Types";
import ContestDetailCard from "../../Contest/ContestDetailCard";
import SubtopicDrawer from "../../Home/SubtopicDrawer";
import { useParams } from "react-router-dom";
import { LuClipboardCheck } from "react-icons/lu";

const CourseTestsTab = ({
  Modules,
  isUnlocked,
}: {
  Modules: ModuleType[];
  isUnlocked: boolean;
}) => {
  const [selectedModule, setSelectedModule] = useState<string>(Modules[0]?._id || "");
  const { id }: { id?: string } = useParams();

  useEffect(() => {
    if (!selectedModule && Modules?.length > 0) {
      setSelectedModule(Modules[0]._id);
    }
  }, [Modules, selectedModule]);

  const theme = useTheme();
  const isMdUp = useMediaQuery(theme.breakpoints.up("sm"));

  const { data, isLoading } = useGetApiQuery(
    {
      url: `${URL_KEYS.CONTEST.ALL}?moduleFilter=${selectedModule}&courseFilter=${id}&typeFilter=course`,
    },
    { skip: !selectedModule }
  );

  const Contests: ContestCore[] = data?.data?.contest_data || [];

  const handleTabChange = (_: SyntheticEvent, newValue: string) => {
    setSelectedModule(newValue);
  };

  const activeModuleObj = Modules?.find((m) => m._id === selectedModule);

  return (
    <div className="space-y-4" data-aos="fade-up">
      <div className="flex items-center gap-3 border-b border-gray-200 pb-3">
        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#EDF4FF] text-[#124699]">
          <LuClipboardCheck className="text-2xl" />
        </div>
        <div>
          <h2 className="text-lg sm:text-xl font-extrabold text-[#0F172A]">
            {activeModuleObj?.name || "Practice Tests"}
          </h2>
          <p className="text-xs text-[#64748B]">
            {activeModuleObj?.subTitle || "Select a module to take practice mock tests"}
          </p>
        </div>
      </div>

      <div className="flex max-sm:flex-col gap-4">
        {/* Module selection sidebar / strip */}
        <div className="sm:!w-1/2 md:!w-1/4">
          <Tabs
            value={selectedModule}
            onChange={handleTabChange}
            textColor="primary"
            variant="scrollable"
            scrollButtons="auto"
            allowScrollButtonsMobile
            orientation={isMdUp ? "vertical" : "horizontal"}
            aria-label="module tests tab selection"
            className="LecturesTabs max-sm:w-full! sm:!w-full border-b sm:border sm:rounded-xl border-gray-200 bg-white"
            sx={{
              "& .MuiTabs-flexContainer": {
                justifyContent: "flex-start",
              },
              "& .MuiTab-root": {
                textAlign: "left",
                alignItems: "flex-start",
                padding: "10px 14px",
                fontSize: "0.8125rem",
                fontWeight: 600,
                textTransform: "none",
                borderRadius: "8px",
                minHeight: "44px",
              },
            }}
          >
            {Modules?.map((module: ModuleType, index) => (
              <Tab
                key={module?._id || index}
                value={module?._id}
                label={`${index + 1}. ${module?.name}`}
              />
            ))}
          </Tabs>
        </div>

        {/* Tests Grid */}
        <div className="w-full flex-1 flex flex-col gap-3">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            {isLoading ? (
              [...Array(4)].map((_, i) => (
                <Skeleton.Node
                  key={i}
                  active
                  style={{ width: "100%", height: 260, borderRadius: 16 }}
                />
              ))
            ) : Contests?.length > 0 ? (
              Contests.map((item: ContestCore, i: number) => (
                <ContestDetailCard key={item._id || i} contestData={item} isUnlocked={isUnlocked} />
              ))
            ) : (
              <div className="flex flex-col items-center justify-center p-8 bg-gray-50 rounded-xl border border-dashed border-gray-200 col-span-2">
                <Empty description="No mock tests available for this module yet" />
              </div>
            )}
          </div>
        </div>
      </div>

      <ContestFilterDrawer />
      <SubtopicDrawer />
    </div>
  );
};

export default CourseTestsTab;
