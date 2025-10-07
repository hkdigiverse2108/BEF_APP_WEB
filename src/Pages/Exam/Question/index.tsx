import { CheckCircleFilled, CheckCircleOutlined, CloseCircleFilled, CloseCircleOutlined } from "@ant-design/icons";
import { Checkbox } from "antd";
import { useState } from "react";
import { BsFillAlarmFill } from "react-icons/bs";
import { HiOutlineBars3BottomRight } from "react-icons/hi2";
import { MdError } from "react-icons/md";
import { RxCross2 } from "react-icons/rx";
import { TbReport } from "react-icons/tb";
import { FormButton, FormSelect } from "../../../Attribute/FormFields";
import { CardHeader } from "../../../Components/Common/CardHeader";
import { LanguageOptions } from "../../../Data";
import { IoBookmarkOutline } from "react-icons/io5";

const Question = () => {
  const [answers, setAnswers] = useState<{ [key: number]: number }>({});
  const [isOpen, setOpen] = useState(false);

  const options = ["Both Statement-1 and statement 2 are correct and Statement-2 explains Statement-1", "Both Statement-1 and Statement-2 are correct, but Statement-2 does not explain Statement-1", "Statement-1 is correct, but Statement-2 is incorrect", "Statement-1 is incorrect, but Statement-2 is correct"];

  const handleCheck = (id: number, type: "true" | "false") => {
    setAnswers((prev) => {
      let newAnswers: any = { ...prev };
      if ((type === "true" && newAnswers[id] === 1) || (type === "false" && newAnswers[id] === 0)) {
        newAnswers[id] = undefined;
      } else {
        if (type === "true") {
          options.forEach((_, i) => {
            newAnswers[i] = i === id ? 1 : newAnswers[i] === 1 ? undefined : newAnswers[i];
          });
          newAnswers[id] = 1;
        } else if (type === "false") {
          const falseCount = Object.values(newAnswers).filter((v) => v === 0).length;
          if (falseCount < options.length - 1) {
            newAnswers[id] = 0;
          } else {
            return prev;
          }
        }
      }
      return newAnswers;
    });
  };

  const renderStatement = (id: number, text: string) => (
    <div key={id} className="flex justify-between items-center w-full gap-3 question">
      <Checkbox checked={answers[id] === 1} onChange={() => handleCheck(id, "true")} className="flex items-center">
        {answers[id] === 1 ? <CheckCircleFilled style={{ color: "green" }} /> : <CheckCircleOutlined style={{ color: "green" }} />}
      </Checkbox>

      <span className="flex-1 font-medium">{`${id + 1}. ${text}`}</span>

      <Checkbox checked={answers[id] === 0} onChange={() => handleCheck(id, "false")} className="ml-auto">
        {answers[id] === 0 ? <CloseCircleFilled style={{ color: "red" }} /> : <CloseCircleOutlined style={{ color: "red" }} />}
      </Checkbox>
    </div>
  );

  return (
    <div className="min-h-screen p-4 md:p-8 question-section">
      {/* Header */}
      <CardHeader title="Question & answer" icon={<BsFillAlarmFill />} time="25 Min 10s Left" />
      <span className="border-t border-card-border flex w-full mt-4" />

      {/* Main Content */}
      <div className="flex justify-end mt-3">
        <button onClick={() => setOpen(!isOpen)} className="2xl:hidden ml-2 cursor-pointer p-1 flex justify-center items-center rounded-xl w-10 sm:w-12 h-10 sm:h-12 bg-input-box">
          <HiOutlineBars3BottomRight className="text-xl sm:text-2xl" />
        </button>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 w-full">
        {/* Left Panel */}
        <div className="col-span-4 2xl:col-span-3">
          {/* Question Header */}
          <div>
            <div className="flex flex-wrap items-center gap-3 mt-3">
              <span className="bg-input-box font-bold text-sm p-2 px-4 rounded">Question : 01</span>
              <span className="bg-green-100 text-green-700 text-sm font-bold py-2 px-4 rounded">+2.5</span>
              <span className="bg-red-100 text-red-700 text-sm font-bold py-2 px-4 rounded">-0.83</span>
              <div className="flex flex-wrap items-center justify-center sm:ml-auto gap-3">
                <FormSelect name="Language" placeholder="select Language" options={LanguageOptions} className="!m-0" value="english" />
                <span className="text-sm font-bold  flex flex-nowrap gap-2">
                  <IoBookmarkOutline className="text-xl" />
                  Save
                </span>
                <span className="text-sm font-bold  flex flex-nowrap gap-2">
                  <TbReport className="text-xl" />
                  Report
                </span>
              </div>
            </div>
            <span className="border-t border-card-border flex w-full my-4" />
            <p className="font-bold mb-4 text-xl">Consider the following statements regarding fundamental rights:</p>
            <div className="space-y-6 bg-input-box p-6 rounded-2xl">
              <p className="font-bold mb-2">1. Many Chewing Gums Found In The Market Are Considered A Source Of Environmental Pollution.</p>
              <p className="font-bold">2. Many Chewing Gums Contain Plastic As Gum Base.</p>
            </div>
            <span className="border-t border-card-border flex w-full my-6" />
          </div>

          {/* Passage Section */}
          <div className="mb-4">
            <p className="font-bold text-lg mb-1">which of the statements given above is/are correct?</p>
          </div>
          <div className="bg-input-box p-6 rounded-2xl">
            <div className="!grid grid-cols-1 md:grid-cols-2 gap-3">
              {options.map((opt, i) => (
                <div key={i} className={`border-2 border-card-border flex items-center gap-3 p-4 m-0 rounded-2xl cursor-pointer transition-all ${answers[i] === 1 ? "border-green-500 bg-green-50" : answers[i] === 0 ? "border-red-500 bg-red-50" : "border-gray-300 hover:bg-gray-50"}`}>
                  {renderStatement(i, opt)}
                </div>
              ))}
            </div>

            {/* Confidence Buttons */}
            <div className="flex flex-wrap gap-2 mt-8 max-xl:justify-center">
              {[
                { label: "Fear - Driver Skip", color: "bg-green-700" },
                { label: "100% Sure", color: "bg-blue-600" },
                { label: "Logic Play", color: "bg-rose-500" },
                { label: "Intuition Hit", color: "bg-sky-500" },
                { label: "Blind Fire", color: "bg-amber-500" },
                { label: "Skip", color: "bg-purple-700" },
              ].map((btn, i) => (
                <button key={i} className={`shadow-btn-shadow color-1 px-4 py-2 text-sm font-semibold text-white rounded-xl transition-all duration-200 hover:animate-pulse ${btn.color}`}>
                  {btn.label}
                </button>
              ))}

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 xl:ml-auto max-xl:w-full">
                <FormButton text="Previous" className="sm:!ml-auto custom-button w-full xl:w-30 button button--mimas text-center !p-4 !h-12 uppercase !bg-white !border !border-black hover:!bg-gray-100" />
                <FormButton text="Save & Next" className="sm:ml-auto custom-button w-full xl:w-40 button button--mimas text-center !p-4 !h-12 uppercase !bg-white !border !border-black hover:!bg-gray-100" />
              </div>
            </div>
          </div>
        </div>

        {/* Right Panel */}
        <div onClick={() => setOpen(!isOpen)} className="bg-input-box p-6 rounded-2xl w-full max-2xl:hidden 2xl:!flex 2xl:items-center max-2xl:before:fixed max-2xl:before:bg-black max-2xl:before:opacity-40 max-2xl:before:inset-0 max-2xl:before:z-50" style={{ display: isOpen ? "block" : "none" }}>
          {/* Legend */}
          <div onClick={(e) => e.stopPropagation()} className="2xl:gap-x-10 max-2xl:space-y-3 max-2xl:fixed max-2xl:bg-[#ffffff] w-full max-2xl:max-w-[400px] max-2xl:min-w-[200px] max-2xl:top-0 max-2xl:right-0  max-2xl:px-5 max-2xl:py-4 max-2xl:h-full max-2xl:shadow-md max-2xl:overflow-auto z-50">
            <div className="mb-6 hidden max-2xl:block">
              <div className="flex justify-between items-center">
                <a href="javascript:void(0)">Questions</a>
                <button id="toggleClose" onClick={() => setOpen(!isOpen)} className=" z-[100] rounded-xl bg-input-box w-9 h-9 flex items-center justify-center cursor-pointer">
                  <RxCross2 className="w-5 h-5" />
                </button>
              </div>
              <span className="border-t border-card-border flex w-full mt-4 mb-10" />
            </div>

            <div className="flex flex-wrap justify-between gap-3 text-xs mb-4">
              <div className="flex items-center gap-1">
                <span className="w-6 h-6 border answered" />
                <span>Answered</span>
              </div>
              <div className="flex items-center gap-1">
                <span className="w-6 h-6 border unanswered" />
                <span>Unanswered</span>
              </div>
              <div className="flex items-center gap-1">
                <span className="w-6 h-6 border not-visited" />
                <span>Not Visited</span>
              </div>
            </div>
            <span className="border-t border-card-border flex w-full my-4" />

            {/* Question Grid */}
            <div className="grid grid-cols-5 gap-2">
              {Array.from({ length: 50 }, (_, i) => (
                <button key={i} className={`max-w-full h-10 border text-sm font-medium flex items-center justify-center ${i === 0 ? "answered" : "not-visited "}`}>
                  {i + 1}
                </button>
              ))}
            </div>

            {/* End Test Button */}
            <div className="flex justify-center items-end gap-3">
              <span className="px-3 py-2.5 text-sm border-2 border-card-border rounded-lg bg-white">
                <MdError className="text-2xl" />
              </span>
              <FormButton text="END TEST" className="custom-button w-full sm:w-30 button button--mimas text-center !p-4 !h-12 uppercase !mt-6 !bg-white !border !border-black" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Question;
