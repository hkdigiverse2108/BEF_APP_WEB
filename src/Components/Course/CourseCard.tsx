import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { Popover } from "antd";
import {
  LuPhone,
  LuShieldCheck,
  LuArrowRight,
  LuCheck,
} from "react-icons/lu";
import { ROUTES, getCourseUrl } from "../../Constants";
import type { CourseItem } from "../../Types";
import ContactContent from "../WorkshopCourseCommon/ContactContent";

export const CourseCard: React.FC<{ data: CourseItem; showEnrolledBadge?: boolean }> = ({
  data,
  showEnrolledBadge = true,
}) => {
  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageError, setImageError] = useState(false);

  const {
    _id = "",
    title = "Sure Shot Prelims",
    image = "",
    language = "English",
    courseMoneyBack = "",
    isUnlocked = false,
  } = data || {};

  const targetUrl = _id ? getCourseUrl(_id) : ROUTES.COURSE.COURSE;
  const moduleUrl = _id ? `${getCourseUrl(_id)}?tab=module#modules` : ROUTES.COURSE.COURSE;

  return (
    <article className="group flex flex-col overflow-hidden rounded-2xl border border-[#E2E8F0] bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">
      {/* Top Course Image with rounded top corners - fixed to prevent cropping */}
      <div className="relative w-full aspect-video rounded-t-2xl overflow-hidden bg-slate-900">
        <NavLink to={targetUrl} className="relative block w-full h-full overflow-hidden">
          {image && !imageError ? (
            <>
              {/* Blurred ambient backdrop so any aspect ratio blends seamlessly without empty borders */}
              <img
                src={image}
                alt=""
                aria-hidden="true"
                className="absolute inset-0 w-full h-full object-cover blur-md opacity-35 scale-110 pointer-events-none"
              />
              <img
                src={image}
                alt={title || "Course Banner"}
                onLoad={() => setImageLoaded(true)}
                onError={() => setImageError(true)}
                className={`relative z-1 w-full h-full object-contain transition-opacity duration-300 ${
                  imageLoaded ? "opacity-100" : "opacity-0"
                }`}
              />
            </>
          ) : (
            <div className="w-full h-full flex flex-col items-center justify-center bg-gradient-to-br from-[#123b85] to-[#1d55b7] text-white p-4 text-center">
              <span className="text-xs uppercase tracking-wider font-semibold text-orange-300 mb-1">
                Achiwon Course
              </span>
              <h3 className="font-extrabold text-sm sm:text-base line-clamp-2">
                {title || "Course Details"}
              </h3>
            </div>
          )}
        </NavLink>

        {/* Right Corner: Language Badge */}
        {language && (
          <div className="absolute top-2.5 right-2.5 z-10 pointer-events-none">
            <span className="rounded-full bg-white/95 backdrop-blur-md px-3 py-1 text-xs font-bold text-[#0F172A] shadow-xs border border-black/5">
              {language}
            </span>
          </div>
        )}

        {/* Left Corner: Enrolled / Unlocked status */}
        {isUnlocked && showEnrolledBadge && (
          <div className="absolute top-2.5 left-2.5 z-10 pointer-events-none">
            <span className="flex items-center gap-1 rounded-full bg-emerald-600 px-2.5 py-1 text-[11px] font-black text-white shadow-sm">
              <LuCheck className="text-xs" /> Enrolled
            </span>
          </div>
        )}
      </div>

      {/* Card Body */}
      <div className="flex flex-1 flex-col p-5">
        {/* Module Details Direct Link (Opens Course Details with Module Tab) */}
        <NavLink
          to={moduleUrl}
          state={{ activeTab: "module" }}
          className="group/module flex w-full items-center justify-between rounded-xl border border-[#E8EDF5] bg-[#F8FAFF] px-3.5 py-2.5 text-xs font-extrabold text-[#27538F] transition-all duration-200 hover:-translate-y-0.5 hover:border-[#B8D2FF] hover:bg-[#EAF3FF] hover:text-[#124699] cursor-pointer"
          title="Click to view all modules and syllabus in course"
        >
          <span className="flex items-center gap-1.5">
            <span>⚙</span>
            <span>Module Details</span>
          </span>
          <span className="text-[11px] font-extrabold text-[#ED8538] transition-transform duration-200 group-hover/module:translate-x-0.5">
            View modules →
          </span>
        </NavLink>

        {/* Guarantee Callout Banner */}
        <div className="mt-3 flex items-center gap-3 rounded-xl border border-[#BFDBFE] bg-[#EFF6FF] p-3 text-[#1E40AF]">
          <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-white text-[#124699] shadow-xs">
            <LuShieldCheck className="text-lg" />
          </span>
          <div className="text-[11px] sm:text-xs font-bold leading-tight text-[#1E3A8A] space-y-0.5">
            {courseMoneyBack ? (
              String(courseMoneyBack)
                .replace(/60-\s*Marks/gi, "60+ Marks")
                .split(",")
                .map((t) => t.trim())
                .filter(Boolean)
                .map((line, idx) => (
                  <p key={idx}>{line}</p>
                ))
            ) : (
              <p>Minimum 60+ Marks Direct Hit Guarantee, otherwise 100% refund</p>
            )}
          </div>
        </div>

        {/* Bottom CTA Button & Call Support Button */}
        <div className="mt-5 pt-2 flex items-center gap-2.5">
          <NavLink
            to={targetUrl}
            className="group flex flex-1 min-h-11 items-center justify-center gap-2 rounded-xl border-2 border-[#F48224] bg-white text-xs sm:text-sm font-bold text-[#0F172A] shadow-xs transition-all duration-200 hover:bg-[#F48224] hover:text-white hover:shadow-md cursor-pointer"
          >
            <span>{isUnlocked ? "GO TO COURSE" : "VIEW BATCH DETAILS"}</span>
            <LuArrowRight className="text-base text-[#F48224] transition-transform group-hover:translate-x-1 group-hover:text-white" />
          </NavLink>
          <Popover
            content={<ContactContent />}
            trigger="click"
            placement="topRight"
          >
            <button
              type="button"
              aria-label="Call a counsellor"
              title="Call counsellor"
              className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border-2 border-[#F48224] bg-[#FFF3EA] text-[#F48224] transition-all duration-200 hover:scale-105 hover:bg-[#F48224] hover:text-white shadow-xs cursor-pointer"
            >
              <LuPhone className="text-lg" />
            </button>
          </Popover>
        </div>
      </div>
    </article>
  );
};

export default CourseCard;
