import { createBrowserRouter, Navigate } from "react-router-dom";
import { ROUTES } from "../Constants";
import Login from "../Pages/Auth/Login";
import Signup from "../Pages/Auth/Signup";
import Verify from "../Pages/Auth/VerifyOtp";
import ForgotPassword from "../Pages/Auth/ForgotPassword";
import ResetPassword from "../Pages/Auth/ResetPassword";
import Home from "../Pages/Home";
import PrivateRoutes from "./PrivateRoutes";
import Layout from "../Layout";
import PublicRoutes from "./PublicRoutes";

export const Router = createBrowserRouter([
  {
    element: <PrivateRoutes/>,
    children: [
      {
        element: <Layout />,
        children: [{ path: ROUTES.HOME, element: <Home /> }],
      },
    ],
  },
  {
    element: <PublicRoutes />,
    children: [
      { path: ROUTES.HOME, element: <Navigate to={ROUTES.AUTH.LOGIN} replace /> },
      { path: ROUTES.AUTH.LOGIN, element: <Login /> },
      { path: ROUTES.AUTH.SIGNUP, element: <Signup /> },
      { path: ROUTES.AUTH.VERIFY_OTP, element: <Verify /> },
      { path: ROUTES.AUTH.FORGOT_PASSWORD, element: <ForgotPassword /> },
      { path: ROUTES.AUTH.RESET_PASSWORD, element: <ResetPassword /> },
    ],
  },
  // { path: "*", element: <Error /> },
]);
