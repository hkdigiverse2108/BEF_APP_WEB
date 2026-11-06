import { Skeleton } from "antd";
import { useGetApiQuery } from "../../Api/CommonApi";
import ClassCard from "../../Components/Classes/ClassesCard";
import { CardHeader } from "../../Components/Common/CardHeader";
import SubjectDrawer from "../../Components/Home/SubjectDrawer";
import { ImagePath, URL_KEYS } from "../../Constants";
import { useAppDispatch } from "../../Store/hooks";
import { setSubjectDrawer } from "../../Store/Slices/DrawerSlice";
import type { ClassItem } from "../../Types";

const Classes = () => {
  const dispatch = useAppDispatch();

  const { data: ClassesData, isLoading } = useGetApiQuery({
    url: `${URL_KEYS.CLASSES.ALL}?page=1&limit=${100}`,
  });

  const Classes: ClassItem[] | undefined = ClassesData?.data.classes_data;

  const HandleClasses = (item: ClassItem) =>
    dispatch(setSubjectDrawer({ open: true, id: item?._id }));

  return (
    <>
      <div className="sub-container pt-3 md:pt-5">
        {/* Top Battle Banner */}
        <div className="mb-4 sm:mb-6 overflow-hidden rounded-2xl border border-border bg-card shadow-sm">
          <img
            src={`${ImagePath}banner/achiwon-battle-banner.jpg`}
            alt="Achiwon Battle: Don't Just Practise. BATTLE!"
            className="w-full h-auto object-cover"
          />
        </div>

        <div className="flex justify-between items-center py-2 md:py-3">
          <CardHeader title="My Classes" />
        </div>
        <hr className="text-card-border mb-4" />
        <div className="grid gap-5 sm:gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 !overflow-visible py-2">
          {isLoading
            ? [...Array(6)]?.map((_, i) => (
                <Skeleton.Node
                  key={i}
                  active
                  style={{ width: "100%", height: 156, borderRadius: 28 }}
                  className="w-full !h-[156px] !rounded-[28px]"
                />
              ))
            : Classes?.map((item, index) => (
                <ClassCard
                  key={index}
                  index={index}
                  item={item}
                  onClick={HandleClasses}
                />
              ))}
        </div>
      </div>
      <SubjectDrawer />
    </>
  );
};

export default Classes;
