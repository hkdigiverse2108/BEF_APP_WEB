import { BsFillAlarmFill } from "react-icons/bs";
import { CardHeader } from "../../Components/Common/CardHeader";
import { Avatar, Button, Progress, Tabs } from "antd";
import { ImagePath, ROUTES } from "../../Constants";
import { FaAward } from "react-icons/fa";
import { IoMdTrophy } from "react-icons/io";
import { HiCheckBadge } from "react-icons/hi2";

const prizeData = [
  {
    rank: (
      <img
        src="/assets/images/contest/Contest-Trophy.png"
        className="w-8 h-8"
      />
    ),
    amount: "₹5,00,000",
  },
  {
    rank: (
      <img
        src="/assets/images/contest/Contest-Trophy.png"
        className="w-8 h-8"
      />
    ),
    amount: "₹2,50,000",
  },
  {
    rank: (
      <img
        src="/assets/images/contest/Contest-Trophy.png"
        className="w-8 h-8"
      />
    ),
    amount: "₹1,00,000",
  },
  { rank: "#4-10", amount: "₹25,000" },
  { rank: "#11-20", amount: "₹25,000" },
  { rank: "#21-55", amount: "₹25,000" },
  { rank: "#56-90", amount: "₹25,000" },
  { rank: "#91-130", amount: "₹25,000" },
  { rank: "#131-170", amount: "₹25,000" },
  { rank: "#21-55", amount: "₹25,000" },
  { rank: "#56-90", amount: "₹25,000" },
  { rank: "#91-130", amount: "₹25,000" },
  { rank: "#131-170", amount: "₹25,000" },
  { rank: "#21-55", amount: "₹25,000" },
  { rank: "#56-90", amount: "₹25,000" },
  { rank: "#91-130", amount: "₹25,000" },
  { rank: "#131-170", amount: "₹25,000" },
];

const ContestDetails = () => {
  const onChange = (key: string) => {
    // console.log(key);
  };

  const Winning = () => {
    return (
      <div className="bg-input-box border border-gray-200 p-4 rounded-2xl">
        <div className="w-full  mx-auto  rounded-2xl overflow-hidden border border-gray-200">
          {/* Header */}
          <div className="relative  bg-primary text-white font-semibold flex justify-between px-6 py-3">
            <span>Ranks</span>
            <span>Winners</span>

            <div className="absolute inset-0 w-full h-full">
              <img
                src="/assets/images/contest/Contest-Bg-2.png"
                alt=""
                className="w-full h-full object-cover   -center"
              />
            </div>
          </div>

          {/* Rows */}
          <div className="divide-y max-h-[26rem] overflow-auto divide-gray-200 bg-white">
            {prizeData.map((item, index) => (
              <div
                key={index}
                className="flex justify-between px-6 py-3 text-gray-700 hover:bg-orange-50 transition font-bold "
              >
                <span>{item.rank}</span>
                <span>{item.amount}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="sub-container">
      <div className="my-12 flex flex-col gap-6">
        <CardHeader
          title="Mega Contest"
          icon={<BsFillAlarmFill />}
          time="25 Min 10s Left"
          backButton={ROUTES.CONTEST.CONTEST}
        />

        <div className="flex flex-col lg:flex-row gap-4">
          <div className="w-full h-fit bg-primary rounded-3xl overflow-hidden">
            <div className="flex flex-row  !bg-primary px-2 md:px-4 py-2 text-white relative">
              <div className="flex flex-row max-sm:flex-col items-center  gap-4 max-sm:gap-0 w-full h-full p-3   ">
                <div className="grid gap-1 w-full  ">
                  <h3 className=" text-lg max-sm:text-center text-left font-bold tracking-tight ">
                    Mega Contest
                  </h3>
                  <p className=" max-sm:text-center text-left ">
                    Delhi's Proven Path to UPSC Success.
                  </p>
                </div>
              </div>

              <section className="hidden sm:flex gap-1 w-full justify-end me-3 md:me-6  items-center ">
                <Avatar.Group
                  size={50}
                  max={{
                    count: 3,
                  }}
                >
                  <Avatar
                    src="https://api.dicebear.com/7.x/miniavs/svg?seed=1"
                    className="!object-cover  max-sm:!w-15 !rounded-full !border-2 !border-white "
                  />

                  <Avatar
                    className="!object-cover  max-sm:!w-15 !rounded-full !border-2 !border-white "
                    style={{ backgroundColor: "#f56a00" }}
                  >
                    K
                  </Avatar>

                  <Avatar
                    style={{ backgroundColor: "#1677ff" }}
                    icon={`${ImagePath}/Contest/ContestIcon.png`}
                    className="!object-cover  max-sm:!w-15 !rounded-full !border-2 !border-white "
                  />
                  {/* {item.assignedUsers.map((user, i) => (
                    <Tooltip key={i} title={user.fullName}>
                      <Avatar
                        src={user.profilePhoto}
                        alt={user.fullName}
                        className="border border-white"
                      >
                        {user.fullName?.charAt(0) || "U"}
                      </Avatar>
                    </Tooltip>
                  ))} */}
                </Avatar.Group>
              </section>

              <div className="absolute overflow-hidden top-0 right-0  ">
                <img src="/assets/images/contest/Contest-Bg.png" alt="" />
              </div>
            </div>

            <div className="px-4 py-2 bg-white rounded-t-3xl mx-0.5">
              <div className=" py-2 flex flex-col gap-2">
                <section className="flex justify-between text-sm md:text-lg lg:text-xl font-bold flex-wrap ">
                  <h1 className="uppercase">Prize Pool</h1>
                  <p>₹7,50,000.00</p>
                </section>
                <section>
                  <Progress
                    percent={90}
                    showInfo={false}
                    strokeColor={"green"}
                  />
                </section>
                <section className="flex justify-between flex-wrap ">
                  <h1>25000 Filled </h1>
                  <h1 className="text-black font-semibold">50000 Spots</h1>
                </section>
              </div>
              <span className=" flex border border-gray-200 w-full my-2  "></span>
              <div className=" py-2 ">
                <Button className="custom-button button button--mimas w-full !h-auto">
                  <span className="uppercase">pay - 200.00 </span>
                </Button>
              </div>
            </div>

            <div className="bg-success py-5 text-white `">
              <div className=" flex items-center text-xs sm:text-sm md:text-lg justify-center gap-2 sm:gap-4 md:gap-8 ">
                <section className="flex gap-2 items-center  ">
                  <FaAward />
                  <span>$1,00,000</span>
                </section>
                <span className="h-3 border border-l  border-gray-300  "></span>
                <section className="flex gap-2 items-center ">
                  <IoMdTrophy />
                  <span>30%</span>
                </section>
                <span className="h-3 border border-l  border-gray-300  "></span>
                <section className="flex gap-2 items-center ">
                  <HiCheckBadge />
                  <span>Flexible</span>
                </section>
              </div>
            </div>
          </div>
          <div className="w-full mt-8 lg:mt-0 ContestDetailsTab">
            <Tabs
              onChange={onChange}
              type="card"
              items={[
                {
                  key: "winning",
                  label: "Winning",
                  children: (
                    <>
                      <Winning />
                    </>
                  ),
                },
                {
                  key: "current-price-pool",
                  label: (
                    <>
                      <span className=" hidden sm:flex ">
                        Current Price Pool
                      </span>
                      <span className="flex sm:hidden "> Price Pool </span>
                    </>
                  ),
                  children: (
                    <>
                      <h1>2</h1>
                      <>
                        <Winning />
                      </>
                    </>
                  ),
                },
              ]}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContestDetails;
