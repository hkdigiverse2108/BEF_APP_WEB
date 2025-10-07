import { FaAward } from "react-icons/fa";
import { HiCheckBadge } from "react-icons/hi2";
import { IoMdTrophy } from "react-icons/io";
import { FormButton } from "../../Attribute/FormFields";
import { Avatar, Progress } from "antd";
import { ImagePath } from "../../Constants";

const ContestDetailCatd = () => {
  return (
    <div className="w-full h-fit bg-primary rounded-3xl overflow-hidden">
      <div className="flex flex-row  !bg-primary px-2 md:px-4  text-white relative">
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
            <Progress percent={90} showInfo={false} strokeColor={"green"} />
          </section>
          <section className="flex justify-between flex-wrap ">
            <h1>25000 Filled </h1>
            <h1 className="text-black font-semibold">50000 Spots</h1>
          </section>
        </div>
        <span className=" flex border border-gray-200 w-full my-2  "></span>
        <p className="text-xs sm:text-sm font-bold">Delhi’s proven path to UPSC success.</p>
        <span className=" flex border border-gray-200 w-full my-2  "></span>
        <div className=" py-2 ">
          <FormButton
            htmlType="submit"
            text="pay - 200.00"
            className="custom-button button button--mimas w-full !h-auto uppercase"
          />
          {/* <Button className="custom-button button button--mimas w-full !h-auto ">
                  <span className="uppercase"> </span>
                </Button> */}
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
  );
};

export default ContestDetailCatd;
