import { useGetApiQuery } from "../../Api/CommonApi";
import { CardHeader } from "../../Components/Common/CardHeader";
import { URL_KEYS } from "../../Constants";
import { Skeleton } from "antd";

const TermsConditions = () => {
  const { data: TermsConditionsData, isLoading } = useGetApiQuery({
    url: `${URL_KEYS.TERMS_CONDITION.TERMS_CONDITION}?type=course`,
  });
  return (
    <div className="sub-container pt-4">
      <CardHeader title="Terms & Conditions" />
      <span className="border-t border-card-border flex w-full my-4 " />
      {isLoading ? (
        <Skeleton active />
      ) : (
        <div
          className="content"
          dangerouslySetInnerHTML={{
            __html: TermsConditionsData?.data?.termsCondition || "",
          }}
        />
      )}
    </div>
  );
};

export default TermsConditions;
