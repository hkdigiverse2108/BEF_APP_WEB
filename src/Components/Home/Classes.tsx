import { Link } from "react-router-dom";
import { useGetApiQuery } from "../../Api/CommonApi";
import { ROUTES, URL_KEYS } from "../../Constants";
import { useAppDispatch } from "../../Store/hooks";
import { setSubjectDrawer } from "../../Store/Slices/DrawerSlice";
import type { ClassItem } from "../../Types";
import ClassCard from "../Classes/ClassesCard";
import Loader from "../Common/Loader";
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
      <div className="pb-5">
        {isLoading ? (
          <Loader />
        ) : (
          <>
            <div className="flex justify-between items-center pb-5">
              <p className="text-lg font-bold">Your Class</p>
              <Link to={ROUTES.CLASSES.CLASSES} className="text-base font-semibold bg-primary m-0 py-1 px-3 rounded-lg text-white">
                View All
              </Link>
            </div>
            <div className="grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
              {Classes?.slice(0, 3).map((item, index) => (
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
