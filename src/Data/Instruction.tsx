import { FaLightbulb } from "react-icons/fa";
import { MdLibraryAddCheck, MdVisibility, MdVisibilityOff } from "react-icons/md";
import { RiFileCheckFill } from "react-icons/ri";
import { TbMessageQuestion } from "react-icons/tb";

export const InstructionButtons = [
  { label: "100% Sure", icon: <MdLibraryAddCheck className="text-lg" />, color: "bg-blue-600", placement: "topLeft", tooltipLabel: "Confident about your answer? Select this when you’re absolutely certain it’s correct!", tooltipColor: "#dbeafe" },
  { label: "Logic Play", icon: <FaLightbulb className="text-lg" />, color: "bg-rose-500", placement: "top", tooltipLabel: "Use elimination or aptitude techniques to solve the question! Click here to showcase your tactical skills!", tooltipColor: "#fce7f3" },
  { label: "Intuition Hit", icon: <MdVisibility className="text-lg" />, color: "bg-sky-500", placement: "topRight", tooltipLabel: "Trusting your gut? Select this when you feel the answer is in your reach, even without full certainty!", tooltipColor: "#dff2fe" },
  { label: "Blind Fire", icon: <MdVisibilityOff className="text-lg" />, color: "bg-amber-500", placement: "bottomLeft", tooltipLabel: "Taking a wild guess? Choose this when you're answering without any clue!", tooltipColor: "#fef3c6" },
  { label: "Skip", icon: <TbMessageQuestion className="text-lg" />, color: "bg-purple-700", placement: "bottom", tooltipLabel: "Want to skip this one? No problem, move ahead confidently!", tooltipColor: "#f3e8ff" },
  { label: "Fear - Driver Skip", icon: <RiFileCheckFill className="text-lg" />, color: "bg-green-700", placement: "bottomRight", tooltipLabel: "Feeling uncertain? Select this to skip due to lack of confidence.", tooltipColor: "#dcfce7" },
];
