import { Button, Progress, Tabs } from "antd";
import { BsFillAlarmFill } from "react-icons/bs";
import { ImagePath } from "../../Constants";
import { FormButton } from "../../Attribute/FormFields";

const Contest = () => {
  return (
    <div className="mx-4 md:mx-12">
      <div className=" flex justify-center mt-12">
        <Tabs
          // onChange={onChange}
          type="card"
          items={[
            {
              key: "Contest",
              label: "Contests",
              children: <></>,
            },
            {
              key: "My-Contest",
              label: "My Contest",
              children: <></>,
            },
          ]}
        />
      </div>
      <div className="flex flex-col gap-6">
        <div className="flex justify-between text-sm md:text-lg font-semibold items-center flex-wrap gap-2">
          <h1>GK Showdown</h1>
          <section className="flex gap-1">
            <span className="text-primary">
              <BsFillAlarmFill />
            </span>
            <span className="text-xs md:text-sm font-semibold ">
              25 Min 10s Left
            </span>
          </section>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
          <div className="border-1 border-primary rounded-xl overflow-hidden">
            <div className="flex flex-col lg:flex-row !bg-primary px-2 md:px-4 py-2  text-white">
              <a
                href="#"
                className="flex flex-row max-sm:flex-col items-center  gap-4 max-sm:gap-0 w-full h-full p-3  "
              >
                <img
                  className="object-cover  max-sm:w-15 rounded-full border-2 border-white "
                  src={`${ImagePath}/Contest/ContestIcon.png`}
                />

                <div className="grid gap-1 w-full ">
                  <h3 className="text-lg max-sm:text-center text-left font-medium tracking-tight ">
                    Modern History
                  </h3>
                  <p className=" font-normal max-sm:text-center text-left ">
                    Explore events from 18th century to independence.
                  </p>
                </div>
              </a>

              <section className="flex gap-1 w-full lg:w-1/4 justify-end lg:justify-center items-center text-nowrap ">
                <span className="text-primary-light ">
                  <BsFillAlarmFill />
                </span>
                <span>9:00 AM</span>
              </section>
            </div>
            <div className="px-2 md:px-4 py-2 ">
              <div className=" py-2 flex flex-col gap-2">
                <section className="flex justify-between text-sm md:text-lg lg:text-xl font-bold ">
                  <h1 className="uppercase">Prize Pool</h1>
                  <p>$1 Crore</p>
                </section>
                <section>
                  <Progress
                    percent={90}
                    showInfo={false}
                    strokeColor={"green"}
                  />
                </section>
                <section className="flex justify-between  ">
                  <h1>434 Left </h1>
                  <h1 className="text-black font-semibold">1,500 Spots</h1>
                </section>
              </div>
              <span className=" flex border border-gray-200 w-full my-2  "></span>
              <div className=" py-2 ">
                <Button className="custom-button button button--mimas w-full !h-auto">
                  <span className="uppercase">pay - 200.00 </span>
                </Button>
              </div>
            </div>
          </div>

          <div className="border-1 border-primary rounded-xl overflow-hidden">
            <div className="flex flex-col lg:flex-row !bg-primary px-2 md:px-4 py-2  text-white">
              <a
                href="#"
                className="flex flex-row max-sm:flex-col items-center  gap-4 max-sm:gap-0 w-full h-full p-3  "
              >
                <img
                  className="object-cover  max-sm:w-15 rounded-full border-2 border-white "
                  src={`${ImagePath}/Contest/ContestIcon.png`}
                />

                <div className="grid gap-1 w-full ">
                  <h3 className="text-lg max-sm:text-center text-left font-medium tracking-tight ">
                    Modern History
                  </h3>
                  <p className=" font-normal max-sm:text-center text-left ">
                    Explore events from 18th century to independence.
                  </p>
                </div>
              </a>

              <section className="flex gap-1 w-full lg:w-1/4 justify-end lg:justify-center items-center text-nowrap ">
                <span className="text-primary-light ">
                  <BsFillAlarmFill />
                </span>
                <span>9:00 AM</span>
              </section>
            </div>
            <div className="px-2 md:px-4 py-2 ">
              <div className=" py-2 flex flex-col gap-2">
                <section className="flex justify-between text-sm md:text-lg lg:text-xl font-bold ">
                  <h1 className="uppercase">Prize Pool</h1>
                  <p>$1 Crore</p>
                </section>
                <section>
                  <Progress
                    percent={90}
                    showInfo={false}
                    strokeColor={"green"}
                  />
                </section>
                <section className="flex justify-between  ">
                  <h1>434 Left </h1>
                  <h1 className="text-black font-semibold">1,500 Spots</h1>
                </section>
              </div>
              <span className=" flex border border-gray-200 w-full my-2  "></span>
              <div className=" py-2 ">
                <Button className="custom-button button button--mimas w-full !h-auto">
                  <span className="uppercase">pay - 200.00 </span>
                </Button>
              </div>
            </div>
          </div>

          <div className="border-1 border-primary rounded-xl overflow-hidden">
            <div className="flex flex-col lg:flex-row !bg-primary px-2 md:px-4 py-2  text-white">
              <a
                href="#"
                className="flex flex-row max-sm:flex-col items-center  gap-4 max-sm:gap-0 w-full h-full p-3  "
              >
                <img
                  className="object-cover  max-sm:w-15 rounded-full border-2 border-white "
                  src={`${ImagePath}/Contest/ContestIcon.png`}
                />

                <div className="grid gap-1 w-full ">
                  <h3 className="text-lg max-sm:text-center text-left font-medium tracking-tight ">
                    Modern History
                  </h3>
                  <p className=" font-normal max-sm:text-center text-left ">
                    Explore events from 18th century to independence.
                  </p>
                </div>
              </a>

              <section className="flex gap-1 w-full lg:w-1/4 justify-end lg:justify-center items-center text-nowrap ">
                <span className="text-primary-light ">
                  <BsFillAlarmFill />
                </span>
                <span>9:00 AM</span>
              </section>
            </div>
            <div className="px-2 md:px-4 py-2 ">
              <div className=" py-2 flex flex-col gap-2">
                <section className="flex justify-between text-sm md:text-lg lg:text-xl font-bold ">
                  <h1 className="uppercase">Prize Pool</h1>
                  <p>$1 Crore</p>
                </section>
                <section>
                  <Progress
                    percent={90}
                    showInfo={false}
                    strokeColor={"green"}
                  />
                </section>
                <section className="flex justify-between  ">
                  <h1>434 Left </h1>
                  <h1 className="text-black font-semibold">1,500 Spots</h1>
                </section>
              </div>
              <span className=" flex border border-gray-200 w-full my-2  "></span>
              <div className=" py-2 ">
                <Button className="custom-button button button--mimas w-full !h-auto">
                  <span className="uppercase">pay - 200.00 </span>
                </Button>
              </div>
            </div>
          </div>
        </div>

        <div className="w-full flex justify-center">
          <FormButton
            text="View More"
            className="custom-button button button--mimas text-center w-fit !p-4 !px-8 !h-12 uppercase flex items-end-safe"
            onClick={() => console.log("view More")}
          />
        </div>
      </div>
    </div>
  );
};

export default Contest;
