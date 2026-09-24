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
    url: `${URL_KEYS.CLASSES.ALL}?page=1&limit=10`,
  });

  const Classes: ClassItem[] | undefined = ClassesData?.data.classes_data;

  const HandleClasses = (item: ClassItem) => dispatch(setSubjectDrawer({ open: true, id: item?._id }));
  return (
    <>
      {Classes?.length !== 0 && (
        <>
          <div className="pb-5">
            <SectionHeader title="My Class" link={ROUTES.CLASSES.CLASSES} showViewAll={(Classes?.length || 0) >= 3} />
            <div className="grid gap-4 sm:gap-5 grid-cols-1 md:grid-cols-2 xl:grid-cols-3">{isLoading ? [...Array(3)].map((_, i) => <Skeleton.Node key={i} active style={{ width: "100%", height: 140, borderRadius: 12 }} />) : Classes?.slice(0, 3).map((item, index) => <ClassCard key={index} item={item} onClick={HandleClasses} />)}</div>
          </div>
          <SubjectDrawer />
          <div className="mt-8 sm:mt-12 border-t border-border" />
        </>
      )}
    </>
  );
};

export default Classes;
