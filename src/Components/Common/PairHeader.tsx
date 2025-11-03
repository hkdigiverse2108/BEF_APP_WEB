export interface PairItem {
  combined: string;
}

export interface PairTableProps {
  pair: PairItem[];
  pairTitle: string;
}
export const PairTable = ({ pair, pairTitle }: PairTableProps) => {
  const [leftHeader, rightHeader] = (pairTitle || "")
    .split("---")
    .map((t) => t.trim());

  return (
    <div className="w-full overflow-x-auto mb-4">
      <table className="w-full border border-gray-300 rounded-lg overflow-hidden text-sm">
        <thead>
          <tr className="bg-gray-100">
            <th className="border border-gray-300 px-4 py-2 text-left font-bold w-1/2">
              {leftHeader}
            </th>
            <th className="border border-gray-300 px-4 py-2 text-left font-bold w-1/2">
              {rightHeader}
            </th>
          </tr>
        </thead>

        <tbody>
          {(pair || []).slice(1).map((p, i) => {
            const [left, right] = p.combined
              .split("---")
              .map((txt) => txt.trim());
            return (
              <tr key={i}>
                <td className="border border-gray-300 px-4 py-2">{left}</td>
                <td className="border border-gray-300 px-4 py-2">{right}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};
