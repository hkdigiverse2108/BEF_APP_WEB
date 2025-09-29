import { createBrowserRouter } from "react-router-dom";
import { ROUTES } from "../Constants";
import Home from "../Pages/Home";
import Login from "../Pages/Auth/Login";

export const Router = createBrowserRouter([
    {
        path: ROUTES.HOME,
        element: <Login />
        //element: <Home />
    },
    {
        path: ROUTES.AUTH.LOGIN,
        element: <Login />
    }
])