import { ROUTES } from "../../Constants";
import SectionHeader from "../Common/SectionHeader";
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
      <SectionHeader title="Social Media Engage" link={ROUTES.SOCIAL_MEDIA_ENGAGE.SOCIAL_MEDIA_ENGAGE} showViewAll />
      <div className="grid gap-4 sm:gap-5 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
        {videos?.map((video, index) => (
          <YouTubeCard key={index} videoId={video.id} title={video.title} type="instagram" />
        ))}
      </div>
    </div>
  );
};

export default SocialMediaEngage;
