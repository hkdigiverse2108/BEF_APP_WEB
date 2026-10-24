import { useEffect, useState } from "react";
import { HiOutlineBars3BottomRight, HiOutlineBellAlert } from "react-icons/hi2";
import { IoIosArrowDown } from "react-icons/io";
import { Link, NavLink } from "react-router-dom";
import { useGetApiQuery } from "../Api/CommonApi";
import { ImagePath, ROUTES, URL_KEYS } from "../Constants";
import { useAppDispatch, useAppSelector } from "../Store/hooks";
import { setMenuDrawer, setNavMenuDrawer } from "../Store/Slices/DrawerSlice";
import MenuDrawer from "./MenuDrawer";
import NavMenuDrawer from "./NavMenuDrawer";
import { setworkshopLoading, setWorkshops } from "../Store/Slices/WorkshopSlice";
import { getHeaderItems } from "../Utils/GetHeaderItems";
import ExamTimer from "../Components/Common/ExamTimer";

const Header = () => {
  const dispatch = useAppDispatch();
  const [isScrolled, setIsScrolled] = useState(false);

  const { genderWiseProfileImage, user } = useAppSelector((state) => state.auth);

  const { data } = useGetApiQuery({ url: `${URL_KEYS.USER.ID}${user?._id}` });
  const UserData = data?.data;

  const { data: workshopData, isLoading: workshopLoading } = useGetApiQuery({
    url: `${URL_KEYS.WORKSHOP.ALL}`,
  });
  const workshop = workshopData?.data?.workshop_data || [];

  const HeaderMenu = getHeaderItems();

  const updateSidebarBasedOnWidth = () => {
    const windowWidth = window.innerWidth;
    if (windowWidth >= 1024) {
      dispatch(setNavMenuDrawer(false));
    }
  };

  useEffect(() => {
    dispatch(setWorkshops(workshop));
    dispatch(setworkshopLoading(workshopLoading));
  }, [workshopLoading]);

  useEffect(() => {
    updateSidebarBasedOnWidth();
    window.addEventListener("resize", () => updateSidebarBasedOnWidth());
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const currentUser = UserData || user;

  const ProfileImage = currentUser?.profileImage ? currentUser?.profileImage : genderWiseProfileImage;

  return (
    <>
      <div className="sticky top-0 w-full z-50">
        {/* Timer For Exam */}
        <ExamTimer />
        <header className={`bg-card border-b border-border shadow-sm relative z-50 ${isScrolled ? "bg-card/90 backdrop-blur-md" : ""}`}>
          <div className="container container-p mx-auto min-h-20 flex items-center justify-between gap-4 sm:gap-6 py-3">
            <Link to={ROUTES.HOME} className="flex items-center gap-3 shrink-0 py-1">
              {/* <span className="hidden sm:flex w-11 h-11 rounded-xl bg-secondary border border-border items-center justify-center shadow-sm overflow-hidden">
                <img src={`${ImagePath}logo/Logo.png`} alt="Achiwon" className="h-8 w-8 object-contain" />
              </span> */}
              <span className="flex flex-col items-start justify-center">
                <img src={`${ImagePath}logo/Logo.png`} alt="Achiwon" className="h-6 sm:h-7 w-auto object-contain" />
                <span className="text-[10px] font-semibold text-success tracking-wider leading-none mt-1">UPSC & GPSC CSE</span>
              </span>
            </Link>
            <nav className="hidden lg:flex items-center gap-6 text-sm font-medium">
              {HeaderMenu?.map((item, index) => (
                <NavLink key={index} to={item.link} className="py-7 border-b-2 border-transparent hover:text-accent transition-all duration-300 capitalize">
                  {item.text}
                </NavLink>
              ))}
            </nav>
            <div className="flex items-center gap-3">
              <button aria-label="Notifications" className="hidden sm:flex w-10 h-10 rounded-xl bg-secondary border border-transparent items-center justify-center text-primary transition-all duration-300 hover:border-accent hover:text-accent">
                <HiOutlineBellAlert className="w-5 h-5" />
              </button>
              <button onClick={() => dispatch(setMenuDrawer())} className="flex items-center gap-2 rounded-xl bg-secondary border border-border py-2 px-3 transition-all duration-300 hover:border-accent">
                <img src={ProfileImage} alt="profile" className="w-8 h-8 rounded-full object-cover" />
                <span className="hidden md:block text-left">
                  <span className="block text-xs font-bold leading-4 truncate max-w-28">
                    {UserData?.firstName} {UserData?.lastName}
                  </span>
                  <span className="block text-[10px] text-muted-foreground capitalize">{UserData?.userType === "admin" ? "Admin" : "Student"}</span>
                </span>
                <IoIosArrowDown className="hidden md:block text-muted-foreground" />
              </button>
              <button id="toggleOpen" aria-label="Open menu" onClick={() => dispatch(setNavMenuDrawer(true))} className="lg:hidden cursor-pointer flex justify-center items-center rounded-xl w-10 h-10 bg-secondary text-primary transition-all duration-300 hover:border hover:border-accent">
                <HiOutlineBars3BottomRight className="text-xl" />
              </button>
            </div>
          </div>
        </header>
      </div>
      <MenuDrawer />
      <NavMenuDrawer />
    </>
  );
};

export default Header;
