import { ROUTES, URL_KEYS } from "../../Constants";
import YouTubeCard from "../YoutubeValues/YouTubeCard";
import SectionHeader from "../Common/SectionHeader";
import { useGetApiQuery } from "../../Api/CommonApi";
import { Skeleton } from "antd";

const YoutubeValues = () => {
  const { data, isLoading } = useGetApiQuery({ url: `${URL_KEYS.YOUTUBE_VISUALS.All}?page=1&limit=3` });
  const YoutubeValuesData = data?.data?.youtube_visuals_data;

  return (
    <div className="pb-5">
      <SectionHeader title="Youtube Values" link={ROUTES.YOUTUBE_VALUES.YOUTUBE_VALUES} showViewAll={(YoutubeValuesData?.length || 0) > 3} />
      <div className="grid gap-4 sm:gap-5 grid-cols-1 md:grid-cols-2 xl:grid-cols-3">{isLoading ? [...Array(3)].map((_, i) => <Skeleton.Node key={i} active style={{ width: "100%", height: 300, borderRadius: 12 }} />) : YoutubeValuesData?.map((video: { thumbnail: string; title: string ,link: string}, index: number) => <YouTubeCard key={index} videoId={video.link} title={video.title} thumbnail={video.thumbnail} />)}</div>
    </div>
  );
};

export default YoutubeValues;
