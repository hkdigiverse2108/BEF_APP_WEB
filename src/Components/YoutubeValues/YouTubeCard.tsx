import React, { useState } from "react";
import { InstagramEmbed } from "react-social-media-embed";
import { ImagePath } from "../../Constants";
interface YouTubeCardProps {
  videoId: string;
  title: string;
  type?: string;
  thumbnail?: string;
}

const YouTubeCard: React.FC<YouTubeCardProps> = ({ videoId, title, type, thumbnail }) => {
  const [activeVideo, setActiveVideo] = useState<string | null>(null);
  const openVideo = (link: string) => {
    let videoId = "";
    if (link.includes("youtu.be")) {
      videoId = link.split("youtu.be/")[1].split("?")[0];
    } else if (link.includes("watch?v=")) {
      videoId = link.split("watch?v=")[1].split("&")[0];
    } else {
      videoId = link;
    }
    const embedLink = `https://www.youtube.com/embed/${videoId}?autoplay=1`;
    setActiveVideo(embedLink);
  };

  return (
    <div className="w-full h-fit rounded-lg overflow-hidden cursor-pointer shadow transition hover:shadow-lg">
      {type === "instagram" ? (
        <div className="h-full">
          <InstagramEmbed url={videoId} width="100%" />
        </div>
      ) : (
        <>
          <div onClick={() => openVideo(videoId)}>
            <img src={thumbnail || `${ImagePath}howToPlay/how1.jpg`} alt="image" />
          </div>
          {activeVideo && (
            <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50" onClick={() => setActiveVideo(null)}>
              <div className="bg-black rounded-lg overflow-hidden w-[90%] md:w-[800px] aspect-video" onClick={(e) => e.stopPropagation()}>
                <iframe width="100%" height="100%" src={`${activeVideo}`} title="YouTube video player" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowFullScreen />
              </div>
            </div>
          )}
        </>
      )}
      <div className="p-4">
        <span className="flex items-center justify-between gap-2 sm:gap-4 md:gap-8 font-semibold text-lg line-clamp-2 capitalize">{title}</span>
      </div>
    </div>
  );
};

export default YouTubeCard;
