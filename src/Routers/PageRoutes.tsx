import { Navigate } from "react-router-dom";
import { ROUTES } from "../Constants";
import Contest from "../Pages/Contest";
import Home from "../Pages/Home";
import Register from "../Pages/Auth/Register";
import Login from "../Pages/Auth/Login";
import Verify from "../Pages/Auth/VerifyOtp";
import ForgotPassword from "../Pages/Auth/ForgotPassword";
import ResetPassword from "../Pages/Auth/ResetPassword";
import ContestDetails from "../Pages/Contest/ContestDetails";
import Instruction from "../Pages/Exam/Instruction";
import ContestWinner from "../Pages/Contest/ContestWinner";
import Question from "../Pages/Exam/Question";
import Result from "../Pages/Exam/Result";
import MyContest from "../Pages/Contest/MyContest";

export const PageRoutes = [
  { path: ROUTES.HOME, element: <Home /> },
  { path: ROUTES.CONTEST.CONTEST, element: <Contest /> },
  { path: ROUTES.CONTEST.MY_CONTEST, element: <MyContest /> },
  { path: ROUTES.CONTEST.CONTEST_DETAILS, element: <ContestDetails /> },
  { path: ROUTES.CONTEST.CONTEST_WINNERS, element: <ContestWinner /> },
  { path: ROUTES.EXAM.INSTRUCTION, element: <Instruction /> },
  { path: ROUTES.EXAM.QUESTION, element: <Question /> },
  { path: ROUTES.EXAM.RESULT, element: <Result /> },
];

export const AuthRoutes = [
  { path: ROUTES.HOME, element: <Navigate to={ROUTES.AUTH.LOGIN} replace /> },
  { path: ROUTES.AUTH.LOGIN, element: <Login /> },
  { path: ROUTES.AUTH.REGISTER, element: <Register /> },
  { path: ROUTES.AUTH.VERIFY_OTP, element: <Verify /> },
  { path: ROUTES.AUTH.FORGOT_PASSWORD, element: <ForgotPassword /> },
  { path: ROUTES.AUTH.RESET_PASSWORD, element: <ResetPassword /> },
];
