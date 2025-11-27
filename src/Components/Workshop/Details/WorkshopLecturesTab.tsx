import type { LectureType } from "../../../Types";
import { useGetApiQuery } from "../../../Api/CommonApi";
import { URL_KEYS } from "../../../Constants";
import LectureCard from "../../WorkshopCourseCommon/LectureCard";
import { Empty } from "antd";

const WorkshopLecturesTab = ({ id, isUnlocked }: { id?: string; isUnlocked: boolean }) => {
  const { data, isLoading } = useGetApiQuery({
    url: `${URL_KEYS.LECTURE.ALL}?workshopFilter=${id}`,
  });

  const Lectures = data?.data?.lecture_data;

  if (isLoading) return false;

  if (Lectures?.length === 0) return <Empty />;

  return (
    <div className="space-y-4" data-aos="fade-up">
      <div className="w-full flex flex-col gap-1">
        {Lectures?.map((lecture: LectureType) => (
          <LectureCard key={lecture?._id} isUnlocked={isUnlocked} lecture={lecture} />
        ))}
      </div>
    </div>
  );
};

export default WorkshopLecturesTab;
