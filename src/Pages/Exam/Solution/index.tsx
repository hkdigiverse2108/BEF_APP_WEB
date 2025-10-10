import { Tooltip } from "antd";
import { useState } from "react";
import { HiOutlineBars3BottomLeft } from "react-icons/hi2";
import { IoFlagOutline, IoLanguage } from "react-icons/io5";
import { PiFilePdf } from "react-icons/pi";
import { RxCross2 } from "react-icons/rx";
import { FormButton, FormSelect } from "../../../Attribute/FormFields";
import { CardHeader } from "../../../Components/Common/CardHeader";
import EndTest from "../../../Components/Exam/Question/EndTestDrawer";
import { LanguageOptions } from "../../../Data";
import { setEndTestDrawer } from "../../../Store/Slices/DrawerSlice";
import { useAppDispatch } from "../../../Store/hooks";

const Solution = () => {
  const [answers, setAnswers] = useState<{ [key: number]: number }>({});
  const [isOpenQuestion, setOpenQuestion] = useState(false);
  const [isOpenSolution, setOpenSolution] = useState(false);
  const dispatch = useAppDispatch();

  const options = ["Both Statement-1 and statement 2 are correct and Statement-2 explains Statement-1", "Both Statement-1 and Statement-2 are correct, but Statement-2 does not explain Statement-1", "Statement-1 is correct, but Statement-2 is incorrect", "Statement-1 is incorrect, but Statement-2 is correct"];

  return (
    <div className="p-4 md:p-8 question-section">
      {/* Header */}
      <CardHeader title="Solution" />
      <span className="border-t border-card-border flex w-full mt-4 mb-6" />

      <div className="grid grid-cols-1 2xl:grid-cols-6 gap-6 w-full">
        {/* Left Panel */}
        <div className="col-span-4 2xl:col-span-4">
          {/* Question Header */}
          <div>
            <div className="flex flex-wrap items-center gap-3 mt-3">
              <span className="bg-input-box font-bold text-sm p-2 rounded cursor-pointer" onClick={() => setOpenQuestion(!isOpenQuestion)}>
                <Tooltip title="All Questions">
                  <HiOutlineBars3BottomLeft className="text-xl" />
                </Tooltip>
              </span>
              <FormSelect name="Language" placeholder="All Solutions" options={LanguageOptions} className="!m-0" value="english" />
              <span className="bg-input-box font-bold text-sm p-2 px-4 rounded capitalize">mistake map report</span>
              <span className="bg-input-box font-bold text-sm p-2  rounded">
                <PiFilePdf className="text-xl" />
              </span>
            </div>
            <span className="border-t border-card-border flex w-full my-6" />
            <div className="flex flex-wrap items-center gap-3 mt-3">
              <span className="bg-input-box font-bold text-sm p-2 px-4 rounded">Question : 01</span>
              <span className="bg-green-100 text-green-700 text-sm font-bold py-2 px-4 rounded">+2.5</span>
              <span className="bg-red-100 text-red-700 text-sm font-bold py-2 px-4 rounded">-0.83</span>
              <div className="flex flex-wrap items-center justify-center sm:ml-auto gap-3">
                <span className="flex gap-2 bg-input-box font-bold text-sm p-2 px-4 rounded capitalize">
                  <IoLanguage className="text-xl" />
                  Language
                </span>
                <FormSelect name="Language" placeholder="All Solutions" options={LanguageOptions} className="!m-0" value="english" />
              </div>
            </div>
            <span className="border-t border-card-border flex w-full my-6" />
            <div className="flex flex-wrap items-center gap-3">
              <p className="bg-input-box font-bold text-sm p-2 px-4 rounded text-neutral-500">Centre-State Relations & LSG</p>
              <p className="bg-input-box font-bold text-sm p-2 px-4 rounded text-neutral-500">
                Strategy :<span className="text-black"> Skip</span>
              </p>
              <div className="flex flex-wrap items-center justify-center sm:ml-auto gap-3">
                <span className="2xl:hidden flex gap-2 bg-input-box font-bold text-sm p-2 px-4 rounded capitalize cursor-pointer" onClick={() => setOpenSolution(!isOpenSolution)}>
                  See Solution
                </span>
              </div>
            </div>
            <div className="space-y-6 bg-input-box p-6 rounded-2xl border border-primary my-6">
              <p className="font-bold mb-2 text-2xl">AI Mentor</p>
              <ul className="list-[square] ps-5">
                <li className="font-bold mb-2">
                  OTHER :<span className="italic"> 80% use Logic Play</span>
                </li>
                <li className="font-bold">
                  YOU :<span className="italic"> 20% Accuracy in Aptitude Question</span>
                </li>
              </ul>
            </div>
          </div>

          {/* Passage Section */}
          <div className="bg-input-box p-3 sm:p-6 rounded-2xl">
            <div className="mb-4">
              <p className="font-bold text-lg mb-1">Q. Consider the following statements:</p>
              <p className="font-bold text-base mb-1 text-neutral-500">Which of the statements given above is/are correct?</p>
            </div>
            <div className="!grid grid-cols-1 lg:grid-cols-2 gap-3">
              {options.map((opt, i) => (
                <div key={i} className={`border-2 border-card-border flex items-center gap-3 p-4 m-0 rounded-2xl cursor-pointer transition-all ${answers[i] === 1 ? "border-green-500 bg-green-50" : answers[i] === 0 ? "border-red-500 bg-red-50" : "border-gray-300 hover:bg-gray-50"}`}>
                  <div className="flex max-sm:flex-col justify-center items-center w-full gap-3 question">
                    <span className="flex-1 font-medium ">{`${i + 1}. ${opt}`}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div onClick={() => setOpenQuestion(!isOpenQuestion)} className="bg-input-box p-6 rounded-2xl w-full hidden before:fixed before:bg-black before:opacity-40 before:inset-0 before:z-50" style={{ display: isOpenQuestion ? "block" : "none" }}>
          <div onClick={(e) => e.stopPropagation()} className="2xl:gap-x-10 space-y-3 fixed bg-[#ffffff] w-full max-w-[400px] min-w-[200px] top-0 right-0  px-5 py-4 h-full shadow-md overflow-auto z-50">
            <div className="mb-6">
              <div className="flex justify-between items-center">
                <a href="javascript:void(0)">Questions</a>
                <button id="toggleClose" onClick={() => setOpenQuestion(!isOpenQuestion)} className=" z-[100] rounded-xl bg-input-box w-9 h-9 flex items-center justify-center cursor-pointer">
                  <RxCross2 className="w-5 h-5" />
                </button>
              </div>
              <span className="border-t border-card-border flex w-full mt-4 mb-10" />
            </div>
            <div className="grid grid-cols-5 gap-2">
              {Array.from({ length: 50 }, (_, i) => (
                <button key={i} className={`max-w-full h-10 border text-sm font-medium flex items-center justify-center ${i === 0 ? "answered" : "not-visited "}`}>
                  {i + 1}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Right Panel */}
        <div onClick={() => setOpenSolution(!isOpenSolution)} className="bg-input-box p-6 rounded-2xl col-span-2 max-2xl:hidden 2xl:!flex max-2xl:before:fixed max-2xl:before:bg-black max-2xl:before:opacity-40 max-2xl:before:inset-0 max-2xl:before:z-50" style={{ display: isOpenSolution ? "block" : "none" }}>
          {/* Legend */}
          <div onClick={(e) => e.stopPropagation()} className="2xl:gap-x-10 max-2xl:space-y-3 max-2xl:fixed max-2xl:bg-[#ffffff] w-full max-2xl:max-w-[600px] max-2xl:min-w-[200px] max-2xl:top-0 max-2xl:left-0  max-2xl:px-5 max-2xl:py-4 max-2xl:h-full max-2xl:shadow-md max-2xl:overflow-auto z-50">
            <div className="mb-6">
              <div className="flex justify-between items-center">
                <a href="javascript:void(0)">See Solution</a>
                <button id="toggleClose" onClick={() => setOpenSolution(!isOpenSolution)} className="hidden max-2xl:flex justify-center items-center z-[100] rounded-xl bg-input-box w-9 h-9 cursor-pointer">
                  <RxCross2 className="w-5 h-5" />
                </button>
              </div>
              <span className="border-t border-card-border flex w-full mt-4 " />
            </div>

            <div className="bg-input-box p-3 rounded-lg border border-primary my-6">
              <p className="font-bold text-lg">Correct Answer: (D)</p>
            </div>
            <span className="border-t border-card-border flex w-full my-4" />

            <div className="max-h-[550px] 2xl:h-100 overflow-y-auto overflow-x-hidden [&::-webkit-scrollbar]:w-0">
              <p className="font-bold text-md">Linkage to PYQs:</p>
              <p className="font-bold text-base mb-1 text-neutral-500">This question is linked to the 2012 UPSC question on Bt brinjal (Q11), where genetically modified plants with special traits, such as increased resistance or enhanced nutritional value, were discussed. In both cases, GM technology is used to improve crop characteristics to benefit human health.</p>
              <p className="font-bold text-md">Linkage to PYQs:</p>
              <p className="font-bold text-base mb-1 text-neutral-500">This question is linked to the 2012 UPSC question on Bt brinjal (Q11), where genetically modified plants with special traits, such as increased resistance or enhanced nutritional value, were discussed. In both cases, GM technology is used to improve crop characteristics to benefit human health.</p>
              <p className="font-bold text-md">Linkage to PYQs:</p>
              <p className="font-bold text-base mb-1 text-neutral-500">This question is linked to the 2012 UPSC question on Bt brinjal (Q11), where genetically modified plants with special traits, such as increased resistance or enhanced nutritional value, were discussed. In both cases, GM technology is used to improve crop characteristics to benefit human health.</p>
              <p className="font-bold text-md">Linkage to PYQs:</p>
              <p className="font-bold text-base mb-1 text-neutral-500">This question is linked to the 2012 UPSC question on Bt brinjal (Q11), where genetically modified plants with special traits, such as increased resistance or enhanced nutritional value, were discussed. In both cases, GM technology is used to improve crop characteristics to benefit human health.</p>
              <p className="font-bold text-md">Linkage to PYQs:</p>
              <p className="font-bold text-base mb-1 text-neutral-500">This question is linked to the 2012 UPSC question on Bt brinjal (Q11), where genetically modified plants with special traits, such as increased resistance or enhanced nutritional value, were discussed. In both cases, GM technology is used to improve crop characteristics to benefit human health.</p>
              <p className="font-bold text-md">Linkage to PYQs:</p>
              <p className="font-bold text-base mb-1 text-neutral-500">This question is linked to the 2012 UPSC question on Bt brinjal (Q11), where genetically modified plants with special traits, such as increased resistance or enhanced nutritional value, were discussed. In both cases, GM technology is used to improve crop characteristics to benefit human health.</p>
              <p className="font-bold text-md">Linkage to PYQs:</p>
              <p className="font-bold text-base mb-1 text-neutral-500">This question is linked to the 2012 UPSC question on Bt brinjal (Q11), where genetically modified plants with special traits, such as increased resistance or enhanced nutritional value, were discussed. In both cases, GM technology is used to improve crop characteristics to benefit human health.</p>
              <p className="font-bold text-md">Linkage to PYQs:</p>
              <p className="font-bold text-base mb-1 text-neutral-500">This question is linked to the 2012 UPSC question on Bt brinjal (Q11), where genetically modified plants with special traits, such as increased resistance or enhanced nutritional value, were discussed. In both cases, GM technology is used to improve crop characteristics to benefit human health.</p>
            </div>

            {/* End Test Button */}
            <div className="flex justify-end items-end gap-3 !mt-3">
              <FormButton text="REPORT AN ISSUE" icon={<IoFlagOutline />} onClick={() => dispatch(setEndTestDrawer())} className="custom-button w-fit text-center !p-4 !h-10 uppercase  !bg-danger !text-white !text-base" />
            </div>
          </div>
        </div>
      </div>
      <EndTest />
    </div>
  );
};

export default Solution;
