import { Skeleton } from "antd";
import { ROUTES } from "../../Constants";
import { useAppSelector } from "../../Store/hooks";
import type { WorkshopItem } from "../../Types";
import SectionHeader from "../Common/SectionHeader";
import WorkshopCard from "../Workshop/WorkshopCard";

const Workshop = () => {
  const workshop: WorkshopItem[] = useAppSelector((state) => state.workshops.AllWorkshop);
  const workshopLoading = useAppSelector((state) => state.workshops.workshopLoading);
  const MyWorkshop = workshop?.filter((item: WorkshopItem) => item?.isUnlocked === true);
  const AllWorkshop = workshop?.filter((item: WorkshopItem) => item?.isUnlocked === false);

  return (
    <>
      {MyWorkshop?.length !== 0 && (
        <>
          <div className="pb-5">
            <SectionHeader title="My Workshop" link={ROUTES.COURSE.COURSE} showViewAll={(MyWorkshop?.length || 0) >= 3} />
            <div className="grid gap-4 sm:gap-5 grid-cols-1 md:grid-cols-2 xl:grid-cols-3">{workshopLoading ? [...Array(3)].map((_, i) => <Skeleton.Node key={i} active style={{ width: "100%", height: 300, borderRadius: 12 }} />) : MyWorkshop?.map((item, index) => <WorkshopCard key={index} data={item} />)}</div>
          </div>
          <div className="mt-8 sm:mt-12 border-t border-border" />
        </>
      )}
      {AllWorkshop?.length !== 0 && (
        <>
          <div className="pb-5">
            <SectionHeader title="Our Workshop" link={ROUTES.COURSE.COURSE} showViewAll={(AllWorkshop?.length || 0) >= 3} />
            <div className="grid gap-4 sm:gap-5 grid-cols-1 md:grid-cols-2 xl:grid-cols-3">{workshopLoading ? [...Array(3)].map((_, i) => <Skeleton.Node key={i} active style={{ width: "100%", height: 300, borderRadius: 12 }} />) : AllWorkshop?.map((item, index) => <WorkshopCard key={index} data={item} />)}</div>
          </div>
          <div className="mt-8 sm:mt-12 border-t border-border" />
        </>
      )}
    </>
  );
};

export default Workshop;
