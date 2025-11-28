import { useAppDispatch } from "../../Store/hooks";
import { setModalVideoLink, setModalVideoPlay } from "../../Store/Slices/VideoModalSlice";

interface VideoModalType {
  playVideo: boolean;
  videoLink: string;
}

const VideoModal = ({ playVideo, videoLink }: VideoModalType) => {
  const dispatch = useAppDispatch();

  const handleCloseBtn = () => {
    dispatch(setModalVideoPlay(false));
    dispatch(setModalVideoLink(""));
  };

  const getEmbedLink = (url: string): string => {
    if (!url) return "";

    let videoId = "";

    try {
      // ✅ Handle YouTube links
      if (url.includes("youtube.com/watch?v=")) {
        videoId = url.split("v=")[1]?.split("&")[0];
        return `https://www.youtube.com/embed/${videoId}?autoplay=1&rel=0&modestbranding=1`;
      } else if (url.includes("youtu.be/")) {
        videoId = url.split("youtu.be/")[1]?.split("?")[0];
        return `https://www.youtube.com/embed/${videoId}?autoplay=1&rel=0&modestbranding=1`;
      } else if (url.includes("youtube.com/embed/")) {
        return url;
      }

      // ✅ Handle Google Drive links
      if (url.includes("drive.google.com")) {
        if (url.includes("/file/d/")) {
          videoId = url.split("/file/d/")[1]?.split("/")[0];
        } else if (url.includes("id=")) {
          videoId = url.split("id=")[1]?.split("&")[0];
        }

        return videoId ? `https://drive.google.com/file/d/${videoId}/preview` : url;
      }

      return url;
    } catch (err) {
      console.error("Invalid video URL:", err);
      return url;
    }
  };
  const embedUrl = getEmbedLink(videoLink);

  if (playVideo) {
    return (
      <div className="fixed inset-0 z-50! flex items-center justify-center bg-black ">
        <button onClick={handleCloseBtn} className="absolute top-5 right-5 text-white text-3xl hover:text-gray-300 ">
          ✕
        </button>

        <div className=" w-[100%] 2xl:h-[100%] h-fit  aspect-video  rounded-lg overflow-hidden shadow-xl">
          <iframe width="100%" height="100%" src={embedUrl} title="YouTube video player" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerPolicy="strict-origin-when-cross-origin" allowFullScreen></iframe>
        </div>
      </div>
    );
  } else {
    return false;
  }
};

export default VideoModal;
