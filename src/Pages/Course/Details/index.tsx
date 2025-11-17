import { Tab, Tabs } from "@mui/material";
import { useState, type SyntheticEvent } from "react";
import { useParams } from "react-router-dom";
import { useGetApiQuery } from "../../../Api/CommonApi";
import { FormButton } from "../../../Attribute/FormFields";
import ShareModal from "../../../Components/Common/ShareModal";
import DetailsAboutTab from "../../../Components/WorkshopCourseCommon/DetailsAboutTab";
import CourseFaqsTab from "../../../Components/Course/Details/CourseFaqsTab";
import CourseLecturesTab from "../../../Components/Course/Details/CourseLecturesTab";
import CourseModuleTab from "../../../Components/Course/Details/CourseModuleTab";
import { ImagePath, URL_KEYS } from "../../../Constants";
import type { CourseDetailsApiResponse, ModuleType } from "../../../Types";
import Loader1 from "../../../Components/Common/Loader1";
import { setCoursePurchaseDrawer } from "../../../Store/Slices/DrawerSlice";
import { useAppDispatch } from "../../../Store/hooks";
import CoursePurchaseDrawer from "../../../Components/Course/CoursePurchaseDrawer";

const TabsName = [
  { value: "about", label: "About" },
  { value: "lectures", label: "Lectures" },
  { value: "module", label: "Module" },
  { value: "faqs", label: "FAQS" },
];

