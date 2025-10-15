import { ImagePath } from "../../Constants";

const YoutubeValues = () => {
  return (
    <div className="p-5">
      <div className="flex justify-between items-center pb-5">
        <p className="text-lg font-bold">Youtube Course</p>
        <p className="text-base font-semibold bg-primary m-0 py-1 px-3 rounded-lg text-white">View All</p>
      </div>
      <div className="grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        <div className="w-full h-fit bg-input-box-dark rounded-2xl overflow-hidden cursXor-pointer shadow-md">
          <div className="">
            <img src={`${ImagePath}youtubeValues/Youtube-values.jpg`} alt="" className="w-[100%] h-[100%]" />
          </div>
          <div className="bg-input-box p-4">
            <span className="flex items-center justify-between gap-2 sm:gap-4 md:gap-8 font-bold text-lg line-clamp-2">in which stage of sleep does vivid dreaming occur?</span>
          </div>
        </div>
        <div className="w-full h-fit bg-input-box-dark rounded-2xl overflow-hidden cursXor-pointer shadow-md">
          <div className="">
            <img src={`${ImagePath}youtubeValues/Youtube-values.jpg`} alt="" className="w-[100%] h-[100%]" />
          </div>
          <div className="bg-input-box p-4">
            <span className="flex items-center justify-between gap-2 sm:gap-4 md:gap-8 font-bold text-lg line-clamp-2">in which stage of sleep does vivid dreaming occur?</span>
          </div>
        </div>
        <div className="w-full h-fit bg-input-box-dark rounded-2xl overflow-hidden cursXor-pointer shadow-md">
          <div className="">
            <img src={`${ImagePath}youtubeValues/Youtube-values.jpg`} alt="" className="w-[100%] h-[100%]" />
          </div>
          <div className="bg-input-box p-4">
            <span className="flex items-center justify-between gap-2 sm:gap-4 md:gap-8 font-bold text-lg line-clamp-2">in which stage of sleep does vivid dreaming occur?</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default YoutubeValues;
