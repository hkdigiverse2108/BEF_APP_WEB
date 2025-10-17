import { useGetApiQuery } from "../../Api/CommonApi";
import { URL_KEYS } from "../../Constants";
import { useAppDispatch } from "../../Store/hooks";
import { setSubjectDrawer } from "../../Store/Slices/DrawerSlice";
import type { ClassItem } from "../../Types";
import { CardHeader } from "../../Components/Common/CardHeader";
import Loader from "../../Components/Common/Loader";
import SubjectDrawer from "../../Components/Home/SubjectDrawer";
import ClassCard from "../../Components/Classes/ClassesCard";

const Classes = () => {
  const dispatch = useAppDispatch();

  const { data: ClassesData, isLoading } = useGetApiQuery({
    url: `${URL_KEYS.CLASSES.ALL}?page=1&limit=10`,
  });

  const Classes: ClassItem[] | undefined = ClassesData?.data.classes_data;

  const HandleClasses = (item: ClassItem) => dispatch(setSubjectDrawer({ open: true, id: item?._id }));
  return (
    <>
      <div className="sub-container">
        {isLoading ? (
          <Loader />
        ) : (
          <>
            <div className="flex justify-between items-center py-2 md:py-5">
              <CardHeader title="Your Class" />
            </div>
            <hr className="text-card-border mb-5" />
            <div className="grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
              {Classes?.map((item, index) => (
                <ClassCard key={index} item={item} onClick={HandleClasses} />
              ))}
            </div>
             <div className="flex justify-between items-center py-2 md:py-5 mt-5">
              <CardHeader title="All Class" />
            </div>
            <hr className="text-card-border mb-5" />
            <div className="grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
              {Classes?.map((item, index) => (
                <ClassCard key={index} item={item} onClick={HandleClasses} />
              ))}
            </div>
          </>
        )}
      </div>
      <SubjectDrawer />
    </>
  );
};

export default Classes;
