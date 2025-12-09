import { Skeleton } from "antd";
import { Link } from "react-router-dom";
import { ROUTES } from "../../Constants";
import { useAppSelector } from "../../Store/hooks";
import type { WorkshopItem } from "../../Types";
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
            <div className="flex justify-between items-center pb-5">
              <p className="text-lg font-semibold">My Workshop</p>
              {(MyWorkshop?.length || 0) >= 3 && (
                <Link to={ROUTES.COURSE.COURSE} className="text-base font-semibold bg-primary m-0 py-1 px-3 rounded text-white">
                  View All
                </Link>
              )}
            </div>
            <div className="grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">{workshopLoading ? [...Array(3)].map((_, i) => <Skeleton.Node key={i} active style={{ width: "100%", height: 300, borderRadius: 5 }} />) : MyWorkshop?.map((item, index) => <WorkshopCard key={index} data={item} />)}</div>
          </div>
          <hr className="w-[95%] mx-auto text-theme mt-2 mb-4 sm:my-8 opacity-20" />
        </>
      )}
      {AllWorkshop?.length !== 0 && (
        <>
          <div className="pb-5">
            <div className="flex justify-between items-center pb-5">
              <p className="text-lg font-semibold">Our Workshop</p>
              {(AllWorkshop?.length || 0) >= 3 && (
                <Link to={ROUTES.COURSE.COURSE} className="text-base font-semibold bg-primary m-0 py-1 px-3 rounded text-white">
                  View All
                </Link>
              )}
            </div>
            <div className="grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">{workshopLoading ? [...Array(3)].map((_, i) => <Skeleton.Node key={i} active style={{ width: "100%", height: 300, borderRadius: 5 }} />) : AllWorkshop?.map((item, index) => <WorkshopCard key={index} data={item} />)}</div>
          </div>
          <hr className="w-[95%] mx-auto text-theme mt-2 mb-4 sm:my-8 opacity-20" />
        </>
      )}
    </>
  );
};

export default Workshop;
