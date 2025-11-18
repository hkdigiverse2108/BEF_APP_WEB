import { Link } from "react-router-dom";
import { ROUTES } from "../../Constants";
import YouTubeCard from "../YoutubeValues/YouTubeCard";

const SocialMediaEngage = () => {
  const videos = [
    {
      id: "https://www.instagram.com/reel/DPOj7uSkQbH/?igsh=MWV3aG1zenhoMTBueg%3D%3D",
      title: "In which stage of sleep does vivid dreaming occur?",
    },
    {
      id: "https://www.instagram.com/reel/DKxQ_dnp_LI/?igsh=MWY0OTA0NHdncnBjZg==",
      title: "How to improve memory retention for exams?",
    },
    {
      id: "https://www.instagram.com/p/DHdJaphKDFD/?igsh=MTd2ajQxcnpybWJ1Yw==",
      title: "Effective study techniques for students",
    },
    {
      id: "https://www.instagram.com/reel/DKxQ_dnp_LI/?igsh=MWY0OTA0NHdncnBjZg==",
      title: "How to improve memory retention for exams?",
    },
    {
      id: "https://www.instagram.com/p/DHdJaphKDFD/?igsh=MTd2ajQxcnpybWJ1Yw==",
      title: "Effective study techniques for students",
    },
  ];
  return (
    <div>
      <div className="flex justify-between items-center pb-5">
        <p className="text-lg font-semibold">Social Media Engage</p>
        <Link to={ROUTES.SOCIAL_MEDIA_ENGAGE.SOCIAL_MEDIA_ENGAGE} className="text-base font-semibold bg-primary m-0 py-1 px-3 rounded-lg text-white">
          View All
        </Link>
      </div>
      <div className="grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
        {videos?.map((video, index) => (
          <YouTubeCard key={index} videoId={video.id} title={video.title} type="instagram" />
        ))}
      </div>
    </div>
  );
};

export default SocialMediaEngage;
