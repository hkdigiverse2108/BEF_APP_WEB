import { useState } from "react";
import type { LectureType } from "../../../Types";
import { useGetApiQuery } from "../../../Api/CommonApi";
import { URL_KEYS } from "../../../Constants";
import LectureCard from "../../WorkshopCourseCommon/LectureCard";
import VideoModal from "../../Common/VideoModal";

const WorkshopLecturesTab = ({
  id,
  isUnlocked,
}: {
  id?: string;
  isUnlocked: boolean;
}) => {
  const [playVideo, setPlayVideo] = useState(false);
  const [videoLink, setVideoLink] = useState("");

  const { data } = useGetApiQuery({
    url: `${URL_KEYS.LECTURE.ALL}?workshopFilter=${id}`,
  });

  const Lectures = data?.data?.lecture_data;

  return (
    <div className="space-y-4" data-aos="fade-up">
      <div className="w-full flex flex-col gap-1">
        {Lectures?.map((lecture: LectureType) => (
          <LectureCard
            key={lecture?._id}
            isUnlocked={isUnlocked}
            lecture={lecture}
            setPlayVideo={setPlayVideo}
            setVideoLink={setVideoLink}
          />
        ))}
      </div>
      <VideoModal
        playVideo={playVideo}
        setPlayVideo={setPlayVideo}
        videoLink={videoLink}
      />
    </div>
  );
};

export default WorkshopLecturesTab;
