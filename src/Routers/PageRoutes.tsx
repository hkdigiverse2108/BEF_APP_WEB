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
import KYCVerification from "../Pages/KYC/KYCVerification";
import GetScholarship from "../Pages/GetScholarship";
import History from "../Pages/History";
import HowItWork from "../Pages/HowItWork";
import AboutUs from "../Pages/AboutUs";
import Illegality from "../Pages/Illegality";
import PrivacyPolicy from "../Pages/PrivacyPolicy";
import TermsConditions from "../Pages/TermsConditions";
import KYCRegister from "../Pages/KYC/KYCRegister";
import Referral from "../Pages/Referral";
import FullFestReport from "../Pages/FullFestReport";
import Classes from "../Pages/Classes";
import Course from "../Pages/Course";
import YoutubeValues from "../Pages/YoutubeValues";
import SocialMediaEngage from "../Pages/SocialMediaEngage";
import Contact from "../Pages/Contact";
import Workshop from "../Pages/Workshop";
import CourseDetails from "../Pages/Course/Details";
import CountDown from "../Pages/Exam/CountDown";
import WorkshopDetails from "../Pages/Workshop/Details";

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
  { path: ROUTES.EXAM.COUNT_DOWN, element: <CountDown /> },
  { path: ROUTES.RECHARGE.RECHARGE, element: <Recharge /> },
  { path: ROUTES.MY_INFO.MY_INFO, element: <MyInfo /> },
  { path: ROUTES.KYC.KYC, element: <KYC /> },
  { path: ROUTES.KYC.KYC_REGISTER, element: <KYCRegister /> },
  { path: ROUTES.KYC.KYC_VERIFICATION, element: <KYCVerification /> },
  { path: ROUTES.GET_SCHOLARSHIP.GET_SCHOLARSHIP, element: <GetScholarship /> },
  { path: ROUTES.HISTORY.HISTORY, element: <History /> },
  { path: ROUTES.HOW_IT_WORK.HOW_IT_WORK, element: <HowItWork /> },
  { path: ROUTES.ABOUT_US.ABOUT_US, element: <AboutUs /> },
  { path: ROUTES.ILLEGALITY.ILLEGALITY, element: <Illegality /> },
  { path: ROUTES.PRIVACY_POLICY.PRIVACY_POLICY, element: <PrivacyPolicy /> },
  {
    path: ROUTES.TERMS_CONDITIONS.TERMS_CONDITIONS,
    element: <TermsConditions />,
  },
  { path: ROUTES.REFERRAL.REFERRAL, element: <Referral /> },
  {
    path: ROUTES.FULL_FEST_REPORT.FULL_FEST_REPORT,
    element: <FullFestReport />,
  },
  { path: ROUTES.CLASSES.CLASSES, element: <Classes /> },
  { path: ROUTES.COURSE.COURSE, element: <Course /> },
  { path: ROUTES.COURSE.DETAILS, element: <CourseDetails /> },
  { path: ROUTES.YOUTUBE_VALUES.YOUTUBE_VALUES, element: <YoutubeValues /> },
  {
    path: ROUTES.SOCIAL_MEDIA_ENGAGE.SOCIAL_MEDIA_ENGAGE,
    element: <SocialMediaEngage />,
  },
  { path: ROUTES.CONTACT.CONTACT, element: <Contact /> },
  { path: ROUTES.WORKSHOP.WORKSHOP, element: <Workshop /> },
  { path: ROUTES.WORKSHOP.DETAILS, element: <WorkshopDetails /> },
];

export const AuthRoutes = [
  { path: ROUTES.HOME, element: <Navigate to={ROUTES.AUTH.LOGIN} replace /> },
  { path: ROUTES.AUTH.LOGIN, element: <Login /> },
  { path: ROUTES.AUTH.REGISTER, element: <Register /> },
  { path: ROUTES.AUTH.VERIFY_OTP, element: <Verify /> },
  { path: ROUTES.AUTH.FORGOT_PASSWORD, element: <ForgotPassword /> },
  { path: ROUTES.AUTH.RESET_PASSWORD, element: <ResetPassword /> },
];
