import { createBrowserRouter } from "react-router-dom";
import { ROUTES } from "../Constants";
import Login from "../Pages/Auth/Login";
import Signup from "../Pages/Auth/Signup";
import Verify from "../Pages/Auth/Verify";
import ForgotPassword from "../Pages/Auth/ForgotPassword";
import ResetPassword from "../Pages/Auth/ResetPassword";

export const Router = createBrowserRouter([
  { path: ROUTES.HOME, element: <Login /> },
  { path: ROUTES.AUTH.LOGIN, element: <Login /> },
  { path: ROUTES.AUTH.SIGNUP, element: <Signup /> },
  { path: ROUTES.AUTH.VERIFY, element: <Verify /> },
  { path: ROUTES.AUTH.FORGOT_PASSWORD, element: <ForgotPassword /> },
  { path: ROUTES.AUTH.RESET_PASSWORD, element: <ResetPassword /> },
]);
