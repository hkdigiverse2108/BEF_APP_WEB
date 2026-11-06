import { type FC } from "react";
import { LuArrowRight } from "react-icons/lu";
import { ImagePath } from "../../Constants";
import type { ClassCardProps } from "../../Types";

const ClassCard: FC<ClassCardProps> = ({ item, onClick, className, index = 0 }) => {
  const isAlternate = (index ?? 0) % 2 === 1;
  const classNameText = item?.name || "Class";

  return (
    <button
      type="button"
      onClick={() => onClick?.(item)}
      className={`achiwon-class-card group ${isAlternate ? "is-alternate" : ""} ${className || ""}`}
    >
      {/* Achiwon 3D Lion Mascot pop-out anchored to bottom-left */}
      <img
        src={`${ImagePath}mascot/achiwon-mascot.png`}
        alt="Achiwon Lion Mascot"
        className="mascot"
        loading="lazy"
      />

      {/* Main Content Area */}
      <div className="card-content">
        <span className="card-title">
          {classNameText}
        </span>
        <span className="card-circle-btn">
          <LuArrowRight />
        </span>
      </div>
    </button>
  );
};

export default ClassCard;
