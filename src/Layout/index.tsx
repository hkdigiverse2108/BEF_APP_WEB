import Aos from "aos";
import { useEffect } from "react";
import { Outlet, useLocation } from "react-router-dom";
import { Fragment } from "react/jsx-runtime";
import Footer from "./Footer";
import Header from "./Header";
import { STORAGE_KEYS } from "../Constants";
import { Storage } from "../Utils";

const Layout = () => {
    const {pathname}  = useLocation();
    
  
  useEffect(() => {
    Aos.init({
      once: true,
    });
  }, []);
  useEffect(() => {
    if(!["solution","mistake-map-report"].includes(pathname)){
      Storage.removeItem(STORAGE_KEYS.EXAM_QA_SOLUTION);
      console.log("1");
    }
  },[pathname])
  return (
    <Fragment>
      <Header />
      <div className="min-h-screen container">
        <Outlet />
      </div>
      <Footer />
    </Fragment>
  );
};

export default Layout;
