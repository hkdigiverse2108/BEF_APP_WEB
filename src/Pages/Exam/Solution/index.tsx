import { Empty, Select, Skeleton, Tooltip } from "antd";
import { useEffect, useState } from "react";
import { BsExclamationCircle } from "react-icons/bs";
import { FaRegCircle, FaRobot } from "react-icons/fa";
import { HiOutlineBars3BottomLeft } from "react-icons/hi2";
import { IoLanguage } from "react-icons/io5";
import { RxCross2 } from "react-icons/rx";
import { Link, useLocation, useParams } from "react-router-dom";
import { useGetApiQuery, usePostApiMutation } from "../../../Api/CommonApi";
import { FormButton } from "../../../Attribute/FormFields";
import { CardHeader } from "../../../Components/Common/CardHeader";
import { PairTable } from "../../../Components/Common/PairHeader";
import { StatementQuestion } from "../../../Components/Common/StatementQuestion";
import ReportModal from "../../../Components/Exam/Question/ReportModal";
import { HTTP_STATUS, ROUTES, STORAGE_KEYS, URL_KEYS } from "../../../Constants";
import { SolutionsOptions, WhyFalseOptions } from "../../../Data";
import { LANGUAGES, QUE_TYPE } from "../../../Data/Question";
import { useAppDispatch, useAppSelector } from "../../../Store/hooks";
import type { Answer, ContestTypeData, LanguageKey, QaApiResponse } from "../../../Types";
import { isImage, Storage, updateStorage } from "../../../Utils";
import SolutionSection from "../../../Components/Exam/Solution/SolutionSection";
import { setCurrentSolutionQuestion, setSolutionFilter } from "../../../Store/Slices/FilterSlice";

