import { useEffect, useState, useMemo, useRef } from "react";
import { Navigate, useParams, useLocation } from "react-router-dom";
import { useGetApiQuery } from "../../../Api/CommonApi";
import { FormButton } from "../../../Attribute/FormFields";
import MainLoader from "../../../Components/Common/MainLoader";
import ShareModal from "../../../Components/Common/ShareModal";
import CoursePurchaseDrawer from "../../../Components/Course/CoursePurchaseDrawer";
import CourseFaqsTab from "../../../Components/Course/Details/CourseFaqsTab";
import CourseLecturesTab from "../../../Components/Course/Details/CourseLecturesTab";
import CourseModuleTab from "../../../Components/Course/Details/CourseModuleTab";
import CourseTestsTab from "../../../Components/Course/Details/CourseTestsTab";
import DetailsAboutTab from "../../../Components/WorkshopCourseCommon/DetailsAboutTab";
import ContactContent from "../../../Components/WorkshopCourseCommon/ContactContent";
import { Popover } from "antd";
import {
  LuLayers,
  LuShieldCheck,
  LuInfo,
  LuCirclePlay,
  LuClipboardCheck,
  LuCircleHelp,
  LuDownload,
  LuPhone,
} from "react-icons/lu";
import { ROUTES, URL_KEYS } from "../../../Constants";
import { setCoursePurchaseDrawer } from "../../../Store/Slices/DrawerSlice";
import { setCourseFooterShow } from "../../../Store/Slices/FooterShowSlice";
import { useAppDispatch, useAppSelector } from "../../../Store/hooks";
import type { CourseDetailsApiResponse, ModuleType } from "../../../Types";

const TabsList = [
  { value: "about", label: "ABOUT", icon: LuInfo },
  { value: "lectures", label: "LECTURES", icon: LuCirclePlay },
  { value: "module", label: "MODULE", icon: LuLayers },
  { value: "tests", label: "TESTS", icon: LuClipboardCheck },
  { value: "faqs", label: "FAQS", icon: LuCircleHelp },
];

