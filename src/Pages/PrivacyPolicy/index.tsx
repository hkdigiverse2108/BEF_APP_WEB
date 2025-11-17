import { useGetApiQuery } from "../../Api/CommonApi";
import { CardHeader } from "../../Components/Common/CardHeader";
import { URL_KEYS } from "../../Constants";
import MainLoader from "../../Components/Common/MainLoader";

const PrivacyPolicy = () => {
  const { data: PrivacyPolicyData, isLoading } = useGetApiQuery({
    url: `${URL_KEYS.PRIVACY_POLICY.PRIVACY_POLICY}?type=course`,
  });
  return (
    <div className="sub-container pt-4">
      <CardHeader title="Privacy Policy" />
      <span className="border-t border-card-border flex w-full my-4 " />
      {isLoading ? (
        <div className="flex justify-center items-center h-100">
          <MainLoader />
        </div>
      ) : (
        <div
          className="content"
          dangerouslySetInnerHTML={{
            __html: PrivacyPolicyData?.data?.privacyPolicy || "",
          }}
        />
      )}
    </div>
  );
};

export default PrivacyPolicy;
