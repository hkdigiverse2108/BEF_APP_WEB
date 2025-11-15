import { Drawer, Spin } from "antd";
import { useGetApiQuery } from "../../Api/CommonApi";
import { FormButton } from "../../Attribute/FormFields";
import { URL_KEYS } from "../../Constants";
import { EntryData, PrizePoolData, SpotsData } from "../../Data";
import { setContestFilterDrawer } from "../../Store/Slices/DrawerSlice";
import { setContestFilters } from "../../Store/Slices/FilterSlice";
import { useAppDispatch, useAppSelector } from "../../Store/hooks";
import type { ContestFilters, RangeOption } from "../../Types";
import { useState } from "react";

const ContestFilterDrawer = () => {
  const dispatch = useAppDispatch();
  const { isContestFilterDrawer } = useAppSelector((state) => state.drawer);
  const { isContestFilters } = useAppSelector((state) => state.filter);
  const [localFilters, setLocalFilters] = useState<ContestFilters>(isContestFilters);

  const updateFilter = <K extends keyof ContestFilters>(key: K, value: ContestFilters[K]) => {
    setLocalFilters((prev) => ({ ...prev, [key]: value }));
  };

  const handleClearFilter = (key: keyof ContestFilters) => {
  setLocalFilters(prev => ({
    ...prev,
    [key]: key === "contestType" ? "" : null,
  }));
};


  const { data: ContestTypeData, isLoading } = useGetApiQuery({ url: URL_KEYS.CONTEST.TYPE.TYPE }, { skip: false });

  const renderRangeSection = (title: string, key: keyof ContestFilters, data: RangeOption[], selected: RangeOption | null) => (
    <div>
      <div className="flex justify-between items-end">
        <h3 className="text-lg font-semibold">{title}</h3>
        <span onClick={() => handleClearFilter(key)} className="text-sm font-normal underline">Clear</span>
      </div>
      <ul className="flex flex-wrap gap-3 pt-3">
        {data?.map((item, i) => (
          <li key={i} onClick={() => updateFilter(key, item)} className={`border py-2 px-3 w-fit rounded-full cursor-pointer transition-colors duration-200 text-theme bg-input-box ${selected?.label === item.label ? "border-primary !text-primary !bg-bg-light" : "border-box-border hover:border-theme"}`}>
            <p className="font-normal text-base">{item.label}</p>
          </li>
        ))}
      </ul>
    </div>
  );

  const renderStringSection = (title: string, key: keyof ContestFilters, data: { _id: string; name: string }[] = [], selected: string) => (
    <div className="flex flex-col w-full">
      <div className="flex justify-between items-end">
        <h3 className="text-lg font-semibold">{title}</h3>
        <span onClick={() => handleClearFilter(key)} className="text-sm font-normal underline">Clear</span>
      </div>
      {isLoading ? (
        <div className="flex items-center justify-center w-full col-span-4">
          <Spin />
        </div>
      ) : (
        <ul className="flex flex-wrap gap-3 pt-3">
          {data?.map((item, i) => (
            <li key={i} onClick={() => updateFilter(key, item.name)} className={`border py-2 px-3 w-fit rounded-full cursor-pointer transition-colors duration-200 text-theme bg-input-box ${selected === item.name ? "border-primary !text-primary !bg-bg-light" : "border-box-border hover:border-theme"}`}>
              <p className="font-normal text-base">{item.name}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );

  const handleApply = () => {
    dispatch(setContestFilters(localFilters));
    dispatch(setContestFilterDrawer({ open: false }));
  };

  return (
    <Drawer title="Contest Filter" placement="right" size="default" onClose={() => dispatch(setContestFilterDrawer({ open: false }))} open={isContestFilterDrawer.open} className="text-theme">
      <div className="flex flex-col items-start">
        {renderRangeSection("Entry", "entry", EntryData, localFilters.entry)}
        <hr className="w-full mx-auto text-theme my-4 opacity-20" />

        {renderRangeSection("Spots", "spots", SpotsData, localFilters.spots)}
        <hr className="w-full mx-auto text-theme my-4 opacity-20" />

        {renderRangeSection("Prize Pool", "prizePool", PrizePoolData, localFilters.prizePool)}
        <hr className="w-full mx-auto text-theme my-4 opacity-20" />

        {renderStringSection("Contest Type", "contestType", ContestTypeData?.data || [], localFilters.contestType)}

        <div className="flex gap-3 w-full mt-10">
          <FormButton htmlType="button" text="Apply" onClick={handleApply} className="custom-button button button--mimas w-full !h-auto" />
        </div>
      </div>
    </Drawer>
  );
};

export default ContestFilterDrawer;
