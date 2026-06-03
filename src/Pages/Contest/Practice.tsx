import { useState } from "react";
import { useGetApiQuery } from "../../Api/CommonApi";
import { URL_KEYS } from "../../Constants";
import { Select, Progress, Button, Card, Spin, message, Space } from "antd";
import { PlayCircleOutlined, RightOutlined, LeftOutlined, CheckCircleOutlined, InfoCircleOutlined } from "@ant-design/icons";
import axios from "axios";

interface Question {
  _id: string;
  englishQuestion?: {
    question: string;
    options: { A: string; B: string; C: string; D: string };
    answer: string;
    solution?: string;
  };
  hindiQuestion?: {
    question: string;
    options: { A: string; B: string; C: string; D: string };
    answer: string;
    solution?: string;
  };
}

const Practice = () => {
  const [selectedSubject, setSelectedSubject] = useState<string | null>(null);
  const [selectedSubtopic, setSelectedSubtopic] = useState<string | null>(null);
  const [limit, setLimit] = useState<number>(10);
  const [isTestRunning, setIsTestRunning] = useState<boolean>(false);
  const [questions, setQuestions] = useState<Question[]>([]);
  const [currentIdx, setCurrentIdx] = useState<number>(0);
  const [userAnswers, setUserAnswers] = useState<Record<string, string>>({}); // Maps question ID to chosen option ('A', 'B', etc.)
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);

  // Fetch subjects for select dropdown
  const { data: subjectsData, isLoading: subjectsLoading } = useGetApiQuery({
    url: `${URL_KEYS.SUBJECT.ALL}`,
  });
  const subjects = subjectsData?.data?.subject_data || [];

  // Fetch subtopics for select dropdown based on subject
  const { data: subtopicsData, isLoading: subtopicsLoading } = useGetApiQuery(
    {
      url: `${URL_KEYS.SUB_TOPIC.ID}?subjectFilter=${selectedSubject}`,
    },
    { skip: !selectedSubject }
  );
  const subtopics = subtopicsData?.data?.subTopic_data || [];

  const handleStartPractice = async () => {
    if (!selectedSubject) {
      message.error("Please select a subject first.");
      return;
    }
    setLoading(true);
    try {
      const token = localStorage.getItem("token") || "";
      let url = `${URL_KEYS.QUESTION.ID}all?subjectFilter=${selectedSubject}&limit=${limit}`;
      if (selectedSubtopic) {
        url += `&subtopicFilter=${selectedSubtopic}`;
      }

      const response = await axios.get(`/api${url}`, {
        headers: { Authorization: `Bearer ${token}` }
      });

      const fetchedQs = response.data?.data?.question_data || [];
      if (fetchedQs.length === 0) {
        message.warning("No questions found matching your criteria. Please try another topic.");
      } else {
        setQuestions(fetchedQs);
        setUserAnswers({});
        setCurrentIdx(0);
        setIsTestRunning(true);
        setIsSubmitted(false);
      }
    } catch (error) {
      console.error(error);
      message.error("Error loading questions for practice session.");
    } finally {
      setLoading(false);
    }
  };

  const handleOptionClick = (option: string) => {
    const currentQ = questions[currentIdx];
    setUserAnswers(prev => ({
      ...prev,
      [currentQ._id]: option
    }));
  };

  const calculateResults = () => {
    let correct = 0;
    let incorrect = 0;
    let unattempted = 0;

    questions.forEach(q => {
      const chosen = userAnswers[q._id];
      const correctAns = q.englishQuestion?.answer || q.hindiQuestion?.answer;
      if (!chosen) {
        unattempted++;
      } else if (chosen === correctAns) {
        correct++;
      } else {
        incorrect++;
      }
    });

    return { correct, incorrect, unattempted };
  };

  const { correct, incorrect, unattempted } = calculateResults();
  const scorePercentage = questions.length ? Math.round((correct / questions.length) * 100) : 0;

  return (
    <div className="sub-container py-8 max-w-4xl mx-auto space-y-6">
      {/* 1. SETUP SESSION SCREEN */}
      {!isTestRunning && !isSubmitted && (
        <Card className="rounded-2xl shadow-xl border border-gray-150 p-6 space-y-6 bg-white">
          <div className="text-center space-y-2">
            <h1 className="text-3xl font-extrabold text-primary">Practice Session</h1>
            <p className="text-gray-500 text-sm">
              Select your topic and test your knowledge on-the-spot. Scores are not saved to the database.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
            <div className="space-y-2">
              <label className="block text-sm font-bold text-gray-700">Subject / વિષય</label>
              <Select
                placeholder="Choose Subject"
                className="w-full h-11"
                loading={subjectsLoading}
                onChange={(val) => {
                  setSelectedSubject(val);
                  setSelectedSubtopic(null);
                }}
                value={selectedSubject}
                options={subjects.map((sub: any) => ({
                  value: sub._id,
                  label: sub.name
                }))}
              />
            </div>

            <div className="space-y-2">
              <label className="block text-sm font-bold text-gray-700">Sub-Topic / પેટા-વિષય (Optional)</label>
              <Select
                placeholder="Choose Sub-topic"
                className="w-full h-11"
                loading={subtopicsLoading}
                disabled={!selectedSubject}
                onChange={(val) => setSelectedSubtopic(val)}
                value={selectedSubtopic}
                options={subtopics.map((sub: any) => ({
                  value: sub._id,
                  label: sub.name
                }))}
              />
            </div>

            <div className="space-y-2 md:col-span-2">
              <label className="block text-sm font-bold text-gray-700">Number of Questions</label>
              <Select
                className="w-full h-11"
                defaultValue={10}
                onChange={(val) => setLimit(val)}
                options={[
                  { value: 5, label: "5 Questions" },
                  { value: 10, label: "10 Questions" },
                  { value: 15, label: "15 Questions" },
                  { value: 20, label: "20 Questions" },
                  { value: 30, label: "30 Questions" }
                ]}
              />
            </div>
          </div>

          <div className="pt-4 flex justify-center">
            <Button
              type="primary"
              size="large"
              icon={<PlayCircleOutlined />}
              onClick={handleStartPractice}
              loading={loading}
              className="bg-primary hover:bg-primary/95 h-12 px-8 rounded-xl font-bold border-none"
            >
              Start Practice Session
            </Button>
          </div>
        </Card>
      )}

      {/* 2. EXAM PLAYER SCREEN */}
      {isTestRunning && !isSubmitted && questions.length > 0 && (
        <div className="space-y-6">
          {/* Header Progress */}
          <Card className="rounded-xl border border-gray-150 shadow-sm p-4 bg-white">
            <div className="flex justify-between items-center text-sm font-semibold text-gray-600 mb-2">
              <span>Question {currentIdx + 1} of {questions.length}</span>
              <span>Progress: {Math.round(((currentIdx + 1) / questions.length) * 100)}%</span>
            </div>
            <Progress
              percent={Math.round(((currentIdx) / questions.length) * 100)}
              showInfo={false}
              strokeColor="#1e3a8a"
            />
          </Card>

          {/* Question Box */}
          <Card className="rounded-2xl shadow-xl border border-gray-150 p-6 space-y-6 bg-white min-h-[300px]">
            {/* English translation */}
            {questions[currentIdx]?.englishQuestion?.question && (
              <div className="space-y-4">
                <span className="bg-primary/10 text-primary text-[10px] px-2 py-0.5 rounded font-semibold uppercase tracking-wider">
                  English
                </span>
                <p className="text-lg font-bold text-gray-800">
                  {questions[currentIdx].englishQuestion.question}
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mt-4">
                  {["A", "B", "C", "D"].map((key) => {
                    const optText = (questions[currentIdx].englishQuestion?.options as any)?.[key];
                    const isSelected = userAnswers[questions[currentIdx]._id] === key;
                    return (
                      <button
                        key={key}
                        onClick={() => handleOptionClick(key)}
                        className={`text-left p-4 rounded-xl border font-semibold text-sm transition-all duration-200 ${
                          isSelected
                            ? "bg-primary text-white border-primary shadow-lg scale-[1.01]"
                            : "bg-gray-50 text-gray-700 border-gray-200 hover:border-primary hover:bg-primary/5"
                        }`}
                      >
                        <span className="font-extrabold mr-2">({key})</span> {optText}
                      </button>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Separator line if bilingual */}
            {questions[currentIdx]?.englishQuestion?.question && questions[currentIdx]?.hindiQuestion?.question && (
              <hr className="my-6 border-dashed border-gray-250" />
            )}

            {/* Hindi/Gujarati translation */}
            {questions[currentIdx]?.hindiQuestion?.question && (
              <div className="space-y-4">
                <span className="bg-success/10 text-success text-[10px] px-2 py-0.5 rounded font-semibold uppercase tracking-wider">
                  Hindi / ગુજરાતી
                </span>
                <p className="text-lg font-bold text-gray-800">
                  {questions[currentIdx].hindiQuestion.question}
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mt-4">
                  {["A", "B", "C", "D"].map((key) => {
                    const optText = (questions[currentIdx].hindiQuestion?.options as any)?.[key];
                    const isSelected = userAnswers[questions[currentIdx]._id] === key;
                    return (
                      <button
                        key={key}
                        onClick={() => handleOptionClick(key)}
                        className={`text-left p-4 rounded-xl border font-semibold text-sm transition-all duration-200 ${
                          isSelected
                            ? "bg-primary text-white border-primary shadow-lg scale-[1.01]"
                            : "bg-gray-50 text-gray-700 border-gray-200 hover:border-primary hover:bg-primary/5"
                        }`}
                      >
                        <span className="font-extrabold mr-2">({key})</span> {optText}
                      </button>
                    );
                  })}
                </div>
              </div>
            )}
          </Card>

          {/* Navigation Controls */}
          <div className="flex justify-between items-center">
            <Button
              size="large"
              icon={<LeftOutlined />}
              disabled={currentIdx === 0}
              onClick={() => setCurrentIdx(prev => prev - 1)}
              className="rounded-xl border-gray-300 font-semibold"
            >
              Previous
            </Button>

            {currentIdx < questions.length - 1 ? (
              <Button
                size="large"
                type="primary"
                onClick={() => setCurrentIdx(prev => prev + 1)}
                className="bg-primary hover:bg-primary/95 border-none rounded-xl font-semibold flex items-center gap-1"
              >
                Next <RightOutlined />
              </Button>
            ) : (
              <Button
                size="large"
                type="primary"
                onClick={() => setIsSubmitted(true)}
                className="bg-green-600 hover:bg-green-700 border-none rounded-xl font-bold flex items-center gap-1"
              >
                Submit Practice <CheckCircleOutlined />
              </Button>
            )}
          </div>
        </div>
      )}

      {/* 3. PERFORMANCE RESULTS SCREEN */}
      {isSubmitted && (
        <div className="space-y-6 animate-fade-in">
          <Card className="rounded-2xl shadow-xl border border-gray-150 p-6 text-center bg-white space-y-6">
            <div className="space-y-2">
              <h1 className="text-3xl font-extrabold text-green-600">Practice Completed!</h1>
              <p className="text-gray-500 text-sm">Here is a summary of your performance.</p>
            </div>

            <div className="flex justify-center items-center py-6">
              <Progress
                type="circle"
                percent={scorePercentage}
                strokeColor={{ "0%": "#10b981", "100%": "#059669" }}
                width={150}
                format={(p) => (
                  <div className="space-y-0.5">
                    <div className="text-3xl font-extrabold text-gray-800">{p}%</div>
                    <div className="text-[10px] text-gray-400 font-semibold uppercase">Score</div>
                  </div>
                )}
              />
            </div>

            <div className="grid grid-cols-3 gap-4 border-t border-b border-gray-100 py-4 font-semibold">
              <div>
                <p className="text-xs text-gray-400 uppercase">Correct</p>
                <p className="text-2xl text-green-600">{correct}</p>
              </div>
              <div className="border-l border-r border-gray-100">
                <p className="text-xs text-gray-400 uppercase">Incorrect</p>
                <p className="text-2xl text-red-500">{incorrect}</p>
              </div>
              <div>
                <p className="text-xs text-gray-400 uppercase">Skipped</p>
                <p className="text-2xl text-gray-500">{unattempted}</p>
              </div>
            </div>

            <div className="flex justify-center gap-4 pt-4">
              <Button
                size="large"
                onClick={() => {
                  setIsTestRunning(false);
                  setIsSubmitted(false);
                  setQuestions([]);
                }}
                className="rounded-xl font-semibold h-11"
              >
                Practice Again
              </Button>
            </div>
          </Card>

          {/* Detailed review questions */}
          <div className="space-y-4">
            <h2 className="text-xl font-extrabold text-gray-700">Detailed Answer Review</h2>
            {questions.map((q, idx) => {
              const chosen = userAnswers[q._id];
              const correctAns = q.englishQuestion?.answer || q.hindiQuestion?.answer;
              const isCorrect = chosen === correctAns;

              return (
                <Card
                  key={q._id}
                  className={`rounded-xl border shadow-sm p-5 bg-white space-y-4 ${
                    !chosen
                      ? "border-l-4 border-l-gray-400 border-gray-150"
                      : isCorrect
                      ? "border-l-4 border-l-green-500 border-gray-150"
                      : "border-l-4 border-l-red-500 border-gray-150"
                  }`}
                >
                  <div className="flex justify-between items-center">
                    <span className="font-extrabold text-sm text-gray-500">Question {idx + 1}</span>
                    <span
                      className={`text-xs font-bold px-2 py-0.5 rounded capitalize ${
                        !chosen
                          ? "bg-gray-100 text-gray-500"
                          : isCorrect
                          ? "bg-green-50 text-green-600"
                          : "bg-red-50 text-red-500"
                      }`}
                    >
                      {!chosen ? "Skipped" : isCorrect ? "Correct" : "Incorrect"}
                    </span>
                  </div>

                  {/* Question Texts */}
                  {q.englishQuestion?.question && (
                    <p className="font-bold text-gray-800 text-sm">
                      {q.englishQuestion.question}
                    </p>
                  )}
                  {q.hindiQuestion?.question && (
                    <p className="font-bold text-gray-800 text-sm italic">
                      {q.hindiQuestion.question}
                    </p>
                  )}

                  {/* Answer details */}
                  <div className="bg-gray-50 p-3 rounded-lg text-xs space-y-2">
                    <div className="flex justify-between">
                      <span className="text-gray-400 font-medium">Your Answer:</span>
                      <span className={`font-bold ${isCorrect ? "text-green-600" : "text-red-500"}`}>
                        {chosen ? `(${chosen})` : "None"}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400 font-medium">Correct Answer:</span>
                      <span className="font-bold text-green-600">({correctAns})</span>
                    </div>
                  </div>

                  {/* Solutions / Explanation */}
                  {(q.englishQuestion?.solution || q.hindiQuestion?.solution) && (
                    <div className="mt-2 p-3 bg-blue-50/50 rounded-lg text-xs border border-blue-100/50 space-y-1">
                      <p className="font-bold text-blue-800 flex items-center gap-1">
                        <InfoCircleOutlined /> Explanation / સોલ્યુશન:
                      </p>
                      {q.englishQuestion?.solution && (
                        <p className="text-gray-600">{q.englishQuestion.solution}</p>
                      )}
                      {q.hindiQuestion?.solution && (
                        <p className="text-gray-600 italic">{q.hindiQuestion.solution}</p>
                      )}
                    </div>
                  )}
                </Card>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};

export default Practice;
