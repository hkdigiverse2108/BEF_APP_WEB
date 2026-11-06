import { Skeleton } from "antd";
import { useGetApiQuery } from "../../Api/CommonApi";
import { ROUTES, URL_KEYS } from "../../Constants";
import { useAppDispatch } from "../../Store/hooks";
import { setSubjectDrawer } from "../../Store/Slices/DrawerSlice";
import type { ClassItem } from "../../Types";
import ClassCard from "../Classes/ClassesCard";
import SectionHeader from "../Common/SectionHeader";
import SubjectDrawer from "./SubjectDrawer";

const Classes = () => {
  const dispatch = useAppDispatch();

  const { data: ClassesData, isLoading } = useGetApiQuery({
    url: `${URL_KEYS.CLASSES.ALL}?page=1&limit=12`,
  });

  const Classes: ClassItem[] | undefined = ClassesData?.data.classes_data;

  const HandleClasses = (item: ClassItem) =>
    dispatch(setSubjectDrawer({ open: true, id: item?._id }));

  return (
    <>
      {Classes?.length !== 0 && (
        <>
          <div className="pb-5">
            <SectionHeader
              title="My Classes"
              subtitle="Explore your courses, contests and learning resources."
              link={ROUTES.CLASSES.CLASSES}
              linkText="View all courses"
              showViewAll={(Classes?.length || 0) >= 3}
            />
            <div className="grid gap-5 sm:gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 !overflow-visible py-2">
              {isLoading
                ? [...Array(6)].map((_, i) => (
                    <Skeleton.Node
                      key={i}
                      active
                      style={{ width: "100%", height: 156, borderRadius: 28 }}
                      className="w-full !h-[156px] !rounded-[28px]"
                    />
                  ))
                : Classes?.slice(0, 9).map((item, index) => (
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
          <div className="mt-8 sm:mt-12 border-t border-border" />
        </>
      )}
    </>
  );
};

export default Classes;
