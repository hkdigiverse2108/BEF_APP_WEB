import { Drawer } from "antd";
import { useState } from "react";
import { BiWallet } from "react-icons/bi";
import { FaRegCircleQuestion } from "react-icons/fa6";
import { IoMailOutline, IoSchoolOutline, IoSettingsOutline } from "react-icons/io5";
import { LuTvMinimalPlay } from "react-icons/lu";
import { MdOutlineGavel, MdOutlineLock, MdOutlinePrivacyTip, MdOutlineVerified } from "react-icons/md";
import { TbWallet } from "react-icons/tb";
import { useNavigate } from "react-router-dom";
import { Href, ImagePath, ROUTES } from "../Constants";
import FeedbackModal from "../Pages/Feedback";
import SupportModal from "../Pages/Support";
import { useAppDispatch, useAppSelector } from "../Store/hooks";
import { setFeedbackModal, setMenuDrawer, setSupportModal } from "../Store/Slices/DrawerSlice";

const MenuDrawer = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const { isMenuDrawer } = useAppSelector((state) => state.drawer);
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const MenuData = [
    { icon: <TbWallet />, title: "Recharge", url: ROUTES.RECHARGE.RECHARGE },
    { icon: <IoSchoolOutline />, title: "Get Scholarship", url: ROUTES.GET_SCHOLARSHIP.GET_SCHOLARSHIP },
    { icon: <BiWallet />, title: "History", url: ROUTES.HISTORY.HISTORY },
    { icon: <IoSettingsOutline />, title: "My Info & Setting", url: ROUTES.MY_INFO.MY_INFO },
    { icon: <LuTvMinimalPlay />, title: "How to Play", url: ROUTES.HOW_TO_PLAY.HOW_TO_PLAY },
    { icon: <IoMailOutline />, title: "Support", url: Href },
    { icon: <MdOutlineVerified />, title: "KYC Verification", url: ROUTES.KYC.KYC },
    { icon: <MdOutlineLock />, title: "Terms & Conditions", url: ROUTES.TERMS_CONDITIONS.TERMS_CONDITIONS },
    { icon: <MdOutlinePrivacyTip />, title: "Privacy & Policy", url: ROUTES.PRIVACY_POLICY.PRIVACY_POLICY },
    { icon: <FaRegCircleQuestion />, title: "About US", url: ROUTES.ABOUT_US.ABOUT_US },
    { icon: <MdOutlineGavel />, title: "Illegality", url: ROUTES.ILLEGALITY.ILLEGALITY },
  ];
  const handleClick = (i: number, url: string, title: string) => {
    setActiveIndex(i);
    if (title === "Feedback") dispatch(setFeedbackModal());
    else if (title === "Support") dispatch(setSupportModal());
    else navigate(url);
  };

  return (
    <>
      <Drawer
        placement="right"
        open={isMenuDrawer}
        className="menu-drawer relative overflow-hidden"
        onClose={() => dispatch(setMenuDrawer())}
        extra={
          <div className="flex justify-between items-center rounded-xl h-10 sm:h-12 order-last" onClick={() => dispatch(setMenuDrawer())}>
            <div className="flex justify-between items-center gap-3 cursor-pointer">
              <img src={`${ImagePath}user/User1.png`} alt="profile" className="w-12 h-12 rounded-xl" />
              <div>
                <span className="text-md font-bold capitalize">AdminSetting</span>
                <p className="capitalize flex text-xs">AdminSetting</p>
              </div>
            </div>
          </div>
        }
      >
        <ul className="grid grid-cols-1 gap-3 relative z-20">
          {MenuData.map((item, i) => (
            <li key={i} onClick={() => handleClick(i, item.url, item.title)} className={`border p-3 rounded-md cursor-pointer transition-colors duration-200 text-theme bg-input-box ${activeIndex === i ? "border-primary !text-primary !bg-bg-light" : "border-box-border hover:border-theme"}`}>
              <p className="font-bold text-base flex items-center uppercase">
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
