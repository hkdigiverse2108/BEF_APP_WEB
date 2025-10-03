import { Button } from "antd";
import { ImagePath } from "../../Constants";

const Classic = () => {
  return (
    <div className="p-5 pt-0">
      <div className="grid gap-4 grid-cols-1 sm:grid-cols-2">
        <a href="#" className="flex flex-col items-center gap-4 w-full h-full rounded-2xl p-6 shadow-sm lg:flex-row bg-cover bg-center" data-aos="fade-up" style={{ backgroundImage: `url(${ImagePath}classic/Classic-bg.png)` }}>
          <img className="object-cover w-30 lg:w-40 rounded-xl border-2 border-white" src={`${ImagePath}classic/Classic.png`} />
          <div className="grid grid-cols-1 2xl:grid-cols-3 gap-1 lg:gap-3 w-full">
            <div className="col-span-2">
              <h3 className="text-2xl 2xl:text-4xl text-center lg:text-left font-bold tracking-tight text-white">Bharat Exam Fest</h3>
              <p className="text-lg font-normal text-center lg:text-left text-white">Daily quizzes, smart analysis.</p>
            </div>
            <div className="flex items-end-safe">
              <Button className="custom-button button button--mimas text-center w-full !p-4 !h-12 uppercase flex items-end-safe">
                <span>explore now</span>
              </Button>
            </div>
          </div>
        </a>
        <a href="#" className="flex flex-col items-center gap-4 w-full h-full rounded-2xl p-6 shadow-sm lg:flex-row bg-cover bg-center" data-aos="fade-up" style={{ backgroundImage: `url(${ImagePath}classic/Classic-bg.png)` }}>
          <img className="object-cover w-30 lg:w-40 rounded-xl border-2 border-white" src={`${ImagePath}classic/Classic1.png`} />
          <div className="grid grid-cols-1 2xl:grid-cols-3 gap-1 lg:gap-3 w-full">
            <div className="col-span-2">
              <h3 className="text-2xl 2xl:text-4xl text-center lg:text-left font-bold tracking-tight text-white">Delhi UPSC Secrets</h3>
              <p className="text-lg font-normal text-center lg:text-left text-white">Daily quizzes, smart analysis.</p>
            </div>
            <div className="flex items-end-safe">
              <Button className="custom-button button button--mimas text-center w-full !p-4 !h-12 uppercase flex items-end-safe">
                <span>explore now</span>
              </Button>
            </div>
          </div>
        </a>
      </div>
    </div>
  );
};

export default Classic;
