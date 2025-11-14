import { Link } from "react-router-dom";
import { ROUTES, URL_KEYS } from "../../Constants";
import YouTubeCard from "../YoutubeValues/YouTubeCard";
import { useGetApiQuery } from "../../Api/CommonApi";
import { Skeleton } from "antd";

const YoutubeValues = () => {
  const { data, isLoading } = useGetApiQuery({ url: `${URL_KEYS.YOUTUBE_VISUALS.All}?page=1&limit=3` });
  const YoutubeValuesData = data?.data?.youtube_visuals_data;

  return (
    <div className="pb-5">
      <div className="flex justify-between items-center pb-5">
        <p className="text-lg font-bold">Youtube Values</p>
        <Link to={ROUTES.YOUTUBE_VALUES.YOUTUBE_VALUES} className="text-base font-semibold bg-primary m-0 py-1 px-3 rounded-lg text-white">
          View All
        </Link>
      </div>
      <div className="grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">{isLoading ? [...Array(3)].map((_, i) => <Skeleton.Node key={i} active style={{ width: "100%", height: 300, borderRadius: 15 }} />) : YoutubeValuesData?.map((video: { thumbnail: string; title: string ,link: string}, index: number) => <YouTubeCard key={index} videoId={video.link} title={video.title} thumbnail={video.thumbnail} />)}</div>
    </div>
  );
};

export default YoutubeValues;
