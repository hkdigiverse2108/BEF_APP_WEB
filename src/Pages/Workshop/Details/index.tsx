import { useState, type SyntheticEvent } from "react";
import { Tab, Tabs } from "@mui/material";
import { ImagePath, URL_KEYS } from "../../../Constants";
import WorkshopLecturesTab from "../../../Components/Workshop/WorkshopLecturesTab";
import WorkshopTestimonialsTab from "../../../Components/Workshop/WorkshopTestimonialsTab";
import WorkshopFaqsTab from "../../../Components/Workshop/WorkshopFaqsTab";
import { FormButton } from "../../../Attribute/FormFields";
import { useGetApiQuery } from "../../../Api/CommonApi";
import ShareModal from "../../../Components/Common/ShareModal";
import Loader1 from "../../../Components/Common/Loader1";
import DetailsAboutTab from "../../../Components/Common/DetailsAboutTab";
import { useParams } from "react-router-dom";

const TabsName = [
  { value: "about", label: "About" },
  { value: "lectures", label: "Lectures" },
  { value: "Testimonials", label: "Testimonials" },
  { value: "faqs", label: "FAQS" },
];

const WorkshopDetails = () => {
  const [tabIndex, setTabIndex] = useState("about");
  const [imageLoaded, setImageLoaded] = useState(false);

  const { id }: { id?: string } = useParams();

  const { data: workshopData, isLoading: workshopLoading } = useGetApiQuery({
    // url: `${URL_KEYS.WORKSHOP.ALL}`,
    
    url: `${URL_KEYS.WORKSHOP.ID}${id}`,
  });
  const workshop = workshopData?.data || {};

  const handleChange = (_: SyntheticEvent, newValue: string) => {
    setTabIndex(newValue);
  };

  if (workshopLoading) return <Loader1 />;

  return (
    <div
      id="Workshop"
      className="container container-p space-y-9 py-9 bg-white rounded-xl Workshop"
    >
      <section className="group space-y-6 rounded-md relative">
        <div className="sm:hidden absolute w-full flex gap-5 justify-end px-2 pt-2 ">
          <ShareModal />
        </div>
        <figure>
          <img
            src={workshop?.image}
            alt={workshop?.image}
            onLoad={() => setImageLoaded(true)}
            className={`w-full h-full rounded-lg transition-opacity duration-300 ${
              imageLoaded ? "opacity-100" : "opacity-0"
            }`}
          />
        </figure>
      </section>
      <section>
        <div className="space-y-6">
          <section className=" max-sm:text-sm font-medium flex justify-between  gap-3">
            <div className="flex  gap-2 items-center">
              <div className="bg-white border border-gray-300  w-fit h-fit px-3 py-1  rounded-md ">
                <span>{workshop?.language}</span>
              </div>
              <div className="uppercase max-sm:text-xs text-primary font-bold ">
                {workshop?.syllabus}
              </div>
            </div>
          </section>
          <section className="flex max-sm:flex-col gap-4 justify-between">
            <h1 className="capitalize font-semibold sm:text-2xl">
              {workshop?.title}
            </h1>
            <span className="max-sm:hidden">
              <ShareModal />
            </span>
          </section>
          <span className="border-b border-gray-300 flex w-full h-0.5" />

          <section className="flex flex-col lg:flex-row gap-5">
            <div className="bg-input-box  transition-all px-5 py-3 rounded w-full flex items-center gap-5">
              <figure className="rounded-full bg-primary/10 p-3 sm:p-4 h-fit w-fit">
                <img
                  src={`${ImagePath}workshop/users.png`}
                  alt="Users"
                  className="w-8 sm:w-10 h-fit"
                />
              </figure>
              <p className="font-semibold sm:font-bold capitalize max-sm:text-xs">
                Secret Workshop on What toppers do differently
              </p>
            </div>
            <div className="bg-input-box  transition-all px-5 py-3 rounded w-full flex flex-col sm:flex-row sm:items-center sm:gap-5">
              {/* Image + Title (top row on mobile) */}
              <div className="flex items-center gap-5 sm:mb-0">
                <figure className="rounded-full bg-primary/10 p-3 sm:p-4 h-fit w-fit">
                  <img
                    src={`${ImagePath}workshop/wallet.png`}
                    alt="Users"
                    className="w-8 sm:w-10 h-fit"
                  />
                </figure>
                <div className="space-y-2 w-fullfont-semibold sm:font-bold max-sm:text-xs ">
                  <p>{workshop?.moneyBack}</p>
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
            variant="scrollable"
            aria-label="primary tabs example"
            allowScrollButtonsMobile
            className="about-tabs w-full! flex! justify-between! gap-4! border-b border-gray-300 mt-6 "
            sx={{
              "& .MuiTabs-flexContainer": {
                justifyContent: "space-between",
              },
            }}
          >
            {TabsName?.map(({ value, label }, index) => {
              return (
                <Tab
                  key={index}
                  value={value}
                  label={label}
                  className="font-extrabold!"
                />
              );
            })}
          </Tabs>
        </div>
        <div className="mt-6">
          {tabIndex === "about" && (
            <DetailsAboutTab
              data={{
                pdf: workshop?.pdf,
                totalLecture: workshop?.totalLecture,
                description: workshop?.description,
                totalTest: workshop?.totalTest,
              }}
            />
          )}
          {tabIndex === "lectures" && (
            <WorkshopLecturesTab id={workshop?._id} />
          )}
          {tabIndex === "Testimonials" && <WorkshopTestimonialsTab />}
          {tabIndex === "faqs" && <WorkshopFaqsTab />}
        </div>
      </section>

      {/* ==== Fixed Section ==== */}
      <section className="fixed! bottom-0! left-0 right-0 z-10 bg-white  ">
        <div className=" container-p py-2 sm:py-3 flex max-md:flex-col gap-2 md:gap-4 justify-between md:items-end">
          <div>
            <p className="text-gray-600 font-medium">Price</p>
            <h1 className=" sm:text-xl font-bold flex gap-0.5 items-end">
              <span>₹{workshop?.discountAmount}</span>
              <span className="text-base text-red-500 font-semibold line-through decoration-2 ps-1">
                {workshop?.totalAmount}
              </span>
            </h1>
          </div>

          <div>
            <FormButton
              htmlType="submit"
              text="Enroll Now"
              className="custom-button button button--mimas w-full sm:w-fit h-auto!"
            />
          </div>
        </div>
      </section>
    </div>
  );
};

export default WorkshopDetails;
