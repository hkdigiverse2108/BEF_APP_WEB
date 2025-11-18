import { Skeleton } from "antd";
import { Link } from "react-router-dom";
import { useGetApiQuery } from "../../Api/CommonApi";
import { ROUTES, URL_KEYS } from "../../Constants";
import { useAppDispatch } from "../../Store/hooks";
import { setSubjectDrawer } from "../../Store/Slices/DrawerSlice";
import type { ClassItem } from "../../Types";
import ClassCard from "../Classes/ClassesCard";
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
            <div className="flex justify-between items-center pb-5">
              <p className="text-lg font-semibold ">Your Class</p>
              {(Classes?.length || 0) > 3 && (
                <Link to={ROUTES.CLASSES.CLASSES} className="text-base font-semibold bg-primary m-0 py-1 px-3 rounded text-white">
                  View All
                </Link>
              )}
            </div>
            <div className="grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">{isLoading ? [...Array(3)].map((_, i) => <Skeleton.Node key={i} active style={{ width: "100%", height: 140, borderRadius: 5 }} />) : Classes?.slice(0, 3).map((item, index) => <ClassCard key={index} item={item} onClick={HandleClasses} />)}</div>
          </div>
          <SubjectDrawer />
        </>
      )}
    </>
  );
};

export default Classes;
