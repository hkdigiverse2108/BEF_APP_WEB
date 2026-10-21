import { useState, type FC } from "react";
import { TbCloudDownload } from "react-icons/tb";
import { LuBookOpen, LuCirclePlay, LuClipboardCheck } from "react-icons/lu";

interface CourseAboutTabProps {
  pdf: string;
  totalLecture: number;
  description: string;
  totalTest: number;
}

const DetailsAboutTab: FC<{ data: CourseAboutTabProps }> = ({ data }) => {
  const [isMore, setIsMore] = useState(false);

  return (
    <section className="space-y-6" data-aos="fade-up">
      {/* Counters & Header */}
      <div className="rounded-2xl border border-gray-200 bg-white p-5 shadow-xs sm:p-6">
        <div className="flex flex-col justify-between gap-5 border-b border-gray-100 pb-5 sm:flex-row sm:items-center">
          <div className="flex items-center gap-3">
            <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#EDF4FF] text-[#124699]">
              <LuBookOpen className="text-xl" />
            </span>
            <div>
              <h2 className="text-lg sm:text-xl font-extrabold text-[#0F172A]">Course Overview</h2>
              <p className="text-xs sm:text-sm text-[#64748B]">Comprehensive Prelims Preparation Program</p>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div className="rounded-xl bg-[#EDF4FF] px-5 py-3 text-center">
              <LuCirclePlay className="text-lg text-[#124699] mx-auto mb-0.5" />
              <div className="text-xl sm:text-2xl font-extrabold text-[#124699]">
                {data?.totalLecture || 159}
              </div>
              <div className="text-xs font-semibold text-[#64748B]">Lectures</div>
            </div>
            <div className="rounded-xl bg-[#FFF3EA] px-5 py-3 text-center">
              <LuClipboardCheck className="text-lg text-[#F48224] mx-auto mb-0.5" />
              <div className="text-xl sm:text-2xl font-extrabold text-[#F48224]">
                {data?.totalTest || 137}
              </div>
              <div className="text-xs font-semibold text-[#64748B]">Tests</div>
            </div>
          </div>
        </div>

        {/* Description body */}
        <div className="mt-5">
          <h3 className="text-sm font-bold text-[#0F172A] mb-2">Program Curriculum &amp; Details</h3>
          <div
            className={`text-xs sm:text-sm leading-relaxed text-[#334155] ${
              isMore ? "" : "line-clamp-6 sm:line-clamp-4"
            }`}
            dangerouslySetInnerHTML={{
              __html:
                data?.description ||
                "<p>Complete coverage of UPSC & GPSC Prelims syllabus including GS Foundation, CSAT shortcut strategies, mapping &amp; historical terms, and 50+ elimination logics with guaranteed minimum 60 marks direct hit.</p>",
            }}
          />
          <button
            type="button"
            onClick={() => setIsMore(!isMore)}
            className="mt-2 text-xs sm:text-sm font-bold text-[#124699] hover:underline cursor-pointer"
          >
            {isMore ? "Read Less" : "Read More..."}
          </button>
        </div>

        {/* Download Brochure Link */}
        {data?.pdf && (
          <div className="mt-6 pt-4 border-t border-gray-100">
            <a
              href={data.pdf}
              target="_blank"
              rel="noopener noreferrer"
              className="flex w-full items-center justify-center gap-2 rounded-xl border-2 border-[#124699] bg-white py-3 px-4 text-xs sm:text-sm font-bold text-[#124699] transition-all hover:bg-[#124699] hover:text-white hover:shadow-sm"
            >
              <TbCloudDownload className="text-xl" />
              <span>DOWNLOAD DETAILED BROCHURE</span>
            </a>
          </div>
        )}
      </div>
    </section>
  );
};

export default DetailsAboutTab;
