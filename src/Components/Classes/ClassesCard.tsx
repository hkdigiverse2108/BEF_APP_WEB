import { type FC } from "react";
import { ImagePath } from "../../Constants";
import type { ClassCardProps } from "../../Types";

const ClassCard: FC<ClassCardProps> = ({ item, onClick, image, className }) => {
  return (
    <div onClick={() => onClick?.(item)} className={`w-full h-full rounded-2xl shadow hover:shadow-xl hover:scale-101 overflow-hidden cursor-pointer flex justify-center items-center transition-all duration-300 ${className || ""}`}>
      <img className="object-cover w-full h-full rounded-2xl" src={image || `${ImagePath}classic/2.png`} alt={item?.name || "class image"} />
    </div>
  );
};

export default ClassCard;
