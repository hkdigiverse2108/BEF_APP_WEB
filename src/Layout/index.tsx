import Aos from "aos";
import { useEffect } from "react";
import { Outlet } from "react-router-dom";
import { Fragment } from "react/jsx-runtime";
import Footer from "./Footer";
import Header from "./Header";

const Layout = () => {
  useEffect(() => {
    Aos.init({
      once: true,
    });
  }, []);
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
