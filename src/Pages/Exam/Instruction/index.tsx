import { CheckCircleFilled, CloseCircleFilled, CloseCircleOutlined } from "@ant-design/icons";
import { Tooltip } from "antd";
import { FaGlobe, FaRegCircle } from "react-icons/fa";
import { FormButton } from "../../../Attribute/FormFields";
import { CardHeader } from "../../../Components/Common/CardHeader";

const ExamInstruction = () => {
  return (
    <div className="sub-container pt-8 question-section">
      <CardHeader title="Exam Instructions" />

      <div className="flex flex-col gap-10 mt-6">
        <div>
          <h2 className="font-semibold text-lg mb-3">1. Practice Actively Label Each Statement True Or False!</h2>
          <div className="grid grid-cols-2">
            <div className="border border-card-border p-4 shadow-sm rounded-lg flex max-sm:flex-col justify-center items-center w-full gap-3 question">
              <span className="flex-1 font-medium">1. Both Statement-1 and statement-2 are correct and Statement-2 explains Statement-1</span>
              <div className="flex justify-end max-sm:w-full">
                <Tooltip title="Click if statement is True" color="#dcfce7" open placement="top">
                  <CheckCircleFilled style={{ color: "#037b3d" }} className="px-2" />
                </Tooltip>
                <Tooltip title="Click if statement is False" color="#ffe2e2" open placement="bottom">
                  <CloseCircleFilled style={{ color: "red" }} className="px-2" />
                </Tooltip>
              </div>
            </div>
          </div>
        </div>
        <span className="border-t border-card-border flex w-full" />
        <div>
          <h2 className="font-semibold text-lg mb-3">2. Improve accuracy : use the elimination icon for 50-50 or 33-33-33!</h2>
          <div className="grid grid-cols-2 gap-3">
            <div className="border border-card-border p-4 shadow-sm rounded-lg flex max-sm:flex-col justify-center items-center w-full gap-3 question">
              <div className="flex items-center w-full">
                <FaRegCircle style={{ color: "gray" }} />
                <span className="flex-1 font-medium px-2">Both Statement-1 and statement-2 are correct and Statement-2 explains Statement-1</span>
                <Tooltip title="Click if you want to eliminate option" color="#ffe2e2" open>
                  <CloseCircleOutlined style={{ color: "red" }} className="px-2" />
                </Tooltip>
              </div>
            </div>
            <div className="border border-red-500 bg-red-50 p-4 shadow-sm rounded-lg flex max-sm:flex-col justify-center items-center w-full gap-3 question">
              <div className="flex items-center w-full">
                <FaRegCircle style={{ color: "gray" }} />
                <span className="flex-1 font-medium px-2">Statement-1 is incorrect, but statement-2 is correct</span>
                <CloseCircleFilled style={{ color: "red" }} className="px-2" />
              </div>
            </div>
          </div>
        </div>
        <span className="border-t border-card-border flex w-full" />

        <div>
          <h2 className="font-semibold text-lg mb-3">3. Strategize Your Answers: Button Actions Explained</h2>
          <div className="grid grid-cols-3 gap-4">
            <div className="flex gap-2 items-center">
              <Tooltip title="Confident about your answer? Select this when you’re absolutely certain it’s correct!" color="#dbeafe" open>
                <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition w-full">100% Sure</button>
              </Tooltip>
            </div>

            <div className="flex gap-2 items-center">
              <Tooltip title="Use elimination or aptitude techniques to solve the question! Click here to showcase your tactical skills!" color="#fce7f3" open>
                <button className="bg-rose-500 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition w-full">Login Play</button>
              </Tooltip>
            </div>

            <div className="flex flex-col gap-2 items-center">
              <Tooltip title="Trusting your gut? Select this when you feel the answer is in your reach, even without full certainty!" color="#dff2fe" open>
                <button className="bg-sky-500 text-white px-4 py-2 rounded-lg hover:bg-sky-500 transition w-full">Intuition Hit</button>
              </Tooltip>
            </div>

            <div className="flex flex-col gap-2 items-center">
              <Tooltip title="Taking a wild guess? Choose this when you're answering without any clue!" color="#fef3c6" open placement="bottom">
                <button className="bg-amber-500 text-white px-4 py-2 rounded-lg hover:bg-amber-500 transition w-full">Blind Fire</button>
              </Tooltip>
            </div>

            <div className="flex flex-col gap-2 items-center">
              <Tooltip title="Confident about your answer? Select this when you’re absolutely certain it’s correct!" color="#f3e8ff" open placement="bottom">
                <button className="bg-purple-700 text-white px-4 py-2 rounded-lg hover:bg-purple-700 transition w-full">Skip</button>
              </Tooltip>
            </div>

            <div className="flex flex-col gap-2 items-center">
              <Tooltip title="Confident about your answer? Select this when you’re absolutely certain it’s correct!" color="#dcfce7" open placement="bottom">
                <button className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition w-full">Fear Driver Skip</button>
              </Tooltip>
            </div>
          </div>
        </div>
        <span className="border-t border-card-border flex w-full" />
        <div>
          <h2 className="font-semibold text-lg mb-3">4. "2X The Stakes, 2X The Thrill!"</h2>
          <div className="bg-white rounded-lg border p-4 flex items-center gap-3">
            <div className="bg-green-600 text-white font-semibold text-lg px-4 py-2 rounded-lg">2X</div>
            <p className="text-gray-700 text-sm">
              Answer correctly: <strong>Earn double marks.</strong> Answer wrong: <strong>Lose double marks.</strong>
            </p>
          </div>
        </div>
        <span className="border-t border-card-border flex w-full" />

        <div>
          <h2 className="font-semibold text-lg mb-3">5. You Can Change Language</h2>
          <div className="flex items-center gap-3">
            <div className="bg-gray-200 p-3 rounded-lg text-xl">
              <FaGlobe />
            </div>
            <button className="bg-orange-500 text-white px-4 py-2 rounded-lg text-sm font-semibold hover:bg-orange-600 transition">English / Hindi</button>
          </div>
        </div>
      </div>

      <div className="w-full flex justify-end my-8">
        <FormButton text="NEXT" className="custom-button w-full sm:w-40 button button--mimas text-center !p-4 !h-12 uppercase" />
      </div>
    </div>
  );
};

export default ExamInstruction;
