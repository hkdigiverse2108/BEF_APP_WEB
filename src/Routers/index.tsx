import { createBrowserRouter } from "react-router-dom";
import { ROUTES } from "../Constants";
import Login from "../Pages/Auth/Login";
import Signup from "../Pages/Auth/Signup";

export const Router = createBrowserRouter([
  { path: ROUTES.HOME, element: <Login /> },
  { path: ROUTES.AUTH.LOGIN, element: <Login /> },
  { path: ROUTES.AUTH.SIGNUP, element: <Signup /> },
]);
