import { useState } from "react";
import { Drawer } from "antd";
import { BiWallet } from "react-icons/bi";
import { IoMailOutline, IoSchoolOutline, IoSettingsOutline } from "react-icons/io5";
import { PiMonitorPlayLight } from "react-icons/pi";
import { RiUserAddLine } from "react-icons/ri";
import { TbWallet } from "react-icons/tb";
import { ImagePath, ROUTES } from "../Constants";
import { useAppDispatch, useAppSelector } from "../Store/hooks";
import { setMenuDrawer } from "../Store/Slices/DrawerSlice";
import { useNavigate } from "react-router-dom";

const MenuDrawer = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const { isMenuDrawer } = useAppSelector((state) => state.drawer);
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const MenuData = [
    { icon: <TbWallet />, title: "Recharge", url: ROUTES.RECHARGE },
    { icon: <IoSchoolOutline />, title: "Get Scholarship", url: ROUTES.HOME },
    { icon: <IoSettingsOutline />, title: "My Info & Setting", url: ROUTES.MY_INFO },
    { icon: <BiWallet />, title: "Add cash", url: ROUTES.HOME },
    { icon: <RiUserAddLine />, title: "Refer a Friend", url: ROUTES.HOME },
    { icon: <PiMonitorPlayLight />, title: "How to Play", url: ROUTES.HOME },
    { icon: <IoMailOutline />, title: "Support", url: ROUTES.HOME },
  ];
  const handleClick = (i: number, url: string) => {
    setActiveIndex(i);
    navigate(url);
  };

  return (
    <Drawer
      placement="right"
      open={isMenuDrawer}
      className="menu-drawer relative overflow-hidden"
      onClose={() => dispatch(setMenuDrawer())}
      extra={
        <li className="flex justify-between items-center rounded-xl h-10 sm:h-12 order-last" onClick={() => dispatch(setMenuDrawer())}>
          <div className="flex justify-between items-center gap-3 cursor-pointer">
            <img src={`${ImagePath}user/User1.png`} alt="profile" className="w-12 h-12 rounded-xl" />
            <div>
              <span className="text-md font-bold capitalize">AdminSetting</span>
              <p className="capitalize flex text-xs">AdminSetting</p>
            </div>
          </div>
        </li>
      }
    >
      <ul className="grid grid-cols-1 gap-3 relative z-20">
        {MenuData.map((item, i) => (
          <li
            key={i}
            onClick={() => handleClick(i, item.url)}
            className={`border p-3 rounded-md cursor-pointer transition-colors duration-200 
        ${activeIndex === i ? "border-primary text-primary bg-primary/5" : "border-card-border hover:border-primary hover:text-primary"}`}
          >
            <p className="font-bold text-base flex items-center uppercase">
              <div className="me-3 text-2xl">{item.icon}</div>
              {item.title}
            </p>
          </li>
        ))}
      </ul>
      {/* <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 z-20">
        <img src={`${ImagePath}menu/Menu.png`} alt="Menu" className="object-cover !z-20  w-[200px]" />
      </div> */}

      {/* <div className="absolute bottom-0 left-0 w-full">
        <img src={`${ImagePath}menu/Menu-bg.png`} alt="Menu bg" className="w-full h-full object-cover z-0" />
      </div> */}
    </Drawer>
  );
};

export default MenuDrawer;
