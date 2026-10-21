import {
  CheckCircleFilled,
  CheckCircleOutlined,
  CloseCircleFilled,
  CloseCircleOutlined,
} from "@ant-design/icons";
import { Badge, Drawer, Tooltip } from "antd";
import { FaRegCircle } from "react-icons/fa";
import { IoLanguage } from "react-icons/io5";
import { InstructionButtons } from "../../../Data";
import { useAppDispatch, useAppSelector } from "../../../Store/hooks";
import { setInstructionsDrawer } from "../../../Store/Slices/DrawerSlice";
import { useEffect, useState } from "react";

const InstructionsDrawer = () => {
  const [isOpen, setIsOpen] = useState(false);
  const dispatch = useAppDispatch();
  const { isInstructionsDrawer } = useAppSelector((state) => state.drawer);

  useEffect(() => {
    let timer: ReturnType<typeof setTimeout>;
    if (isInstructionsDrawer) {
      timer = setTimeout(() => {
        setIsOpen(true);
      }, 500);
    } else {
      setIsOpen(false);
    }
    return () => clearTimeout(timer);
  }, [isInstructionsDrawer]);

  const handleClose = () => {
    setIsOpen(false);
    dispatch(setInstructionsDrawer());
  };

  return (
    <Drawer
      placement="right"
      title={
        <div className="flex items-center gap-2.5 py-1">
          <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#124699]/10 text-[#124699] font-bold text-base">
            📋
          </span>
          <div>
            <h3 className="text-base font-bold text-gray-900 m-0">Exam Instructions</h3>
            <p className="text-xs text-gray-500 font-medium m-0">Guidelines & Button Actions</p>
          </div>
        </div>
      }
      size="large"
      onClose={handleClose}
      open={isInstructionsDrawer}
      className="exam-instructions-drawer"
      bodyStyle={{ padding: "20px 24px", background: "#f8fafc" }}
    >
      <div className="flex flex-col gap-6">
        {/* 1. True or False Labeling */}
        <div className="bg-white rounded-xl p-5 border border-gray-200 shadow-xs">
          <div className="flex items-center gap-2 mb-3">
            <span className="flex h-6 w-6 items-center justify-center rounded-full bg-[#124699] text-white text-xs font-bold">1</span>
            <h4 className="font-bold text-sm text-gray-900 m-0">Practice Actively: Label Each Statement True Or False</h4>
          </div>
          <p className="text-xs text-gray-600 mb-3">
            Evaluate individual statements before choosing your final option. Click the check or cross icons:
          </p>
          <div className="space-y-2.5">
            {/* Statement 1: True statement example */}
            <div className="border border-green-200 bg-green-50/40 p-3 rounded-lg flex items-center justify-between gap-3">
              <span className="text-xs font-medium text-gray-800">
                1. Both Statement-1 and Statement-2 are correct
              </span>
              <div className="flex items-center gap-2 shrink-0">
                <Tooltip title="Click if statement is True" color="#15803d" open={isOpen} placement="left">
                  <CheckCircleFilled style={{ color: "#16a34a", fontSize: "18px" }} className="cursor-pointer hover:scale-110 transition" />
                </Tooltip>
                <Tooltip title="Click if statement is False" color="#b91c1c">
                  <CloseCircleOutlined style={{ color: "#94a3b8", fontSize: "18px" }} className="cursor-pointer hover:scale-110 transition" />
                </Tooltip>
              </div>
            </div>

            {/* Statement 2: False statement example */}
            <div className="border border-red-200 bg-red-50/40 p-3 rounded-lg flex items-center justify-between gap-3">
              <span className="text-xs font-medium text-gray-800">
                2. Statement-2 explains Statement-1
              </span>
              <div className="flex items-center gap-2 shrink-0">
                <Tooltip title="Click if statement is True" color="#15803d">
                  <CheckCircleOutlined style={{ color: "#94a3b8", fontSize: "18px" }} className="cursor-pointer hover:scale-110 transition" />
                </Tooltip>
                <Tooltip title="Click if statement is False" color="#b91c1c" open={isOpen} placement="left">
                  <CloseCircleFilled style={{ color: "#dc2626", fontSize: "18px" }} className="cursor-pointer hover:scale-110 transition" />
                </Tooltip>
              </div>
            </div>
          </div>
        </div>

        {/* 2. Elimination Icon */}
        <div className="bg-white rounded-xl p-5 border border-gray-200 shadow-xs">
          <div className="flex items-center gap-2 mb-3">
            <span className="flex h-6 w-6 items-center justify-center rounded-full bg-[#124699] text-white text-xs font-bold">2</span>
            <h4 className="font-bold text-sm text-gray-900 m-0">Improve Accuracy: Option Elimination (50-50 / 33-33)</h4>
          </div>
          <p className="text-xs text-gray-600 mb-3">
            Eliminate wrong options to narrow down your choices and increase precision:
          </p>
          <div className="space-y-2.5">
            <div className="border border-gray-200 bg-white p-3 rounded-lg flex items-center justify-between">
              <div className="flex items-center gap-2">
                <FaRegCircle className="text-gray-400 text-sm" />
                <span className="text-xs font-medium text-gray-700">Both Statement-1 and Statement-2 are correct</span>
              </div>
              <Tooltip title="Click to eliminate option" color="#dc2626" open={isOpen} placement="left">
                <CloseCircleOutlined style={{ color: "#dc2626", fontSize: "16px" }} className="cursor-pointer hover:scale-110 transition" />
              </Tooltip>
            </div>
            <div className="border border-red-200 bg-red-50/70 p-3 rounded-lg flex items-center justify-between line-through text-gray-400">
              <div className="flex items-center gap-2">
                <FaRegCircle className="text-red-300 text-sm" />
                <span className="text-xs font-medium text-red-500">Statement-1 is incorrect (Eliminated)</span>
              </div>
              <CloseCircleFilled style={{ color: "#dc2626", fontSize: "16px" }} />
            </div>
          </div>
        </div>

        {/* 3. Button Actions */}
        <div className="bg-white rounded-xl p-5 border border-gray-200 shadow-xs">
          <div className="flex items-center gap-2 mb-3">
            <span className="flex h-6 w-6 items-center justify-center rounded-full bg-[#124699] text-white text-xs font-bold">3</span>
            <h4 className="font-bold text-sm text-gray-900 m-0">Button Actions Explained</h4>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-3">
            {InstructionButtons?.map((btn, i) => (
              <div key={i} className="border border-gray-100 bg-gray-50/80 rounded-xl p-3 flex flex-col gap-2">
                <button
                  type="button"
                  className={`flex items-center justify-center gap-2 py-2 px-3 text-xs font-bold text-white rounded-lg shadow-xs pointer-events-none ${btn.color}`}
                >
                  {btn.icon}
                  {btn.label}
                </button>
                <p className="text-[11px] text-gray-600 text-center m-0 leading-tight">
                  {btn.tooltipLabel}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* 4. 2X The Stakes */}
        <div className="bg-white rounded-xl p-5 border border-gray-200 shadow-xs">
          <div className="flex items-center gap-2 mb-3">
            <span className="flex h-6 w-6 items-center justify-center rounded-full bg-[#124699] text-white text-xs font-bold">4</span>
            <h4 className="font-bold text-sm text-gray-900 m-0">"2X The Stakes, 2X The Thrill!"</h4>
          </div>
          <div className="flex items-center gap-3 bg-amber-50 border border-amber-200 rounded-xl p-3.5">
            <Badge count={"2X"} color="#124699">
              <div className="text-xs font-bold py-1 px-3 bg-white border border-gray-200 rounded-md text-gray-800 shadow-xs">
                Question
              </div>
            </Badge>
            <p className="text-xs text-amber-900 font-medium m-0 leading-snug">
              Answer correctly: Earn <strong>double positive marks</strong>.<br />
              Answer wrong: Lose <strong>double negative penalty</strong>.
            </p>
          </div>
        </div>

        {/* 5. Change Language */}
        <div className="bg-white rounded-xl p-5 border border-gray-200 shadow-xs">
          <div className="flex items-center gap-2 mb-3">
            <span className="flex h-6 w-6 items-center justify-center rounded-full bg-[#124699] text-white text-xs font-bold">5</span>
            <h4 className="font-bold text-sm text-gray-900 m-0">Change Language Anytime</h4>
          </div>
          <div className="flex items-center gap-3 bg-blue-50 border border-blue-200 rounded-xl p-3.5">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-[#124699] text-white text-base shrink-0">
              <IoLanguage />
            </div>
            <p className="text-xs text-blue-900 font-medium m-0 leading-snug">
              Toggle question language between <strong>English</strong> and <strong>Hindi</strong> anytime using the language selector button in the top bar.
            </p>
          </div>
        </div>
      </div>
    </Drawer>
  );
};

export default InstructionsDrawer;
