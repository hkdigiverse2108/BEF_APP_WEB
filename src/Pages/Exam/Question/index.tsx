import {
  CheckCircleFilled,
  CheckCircleOutlined,
  CloseCircleFilled,
  CloseCircleOutlined,
} from "@ant-design/icons";
import { Checkbox } from "antd";
import { useState } from "react";
import { BsFillAlarmFill } from "react-icons/bs";
import { FaLightbulb, FaRegCircle } from "react-icons/fa";
import {
  HiMiniInformationCircle,
  HiOutlineBars3BottomRight,
} from "react-icons/hi2";
import { IoBookmarkOutline, IoLanguage } from "react-icons/io5";
import {
  MdLibraryAddCheck,
  MdVisibility,
  MdVisibilityOff,
} from "react-icons/md";
import { RiFileCheckFill } from "react-icons/ri";
import { RxCross2 } from "react-icons/rx";
import { TbMessageQuestion, TbReport } from "react-icons/tb";
import { FormButton } from "../../../Attribute/FormFields";
import { CardHeader } from "../../../Components/Common/CardHeader";
import EndTest from "../../../Components/Exam/Question/EndTestDrawer";
import InstructionsDrawer from "../../../Components/Exam/Question/InstructionsDrawer";
import {
  setEndTestDrawer,
  setInstructionsDrawer,
  setReportModal,
} from "../../../Store/Slices/DrawerSlice";
import { useAppDispatch } from "../../../Store/hooks";
import ReportModal from "../../../Components/Exam/Question/ReportModal";
import { STORAGE_KEYS, URL_KEYS } from "../../../Constants";
import { useGetApiQuery } from "../../../Api/CommonApi";
import { useLocation } from "react-router-dom";
import { Storage } from "../../../Utils";
import { LANGUAGES, QUE_TYPE } from "../../../Data/Question";
import { NormalQuestion } from "../../../Components/Common/NormalQuestion";
import { StatementQuestion } from "../../../Components/Common/StatementQuestion";
import {
  PairTable,
} from "../../../Components/Common/PairHeader";

