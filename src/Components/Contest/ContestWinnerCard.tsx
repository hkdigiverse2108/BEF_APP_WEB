import { ImagePath } from "../../Constants";
import { FaAward } from "react-icons/fa";
import type { ContestWinnerCardProps } from "../../Types/";
import type { FC } from "react";

const ContestWinnerCard: FC<ContestWinnerCardProps> = ({ winner }) => {
  const getBackgroundStyle = () => {
    if (winner.rank === 1) {
      return { backgroundImage: `url(${ImagePath}/winner/Winner1.png)` };
    } else if (winner.rank === 2) {
      return { backgroundImage: `url(${ImagePath}/winner/Winner2.png)` };
    } else if (winner.rank === 3) {
      return { backgroundImage: `url(${ImagePath}/winner/Winner3.png)` };
    } else {
      return { backgroundColor: "var(--color-input-box)" };
    }
  };

  return (
    <div className="flex flex-col bg-white rounded-xl shadow-sm w-full overflow-hidden">
      {/* Header */}
      <div className="border-t border-x border-primary rounded-t-xl">
        <div
          className={`flex justify-between items-center rounded-lg overflow-hidden m-3 p-4 relative ${
            winner.rank > 3 ? "bg-input-box" : ""
          }`}
          style={getBackgroundStyle()}
        >
          <div className="flex items-center gap-3">
            <span className="absolute bg-primary left-0 h-[70%] w-1 rounded-r-2xl"></span>
            <img
              src={winner.img}
              alt={winner.name}
              className="w-12 h-12 rounded-full object-cover border border-gray-200"
            />
            <div>
              <h4 className="font-bold text-gray-800">Rank #{winner.rank}</h4>
              <p className="text-sm text-gray-600">{winner.name}</p>
            </div>
          </div>

          <img
            src={`${ImagePath}/contest/Contest-Trophy-2.png`}
            alt="Trophy"
            className="h-full absolute right-0 top-0"
          />
        </div>
      </div>

      {/* Footer */}
      <div className="flex justify-between items-center bg-success text-white px-4 py-2 text-sm font-semibold">
        <span className="flex items-center gap-2">
          <FaAward /> Won
        </span>
        <span className="text-lg">₹{winner.amount}</span>
      </div>
    </div>
  );
};

export default ContestWinnerCard;
