import { CardHeader } from "../../Components/Common/CardHeader";
import YouTubeCard from "../../Components/YoutubeValues/YouTubeCard";

const SocialMediaEngage = () => {
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
    <div className="sub-container">
      <div className="flex justify-between items-center py-2 md:py-5">
        <CardHeader title="Social Media Engage" />
      </div>
      <hr className="text-card-border mb-5" />

      <div className="grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        {videos.map((video, index) => (
          <YouTubeCard key={index} videoId={video.id} title={video.title} />
        ))}
      </div>
    </div>
  );
};

export default SocialMediaEngage;
