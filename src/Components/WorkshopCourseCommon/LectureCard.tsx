import { FaLock } from "react-icons/fa";
import type { LectureType } from "../../Types";
import { FileTextFilled } from "@ant-design/icons";
import { useAppDispatch } from "../../Store/hooks";
import { setModalVideoLink, setModalVideoPlay } from "../../Store/Slices/VideoModalSlice";

interface LectureCardProps {
  lecture: LectureType;
  isUnlocked: boolean;
}

const LectureCard = ({ lecture, isUnlocked = false }: LectureCardProps) => {
  const dispatch = useAppDispatch();

  return (
    <div key={lecture?._id} className=" flex max-sm:flex-col flex-nowrap gap-2 justify-between bg-white rounded-lg  border border-gray-200 p-2 h-fit items-stretch">
      <section className="flex max-sm:gap-1 gap-4 h-fit ">
        {/* Image */}
        <figure
          className="relative"
          onClick={() => {
            if (!lecture?.isLocked || isUnlocked) {
              dispatch(setModalVideoPlay(true));
              dispatch(setModalVideoLink(lecture?.link));
            }
          }}
        >
          <img src={lecture?.image} alt={lecture?.title} className="min-w-20 max-h-30 max-w-60 w-full h-fit sm:h-23 rounded-lg object-cover" />
          {lecture?.isLocked && !isUnlocked && (
            <span className="absolute -top-1 -left-1 bg-black/10 backdrop-blur-md p-2 rounded-full">
              <FaLock className="text-white max-sm:text-[10px]" />
            </span>
          )}
        </figure>

        <div className="flex flex-col gap-0.5 sm:gap-2 sm:justify-between overflow-hidden   ">
          <div className="hidden sm:flex items-center gap-2 text-xs">
            <span className="bg-gray-200 px-1.5 py-0.5 rounded">{lecture?.language} </span>
            <span className="text-primary font-semibold">{lecture?.subjectName}</span>
          </div>

          <h2 className="text-wrap font-semibold text-[10px] sm:text-base block truncate">{lecture?.title}</h2>

          <p className=" text-gray-600 text-[10px]  font-medium sm:text-sm   line-clamp-2">{lecture?.subtitle}</p>
        </div>
      </section>
      <section className="flex max-sm:justify-between  items-end ">
        {lecture?.pdf && (
          <a href={lecture?.pdf} className="flex gap-2 py-1 px-2  h-fit items-center  hover:text-primary border border-gray-200 hover:border-primary rounded max-sm:text-xs sm:ont-medium transition duration-200  ">
            <FileTextFilled className="sm:text-xl " />
            <span>PDF</span>
          </a>
        )}
      </section>
    </div>
  );
};

export default LectureCard;
