import { List, Modal, Spin, message } from "antd";
import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ROUTES, STORAGE_KEYS, URL_KEYS } from "../../../Constants";
import { Storage } from "../../../Utils";

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
  // const [PostApi, { isLoading: isStarting }] = usePostApiMutation();

  const fetchAttempts = async () => {
    setLoading(true);
    try {
      const token = Storage.getItem(STORAGE_KEYS.TOKEN) || "";
      // Get all QA attempts for this contest for the logged in user
      const response = await axios.get(`/api${URL_KEYS.QA.ALL}?contestFilter=completed,ongoing,upcoming&contestId=${contestId}`, {
        headers: { authorization: token },
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

  return (
    <Modal open={isOpen} onCancel={onClose} footer={null} className="feedback" width="600px">
      <div className="flex flex-col items-center justify-center min-h-full">
        <div className="w-full !rounded-2xl overflow-hidden border border-gray-200 bg-input-box bg-cover bg-top">
          <div className="text-center p-3 sm:p-6 !pb-0">
            <h2 className="text-2xl font-semibold">Contest Attempts & Practice History</h2>
            <p className="text-xs text-gray-500 pt-2">You can attempt this contest multiple times for practice. Your live score on the leaderboard will NOT be changed.</p>
          </div>

          <div className="p-3 sm:p-6 flex flex-col gap-6">
            <div className="bg-white rounded-lg p-3 sm:p-6">
              <div className="space-y-4">
                {loading ? (
                  <div className="flex justify-center py-6">
                    <Spin />
                  </div>
                ) : (
                  <div className="border border-gray-300 rounded-lg overflow-hidden">
                    {/* Fixed Header */}
                    <div className="font-bold text-sm text-gray-700 px-4 py-3 border-b border-gray-300 bg-white sticky top-0 z-10">Previous Attempts</div>

                    {/* Scrollable Content */}
                    <div className="max-h-[400px] overflow-y-auto custom-scrollbar">
                      <List
                        dataSource={attempts}
                        renderItem={(item, idx) => (
                          <List.Item
                            className="flex justify-between items-center !px-3 hover:bg-gray-50 cursor-pointer transition-colors"
                            onClick={() => {
                              onClose();
                              if (item.status === "completed") {
                                navigate(`${ROUTES.EXAM.RESULT}?qaFilter=${item._id}&contestFilter=${contestId}`);
                              } else {
                                const isLifetime = contest.contestId?.isLifetime === true || contest.isLifetime === true || (contest as any).isLifetime === true;
                                navigate(`${ROUTES.EXAM.INSTRUCTION}?contestId=${contestId}&qaId=${item._id}${isLifetime ? "&isLifetime=true" : "&isPractice=true"}`, {
                                  state: item,
                                });
                              }
                            }}
                          >
                            <div>
                              <p className="font-semibold text-sm">
                                Attempt {item.attemptNumber || idx + 1}
                                {/* {item.isPractice ? <span className="text-xs text-gray-400 bg-gray-100 px-2 py-0.5 rounded font-normal">Practice</span> : <span className="text-xs text-green-600 bg-green-50 px-2 py-0.5 rounded font-bold">Live</span>} */}
                              </p>
                              <p className="text-[10px] text-gray-400">Date: {new Date(item.createdAt).toLocaleString("en-IN", { timeZone: "Asia/Kolkata" })}</p>
                            </div>
                            <div className="text-right">
                              {item.status === "completed" ? (
                                <>
                                  {/* <p className="font-extrabold text-primary text-base">{item.totalPoints} Points</p>
                      <p className="text-[10px] text-gray-400">
                        R: {item.totalRightAnswer} | W: {item.totalWrongAnswer}
                      </p> */}
                                  <span className="text-xs text-green-600 bg-green-50 px-2.5 py-1 rounded-full font-bold border border-green-200 animate-pulse">Completed</span>
                                </>
                              ) : (
                                <span className="text-xs text-amber-600 bg-amber-50 px-2.5 py-1 rounded-full font-bold border border-amber-200 animate-pulse">In Progress</span>
                              )}
                            </div>
                          </List.Item>
                        )}
                        locale={{ emptyText: "No attempts found." }}
                      />
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default ReattemptModal;
