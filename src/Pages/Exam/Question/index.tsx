import { message, Skeleton } from "antd";
import { useEffect, useState } from "react";
import { BsFillAlarmFill } from "react-icons/bs";
import { FaLightbulb } from "react-icons/fa";
import { HiMiniInformationCircle, HiOutlineBars3BottomRight } from "react-icons/hi2";
import { IoBookmark, IoBookmarkOutline, IoLanguage } from "react-icons/io5";
import { MdLibraryAddCheck, MdVisibility, MdVisibilityOff } from "react-icons/md";
import { RiFileCheckFill } from "react-icons/ri";
import { RxCross2 } from "react-icons/rx";
import { TbMessageQuestion, TbReport } from "react-icons/tb";
import { useLocation, useNavigate } from "react-router-dom";
import { useGetApiQuery, usePostApiMutation } from "../../../Api/CommonApi";
import { FormButton } from "../../../Attribute/FormFields";
import { CardHeader } from "../../../Components/Common/CardHeader";
import { NormalQuestion } from "../../../Components/Common/NormalQuestion";
import { PairTable } from "../../../Components/Common/PairHeader";
import { StatementQuestion } from "../../../Components/Common/StatementQuestion";
import EndTest from "../../../Components/Exam/Question/EndTestDrawer";
import InstructionsDrawer from "../../../Components/Exam/Question/InstructionsDrawer";
import ReportModal from "../../../Components/Exam/Question/ReportModal";
import { HTTP_STATUS, ROUTES, STORAGE_KEYS, URL_KEYS } from "../../../Constants";
import { LANGUAGES, QUE_TYPE } from "../../../Data/Question";
import { setEndTestDrawer, setInstructionsDrawer, setReportModal } from "../../../Store/Slices/DrawerSlice";
import { useAppDispatch } from "../../../Store/hooks";
import type { LanguageKey, QuestionApiResponse, QuestionType } from "../../../Types";
import { Storage, updateStorage } from "../../../Utils";
import { useCountDown } from "../../../Utils/Hook";

