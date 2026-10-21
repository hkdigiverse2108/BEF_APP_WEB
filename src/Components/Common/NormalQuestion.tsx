import { LuRefreshCw, LuX } from "react-icons/lu";

export interface NormalQuestionProps {
  id: number;
  opt: string;
  text: string;
  answers: Record<number, number | undefined>;
  onCheck: (id: number, type: "true" | "false") => void;
}

export const NormalQuestion = ({ id, opt, text, answers, onCheck }: NormalQuestionProps) => {
  const isImage = (value: string) => {
    return (
      value.startsWith("http") &&
      (value.endsWith(".jpg") ||
        value.endsWith(".jpeg") ||
        value.endsWith(".png") ||
        value.endsWith(".webp") ||
        value.endsWith(".gif"))
    );
  };
  const showImage = isImage(text);
  const isSelected = answers[id] === 1;
  const isExcluded = answers[id] === 0;

  if (isExcluded) {
    return (
      <div
        className="modern-opt-btn excluded flex min-h-16 w-full items-center gap-3 rounded-xl border border-[#CBD5E1] bg-[#F1F5F9] px-4 py-3 text-left opacity-65 transition-all duration-200"
      >
        <span className="modern-opt-letter !bg-[#94A3B8] !text-white !border-transparent">
          {opt}
        </span>
        <div className="flex-1 text-xs sm:text-sm font-semibold text-[#64748B] line-through">
          {showImage ? <img src={text} className="transparent-img max-h-20 object-contain opacity-50" alt="option" /> : text}
        </div>
        <span className="rounded-md bg-white border border-[#CBD5E1] px-2 py-0.5 text-[11px] font-bold text-[#64748B] shrink-0">
          Excluded
        </span>
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            onCheck(id, "false");
          }}
          title="Restore this option"
          className="modern-opt-exclude text-[#124699] hover:!bg-[#EFF6FF] hover:!text-[#124699] hover:!border-[#124699] cursor-pointer"
        >
          <LuRefreshCw className="text-sm" />
        </button>
      </div>
    );
  }

  return (
    <div
      onClick={() => onCheck(id, "true")}
      className={`modern-opt-btn ${isSelected ? "selected" : ""}`}
    >
      {/* Option letter pill with hover scaling */}
      <span className="modern-opt-letter">
        {opt}
      </span>

      {/* Option Text */}
      <div className="flex-1 text-xs sm:text-sm font-semibold text-[#0F172A] leading-relaxed">
        {showImage ? <img src={text} className="transparent-img max-h-24 object-contain" alt="option" /> : text}
      </div>

      {/* Eliminate (X) button */}
      <span
        onClick={(e) => {
          e.stopPropagation();
          onCheck(id, "false");
        }}
        title="Eliminate this option"
        className="modern-opt-exclude cursor-pointer"
      >
        <LuX className="text-base" />
      </span>
    </div>
  );
};

