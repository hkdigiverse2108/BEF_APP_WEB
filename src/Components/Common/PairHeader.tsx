// import { CheckCircleFilled, CheckCircleOutlined, CloseCircleFilled, CloseCircleOutlined } from "@ant-design/icons";
// import { Checkbox } from "antd";
// import type { FC } from "react";

// export interface PairItem {
//   combined: string;
// }

// export interface PairTableProps {
//   pair: PairItem[];
//   pairTitle: string;
//   answers?: Record<number, number | undefined>;
//   onCheck?: (id: number, type: "true" | "false") => void;
// }
// export const PairTable: FC<PairTableProps> = ({ pair, pairTitle, answers, onCheck }) => {
//   const [leftHeader, rightHeader] = (pairTitle || "").split("---").map((t) => t.trim());

//   return (
//     <div className="w-full overflow-x-auto mb-4 question">
//       <div className="w-full border border-gray-300 rounded-lg overflow-hidden bg-gray-100">
//         <table className="w-full table-fixed border-collapse text-sm bg-white">
//           <thead>
//             <tr className="bg-gray-100 border-b border-gray-300">
//               <th className="border-e border-gray-300 px-4 py-2 text-left font-bold w-1/2 rounded-tl-lg">{leftHeader}</th>
//               <th className="border-e border-gray-300 px-4 py-2 text-left font-bold w-1/2 rounded-tl-lg">{rightHeader}</th>
//               <th className="px-4 py-2 text-left font-bold w-[100px] rounded-tr-lg">Check</th>
//             </tr>
//           </thead>

//           <tbody>
//             {(pair || []).slice(1).map((p, i) => {
//               const [left, right] = p.combined.split("---").map((txt) => txt.trim());
//               const isLast = i === pair.length - 2;

//               return (
//                 <tr key={i} className={` ${isLast ? "" : "border-b border-gray-300"}`}>
//                   <td className={` border-r border-gray-300 px-4 py-2 ${isLast ? "" : ""}`}>{left}</td>
//                   <td className={` border-r border-gray-300 px-4 py-2 ${isLast ? "" : ""}`}>{right}</td>
//                   <td className={` px-4 py-2 ${isLast ? "" : ""}`}>
//                     {onCheck && answers && (
//                       <div className="flex justify-center max-sm:w-full gap-2 text-center items-center ">
//                         <Checkbox checked={answers[i] === 1} onChange={() => onCheck(i, "true")}>
//                           {answers[i] === 1 ? <CheckCircleFilled style={{ color: "green" }} /> : <CheckCircleOutlined style={{ color: "green" }} />}
//                         </Checkbox>

//                         <Checkbox checked={answers[i] === 0} onChange={() => onCheck(i, "false")}>
//                           {answers[i] === 0 ? <CloseCircleFilled style={{ color: "red" }} /> : <CloseCircleOutlined style={{ color: "red" }} />}
//                         </Checkbox>
//                       </div>
//                     )}
//                   </td>
//                 </tr>
//               );
//             })}
//           </tbody>
//         </table>
//       </div>
//     </div>
//   );
// };

import { CheckCircleFilled, CheckCircleOutlined, CloseCircleFilled, CloseCircleOutlined } from "@ant-design/icons";
import { Checkbox } from "antd";
import type { FC } from "react";

export interface PairItem {
  combined: string; // e.g. "Dhuandhar---Malwa---Narmada"
}

export interface PairTableProps {
  pair: PairItem[]; // list of rows
  pairTitle: string; // e.g. "Waterfall---Region---River"
  answers?: Record<number, number | undefined>;
  onCheck?: (id: number, type: "true" | "false") => void;
}

export const PairTable: FC<PairTableProps> = ({ pair, pairTitle, answers, onCheck }) => {
  // Split headers dynamically (e.g. ["Waterfall", "Region", "River"])
  const headers = (pairTitle || "").split("---").map((t) => t.trim());

  return (
    <div className="w-full overflow-x-auto mb-4 question">
      <div className="min-w-full border border-gray-300 rounded-lg overflow-x-auto bg-gray-100">
        <table className="min-w-full border-collapse text-sm bg-white ">
          {/* --------- Header --------- */}
          <thead>
            <tr className="bg-gray-100 border-b border-gray-300">
              {headers.map((header, i) => (
                <th key={i} className={`px-4 py-2 min-w-[200px] text-left font-bold border-gray-300 ${i === headers.length - 1 ? "" : "border-e"}`}>
                  {header}
                </th>
              ))}
              {onCheck && answers && <th className="px-4 py-2 text-center font-bold w-[120px] border-l border-gray-300">Action</th>}
            </tr>
          </thead>

          {/* --------- Body --------- */}
          <tbody>
            {(pair || []).slice(1).map((p, i) => {
              const cols = p.combined.split("---").map((txt) => txt.trim());
              const isLast = i === pair.length - 2;

              return (
                <tr key={i} className={`${isLast ? "" : "border-b border-gray-300"}`}>
                  {cols.map((val, j) => (
                    <td key={j} className={`px-4 py-2 border-gray-300 ${j === headers.length? "" : "border-e"}`}>
                      {val}
                    </td>
                  ))}

                  {/* Checkboxes */}
                  {onCheck && answers && (
                    <td className="px-4 py-2 text-center">
                      <div className="flex justify-center gap-2 text-center items-center">
                        <Checkbox checked={answers[i] === 1} onChange={() => onCheck(i, "true")}>
                          {answers[i] === 1 ? <CheckCircleFilled style={{ color: "green" }} /> : <CheckCircleOutlined style={{ color: "green" }} />}
                        </Checkbox>

                        <Checkbox checked={answers[i] === 0} onChange={() => onCheck(i, "false")}>
                          {answers[i] === 0 ? <CloseCircleFilled style={{ color: "red" }} /> : <CloseCircleOutlined style={{ color: "red" }} />}
                        </Checkbox>
                      </div>
                    </td>
                  )}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};
