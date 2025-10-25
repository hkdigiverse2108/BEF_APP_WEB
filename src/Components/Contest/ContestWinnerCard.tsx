import { ImagePath } from "../../Constants";
import { FaAward } from "react-icons/fa";
import type { ContestWinnerCardProps } from "../../Types/";
import type { FC } from "react";

const ContestWinnerCard: FC<ContestWinnerCardProps> = ({ winner, rank }) => {
  const getBackgroundStyle = () => {
    if (rank === 1) {
      return { backgroundImage: `url(${ImagePath}/winner/Winner1.png)` };
    } else if (rank === 2) {
      return { backgroundImage: `url(${ImagePath}/winner/Winner2.png)` };
    } else if (rank === 3) {
      return { backgroundImage: `url(${ImagePath}/winner/Winner3.png)` };
    } else {
      return { backgroundColor: "var(--color-input-box)" };
    }
  };

  return (
    <div className="flex flex-col bg-white rounded-xl shadow-sm w-full overflow-hidden">
      {/* Header */}
      <div className="border-t border-x border-primary rounded-t-xl">
        <div className="flex justify-between items-center rounded-lg overflow-hidden m-3 p-4 relative" style={getBackgroundStyle()}>
          <div className="flex items-center gap-3">
            <span className="absolute bg-primary left-0 h-[70%] w-1 rounded-r-2xl"></span>
            <img src={winner?.profileImage || "https://api.dicebear.com/7.x/miniavs/svg?seed=5"} alt={winner.firstName} className="w-12 h-12 rounded-full object-cover border border-gray-200" />
            <div>
              <h4 className="font-bold text-gray-800">Rank #{rank}</h4>
              <p className="text-sm text-gray-600 capitalize">{`${winner.firstName} ${winner.lastName}`}</p>
            </div>
          </div>

          <img src={`${ImagePath}/contest/Contest-Trophy-2.png`} alt="Trophy" className="h-full absolute right-0 top-0" />
        </div>
      </div>

      {/* Footer */}
      <div className="flex justify-between items-center bg-success text-white px-4 py-2 text-sm font-semibold">
        <span className="flex items-center gap-2">
          <FaAward /> Won
        </span>
        <span className="text-lg">₹{winner.totalAmount}</span>
      </div>
    </div>
  );
};

export default ContestWinnerCard;
