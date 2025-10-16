import { SearchOutlined } from "@ant-design/icons";
import { Empty, Input, Space } from "antd";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useGetApiQuery } from "../../Api/CommonApi";
import { FormSelect } from "../../Attribute/FormFields";
import Loader from "../../Components/Common/Loader";
import ContestDetailCard from "../../Components/Contest/ContestDetailCard";
import HeroBanner from "../../Components/Home/HeroBanner";
import SubtopicDrawer from "../../Components/Home/SubtopicDrawer";
import { ROUTES, STORAGE_KEYS, URL_KEYS } from "../../Constants";
import type { ContestApiResponse, ContestItem } from "../../Types";
import { Storage } from "../../Utils";

const Contest = () => {
  const existingLsQaData = JSON.parse(Storage.getItem(STORAGE_KEYS.CONTEST_QA) || "{}");
  const shouldSkip = !existingLsQaData?.classesId || !existingLsQaData?.subjectId;

  const [searchInput, setSearchInput] = useState("");
  const [debounceSearch, setDebounceSearch] = useState("");

  const navigate = useNavigate();
  const location = useLocation();

  const subjectId = location.state || "";

  useEffect(() => {
    const delay = setTimeout(() => {
      setDebounceSearch(searchInput.trim());
    }, 500);

    return () => clearTimeout(delay);
  }, [searchInput]);

  const { data: ContestData, isLoading } = useGetApiQuery<ContestApiResponse>(
    {
      url: `${URL_KEYS.CONTEST.ALL}?page=1&limit=100&subjectId=${subjectId}${debounceSearch && `&search=${debounceSearch}`}`,
    },
    {
      skip: shouldSkip,
    }
  );

  const Contest: ContestItem[] = ContestData?.data.contest_data;

  useEffect(() => {
    if (shouldSkip) {
      Storage.removeItem(STORAGE_KEYS.CONTEST_QA);
      navigate(ROUTES.HOME);
    }
  }, []);

  return (
    <div className="sub-container contestPage">
      <HeroBanner />
      <div className="flex justify-between items-center h-fit rounded-md border border-theme/50">
        <span className="h-fit w-full ">
          <Space.Compact size="large" className="w-full">
            <Input addonBefore={<SearchOutlined className="!text-theme"/>} value={searchInput} onChange={(e) => setSearchInput(e.target.value)} placeholder="Search By Contest" className="!w-full" />
          </Space.Compact>
        </span>
        <span className="question-section !p-0 !h-fit">
          <FormSelect name="Filter By" placeholder="Filter By" options={[{ label: "1", value: "one" }]} className="!mb-0" />
        </span>
      </div>
      <hr className="text-theme my-8 opacity-20" />
      <div className="mb-12 flex flex-col gap-8">
        {isLoading ? (
          <Loader />
        ) : (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-5">
              {Contest?.length > 0 ? (
                Contest?.map((item, i) => <ContestDetailCard key={i} contestData={item} />)
              ) : (
                <div className="flex items-center justify-center w-full col-span-4">
                  <Empty />
                </div>
              )}
            </div>
          </>
        )}
      </div>

      <SubtopicDrawer />
    </div>
  );
};

export default Contest;
