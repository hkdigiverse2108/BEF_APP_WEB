import { useGetApiQuery } from "../../Api/CommonApi";
import { CardHeader } from "../../Components/Common/CardHeader";
import { URL_KEYS } from "../../Constants";
import MainLoader from "../../Components/Common/MainLoader";

const Illegality = () => {
  const { data: IllegalityData, isLoading } = useGetApiQuery({
    url: `${URL_KEYS.ILLEGALITY.ILLEGALITY}?type=course`,
  });
  return (
    <div className="sub-container pt-4">
      <CardHeader title="Illegality" />
      <span className="border-t border-card-border flex w-full my-4 " />
      {isLoading ? (
        <div className="flex justify-center items-center h-100">
          <MainLoader />
        </div>
      ) : (
        <div
          className="content"
          dangerouslySetInnerHTML={{
            __html: IllegalityData?.data?.illegality || "",
          }}
        />
      )}
    </div>
  );
};

export default Illegality;
