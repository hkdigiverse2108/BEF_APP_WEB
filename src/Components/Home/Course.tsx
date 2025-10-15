import { BsFillAlarmFill } from "react-icons/bs";
import { FormButton } from "../../Attribute/FormFields";
import { ImagePath } from "../../Constants";
import { TbPhoneCall } from "react-icons/tb";

const Course = () => {
  return (
    <div className="p-5">
      <div className="flex justify-between items-center pb-5">
        <p className="text-lg font-bold">Your Course</p>
        <p className="text-base font-semibold bg-primary m-0 py-1 px-3 rounded-lg text-white">View All</p>
      </div>
      <div className="grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        <div className="w-full h-fit bg-input-box-dark rounded-2xl overflow-hidden cursXor-pointer shadow-md">
          <div className="flex flex-row !bg-input-box-dark md:px-2 relative overflow-hidden">
            <div className="flex flex-row max-sm:flex-col items-center gap-4 max-sm:gap-0 w-full h-full p-5 z-10">
              <h3 className="text-sm max-sm:text-center font-bold capitalize bg-input-box w-fit py-1 px-3 rounded-lg flex items-center">
                <BsFillAlarmFill className="me-2" /> Starts Today
              </h3>
            </div>
            <div className="absolute overflow-hidden top-0 right-0 z-0">
              <img src={`${ImagePath}contest/Contest-Bg-3.png`} alt="" className="w-[100%] h-[100%]"/>
            </div>
          </div>

          <div className="px-4 py-5 bg-input-box rounded-t-xl mx-0.5 flex flex-col gap-7 mb-0.5 !z-10">
            <div className="flex flex-col gap-2">
              <p className="text-sm md:text-xl font-bold capitalize">AAGAZ 2027: UPSC FOUNDATION BATCH</p>
              <section className="flex flex-wrap gap-3">
                <span className="bg-input-box-dark font-bold text-sm p-1 px-3 rounded">हिंGLISH</span>
                <span className="bg-input-box-dark font-bold text-sm p-1 px-3 rounded">FULL SYLLABUS</span>
              </section>
            </div>
            <FormButton htmlType="submit" text="View Batch Details" onClick={(e) => e.stopPropagation()} className="custom-button light button button--mimas w-full !h-auto uppercase" />
          </div>

          <div className="bg-input-box p-4">
            <div className="flex items-center text-xs sm:text-sm justify-between gap-2 sm:gap-4 md:gap-8">
              <span className="font-bold text-lg">Have questions about this batch?</span>
              <span className="bg-input-box-dark font-bold text-sm p-1 px-3 rounded capitalize flex items-center">
                <TbPhoneCall className="me-2 text-lg text-success" />
                Talk to a counsellor
              </span>
            </div>
          </div>
        </div>
        <div className="w-full h-fit bg-input-box-dark rounded-2xl overflow-hidden cursXor-pointer shadow-md">
          <div className="flex flex-row !bg-input-box-dark md:px-2 relative overflow-hidden">
            <div className="flex flex-row max-sm:flex-col items-center gap-4 max-sm:gap-0 w-full h-full p-5 z-10">
              <h3 className="text-sm max-sm:text-center font-bold capitalize bg-input-box w-fit py-1 px-3 rounded-lg flex items-center">
                <BsFillAlarmFill className="me-2" /> Starts Today
              </h3>
            </div>
            <div className="absolute overflow-hidden top-0 right-0 z-0">
              <img src={`${ImagePath}contest/Contest-Bg-3.png`} alt="" className="w-[100%] h-[100%]"/>
            </div>
          </div>

          <div className="px-4 py-5 bg-input-box rounded-t-xl mx-0.5 flex flex-col gap-7 mb-0.5 !z-10">
            <div className="flex flex-col gap-2">
              <p className="text-sm md:text-xl font-bold capitalize">AAGAZ 2027: UPSC FOUNDATION BATCH</p>
              <section className="flex flex-wrap gap-3">
                <span className="bg-input-box-dark font-bold text-sm p-1 px-3 rounded">हिंGLISH</span>
                <span className="bg-input-box-dark font-bold text-sm p-1 px-3 rounded">FULL SYLLABUS</span>
              </section>
            </div>
            <FormButton htmlType="submit" text="View Batch Details" onClick={(e) => e.stopPropagation()} className="custom-button light button button--mimas w-full !h-auto uppercase" />
          </div>

          <div className="bg-input-box p-4">
            <div className="flex items-center text-xs sm:text-sm justify-between gap-2 sm:gap-4 md:gap-8">
              <span className="font-bold text-lg">Have questions about this batch?</span>
              <span className="bg-input-box-dark font-bold text-sm p-1 px-3 rounded capitalize flex items-center">
                <TbPhoneCall className="me-2 text-lg text-success" />
                Talk to a counsellor
              </span>
            </div>
          </div>
        </div>
        <div className="w-full h-fit bg-input-box-dark rounded-2xl overflow-hidden cursXor-pointer shadow-md">
          <div className="flex flex-row !bg-input-box-dark md:px-2 relative overflow-hidden">
            <div className="flex flex-row max-sm:flex-col items-center gap-4 max-sm:gap-0 w-full h-full p-5 z-10">
              <h3 className="text-sm max-sm:text-center font-bold capitalize bg-input-box w-fit py-1 px-3 rounded-lg flex items-center">
                <BsFillAlarmFill className="me-2" /> Starts Today
              </h3>
            </div>
            <div className="absolute overflow-hidden top-0 right-0 z-0">
              <img src={`${ImagePath}contest/Contest-Bg-3.png`} alt="" className="w-[100%] h-[100%]"/>
            </div>
          </div>

          <div className="px-4 py-5 bg-input-box rounded-t-xl mx-0.5 flex flex-col gap-7 mb-0.5 !z-10">
            <div className="flex flex-col gap-2">
              <p className="text-sm md:text-xl font-bold capitalize">AAGAZ 2027: UPSC FOUNDATION BATCH</p>
              <section className="flex flex-wrap gap-3">
                <span className="bg-input-box-dark font-bold text-sm p-1 px-3 rounded">हिंGLISH</span>
                <span className="bg-input-box-dark font-bold text-sm p-1 px-3 rounded">FULL SYLLABUS</span>
              </section>
            </div>
            <FormButton htmlType="submit" text="View Batch Details" onClick={(e) => e.stopPropagation()} className="custom-button light button button--mimas w-full !h-auto uppercase" />
          </div>

          <div className="bg-input-box p-4">
            <div className="flex items-center text-xs sm:text-sm justify-between gap-2 sm:gap-4 md:gap-8">
              <span className="font-bold text-lg">Have questions about this batch?</span>
              <span className="bg-input-box-dark font-bold text-sm p-1 px-3 rounded capitalize flex items-center">
                <TbPhoneCall className="me-2 text-lg text-success" />
                Talk to a counsellor
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Course;