const CourseDetails = () => {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const queryTab = searchParams.get("tab");
  const isModuleRequested =
    queryTab === "module" ||
    (location.state as any)?.activeTab === "module" ||
    location.hash === "#modules";

  const [tabIndex, setTabIndex] = useState(() => (isModuleRequested ? "module" : "about"));
  const [imageLoaded, setImageLoaded] = useState(false);
  const hasAutoScrolledRef = useRef(false);

  useEffect(() => {
    if (isModuleRequested) {
      setTabIndex("module");
    }
  }, [isModuleRequested, location.search, location.hash, location.state]);

  const dispatch = useAppDispatch();
  const { CourseFooterShow } = useAppSelector((state) => state.FooterShow);

  const { id }: { id?: string } = useParams();

  const {
    data: courseData,
    isLoading: courseLoading,
    refetch,
  } = useGetApiQuery<CourseDetailsApiResponse>({
    url: `${URL_KEYS.COURSE.ID}${id}`,
  });
  const CourseDetailsData = courseData?.data;

  const { data: modulesData } = useGetApiQuery(
    { url: `${URL_KEYS.MODULE.ALL}?courseFilter=${CourseDetailsData?._id}` },
    { skip: !CourseDetailsData?._id }
  );
  const Modules: ModuleType[] = modulesData?.data?.module_data || [];

  const totalLecture = useMemo(
    () =>
      Modules?.reduce((sum: number, module: ModuleType) => sum + (Number(module.totalLecture) || 0), 0) ||
      CourseDetailsData?.totalLecture ||
      159,
    [Modules, CourseDetailsData]
  );

  const totalTest = useMemo(
    () =>
      Modules?.reduce((sum: number, module: ModuleType) => sum + (Number(module.totalTest) || 0), 0) ||
      CourseDetailsData?.totalTest ||
      137,
    [Modules, CourseDetailsData]
  );

  useEffect(() => {
    if (!courseLoading) {
      const isFooterShow = CourseDetailsData?.isUnlocked;
      dispatch(setCourseFooterShow(isFooterShow));
    }
  }, [courseLoading, CourseDetailsData?.isUnlocked, dispatch]);

  // When module tab is requested, scroll directly to modules section once data loads
  useEffect(() => {
    if (hasAutoScrolledRef.current) return;
    if (courseLoading) return;

    if (isModuleRequested) {
      hasAutoScrolledRef.current = true;
      setTabIndex("module");
      const timer = setTimeout(() => {
        const el = document.getElementById("modules-section");
        if (el) {
          el.scrollIntoView({ behavior: "smooth", block: "start" });
        }
      }, 300);
      return () => clearTimeout(timer);
    }
  }, [courseLoading, isModuleRequested]);

  // VideoObject Schema Injection for Google SEO Video Indexing (Audio transcript Line 330-333)
  useEffect(() => {
    if (!CourseDetailsData) return;
    const firstVideoModule = Modules.find((m) => !!m.link);
    const videoUrl = firstVideoModule?.link || "https://www.youtube.com/watch?v=placeholder";

    const schemaData = {
      "@context": "https://schema.org",
      "@type": "Course",
      "name": CourseDetailsData.title || "Sure Shot Prelims Batch",
      "description": CourseDetailsData.description?.replace(/<[^>]+>/g, "") || "UPSC Prelims Victory Course",
      "provider": {
        "@type": "Organization",
        "name": "Achiwon",
        "sameAs": "https://achiwon.com",
      },
      "hasCourseInstance": {
        "@type": "CourseInstance",
        "courseMode": "online",
        "instructor": [
          { "@type": "Person", "name": "Kartik Gondaliya" },
          { "@type": "Person", "name": "Krina Suhagya" },
        ],
      },
      ...(firstVideoModule?.link
        ? {
            "video": {
              "@type": "VideoObject",
              "name": firstVideoModule.name || CourseDetailsData.title,
              "description": firstVideoModule.subTitle || "Course module introduction lecture",
              "thumbnailUrl": [firstVideoModule.image || CourseDetailsData.image],
              "uploadDate": CourseDetailsData.createdAt || "2026-01-01T08:00:00+05:30",
              "embedUrl": videoUrl,
            },
          }
        : {}),
    };

    let scriptTag = document.getElementById("course-video-schema") as HTMLScriptElement | null;
    if (!scriptTag) {
      scriptTag = document.createElement("script");
      scriptTag.id = "course-video-schema";
      scriptTag.type = "application/ld+json";
      document.head.appendChild(scriptTag);
    }
    scriptTag.textContent = JSON.stringify(schemaData);

    return () => {
      const el = document.getElementById("course-video-schema");
      if (el) el.remove();
    };
  }, [CourseDetailsData, Modules]);

  if (courseLoading) return <MainLoader />;
  if (!CourseDetailsData) {
    return <Navigate to={ROUTES.COURSE.COURSE} replace />;
  }

  return (
    <div className={`sub-container space-y-8 pt-6 sm:pt-8 bg-white rounded-2xl ${!CourseFooterShow ? "pb-20 sm:pb-16" : "pb-12"}`}>
      {/* 1. TOP HERO / BANNER SECTION */}
      <section className="relative overflow-hidden rounded-2xl border border-gray-200 bg-gray-50 shadow-xs">
        {/* Mobile Share Action */}
        <div className="sm:hidden absolute top-3 right-3 z-10 flex gap-2">
          <ShareModal />
        </div>

        {CourseDetailsData?.image ? (
          <div className="relative aspect-16/9 sm:aspect-21/9 w-full overflow-hidden bg-gray-900">
            <img
              src={CourseDetailsData.image}
              alt={CourseDetailsData.title}
              onLoad={() => setImageLoaded(true)}
              className={`h-full w-full object-cover transition-opacity duration-300 ${
                imageLoaded ? "opacity-100" : "opacity-0"
              }`}
            />
          </div>
        ) : (
          /* Fallback Rich Victory Fest Hero Banner */
          <div className="flex min-h-[260px] sm:min-h-[380px] flex-col items-center justify-center bg-[#0F172A] px-4 py-8 text-center text-white">
            <span className="rounded-full bg-white px-4 py-1 text-xs sm:text-sm font-black text-[#0F172A]">
              MIN 60 MARKS DIRECT HIT GUARANTEE
            </span>
            <h2 className="mt-3 text-xl sm:text-3xl font-extrabold text-white">
              PRELIMS VICTORY FEST 2K26
            </h2>
            <h1 className="mt-1 text-3xl sm:text-6xl font-black text-[#F48224] tracking-tight">
              {CourseDetailsData.title || "LAST PRELIMS"}
            </h1>
            <p className="mt-3 rounded-lg bg-white/10 px-3 py-1 text-xs sm:text-sm font-bold text-gray-200">
              PAY FULL FEES ONLY AFTER YOU CLEAR PRELIMS!
            </p>
          </div>
        )}

        {/* Course Meta Info Bar */}
        <div className="p-4 sm:p-6 bg-white">
          <div className="flex flex-wrap items-center justify-end gap-3">
            {CourseDetailsData?.language && (
              <span className="rounded-md border border-gray-200 bg-gray-50 px-3 py-1 text-xs sm:text-sm font-semibold text-[#0F172A]">
                {CourseDetailsData.language}
              </span>
            )}

            <div className="hidden sm:block">
              <ShareModal />
            </div>
          </div>

          <div className="mt-3 flex items-center justify-between border-b border-gray-100 pb-4">
            <h1 className="text-xl sm:text-3xl font-extrabold text-[#0F172A]">
              {CourseDetailsData.title}
            </h1>
          </div>
        </div>
      </section>

      {/* 2. HIGHLIGHT CARDS (MODULES GRID + DIRECT HIT GUARANTEE) */}
      <section className="grid grid-cols-1 gap-5 lg:grid-cols-2">
        {/* Module summary card */}
        <article className="rounded-2xl border border-gray-200 bg-gradient-to-br from-[#124699]/5 to-[#F48224]/5 p-px shadow-xs transition-all hover:shadow-md">
          <div className="h-full rounded-2xl bg-[#F8FAFC] p-5">
            <div className="flex gap-4">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-white text-[#124699] shadow-2xs">
                <LuLayers className="text-2xl" />
              </div>
              <div className="flex-1">
                <h2 className="text-base sm:text-lg font-bold text-[#0F172A]">
                  Course Modules Overview
                </h2>
                <div className="mt-3 grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-2 text-xs sm:text-sm font-medium text-[#334155]">
                  {Modules.length > 0 ? (
                    Modules.slice(0, 10).map((module, i) => (
                      <span key={module._id || i} className="truncate">
                        {i + 1}. {module.name}
                      </span>
                    ))
                  ) : (
                    <>
                      <span>1. MCQ Aptitude Revolution</span>
                      <span>2. MCQ Aptitude Test</span>
                      <span>3. CSAT Course</span>
                      <span>4. Daily CSAT Practice</span>
                      <span>5. MAPPING &amp; HISTORICAL TERM</span>
                      <span>6. CURRENT AFFAIRS + PIB</span>
                      <span>7. POLITY + ECONOMY</span>
                      <span>8. ENV + GEO + SCI-TECH</span>
                      <span>9. ANCIENT, MEDIAEVAL &amp; MODERN</span>
                      <span>10. MEMORY TECHNIQUES</span>
                    </>
                  )}
                </div>
              </div>
            </div>
          </div>
        </article>

        {/* Guarantee card */}
        <article className="rounded-2xl border border-[#BFDBFE] bg-gradient-to-br from-[#EFF6FF] to-[#FFF7ED] p-5 shadow-xs transition-all hover:shadow-md flex items-center gap-4">
          <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-white text-[#124699] shadow-xs">
            <LuShieldCheck className="text-3xl text-[#124699]" />
          </div>
          <div className="flex-1">
            <span className="rounded-md bg-white px-2.5 py-0.5 text-[11px] font-extrabold text-[#124699] uppercase shadow-2xs">
              Confidence Promise
            </span>
            <div className="mt-1 space-y-1 text-sm sm:text-base font-extrabold leading-snug text-[#1E3A8A]">
              {CourseDetailsData?.courseMoneyBack ? (
                String(CourseDetailsData.courseMoneyBack)
                  .split(",")
                  .map((t) => t.trim())
                  .filter(Boolean)
                  .map((line, idx) => (
                    <p key={idx} className="leading-snug">
                      {line}
                    </p>
                  ))
              ) : (
                <p>Minimum 60-Marks Direct Hit Guarantee Enjoy 100% Free COURSE</p>
              )}
            </div>
          </div>
        </article>
      </section>

      {/* 3. 5-TAB HORIZONTAL HEADER NAVIGATION */}
      <section id="modules-section" className="border-b border-gray-200 scroll-mt-24">
        <div className="flex overflow-x-auto scrollbar-none gap-2 pb-px">
          {TabsList.map(({ value, label, icon: Icon }) => {
            const isActive = tabIndex === value;
            return (
              <button
                key={value}
                type="button"
                onClick={() => setTabIndex(value)}
                className={`relative flex shrink-0 items-center gap-2 px-5 py-3.5 text-xs sm:text-sm font-bold tracking-wide transition-all cursor-pointer rounded-t-xl ${
                  isActive
                    ? "bg-[#EDF4FF] text-[#124699] after:absolute after:bottom-0 after:left-0 after:right-0 after:h-0.5 after:bg-[#F48224]"
                    : "text-[#64748B] hover:bg-gray-50 hover:text-[#0F172A]"
                }`}
              >
                <Icon className={`text-base ${isActive ? "text-[#124699]" : "text-gray-400"}`} />
                <span>{label}</span>
              </button>
            );
          })}
        </div>
      </section>

      {/* 4. MAIN TAB BODY WITH DESKTOP SIDEBAR + CONTENT AREA */}
      <section className="py-2">
        <div className="flex flex-col gap-6 lg:flex-row">
          {/* Desktop Left Sticky Navigation Sidebar (matching reference frames) */}
          <aside className="h-fit shrink-0 rounded-2xl border border-gray-200 bg-white p-3 lg:sticky lg:top-24 lg:w-60 shadow-2xs">
            <div className="flex gap-1 overflow-x-auto lg:flex-col">
              {TabsList.map(({ value, label, icon: Icon }) => {
                const isActive = tabIndex === value;
                return (
                  <button
                    key={value}
                    type="button"
                    onClick={() => setTabIndex(value)}
                    className={`flex shrink-0 items-center gap-3 rounded-xl px-4 py-3 text-left text-xs sm:text-sm transition-all cursor-pointer ${
                      isActive
                        ? "border-l-[3px] border-[#F48224] bg-[#EDF4FF] font-extrabold text-[#124699] shadow-2xs"
                        : "font-semibold text-[#64748B] hover:bg-[#F8FAFC] hover:text-[#124699]"
                    }`}
                  >
                    <Icon className={`text-lg ${isActive ? "text-[#124699]" : "text-gray-400"}`} />
                    <span>{label}</span>
                  </button>
                );
              })}
            </div>
          </aside>

          {/* Active Tab View */}
          <div className="min-w-0 flex-1">
            {tabIndex === "about" && (
              <DetailsAboutTab
                data={{
                  pdf: CourseDetailsData?.pdf || "",
                  totalLecture: totalLecture,
                  description: CourseDetailsData?.description || "",
                  totalTest: totalTest,
                }}
              />
            )}
            {tabIndex === "lectures" && (
              <CourseLecturesTab
                isUnlocked={CourseDetailsData?.isUnlocked}
                Modules={Modules}
              />
            )}
            {tabIndex === "module" && (
              <CourseModuleTab id={CourseDetailsData?._id} />
            )}
            {tabIndex === "tests" && (
              <CourseTestsTab
                Modules={Modules}
                isUnlocked={CourseDetailsData?.isUnlocked}
              />
            )}
            {tabIndex === "faqs" && <CourseFaqsTab />}
          </div>
        </div>

        {/* Full-width Download Brochure CTA below tabs */}
        {CourseDetailsData?.pdf && (
          <div className="mt-8">
            <a
              href={CourseDetailsData.pdf}
              target="_blank"
              rel="noopener noreferrer"
              className="flex min-h-13 w-full items-center justify-center gap-2.5 rounded-xl border-2 border-[#124699] bg-white px-5 py-3 font-bold text-xs sm:text-sm text-[#124699] transition-all hover:bg-[#124699] hover:text-white hover:shadow-md cursor-pointer uppercase"
            >
              <LuDownload className="text-lg" />
              <span>DOWNLOAD OFFICIAL COURSE BROCHURE</span>
            </a>
          </div>
        )}
      </section>

      {/* 5. FLOATING COUNSELLOR CALL POPUP BUTTON */}
      <div className="fixed bottom-18 sm:bottom-16 right-4 sm:right-6 z-40">
        <Popover content={<ContactContent />} trigger="click" placement="topLeft">
          <button
            type="button"
            aria-label="Talk to counsellor"
            title="Talk to an academic counsellor"
            className="flex h-11 w-11 sm:h-12 sm:w-12 items-center justify-center rounded-full bg-[#124699] text-white shadow-lg transition-all duration-300 hover:scale-105 hover:bg-[#0E3678] cursor-pointer"
          >
            <LuPhone className="text-lg sm:text-xl" />
          </button>
        </Popover>
      </div>

      {/* 6. FIXED BOTTOM JOIN NOW / PRICING SECTION (Compact & Sleek) */}
      {!CourseDetailsData?.isUnlocked && (
        <section className="fixed bottom-0 left-0 right-0 z-30 bg-white/95 backdrop-blur-md border-t border-gray-200 shadow-[0_-4px_16px_rgba(0,0,0,0.06)]">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-2 sm:py-2.5 flex items-center justify-between gap-3 sm:gap-6">
            <div>
              <p className="text-[10px] sm:text-[11px] font-semibold uppercase tracking-wider text-[#64748B] leading-none mb-0.5">
                Enrollment Fees
              </p>
              {CourseDetailsData?.discountPrice ? (
                <div className="flex items-baseline gap-1 sm:gap-1.5 leading-none">
                  <span className="text-base sm:text-lg font-black text-[#124699]">
                    ₹{CourseDetailsData?.payingPrice?.toLocaleString()}
                  </span>
                  <span className="text-[11px] text-gray-500 font-semibold">
                    / ₹{CourseDetailsData?.discountPrice?.toLocaleString()}
                  </span>
                  <span className="text-[10px] text-red-500 line-through">
                    ₹{CourseDetailsData?.price?.toLocaleString()}
                  </span>
                </div>
              ) : (
                <div className="flex items-baseline gap-1 sm:gap-1.5 leading-none">
                  <span className="text-base sm:text-lg font-black text-[#124699]">
                    ₹{CourseDetailsData?.payingPrice?.toLocaleString()}
                  </span>
                  <span className="text-[10px] text-red-500 line-through">
                    ₹{CourseDetailsData?.price?.toLocaleString()}
                  </span>
                </div>
              )}
            </div>

            <div className="hidden md:block">
              <p className="text-[11px] font-bold text-emerald-700 bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-200">
                {CourseDetailsData?.priceInStruction || "Pay remaining full fee only after clearing Prelims!"}
              </p>
            </div>

            <div className="shrink-0">
              <FormButton
                onClick={() => {
                  dispatch(setCoursePurchaseDrawer());
                }}
                htmlType="submit"
                text="Join Now"
                className="custom-button button button--mimas !h-9 sm:!h-10 !px-6 sm:!px-8 !text-xs sm:!text-sm !font-bold"
              />
            </div>
          </div>
        </section>
      )}

      {/* 7. PURCHASE DRAWER MODAL */}
      <CoursePurchaseDrawer
        data={{
          id: CourseDetailsData?._id,
          title: CourseDetailsData?.title,
          priceInStruction: CourseDetailsData?.priceInStruction,
          price: {
            discountPrice: CourseDetailsData?.discountPrice,
            payingPrice: CourseDetailsData?.payingPrice,
            price: CourseDetailsData?.price,
          },
          modulesData: Modules,
        }}
        refetch={refetch}
      />
    </div>
  );
};

export default CourseDetails;
