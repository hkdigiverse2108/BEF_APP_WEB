import { FaAward } from "react-icons/fa";
import { GiWallet } from "react-icons/gi";
import { HiCheckBadge } from "react-icons/hi2";
import { IoMdTrophy } from "react-icons/io";
import { PiBookOpenUserFill } from "react-icons/pi";

const referrals = Array(9).fill({
  name: "Acham Belize",
  email: "Achambeliz@Gmail.Com",
  amount: "+ ₹600",
  date: "23 Sep, 2025",
});

const MyWinning = () => {
  return (
    <>
      <div className="grid grid-cols-1 xl:grid-cols-5 gap-5">
        <div className="max-md:w-full max-lg:w-1/2 max-xl:w-1/3">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-bold">My Winning</h2>
          </div>
          <div className="w-full">
            <div className="h-full relative bg-input-box rounded-xl p-7 flex flex-col justify-center items-center gap-2">
              <div className="w-[70%] h-1 bg-primary rounded-b absolute top-0 left-1/2 -translate-x-1/2" />
              <GiWallet className="text-6xl text-success" />
              <div className="text-left">
                <p className="text-base font-bold mt-1 uppercase">Total Winning</p>
                <h3 className="text-2xl font-extrabold text-center">₹600</h3>
              </div>
            </div>
          </div>
        </div>
        <div className="col-span-1 xl:col-span-4">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-bold">Previous Contest</h2>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {referrals.map((referral, index) => (
              <div key={index} className="rounded-xl overflow-hidden shadow-sm bg-primary">
                <div className="py-3 px-5">
                  <h3 className="text-white font-extrabold text-xl">{referral.name}</h3>
                </div>
                <div className="p-4 bg-white border-x-2 rounded-t-xl border-primary">
                  <div className="flex justify-between items-center mb-3">
                    <span className="text-lg font-bold">TOTAL WIN</span>
                    <span className="text-2xl font-extrabold">{referral.amount}</span>
                  </div>
                  <div className="flex items-center gap-2 text-base font-medium border-y border-card-border py-3">
                    <PiBookOpenUserFill />
                    {referral.email}
                  </div>
                </div>
                <div className="bg-success py-4 text-white">
                  <div className=" flex items-center text-xs sm:text-sm  justify-center gap-2 sm:gap-4 md:gap-8 ">
                    <section className="flex gap-2 items-center  ">
                      <FaAward />
                      <span>{`₹100000`}</span>
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
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default MyWinning;
