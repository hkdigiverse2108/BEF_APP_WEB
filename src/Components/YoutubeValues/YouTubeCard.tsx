import React from "react";
import { InstagramEmbed } from "react-social-media-embed";
interface YouTubeCardProps {
  videoId: string;
  title: string;
  type?: string;
}

const YouTubeCard: React.FC<YouTubeCardProps> = ({ videoId, title, type }) => {
  return (
    <div className="w-full h-fit rounded-2xl overflow-hidden cursor-pointer shadow transition hover:shadow-lg">
      {type === "instagram" ? (
        <div className="h-full">
          <InstagramEmbed url={videoId} width="100%" height="600px" />
        </div>
      ) : (
        <iframe width={560} height={315} src={`${videoId}`} title={title} frameBorder={0} allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerPolicy="strict-origin-when-cross-origin" allowFullScreen className="w-full aspect-video" />
      )}
      <div className="p-4">
        <span className="flex items-center justify-between gap-2 sm:gap-4 md:gap-8 font-bold text-lg line-clamp-2">{title}</span>
      </div>
    </div>
  );
};

export default YouTubeCard;
