import { Outlet } from "react-router-dom";
import Header from "./Header";
import { Fragment } from "react/jsx-runtime";

const Layout = () => {
  return (
    <Fragment>
      <Header />
      <Outlet />
    </Fragment>
  );
};

export default Layout;
