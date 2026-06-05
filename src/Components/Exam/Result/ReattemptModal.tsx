import { Modal, Button, List, Spin, message } from "antd";
import { useState, useEffect } from "react";
import { usePostApiMutation } from "../../../Api/CommonApi";
import { URL_KEYS, ROUTES, HTTP_STATUS, STORAGE_KEYS } from "../../../Constants";
import { Storage } from "../../../Utils";
import { PlayCircleOutlined, HistoryOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import axios from "axios";

interface ReattemptModalProps {
  isOpen: boolean;
  onClose: () => void;
  contest: any;
  contestId: string;
}

const ReattemptModal = ({ isOpen, onClose, contest, contestId }: ReattemptModalProps) => {
  const navigate = useNavigate();
  const [attempts, setAttempts] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [PostApi, { isLoading: isStarting }] = usePostApiMutation();

  const fetchAttempts = async () => {
    setLoading(true);
    try {
      const token = Storage.getItem(STORAGE_KEYS.TOKEN) || "";
      // Get all QA attempts for this contest for the logged in user
      const response = await axios.get(`/api${URL_KEYS.QA.ALL}?contestFilter=completed,ongoing,upcoming&contestId=${contestId}`, {
        headers: { authorization: token }
      });
      const allQAs = response.data?.data?.contest_type_data || [];
      // Filter QAs matching this specific contest
      const matchingAttempts = allQAs.filter((qa: any) => {
        const cId = qa.contestId?._id || qa.contestId;
        return cId && cId.toString() === contestId.toString();
      });
      setAttempts(matchingAttempts);
    } catch (error) {
      console.error(error);
      message.error("Failed to load attempt history.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (isOpen && contestId) {
      fetchAttempts();
    }
  }, [isOpen, contestId]);

  const handleStartPracticeAttempt = async () => {
    if (!contest) return;

    try {
      const isLifetime = contest.contestId?.isLifetime === true || contest.isLifetime === true || (contest as any).isLifetime === true;
      const payload = {
        contestId: contestId,
        subjectId: contest.subjectId?._id || contest.subjectId,
        classesId: contest.classesId?._id || contest.classesIds?.[0] || contest.classesId,
        contestStartDate: contest.contestId?.startDate || contest.startDate,
        contestEndDate: contest.contestId?.endDate || contest.endDate,
        isPractice: isLifetime ? false : true
      };

      const res = await PostApi({ url: URL_KEYS.QA.ADD, data: payload });

      if (res?.data?.status === HTTP_STATUS.OK) {
        const newQaId = res?.data?.data?.qa?._id;
        message.success(isLifetime ? "Started new exam attempt." : "Started new practice attempt.");
        onClose();
        navigate(`${ROUTES.EXAM.INSTRUCTION}?contestId=${contestId}${isLifetime ? "&isLifetime=true" : "&isPractice=true"}${newQaId ? `&qaId=${newQaId}` : ""}`, {
          state: { contestStartDate: contest.contestId?.startDate || contest.startDate, isLifetime, qaId: newQaId }
        });
      } else {
        message.error(res?.data?.message || "Failed to start attempt.");
      }
    } catch (error) {
      console.error(error);
      message.error("Error creating attempt.");
    }
  };

  return (
    <Modal
      title={
        <div className="flex items-center gap-2 text-primary">
          <HistoryOutlined />
          <span>Contest Attempts & Practice History</span>
        </div>
      }
      open={isOpen}
      onCancel={onClose}
      footer={[
        <Button key="close" onClick={onClose}>
          Close
        </Button>,
        <Button
          key="start"
          type="primary"
          icon={<PlayCircleOutlined />}
          loading={isStarting}
          onClick={handleStartPracticeAttempt}
          className="bg-primary border-none"
        >
          Re-attempt for Practice
        </Button>,
      ]}
      className="rounded-2xl"
    >
      <div className="space-y-4 py-4">
        <p className="text-xs text-gray-500">
          You can attempt this contest multiple times for practice. Your live score on the leaderboard will NOT be changed.
        </p>

        {loading ? (
          <div className="flex justify-center py-6">
            <Spin />
          </div>
        ) : (
          <List
            header={<div className="font-bold text-sm text-gray-700">Previous Attempts</div>}
            bordered
            dataSource={attempts}
            renderItem={(item, idx) => (
              <List.Item 
                className="flex justify-between items-center py-3 hover:bg-gray-50 cursor-pointer transition-colors"
                onClick={() => {
                  onClose();
                  if (item.status === "completed") {
                    navigate(`${ROUTES.EXAM.RESULT}?qaFilter=${item._id}&contestFilter=${contestId}`);
                  } else {
                    const isLifetime = contest.contestId?.isLifetime === true || contest.isLifetime === true || (contest as any).isLifetime === true;
                    navigate(`${ROUTES.EXAM.INSTRUCTION}?contestId=${contestId}&qaId=${item._id}${isLifetime ? "&isLifetime=true" : "&isPractice=true"}`, {
                      state: item
                    });
                  }
                }}
              >
                <div>
                  <p className="font-semibold text-sm">
                    Attempt {item.attemptNumber || idx + 1}{" "}
                    {item.isPractice ? (
                      <span className="text-xs text-gray-400 bg-gray-100 px-2 py-0.5 rounded font-normal">
                        Practice
                      </span>
                    ) : (
                      <span className="text-xs text-green-600 bg-green-50 px-2 py-0.5 rounded font-bold">
                        Live
                      </span>
                    )}
                  </p>
                  <p className="text-[10px] text-gray-400">
                    Date: {new Date(item.createdAt).toLocaleString("en-IN", { timeZone: "Asia/Kolkata" })}
                  </p>
                </div>
                <div className="text-right">
                  {item.status === "completed" ? (
                    <>
                      <p className="font-extrabold text-primary text-base">{item.totalPoints} Points</p>
                      <p className="text-[10px] text-gray-400">
                        R: {item.totalRightAnswer} | W: {item.totalWrongAnswer}
                      </p>
                    </>
                  ) : (
                    <span className="text-xs text-amber-600 bg-amber-50 px-2.5 py-1 rounded-full font-bold border border-amber-200 animate-pulse">
                      In Progress
                    </span>
                  )}
                </div>
              </List.Item>
            )}
            locale={{ emptyText: "No attempts found." }}
          />
        )}
      </div>
    </Modal>
  );
};

export default ReattemptModal;
