import { useGetApiQuery } from "../../Api/CommonApi";
import { URL_KEYS } from "../../Constants";
import { useAppDispatch } from "../../Store/hooks";
import { setSubjectDrawer } from "../../Store/Slices/DrawerSlice";
import type { ClassItem } from "../../Types";
import { CardHeader } from "../../Components/Common/CardHeader";
import Loader from "../../Components/Common/Loader";
import SubjectDrawer from "../../Components/Home/SubjectDrawer";
import ClassCard from "../../Components/Classes/ClassesCard";
import { FormButton } from "../../Attribute/FormFields";
import { useState } from "react";

const Classes = () => {
  const dispatch = useAppDispatch();
  const [tabOneLimit, setTabOneLimit] = useState(3);

  const { data: ClassesData, isLoading } = useGetApiQuery({
    url: `${URL_KEYS.CLASSES.ALL}?page=1&limit=${tabOneLimit}`,
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
            {(Classes?.length || 0) < tabOneLimit ? (
              ""
            ) : (
              <div className="w-full flex justify-center pt-5">
                <FormButton text="View More" className="custom-button button button--mimas text-center w-fit !p-4 !px-8 !h-12 uppercase flex items-end-safe" onClick={() => setTabOneLimit(tabOneLimit + 6)} />
              </div>
            )}
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
