import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { Popover } from "antd";
import {
  LuPhone,
  LuLayers,
  LuChevronDown,
  LuChevronUp,
  LuShieldCheck,
  LuArrowRight,
  LuCheck,
} from "react-icons/lu";
import { ROUTES } from "../../Constants";
import type { CourseItem } from "../../Types";
import ContactContent from "../WorkshopCourseCommon/ContactContent";

export const CourseCard: React.FC<{ data: CourseItem }> = ({ data }) => {
  const [isModuleOpen, setIsModuleOpen] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);

  const {
    _id = "",
    title = "Sure Shot Prelims",
    image = "",
    language = "English",
    syllabus: { subjectLevel = "" } = {},
    courseMoneyBack = "",
    totalLecture,
    totalTest,
    isUnlocked = false,
  } = data || {};

  const targetUrl = _id ? ROUTES.COURSE.DETAILS.replace(":id", _id) : ROUTES.COURSE.COURSE;

  return (
    <article className="group flex flex-col overflow-hidden rounded-2xl border border-[#E2E8F0] bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">
      {/* Top Course Image with rounded top corners */}
      <div className="relative w-full aspect-16/10 rounded-t-2xl overflow-hidden bg-gray-200">
        <NavLink to={targetUrl} className="block w-full h-full">
          <img
            src={image}
            alt={title || "Course Banner"}
            onLoad={() => setImageLoaded(true)}
            className={`w-full h-full object-cover transition-transform duration-300 group-hover:scale-102 ${
              imageLoaded ? "opacity-100" : "opacity-0"
            }`}
          />
        </NavLink>

        {/* Top Badges (Language & Level, and Unlocked status) */}
        <div className="absolute top-2.5 left-2.5 right-2.5 flex items-center justify-between pointer-events-none z-10">
          <div className="flex items-center gap-1.5 flex-wrap">
            {language && (
              <span className="rounded-full bg-white/90 backdrop-blur-md px-3 py-1 text-xs font-bold text-[#0F172A] shadow-xs">
                {language}
              </span>
            )}
            {subjectLevel && (
              <span className="rounded-full bg-black/40 backdrop-blur-md px-3 py-1 text-xs font-bold text-white border border-white/20 shadow-xs">
                {subjectLevel}
              </span>
            )}
          </div>

          {isUnlocked && (
            <span className="flex items-center gap-1 rounded-full bg-emerald-600 px-2.5 py-1 text-[11px] font-black text-white shadow-sm">
              <LuCheck className="text-xs" /> Unlocked
            </span>
          )}
        </div>
      </div>

      {/* Card Body */}
      <div className="flex flex-1 flex-col p-5">
        {/* Expandable Module Accordion */}
        <div className="overflow-hidden rounded-xl border border-[#E2E8F0] transition-all">
          <button
            type="button"
            onClick={() => setIsModuleOpen((prev) => !prev)}
            className="flex w-full items-center justify-between bg-[#F8FAFC] px-4 py-3 text-left transition-colors hover:bg-[#F1F5F9] cursor-pointer"
          >
            <span className="flex items-center gap-2.5 text-xs sm:text-sm font-bold text-[#124699]">
              <span className="flex h-6 w-6 items-center justify-center rounded-lg bg-white text-[#F48224] shadow-xs">
                <LuLayers className="text-sm" />
              </span>
              Module Details
            </span>
            {isModuleOpen ? (
              <LuChevronUp className="text-base text-[#F48224]" />
            ) : (
              <LuChevronDown className="text-base text-[#64748B]" />
            )}
          </button>

          {isModuleOpen && (
            <div className="divide-y divide-[#F1F5F9] border-t border-[#E2E8F0] bg-white p-3 text-xs">
              <div className="flex items-center justify-between py-1.5 font-semibold text-[#0F172A]">
                <span>GS Foundation</span>
                <span className="text-[#64748B] font-mono">
                  {totalLecture ? `${totalLecture} lessons` : "24 lessons"}
                </span>
              </div>
              <div className="flex items-center justify-between py-1.5 font-semibold text-[#0F172A]">
                <span>Prelims Test Series</span>
                <span className="text-[#64748B] font-mono">
                  {totalTest ? `${totalTest} tests` : "18 tests"}
                </span>
              </div>
              <div className="flex items-center justify-between py-1.5 font-semibold text-[#0F172A]">
                <span>Current Affairs &amp; Review</span>
                <span className="text-[#64748B] font-mono">Weekly</span>
              </div>
            </div>
          )}
        </div>

        {/* Guarantee Callout Banner */}
        <div className="mt-4 flex items-center gap-3 rounded-xl border border-[#BFDBFE] bg-[#EFF6FF] p-3 text-[#1E40AF]">
          <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-white text-[#124699] shadow-xs">
            <LuShieldCheck className="text-lg" />
          </span>
          <p className="text-[11px] sm:text-xs font-bold leading-tight text-[#1E3A8A]">
            {courseMoneyBack || "Minimum 60-Marks Direct Hit Guarantee, otherwise 100% refund"}
          </p>
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
