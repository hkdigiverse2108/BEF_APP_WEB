import { SearchOutlined } from "@ant-design/icons";
import { Empty, Input, Pagination, Skeleton, Space } from "antd";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useGetApiQuery } from "../../Api/CommonApi";
import ContestDetailCard from "../../Components/Contest/ContestDetailCard";
import HeroBanner from "../../Components/Home/HeroBanner";
import SubtopicDrawer from "../../Components/Home/SubtopicDrawer";
import { ROUTES, STORAGE_KEYS, URL_KEYS } from "../../Constants";
import { useAppDispatch, useAppSelector } from "../../Store/hooks";
import { setContestFilterDrawer } from "../../Store/Slices/DrawerSlice";
import type { ContestItem } from "../../Types";
import { Storage } from "../../Utils";
import useBasicFilterHelper from "../../Utils/Hook/useBasicTableFilterHelper";
import ContestFilterDrawer from "./ContestFilterDrawer";

const Contest = () => {
  const existingLsQaData = JSON.parse(Storage.getItem(STORAGE_KEYS.CONTEST_QA) || "{}");
  const shouldSkip = !existingLsQaData?.classesId || !existingLsQaData?.subjectId;

  const { pageNumber, pageSize, params, handleSetSearch, handlePaginationChange } = useBasicFilterHelper({
    initialParams: { page: 1, limit: 8 },
    debounceDelay: 300,
  });

  const { isContestFilters } = useAppSelector((state) => state.filter);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (shouldSkip) {
      Storage.removeItem(STORAGE_KEYS.CONTEST_QA);
      navigate(ROUTES.HOME);
    }
  }, []);

  const queryParams = new URLSearchParams({
    page: params.page,
    limit: params.limit,
    contestFilter: "upcoming,ongoing",
    classesFilter: existingLsQaData?.classesId || "",
    ...(params.search && { search: params.search }),
  });

  if (isContestFilters.spots?.min !== undefined) queryParams.append("sportFilter[min]", String(isContestFilters.spots?.min));
  if (isContestFilters.spots?.max !== undefined) queryParams.append("sportFilter[max]", String(isContestFilters.spots?.max));
  if (isContestFilters.entry?.min !== undefined) queryParams.append("feesFilter[min]", String(isContestFilters.entry?.min));
  if (isContestFilters.entry?.max !== undefined) queryParams.append("feesFilter[max]", String(isContestFilters.entry?.max));
  if (isContestFilters.prizePool?.min !== undefined) queryParams.append("pricePoolFilter[min]", String(isContestFilters.prizePool?.min));
  if (isContestFilters.prizePool?.max !== undefined) queryParams.append("pricePoolFilter[max]", String(isContestFilters.prizePool?.max));
  if (isContestFilters.contestType !== "") queryParams.append("contestTypeFilter", isContestFilters.contestType);

  const { data: ContestData, isLoading } = useGetApiQuery({ url: `${URL_KEYS.CONTEST.ALL}?${queryParams.toString()}` }, { skip: false });

  const Contest: ContestItem[] = ContestData?.data?.contest_data || [];

  return (
    <div className="sub-container contestPage">
      <HeroBanner />

      <div className="flex justify-between items-center h-fit rounded-md border border-theme/50">
        <span className="h-fit w-full">
          <Space.Compact size="large" className="w-full">
            <Input addonBefore={<SearchOutlined className="!text-theme" />} value={params.search} onChange={(e) => handleSetSearch(e.target.value)} placeholder="Search By Contest" className="!w-full" />
          </Space.Compact>
        </span>
        <span onClick={() => dispatch(setContestFilterDrawer({ open: true }))} className="bg-input-box font-semibold text-sm p-2 px-4 rounded w-24 flex flex-col cursor-pointer">
          Filter By
        </span>
      </div>

      <hr className="text-theme my-8 opacity-20" />

      <div className="mb-12 flex flex-col gap-8">
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-5">
          {isLoading ? (
            [...Array(4)]?.map((_, i) => <Skeleton.Node key={i} active style={{ width: "100%", height: 300, borderRadius: 15 }} />)
          ) : Contest?.length > 0 ? (
            Contest?.map((item, i) => <ContestDetailCard key={i} contestData={item} />)
          ) : (
            <div className="flex items-center justify-center w-full col-span-4">
              <Empty />
            </div>
          )}
        </div>

        {Contest?.length > 0 && (
          <div className="w-full mt-5">
            <Pagination align="end" current={pageNumber} pageSize={pageSize} total={ContestData?.data?.totalData || 0} showSizeChanger onChange={handlePaginationChange} className="custom-pagination" />
          </div>
        )}
      </div>

      <ContestFilterDrawer />
      <SubtopicDrawer />
    </div>
  );
};

export default Contest;
