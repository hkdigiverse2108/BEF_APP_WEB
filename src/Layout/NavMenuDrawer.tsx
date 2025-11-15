import { Drawer } from "antd";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ImagePath } from "../Constants";
import { HeaderMenu } from "../Data";
import { useAppDispatch, useAppSelector } from "../Store/hooks";
import { setNavMenuDrawer } from "../Store/Slices/DrawerSlice";

const NavMenuDrawer = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const { isNavMenuDrawer } = useAppSelector((state) => state.drawer);
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const handleClick = (i: number, url: string) => {
    setActiveIndex(i);
    navigate(url);
    dispatch(setNavMenuDrawer(false))
  };

  return (
    <Drawer
      placement="left"
      open={isNavMenuDrawer}
      className="menu-drawer relative overflow-hidden"
      onClose={() => dispatch(setNavMenuDrawer(false))}
      extra={
        <div className="flex gap-4 items-center">
          <figure className="w-9 sm:w-15 h-full">
            <img src={`${ImagePath}logo/Logo.png`} alt="BEF-Logo" className="w-full h-full object-contain" />
          </figure>
          <section className="flex flex-col justify-center">
            <h1 className="text-sm sm:text-xl text-primary font-bold">Bharat Exam Fest</h1>
            <p className="text-xs sm:text-sm text-success font-medium">Learn & Earn</p>
          </section>
        </div>
      }
    >
      <ul className="grid grid-cols-1 gap-3 relative z-20">
        {HeaderMenu?.map((item, i) => (
          <li key={i} onClick={() => handleClick(i, item.link)} className={`border p-3 rounded-md cursor-pointer transition-colors duration-200 text-theme bg-input-box ${activeIndex === i ? "border-primary !text-primary !bg-bg-light" : "border-box-border hover:border-theme"}`}>
            <p className="font-semibold text-base flex items-center uppercase">
              {/* <span className="me-3 text-2xl">{item.text}</span> */}
              {item.text}
            </p>
          </li>
        ))}
      </ul>
    </Drawer>
  );
};

export default NavMenuDrawer;