const Question = () => {
  const [answers, setAnswers] = useState<{ [key: number]: number }>({});
  const [isOpen, setOpen] = useState(false);

  const [currentQuestionNumber, setCurrentQuestionNumber] = useState(1);
  const [language, setLanguage] = useState(LANGUAGES.ENGLISH);

  const dispatch = useAppDispatch();
  const location = useLocation();

  const queryParam = new URLSearchParams(location.search);
  const contestId = queryParam.get("contestId");
  const { data: QAApiData, isLoading } = useGetApiQuery(
    { url: `${URL_KEYS.QA.CONTEST_QUESTION}${contestId}` },
    { skip: false }
  );

  const QAData = QAApiData?.data || {};
  const QA = QAData?.answers || [];
  const { _id, negativeMarks, positiveMarks, stackNumber } = QAData || {};

  const currentQuestion = QA[currentQuestionNumber - 1];
  // console.log(currentQuestion?.englishQuestion?.statementQuestion);
  const CheckIsStackNumber = (number: number) => {
    const whole = Math.floor(currentQuestionNumber);
    const remainder = whole % 10;
    const finalNumber = remainder === 0 ? 10 : remainder;
    const isStack = finalNumber === stackNumber;
    const isStackNumber = isStack ? number * 2 : number;
    return isStackNumber;
  };
  const options = [
    "Both Statement-1 and statement 2 are correct and Statement-2 explains Statement-1",
    "Both Statement-1 and Statement-2 are correct, but Statement-2 does not explain Statement-1",
    "Statement-1 is correct, but Statement-2 is incorrect",
    "Statement-1 is incorrect, but Statement-2 is correct",
  ];
  const handleCheck = (id: number, type: "true" | "false") => {
    setAnswers((prev) => {
      let newAnswers: any = { ...prev };
      if (
        (type === "true" && newAnswers[id] === 1) ||
        (type === "false" && newAnswers[id] === 0)
      ) {
        newAnswers[id] = undefined;
      } else {
        if (type === "true") {
          options.forEach((_, i) => {
            newAnswers[i] =
              i === id ? 1 : newAnswers[i] === 1 ? undefined : newAnswers[i];
          });
          newAnswers[id] = 1;
        } else if (type === "false") {
          const falseCount = Object.values(newAnswers).filter(
            (v) => v === 0
          ).length;
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

  const handleQuestionNumberClick = (questionNumber: number) => {
    setCurrentQuestionNumber(questionNumber);
  };

  const handleLanguageChange = () => {
    setLanguage(
      language === LANGUAGES.ENGLISH ? LANGUAGES.HINDI : LANGUAGES.ENGLISH
    );
  };

  const handleNextQueClick = () => {
    const totalQue = QA.length;

    Storage.setItem(
      STORAGE_KEYS.CONTEST_QA_EDIT,
      JSON.stringify(currentQuestion)
    );

    if (currentQuestionNumber >= totalQue) return;
    setCurrentQuestionNumber(currentQuestionNumber + 1);
  };

  const handlePrevQueClick = () => {
    if (currentQuestionNumber <= 1) return;
    setCurrentQuestionNumber(currentQuestionNumber - 1);
  };

  const ConfidenceButtons = [
    {
      label: "100% Sure",
      color: "bg-blue-600",
      icon: <MdLibraryAddCheck className="text-lg" />,
    },
    {
      label: "Logic Play",
      color: "bg-rose-500",
      icon: <FaLightbulb className="text-lg" />,
    },
    {
      label: "Intuition Hit",
      color: "bg-sky-500",
      icon: <MdVisibility className="text-lg" />,
    },
    {
      label: "Blind Fire",
      color: "bg-amber-500",
      icon: <MdVisibilityOff className="text-lg" />,
    },

    {
      label: "Fear - Driver Skip",
      color: "bg-green-700",
      icon: <RiFileCheckFill className="text-lg" />,
    },
    {
      label: "Skip",
      color: "bg-purple-700",
      icon: <TbMessageQuestion className="text-lg" />,
    },
  ];

  return (
    <>
      <div className="sub-container pt-4 md:pt-8 question-section">
        {/* Header */}
        <CardHeader
          title="Question & answer"
          icon={<BsFillAlarmFill />}
          time="25 Min 10s Left"
        />
        <div className="flex justify-center">
          <p className="font-bold mb-0 bg-input-box p-2 px-5 rounded-lg mt-4 w-fit">
            Do not exit the web. Press the submit button on last question to
            lock your.
          </p>
        </div>
        <span className="border-t border-card-border flex w-full mt-4" />

        {/* Main Content */}
        <div className="flex justify-end mt-3">
          <button
            onClick={() => setOpen(!isOpen)}
            className="2xl:hidden ml-2 cursor-pointer p-1 flex justify-center items-center rounded-xl w-10 sm:w-12 h-10 sm:h-12 bg-input-box"
          >
            <HiOutlineBars3BottomRight className="text-xl sm:text-2xl" />
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 w-full">
          {/* Left Panel */}
          <div className="col-span-4 2xl:col-span-3">
            {/* Question Header */}
            <div>
              <div className="flex flex-wrap items-center gap-3 mt-3">
                <span className="bg-input-box font-bold text-sm p-2 px-4 rounded">
                  Question : {currentQuestionNumber}
                </span>

                <div className="relative inline-block">
                  <span className="bg-green-100 text-green-700 text-sm font-bold py-2 px-4 rounded">
                    +{CheckIsStackNumber(positiveMarks) || 0}
                  </span>

                  {(() => {
                    const currentStack = CheckIsStackNumber(positiveMarks);
                    if (currentStack !== positiveMarks) {
                      return (
                        <span className="absolute -top-3 -right-2 bg-success text-white text-xs font-bold px-2 py-0.5 rounded-full shadow-md">
                          2x
                        </span>
                      );
                    }
                    return null;
                  })()}
                </div>
                <span className="bg-red-100 text-red-700 text-sm font-bold py-2 px-4 rounded">
                  -{negativeMarks || 0}{" "}
                </span>
                <div className="flex flex-wrap items-center justify-center sm:ml-auto gap-3">
                  <span
                    onClick={handleLanguageChange}
                    className="text-sm font-bold flex flex-nowrap gap-2"
                  >
                    <IoLanguage className="text-xl" />
                    Language
                  </span>
                  <span className="text-sm font-bold flex flex-nowrap gap-2">
                    <IoBookmarkOutline className="text-xl" />
                    Save
                  </span>
                  <span
                    className="text-sm font-bold flex flex-nowrap gap-2 cursor-pointer"
                    onClick={() => dispatch(setReportModal())}
                  >
                    <TbReport className="text-xl" />
                    Report
                  </span>
                </div>
              </div>
              <span className="border-t border-card-border flex w-full my-4" />

              <div className="mb-4">
                <p className="font-bold text-lg mb-1">
                  {currentQuestion?.[language]?.question}
                  {/* which of the statements given above is/are correct?  */}
                </p>
              </div>
            </div>

            {/* Passage Section */}
            {QA.length > 0 &&
              currentQuestion?.questionType === QUE_TYPE.NORMAL && (
                <>
                  <div className="bg-input-box p-3 sm:p-6 rounded-2xl">
                    <div className="!grid grid-cols-1 lg:grid-cols-2 gap-3">
                      {Object.keys(currentQuestion[language]?.options).map(
                        (opt, i) => {
                          console.log(opt);

                          return (
                            <div
                              key={i}
                              className={`border-2 border-card-border flex items-center gap-3 p-4 m-0 rounded-2xl cursor-pointer transition-all ${
                                answers[i] === 1
                                  ? "border-green-500 bg-green-50"
                                  : answers[i] === 0
                                  ? "border-red-500 bg-red-50"
                                  : "border-gray-300 hover:bg-gray-50"
                              }`}
                            >
                              {
                                <NormalQuestion
                                  key={i}
                                  id={i}
                                  opt={opt}
                                  text={currentQuestion[language].options[opt]}
                                  answers={answers}
                                  onCheck={handleCheck}
                                />
                              }
                            </div>
                          );
                        }
                      )}
                    </div>
                  </div>
                </>
              )}

            {QA.length > 0 &&
              currentQuestion?.questionType === QUE_TYPE.STATEMENT && (
                <>
                  <div className="space-y-6 pb-6 rounded-2xl">
                    {Object.keys(currentQuestion[language]?.options)?.map(
                      (opt, i) => {
                        console.log(opt);
                        return (
                          <div key={i}>
                            {
                              <StatementQuestion
                                key={i}
                                id={i}
                                opt={opt}
                                statements={
                                  currentQuestion[language]?.statementQuestion[
                                    i
                                  ]?.combined
                                }
                                answers={answers}
                                onCheck={handleCheck}
                              />
                            }
                          </div>
                        );
                      }
                    )}
                  </div>
                  <div className="bg-input-box p-3 sm:p-6 rounded-2xl">
                    <div className="!grid grid-cols-1 lg:grid-cols-2 gap-3">
                      {Object.keys(currentQuestion[language]?.options).map(
                        (opt, i) => {
                          console.log(opt);

                          return (
                            <div
                              key={i}
                              className={`border-2 border-card-border flex items-center gap-3 p-4 m-0 rounded-2xl cursor-pointer transition-all ${
                                answers[i] === 1
                                  ? "border-green-500 bg-green-50"
                                  : answers[i] === 0
                                  ? "border-red-500 bg-red-50"
                                  : "border-gray-300 hover:bg-gray-50"
                              }`}
                            >
                              {
                                <NormalQuestion
                                  key={i}
                                  id={i}
                                  opt={opt}
                                  text={currentQuestion[language].options[opt]}
                                  answers={answers}
                                  onCheck={handleCheck}
                                />
                              }
                            </div>
                          );
                        }
                      )}
                    </div>
                  </div>
                </>
              )}

            {QA.length > 0 &&
              currentQuestion?.questionType === QUE_TYPE.PAIR && (
                <>
                  <div className="space-y-4 pb-6 rounded-2xl">
                    <PairTable
                      pair={currentQuestion[language]?.pairQuestion}
                      pairTitle={
                        currentQuestion[language]?.pairQuestion?.[0]?.combined
                      }
                    />

                    <span className="font-bold text-xl px-2 rounded">
                      {currentQuestion[language]?.lastQuestion}
                    </span>
                  </div>

                  <div className="bg-input-box p-3 sm:p-6 rounded-2xl">
                    <div className="!grid grid-cols-1 lg:grid-cols-2 gap-3">
                      {Object.keys(currentQuestion[language]?.options).map(
                        (opt, i) => {
                          console.log(opt);

                          return (
                            <div
                              key={i}
                              className={`border-2 border-card-border flex items-center gap-3 p-4 m-0 rounded-2xl cursor-pointer transition-all ${
                                answers[i] === 1
                                  ? "border-green-500 bg-green-50"
                                  : answers[i] === 0
                                  ? "border-red-500 bg-red-50"
                                  : "border-gray-300 hover:bg-gray-50"
                              }`}
                            >
                              {
                                <NormalQuestion
                                  key={i}
                                  id={i}
                                  opt={opt}
                                  text={currentQuestion[language].options[opt]}
                                  answers={answers}
                                  onCheck={handleCheck}
                                />
                              }
                            </div>
                          );
                        }
                      )}
                    </div>
                  </div>
                </>
              )}

            {/* Confidence Buttons */}
            <span className="border-t border-card-border flex w-full my-6" />

            <section id="QA_Buttons" className="w-full">
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-2 my-8 max-xl:justify-center">
                {ConfidenceButtons.map((btn, i) => (
                  <button
                    key={i}
                    className={`flex justify-center items-center gap-3 shadow-btn-shadow color-1 p-3 text-sm font-semibold text-white rounded-xl transition-all duration-200 hover:animate-pulse ${btn.color}`}
                  >
                    {btn.icon}
                    {btn.label}
                  </button>
                ))}
              </div>
              <div className="flex flex-wrap justify-between gap-2 ">
                <FormButton
                  onClick={handlePrevQueClick}
                  text="Previous"
                  className="custom-button-light w-full sm:w-30 button button--mimas text-center !p-4 !h-13 uppercase "
                />
                <FormButton
                  onClick={handleNextQueClick}
                  text="Save & Next"
                  className="custom-button w-full sm:w-40 button button--mimas text-center !p-4 !h-13 uppercase"
                />
              </div>
            </section>
          </div>

          {/* Right Panel */}
          <div
            onClick={() => setOpen(!isOpen)}
            className="bg-input-box p-6 rounded-2xl w-full max-2xl:hidden 2xl:!flex 2xl:items-center max-2xl:before:fixed max-2xl:before:bg-black max-2xl:before:opacity-40 max-2xl:before:inset-0 max-2xl:before:z-50"
            style={{ display: isOpen ? "block" : "none" }}
          >
            {/* Legend */}
            <div
              onClick={(e) => e.stopPropagation()}
              className="2xl:gap-x-10 max-2xl:space-y-3 max-2xl:fixed max-2xl:bg-[#ffffff] w-full max-2xl:max-w-[400px] max-2xl:min-w-[200px] max-2xl:top-0 max-2xl:right-0  max-2xl:px-5 max-2xl:py-4 max-2xl:h-full max-2xl:shadow-md max-2xl:overflow-auto max-2xl:z-50"
            >
              <div className="mb-6 hidden max-2xl:block">
                <div className="flex justify-between items-center">
                  <a href="javascript:void(0)">Questions</a>
                  <button
                    id="toggleClose"
                    onClick={() => setOpen(!isOpen)}
                    className=" z-[100] rounded-xl bg-input-box w-9 h-9 flex items-center justify-center cursor-pointer"
                  >
                    <RxCross2 className="w-5 h-5" />
                  </button>
                </div>
                <span className="border-t border-card-border flex w-full mt-4 mb-10" />
              </div>

              <div className="grid grid-cols-2 gap-3 text-xs mb-4">
                <div className="flex items-center gap-1">
                  <span className="w-6 h-6 border answered" />
                  <span>Answered</span>
                </div>
                <div className="flex items-center gap-1">
                  <span className="w-6 h-6 border unanswered" />
                  <span>Unanswered</span>
                </div>
                <div className="flex items-center gap-1">
                  <span className="w-6 h-6 border marked relative">
                    <span className="absolute -top-1 -right-1 size-2.5 rounded-full bg-success" />
                  </span>
                  <span>Marked</span>
                </div>
                <div className="flex items-center gap-1">
                  <span className="w-6 h-6 border not-visited" />
                  <span>Not Visited</span>
                </div>
                <div className="flex items-center gap-1">
                  <span className="w-6 h-6 border skip" />
                  <span>Skip</span>
                </div>
              </div>
              <span className="border-t border-card-border flex w-full my-4" />

              {/* Question Grid */}
              <div className="grid grid-cols-5 gap-2">
                {Array.from({ length: QA?.length }, (_, i) => (
                  <button
                    onClick={() => handleQuestionNumberClick(i + 1)}
                    key={i}
                    className={`max-w-full h-10 border text-sm font-medium flex items-center justify-center ${
                      i === 0 ? "answered" : "not-visited "
                    }`}
                  >
                    {i + 1}
                  </button>
                ))}
              </div>

              {/* End Test Button */}
              <div className="flex flex-col gap-3 mt-5">
                <button
                  onClick={() => dispatch(setInstructionsDrawer())}
                  className="flex justify-center items-center gap-2 bg-white border border-card-border hover:bg-input-box-dark transition-all font-bold text-sm p-2 px-4 rounded cursor-pointer"
                >
                  <HiMiniInformationCircle size={20} />
                  Instructions
                </button>
                <FormButton
                  text="END TEST"
                  onClick={() => dispatch(setEndTestDrawer())}
                  className="w-full !text-md !font-bold transition-all hover:!bg-red-100 hover:!text-red-700 text-center !p-4 !h-13 uppercase !border-1 !border-danger"
                />
              </div>
            </div>
          </div>
        </div>
        <EndTest />
      </div>
      <InstructionsDrawer />
      <ReportModal
        payload={{
          contestId: contestId,
          questionId: currentQuestion?._id,
          qaId: _id,
        }}
      />
    </>
  );
};

export default Question;
