// import type { FC } from "react";
// import { useGetApiQuery } from "../../../Api/CommonApi";
// import { URL_KEYS } from "../../../Constants";

// const CourseLecturesTab: FC<{ id: string }> = ({ id }) => {
//   const { data } = useGetApiQuery({
//     url: `${URL_KEYS.LECTURE.ALL}?courseFilter=${id}`,
//   });
//   console.log(data);
//   const Lectures = data?.data;
//   return (
//     <div className="space-y-4" data-aos="fade-up">
//       {Lectures?.map((lecture: any) => (
//         <a
//           href={lecture?.link}
//           target="_blank"
//           rel="noopener noreferrer"
//           key={lecture._id}
//           className="flex max-sm:flex-col gap-4 bg-white rounded-lg border border-gray-200 p-4 h-full items-stretch"
//         >
//           {/* Image */}
//           <img
//             src={lecture.image}
//             alt={lecture.title}
//             className="w-full h-full sm:w-fit sm:h-35 rounded-lg object-cover"
//           />
//           {/* Content */}
//           <div className="flex flex-col sm:py-3 gap-2 justify-between">
//             {/* Tags */}
//             <div className="flex items-center gap-2 text-xs">
//               <span className="bg-gray-200 px-1.5 py-0.5 rounded">
//                 {" "}
//                 {lecture.language}{" "}
//               </span>
//               <span className="text-primary font-semibold">
//                 {lecture.subjectName}
//               </span>
//             </div>
//             {/* Title */}
//             <h2 className="font-semibold text-sm sm:text-base">
//               {lecture.title}
//             </h2>
//             {/* Instructor */}
//             <p className="text-gray-600 text-xs font-medium sm:text-sm">
//               {lecture.subtitle}
//             </p>
//             {/* Date */}
//             <p className="text-gray-600 text-xs font-medium">{lecture.date}</p>
//           </div>
//         </a>
//       ))}
//     </div>
//   );
// };

// export default CourseLecturesTab;

import { useState, type SyntheticEvent } from "react";
import { useGetApiQuery } from "../../../Api/CommonApi";
// import type { LectureType, ModuleType } from "../../Types";
// import YoutubeVideoModal from "../Common/YoutubeVideoModal";
import { Tab, Tabs, useMediaQuery, useTheme } from "@mui/material";
import LectureCard from "../../Common/LectureCard";
import { URL_KEYS } from "../../../Constants";
import type { LectureType, ModuleType } from "../../../Types";

const CourseLecturesTab = ({ Modules }: { Modules: ModuleType[] }) => {
  const [playVideo, setPlayVideo] = useState(false);
  const [videoLink, setVideoLink] = useState("");
  const [selectedModule, setSelectedModule] = useState(Modules[0]?._id);

  const theme = useTheme();
  const isMdUp = useMediaQuery(theme.breakpoints.up("sm")); // true for sm and larger
  const { data } = useGetApiQuery({
    url: `${URL_KEYS.LECTURE.ALL}?moduleFilter=${selectedModule}&typeFilter=course`,
  });

  console.log(data?.data);

  const Lectures = data?.data?.lecture_data || [];

  const handleTabChange = (_: SyntheticEvent, newValue: string) => {
    setSelectedModule(newValue);
  };

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
            allowScrollButtonsMobile
            orientation={isMdUp ? "vertical" : "horizontal"}
            aria-label="primary tabs example"
            className="LecturesTabs max-sm:w-full! sm:!w-full !flex !justify-between !gap-4 border-b sm:border  sm:rounded-lg border-gray-300 "
            sx={{
              "& .MuiTabs-flexContainer ": {
                justifyContent: "space-between",
              },
            }}
          >
            {Modules?.map((module: ModuleType, index) => {
              return (
                <Tab key={index} value={module?._id} label={module?.name} />
              );
            })}
          </Tabs>
        </div>
        <div className="w-full flex flex-col gap-1">
          {Lectures?.map((lecture: LectureType) => (
            <LectureCard
              key={lecture?._id}
              lecture={lecture}
              setPlayVideo={setPlayVideo}
              setVideoLink={setVideoLink}
            />
          ))}
        </div>
      </div>
      {/* <YoutubeVideoModal
        playVideo={playVideo}
        setPlayVideo={setPlayVideo}
        videoLink={videoLink}
      /> */}
    </>
  );
};

export default CourseLecturesTab;
