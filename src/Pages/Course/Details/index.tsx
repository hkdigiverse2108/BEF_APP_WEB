import { Tab, Tabs } from "@mui/material";
import { useState, type SyntheticEvent } from "react";
import { useParams } from "react-router-dom";
import { useGetApiQuery } from "../../../Api/CommonApi";
import { FormButton } from "../../../Attribute/FormFields";
import ShareModal from "../../../Components/Common/ShareModal";
import CourseAboutTab from "../../../Components/Course/Details/CourseAboutTab";
import CourseFaqsTab from "../../../Components/Course/Details/CourseFaqsTab";
import CourseLecturesTab from "../../../Components/Course/Details/CourseLecturesTab";
import CourseModuleTab from "../../../Components/Course/Details/CourseModuleTab";
import { ImagePath, URL_KEYS } from "../../../Constants";
import type { CourseDetailsApiResponse } from "../../../Types";

const TabsName = [
  { value: "about", label: "About" },
  { value: "lectures", label: "Lectures" },
  { value: "module", label: "Module" },
  { value: "faqs", label: "FAQS" },
];

const CourseDetails = () => {
  const [tabIndex, setTabIndex] = useState("about");
  const { id }: { id?: string } = useParams();

  const { data, isLoading } = useGetApiQuery<CourseDetailsApiResponse>({ url: `${URL_KEYS.COURSE.ID}${id}` });
  const CourseDetailsData = data?.data;

  const { data: modulesData, isLoading: moduleLoading } = useGetApiQuery({ url: `${URL_KEYS.MODULE.COURSE_WISE}${CourseDetailsData?._id}` }, { skip: !CourseDetailsData?._id });
  const Modules = modulesData?.data;

  const handleChange = (_: SyntheticEvent, newValue: string) => {
    setTabIndex(newValue);
  };
  return (
    <div className="sub-container space-y-9 pt-9 bg-white rounded-xl">
      <section className="group space-y-6 rounded-md relative">
        <div className="sm:hidden absolute top-0 w-full flex gap-5 justify-end px-2 pt-2">
          <div className="sm:hidden absolute w-full flex gap-5 justify-end px-2 pt-2">
            <ShareModal />
          </div>
        </div>
        <figure>
          <img src={CourseDetailsData?.image} alt={CourseDetailsData?.title} className="w-full h-full rounded-lg max-h-[560px]" />
        </figure>
      </section>
      <section className="">
        <div className="space-y-6 pb-5">
          <section className=" max-sm:text-sm font-medium flex justify-between gap-3">
            <div className="flex gap-2 items-center">
              <div className="bg-white border border-gray-300 w-fit h-fit px-3 py-1 rounded-md ">
                <span>{CourseDetailsData?.language}</span>
              </div>
              <div className="uppercase max-sm:text-xs text-primary font-bold">{CourseDetailsData?.syllabus?.subjectLevel}</div>
            </div>
          </section>
          <section className="flex max-sm:flex-col gap-4 justify-between">
            <h1 className="capitalize font-bold sm:text-2xl">{CourseDetailsData?.title}</h1>
            <span className="max-sm:hidden">
              <ShareModal />
            </span>
          </section>
          <span className="border-b border-gray-300 flex w-full h-0.5" />
          <section className="flex flex-col lg:flex-row gap-5">
            <div className="bg-input-box transition-all px-5 py-3 rounded w-full flex flex-col sm:flex-row sm:items-center sm:gap-5">
              <div className="flex items-center  gap-3 mb-3 sm:mb-0">
                <figure className="rounded-full bg-primary/10 p-3 sm:p-4 h-fit w-fit">
                  <img src={`${ImagePath}workshop/users.png`} alt="Users" className="w-8 sm:w-10 h-fit" />
                </figure>
                <p className="sm:hidden font-bold">Module</p>
              </div>
              <div className="space-y-2 w-full ">
                <p className="max-sm:hidden font-bold">Module</p>
                <ul className="w-full text-sm font-medium flex flex-col sm:flex-row gap-2 sm:gap-4">
                  {Modules?.map((module: { name: string }, i: number) => (
                    <li>
                      {i + 1}. {module.name}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            <div className="bg-input-box  transition-all px-5 py-3 rounded w-full flex flex-col sm:flex-row sm:items-center sm:gap-5">
              <div className="flex items-center gap-3 sm:mb-0">
                <figure className="rounded-full bg-primary/10 p-3 sm:p-4 h-fit w-fit">
                  <img src={`${ImagePath}workshop/wallet.png`} alt="Users" className="w-8 sm:w-10 h-fit" />
                </figure>
                <div className="space-y-2 w-full font-bold ">
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
            aria-label="primary tabs example"
            className="about-tabs border-b border-gray-300"
            allowScrollButtonsMobile
            sx={{
              "& .MuiTabs-flexContainer": {
                justifyContent: "space-between",
              },
            }}
          >
            {TabsName?.map(({ value, label }, index) => {
              return <Tab key={index} value={value} label={label} className="!font-bold" />;
            })}
          </Tabs>
        </div>
        <div className="mt-6">
          {tabIndex === "about" && <CourseAboutTab data={CourseDetailsData} />}
          {tabIndex === "lectures" && <CourseLecturesTab id={CourseDetailsData?._id} />}
          {tabIndex === "module" && <CourseModuleTab id={CourseDetailsData?._id}/>}
          {tabIndex === "faqs" && <CourseFaqsTab />}
        </div>
      </section>
      {/* ==== Fixed Section ==== */}
      <section className="fixed bottom-0 left-0 right-0 z-10 bg-white inset-shadow-sm">
        <div className="mx-4 md:mx-10 py-3 sm:py-6 flex max-sm:flex-col gap-2 sm:gap-4 sm:justify-between sm:items-end">
          <div>
            <p className="text-gray-600 font-medium">Price</p>
            {CourseDetailsData?.discountPrice ? (
              <h1 className=" sm:text-xl font-bold flex gap-[2px] items-end">
                <span>₹{CourseDetailsData?.payingPrice}/</span>
                <span className="text-base text-gray-600 font-bold">₹{CourseDetailsData?.discountPrice}</span>
                <span className="text-base font-medium text-red-500 line-through ps-1">{CourseDetailsData?.price}</span>
              </h1>
            ) : (
              <h1 className=" sm:text-xl font-bold flex gap-[2px] items-end">
                <span>₹{CourseDetailsData?.payingPrice}</span>
                <span className="text-base text-red-500 font-semibold line-through decoration-2 ps-1">{CourseDetailsData?.price}</span>
              </h1>
            )}
          </div>
          <div>
            <p className="max-sm:text-sm font-medium h-full">{CourseDetailsData?.priceInStruction}</p>
          </div>
          <div className="flex justify-center sm:justify-end">
            <FormButton htmlType="submit" text="Enroll Now" className="custom-button button button--mimas w-full sm:w-fit !h-auto" />
          </div>
        </div>
      </section>
    </div>
  );
};

export default CourseDetails;