const Question = () => {
  const [isAnswers, setAnswers] = useState<{ [key: number]: number | undefined }>({});
  const [isQa, setQa] = useState<{ [key: number]: number | undefined }>({});
  const [isConfidence, setConfidence] = useState("");
  const [isAnswersType, setAnswersType] = useState<string[]>([]);
  const [isSkip, setSkip] = useState(false);
  const [isOpen, setOpen] = useState(false);
  const [QAData, setQAData] = useState<QuestionType | null>(null);
  const [messageApi, contextHolder] = message.useMessage();
  const [currentQuestionNumber, setCurrentQuestionNumber] = useState(1);
  const [language, setLanguage] = useState<LanguageKey>(LANGUAGES.ENGLISH as LanguageKey);
  const [PostApi, { isLoading: isPostLoading }] = usePostApiMutation();

  const dispatch = useAppDispatch();
  const location = useLocation();
  const navigate = useNavigate();

  const queryParam = new URLSearchParams(location.search);
  const contestId = queryParam.get("contestId");
  useEffect(() => {
    if (!contestId) {
      Storage.removeItem(STORAGE_KEYS.EXAM_QA_ALL);
      Storage.removeItem(STORAGE_KEYS.EXAM_QA_ANSWERS);
      navigate(ROUTES.CONTEST.MY_CONTEST);
    }
  }, [contestId, navigate]);
  const { data: QAApiData, isLoading } = useGetApiQuery<QuestionApiResponse>({ url: `${URL_KEYS.QA.CONTEST_QUESTION}?contestFilter=${contestId}` });
  const { hours, minutes, seconds, isFinished } = useCountDown(QAData?.contestStartDate || "", QAData?.contestEndDate || "");

  const stored = Storage.getItem(STORAGE_KEYS.EXAM_QA_ALL);
  useEffect(() => {
    if (stored) {
      setQAData(JSON.parse(stored));
    }
  }, [stored]);
  useEffect(() => {
    if (stored) return;
    if (!isLoading && QAApiData?.data) {
      updateStorage(STORAGE_KEYS.EXAM_QA_ALL, QAApiData?.data);
      setQAData(QAApiData?.data);
      const apiAnswers = {
        qaId: QAApiData?.data?._id || "",
        answers: QAApiData?.data?.answers?.map((q, i) => {
          const qIndex = i + 1;
          const whole = Math.floor(qIndex);
          const remainder = whole % 10;
          const finalNumber = remainder === 0 ? 10 : remainder;
          const is2x = finalNumber === QAApiData?.data?.stackNumber;
          return {
            questionId: q._id,
            type: q?.userAnswer?.confidenceType || "",
            is2XStack: is2x,
            eliminateOption: 0,
            eliminateOptionA: false,
            eliminateOptionB: false,
            eliminateOptionC: false,
            eliminateOptionD: false,
            answer: "",
          };
        }),
        contestStartTime: new Date().toISOString(),
        contestEndTime: "",
      };
      updateStorage(STORAGE_KEYS.EXAM_QA_ANSWERS, apiAnswers);
    }
  }, [QAApiData?.data, isLoading]);

  const QA = QAData?.answers || [];
  const { _id, negativeMarks, positiveMarks, stackNumber } = QAData || {};

  const currentQuestion = QA[currentQuestionNumber - 1];
  const currentQuestionLanguage = currentQuestion?.[language];

  const CheckIsStackNumber = (number: number) => {
    const whole = Math.floor(currentQuestionNumber);
    const remainder = whole % 10;
    const finalNumber = remainder === 0 ? 10 : remainder;
    const stack = finalNumber === stackNumber;
    return {
      value: stack ? number * 2 : number,
      stack,
    };
  };
  const { value, stack } = CheckIsStackNumber(positiveMarks as number);

  const handleQaCheck = (id: number, type: "true" | "false") => {
    setQa((prev) => {
      const newAnswers: Record<number, number | undefined> = { ...prev };
      if ((type === "true" && newAnswers[id] === 1) || (type === "false" && newAnswers[id] === 0)) {
        newAnswers[id] = undefined;
        return newAnswers;
      }
      if (type === "true") {
        newAnswers[id] = 1;
        return newAnswers;
      }
      if (type === "false") {
        newAnswers[id] = 0;
        return newAnswers;
      }
      return newAnswers;
    });
  };

  const handleAnswersCheck = (id: number, type: "true" | "false") => {
    setAnswers((prev) => {
      const newAnswers = { ...prev };

      if ((type === "true" && newAnswers[id] === 1) || (type === "false" && newAnswers[id] === 0)) {
        newAnswers[id] = undefined;
        return newAnswers;
      }

      if (type === "true") {
        Object.keys(newAnswers).forEach((key) => {
          if (newAnswers[Number(key)] === 1) newAnswers[Number(key)] = undefined;
        });
        newAnswers[id] = 1;
      } else {
        const falseIds = Object.keys(newAnswers)
          .filter((key) => newAnswers[Number(key)] === 0)
          .map(Number);

        if (falseIds.length < 2) {
          newAnswers[id] = 0;
        } else {
          const oldestFalse = falseIds[0];
          newAnswers[oldestFalse] = undefined;
          newAnswers[id] = 0;
        }
      }

      return newAnswers;
    });
  };

  useEffect(() => {
    const item = QAData?.answers?.find((a) => a._id === currentQuestion?._id);
    setAnswers(item?.userAnswer?.eliminateOption || {});
    setQa(item?.userAnswer?.option || {});
    setConfidence(item?.userAnswer?.confidenceType || "");
    setAnswersType(item?.userAnswer?.answersType || []);
    setSkip(item?.userAnswer?.answersType?.includes("marked") || false);
  }, [QAData?.answers, currentQuestion?._id, currentQuestionNumber]);

  const handleQuestionNumberClick = (questionNumber: number, id: string) => {
    window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
    setCurrentQuestionNumber(questionNumber);

    const item = QAData?.answers?.find((a) => a._id === id);
    window.dispatchEvent(new Event("examStorageUpdate"));
    if (item?.userAnswer?.answersType?.length) {
      setAnswers(item?.userAnswer?.eliminateOption || {});
      setQa(item?.userAnswer?.option || {});
      setConfidence(item?.userAnswer?.confidenceType || "");
      setAnswersType(item?.userAnswer?.answersType || []);
      setSkip(item?.userAnswer?.answersType?.includes("marked") || false);
    } else {
      setAnswers({});
      setQa({});
      setConfidence("");
      setAnswersType(["unanswered"]);
      setSkip(false);

      const obj = {
        answersType: ["unanswered"],
      };
      const data = QAData?.answers?.map((q) => (q._id === id ? { ...q, userAnswer: obj } : q));
      updateStorage(STORAGE_KEYS.EXAM_QA_ALL, { answers: data });
    }
  };

  const handleLanguageChange = () => setLanguage((prev) => (prev === LANGUAGES.ENGLISH ? (LANGUAGES.HINDI as "hindiQuestion") : (LANGUAGES.ENGLISH as "englishQuestion")));

  useEffect(() => {
    // const hasTrue = Object.values(isAnswers).includes(1);
    let type: string[] = [];

    // if (hasTrue) {
    if (["skip", "fearDriverSkip"].includes(isConfidence)) type = ["skip"];
    else type = ["answered"];
    // } else {
    //   type = ["unanswered"];
    // }

    if (isSkip) type.push("marked");
    setAnswersType(type);
  }, [isAnswers, isConfidence, isSkip]);

  const handleEndTestDrawer = async () => {
    updateStorage(STORAGE_KEYS.EXAM_QA_ANSWERS, { contestEndTime: new Date() });
    const QaExamAnswers = JSON.parse(Storage.getItem(STORAGE_KEYS.EXAM_QA_ANSWERS) || "{}");
    const res = await PostApi({ url: URL_KEYS.QA.EDIT, data: QaExamAnswers });
    if (res?.data?.status === HTTP_STATUS.OK) {
      queryParam.delete("contestId");
      navigate(`${ROUTES.EXAM.QUESTION}${queryParam}`);
      Storage.removeItem(STORAGE_KEYS.EXAM_QA_ALL);
      Storage.removeItem(STORAGE_KEYS.EXAM_QA_ANSWERS);
      setAnswers({});
      setQa({});
      setConfidence("");
      setAnswersType(["unanswered"]);
      setSkip(false);
      setQAData(null);
      navigate(ROUTES.EXAM.COUNT_DOWN, { state: { contestStartDate: QAData?.contestStartDate || "", contestEndDate: QAData?.contestEndDate || "" } });
    }
  };

  useEffect(() => {
    const timer = setInterval(() => {
      if (isFinished) {
        clearInterval(timer);
        handleEndTestDrawer();
      }
    }, 1000);

    return () => clearInterval(timer);
  }, [isFinished]);

  const handleNextQueClick = async () => {
    window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
    if (!QAData) return;
    const hasTrue = Object.values(isAnswers).includes(1);
    const hasConfidence = Boolean(isConfidence);
    if (isConfidence !== "fearDriverSkip" && isConfidence !== "skip" && currentQuestionNumber !== QA.length) {
      if (!hasTrue || !hasConfidence) {
        if (!hasTrue) messageApi.warning("Please choose any one option");
        else messageApi.warning("Please select strategy");
        return;
      }
    }

    const currentId = currentQuestion?._id;

    const convertEliminate = (eliminate: { [key: number]: number | undefined }) => {
      return {
        eliminateOptionA: eliminate[0] === 0,
        eliminateOptionB: eliminate[1] === 0,
        eliminateOptionC: eliminate[2] === 0,
        eliminateOptionD: eliminate[3] === 0,
      };
    };
    const getEliminateStats = (data: { [key: number]: number | undefined }) => {
      const converted = convertEliminate(data);

      const eliminateOption = Object.values(converted).filter((v) => v === true).length;
      const map = ["A", "B", "C", "D"];

      const eliminated = Object.keys(data)
        .filter((k) => data[Number(k)] === 1)
        .map((k) => map[Number(k)]);

      return {
        ...converted,
        eliminateOption,
        answer: eliminated[0],
      };
    };

    const stats = getEliminateStats(isAnswers);
    const userQaAnswers = {
      type: isConfidence,
      is2XStack: stack,
      ...stats,
    };
    const QaExamAnswers = JSON.parse(Storage.getItem(STORAGE_KEYS.EXAM_QA_ANSWERS) || "{}");
    updateStorage(
      STORAGE_KEYS.EXAM_QA_ANSWERS,
      QaExamAnswers?.answers?.map((a: any) => (a.questionId === currentId ? { ...a, ...userQaAnswers } : a))
    );

    const obj = {
      confidenceType: isConfidence,
      eliminateOption: isAnswers,
      option: isQa,
      answersType: isAnswersType,
    };

    const updatedAnswers = QAData.answers.map((item) => (item._id === currentId ? { ...item, userAnswer: obj } : item));
    const updatedQAData = { ...QAData, answers: updatedAnswers };

    setQAData(updatedQAData as QuestionType);

    updateStorage(STORAGE_KEYS.EXAM_QA_ALL, { answers: updatedAnswers });
    window.dispatchEvent(new Event("examStorageUpdate"));
    setCurrentQuestionNumber((prev) => {
      const next = prev + 1;
      if (next > updatedAnswers.length) return prev;

      const nextQ = { ...updatedAnswers[next - 1] };

      if (!nextQ.userAnswer?.answersType?.length) {
        nextQ.userAnswer = { answersType: ["unanswered"] };

        const finalAnswers = updatedAnswers.map((a) => (a._id === nextQ._id ? nextQ : a));
        const finalQAData = { ...updatedQAData, answers: finalAnswers };

        setQAData(finalQAData as QuestionType);
        updateStorage(STORAGE_KEYS.EXAM_QA_ALL, { answers: finalAnswers });

        setAnswers({});
        setQa({});
        setConfidence("");
        setAnswersType(["unanswered"]);
        setSkip(false);
      } else {
        setAnswers(nextQ.userAnswer?.eliminateOption || {});
        setQa(nextQ.userAnswer?.option || {});
        setConfidence(nextQ.userAnswer?.confidenceType || "");
        setAnswersType(nextQ.userAnswer?.answersType || ["unanswered"]);
        setSkip(nextQ.userAnswer?.answersType?.includes("marked") || false);
      }

      return next;
    });
    if (currentQuestionNumber === QA.length) {
      // updateStorage(STORAGE_KEYS.EXAM_QA_ANSWERS, { contestEndTime: new Date() });
      // const QaExamAnswers = JSON.parse(Storage.getItem(STORAGE_KEYS.EXAM_QA_ANSWERS) || "{}");
      // const res = await PostApi({ url: URL_KEYS.QA.EDIT, data: QaExamAnswers });
      // if (res?.data?.status === HTTP_STATUS.OK) {
      //   Storage.removeItem(STORAGE_KEYS.EXAM_QA_ALL);
      //   Storage.removeItem(STORAGE_KEYS.EXAM_QA_ANSWERS);
      //   setAnswers({});
      //   setQa({});
      //   setConfidence("");
      //   setAnswersType(["unanswered"]);
      //   setSkip(false);
      //   setQAData(null);
      //   navigate(ROUTES.EXAM.COUNT_DOWN);
      // }
      handleEndTestDrawer();
    }
  };

  const handlePrevQueClick = () => {
    window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
    if (currentQuestionNumber <= 1) return;
    setCurrentQuestionNumber(currentQuestionNumber - 1);
  };

  const ConfidenceButtons = [
    { label: "100% Sure", value: "100%Sure", color: "bg-blue-600", icon: <MdLibraryAddCheck className="text-lg" /> },
    { label: "Logic Play", value: "logicPlay", color: "bg-rose-500", icon: <FaLightbulb className="text-lg" /> },
    { label: "Intuition Hit", value: "intuitionHit", color: "bg-sky-500", icon: <MdVisibility className="text-lg" /> },
    { label: "Blind Fire", value: "blindFire", color: "bg-amber-500", icon: <MdVisibilityOff className="text-lg" /> },
    { label: "Fear - Driver Skip", value: "fearDriverSkip", color: "bg-green-700", icon: <RiFileCheckFill className="text-lg" /> },
    { label: "Skip", value: "skip", color: "bg-purple-700", icon: <TbMessageQuestion className="text-lg" /> },
  ];
  return (
    <>
      {contextHolder}
      <div className="sub-container pt-4 md:pt-8 question-section">
        {/* Header */}
        <CardHeader title="Question & answer" icon={<BsFillAlarmFill />} time={isFinished ? "Time Up!" : `${hours}:${minutes}:${seconds}`} />
        <div className="flex justify-center">
          <p className="font-bold mb-0 bg-input-box p-2 px-5 rounded mt-4 w-fit">Press the End Test button to lock your Test.</p>
        </div>
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
                <div className="relative inline-block">
                  {isLoading ? <Skeleton.Node active style={{ width: 70, height: 35, borderRadius: 5 }} /> : <span className="bg-input-box font-bold text-sm p-2 px-4 rounded">Question : {currentQuestionNumber}</span>}
                  {(() => {
                    const currentStack = value;
                    if (currentStack !== positiveMarks) {
                      return <span className="absolute -top-3 -right-2 bg-primary text-white text-xs font-bold px-2 py-0.5 rounded-full shadow-md">2x</span>;
                    }
                    return null;
                  })()}
                </div>
                {isLoading ? <Skeleton.Node active style={{ width: 70, height: 35, borderRadius: 5 }} /> : <span className="bg-green-100 text-green-700 text-sm font-bold py-2 px-4 rounded"> +{value || 0}</span>}
                {isLoading ? <Skeleton.Node active style={{ width: 70, height: 35, borderRadius: 5 }} /> : <span className="bg-red-100 text-red-700 text-sm font-bold py-2 px-4 rounded">{negativeMarks || 0} </span>}
                <div className="flex flex-wrap items-center justify-center sm:ml-auto gap-3">
                  <span onClick={handleLanguageChange} className="text-sm font-bold flex flex-nowrap gap-2">
                    <IoLanguage className="text-xl" />
                  </span>
                  <span className="text-sm font-bold flex flex-nowrap gap-2" onClick={() => setSkip(!isSkip)}>
                    {isSkip ? <IoBookmark className="text-xl" /> : <IoBookmarkOutline className="text-xl" />}
                  </span>
                  <span className="text-sm font-bold flex flex-nowrap gap-2 cursor-pointer" onClick={() => dispatch(setReportModal())}>
                    <TbReport className="text-xl" />
                  </span>
                </div>
              </div>
              <span className="border-t border-card-border flex w-full my-4" />
              <div className="mb-4">{isLoading ? <Skeleton.Input active style={{ height: 35, borderRadius: 5 }} block /> : <p className="font-bold text-lg mb-1">{currentQuestionLanguage?.question}</p>}</div>
            </div>
            {/* STATEMENT Section */}
            {isLoading ? (
              <div className="mb-4">
                <Skeleton.Input active style={{ height: 35, borderRadius: 5 }} block />
              </div>
            ) : (
              <>
                {QA.length > 0 && currentQuestion?.questionType === QUE_TYPE.STATEMENT && (
                  <div className="space-y-6 pb-6 rounded-2xl">
                    {Object.keys(currentQuestionLanguage?.statementQuestion || {})?.map((_, i) => {
                      return <div key={i}>{<StatementQuestion key={i} id={i} statements={currentQuestionLanguage?.statementQuestion[i]?.combined} answers={isQa} onCheck={handleQaCheck} />}</div>;
                    })}
                    <span className="font-bold text-lg rounded">{currentQuestionLanguage?.lastQuestion}</span>
                  </div>
                )}
                {/* PAIR Section */}
                {QA.length > 0 && currentQuestion?.questionType === QUE_TYPE.PAIR && (
                  <div className="space-y-4 pb-6 rounded-2xl">
                    <PairTable pair={currentQuestionLanguage?.pairQuestion} pairTitle={currentQuestionLanguage?.pairQuestion?.[0]?.combined} answers={isQa} onCheck={handleQaCheck} />
                    <span className="font-bold text-xl px-2 rounded">{currentQuestionLanguage?.lastQuestion}</span>
                  </div>
                )}
              </>
            )}
            {/* Passage Section */}
            {/* {QA.length > 0 && ( */}
            <div className="rounded-2xl">
              <div className="!grid grid-cols-1 lg:grid-cols-2 gap-3">
                {isLoading
                  ? [...Array(4)].map((_, i) => <Skeleton.Node key={i} active style={{ width: "100%", height: 60, borderRadius: 5 }} />)
                  : Object.keys(currentQuestionLanguage?.options || {}).map((opt, i) => {
                      return (
                        <div key={i} className={`border-1 border-card-border flex items-center gap-3 m-0 rounded-md cursor-pointer transition-all ${isAnswers[i] === 1 ? "border-green-500 bg-green-50" : isAnswers[i] === 0 ? "" : "border-gray-200 hover:bg-gray-50"}`}>
                          {<NormalQuestion key={i} id={i} opt={opt} text={currentQuestionLanguage?.options[opt] || ""} answers={isAnswers} onCheck={handleAnswersCheck} />}
                        </div>
                      );
                    })}
              </div>
            </div>
            {/* )} */}

            {/* Confidence Buttons */}
            <span className="border-t border-card-border flex w-full my-6" />

            <section id="QA_Buttons" className="w-full">
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-2 my-8 max-xl:justify-center">
                {ConfidenceButtons.map((btn, i) => (
                  <button key={i} onClick={() => setConfidence(btn.value)} className={`flex justify-center items-center gap-3 shadow-btn-shadow color-1 p-3 text-sm font-semibold text-white rounded-lg transition-all duration-200 ${btn.color} ${isConfidence === "" ? "opacity-100" : isConfidence === btn.value ? "opacity-100" : "opacity-30"}`}>
                    {btn.icon}
                    {btn.label}
                  </button>
                ))}
              </div>
              <div className="flex flex-wrap justify-between gap-2 ">
                <FormButton onClick={handlePrevQueClick} text="Previous" className="custom-button-light w-full sm:w-30 button button--mimas text-center !p-4 !h-13 uppercase" />
                <FormButton onClick={handleNextQueClick} text={`${currentQuestionNumber === QA.length ? "Save" : "Save & Next"}`} loading={isPostLoading} className="custom-button w-full sm:w-40 button button--mimas text-center !p-4 !h-13 uppercase" />
              </div>
            </section>
          </div>

          {/* Right Panel */}
          <div onClick={() => setOpen(!isOpen)} className="border-2 shadow-md border-input-box p-6 rounded-lg w-full h-full max-2xl:hidden 2xl:!flex 2xl:items-start max-2xl:before:fixed max-2xl:before:bg-black max-2xl:before:opacity-40 max-2xl:before:inset-0 max-2xl:before:z-50" style={{ display: isOpen ? "block" : "none" }}>
            {/* Legend */}
            <div onClick={(e) => e.stopPropagation()} className="2xl:gap-x-10 max-2xl:space-y-3 max-2xl:fixed max-2xl:bg-[#ffffff] w-full max-2xl:max-w-[400px] max-2xl:min-w-[200px] max-2xl:top-0 max-2xl:right-0 max-2xl:px-5 max-2xl:py-4 h-full max-2xl:shadow-md max-2xl:overflow-auto max-2xl:z-50">
              <div className="mb-6 hidden max-2xl:block">
                <div className="flex justify-between items-center">
                  <a href="javascript:void(0)">Questions</a>
                  <button id="toggleClose" onClick={() => setOpen(!isOpen)} className=" z-[100] rounded-xl bg-input-box w-9 h-9 flex items-center justify-center cursor-pointer">
                    <RxCross2 className="w-5 h-5" />
                  </button>
                </div>
                <span className="border-t border-card-border flex w-full mt-4 mb-10" />
              </div>
              <div className="2xl:h-full flex flex-col justify-between">
                <div>
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

                  <div className="grid grid-cols-5 gap-2 min-h-[88px] max-h-[440px] overflow-y-auto [&::-webkit-scrollbar]:w-0">
                    {isLoading
                      ? [...Array(10)].map((_, i) => <Skeleton.Node key={i} active style={{ width: "100%", height: 40, borderRadius: 5 }} />)
                      : QA?.map((item, i) => {
                          const status = item?.userAnswer?.answersType?.[0] || "not-visited";
                          const isMarked = item?.userAnswer?.answersType?.includes("marked");
                          return (
                            <button onClick={() => handleQuestionNumberClick(i + 1, item?._id)} key={i} className={`max-w-full h-10 border text-sm font-medium flex items-center justify-center ${status} ${isMarked ? "relative" : ""}`}>
                              {i + 1}
                              {isMarked ? <span className="absolute -top-1 -right-1 size-2.5 rounded-full bg-success" /> : ""}
                            </button>
                          );
                        })}
                  </div>
                </div>

                {/* End Test Button */}
                <div className="flex flex-col gap-3 mt-5 ">
                  <button onClick={() => dispatch(setInstructionsDrawer())} className="flex justify-center items-center gap-2 bg-white border border-card-border hover:bg-input-box-dark transition-all font-bold text-sm p-2 px-4 rounded cursor-pointer">
                    <HiMiniInformationCircle size={20} />
                    Instructions
                  </button>
                  <FormButton text="END TEST" onClick={() => dispatch(setEndTestDrawer())} className="w-full !text-md !font-bold transition-all hover:!bg-red-100 hover:!text-red-700 text-center !p-4 !h-13 uppercase !border-1 !border-danger" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <InstructionsDrawer />
      <ReportModal payload={{ contestId: contestId, questionId: currentQuestion?._id, qaId: _id as string }} />
      <EndTest handleEndTest={handleEndTestDrawer} loading={isPostLoading} />
    </>
  );
};

export default Question;
