import { Navigate } from "react-router-dom";
import { ROUTES } from "../Constants";
import ForgotPassword from "../Pages/Auth/ForgotPassword";
import Login from "../Pages/Auth/Login";
import Register from "../Pages/Auth/Register";
import ResetPassword from "../Pages/Auth/ResetPassword";
import Verify from "../Pages/Auth/VerifyOtp";
import Contest from "../Pages/Contest";
import ContestDetails from "../Pages/Contest/ContestDetails";
import ContestWinner from "../Pages/Contest/ContestWinner";
import MyContest from "../Pages/Contest/MyContest";
import Instruction from "../Pages/Exam/Instruction";
import MistakeMapReport from "../Pages/Exam/MistakeMapReport";
import Question from "../Pages/Exam/Question";
import Result from "../Pages/Exam/Result";
import Solution from "../Pages/Exam/Solution";
import Home from "../Pages/Home";
import MyInfo from "../Pages/MyInfo";
import Recharge from "../Pages/Recharge";
import KYC from "../Pages/KYC";
import KYCVerification from "../Pages/KYC/KycVerification";

export const PageRoutes = [
  { path: ROUTES.HOME, element: <Home /> },
  { path: ROUTES.CONTEST.CONTEST, element: <Contest /> },
  { path: ROUTES.CONTEST.MY_CONTEST, element: <MyContest /> },
  { path: ROUTES.CONTEST.CONTEST_DETAILS, element: <ContestDetails /> },
  { path: ROUTES.CONTEST.CONTEST_WINNERS, element: <ContestWinner /> },
  { path: ROUTES.EXAM.INSTRUCTION, element: <Instruction /> },
  { path: ROUTES.EXAM.QUESTION, element: <Question /> },
  { path: ROUTES.EXAM.RESULT, element: <Result /> },
  { path: ROUTES.EXAM.MISTAKE_MAP_REPORT, element: <MistakeMapReport /> },
  { path: ROUTES.EXAM.SOLUTION, element: <Solution /> },
  { path: ROUTES.RECHARGE, element: <Recharge /> },
  { path: ROUTES.MY_INFO, element: <MyInfo /> },
  { path: ROUTES.KYC.KYC, element: <KYC /> },
  { path: ROUTES.KYC.KYC_VERIFICATION, element: <KYCVerification/> },

];

export const AuthRoutes = [
  { path: ROUTES.HOME, element: <Navigate to={ROUTES.AUTH.LOGIN} replace /> },
  { path: ROUTES.AUTH.LOGIN, element: <Login /> },
  { path: ROUTES.AUTH.REGISTER, element: <Register /> },
  { path: ROUTES.AUTH.VERIFY_OTP, element: <Verify /> },
  { path: ROUTES.AUTH.FORGOT_PASSWORD, element: <ForgotPassword /> },
  { path: ROUTES.AUTH.RESET_PASSWORD, element: <ResetPassword /> },
];
