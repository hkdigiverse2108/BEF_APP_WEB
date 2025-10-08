import { CardHeader } from "../../Components/Common/CardHeader";
import { useGetApiQuery } from "../../Api/CommonApi";
import { URL_KEYS } from "../../Constants";
import HeroBanner from "../../Components/Home/HeroBanner";
import ContestDetailCatd from "../../Components/Contest/ContestDetailCatd";
import { Input, Space } from "antd";
import { SearchOutlined } from "@ant-design/icons";
import { FormSelect } from "../../Attribute/FormFields";
import { useLocation } from "react-router-dom";
import SubtopicDrawer from "../../Components/Home/SubtopicDrawer";

const Contest = () => {
  const location = useLocation();
  const subjectId = location.state || "";
  // console.log("id: ", subjectId);
  const { data: ContestData } = useGetApiQuery({
    url: `${URL_KEYS.CONTEST.ALL}?page=1&limit=10&subjectId=${subjectId}`,
  });

  const Contest = ContestData?.data.contest_data;

  // console.log(Contest);

  return (
    <div className="sub-container contestPage">
      <HeroBanner />
      <div className="flex justify-between h-fit rounded-md border border-input-box  ">
        <span className="h-fit">
          {" "}
          <Space.Compact size="large">
            <Input
              addonBefore={<SearchOutlined />}
              placeholder="Search By Contest"
            />
          </Space.Compact>
        </span>
        <span className=" !p-0 !h-fit">
          <FormSelect
            name="Filter By"
            placeholder="Filter By"
            options={[{ label: "1", value: "one" }]}
            className="!mb-0"
          />
        </span>
      </div>
      <div className="my-12 flex flex-col gap-8">
        <CardHeader title="Trending Now" />
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-5">
          {Contest?.map((item, i) => (
            <ContestDetailCatd key={i} contest={item} />
          ))}
        </div>
      </div>

      <SubtopicDrawer />
    </div>
  );
};

export default Contest;
