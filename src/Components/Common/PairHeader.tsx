import { Checkbox } from "antd";
import {
  CheckCircleFilled,
  CheckCircleOutlined,
  CloseCircleFilled,
  CloseCircleOutlined,
} from "@ant-design/icons";

export interface PairItem {
  combined: string;
}

export interface PairTableProps {
  pair: PairItem[];
  pairTitle: string;
  answers: Record<number, number>;
  onCheck: (id: number, type: "true" | "false") => void;
}
export const PairTable = ({
  pair,
  pairTitle,
  answers,
  onCheck,
}: PairTableProps) => {
  const [leftHeader, rightHeader] = (pairTitle || "")
    .split("---")
    .map((t) => t.trim());

  console.log("Pair:", pair, pairTitle);

  return (
    <div className="w-full overflow-x-auto mb-4 question">
      <div className="w-full border border-gray-300 rounded-lg overflow-hidden bg-gray-100">
        <table className="w-full table-fixed border-collapse text-sm bg-white">
          <thead>
            <tr className="bg-gray-100 border-b border-gray-300">
              <th className="border-e border-gray-300 px-4 py-2 text-left font-bold w-1/2 rounded-tl-lg">
                {leftHeader}
              </th>

              <th className=" px-4 py-2 text-left font-bold w-1/2 rounded-tr-lg">
                {rightHeader}
              </th>
            </tr>
          </thead>

          <tbody>
            {(pair || []).slice(1).map((p, i) => {
              const [left, right] = p.combined
                .split("---")
                .map((txt) => txt.trim());
              const isLast = i === pair.length - 2;

              return (
                <tr
                  key={i}
                  className={` ${isLast ? "" : "border-b border-gray-300"}`}
                >
                  <td
                    className={` border-r border-gray-300 px-4 py-2 ${
                      isLast ? "" : ""
                    }`}
                  >
                    {left}
                  </td>
                  <td
                    className={` flex justify-between px-4 py-2 ${
                      isLast ? "" : ""
                    }`}
                  >
                    {right}
                    <div className="flex justify-end max-sm:w-full gap-2 text-center items-center ">
                      <Checkbox
                        checked={answers[i] === 1}
                        onChange={() => onCheck(i, "true")}
                      >
                        {answers[i] === 1 ? (
                          <CheckCircleFilled style={{ color: "green" }} />
                        ) : (
                          <CheckCircleOutlined style={{ color: "green" }} />
                        )}
                      </Checkbox>

                      <Checkbox
                        checked={answers[i] === 0}
                        onChange={() => onCheck(i, "false")}
                      >
                        {answers[i] === 0 ? (
                          <CloseCircleFilled style={{ color: "red" }} />
                        ) : (
                          <CloseCircleOutlined style={{ color: "red" }} />
                        )}
                      </Checkbox>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>

    // <div className="w-full overflow-x-auto mb-4">
    //   <div className="w-full border-0.5 border-gray-300 rounded-lg !overflow-hidden">
    //     <table className="w-full table-fixed border-collapse text-sm">
    //       <thead>
    //         <tr className="bg-gray-100">
    //           <th className="border border-gray-300 px-4 py-2 text-left font-bold w-1/2 rounded-tl-lg">
    //             {leftHeader}
    //           </th>
    //           <th className="border border-gray-300 px-4 py-2 text-left font-bold w-1/2 rounded-tr-lg">
    //             {rightHeader}
    //           </th>
    //         </tr>
    //       </thead>

    //       <tbody>
    //         {(pair || []).slice(1).map((p, i) => {
    //           const [left, right] = p.combined
    //             .split("---")
    //             .map((txt) => txt.trim());
    //           return (
    //             <tr key={i}>
    //               <td className="border border-gray-300 px-4 py-2">{left}</td>
    //               <td className="border border-gray-300 px-4 py-2 rounded-lg">{right}</td>
    //             </tr>
    //           );
    //         })}
    //       </tbody>
    //     </table>
    //   </div>
    // </div>
  );
};
