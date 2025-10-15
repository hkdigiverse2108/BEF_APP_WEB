import { useState } from "react";
import { useGetApiQuery } from "../../Api/CommonApi";
import { FormButton } from "../../Attribute/FormFields";
import { ImagePath, URL_KEYS } from "../../Constants";
import { useAppDispatch } from "../../Store/hooks";
import { setSubjectDrawer } from "../../Store/Slices/DrawerSlice";
import type { ClassItem } from "../../Types";
import Loader from "../Common/Loader";
import SubjectDrawer from "./SubjectDrawer";

const Classes = () => {
  const dispatch = useAppDispatch();
  const [activeClass, setActiveClass] = useState<string | null>(null);

  const { data: ClassesData, isLoading } = useGetApiQuery({
    url: `${URL_KEYS.CLASSES.ALL}?page=1&limit=10`,
  });

  const Classes: ClassItem[] | undefined = ClassesData?.data.classes_data;

  return (
    <>
      <div className="p-5 pt-0">
        {isLoading ? (
          <Loader />
        ) : (
          <>
            <div className="flex justify-between items-center pb-5">
              <p className="text-lg font-bold">Your Class</p>
              <p className="text-base font-semibold bg-primary m-0 py-1 px-3 rounded-lg text-white">View All</p>
            </div>
            <div className="grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
              {Classes?.map((item, index) => (
                <div
                  key={index}
                  className={`flex flex-col justify-between items-center gap-4 w-full h-full border border-box-border rounded-2xl p-4 shadow-md lg:flex-row bg-center bg-cover ${activeClass === item._id ? "text-white" : "text-black bg-input-box"}`}
                  style={{
                    backgroundImage: activeClass === item._id ? `url(${ImagePath}classic/Classic-bg.png)` : "none",
                  }}
                  onClick={() => {
                    dispatch(setSubjectDrawer({ open: true, id: item?._id }));
                    setActiveClass(item._id);
                  }}
                >
                  <img className="object-cover w-18 lg:w-25 rounded-xl border-2 border-white" src={`${ImagePath}classic/Classic1.png`} />
                  <div className="grid grid-cols-1 2xl:grid-cols-3 gap-1 lg:gap-3 w-full">
                    <div className="col-span-3">
                      <h3 className="text-xl 2xl:text-2xl text-center lg:text-left font-bold tracking-tight capitalize">{item?.name}</h3>
                      {item?.description && <p className="text-lg font-normal text-center lg:text-left line-clamp-1 capitalize">{item?.description}</p>}
                    </div>
                    {/* <div className="flex lg:items-center ">
                      <FormButton
                        text="explore now"
                        className={`custom-button light button button--mimas text-center w-full !p-3 !h-13 uppercase flex items-end-safe ${activeClass === item._id ? "light" : ""}`}
                        onClick={() => {
                          dispatch(setSubjectDrawer({ open: true, id: item?._id }));
                          setActiveClass(item._id);
                        }}
                      />
                    </div> */}
                  </div>
                </div>
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
