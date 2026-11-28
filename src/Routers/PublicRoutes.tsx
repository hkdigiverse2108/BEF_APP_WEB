import { Navigate, Outlet } from "react-router-dom";
import { ROUTES } from "../Constants";
import { useAppSelector } from "../Store/hooks";
import { Storage } from "../Utils";

export const PublicRoutes = () => {
  const { isAuthenticated, user } = useAppSelector((store) => store.auth);

  if (isAuthenticated) {
    const justRegistered = Storage.getItem("just_registered");
    if (justRegistered === "true") {
      Storage.removeItem("just_registered");
      return (
        <Navigate
          to={ROUTES.RECHARGE.RECHARGE}
          state={{ fromSignup: true, signupAmount: 69 }}
          replace
        />
      );
    }

    const pending = Storage.getItem("pending_contest_join");
    if (pending) {
      try {
        const contestData = JSON.parse(pending);
        const fees = Number(contestData?.fees || 0);
        const walletBalance = Number(user?.walletBalance || 0);

        // If user needs to pay (wallet is less than contest entry fee),
        // redirect directly to the Payment / Recharge page with contest details!
        if (fees > 0 && walletBalance < fees) {
          return (
            <Navigate
              to={ROUTES.RECHARGE.RECHARGE}
              state={{ returnToContest: true, contestData }}
              replace
            />
          );
        }
      } catch (e) {
        console.error("Error reading pending contest in PublicRoutes:", e);
      }
    }
    return <Navigate to={ROUTES.HOME} replace />;
  }

  return <Outlet />;
};

export default PublicRoutes;
