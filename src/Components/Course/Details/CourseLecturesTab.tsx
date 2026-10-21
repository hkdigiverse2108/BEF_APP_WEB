import { useState, useEffect, type SyntheticEvent } from "react";
import { useGetApiQuery } from "../../../Api/CommonApi";
import { Tab, Tabs, useMediaQuery, useTheme } from "@mui/material";
import LectureCard from "../../WorkshopCourseCommon/LectureCard";
import { URL_KEYS } from "../../../Constants";
import type { LectureType, ModuleType } from "../../../Types";
import { Empty, Skeleton } from "antd";
import { LuCirclePlay } from "react-icons/lu";

const CourseLecturesTab = ({
  Modules,
  isUnlocked,
}: {
  Modules: ModuleType[];
  isUnlocked: boolean;
}) => {
  const [selectedModule, setSelectedModule] = useState<string>(Modules[0]?._id || "");

  useEffect(() => {
    if (!selectedModule && Modules?.length > 0) {
      setSelectedModule(Modules[0]._id);
    }
  }, [Modules, selectedModule]);

  const theme = useTheme();
  const isMdUp = useMediaQuery(theme.breakpoints.up("sm"));

  const { data, isLoading } = useGetApiQuery(
    {
      url: `${URL_KEYS.LECTURE.ALL}?moduleFilter=${selectedModule}&typeFilter=course`,
    },
    { skip: !selectedModule }
  );

  const Lectures: LectureType[] = data?.data?.lecture_data || [];

  const handleTabChange = (_: SyntheticEvent, newValue: string) => {
    setSelectedModule(newValue);
  };

  const activeModuleObj = Modules?.find((m) => m._id === selectedModule);

  return (
    <div className="space-y-4" data-aos="fade-up">
      <div className="flex items-center gap-3 border-b border-gray-200 pb-3">
        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#EDF4FF] text-[#124699]">
          <LuCirclePlay className="text-2xl" />
        </div>
        <div>
          <h2 className="text-lg sm:text-xl font-extrabold text-[#0F172A]">
            {activeModuleObj?.name || "Lectures"}
          </h2>
          <p className="text-xs text-[#64748B]">
            {activeModuleObj?.subTitle || "Select a module to view video lessons & fact sheets"}
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
            aria-label="module selection tabs"
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

        {/* Lectures List */}
        <div className="w-full flex-1 flex flex-col gap-2">
          {isLoading ? (
            <div className="space-y-3">
              {[...Array(3)].map((_, i) => (
                <Skeleton key={i} active avatar paragraph={{ rows: 2 }} />
              ))}
            </div>
          ) : Lectures?.length > 0 ? (
            Lectures.map((lecture: LectureType) => (
              <LectureCard key={lecture?._id} lecture={lecture} isUnlocked={isUnlocked} />
            ))
          ) : (
            <div className="flex flex-col items-center justify-center p-8 bg-gray-50 rounded-xl border border-dashed border-gray-200">
              <Empty description="No lectures uploaded for this module yet" />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CourseLecturesTab;
