import { useEffect, useState, type SyntheticEvent } from "react";
import { Tab, Tabs } from "@mui/material";
import { ImagePath, ROUTES, URL_KEYS } from "../../../Constants";
import { FormButton } from "../../../Attribute/FormFields";
import { useGetApiQuery } from "../../../Api/CommonApi";
import ShareModal from "../../../Components/Common/ShareModal";
import DetailsAboutTab from "../../../Components/WorkshopCourseCommon/DetailsAboutTab";
import { Navigate, useParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../../Store/hooks";
import { setWorkshopPurchaseDrawer } from "../../../Store/Slices/DrawerSlice";
import WorkshopLecturesTab from "../../../Components/Workshop/Details/WorkshopLecturesTab";
import WorkshopTestimonialsTab from "../../../Components/Workshop/Details/WorkshopTestimonialsTab";
import WorkshopFaqTab from "../../../Components/Workshop/Details/WorkshopFaqsTab";
import WorkshopPurchaseDrawer from "../../../Components/Workshop/WorkshopPurchaseDrawer";
import MainLoader from "../../../Components/Common/MainLoader";
import { setWorkshopFooterShow } from "../../../Store/Slices/FooterShowSlice";

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
  const dispatch = useAppDispatch();
  const { WorkshopFooterShow } = useAppSelector((state) => state.FooterShow);
  const {
    data: workshopData,
    isLoading: workshopLoading,
    refetch,
  } = useGetApiQuery({
    url: `${URL_KEYS.WORKSHOP.ID}${id}`,
  });
  const workshop = workshopData?.data || {};

  const { data: LectureData } = useGetApiQuery(
    {
      url: `${URL_KEYS.LECTURE.ALL}?workshopFilter=${workshop?._id}`,
    },
    { skip: !workshop?._id }
  );

  const Lectures = LectureData?.data?.lecture_data;

  const handleChange = (_: SyntheticEvent, newValue: string) => {
    setTabIndex(newValue);
  };

  useEffect(() => {
    if (!workshopLoading) {
      const isFooterShow = workshop?.isUnlocked;
      dispatch(setWorkshopFooterShow(isFooterShow));
    }
  }, [workshopLoading]);
  if (workshopLoading) return <MainLoader />;
  if (!workshop) {
    return <Navigate to={ROUTES.WORKSHOP.WORKSHOP} replace />;
  }

  return (
    <div id="Workshop" className={`container container-p space-y-9 py-9 bg-white rounded-xl Workshop ${!WorkshopFooterShow ? "mb-18 sm:mb-12" : ""}`}>
      <section className="group space-y-6 rounded-md relative">
        <div className="sm:hidden absolute w-full flex gap-5 justify-end px-2 pt-2 ">
          <ShareModal />
        </div>
        <figure>
          <img src={workshop?.image} alt={workshop?.image} onLoad={() => setImageLoaded(true)} className={`w-full h-full rounded-lg transition-opacity duration-300 ${imageLoaded ? "opacity-100" : "opacity-0"}`} />
        </figure>
      </section>
      <section>
        <div className="space-y-6 font-semibold">
          <section className=" max-sm:text-sm  flex justify-between  gap-3">
            <div className="flex  gap-2 items-center">
              <div className="bg-white border border-gray-300  w-fit h-fit px-3 py-1  rounded-md ">
                <span>{workshop?.language}</span>
              </div>
              <div className="uppercase max-sm:text-xs text-primary font-bold ">{workshop?.syllabus}</div>
            </div>
          </section>
          <section className="flex max-sm:flex-col gap-4 justify-between">
            <h1 className="capitalize  sm:text-2xl">{workshop?.title}</h1>
            <span className="max-sm:hidden">
              <ShareModal />
            </span>
          </section>
          <span className="border-b border-gray-300 flex w-full h-0.5" />

          <section className="flex flex-col lg:flex-row gap-5 font-semibold">
            <div className="bg-input-box  transition-all gap-3 px-3 sm:px-5 py-3 rounded w-full flex items-center sm:gap-5">
              <figure className="rounded-full bg-primary/10 p-3 sm:p-4 h-fit w-fit">
                <img src={`${ImagePath}workshop/users.png`} alt="Users" className="w-8 sm:w-10 h-fit" />
              </figure>
              <p className=" capitalize max-sm:text-xs">Secret Workshop on What toppers do differently</p>
            </div>
            <div className="bg-input-box  transition-all gap-3 px-3 sm:px-5 py-3 rounded w-full flex items-center sm:gap-5">
              {/* Image + Title (top row on mobile) */}
              <div className="flex items-center gap-3 sm:mb-0">
                <figure className="rounded-full bg-primary/10 p-3 sm:p-4 h-fit w-fit">
                  <img src={`${ImagePath}workshop/wallet.png`} alt="Users" className="w-8 sm:w-10 h-fit" />
                </figure>
                <p className=" capitalize max-sm:text-xs ">{workshop?.moneyBack}</p>
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
            // allowScrollButtonsMobile
            className="about-tabs  w-full! flex! justify-between! sm:gap-4! border-b border-gray-300 mt-6 "
            sx={{
              "& .MuiTabs-flexContainer": {
                justifyContent: "space-between",
              },
            }}
          >
            {TabsName?.map(({ value, label }, index) => {
              return <Tab key={index} value={value} label={label} className=" " />;
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
          {tabIndex === "lectures" && <WorkshopLecturesTab isUnlocked={workshop?.isUnlocked} id={workshop?._id} />}
          {tabIndex === "Testimonials" && <WorkshopTestimonialsTab />}
          {tabIndex === "faqs" && <WorkshopFaqTab />}
        </div>
      </section>

      {/* ==== Fixed Section ==== */}
      {!workshop?.isUnlocked && (
        <section className="fixed! bottom-0! left-0 right-0 z-10 bg-white shadow-2xl  ">
          <div className=" container-p py-2 sm:py-3 flex max-md:flex-col gap-2 md:gap-4 justify-between md:items-end">
            <div>
              <p className="text-gray-600 font-medium">Price</p>
              <h1 className=" sm:text-xl font-semibold flex gap-0.5 items-end">
                <span>₹{workshop?.discountAmount}</span>
                <span className="text-base text-red-500 font-normal line-through decoration-2 ps-1">{workshop?.totalAmount}</span>
              </h1>
            </div>
            {workshop.syllabus === "Workshop" && (
              <div>
                <p className="text-primary font-bold">Complete the workshop within 24 hours and your fee will be 100% REFUNDED.</p>
              </div>
            )}

            <div>
              <FormButton
                onClick={() => {
                  dispatch(setWorkshopPurchaseDrawer());
                }}
                htmlType="submit"
                text="Join Now"
                className="custom-button button button--mimas w-full sm:w-fit h-auto!"
              />
            </div>
          </div>
        </section>
      )}

      <WorkshopPurchaseDrawer
        data={{
          id: workshop?._id,
          title: workshop?.title,
          price: {
            discountPrice: workshop?.discountAmount,
            price: workshop?.totalAmount,
          },
          lecturesData: Lectures,
        }}
        refetch={refetch}
      />
    </div>
  );
};

export default WorkshopDetails;
