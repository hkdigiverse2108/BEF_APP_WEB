import { ImagePath } from "../../Constants";
import { FaAward } from "react-icons/fa";
import type { ContestWinnerCardProps } from "../../Types/Contest";
import type { FC } from "react";

const ContestWinnerCard: FC<ContestWinnerCardProps> = ({ winner }) => {
  return (
    <div className="flex flex-col bg-white border border-primary rounded-xl shadow-sm w-full overflow-hidden">
      {/* Header */}
      <div className="flex justify-between items-center bg-input-box rounded-lg overflow-hidden m-2 p-4 relative">
        <div className="flex items-center gap-3">
          <span className="absolute bg-primary left-0 h-[70%] w-1 rounded-r-2xl"></span>
          <img
            src={winner.img}
            alt={winner.name}
            className="w-12 h-12 rounded-full object-cover border border-gray-200"
          />
          <div>
            <h4 className="font-bold text-gray-800">Rank {winner.rank}</h4>
            <p className="text-sm text-gray-600">{winner.name}</p>
          </div>
        </div>

        <img
          src={`${ImagePath}/contest/Contest-Trophy-2.png`}
          alt="Trophy"
          className="h-full absolute right-0 top-0"
        />
      </div>

      {/* Footer */}
      <div className="flex justify-between items-center bg-orange-500 text-white px-4 py-2 text-sm font-semibold">
        <span className="flex items-center gap-2">
          <FaAward /> Won
        </span>
        <span className="text-lg">{winner.amount}</span>
      </div>
    </div>
  );
};

export default ContestWinnerCard;
