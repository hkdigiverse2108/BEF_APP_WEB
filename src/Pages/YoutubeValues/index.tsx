import { Skeleton } from "antd";
import { useGetApiQuery } from "../../Api/CommonApi";
import { CardHeader } from "../../Components/Common/CardHeader";
import YouTubeCard from "../../Components/YoutubeValues/YouTubeCard";
import { URL_KEYS } from "../../Constants";

const YoutubeValues = () => {
  const { data, isLoading } = useGetApiQuery({ url: `${URL_KEYS.YOUTUBE_VISUALS.All}?page=1&limit=3` });
  const YoutubeValuesData = data?.data?.youtube_visuals_data;
  return (
    <div className="sub-container">
      <div className="flex justify-between items-center py-2 md:py-5">
        <CardHeader title="Youtube Values" />
      </div>
      <hr className="text-card-border mb-5" />

      <div className="grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">{isLoading ? [...Array(3)].map((_, i) => <Skeleton.Node key={i} active style={{ width: "100%", height: 300, borderRadius: 15 }} />) : YoutubeValuesData?.map((video: { thumbnail: string; title: string; link: string }, index: number) => <YouTubeCard key={index} videoId={video.link} title={video.title} thumbnail={video.thumbnail} />)}</div>
    </div>
  );
};

export default YoutubeValues;
