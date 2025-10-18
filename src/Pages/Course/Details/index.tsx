import { Tab, Tabs } from "@mui/material";
import { useState, type SyntheticEvent } from "react";
import { PiShareFat } from "react-icons/pi";
import { FormButton } from "../../../Attribute/FormFields";
import CourseAboutTab from "../../../Components/Course/Details/CourseAboutTab";
import CourseFaqsTab from "../../../Components/Course/Details/CourseFaqsTab";
import CourseLecturesTab from "../../../Components/Course/Details/CourseLecturesTab";
import CourseModuleTab from "../../../Components/Course/Details/CourseModuleTab";
import { ImagePath } from "../../../Constants";

const TabsName = [
  { value: "about", label: "About" },
  { value: "lectures", label: "Lectures" },
  { value: "module", label: "Module" },
  { value: "faqs", label: "FAQS" },
];

const CourseDetails = () => {
  const [tabIndex, setTabIndex] = useState("about");

  const handleChange = (_: SyntheticEvent, newValue: string) => {
    setTabIndex(newValue);
  };
  return (
    <div className="sub-container space-y-9 pt-9 bg-white rounded-xl">
      <section className="group space-y-6 rounded-md relative">
        <div className="sm:hidden absolute top-0 w-full flex gap-5 justify-end px-2 pt-2">
          <span className="bg-white/50 text-white backdrop-blur-md rounded-sm px-2 py-1">
            <PiShareFat />
          </span>
        </div>
        <figure>
          <img src={`${ImagePath}workshop/CourseThumbnail.webp`} alt="" className="w-full h-full rounded-lg" />
        </figure>
      </section>
      <section className="">
        <div className="space-y-6 pb-5">
          <section className=" max-sm:text-sm font-medium flex justify-between gap-3">
            <div className="flex gap-2 items-center">
              <div className="bg-white border border-gray-300 w-fit h-fit px-3 py-1 rounded-md">
                <span className="sm:hidden">हिंn</span>
                <span className="max-sm:hidden">हिंGLISH</span>
              </div>
              <div className="uppercase max-sm:text-xs text-primary font-bold">subject-level full syllabus batch</div>
            </div>
          </section>
          <section className="flex max-sm:flex-col gap-4 justify-between">
            <h1 className="capitalize font-bold sm:text-2xl">CSAT Live pathshala by madhukar kotawe</h1>
            <span className="max-sm:hidden flex gap items-center w-fit h-fit gap-1 bg-white border border-gray-300 backdrop-blur-md rounded-md px-2 py-1 cursor-pointer">
              <PiShareFat />
              Share
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
                  <li>1. MCQ Aptitude</li>
                  <li>2. MCQ Aptitude Test</li>
                  <li>3. Mapping Test</li>
                </ul>
              </div>
            </div>
            <div className="bg-input-box  transition-all px-5 py-3 rounded w-full flex flex-col sm:flex-row sm:items-center sm:gap-5">
              <div className="flex items-center gap-3 sm:mb-0">
                <figure className="rounded-full bg-primary/10 p-3 sm:p-4 h-fit w-fit">
                  <img src={`${ImagePath}workshop/wallet.png`} alt="Users" className="w-8 sm:w-10 h-fit" />
                </figure>
                <div className="space-y-2 w-full font-bold ">
                  <p>100% Money Back</p>
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
          {tabIndex === "about" && <CourseAboutTab />}
          {tabIndex === "lectures" && <CourseLecturesTab />}
          {tabIndex === "module" && <CourseModuleTab />}
          {tabIndex === "faqs" && <CourseFaqsTab />}
        </div>
      </section>
      {/* ==== Fixed Section ==== */}
      <section className="fixed bottom-0 left-0 right-0 z-10 bg-white inset-shadow-sm">
        <div className="mx-4 md:mx-10 py-3 sm:py-6 flex max-sm:flex-col gap-2 sm:gap-4 sm:justify-between sm:items-end">
          <div>
            <p className="text-gray-600 font-medium">Price</p>
            <h1 className="text-lg sm:text-2xl font-bold flex gap-[2px] items-end">
              <span>₹6999/</span>
              <span className="text-sm sm:text-lg text-gray-600 font-bold">₹24000</span>
            </h1>
          </div>
          <div>
            <p className="max-sm:text-sm font-medium h-full ">Remaining fee pays after prelims cleared</p>
          </div>
          <div className="sm:w-1/4 flex justify-center sm:justify-end">
            <FormButton htmlType="submit" text="Enroll Now" className="custom-button button button--mimas w-full sm:w-fit !h-auto" />
          </div>
        </div>
      </section>
    </div>
  );
};

export default CourseDetails;
