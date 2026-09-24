import { type FC } from "react";
import type { ClassCardProps } from "../../Types";

const ClassCard: FC<ClassCardProps> = ({ item, onClick, className }) => {
  return (
    <div onClick={() => onClick?.(item)} className={`w-full h-full overflow-hidden rounded-xl border border-border bg-card shadow-box-shadow cursor-pointer transition-all duration-300 hover:-translate-y-1 hover:shadow-theme hover:border-accent ${className || ""}`}>
      <img className="object-cover w-full h-full" src={item?.image} alt={item?.name || "class image"} />
    </div>
  );
};

export default ClassCard;
