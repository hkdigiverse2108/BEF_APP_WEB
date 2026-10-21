import { notification, Skeleton } from "antd";
import { useEffect, useState } from "react";
import { BsFillAlarmFill } from "react-icons/bs";
import { HiMiniInformationCircle, HiOutlineBars3BottomRight } from "react-icons/hi2";
import { IoBookmark, IoBookmarkOutline, IoLanguage } from "react-icons/io5";
import { RxCross2 } from "react-icons/rx";
import { TbReport } from "react-icons/tb";
import {
  LuArrowLeft,
  LuArrowRight,
  LuCheck,
  LuCircleCheck,
  LuFlag,
  LuForward,
  LuLightbulb,
  LuShield,
  LuTarget,
  LuZap,
} from "react-icons/lu";
import "./ModernQuestionScreen.css";
import { useLocation, useNavigate } from "react-router-dom";
import { useGetApiQuery, usePostApiMutation } from "../../../Api/CommonApi";
import { AntMessage } from "../../../Components/Common/AntMessage";
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
import { isImage, Storage, updateStorage } from "../../../Utils";
import { useCountDown } from "../../../Utils/Hook";
import { AntdNotification } from "../../../Utils/AntNotification";

const Question = () => {
  const [isAnswers, setAnswers] = useState<{
    [key: number]: number | undefined;
  }>({});
  const [isQa, setQa] = useState<{ [key: number]: number | undefined }>({});
  const [isConfidence, setConfidence] = useState("");
  const [isAnswersType, setAnswersType] = useState<string[]>([]);
  const [isSkip, setSkip] = useState(false);
  const [isOpen, setOpen] = useState(false);
  const [QAData, setQAData] = useState<QuestionType | null>(null);
  const [currentQuestionNumber, setCurrentQuestionNumber] = useState(1);
  const dispatch = useAppDispatch();
  const location = useLocation();
  const Navigate = useNavigate();

  const queryParam = new URLSearchParams(location.search);
  const contestId = queryParam.get("contestId");
  const qaId = queryParam.get("qaId");
  const isLifetime = queryParam.get("isLifetime") === "true";
  const isPractice = queryParam.get("isPractice") === "true";

  const [language, setLanguage] = useState<LanguageKey>(() => {
    const langParam = queryParam.get("lang")?.toLowerCase();
    const stateLang = (location?.state as any)?.lang || (location?.state as any)?.language;
    if (langParam === "hindi" || stateLang === "hindi" || stateLang === LANGUAGES.HINDI) {
      return LANGUAGES.HINDI as LanguageKey;
    }
    return LANGUAGES.ENGLISH as LanguageKey;
  });
  const [PostApi, { isLoading: isPostLoading }] = usePostApiMutation();

  const { data: settingData } = useGetApiQuery({ url: URL_KEYS.SETTINGS.ALL });
  const MultiTabOpen = settingData?.data?.isMultiTabOpen;

  useEffect(() => {
    if (!contestId) {
      Storage.removeItem(STORAGE_KEYS.EXAM_QA_ALL);
      Storage.removeItem(STORAGE_KEYS.EXAM_QA_ANSWERS);
      Navigate(ROUTES.CONTEST.MY_CONTEST);
    } else {
      const storedAnswers = JSON.parse(Storage.getItem(STORAGE_KEYS.EXAM_QA_ANSWERS) || "{}");
      if (storedAnswers && storedAnswers.qaId && qaId && storedAnswers.qaId !== qaId) {
        Storage.removeItem(STORAGE_KEYS.EXAM_QA_ALL);
        Storage.removeItem(STORAGE_KEYS.EXAM_QA_ANSWERS);
        window.location.reload();
      }
    }
  }, [contestId, qaId, Navigate]);

  useEffect(() => {
    // BLOCK BACK BUTTON
    const handleBack = (e: PopStateEvent) => {
      e.preventDefault();
      window.history.pushState(null, "", window.location.href);
    };

    window.history.pushState(null, "", window.location.href);
    window.addEventListener("popstate", handleBack);

    // -----------------------------
    // FORCE FULLSCREEN
    // -----------------------------
    // const requestRealFullscreen = () => {
    //   const el: any = document.documentElement;

    //   if (el.requestFullscreen) el.requestFullscreen().catch(() => {});
    //   else if (el.webkitRequestFullscreen) el.webkitRequestFullscreen();
    //   else if (el.msRequestFullscreen) el.msRequestFullscreen();

    //   window.removeEventListener("click", requestRealFullscreen);
    //   window.removeEventListener("keydown", requestRealFullscreen);
    //   window.removeEventListener("touchstart", requestRealFullscreen);
    // };

    // window.addEventListener("click", requestRealFullscreen);
    // window.addEventListener("keydown", requestRealFullscreen);
    // window.addEventListener("touchstart", requestRealFullscreen);

    // -----------------------------
    // LOCK ESC KEY
    // -----------------------------
    // const blockEsc = (e: any) => {
    //   if (e.key === "escape") {
    //     e.preventDefault();
    //     AntMessage("error", "Fullscreen mode is locked");
    //   }
    // };
    // window.addEventListener("keydown", blockEsc);

    // -----------------------------
    // TAB SWITCH / WINDOW BLUR / MINIMIZE DETECTION
    // -----------------------------
    let violationCount = 0;

    const handleLeaveScreen = () => {
      if (MultiTabOpen === true) {
        if (document.hidden || document.visibilityState !== "visible") {
          violationCount++;

          // Force fullscreen again immediately
          // requestRealFullscreen();

          if (violationCount > 3) {
            handleEndTestDrawer();
            AntdNotification(notification, "error", `Exam auto-submitted due to repeated tab switching.`);
          } else {
            AntdNotification(notification, "error", `Tab switch detected! Attempt ${violationCount}/3`);
          }
        }
      }
    };

    document.addEventListener("visibilitychange", handleLeaveScreen);
    window.addEventListener("blur", handleLeaveScreen);
    window.addEventListener("focusout", handleLeaveScreen);

    // -----------------------------
    // KEYBOARD + PRINTSCREEN PROTECTION
    // -----------------------------
    const p = async (e: any) => {
      const k = e.key?.toLowerCase();

      const isDevToolsKey = k === "f11" || k === "f12" || (e.altKey && k === "a") || (e.ctrlKey && k === "u") || (e.ctrlKey && e.shiftKey && ["i", "j", "c", "s"].includes(k));

      const isWindowsShift2 = e.shiftKey && (e.metaKey || e.key === "Meta") && k === "2";

      const isPrintScreen = ["printscreen", "prtsc", "snapshot"].includes(k) || (e.ctrlKey && ["printscreen", "prtsc", "snapshot"].includes(k));

      const isEscape = k === "escape";

      if (e.type === "contextmenu" || (e.type === "keydown" && (isDevToolsKey || isWindowsShift2 || isPrintScreen || isEscape))) {
        e.preventDefault();
        AntMessage("error", "Content is protected");

        if (isPrintScreen) {
          try {
            await navigator.clipboard.writeText("");
          } catch {}
        }
      }
    };

    for (const evt of ["contextmenu", "keydown"]) {
      document.addEventListener(evt, p);
    }

    // -----------------------------
    // CLEANUP
    // -----------------------------
    return () => {
      window.removeEventListener("popstate", handleBack);
      // window.removeEventListener("keydown", blockEsc);
      document.removeEventListener("visibilitychange", handleLeaveScreen);
      window.removeEventListener("blur", handleLeaveScreen);
      window.removeEventListener("focusout", handleLeaveScreen);
      for (const evt of ["contextmenu", "keydown"]) {
        document.removeEventListener(evt, p);
      }
    };
  }, [MultiTabOpen]);

  const { data: QAApiData, isLoading } = useGetApiQuery<QuestionApiResponse>({
    url: `${URL_KEYS.QA.CONTEST_QUESTION}?contestFilter=${contestId}${qaId ? `&qaId=${qaId}` : ""}`,
  });
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
            type: q?.userAnswer?.confidenceType || "skip",
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
        contestStartDate: QAApiData?.data?.contestStartDate || "",
        contestEndDate: QAApiData?.data?.contestEndDate || "",
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
      } else if (type === "true") {
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

      // If user selected an answer option and previously had chosen skip strategy, clear skip
      let currConf = isConfidence;
      if (type === "true" && (currConf === "skip" || currConf === "fearDriverSkip")) {
        currConf = "";
        setConfidence("");
      }

      let ansType: string[] = [];
      const hasTrue = Object.values(newAnswers).includes(1);
      if (["skip", "fearDriverSkip"].includes(currConf)) {
        ansType = ["skip"];
      } else if (hasTrue && currConf) {
        ansType = ["answered"];
      } else {
        ansType = ["unanswered"];
      }
      if (isSkip) ansType.push("marked");
      setAnswersType(ansType);

      if (QAData && currentQuestion) {
        const currentId = currentQuestion._id;
        const updatedUserAnswer = {
          confidenceType: currConf,
          eliminateOption: newAnswers,
          option: isQa,
          answersType: ansType,
        };
        const answersList = QAData.answers?.map((item) =>
          item._id === currentId ? { ...item, userAnswer: updatedUserAnswer } : item
        );
        const updatedQAData = { ...QAData, answers: answersList };
        setQAData(updatedQAData as QuestionType);
        updateStorage(STORAGE_KEYS.EXAM_QA_ALL, { answers: answersList });
        window.dispatchEvent(new Event("examStorageUpdate"));
      }

      return newAnswers;
    });
  };

  const handleStrategyClick = (stratId: string) => {
    const newConfidence = isConfidence === stratId ? "" : stratId;
    setConfidence(newConfidence);

    // If skip strategy is selected, clear any selected option
    let updatedAnswers = isAnswers;
    if (["skip", "fearDriverSkip"].includes(newConfidence)) {
      updatedAnswers = {};
      setAnswers({});
    }

    const hasOption = Object.values(updatedAnswers).includes(1) || Object.values(isQa).some((v) => v !== undefined);
    let type: string[] = [];

    if (["skip", "fearDriverSkip"].includes(newConfidence)) {
      type = ["skip"];
    } else if (hasOption && newConfidence) {
      type = ["answered"];
    } else {
      type = ["unanswered"];
    }

    if (isSkip) type.push("marked");
    setAnswersType(type);

    // Immediately update QAData & storage so Question Palette counts skipped instantly
    if (QAData && currentQuestion) {
      const currentId = currentQuestion._id;
      const updatedUserAnswer = {
        confidenceType: newConfidence,
        eliminateOption: updatedAnswers,
        option: isQa,
        answersType: type,
      };
      const answersList = QAData.answers?.map((item) =>
        item._id === currentId ? { ...item, userAnswer: updatedUserAnswer } : item
      );
      const updatedQAData = { ...QAData, answers: answersList };
      setQAData(updatedQAData as QuestionType);
      updateStorage(STORAGE_KEYS.EXAM_QA_ALL, { answers: answersList });
      window.dispatchEvent(new Event("examStorageUpdate"));
    }
  };

  const handleBookmarkToggle = () => {
    const newSkip = !isSkip;
    setSkip(newSkip);

    const hasOption = Object.values(isAnswers).includes(1) || Object.values(isQa).some((v) => v !== undefined);
    let type: string[] = [];

    if (["skip", "fearDriverSkip"].includes(isConfidence)) {
      type = ["skip"];
    } else if (hasOption && isConfidence) {
      type = ["answered"];
    } else {
      type = ["unanswered"];
    }

    if (newSkip) type.push("marked");
    setAnswersType(type);

    if (QAData && currentQuestion) {
      const currentId = currentQuestion._id;
      const updatedUserAnswer = {
        confidenceType: isConfidence,
        eliminateOption: isAnswers,
        option: isQa,
        answersType: type,
      };
      const answersList = QAData.answers?.map((item) =>
        item._id === currentId ? { ...item, userAnswer: updatedUserAnswer } : item
      );
      const updatedQAData = { ...QAData, answers: answersList };
      setQAData(updatedQAData as QuestionType);
      updateStorage(STORAGE_KEYS.EXAM_QA_ALL, { answers: answersList });
      window.dispatchEvent(new Event("examStorageUpdate"));
    }
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
    setOpen(false);
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
    const hasOption = Object.values(isAnswers).includes(1) || Object.values(isQa).some((v) => v !== undefined);
    let type: string[] = [];

    if (["skip", "fearDriverSkip"].includes(isConfidence)) {
      type = ["skip"];
    } else if (hasOption && isConfidence) {
      type = ["answered"];
    } else {
      type = ["unanswered"];
    }

    if (isSkip) type.push("marked");
    setAnswersType(type);
  }, [isAnswers, isQa, isConfidence, isSkip]);

  const handleEndTestDrawer = async () => {
    updateStorage(STORAGE_KEYS.EXAM_QA_ANSWERS, { contestEndTime: new Date() });
    const QaExamAnswers = JSON.parse(Storage.getItem(STORAGE_KEYS.EXAM_QA_ANSWERS) || "{}");

    const res = await PostApi({ url: URL_KEYS.QA.EDIT, data: QaExamAnswers });
    if (res?.data?.status === HTTP_STATUS.OK) {
      queryParam.delete("contestId");
      Navigate(`${ROUTES.EXAM.QUESTION}${queryParam}`);
      Storage.removeItem(STORAGE_KEYS.EXAM_QA_ALL);
      Storage.removeItem(STORAGE_KEYS.EXAM_QA_ANSWERS);
      setAnswers({});
      setQa({});
      setConfidence("");
      setAnswersType(["unanswered"]);
      setSkip(false);
      setQAData(null);
      dispatch(setEndTestDrawer())
      // document?.exitFullscreen();
      if (isLifetime || isPractice) {
        Navigate(`${ROUTES.EXAM.RESULT}?contestId=${contestId}&qaFilter=${_id || qaId}`);
      } else {
        Navigate(ROUTES.EXAM.COUNT_DOWN, { state: { contestStartDate: QAData?.contestStartDate || QaExamAnswers?.contestStartDate || "", contestEndDate: QAData?.contestEndDate || QaExamAnswers?.contestEndDate || "" } });
      }
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
    const isSkipMode = isConfidence === "skip" || isConfidence === "fearDriverSkip";
    if (!isSkipMode) {
      if (!hasTrue || !hasConfidence) {
        if (!hasTrue) AntMessage("warning", "Please choose any one option");
        else AntMessage("warning", "Please select strategy");
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
        ?.filter((k) => data[Number(k)] === 1)
        ?.map((k) => map[Number(k)]);

      return {
        ...converted,
        eliminateOption,
        answer: eliminated[0],
      };
    };

    const stats = getEliminateStats(isAnswers);
    const userQaAnswers = {
      type: isConfidence || "skip",
      is2XStack: stack,
      ...stats,
    };
    const QaExamAnswers = JSON.parse(Storage.getItem(STORAGE_KEYS.EXAM_QA_ANSWERS) || "{}");
    const QaUpdatedAnswers = QaExamAnswers?.answers?.map((a: any) => (a.questionId === currentId ? { ...a, ...userQaAnswers } : a));

    updateStorage(STORAGE_KEYS.EXAM_QA_ANSWERS, {
      ...QaExamAnswers,
      answers: QaUpdatedAnswers,
    });

    const effectiveAnswersType = isSkipMode
      ? (isSkip ? ["skip", "marked"] : ["skip"])
      : hasTrue && hasConfidence
      ? (isSkip ? ["answered", "marked"] : ["answered"])
      : isAnswersType;

    const obj = {
      confidenceType: isConfidence,
      eliminateOption: isAnswers,
      option: isQa,
      answersType: effectiveAnswersType,
    };

    const updatedAnswers = QAData.answers?.map((item) => (item._id === currentId ? { ...item, userAnswer: obj } : item));
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

        const finalAnswers = updatedAnswers?.map((a) => (a._id === nextQ._id ? nextQ : a));
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
      // handleEndTestDrawer();
      setCurrentQuestionNumber(1);
    }
  };

  const handlePrevQueClick = () => {
    window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
    if (currentQuestionNumber <= 1) return;
    setCurrentQuestionNumber(currentQuestionNumber - 1);
  };

  const strategies = [
    {
      id: "100%Sure",
      label: "100% Sure",
      icon: LuCircleCheck,
      color: "#2563eb",
      border: "rgba(37,99,235,0.45)",
      ring: "rgba(37,99,235,0.25)",
    },
    {
      id: "logicPlay",
      label: "Logic Play",
      icon: LuLightbulb,
      color: "#d97706",
      border: "rgba(217,119,6,0.45)",
      ring: "rgba(217,119,6,0.25)",
    },
    {
      id: "intuitionHit",
      label: "Intuition Hit",
      icon: LuZap,
      color: "#7c3aed",
      border: "rgba(124,58,237,0.45)",
      ring: "rgba(124,58,237,0.25)",
    },
    {
      id: "blindFire",
      label: "Blind Fire",
      icon: LuTarget,
      color: "#dc2626",
      border: "rgba(220,38,38,0.45)",
      ring: "rgba(220,38,38,0.25)",
    },
    {
      id: "fearDriverSkip",
      label: "Fear - Driver Skip",
      icon: LuShield,
      color: "#db2777",
      border: "rgba(219,39,119,0.45)",
      ring: "rgba(219,39,119,0.25)",
    },
    {
      id: "skip",
      label: "Skip",
      icon: LuForward,
      color: "#475569",
      border: "rgba(71,85,105,0.45)",
      ring: "rgba(71,85,105,0.25)",
    },
  ];

  // Derive accurate status for every question (live-reactive to current question)
  const questionStatusList = QA.map((item: any, i: number) => {
    const isCurrent = currentQuestionNumber === i + 1;
    let confidence = item?.userAnswer?.confidenceType || "";
    let types: string[] = item?.userAnswer?.answersType || [];
    let isMarked = types.includes("marked") || Boolean(item?.isMarked);

    if (isCurrent) {
      confidence = isConfidence;
      isMarked = isSkip;
      types = isAnswersType;
    }

    const isSkipped =
      confidence === "skip" ||
      confidence === "fearDriverSkip" ||
      types.includes("skip") ||
      types.includes("skipped");

    const hasOption =
      isCurrent
        ? Object.values(isAnswers).includes(1) || Object.values(isQa).some((v) => v !== undefined)
        : (item?.userAnswer?.eliminateOption && Object.values(item.userAnswer.eliminateOption).includes(1)) ||
          (item?.userAnswer?.option && Object.values(item.userAnswer.option).some((v: any) => v !== undefined));

    const isAnswered = !isSkipped && (types.includes("answered") || (hasOption && Boolean(confidence)));
    const isVisited = isCurrent || types.length > 0 || Boolean(item?.userAnswer);

    let status: "answered" | "marked" | "skipped" | "not-visited" = "not-visited";
    if (isSkipped) {
      status = "skipped";
    } else if (isAnswered) {
      status = "answered";
    } else if (isMarked) {
      status = "marked";
    } else if (isVisited) {
      status = "not-visited";
    }

    return {
      index: i,
      status,
      isAnswered,
      isSkipped,
      isMarked,
      isCurrent,
    };
  });

  const answeredCount = questionStatusList.filter((q) => q.isAnswered).length;
  const markedCount = questionStatusList.filter((q) => q.isMarked).length;
  const skippedCount = questionStatusList.filter((q) => q.isSkipped).length;
  const notSeenCount = Math.max(0, QA.length - answeredCount - markedCount - skippedCount);
  const remainingCount = Math.max(0, QA.length - answeredCount);
  const progressPercent = QA.length > 0 ? (answeredCount / QA.length) * 100 : 0;

  return (
    <div className="relative min-h-screen w-full bg-[#f4f7fc]">
      {/* Floating Ambient Glowing Blobs (Blue Shadow & Orange Ambient from Achiwon_PYQ_Modern) */}
      <div className="modern-bg-blobs">
        <div className="modern-blob modern-blob-blue" />
        <div className="modern-blob modern-blob-orange" />
      </div>

      <div className="relative z-10 sub-container pt-4 md:pt-6 question-section">
        {/* Header */}
        <CardHeader
          title={QAData?.subjectId?.name || "Question & answer"}
          icon={<BsFillAlarmFill />}
          time={isLifetime ? "No Time" : isFinished ? "Time Up!" : `${hours}:${minutes}:${seconds}`}
        />

        {/* Warning Callout Strip */}
        <div className="mt-4 mb-2 flex items-center justify-between rounded-xl border border-[#FDE68A] bg-[#FFFBEB] px-4 py-2.5 text-xs text-[#92400E]">
          <div className="flex items-center gap-2">
            <span className="font-bold">⚠️ Notice:</span>
            <span>Do not exit the test otherwise your test will end. Press the End Test button to lock your test.</span>
          </div>
        </div>

        {/* Mobile Toggle Row */}
        <div className="2xl:hidden flex justify-between items-center my-3">
          <button
            onClick={() => setOpen(!isOpen)}
            className="cursor-pointer p-1 flex justify-center items-center rounded-xl w-10 sm:w-12 h-10 sm:h-12 bg-white border border-[#CBD5E1] text-[#124699]"
          >
            <HiOutlineBars3BottomRight className="text-xl sm:text-2xl" />
          </button>
          <button
            onClick={() => dispatch(setEndTestDrawer())}
            className="px-4 py-2 rounded-xl border-2 border-red-500 bg-white text-xs sm:text-sm font-bold text-red-600 hover:bg-red-50 transition cursor-pointer"
          >
            END TEST
          </button>
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 2xl:grid-cols-4 gap-6 w-full mt-3">
          {/* Left Panel: Question Card */}
          <div className="col-span-1 2xl:col-span-3">
            <article className="w-full rounded-2xl modern-glass-card p-4 sm:p-7">
              {/* Question Sub-Header */}
              <div className="flex flex-col gap-2.5 border-b border-[#E2E8F0] pb-4 sm:flex-row sm:items-center sm:justify-between">
                <div className="flex items-center gap-2">
                  <div className="relative inline-block">
                    {isLoading ? (
                      <Skeleton.Node active style={{ width: 85, height: 32, borderRadius: 8 }} />
                    ) : (
                      <span className="rounded-lg bg-[#EFF6FF] px-3 py-1.5 text-xs sm:text-sm font-bold text-[#124699]">
                        Question : {currentQuestionNumber}
                      </span>
                    )}
                    {value !== positiveMarks && (
                      <span className="absolute -top-2.5 -right-2 bg-primary text-white text-[10px] font-bold px-2 py-0.5 rounded-full shadow-md">
                        2x
                      </span>
                    )}
                  </div>
                  {isLoading ? (
                    <Skeleton.Node active style={{ width: 45, height: 32, borderRadius: 8 }} />
                  ) : (
                    <span className="rounded-lg bg-[#16A34A]/10 px-2.5 py-1 text-xs font-bold text-[#16A34A]">
                      +{value || 0}
                    </span>
                  )}
                  {isLoading ? (
                    <Skeleton.Node active style={{ width: 45, height: 32, borderRadius: 8 }} />
                  ) : (
                    <span className="rounded-lg bg-[#DC2626]/10 px-2.5 py-1 text-xs font-bold text-[#DC2626]">
                      {negativeMarks || 0}
                    </span>
                  )}
                </div>

                {/* Right controls: Language, Bookmark, Report */}
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={handleLanguageChange}
                    className="flex h-9 items-center gap-1.5 rounded-lg border border-[#E2E8F0] bg-[#F8FAFC] px-3 text-xs sm:text-sm font-bold text-[#124699] transition hover:border-[#124699] hover:bg-[#EFF6FF] cursor-pointer"
                    title="Toggle Language"
                  >
                    <IoLanguage className="text-base text-[#124699]" />
                    <span>{language === LANGUAGES.ENGLISH ? "English" : "हिन्दी"}</span>
                  </button>

                  <button
                    type="button"
                    onClick={handleBookmarkToggle}
                    title={isSkip ? "Bookmarked" : "Bookmark question"}
                    className={`flex h-9 w-9 items-center justify-center rounded-lg border transition cursor-pointer ${
                      isSkip
                        ? "border-[#F48224] bg-[#FFF7ED] text-[#F48224]"
                        : "border-[#E2E8F0] text-[#64748B] hover:border-[#F48224] hover:text-[#F48224]"
                    }`}
                  >
                    {isSkip ? <IoBookmark className="text-base" /> : <IoBookmarkOutline className="text-base" />}
                  </button>

                  <button
                    type="button"
                    onClick={() => dispatch(setReportModal())}
                    title="Report question issue"
                    className="flex h-9 w-9 items-center justify-center rounded-lg border border-[#E2E8F0] text-[#64748B] hover:border-[#124699] hover:text-[#124699] transition cursor-pointer"
                  >
                    <TbReport className="text-base" />
                  </button>
                </div>
              </div>

              {/* Question Content */}
              <div className="pt-5">
                {QAData?.subjectId?.name && (
                  <p className="text-[11px] font-bold uppercase tracking-[0.16em] text-[#124699]">
                    {QAData.subjectId.name}
                  </p>
                )}
                <div className="mt-2">
                  {isLoading ? (
                    <Skeleton.Input active style={{ height: 35, borderRadius: 8 }} block />
                  ) : isImage(currentQuestionLanguage?.question || "") ? (
                    <img
                      src={currentQuestionLanguage?.question}
                      alt="question"
                      className="mb-2 max-h-72 object-contain rounded-xl border border-[#E2E8F0] p-2 bg-[#F8FAFC]"
                    />
                  ) : (
                    <h2 className="text-lg sm:text-2xl font-bold leading-snug text-[#0F172A]">
                      {currentQuestionLanguage?.question}
                    </h2>
                  )}
                </div>

                {/* STATEMENT Section */}
                {isLoading ? (
                  <div className="mt-4">
                    <Skeleton.Input active style={{ height: 35, borderRadius: 8 }} block />
                  </div>
                ) : (
                  <>
                    {QA.length > 0 &&
                      (currentQuestion?.questionType === QUE_TYPE.STATEMENT ||
                        currentQuestion?.questionType === QUE_TYPE.STATEMENT_CSAT) && (
                        <div className="mt-6 space-y-4 rounded-2xl">
                          {Object.keys(currentQuestionLanguage?.statementQuestion || {})?.map((_, i) => (
                            <div key={i}>
                              <StatementQuestion
                                key={i}
                                id={i}
                                statements={currentQuestionLanguage?.statementQuestion[i]?.combined}
                                answers={isQa}
                                onCheck={handleQaCheck}
                              />
                            </div>
                          ))}
                          {currentQuestionLanguage?.lastQuestion && (
                            <p className="pt-2 text-sm sm:text-base font-semibold text-[#0F172A]">
                              {currentQuestionLanguage?.lastQuestion}
                            </p>
                          )}
                        </div>
                      )}

                    {/* PAIR Section */}
                    {QA.length > 0 && currentQuestion?.questionType === QUE_TYPE.PAIR && (
                      <div className="mt-6 space-y-4 rounded-2xl">
                        <PairTable
                          pair={currentQuestionLanguage?.pairQuestion}
                          pairTitle={currentQuestionLanguage?.pairQuestion?.[0]?.combined}
                          answers={isQa}
                          onCheck={handleQaCheck}
                        />
                        {currentQuestionLanguage?.lastQuestion && (
                          <p className="pt-2 text-sm sm:text-base font-semibold text-[#0F172A]">
                            {currentQuestionLanguage?.lastQuestion}
                          </p>
                        )}
                      </div>
                    )}
                  </>
                )}

                {/* Options Section */}
                <div className="mt-6 sm:mt-8">
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="text-sm sm:text-base font-bold text-[#0F172A]">Choose your answer</h3>
                    <span className="text-[11px] font-semibold text-[#64748B]">One best answer</span>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3 group/options">
                    {isLoading
                      ? [...Array(4)]?.map((_, i) => (
                          <Skeleton.Node key={i} active style={{ width: "100%", height: 60, borderRadius: 12 }} />
                        ))
                      : Object.keys(currentQuestionLanguage?.options || {})?.map((opt, i) => (
                          <NormalQuestion
                            key={i}
                            id={i}
                            opt={opt}
                            text={currentQuestionLanguage?.options[opt] || ""}
                            answers={isAnswers}
                            onCheck={handleAnswersCheck}
                          />
                        ))}
                  </div>
                </div>

                {/* Answer Strategy Section */}
                <div className="mt-6 sm:mt-8 border-t border-[#E2E8F0] pt-5 sm:pt-6">
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="text-sm sm:text-base font-bold text-[#0F172A]">Answer strategy</h3>
                    <span className="text-[11px] sm:text-xs font-semibold text-[#64748B]">How confident were you?</span>
                  </div>

                  <div className="modern-strat-grid mt-3 sm:mt-4">
                    {strategies.map((st) => {
                      const Icon = st.icon;
                      const isActive = isConfidence === st.id;
                      return (
                        <button
                          key={st.id}
                          type="button"
                          onClick={() => handleStrategyClick(st.id)}
                          style={
                            {
                              "--strat-color": st.color,
                              "--strat-border": st.border,
                              "--strat-ring": st.ring,
                            } as React.CSSProperties
                          }
                          className={`modern-strat-btn ${isActive ? "active" : ""}`}
                        >
                          <Icon className="text-base shrink-0" />
                          <span className="truncate">{st.label}</span>
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Bottom Navigation */}
                <div className="mt-8 flex items-center justify-between gap-3 border-t border-[#E2E8F0] pt-6">
                  <button
                    type="button"
                    onClick={handlePrevQueClick}
                    disabled={currentQuestionNumber <= 1}
                    className={`flex min-h-11 sm:min-h-12 items-center gap-2 rounded-xl border border-[#CBD5E1] bg-white px-5 sm:px-6 text-xs sm:text-sm font-bold text-[#0F172A] transition cursor-pointer ${
                      currentQuestionNumber <= 1
                        ? "opacity-40 cursor-not-allowed"
                        : "hover:border-[#124699] hover:text-[#124699] hover:bg-[#F8FAFC]"
                    }`}
                  >
                    <LuArrowLeft className="text-base" /> PREVIOUS
                  </button>

                  <button
                    type="button"
                    onClick={handleNextQueClick}
                    className="modern-btn-p group flex min-h-11 sm:min-h-12 items-center gap-2 rounded-xl px-6 sm:px-8 text-xs sm:text-sm font-extrabold"
                  >
                    <span>{currentQuestionNumber === QA.length ? "SAVE" : "SAVE & NEXT"}</span>
                    <LuArrowRight className="text-base" />
                  </button>
                </div>
              </div>
            </article>
          </div>

          {/* Right Panel: Palette */}
          <div
            onClick={() => setOpen(!isOpen)}
            className="w-full max-2xl:hidden 2xl:!block max-2xl:before:fixed max-2xl:before:bg-black max-2xl:before:opacity-40 max-2xl:before:inset-0 max-2xl:before:z-50"
            style={{ display: isOpen ? "block" : undefined }}
          >
            <div
              onClick={(e) => e.stopPropagation()}
              className="rounded-2xl modern-glass-card p-5 2xl:sticky 2xl:top-20 max-2xl:fixed max-2xl:w-full max-2xl:max-w-[400px] max-2xl:min-w-[200px] max-2xl:top-0 max-2xl:right-0 max-2xl:px-5 max-2xl:py-4 max-2xl:h-full max-2xl:overflow-auto max-2xl:z-50"
            >
              {/* Mobile Close Button */}
              <div className="mb-4 hidden max-2xl:block">
                <div className="flex justify-between items-center">
                  <h3 className="font-bold text-base text-[#0F172A]">Questions</h3>
                  <button
                    id="toggleClose"
                    onClick={() => setOpen(!isOpen)}
                    className="rounded-xl bg-[#F1F5F9] w-9 h-9 flex items-center justify-center cursor-pointer"
                  >
                    <RxCross2 className="w-5 h-5 text-[#64748B]" />
                  </button>
                </div>
                <span className="border-t border-[#E2E8F0] flex w-full mt-3 mb-2" />
              </div>

              {/* Header */}
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-[10px] font-bold uppercase tracking-[0.16em] text-[#124699]">Mock test</p>
                  <h2 className="mt-0.5 text-base sm:text-lg font-extrabold text-[#0F172A]">Question Palette</h2>
                </div>
              </div>

              {/* 4 Stats Cards (from Achiwon_PYQ_Modern) */}
              <div className="mt-4 grid grid-cols-4 gap-2">
                <div className="rounded-xl border border-[#124699]/30 bg-[#124699]/10 p-2 sm:p-2.5 text-center transition hover:-translate-y-0.5">
                  <b className="block text-base sm:text-xl font-extrabold text-[#124699] leading-none">
                    {answeredCount}
                  </b>
                  <span className="mt-1.5 block text-[10px] font-bold text-[#64748B]">
                    Answered
                  </span>
                </div>
                <div className="rounded-xl border border-[#F48224]/30 bg-[#F48224]/10 p-2 sm:p-2.5 text-center transition hover:-translate-y-0.5">
                  <b className="block text-base sm:text-xl font-extrabold text-[#F48224] leading-none">
                    {markedCount}
                  </b>
                  <span className="mt-1.5 block text-[10px] font-bold text-[#64748B]">
                    Marked
                  </span>
                </div>
                <div className="rounded-xl border border-[#64748B]/30 bg-[#64748B]/10 p-2 sm:p-2.5 text-center transition hover:-translate-y-0.5">
                  <b className="block text-base sm:text-xl font-extrabold text-[#64748B] leading-none">
                    {skippedCount}
                  </b>
                  <span className="mt-1.5 block text-[10px] font-bold text-[#64748B]">
                    Skipped
                  </span>
                </div>
                <div className="rounded-xl border border-[#CBD5E1] bg-[#F1F5F9]/70 p-2 sm:p-2.5 text-center transition hover:-translate-y-0.5">
                  <b className="block text-base sm:text-xl font-extrabold text-[#64748B] leading-none">
                    {notSeenCount}
                  </b>
                  <span className="mt-1.5 block text-[10px] font-bold text-[#64748B]">
                    Not seen
                  </span>
                </div>
              </div>

              {/* Question Grid Buttons */}
              <div className="mt-4 max-h-[340px] overflow-y-auto p-3.5 sm:p-4 [&::-webkit-scrollbar]:w-0">
                <div className="grid grid-cols-5 gap-2.5 p-1.5">
                  {isLoading
                    ? [...Array(10)].map((_, i) => (
                        <Skeleton.Node key={i} active style={{ width: "100%", height: 38, borderRadius: 10 }} />
                      ))
                    : questionStatusList.map((q) => {
                        let statusClass = "pal-not-visited";
                        if (q.status === "answered") {
                          statusClass = "pal-answered";
                        } else if (q.status === "marked") {
                          statusClass = "pal-marked";
                        } else if (q.status === "skipped") {
                          statusClass = "pal-skipped";
                        }

                        return (
                          <button
                            key={q.index}
                            type="button"
                            onClick={() => handleQuestionNumberClick(q.index + 1, QA[q.index]?._id)}
                            className={`modern-pal-btn ${statusClass} ${q.isCurrent ? "pal-current" : ""}`}
                            title={`Question ${q.index + 1} (${q.status})`}
                          >
                            <span>{q.index + 1}</span>

                            {/* Top-Right Badge for Answered (Checkmark) */}
                            {q.isAnswered && (
                              <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-[#16A34A] border-2 border-white text-white text-[9px] shadow-xs">
                                <LuCheck className="stroke-[3.5]" />
                              </span>
                            )}

                            {/* Top-Right Badge for Marked (Flag) */}
                            {q.isMarked && (
                              <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-[#F48224] border-2 border-white text-white text-[8px] shadow-xs">
                                <LuFlag className="fill-white" />
                              </span>
                            )}
                          </button>
                        );
                      })}
                </div>
              </div>

              {/* Shimmer Progress Box */}
              <div className="mt-4 rounded-xl bg-[#EFF6FF] p-3.5">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-bold uppercase tracking-[0.14em] text-[#64748B]">Progress</span>
                  <span className="font-mono text-xs sm:text-sm font-bold text-[#124699]">
                    {String(answeredCount).padStart(2, "0")} / {String(QA.length).padStart(2, "0")}
                  </span>
                </div>
                <div className="relative mt-2.5 h-2.5 overflow-hidden rounded-full bg-white border border-[#E2E8F0]">
                  <div
                    className="modern-shimmer-bar"
                    style={{ width: `${progressPercent}%` }}
                  />
                </div>
                <p className="mt-2 text-[11px] font-semibold text-[#64748B]">
                  {remainingCount} questions remaining
                </p>
              </div>

              {/* Bottom Buttons: Instructions & End Test */}
              <div className="mt-5 flex flex-col gap-2.5">
                <button
                  type="button"
                  onClick={() => dispatch(setInstructionsDrawer())}
                  className="flex h-11 items-center justify-center gap-2 rounded-xl border border-[#CBD5E1] bg-white text-xs sm:text-sm font-bold text-[#0F172A] hover:border-[#124699] hover:text-[#124699] hover:bg-[#F8FAFC] transition cursor-pointer"
                >
                  <HiMiniInformationCircle size={18} className="text-[#124699]" />
                  Instructions
                </button>
                <button
                  type="button"
                  onClick={() => dispatch(setEndTestDrawer())}
                  className="flex h-12 items-center justify-center rounded-xl border-2 border-[#DC2626] bg-white text-xs sm:text-sm font-extrabold text-[#DC2626] hover:bg-[#FEF2F2] transition cursor-pointer uppercase"
                >
                  END TEST
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <InstructionsDrawer />
      <ReportModal
        payload={{
          contestId: contestId,
          questionId: currentQuestion?._id,
          qaId: _id as string,
        }}
      />
      <EndTest handleEndTest={handleEndTestDrawer} loading={isPostLoading} />
    </div>
  );
};

export default Question;
