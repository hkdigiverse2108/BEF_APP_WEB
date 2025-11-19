import { Drawer } from "antd";
import { useState } from "react";
import { BiWallet } from "react-icons/bi";
import { FaRegCircleQuestion } from "react-icons/fa6";
import {
  IoMailOutline,
  IoSchoolOutline,
  IoSettingsOutline,
} from "react-icons/io5";
import { LuTvMinimalPlay } from "react-icons/lu";
import {
  MdOutlineGavel,
  MdOutlineLock,
  MdOutlinePrivacyTip,
  MdOutlineVerified,
} from "react-icons/md";
import { TbWallet } from "react-icons/tb";
import { useNavigate } from "react-router-dom";
import { Href, ImagePath, ROUTES, URL_KEYS } from "../Constants";
import FeedbackModal from "../Pages/Feedback";
import SupportModal from "../Pages/Support";
import { useAppDispatch, useAppSelector } from "../Store/hooks";
import {
  setFeedbackModal,
  setMenuDrawer,
  setSupportModal,
} from "../Store/Slices/DrawerSlice";
import { useGetApiQuery } from "../Api/CommonApi";

const MenuDrawer = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { isMenuDrawer } = useAppSelector((state) => state.drawer);
  const { user } = useAppSelector((state) => state.auth);

  // const user = JSON.parse(Storage.getItem(STORAGE_KEYS.USER) || "{}");

  const { data } = useGetApiQuery({ url: `${URL_KEYS.USER.ID}${user?._id}` });
  const UserData = data?.data;

  const [activeIndex, setActiveIndex] = useState<number | null>(null);

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
  ];
  const handleClick = (i: number, url: string, title: string) => {
    setActiveIndex(i);
    if (title === "Feedback") dispatch(setFeedbackModal());
    else if (title === "Support") dispatch(setSupportModal());
    else navigate(url);
    dispatch(setMenuDrawer());
  };
  const currentUser = UserData || user;

  const genderWiseImage =
    currentUser?.gender === "male"
      ? `${ImagePath}user/User_Male.png`
      : `${ImagePath}user/User_Female.png`;

  const ProfileImage = currentUser?.profileImage
    ? currentUser?.profileImage
    : genderWiseImage;
  return (
    <>
      <Drawer
        placement="right"
        open={isMenuDrawer}
        className="menu-drawer relative overflow-hidden"
        onClose={() => dispatch(setMenuDrawer())}
        extra={
          <div
            className="flex justify-between items-center rounded-xl h-10 sm:h-12 order-last"
            onClick={() => dispatch(setMenuDrawer())}
          >
            <div className="flex justify-between items-center gap-3 cursor-pointer">
              <img
                src={ProfileImage}
                alt="profile"
                className="w-12 h-12 rounded-xl"
              />
              <div>
                <span className="text-md font-semibold capitalize">
                  {UserData?.firstName} {UserData?.lastName}
                </span>
                <p className="capitalize flex text-xs">
                  {UserData?.userType === "admin" ? "Admin" : "Student"}
                </p>
              </div>
            </div>
          </div>
        }
      >
        <ul className="grid grid-cols-1 gap-3 relative z-20">
          {MenuData?.map((item, i) => (
            <li
              key={i}
              onClick={() => handleClick(i, item.url, item.title)}
              className={`border p-3 rounded-md cursor-pointer transition-colors duration-200 text-theme bg-input-box ${
                activeIndex === i
                  ? "border-primary !text-primary !bg-bg-light"
                  : "border-box-border hover:border-theme"
              }`}
            >
              <p className="font-semibold text-base flex items-center uppercase">
                <span className="me-3 text-2xl">{item.icon}</span>
                {item.title}
              </p>
            </li>
          ))}
        </ul>
      </Drawer>
      <FeedbackModal />
      <SupportModal />
    </>
  );
};

export default MenuDrawer;
