import { useState, useMemo } from "react";
import { LuChevronDown, LuShieldCheck, LuCircleHelp } from "react-icons/lu";
import type { FAQ } from "../../../Types";
import { useGetApiQuery } from "../../../Api/CommonApi";
import { URL_KEYS } from "../../../Constants";

const DEFAULT_COURSE_FAQS: Array<{ question: string; answer: string }> = [
  {
    question: "REFUND POLICY",
    answer: "We do not offer any refund for any course, workshop, test, or test series under Achiwon.",
  },
  {
    question: "What does “Pay Full Fee Only After You Clear Prelims” mean?",
    answer: "Students only pay the token commitment fee upfront. The complete course fees become payable only once you successfully clear the UPSC/GPSC Prelims examination stage.",
  },
  {
    question: "What is the “Minimum 60 Marks Direct-Hit Guarantee”?",
    answer: "Our structured GS and CSAT modules guarantee that at least 60 marks worth of direct or logically solvable questions in Prelims will be hit directly from our coverage, or 100% refund terms apply.",
  },
  {
    question: "What is the Refund in the Consistency Scheme?",
    answer: "Students maintaining 90%+ attendance and regular test submissions qualify for special consistency scholarship cashback schemes.",
  },
  {
    question: "How many questions in UPSC Prelims will directly Hit from BEF Aptitude Courses?",
    answer: "Over 30+ direct questions in GS Paper 1 and 25+ direct question types in CSAT are rigorously addressed through our question-solving frameworks.",
  },
  {
    question: "Will I get personal mentorship?",
    answer: "Yes, dedicated academic counsellors and expert faculties (Kartik Sir & Krina Ma'am) provide 1-on-1 performance reviews and strategy guidance.",
  },
  {
    question: "Are the courses bilingual?",
    answer: "Lectures and core conceptual discussions are delivered bilingually in English and Hindi/Gujarati with comprehensive English study PDFs.",
  },
  {
    question: "Can I access the courses on mobile or laptop?",
    answer: "Yes, seamless access is available on web browsers (desktop/laptop) as well as the mobile-optimized web application.",
  },
  {
    question: "How long will I get access to the courses?",
    answer: "Full access remains valid until the completion of the UPSC CSE Prelims 2026 examination.",
  },
];

const CourseFaqsTab = () => {
  const [openIndexes, setOpenIndexes] = useState<number[]>([0]);

  const { data } = useGetApiQuery({
    url: `${URL_KEYS.FAQ.ALL}?typeFilter=course`,
  });

  const apiFaqs: FAQ[] = data?.data?.faq_data || [];

  const allFaqs = useMemo(() => {
    if (apiFaqs.length > 0) {
      return apiFaqs.map((f) => ({ question: f.question, answer: f.answer }));
    }
    return DEFAULT_COURSE_FAQS;
  }, [apiFaqs]);

  const toggleFAQ = (index: number) => {
    setOpenIndexes((prev) =>
      prev.includes(index) ? prev.filter((i) => i !== index) : [...prev, index]
    );
  };

  return (
    <div className="space-y-5" data-aos="fade-up">
      <div className="flex items-end justify-between gap-4 border-b border-gray-200 pb-4">
        <div>
          <p className="text-xs sm:text-sm font-semibold text-[#64748B]">Student Support</p>
          <h2 className="mt-1 text-xl sm:text-2xl font-extrabold text-[#0F172A] flex items-center gap-2">
            <LuCircleHelp className="text-[#124699]" />
            Frequently Asked Questions
          </h2>
        </div>
        <span className="hidden sm:inline-flex items-center gap-1.5 rounded-full bg-[#EDF4FF] px-3 py-1 text-xs font-bold text-[#124699]">
          <LuShieldCheck /> BEF Guarantee
        </span>
      </div>

      <div className="space-y-3">
        {allFaqs.map((faq, index) => {
          const isOpen = openIndexes.includes(index);
          const isRefundPolicy = faq.question.toUpperCase().includes("REFUND POLICY");

          return (
            <div
              key={index}
              className={`overflow-hidden rounded-xl border transition-all duration-200 ${
                isRefundPolicy
                  ? "border-[#F48224]/30 bg-[#FFF7ED]"
                  : isOpen
                  ? "border-[#124699]/30 bg-[#F8FAFC] shadow-sm"
                  : "border-gray-200 bg-white hover:border-gray-300 hover:shadow-xs"
              }`}
            >
              <button
                type="button"
                onClick={() => toggleFAQ(index)}
                className="flex w-full cursor-pointer items-center justify-between gap-4 px-5 py-4 text-left font-semibold text-[#0F172A] transition-colors"
              >
                <span className={`text-sm sm:text-base ${isRefundPolicy ? "font-bold text-[#EA580C]" : isOpen ? "text-[#124699]" : ""}`}>
                  {faq.question}
                </span>
                <span
                  className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-white text-gray-500 shadow-2xs transition-transform duration-200 ${
                    isOpen ? "rotate-180 text-[#F48224]" : ""
                  }`}
                >
                  <LuChevronDown className="text-base" />
                </span>
              </button>

              {isOpen && (
                <div className="border-t border-gray-200/70 px-5 py-4 text-xs sm:text-sm leading-relaxed text-[#334155] bg-white/60">
                  <p>{faq.answer}</p>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default CourseFaqsTab;