const CourseDetails = () => {
  const [tabIndex, setTabIndex] = useState("about");
  const [imageLoaded, setImageLoaded] = useState(false);

  const dispatch = useAppDispatch();

  const { id }: { id?: string } = useParams();

  const {
    data: courseData,
    isLoading: courseLoading,
    refetch,
  } = useGetApiQuery<CourseDetailsApiResponse>({
    url: `${URL_KEYS.COURSE.ID}${id}`,
  });
  const CourseDetailsData = courseData?.data;

  const { data: modulesData, isLoading: isModuleLoading } = useGetApiQuery(
    { url: `${URL_KEYS.MODULE.ALL}?courseFilter=${CourseDetailsData?._id}` },
    { skip: !CourseDetailsData?._id }
  );
  const Modules = modulesData?.data?.module_data || [];

  const handleChange = (_: SyntheticEvent, newValue: string) => {
    setTabIndex(newValue);
  };

  const totalLecture = Modules?.reduce(
    (sum: number, module: ModuleType) => sum + Number(module.totalLecture) || 0,
    0
  );

  const totalTest = Modules?.reduce(
    (sum: number, module: ModuleType) => sum + module?.totalTest,
    0
  );

  if (courseLoading) return <Loader1 />;

  return (
    <div className="sub-container space-y-9 pt-9 bg-white rounded-xl">
      <section className="group space-y-6 rounded-md relative">
        <div className="sm:hidden absolute top-0 w-full flex gap-5 justify-end px-2 pt-2">
          <ShareModal />
        </div>
        <figure>
          <img
            src={CourseDetailsData?.image}
            alt={CourseDetailsData?.title}
            onLoad={() => setImageLoaded(true)}
            className={`w-full h-full rounded-lg  transition-opacity duration-300 ${
              imageLoaded ? "opacity-100" : "opacity-0"
            }`}
          />
        </figure>
      </section>
      <section>
        <div className="space-y-6 font-semibold">
          <section className=" max-sm:text-sm  flex justify-between  gap-3">
            <div className="flex  gap-2 items-center">
              <div className="bg-white border border-gray-300  w-fit h-fit px-3 py-1  rounded-md ">
                <span>{CourseDetailsData?.language}</span>
              </div>
              <div className="uppercase max-sm:text-xs text-primary font-bold ">
                {CourseDetailsData?.syllabus?.subjectLevel}
              </div>
            </div>
          </section>
          <section className="flex max-sm:flex-col gap-4 justify-between">
            <h1 className="capitalize  sm:text-2xl">
              {CourseDetailsData?.title}
            </h1>
            <span className="max-sm:hidden">
              <ShareModal />
            </span>
          </section>
          <span className="border-b border-gray-300 flex w-full h-0.5" />
          <section className="flex flex-col lg:flex-row gap-5">
            <div className="bg-input-box  transition-all px-5 py-3 rounded w-full flex flex-col sm:flex-row sm:items-center sm:gap-5">
              <div className="flex items-center  gap-3 mb-3 sm:mb-0">
                <figure className="rounded-full bg-primary/10  w-13 h-13 sm:w-15 sm:h-15 flex items-center justify-center  ">
                  <img
                    src={`${ImagePath}workshop/users.png`}
                    alt="Users"
                    className="w-8 h-8  sm:w-10 sm:h-10"
                  />
                </figure>
                <p className=" sm:hidden font-semibold ">Module</p>
              </div>
              <div className="space-y-2 w-full ">
                <p className="max-sm:hidden font-semibold ">Module</p>
                <ul className="w-full font-normal text-sm  grid grid-cols-1  sm:grid-cols-2 sm:flex-row gap-2">
                  {Modules?.map((module: { name: string }, i: number) => (
                    <li key={i}>
                      {i + 1}. {module.name}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            <div className="bg-input-box  transition-all px-5 py-3 rounded w-full flex flex-col sm:flex-row sm:items-center sm:gap-5">
              {/* Image + Title (top row on mobile) */}
              <div className="flex items-center gap-3 sm:mb-0">
                <figure className="rounded-full bg-primary/10 p-3 sm:p-4 h-fit w-fit">
                  <img
                    src={`${ImagePath}workshop/wallet.png`}
                    alt="Users"
                    className="w-8 sm:w-10 h-fit"
                  />
                </figure>
                <div className="space-y-2 w-full font-semibold ">
                  <p>{CourseDetailsData?.courseMoneyBack}</p>
                </div>
              </div>
            </div>
          </section>
        </div>
        <div>
          <Tabs
            value={tabIndex}
            onChange={handleChange}
            textColor="primary"
            orientation="horizontal"
            variant="scrollable"
            // allowScrollButtonsMobile
            aria-label="primary tabs example"
            className="about-tabs  w-full! flex! justify-between! sm:gap-4! border-b border-gray-300 mt-6 "
            sx={{
              "& .MuiTabs-flexContainer": {
                justifyContent: "space-between",
              },
            }}
          >
            {TabsName?.map(({ value, label }, index) => {
              return <Tab key={index} value={value} label={label} />;
            })}
          </Tabs>
        </div>
        <div className="mt-6">
          {tabIndex === "about" && (
            <DetailsAboutTab
              data={{
                pdf: CourseDetailsData?.pdf,
                totalLecture: totalLecture,
                description: CourseDetailsData?.description,
                totalTest: totalTest,
              }}
            />
          )}
          {tabIndex === "lectures" && (
            <CourseLecturesTab
              isUnlocked={CourseDetailsData?.isUnlocked}
              Modules={Modules}
            />
          )}
          {tabIndex === "module" && (
            <CourseModuleTab id={CourseDetailsData?._id} />
          )}
          {tabIndex === "faqs" && <CourseFaqsTab />}
        </div>
      </section>
      {/* ==== Fixed Section ==== */}
      {!CourseDetailsData?.isUnlocked && (
        <section className=" fixed! bottom-0! left-0 right-0 z-10 bg-white  ">
          <div className="py-2 container-p sm:py-3 flex max-sm:flex-col gap-2 sm:gap-4 justify-between sm:items-end">
            <div>
              <p className="text-gray-600 font-medium">Price</p>
              {CourseDetailsData?.discountPrice ? (
                <h1 className=" sm:text-xl font-semibold flex gap-0.5 items-end">
                  <span>₹{CourseDetailsData?.payingPrice}/</span>
                  <span className="text-base text-gray-600 font-semibold">
                    ₹{CourseDetailsData?.discountPrice}
                  </span>
                  <span className="text-base font-medium text-red-500 line-through ps-1">
                    {CourseDetailsData?.price}
                  </span>
                </h1>
              ) : (
                <h1 className=" sm:text-xl font-semibold flex gap-0.5 items-end">
                  <span>₹{CourseDetailsData?.payingPrice}</span>
                  <span className="text-base text-red-500 font-normal line-through decoration-2 ps-1">
                    {CourseDetailsData?.price}
                  </span>
                </h1>
              )}
            </div>
            <div>
              <p className="max-sm:text-xs text-red-500  font-semibold h-full ">
                {/* Remaining fee pays after prelims cleared */}
                {CourseDetailsData?.priceInStruction}
              </p>
            </div>
            <div className=" ">
              <FormButton
                onClick={() => {
                  dispatch(setCoursePurchaseDrawer());
                }}
                htmlType="submit"
                text="Enroll Now"
                className="custom-button button button--mimas w-full sm:w-fit h-auto!"
              />
            </div>
          </div>
        </section>
      )}

      <CoursePurchaseDrawer
        data={{
          id: CourseDetailsData?._id,
          title: CourseDetailsData?.title,
          priceInStruction: CourseDetailsData?.priceInStruction,
          price: {
            discountPrice: CourseDetailsData?.discountPrice,
            payingPrice: CourseDetailsData?.payingPrice,
            price: CourseDetailsData?.price,
          },
          modulesData: Modules,
        }}
        refetch={refetch}
      />
    </div>
  );
};

export default CourseDetails;
