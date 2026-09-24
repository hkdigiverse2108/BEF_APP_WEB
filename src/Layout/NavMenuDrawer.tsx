import { Drawer } from "antd";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ImagePath } from "../Constants";
import { useAppDispatch, useAppSelector } from "../Store/hooks";
import { setNavMenuDrawer } from "../Store/Slices/DrawerSlice";
import { getHeaderItems } from "../Utils/GetHeaderItems";

const NavMenuDrawer = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const { isNavMenuDrawer } = useAppSelector((state) => state.drawer);
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const HeaderMenu = getHeaderItems();

  const handleClick = (i: number, url: string) => {
    setActiveIndex(i);
    navigate(url);
    dispatch(setNavMenuDrawer(false));
  };

  return (
    <Drawer
      placement="left"
      open={isNavMenuDrawer}
      className="menu-drawer relative overflow-hidden"
      onClose={() => dispatch(setNavMenuDrawer(false))}
      extra={
        <div className="flex flex-col items-start justify-center py-1">
          <img
            src={`${ImagePath}logo/Logo.png`}
            alt="Achiwon"
            className="h-8 sm:h-9 w-auto object-contain"
          />
          <p className="text-[10px] sm:text-xs text-success font-semibold tracking-wider leading-none mt-1">
            UPSC & GPSC CSE
          </p>
        </div>
      }
    >
      <ul className="grid grid-cols-1 gap-3 relative z-20">
        {HeaderMenu?.map((item, i) => (
          <li
            key={i}
            onClick={() => handleClick(i, item.link)}
            className={`flex min-h-14 w-full items-center rounded-xl border px-5 text-left font-semibold cursor-pointer transition-all duration-300 ${
              activeIndex === i
                ? "border-primary text-primary bg-bg-light"
                : "border-border bg-secondary hover:border-accent hover:bg-card hover:text-accent"
            }`}
          >
            <p className="font-semibold text-sm sm:text-base uppercase truncate">
              {item.text}
            </p>
          </li>
        ))}
      </ul>
    </Drawer>
  );
};

export default NavMenuDrawer;
