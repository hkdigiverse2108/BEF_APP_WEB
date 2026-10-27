import { Drawer } from "antd";
import { useState } from "react";
import { BiWallet } from "react-icons/bi";
import { FaRegCircleQuestion } from "react-icons/fa6";
import { IoMailOutline, IoSchoolOutline, IoSettingsOutline } from "react-icons/io5";
import { LuTvMinimalPlay } from "react-icons/lu";
import { MdOutlineGavel, MdOutlineLock, MdOutlinePrivacyTip, MdOutlineVerified } from "react-icons/md";
import { TbLogout, TbPasswordFingerprint, TbWallet } from "react-icons/tb";
import { useNavigate } from "react-router-dom";
import { Href, ImagePath, ROUTES, URL_KEYS } from "../Constants";
import FeedbackModal from "../Pages/Feedback";
import SupportModal from "../Pages/Support";
import { useAppDispatch, useAppSelector } from "../Store/hooks";
import { setFeedbackModal, setMenuDrawer, setSupportModal } from "../Store/Slices/DrawerSlice";
import { useGetApiQuery } from "../Api/CommonApi";
import { setResetPasswordModal } from "../Store/Slices/AuthSlice";
import ResetPasswordModal from "../Pages/ResetPassword";
import LogoutConfirmModal from "../Components/MyInfo/LogoutConfirmModal";

const MenuDrawer = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { isMenuDrawer } = useAppSelector((state) => state.drawer);
  const { user } = useAppSelector((state) => state.auth);

  const { data } = useGetApiQuery({ url: `${URL_KEYS.USER.ID}${user?._id}` });
  const UserData = data?.data;

  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const [logoutModalOpen, setLogoutModalOpen] = useState(false);

  const MenuData = [
    { icon: <TbWallet />, title: "Recharge", url: ROUTES.RECHARGE.RECHARGE },
    {
      icon: <IoSchoolOutline />,
      title: "Get Scholarship",
      url: ROUTES.GET_SCHOLARSHIP.GET_SCHOLARSHIP,
    },
    { icon: <BiWallet />, title: "History", url: ROUTES.HISTORY.HISTORY },
    {
      icon: <IoSettingsOutline />,
      title: "My Info & Setting",
      url: ROUTES.MY_INFO.MY_INFO,
    },
    {
      icon: <TbPasswordFingerprint />,
      title: "Reset Password",
      url: Href,
    },
    {
      icon: <LuTvMinimalPlay />,
      title: "How It Works",
      url: ROUTES.HOW_IT_WORK.HOW_IT_WORK,
    },
    { icon: <IoMailOutline />, title: "Support", url: Href },
    {
      icon: <MdOutlineVerified />,
      title: "KYC Verification",
      url: ROUTES.KYC.KYC,
    },
    {
      icon: <MdOutlineLock />,
      title: "Terms & Conditions",
      url: ROUTES.TERMS_CONDITIONS.TERMS_CONDITIONS,
    },
    {
      icon: <MdOutlinePrivacyTip />,
      title: "Privacy & Policy",
      url: ROUTES.PRIVACY_POLICY.PRIVACY_POLICY,
    },
    {
      icon: <FaRegCircleQuestion />,
      title: "About US",
      url: ROUTES.ABOUT_US.ABOUT_US,
    },
    {
      icon: <MdOutlineGavel />,
      title: "legality",
      url: ROUTES.LEGALITY.LEGALITY,
    },
    {
      icon: <TbLogout className="text-red-500" />,
      title: "Logout",
      url: Href,
    },
  ];
  const handleClick = (i: number, url: string, title: string) => {
    setActiveIndex(i);
    if (title === "Feedback") dispatch(setFeedbackModal());
    else if (title === "Support") dispatch(setSupportModal());
    else if (title === "Reset Password") dispatch(setResetPasswordModal());
    else if (title === "Logout") {
      setLogoutModalOpen(true);
      dispatch(setMenuDrawer());
      return;
    }
    else navigate(url);
    dispatch(setMenuDrawer());
  };
  const currentUser = UserData || user;

  const genderWiseImage = currentUser?.gender === "male" ? `${ImagePath}user/User_Male.png` : `${ImagePath}user/User_Female.png`;

  const ProfileImage = currentUser?.profileImage ? currentUser?.profileImage : genderWiseImage;
  return (
    <>
      <Drawer
        placement="right"
        open={isMenuDrawer}
        className="menu-drawer relative overflow-hidden"
        onClose={() => dispatch(setMenuDrawer())}
        extra={
          <div className="flex justify-between items-center rounded-xl order-last" onClick={() => dispatch(setMenuDrawer())}>
            <div className="flex justify-between items-center gap-3 sm:gap-4 cursor-pointer">
              <img src={ProfileImage} alt="profile" className="w-12 h-12 sm:h-14 sm:w-14 rounded-full object-cover ring-4 ring-secondary" />
              <div className="min-w-0">
                <span className="text-base sm:text-lg font-bold capitalize truncate block">
                  {UserData?.firstName} {UserData?.lastName}
                </span>
                <p className="capitalize text-xs sm:text-sm font-medium text-tertiary">{UserData?.userType === "admin" ? "Admin" : "Student"}</p>
              </div>
            </div>
          </div>
        }
      >
        <ul className="grid grid-cols-1 gap-3 relative z-20">
          {MenuData?.map((item, i) => (
            <li key={i} onClick={() => handleClick(i, item.url, item.title)} className={`flex min-h-14 w-full items-center gap-4 rounded-xl border px-5 text-left font-semibold cursor-pointer transition-all duration-300 ${activeIndex === i ? "border-primary text-primary bg-bg-light" : "border-border bg-secondary hover:border-accent hover:bg-card hover:text-accent"}`}>
              <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-card text-xl text-accent">{item.icon}</span>
              <span className="font-semibold text-sm sm:text-base uppercase truncate">{item.title}</span>
            </li>
          ))}
        </ul>
      </Drawer>
      <FeedbackModal />
      <SupportModal />
      <ResetPasswordModal />
      <LogoutConfirmModal logoutModalOpen={logoutModalOpen} setLogoutModalOpen={setLogoutModalOpen} />
    </>
  );
};

export default MenuDrawer;
