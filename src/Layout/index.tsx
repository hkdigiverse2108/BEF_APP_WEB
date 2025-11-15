import Aos from "aos";
import { useEffect } from "react";
import { Outlet, useLocation } from "react-router-dom";
import { STORAGE_KEYS } from "../Constants";
import { Storage } from "../Utils";
import Footer from "./Footer";
import Header from "./Header";
import WhatsappIcon from "../Components/Common/WhatsappIcon";

const Layout = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    Aos.init({
      once: true,
    });
  }, []);

  useEffect(() => {
    if (!["solution", "mistake-map-report"].includes(pathname)) {
      Storage.removeItem(STORAGE_KEYS.EXAM_QA_SOLUTION);
    }
  }, [pathname]);
  return (
    <div className="flex flex-col min-h-screen">
      {!pathname.includes("question") && <Header />}
      <div className="flex-1 container">
        <Outlet />
      </div>
      {!pathname.includes("question") && <Footer />}
      <WhatsappIcon />
    </div>
  );
};

export default Layout;
