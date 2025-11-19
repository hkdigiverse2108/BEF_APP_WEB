import Aos from "aos";
import { useEffect } from "react";
import { Outlet, useLocation } from "react-router-dom";
import { ROUTES, STORAGE_KEYS } from "../Constants";
import { Storage } from "../Utils";
import Footer from "./Footer";
import Header from "./Header";
import WhatsappIcon from "../Components/Common/WhatsappIcon";
import { AntMessageHolder } from "../Components/Common/AntMessage";
import { useAppSelector } from "../Store/hooks";

const Layout = () => {
  const { pathname } = useLocation();

  const { CourseFooterShow, WorkshopFooterShow } = useAppSelector(
    (state) => state.FooterShow
  );

  const isCourseDetails = pathname.startsWith(
    ROUTES.COURSE.DETAILS.replace(":id", "")
  );
  const isWorkshopDetails = pathname.startsWith(
    ROUTES.WORKSHOP.DETAILS.replace(":id", "")
  );

  const FooterHide =
    (isCourseDetails && !CourseFooterShow) ||
    (isWorkshopDetails && !WorkshopFooterShow);

  const isQuestionPage = pathname.includes("question");

  // console.log("CourseFooterShow", CourseFooterShow);
  // console.log("WorkshopFooterShow", WorkshopFooterShow);
  // console.log("isCourseDetails", isCourseDetails);
  // console.log("isWorkshopDetails", isWorkshopDetails);
  // console.log("FooterHide", FooterHide);
  useEffect(() => {
    Aos.init({
      once: true,
    });
  }, []);

  useEffect(() => {
    if (
      !["solution", "mistake-map-report", "/exam/question"].includes(pathname)
    ) {
      Storage.removeItem(STORAGE_KEYS.EXAM_QA_SOLUTION);
      Storage.removeItem(STORAGE_KEYS.EXAM_QA_ALL);
      Storage.removeItem(STORAGE_KEYS.EXAM_QA_ANSWERS);
    }
  }, [pathname]);

  return (
    <div className="flex flex-col min-h-screen">
      <AntMessageHolder />
      {!isQuestionPage && <Header />}
      <div className="flex-1 container">
        <Outlet />
      </div>
      {!isQuestionPage && !FooterHide && <Footer />}
      <WhatsappIcon />
    </div>
  );
};

export default Layout;