const Solution = () => {
  const { SolutionFilter, SolutionCurrentQuestion } = useAppSelector((state) => state.filter);

  const [isOpenQuestion, setOpenQuestion] = useState(false);
  const [isOpenSolution, setOpenSolution] = useState(false);
  const [isQaLoading, setQaLoading] = useState(true);
  const [QAData, setQAData] = useState<ContestTypeData | null>(null);
  const [isQaAnswers, setQaAnswers] = useState<Answer[]>([]);
  const [originalAnswers, setOriginalAnswers] = useState<Answer[]>([]);
  const [language, setLanguage] = useState<LanguageKey>(LANGUAGES.ENGLISH as LanguageKey);
  const [currentQuestionNumber, setCurrentQuestionNumber] = useState(SolutionCurrentQuestion);
  const [PostApi, { isLoading: isPostLoading }] = usePostApiMutation();

  const dispatch = useAppDispatch();

  const { search } = useLocation();
  const { id } = useParams();
  const queryParam = new URLSearchParams(search);
  const contestId = queryParam.get("contestId");

  const { data: QAApiData, isLoading, refetch } = useGetApiQuery<QaApiResponse>({ url: `${URL_KEYS.QA.ALL}?page=1&limit=10&qaFilter=${id}` });
  const stored = Storage.getItem(STORAGE_KEYS.EXAM_QA_SOLUTION);

  useEffect(() => {
    if (!isLoading && QAApiData?.data) {
      const obj = QAApiData?.data?.contest_type_data[0];
      const enriched = {
        ...obj,
        answers: obj?.answers?.map((ans: Answer, index) => ({
          ...ans,
          qaNumber: index + 1,
        })),
      };
      updateStorage(STORAGE_KEYS.EXAM_QA_SOLUTION, enriched);
      setQAData(enriched);
      setQaLoading(isLoading);
    }
  }, [QAApiData?.data, isLoading]);
  useEffect(() => {
    if (stored) {
      setQAData(JSON.parse(stored));
      setQaLoading(false);
    }
  }, [stored]);

  useEffect(() => {
    if (QAData?.answers) {
      setOriginalAnswers(QAData.answers);
      setQaAnswers(QAData.answers);
    }
  }, [QAData]);

  const QaAnswers = QAData?.answers || [];
  const currentQuestionAnswers = isQaAnswers[currentQuestionNumber - 1];

  const QuestionData = QAData?.answers?.find((q) => q._id === currentQuestionAnswers?._id);

  const currentQuestion = QuestionData?.questionId;

  const currentQuestionLanguage = currentQuestion?.[language];

  const { data: AiMentorData } = useGetApiQuery(currentQuestion?._id ? { url: `${URL_KEYS.QUESTION.AI_MENTOR}?questionId=${currentQuestion?._id}` } : { skip: true });
  const AiMentor = AiMentorData?.data;

  const CheckIsStackNumber = (number: number) => {
    const whole = Math.floor(currentQuestionAnswers?.qaNumber || 0);
    const remainder = whole % 10;
    const finalNumber = remainder === 0 ? 10 : remainder;
    const stack = finalNumber === QAData?.stackNumber;
    return stack ? number * 2 : number;
  };

  const CheckRightAndWrongAnswers = (item: Answer) => {
    const isSkipped = item?.type === "skip" || item?.type === "fearDriverSkip";
    if (!item?.answer || isSkipped) return "unanswered";
    return item.answer === item.rightAnswer ? "correct" : "incorrect";
  };

  const CheckWhyFalseAnswers = (item: Answer) => {
    return item.answer === item.rightAnswer ? true : false;
  };

  const handleSolutionsFilter = (values: string) => {
    setCurrentQuestionNumber(1);
    dispatch(setCurrentSolutionQuestion(1));
    dispatch(setSolutionFilter(values));
    if (values === "all") setQaAnswers(QaAnswers);
    else setQaAnswers(QaAnswers?.filter((item) => CheckRightAndWrongAnswers(item) === values));
  };
  useEffect(() => {
    if (SolutionFilter === "all") setQaAnswers(originalAnswers);
    else setQaAnswers(originalAnswers.filter((item) => CheckRightAndWrongAnswers(item) === SolutionFilter));
  }, [SolutionFilter, originalAnswers]);

  const handleWhyFalseChange = async (value: string) => {
    const enriched = {
      ...QAData,
      answers: QaAnswers?.map((ans: Answer) => (ans.questionId === currentQuestionAnswers?.questionId ? { ...ans, whyFalse: value } : ans)),
    };
    updateStorage(STORAGE_KEYS.EXAM_QA_SOLUTION, enriched);
    const whyFalse = {
      qaId: id,
      answerId: currentQuestionAnswers?.questionId?._id,
      whyFalse: value,
    };
    const res = await PostApi({ url: URL_KEYS.QA.WHY_FALSE, data: whyFalse });
    if (res?.data?.status === HTTP_STATUS.OK) {
      refetch();
    }
  };

  const handleLanguageChange = () => setLanguage((prev) => (prev === LANGUAGES.ENGLISH ? (LANGUAGES.HINDI as "hindiQuestion") : (LANGUAGES.ENGLISH as "englishQuestion")));

  const handleNextQueClick = () => {
    window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
    dispatch(setCurrentSolutionQuestion(SolutionCurrentQuestion + 1));
    setCurrentQuestionNumber((prev) => prev + 1);
  };

  const handlePrevQueClick = () => {
    window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
    dispatch(setCurrentSolutionQuestion(SolutionCurrentQuestion - 1));
    setCurrentQuestionNumber((prev) => prev - 1);
  };

  const handleQuestionNumberClick = (questionNumber: number) => {
    window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
    dispatch(setCurrentSolutionQuestion(questionNumber));
    setCurrentQuestionNumber(questionNumber);
  };

  const ALMentor = (className: string) => (
    <span className={`${className} flex gap-2 bg-input-box font-semibold text-sm p-2 px-3 rounded capitalize`}>
      <Tooltip title={"AL Mentor: Unlock strategies by exploring how others tackled this question and discover your most effective weapon bases on past performance!"}>
        <BsExclamationCircle className="text-xl" />
      </Tooltip>
    </span>
  );

  const formatType = (str: string) => {
    return str
      .replace(/([A-Z])/g, " $1")
      .trim()
      .replace(/\b\w/g, (c) => c.toUpperCase());
  };
  return (
    <>
      <div className="sub-container pt-4 md:pt-8 question-section solution">
        {/* Header */}
        <CardHeader title="Solution" />
        <span className="border-t border-card-border flex w-full mt-4 mb-6" />

        <div className="grid grid-cols-1 2xl:grid-cols-6 gap-6 w-full">
          {/* Left Panel */}
          <div className="col-span-4 2xl:col-span-4">
            {/* Question Header */}
            <div>
              <div className="flex flex-wrap justify-between items-center gap-3 mt-3">
                <div className="flex flex-wrap items-center gap-3">
                  <span className="bg-input-box font-semibold text-sm p-2 rounded cursor-pointer" onClick={() => setOpenQuestion(!isOpenQuestion)}>
                    <Tooltip title="All Questions">
                      <HiOutlineBars3BottomLeft className="text-xl" />
                    </Tooltip>
                  </span>
                  <Select placeholder="All Solutions" options={SolutionsOptions} className="!m-0" onChange={handleSolutionsFilter} defaultValue={SolutionFilter} />
                </div>
                <Link to={`${ROUTES.EXAM.MISTAKE_MAP_REPORT.replace(":id", id || "")}${search}`} className="bg-linear-to-r from-(--primary) to-(--success) text-white font-semibold text-sm p-2 px-4 rounded capitalize">
                  mistake map report
                </Link>
                {/* <span className="bg-input-box font-semibold text-sm p-2  rounded">
                  <PiFilePdf className="text-xl" />
                </span> */}
              </div>
              <span className="border-t border-card-border flex w-full my-6" />
              {isQaAnswers?.length !== 0 && (
                <>
                  <div className="flex flex-wrap items-center gap-3 mt-3">
                    <div className="relative inline-block">
                      <span className="bg-input-box font-semibold text-sm p-2 px-4 rounded">Question : {currentQuestionAnswers?.qaNumber}</span>
                      {(() => {
                        const currentStack = CheckIsStackNumber(QAData?.positiveMarks as number);
                        if (currentStack !== QAData?.positiveMarks) {
                          return <span className="absolute -top-3 -right-2 bg-primary text-white text-xs font-semibold px-2 py-0.5 rounded-full shadow-md">2x</span>;
                        }
                        return null;
                      })()}
                    </div>
                    {CheckRightAndWrongAnswers(currentQuestionAnswers) === "correct" && <span className="bg-green-100 text-green-700 text-sm font-semibold py-2 px-4 rounded">+ {CheckIsStackNumber(QAData?.positiveMarks as number) || 0}</span>}
                    {CheckRightAndWrongAnswers(currentQuestionAnswers) === "incorrect" && <span className="bg-red-100 text-red-700 text-sm font-semibold py-2 px-4 rounded">{CheckIsStackNumber(QAData?.negativeMarks as number) || 0}</span>}
                    <div className="flex flex-wrap items-center justify-center sm:ml-auto gap-3">
                      <span onClick={handleLanguageChange} className={`flex gap-2 bg-input-box font-semibold text-sm p-2 px-4 rounded capitalize ${language === "hindiQuestion" ? "border border-input-box-dark" : ""}`}>
                        <IoLanguage className="text-xl" />
                      </span>
                      {(CheckRightAndWrongAnswers(currentQuestionAnswers) === "incorrect" || (currentQuestionAnswers?.type === "fearDriverSkip" && !CheckWhyFalseAnswers(currentQuestionAnswers))) && <Select allowClear loading={isPostLoading} onChange={handleWhyFalseChange} placeholder="Why False" options={WhyFalseOptions} className="!m-0 solution-select" value={currentQuestionAnswers?.whyFalse} />}
                    </div>
                  </div>
                  <span className="border-t border-card-border flex w-full my-6" />
                  <div className="flex flex-wrap items-center gap-3">
                    <p className="bg-input-box font-semibold text-sm p-2 px-4 rounded text-neutral-500">{currentQuestion?.subtopicId?.name}</p>
                    <p className="bg-input-box font-semibold text-sm p-2 px-4 rounded text-neutral-500">
                      Strategy :<span className="text-black"> {formatType(currentQuestionAnswers?.type || "")}</span>
                    </p>
                    {ALMentor("sm:hidden")}
                    <div className="flex flex-wrap items-center justify-center sm:ml-auto gap-3">{ALMentor("max-sm:hidden")}</div>
                  </div>
                  <div className="relative my-6 shadow-lg rounded-2xl p-0.5 animate-gradient-border bg-linear-to-r from-(--primary) via-(--success) to-(--primary) bg-[length:200%_200%]">
                    <div className="bg-white rounded-2xl p-6">
                      <p className="font-semibold mb-2 text-2xl flex gap-2">
                        <FaRobot />
                        AI Mentor
                      </p>
                      <ul className="list-[square] ps-5">
                        {AiMentor?.type && (
                          <li className="font-normal mb-2">
                            In This Subject : <span className="italic font-semibold capitalize"> {AiMentor?.type} </span> based question
                          </li>
                        )}
                        {AiMentor?.otherStrategy?.strategyPercentage && AiMentor?.otherStrategy?.strategyType && (
                          <li className="font-normal mb-2">
                            Other : <span className="italic font-semibold"> {AiMentor?.otherStrategy?.strategyPercentage}% </span>
                            Accuracy using
                            <span className="italic font-semibold capitalize"> {formatType(AiMentor?.otherStrategy?.strategyType || "")} </span>
                          </li>
                        )}
                        {AiMentor?.youStrategy?.percentage && AiMentor?.youStrategy?.type && (
                          <li className="font-normal">
                            Your : <span className="italic font-semibold"> {AiMentor?.youStrategy?.percentage}% </span>
                            Accuracy using
                            <span className="italic font-semibold capitalize"> {formatType(AiMentor?.youStrategy?.type || "")} </span>
                          </li>
                        )}
                      </ul>
                    </div>
                  </div>
                </>
              )}
            </div>

            {/* Passage Section */}
            {isQaAnswers?.length !== 0 ? (
              <>
                <div className="bg-white border border-card-border p-3 sm:p-6 rounded-xl shadow-lg">
                  {isQaLoading ? (
                    <Skeleton.Input active style={{ height: 35, borderRadius: 5 }} block className="mb-3" />
                  ) : (
                    <>
                      <div className="mb-4">{isLoading ? <Skeleton.Input active style={{ height: 35, borderRadius: 5 }} block /> : isImage(currentQuestionLanguage?.question || "") ? <img src={currentQuestionLanguage?.question} alt="question" className="mb-2 transparent-img" /> : <p className="font-normal text-lg mb-1">{currentQuestionLanguage?.question}</p>}</div>
                      {/* STATEMENT Section */}
                      {QaAnswers.length > 0 && (currentQuestion?.questionType === QUE_TYPE.STATEMENT || currentQuestion?.questionType === QUE_TYPE.STATEMENT_CSAT) && (
                        <div className="space-y-6 pb-6 rounded-2xl">
                          {Object.keys(currentQuestionLanguage?.statementQuestion || {})?.map((_, i) => {
                            return <div key={i}>{<StatementQuestion key={i} id={i} statements={currentQuestionLanguage?.statementQuestion[i]?.combined} />}</div>;
                          })}
                          <span className="font-normal text-lg rounded">{currentQuestionLanguage?.lastQuestion}</span>
                        </div>
                      )}

                      {/* PAIR Section */}
                      {QaAnswers.length > 0 && currentQuestion?.questionType === QUE_TYPE.PAIR && (
                        <div className="space-y-4 pb-6 rounded-2xl">
                          <PairTable pair={currentQuestionLanguage?.pairQuestion || []} pairTitle={currentQuestionLanguage?.pairQuestion?.[0]?.combined || ""} />
                          <span className="font-normal text-lg rounded">{currentQuestionLanguage?.lastQuestion}</span>
                        </div>
                      )}
                    </>
                  )}
                  <div className="!grid grid-cols-1 lg:grid-cols-2 gap-3">
                    {isQaLoading
                      ? [...Array(4)]?.map((_, i) => <Skeleton.Node key={i} active style={{ width: "100%", height: 60, borderRadius: 15 }} />)
                      : Object.keys(currentQuestionLanguage?.options || {})?.map((opt, i) => {
                          const userAnswer = currentQuestionAnswers?.answer;
                          const hasAnswered = !!userAnswer;
                          const isRightAnswer = hasAnswered && opt === currentQuestionAnswers?.rightAnswer;
                          const isWrongAnswer = hasAnswered && opt === userAnswer && opt !== currentQuestionAnswers?.rightAnswer;

                          return (
                            <div key={i} className={`border-1 border-card-border flex items-center gap-3 p-4 m-0 rounded-md cursor-pointer transition-all ${isRightAnswer ? "border-green-500 bg-green-50" : isWrongAnswer ? "border-red-500 bg-red-50" : "border-gray-200 "}`}>
                              <div className="flex max-sm:flex-col items-center w-full gap-3 question">
                                <div className="relative">
                                  {isRightAnswer ? <FaRegCircle style={{ color: "green", width: "21px", height: "21px" }} /> : isWrongAnswer ? <FaRegCircle style={{ color: "red", width: "21px", height: "21px" }} /> : <FaRegCircle style={{ color: "gray", width: "21px", height: "21px" }} />}
                                  <span className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-xs ${isRightAnswer ? "text-success" : isWrongAnswer ? "text-danger" : ""}`}>{opt}</span>
                                </div>
                                {isImage(currentQuestionLanguage?.options[opt] || "") ? <img src={currentQuestionLanguage?.options[opt] || ""} className="transparent-img" alt="question" /> : <span className={`flex-1 font-normal capitalize ${isRightAnswer ? "text-success" : isWrongAnswer ? "text-danger" : ""}`}>{currentQuestionLanguage?.options[opt] || ""}</span>}
                              </div>
                            </div>
                          );
                        })}
                  </div>
                </div>
                <div className="my-3 hidden max-2xl:block col-span-2 !space-y-3">
                  <FormButton
                    text={isOpenSolution ? "Close Solution" : "See Solution"}
                    onClick={() => setOpenSolution(!isOpenSolution)}
                    className="custom-button w-full sm:w-40 button button--mimas text-center !p-4 !h-13 uppercase"
                  />
                  <SolutionSection setOpenSolution={setOpenSolution} isOpenSolution={isOpenSolution} isQaAnswers={isQaAnswers} currentQuestionLanguage={currentQuestionLanguage} isImage={isImage} />
                </div>
              </>
            ) : (
              <Empty />
            )}
            <span className="border-t border-card-border flex w-full my-6" />
            <div className="flex flex-wrap justify-between gap-2 ">
              <FormButton onClick={handlePrevQueClick} disabled={currentQuestionNumber === 1} text="Previous" className="custom-button-light w-full sm:w-30 button button--mimas text-center !p-4 !h-13 uppercase" />
              <FormButton onClick={handleNextQueClick} disabled={currentQuestionNumber === isQaAnswers.length} text="Next" className="custom-button w-full sm:w-40 button button--mimas text-center !p-4 !h-13 uppercase" />
            </div>
          </div>
          {/* Right Panel */}
          <div className="hidden 2xl:block col-span-2">
            <SolutionSection setOpenSolution={setOpenSolution} isOpenSolution={isOpenSolution} isQaAnswers={isQaAnswers} currentQuestionLanguage={currentQuestionLanguage} isImage={isImage} />
          </div>
          {/* All Questions */}
          <div onClick={() => setOpenQuestion(!isOpenQuestion)} className="rounded-2xl w-full hidden before:fixed before:bg-black before:opacity-40 before:inset-0 before:z-50" style={{ display: isOpenQuestion ? "block" : "none" }}>
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
              {isQaAnswers?.length !== 0 ? (
                <div className="grid grid-cols-5 gap-2">
                  {isQaAnswers?.map((item, i) => {
                    let type: "answered" | "unanswered" | "not-visited" = "not-visited";
                    const isSkipped = item?.type === "skip" || item?.type === "fearDriverSkip";
                    if (!isSkipped && item?.answer) {
                      type = item?.answer === item?.rightAnswer ? "answered" : "unanswered";
                    }
                    return (
                      <button key={i} onClick={() => handleQuestionNumberClick(i + 1)} className={`max-w-full h-10 border text-sm font-medium flex items-center justify-center ${type}`}>
                        {item?.qaNumber}
                      </button>
                    );
                  })}
                </div>
              ) : (
                <Empty />
              )}
            </div>
          </div>
        </div>
      </div>
      <ReportModal payload={{ contestId: contestId, questionId: currentQuestion?._id as string, qaId: id as string }} />
    </>
  );
};

export default Solution;
