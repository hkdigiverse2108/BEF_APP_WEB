import { LuCheck, LuX } from "react-icons/lu";
import { isImage } from "../../Utils";

export interface StatementQuestionProps {
  id: number;
  statements: string | undefined;
  answers?: Record<number, number | undefined>;
  onCheck?: (id: number, type: "true" | "false") => void;
}

export const StatementQuestion = ({ id, statements, answers, onCheck }: StatementQuestionProps) => {
  const showImage = isImage(statements || "");
  const isTrue = answers?.[id] === 1;
  const isFalse = answers?.[id] === 0;

  return (
    <div
      className={`modern-stm-row flex items-center justify-between gap-4 w-full rounded-2xl border p-4 sm:p-5 transition-all ${
        isTrue
          ? "border-[#16A34A] bg-[#F0FDF4]/40"
          : isFalse
          ? "border-[#DC2626] bg-[#FEF2F2]/40"
          : "border-[#E2E8F0] bg-white hover:border-[#94A3B8]"
      }`}
    >
      <div className="flex items-center gap-3 sm:gap-4 flex-1">
        {/* Number Pill matching Image 2 */}
        <span
          className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-xs font-bold transition-colors ${
            isTrue
              ? "bg-[#16A34A] text-white"
              : isFalse
              ? "bg-[#DC2626] text-white"
              : "bg-[#EFF6FF] text-[#124699]"
          }`}
        >
          {id + 1}
        </span>

        {/* Statement Text - Clean text without strikethrough matching Image 2 */}
        <div className="flex-1 text-xs sm:text-sm font-medium text-[#0F172A] leading-relaxed">
          {showImage ? (
            <img src={statements} className="transparent-img max-h-32 object-contain" alt="statement" />
          ) : (
            <span>{statements}</span>
          )}
        </div>
      </div>

      {/* True / False Circular Action Buttons */}
      {onCheck && answers && (
        <div className="flex items-center gap-2 shrink-0">
          <button
            type="button"
            onClick={() => onCheck(id, "true")}
            title={isTrue ? "Marked as True" : "Mark as True"}
            className={`flex h-9 w-9 sm:h-10 sm:w-10 items-center justify-center rounded-full border transition-all cursor-pointer ${
              isTrue
                ? "border-[#16A34A] bg-[#16A34A] text-white shadow-xs"
                : "border-[#CBD5E1] bg-white text-[#94A3B8] hover:border-[#16A34A] hover:text-[#16A34A]"
            }`}
          >
            <LuCheck className="text-base" />
          </button>

          <button
            type="button"
            onClick={() => onCheck(id, "false")}
            title={isFalse ? "Marked as False" : "Mark as False"}
            className={`flex h-9 w-9 sm:h-10 sm:w-10 items-center justify-center rounded-full border transition-all cursor-pointer ${
              isFalse
                ? "border-[#DC2626] bg-[#DC2626] text-white shadow-xs"
                : "border-[#CBD5E1] bg-white text-[#94A3B8] hover:border-[#DC2626] hover:text-[#DC2626]"
            }`}
          >
            <LuX className="text-base" />
          </button>
        </div>
      )}
    </div>
  );
};

