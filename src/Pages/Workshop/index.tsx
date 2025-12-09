import { FormButton } from "../../Attribute/FormFields";
import { Empty, Skeleton } from "antd";
import { useEffect, useState } from "react";
import type { WorkshopItem } from "../../Types";
import { CardHeader } from "../../Components/Common/CardHeader";
import WorkshopCard from "../../Components/Workshop/WorkshopCard";
import { useAppSelector } from "../../Store/hooks";
import { useNavigate } from "react-router-dom";
import { ROUTES } from "../../Constants";
import MainLoader from "../../Components/Common/MainLoader";

const Workshop = () => {
  const navigate = useNavigate();

  const [myWorkshopLimit, setMyWorkshopLimit] = useState(6);

  const workshop: WorkshopItem[] = useAppSelector(
    (state) => state.workshops.AllWorkshop
  );
  const workshopLoading = useAppSelector(
    (state) => state.workshops.workshopLoading
  );

  const id = workshop[0]?._id ?? "";
  if (!workshopLoading && workshop.length === 1) {
    navigate(ROUTES.WORKSHOP.DETAILS.replace(":id", id), {
      replace: true,
    });
  }

  //  Redirect safely
  useEffect(() => {
    if (!workshopLoading && workshop.length === 1) {
      navigate(ROUTES.WORKSHOP.DETAILS.replace(":id", id), {
        replace: true,
      });
    }
  }, [workshopLoading, workshop]);

  if (workshopLoading) return <MainLoader />;
  if (!workshopLoading && workshop.length === 0)
    return (
      <div className="w-full h-screen  flex justify-center items-center">
        <Empty />
      </div>
    );

  const MyWorkshop = workshop?.filter(
    (item: WorkshopItem) => item?.isUnlocked === true
  );
  const AllWorkshop = workshop?.filter(
    (item: WorkshopItem) => item?.isUnlocked === false
  );

  return (
    <div className="sub-container">
      {MyWorkshop?.length !== 0 && (
        <>
          <div className="flex justify-between items-center py-2 md:py-5">
            <CardHeader title="My Workshop" />
          </div>
          <hr className="text-card-border mb-5" />
          <div className="grid gap-5 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
            {workshopLoading
              ? [...Array(3)]?.map((_, i) => (
                  <Skeleton.Node
                    key={i}
                    active
                    style={{ width: "100%", height: 300, borderRadius: 15 }}
                  />
                ))
              : MyWorkshop?.filter(
                  (_: WorkshopItem, i: number) => i + 1 <= myWorkshopLimit
                )?.map((item: WorkshopItem, index: number) => (
                  <WorkshopCard key={index} data={item} />
                ))}
          </div>
          {MyWorkshop?.length >= myWorkshopLimit && (
            <div className="w-full flex justify-center pt-10">
              <FormButton
                loading={workshopLoading}
                text="View More"
                className="custom-button-light button button--mimas text-center w-fit p-4! px-8! h-12! uppercase flex items-end-safe"
                onClick={() => setMyWorkshopLimit(myWorkshopLimit + 6)}
              />
            </div>
          )}
        </>
      )}
      {workshop?.length !== 0 && (
        <>
          <div className="flex justify-between items-center py-2 md:py-5">
            <CardHeader title="All Workshop" />
          </div>
          <hr className="text-card-border mb-5" />
          <div className="grid gap-5 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
            {workshopLoading
              ? [...Array(3)].map((_, i) => (
                  <Skeleton.Node
                    key={i}
                    active
                    style={{ width: "100%", height: 300, borderRadius: 15 }}
                  />
                ))
              : AllWorkshop?.map((item: WorkshopItem, index: number) => (
                  <WorkshopCard key={index} data={item} />
                ))}
          </div>
        </>
      )}
    </div>
  );
};
export default Workshop;
