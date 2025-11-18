import { useGetApiQuery } from "../../Api/CommonApi";
import { CardHeader } from "../../Components/Common/CardHeader";
import { URL_KEYS } from "../../Constants";
import { Skeleton } from "antd";

const AboutUs = () => {
  const { data: AboutUsData, isLoading } = useGetApiQuery({
    url: `${URL_KEYS.ABOUT_US.ABOUT_US}?type=course`,
  });
  return (
    <div className="sub-container pt-4">
      <CardHeader title="About Us" />
      <span className="border-t border-card-border flex w-full my-4 " />
      {isLoading ? (
        <Skeleton active />
      ) : (
        <div
          className="content"
          dangerouslySetInnerHTML={{ __html: AboutUsData?.data?.aboutUs || "" }}
        />
      )}
    </div>
  );
};

export default AboutUs;
