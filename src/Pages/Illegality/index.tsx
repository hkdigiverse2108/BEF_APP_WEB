import { useGetApiQuery } from "../../Api/CommonApi";
import { CardHeader } from "../../Components/Common/CardHeader";
import { URL_KEYS } from "../../Constants";
import { Skeleton } from "antd";

const Legality = () => {
  const { data: legalityData, isLoading } = useGetApiQuery({
    url: `${URL_KEYS.LEGALITY.LEGALITY}?type=course`,
  });
  return (
    <div className="sub-container pt-4">
      <CardHeader title="legality" />
      <span className="border-t border-card-border flex w-full my-4 " />
      {isLoading ? (
         <Skeleton active />
      ) : (
        <div
          className="content"
          dangerouslySetInnerHTML={{
            __html: legalityData?.data?.illegality || "",
          }}
        />
      )}
    </div>
  );
};

export default Legality;
