import { Navigate, Outlet } from "react-router-dom";
import { ROUTES } from "../Constants";
import { useAppSelector } from "../Store/hooks";

export const PrivateRoutes = () => {
  const { isAuthenticated = false} = useAppSelector((store) => store.auth);

  return isAuthenticated ? <Outlet /> : <Navigate to={ROUTES.AUTH.LOGIN} replace />;
};

export default PrivateRoutes;
