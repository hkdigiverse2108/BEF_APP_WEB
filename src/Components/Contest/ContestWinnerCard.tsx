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

    const genderWiseProfileImage = (gender = "male") => {
      return gender === "female" ? `${ImagePath}user/User_Female.png` : `${ImagePath}user/User_Male.png`;
    };

  return (
    <div className="bef-card flex flex-col w-full overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:border-accent">
      <div className="bef-card-strip" />
      {/* Header */}
      <div className="p-3">
        <div className="flex justify-between items-center rounded-xl overflow-hidden p-4 relative bg-secondary border border-border" style={rank > 3 ? undefined : getBackgroundStyle()}>
          <div className="flex items-center gap-3 min-w-0">
            <span className="absolute bg-primary left-0 h-[70%] w-1 rounded-r-2xl"></span>
            <img src={winner?.profileImage || genderWiseProfileImage(winner?.gender?.toLocaleLowerCase())} alt={winner.firstName} className="w-12 h-12 shrink-0 rounded-full object-cover border-2 border-card shadow-sm" />
            <div className="min-w-0">
              <h4 className="font-heading font-bold text-foreground truncate">Rank #{rank}</h4>
              <p className="text-sm text-muted-foreground capitalize truncate">{`${winner.firstName} ${winner.lastName}`}</p>
            </div>
          </div>

          <img src={`${ImagePath}/contest/Contest-Trophy-2.png`} alt="Trophy" className="h-12 sm:h-14 w-auto shrink-0" />
        </div>
      </div>

      {/* Footer */}
      <div className="flex justify-between items-center bg-gradient-to-r from-primary to-tertiary text-white px-4 sm:px-5 py-3 sm:py-4 text-sm font-semibold">
        <span className="flex items-center gap-2">
          <FaAward /> Achieved Scholarship
        </span>
        <span className="font-heading text-base sm:text-lg font-bold">₹{winner.totalAmount}</span>
      </div>
    </div>
  );
};

export default ContestWinnerCard;
