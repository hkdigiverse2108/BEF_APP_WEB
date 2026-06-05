import { useState, type SyntheticEvent } from "react";
import { useGetApiQuery } from "../../../Api/CommonApi";
import { Tab, Tabs, useMediaQuery, useTheme } from "@mui/material";
import { URL_KEYS, ROUTES, STORAGE_KEYS } from "../../../Constants";
import { Storage } from "../../../Utils";
import type { ModuleType, ContestCore } from "../../../Types";
import { Empty, Modal, Upload, Button, message } from "antd";
import { FilePdfOutlined, UploadOutlined, PlayCircleOutlined, LockOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const CourseTestsTab = ({ Modules, isUnlocked }: { Modules: ModuleType[]; isUnlocked: boolean }) => {
  const [selectedModule, setSelectedModule] = useState(Modules[0]?._id);
  const [isUploadModalOpen, setIsUploadModalOpen] = useState(false);
  const [activeContestId, setActiveContestId] = useState<string | null>(null);
  const [uploading, setUploading] = useState(false);
  const [fileList, setFileList] = useState<any[]>([]);

  const theme = useTheme();
  const isMdUp = useMediaQuery(theme.breakpoints.up("sm"));
  const navigate = useNavigate();

  const { data, isLoading, refetch } = useGetApiQuery(
    {
      url: `${URL_KEYS.CONTEST.ALL}?moduleFilter=${selectedModule}&typeFilter=course`,
    },
    { skip: !selectedModule }
  );

  const Contests = data?.data?.contest_data || [];

  const handleTabChange = (_: SyntheticEvent, newValue: string) => {
    setSelectedModule(newValue);
  };

  const handleStartTest = (contest: ContestCore) => {
    if (!isUnlocked) {
      message.error("Please purchase the course to attempt tests.");
      return;
    }
    navigate(`${ROUTES.EXAM.INSTRUCTION}?contestId=${contest._id}`, {
      state: { contestStartDate: contest.startDate, isLifetime: (contest as any).isLifetime },
    });
  };

  const handleDownloadOMRPDF = (contestId: string) => {
    const backendUrl = import.meta.env.VITE_API_BASE_URL || "http://localhost:4455";
    window.open(`${backendUrl}/pdfs/contest-omr/${contestId}`, "_blank");
    message.success("Downloading Bilingual Question Paper with OMR bubble sheet.");
  };

  const handleUploadOMRClick = (contestId: string) => {
    setActiveContestId(contestId);
    setFileList([]);
    setIsUploadModalOpen(true);
  };

  const handleOMRSubmit = async () => {
    if (!fileList.length || !activeContestId) {
      message.error("Please select a photo of your OMR sheet first.");
      return;
    }

    const formData = new FormData();
    formData.append("image", fileList[0].originFileObj);
    formData.append("contestId", activeContestId);

    setUploading(true);
    try {
      // Direct axios call to the uploaded api
      const token = Storage.getItem(STORAGE_KEYS.TOKEN) || "";
      const response = await axios.post("/api/qa/evaluate-omr", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          authorization: token
        }
      });

      if (response.data?.status === 200) {
        message.success(response.data.message || "OMR sheet evaluated successfully!");
        Modal.success({
          title: "AI OMR Evaluation Successful!",
          content: (
            <div className="space-y-2 mt-3">
              <p className="font-semibold text-lg text-primary">Score: {response.data.data.score} Points</p>
              <p className="text-green-600">Correct Answers: {response.data.data.totalRightAnswer}</p>
              <p className="text-red-500">Incorrect Answers: {response.data.data.totalWrongAnswer}</p>
              <p className="text-gray-500">Skipped: {response.data.data.totalSkippedAnswer}</p>
            </div>
          ),
          onOk() {
            setIsUploadModalOpen(false);
            refetch();
          }
        });
      } else {
        message.error(response.data?.message || "Failed to parse OMR sheet.");
      }
    } catch (error: any) {
      console.error(error);
      message.error(error.response?.data?.message || "Error submitting OMR sheet for AI evaluation.");
    } finally {
      setUploading(false);
    }
  };

  if (isLoading) return false;

  return (
    <>
      <div className="flex max-sm:flex-col gap-4" data-aos="fade-up">
        <div className="sm:!w-1/2 md:!w-1/4">
          <Tabs
            value={selectedModule}
            onChange={handleTabChange}
            textColor="primary"
            variant="scrollable"
            scrollButtons="auto"
            orientation={isMdUp ? "vertical" : "horizontal"}
            aria-label="module tests tab selection"
            className="LecturesTabs max-sm:w-full! sm:!w-full !flex !justify-between !gap-4 border-b sm:border sm:rounded-lg border-gray-300 "
            sx={{
              "& .MuiTabs-flexContainer ": {
                justifyContent: "space-between",
              },
            }}
          >
            {Modules?.map((module: ModuleType, index) => {
              return <Tab key={index} value={module?._id} label={module?.name} />;
            })}
          </Tabs>
        </div>
        <div className="w-full flex flex-col gap-3">
          {Contests?.length === 0 ? (
            <Empty description="No tests uploaded in this module." />
          ) : (
            Contests?.map((contest: ContestCore) => (
              <div
                key={contest._id}
                className="flex flex-col sm:flex-row justify-between gap-4 bg-white rounded-xl border border-gray-150 p-4 shadow-sm hover:shadow-md transition duration-200"
              >
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <span className="bg-primary/10 text-primary text-xs px-2 py-0.5 rounded font-semibold">
                      Exam Paper
                    </span>
                    <span className="text-gray-500 text-xs">
                      {contest.totalQuestions} Questions | {contest.totalTime}
                    </span>
                  </div>
                  <h3 className="text-base font-bold text-gray-800 capitalize">{contest.name}</h3>
                  <p className="text-xs text-gray-500">
                    Marks: {contest.totalMarks || contest.totalQuestions} Marks | Status:{" "}
                    <span className="font-semibold text-primary capitalize">{contest.status}</span>
                  </p>
                </div>

                <div className="flex flex-wrap items-center gap-2 sm:self-center">
                  {!isUnlocked ? (
                    <span className="text-sm text-gray-400 font-medium flex items-center gap-1">
                      <LockOutlined /> Locked (Purchase Course)
                    </span>
                  ) : (
                    <>
                      {/* Online Start Test */}
                      <Button
                        type="primary"
                        icon={<PlayCircleOutlined />}
                        onClick={() => handleStartTest(contest)}
                        className="rounded-lg font-semibold bg-primary hover:bg-primary/95 border-none"
                      >
                        Start Online Test
                      </Button>

                      {/* Offline PDF & OMR Download */}
                      {contest.isOfflineOMRAvailable && (
                        <>
                          <Button
                            icon={<FilePdfOutlined />}
                            onClick={() => handleDownloadOMRPDF(contest._id || "")}
                            className="rounded-lg font-semibold border-red-200 text-red-500 hover:text-red-600 hover:border-red-400"
                          >
                            OMR Paper (PDF)
                          </Button>

                          <Button
                            icon={<UploadOutlined />}
                            onClick={() => handleUploadOMRClick(contest._id || "")}
                            className="rounded-lg font-semibold border-green-200 text-green-600 hover:text-green-700 hover:border-green-400"
                          >
                            AI Scan OMR
                          </Button>
                        </>
                      )}
                    </>
                  )}
                </div>
              </div>
            ))
          )}
        </div>
      </div>

      {/* OMR Upload Modal */}
      <Modal
        title="Upload Scanned OMR Sheet"
        open={isUploadModalOpen}
        onCancel={() => setIsUploadModalOpen(false)}
        footer={[
          <Button key="back" onClick={() => setIsUploadModalOpen(false)}>
            Cancel
          </Button>,
          <Button
            key="submit"
            type="primary"
            loading={uploading}
            onClick={handleOMRSubmit}
            className="bg-primary border-none"
          >
            Submit for AI Grading
          </Button>,
        ]}
      >
        <div className="space-y-4 py-4">
          <p className="text-sm text-gray-500">
            Take a clear, well-lit photo of your completed OMR answer sheet, placing it flat on a surface. Ensure all corners are fully visible before uploading.
          </p>
          <Upload
            beforeUpload={() => false}
            maxCount={1}
            listType="picture"
            fileList={fileList}
            onChange={({ fileList }) => setFileList(fileList)}
            accept="image/*"
          >
            <Button icon={<UploadOutlined />}>Select Photo / Camera</Button>
          </Upload>
        </div>
      </Modal>
    </>
  );
};

export default CourseTestsTab;
