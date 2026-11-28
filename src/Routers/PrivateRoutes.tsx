import { Navigate, Outlet, useLocation } from "react-router-dom";
import { ROUTES } from "../Constants";
import { useAppSelector } from "../Store/hooks";

export const PrivateRoutes = () => {
  const { isAuthenticated = false } = useAppSelector((store) => store.auth);
  const location = useLocation();

  // Publicly accessible pages without login (Guest Mode)
  const isPublicRoute =
    location.pathname === ROUTES.HOME ||
    location.pathname === ROUTES.CLASSES.CLASSES ||
    location.pathname === ROUTES.CONTEST.CONTEST ||
    location.pathname === ROUTES.CONTEST.CONTEST_DETAILS ||
    location.pathname === ROUTES.COURSE.COURSE ||
    location.pathname.startsWith("/course") ||
    location.pathname === ROUTES.WORKSHOP.WORKSHOP ||
    location.pathname.startsWith("/workshop") ||
    location.pathname === ROUTES.HOW_IT_WORK.HOW_IT_WORK ||
    location.pathname === ROUTES.ABOUT_US.ABOUT_US ||
    location.pathname === ROUTES.LEGALITY.LEGALITY ||
    location.pathname === ROUTES.PRIVACY_POLICY.PRIVACY_POLICY ||
    location.pathname === ROUTES.TERMS_CONDITIONS.TERMS_CONDITIONS;

  return isAuthenticated || isPublicRoute ? (
    <Outlet />
  ) : (
    <Navigate to={{ pathname: ROUTES.AUTH.LOGIN, search: location.search }} replace />
  );
};

export default PrivateRoutes;
