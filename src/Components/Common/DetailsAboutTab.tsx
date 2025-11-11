import { useState, type FC } from "react";
import { TbCloudDownload } from "react-icons/tb";
import { ImagePath } from "../../Constants";

interface CourseAboutTabProps {
  pdf: string;
  totalLecture: number;
  description: string;
  totalTest: number;
}

const CourseAboutTab: FC<{ data: CourseAboutTabProps }> = ({ data }) => {
  const [isMore, setIsMore] = useState(false);
  const handleDownload = () => {
    const link = document.createElement("a");
    link.href = data?.pdf;
    link.download = "brochure.pdf";
    link.click();
  };

  return (
    <section className="space-y-6" data-aos="fade-up">
      <div className="grid grid-cols-2 gap-3">
        <section className="flex gap-3 items-center">
          <img
            src={`${ImagePath}/workshop/VideoIcon.png`}
            alt=""
            className="w-8 h-fit"
          />
          <div>
            <h4 className="font-bold">Lectures</h4>
            <p>{data?.totalLecture}</p>
          </div>
        </section>
        <section className="flex gap-3 items-center">
          <img
            src={`${ImagePath}/workshop/NotesIcon.png`}
            alt=""
            className="w-8 h-fit"
          />
          <div>
            <h4 className="font-bold">Tests</h4>
            <p>{data?.totalTest}</p>
          </div>
        </section>
      </div>
      <div>
        <div
          className={`  ${isMore ? "" : "line-clamp-8 sm:line-clamp-5"}  `}
          dangerouslySetInnerHTML={{ __html: data?.description }}
        />
        <button onClick={() => setIsMore(!isMore)} className="font-bold">
          {isMore ? "Less" : "More..."}
        </button>
      </div>
      <div>
        <button
          onClick={handleDownload}
          className="flex w-full border border-gray-300 rounded-md hover:text-primary hover:border-primary transition-colors text-center justify-center py-4 gap-3 uppercase font-bold"
        >
          <span className="text-2xl">
            <TbCloudDownload />
          </span>
          download brochure
        </button>
      </div>
    </section>
  );
};

export default CourseAboutTab;
