import { Outlet } from "react-router-dom";
import Header from "./Header";
import { Fragment } from "react/jsx-runtime";
import { useEffect } from "react";
import Aos from "aos";

const Layout = () => {
  useEffect(() => {
    Aos.init({
      once: true,
    });
  }, []);
  return (
    <Fragment>
      <Header />
      <Outlet />
    </Fragment>
  );
};

export default Layout;
