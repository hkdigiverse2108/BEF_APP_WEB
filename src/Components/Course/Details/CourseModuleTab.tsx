import { useGetApiQuery } from "../../../Api/CommonApi";
import { URL_KEYS } from "../../../Constants";
import type { ModuleType } from "../../../Types";
import { Empty } from "antd";
import { useAppDispatch } from "../../../Store/hooks";
import { setModalVideoLink, setModalVideoPlay } from "../../../Store/Slices/VideoModalSlice";
import { LuLayers, LuPlay, LuBookOpen, LuClipboardCheck } from "react-icons/lu";

const CourseModuleTab = ({ id }: { id?: string }) => {
  const dispatch = useAppDispatch();
  const { data: ModulesData } = useGetApiQuery({
    url: `${URL_KEYS.MODULE.ALL}?courseFilter=${id}`,
  });
  const Modules: ModuleType[] = ModulesData?.data?.module_data || [];

  if (Modules?.length === 0) return <Empty description="No modules available for this course yet" />;

  return (
    <div className="space-y-5" data-aos="fade-up">
      <div className="flex items-center gap-3 border-b border-gray-200 pb-4">
        <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#EDF4FF] text-[#124699]">
          <LuLayers className="text-2xl" />
        </div>
        <div>
          <h2 className="text-xl sm:text-2xl font-extrabold text-[#0F172A]">Course Modules</h2>
          <p className="text-xs sm:text-sm text-[#64748B]">
            Structured syllabus designed for UPSC CSE Prelims direct hits
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4">
        {Modules.map((module, index) => (
          <article
            key={module._id || index}
            className="group rounded-2xl border border-gray-200 bg-white p-1 transition-all duration-300 hover:-translate-y-0.5 hover:border-[#124699]/40 hover:shadow-md"
          >
            <div className="flex flex-col gap-4 p-4 sm:flex-row sm:items-center">
              {/* Module Thumbnail */}
              <div
                className="relative h-36 sm:h-32 w-full sm:w-56 shrink-0 overflow-hidden rounded-xl bg-gray-100 cursor-pointer"
                onClick={() => {
                  if (module?.link) {
                    dispatch(setModalVideoPlay(true));
                    dispatch(setModalVideoLink(module?.link));
                  }
                }}
              >
                {module.image ? (
                  <img
                    src={module.image}
                    alt={module.name}
                    className="h-full w-full object-cover transition duration-300 group-hover:scale-105"
                  />
                ) : (
                  <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-[#124699]/10 to-[#F48224]/10 text-[#124699]">
                    <LuLayers className="text-3xl opacity-50" />
                  </div>
                )}

                {module?.link && (
                  <div className="absolute inset-0 flex items-center justify-center bg-black/30 backdrop-blur-[1px] opacity-90 group-hover:opacity-100 transition-opacity">
                    <span className="flex h-10 w-10 items-center justify-center rounded-full bg-white text-[#F48224] shadow-md transition-transform group-hover:scale-110">
                      <LuPlay className="ml-0.5 text-lg" />
                    </span>
                  </div>
                )}
              </div>

              {/* Module Info */}
              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <span className="rounded-md bg-[#EDF4FF] px-2 py-0.5 text-[11px] font-bold text-[#124699]">
                    Module {index + 1}
                  </span>
                </div>
                <h3 className="mt-1 text-base sm:text-lg font-bold text-[#0F172A] transition-colors group-hover:text-[#124699]">
                  {module.name}
                </h3>
                {module.subTitle && (
                  <p className="mt-1 text-xs sm:text-sm text-[#64748B] line-clamp-2">
                    {module.subTitle}
                  </p>
                )}

                {/* Counters */}
                <div className="mt-3 flex items-center gap-6 text-xs sm:text-sm font-semibold text-[#0F172A]">
                  <div className="flex items-center gap-2">
                    <LuBookOpen className="text-[#F48224] text-base" />
                    <span>
                      <strong className="text-sm sm:text-base font-extrabold text-[#124699]">
                        {module.totalLecture ?? 0}
                      </strong>{" "}
                      Lectures
                    </span>
                  </div>
                  <span className="h-4 w-px bg-gray-200" />
                  <div className="flex items-center gap-2">
                    <LuClipboardCheck className="text-emerald-600 text-base" />
                    <span>
                      <strong className="text-sm sm:text-base font-extrabold text-[#124699]">
                        {module.totalTest ?? 0}
                      </strong>{" "}
                      Tests
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
};

export default CourseModuleTab;
