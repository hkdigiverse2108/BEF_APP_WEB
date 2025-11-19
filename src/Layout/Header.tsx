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
import {
  setworkshopLoading,
  setWorkshops,
} from "../Store/Slices/WorkshopSlice";
import { getHeaderItems } from "../Utils/GetHeaderItems";

const Header = () => {
  const dispatch = useAppDispatch();
  const [isScrolled, setIsScrolled] = useState(false);

  const { genderWiseProfileImage ,user} = useAppSelector((state) => state.auth);
  // const user = JSON.parse(Storage.getItem(STORAGE_KEYS.USER) || "{}");

  const { data } = useGetApiQuery({ url: `${URL_KEYS.USER.ID}${user?._id}` });
  const UserData = data?.data;

  const { data: workshopData, isLoading: workshopLoading } = useGetApiQuery({
    url: `${URL_KEYS.WORKSHOP.ALL}`,
  });
  const workshop = workshopData?.data?.workshop_data || [];

  const HeaderMenu = getHeaderItems();

  const updateSidebarBasedOnWidth = () => {
    const windowWidth = window.innerWidth;
    if (windowWidth > 1535) {
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

  // const genderWiseProfileImage =
  //   currentUser?.gender === "male"
  //     ? `${ImagePath}user/User_Male.png`
  //     : `${ImagePath}user/User_Female.png`;

  const ProfileImage = currentUser?.profileImage
    ? currentUser?.profileImage
    : genderWiseProfileImage;

  return (
    <>
      <div className="sticky top-0 w-full z-50">
        <header
          className={`min-h-[60px] tracking-wide relative z-50 ${
            isScrolled ? "bg-white/90 backdrop-blur-md" : ""
          }`}
        >
          <div className="flex flex-wrap items-center justify-between max-sm:px-2 py-3 px-4 sm:px-10 2xl:gap-y-4 gap-y-6 gap-x-4">
            <Link
              to={ROUTES.HOME}
              className="flex max-sm:gap-1.5 gap-2.5 items-center"
            >
              <figure className="w-9 sm:w-12 md:w-16 h-full">
                <img
                  src={`${ImagePath}logo/Logo.png`}
                  alt="BEF-Logo"
                  className="w-full h-full object-contain"
                />
              </figure>
              <section className="flex flex-col justify-center">
                <h1 className="text-[10px] md:text-lg text-primary font-bold sm:font-extrabold">
                  Bharat Exam Fest
                </h1>
                <p className="text-[10px] md:text-sm font-medium text-success ">
                  Learn & Earn
                </p>
              </section>
            </Link>
            <div
              id="collapseMenu"
              className="max-2xl:hidden 2xl:flex! 2xl:items-center max-2xl:before:fixed max-2xl:before:bg-black max-2xl:before:opacity-40 max-2xl:before:inset-0 max-2xl:before:z-50"
            >
              <ul className="2xl:flex! 2xl:gap-x-10 max-2xl:space-y-3 max-2xl:fixed max-2xl:bg-theme-bg max-2xl:w-1/2 max-2xl:min-w-[300px] max-2xl:top-0 max-2xl:left-0 max-2xl:px-10 max-2xl:py-4 max-2xl:h-full max-2xl:shadow-md max-2xl:overflow-auto z-50">
                <li className="mb-6 hidden max-2xl:block">
                  <div className="flex justify-between items-center">
                    <div className="flex gap-4 items-center">
                      <figure className="w-12 sm:w-18 h-full">
                        <img
                          src={`${ImagePath}logo/Logo.png`}
                          alt="BEF-Logo"
                          className="w-full h-full object-contain"
                        />
                      </figure>
                      <section className="flex flex-col justify-center max-md:hidden">
                        <h1 className="text-sm sm:text-xl text-primary font-bold">
                          Bharat Exam Fest
                        </h1>
                        <p className="text-xs sm:text-sm text-success font-medium">
                          Learn & Earn
                        </p>
                      </section>
                    </div>
                  </div>
                </li>
                <ul className="flex gap-8">
                  {HeaderMenu?.map((item, index) => (
                    <li
                      key={index}
                      className="max-2xl:py-3  relative hover:after:absolute after:bg-theme! after:w-0 hover:after:w-full hover:after:h-0.5 after:block after:-bottom-1 2xl:after:-bottom-4 after:transition-all after:duration-300"
                    >
                      <NavLink
                        to={item.link}
                        className="block text-lg text-base capitalize "
                      >
                        {item.text}
                      </NavLink>
                    </li>
                  ))}
                </ul>
              </ul>
            </div>
            <div className="flex items-center max-sm:ml-auto">
              <ul className="flex space-x-4 gap-2">
                {/* <li className="relative m-0 p-1 w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-input-box group">
                  <div className="flex items-center justify-center w-full h-full">
                    <span className="inline-block transform-gpu transition-transform duration-200 ease-out group-hover:scale-110 group-hover:animate-pulse origin-center">
                      <IoSearch className="w-5 h-5 sm:w-6 sm:h-6" />
                    </span>
                  </div>
                </li> */}
                <li className="relative m-0 p-1 w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-input-box group">
                  <div className="flex items-center justify-center w-full h-full">
                    <span className="inline-block transform-gpu transition-transform duration-200 ease-out group-hover:scale-110 group-hover:animate-pulse origin-center">
                      <HiOutlineBellAlert className="w-5 h-5 sm:w-6 sm:h-6" />
                    </span>
                  </div>
                </li>
                {/* <li className="relative px-1 lg:hover:after:absolute lg:after:bg-black lg:after:w-0 lg:hover:after:w-full lg:hover:after:h-[2px] lg:after:block lg:after:-bottom-4 lg:after:transition-all lg:after:duration-300">
              <span className="relative">
                <svg xmlns="http://www.w3.org/2000/svg" width="24px" height="24px" className="cursor-pointer fill-black inline-block" viewBox="0 0 512 512">
                  <path d="M164.96 300.004h.024c.02 0 .04-.004.059-.004H437a15.003 15.003 0 0 0 14.422-10.879l60-210a15.003 15.003 0 0 0-2.445-13.152A15.006 15.006 0 0 0 497 60H130.367l-10.722-48.254A15.003 15.003 0 0 0 105 0H15C6.715 0 0 6.715 0 15s6.715 15 15 15h77.969c1.898 8.55 51.312 230.918 54.156 243.71C131.184 280.64 120 296.536 120 315c0 24.812 20.188 45 45 45h272c8.285 0 15-6.715 15-15s-6.715-15-15-15H165c-8.27 0-15-6.73-15-15 0-8.258 6.707-14.977 14.96-14.996zM477.114 90l-51.43 180H177.032l-40-180zM150 405c0 24.813 20.188 45 45 45s45-20.188 45-45-20.188-45-45-45-45 20.188-45 45zm45-15c8.27 0 15 6.73 15 15s-6.73 15-15 15-15-6.73-15-15 6.73-15 15-15zm167 15c0 24.813 20.188 45 45 45s45-20.188 45-45-20.188-45-45-45-45 20.188-45 45zm45-15c8.27 0 15 6.73 15 15s-6.73 15-15 15-15-6.73-15-15 6.73-15 15-15zm0 0" data-original="#000000" />
                </svg>
                <span className="absolute left-auto -ml-1 -top-1 rounded-full bg-red-500 px-1 py-0 text-xs text-black">0</span>
              </span>
            </li> */}
                <li className="group relative py-1 px-1.5 sm:px-2.5 flex justify-between items-center rounded-xl h-10 sm:h-12 bg-input-box">
                  <div
                    className="flex justify-between items-center gap-3"
                    onClick={() => dispatch(setMenuDrawer())}
                  >
                    <img
                      src={ProfileImage}
                      alt="profile"
                      className="w-11 h-11 rounded-xl"
                    />
                    <div className="flex-1 hidden max-2xl:max-w-35 sm:block max-w-28 truncate">
                      <span className="text-md font-semibold capitalize  ">
                        {UserData?.firstName} {UserData?.lastName}
                      </span>
                      <p className="capitalize flex text-xs">
                        {UserData?.userType === "admin" ? "Admin" : "Student"}
                      </p>
                    </div>
                    <IoIosArrowDown className="hidden sm:block " />
                  </div>
                  {/* <ul className="absolute top-17 max-lg:top-10 -left-0 z-50 block space-y-2 shadow-lg rounded-xl bg-white max-h-0 overflow-hidden min-w-[230px] group-hover:opacity-100 group-hover:max-h-[700px] px-6 group-hover:pb-4 group-hover:pt-6 transition-all duration-[400ms]">
                  <li className="border-b border-gray-300 py-3">
                    <p onClick={() => dispatch(LogOut())} className=" text-slate-900 font-normal text-[15px] flex items-center">
                      <BiLogOutCircle className="pe-2 text-3xl" />
                      Logout
                    </p>
                  </li>
                </ul> */}
                </li>
              </ul>
              <button
                id="toggleOpen"
                onClick={() => dispatch(setNavMenuDrawer(true))}
                className="2xl:hidden ml-2 cursor-pointer p-1 flex justify-center items-center rounded-xl w-10 sm:w-12 h-10 sm:h-12 bg-input-box"
              >
                <HiOutlineBars3BottomRight className="text-xl sm:text-2xl" />
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
