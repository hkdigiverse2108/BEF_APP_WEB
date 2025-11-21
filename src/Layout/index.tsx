import Aos from "aos";
import { useEffect } from "react";
import { Outlet, useLocation } from "react-router-dom";
import { ROUTES, STORAGE_KEYS, URL_KEYS } from "../Constants";
import { Storage, updateStorage } from "../Utils";
import Footer from "./Footer";
import Header from "./Header";
import WhatsappIcon from "../Components/Common/WhatsappIcon";
import { AntMessageHolder } from "../Components/Common/AntMessage";
import { useAppSelector } from "../Store/hooks";
import { useGetApiQuery } from "../Api/CommonApi";
import VideoModal from "../Components/Common/VideoModal";

const Layout = () => {
  const { pathname } = useLocation();

  const { CourseFooterShow, WorkshopFooterShow } = useAppSelector((state) => state.FooterShow);
  const { user } = useAppSelector((state) => state.auth);
  const { data, refetch } = useGetApiQuery({ url: `${URL_KEYS.USER.ID}${user._id}` });
  const { modalVideoLink, modalVideoPlay } = useAppSelector((state) => state.VideoModal);

  const isCourseDetails = pathname.startsWith(ROUTES.COURSE.DETAILS.replace(":id", ""));
  const isWorkshopDetails = pathname.startsWith(ROUTES.WORKSHOP.DETAILS.replace(":id", ""));

  const FooterHide = (isCourseDetails && !CourseFooterShow) || (isWorkshopDetails && !WorkshopFooterShow);

  const isQuestionPage = pathname.includes("question");

  useEffect(() => {
    Aos.init({
      once: true,
    });
  }, []);

  useEffect(() => {
    if (!["solution", "mistake-map-report", "/exam/question"].includes(pathname)) {
      Storage.removeItem(STORAGE_KEYS.EXAM_QA_SOLUTION);
      Storage.removeItem(STORAGE_KEYS.EXAM_QA_ALL);
      Storage.removeItem(STORAGE_KEYS.EXAM_QA_ANSWERS);
    }
  }, [pathname]);

  useEffect(() => {
    if (user?._id) refetch();
  }, [pathname]);

  useEffect(() => {
    if (data?.data) {
      updateStorage(STORAGE_KEYS.USER, data.data);
    }
  }, [data?.data]);

  return (
    <div className="flex flex-col min-h-screen">
      <AntMessageHolder />
      {!isQuestionPage && <Header />}
      <div className="flex-1 container">
        <Outlet />
      </div>
      {!isQuestionPage && !FooterHide && <Footer />}
      <WhatsappIcon />
      <VideoModal playVideo={modalVideoPlay} videoLink={modalVideoLink} />
    </div>
  );
};

export default Layout;
