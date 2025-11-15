import { Link } from "react-router-dom";
import { ROUTES } from "../../Constants";
import YouTubeCard from "../YoutubeValues/YouTubeCard";

const YoutubeValues = () => {
  const videos = [
    {
      id: "https://www.youtube-nocookie.com/embed/1Y_QObxSwQ0",
      title: "In which stage of sleep does vivid dreaming occur?",
    },
    {
      id: "https://www.youtube-nocookie.com/embed/dQw4w9WgXcQ",
      title: "How to improve memory retention for exams?",
    },
    {
      id: "https://www.youtube-nocookie.com/embed/kXYiU_JCYtU",
      title: "Effective study techniques for students",
    },
  ];
  return (
    <div className="pb-5">
      <div className="flex justify-between items-center pb-5">
        <p className="text-lg font-semibold">Youtube Values</p>
        <Link to={ROUTES.YOUTUBE_VALUES.YOUTUBE_VALUES} className="text-base font-normal bg-primary m-0 py-1 px-3 rounded-lg text-white">
          View All
        </Link>
      </div>
      <div className="grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        {videos?.map((video, index) => (
          <YouTubeCard key={index} videoId={video.id} title={video.title} />
        ))}
      </div>
    </div>
  );
};

export default YoutubeValues;
