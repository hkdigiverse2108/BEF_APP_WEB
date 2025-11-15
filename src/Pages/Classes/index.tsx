import { Skeleton } from "antd";
import { useGetApiQuery } from "../../Api/CommonApi";
import ClassCard from "../../Components/Classes/ClassesCard";
import { CardHeader } from "../../Components/Common/CardHeader";
import SubjectDrawer from "../../Components/Home/SubjectDrawer";
import { URL_KEYS } from "../../Constants";
import { useAppDispatch } from "../../Store/hooks";
import { setSubjectDrawer } from "../../Store/Slices/DrawerSlice";
import type { ClassItem } from "../../Types";

const Classes = () => {
  const dispatch = useAppDispatch();

  const { data: ClassesData, isLoading } = useGetApiQuery({
    url: `${URL_KEYS.CLASSES.ALL}?page=1&limit=${100}`,
  });

  const Classes: ClassItem[] | undefined = ClassesData?.data.classes_data;

  const HandleClasses = (item: ClassItem) => dispatch(setSubjectDrawer({ open: true, id: item?._id }));
  return (
    <>
      <div className="sub-container">
        <div className="flex justify-between items-center py-2 md:py-5 mt-5">
          <CardHeader title="All Class" />
        </div>
        <hr className="text-card-border mb-5" />
        <div className="grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">{isLoading ? [...Array(6)]?.map((_, i) => <Skeleton.Node key={i} active style={{ width: "100%", height: 140, borderRadius: 15 }} />) : Classes?.map((item, index) => <ClassCard key={index} item={item} onClick={HandleClasses} />)}</div>
      </div>
      <SubjectDrawer />
    </>
  );
};

export default Classes;
