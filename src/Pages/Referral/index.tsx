import { useState } from "react";
import { FaCalendarAlt, FaUsers } from "react-icons/fa";
import { IoCheckmarkDoneSharp, IoCopyOutline } from "react-icons/io5";
import { MdEmail } from "react-icons/md";
import HeroBanner from "../../Components/Home/HeroBanner";
import { Tooltip } from "antd";

const referrals = Array(9).fill({
  name: "Acham Belize",
  email: "Achambeliz@Gmail.Com",
  amount: "+ ₹600",
  date: "23 Sep, 2025",
});

const Referral = () => {
  const [copied, setCopied] = useState(false);
  const referralCode = "1234567890";

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(referralCode);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy text: ", err);
    }
  };
  return (
    <div>
      <HeroBanner />

      <div className="px-5 py-6">
        <div className="flex flex-col md:flex-row justify-between gap-6 md:items-center mb-6">
          <div className="relative pl-4">
            <div className="w-1 h-full bg-success-light rounded-full absolute left-0 top-0" />
            <h2 className="text-xl font-bold">They play, you collect</h2>
            <p className="text-sm text-gray-500 font-medium">One of your friends has joined by your referral code. Do more invitations to earn more.</p>
          </div>
          <div>
            <p className="text-base font-bold">
              Total Referral: <span className="text-primary">+ ₹600</span>
            </p>
          </div>
        </div>

        <hr className="border-gray-200 mb-6" />

        {/* Referral Cards */}
        <div>
          <div className="flex justify-between items-center mb-3">
            <h2 className="text-xl font-bold">Your Invited Referral</h2>
          </div>
          <div className="grid grid-cols-1 xl:grid-cols-5 gap-5">
            <div className="max-md:w-full max-lg:w-1/2 max-xl:w-1/3">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-lg font-bold">My Winning</h2>
              </div>
              <div className="w-full">
                <div className="h-full relative bg-input-box rounded-xl p-7 flex flex-col justify-center items-center gap-2">
                  <div className="w-[70%] h-1 bg-primary rounded-b absolute top-0 left-1/2 -translate-x-1/2" />
                  <FaUsers className="text-6xl text-success" />
                  <div className="text-left">
                    <p className="text-base font-bold mt-1 uppercase">Total Referral</p>
                    <h3 className="text-2xl font-extrabold text-center">+ ₹600</h3>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-span-1 xl:col-span-4">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-lg font-bold">Your Invited Referral</h2>
                <Tooltip title={copied ? "Copied!" : "Copy"} color={copied ? "#288F66" : "#EB8844"} placement="topRight">
                  <span onClick={handleCopy} className={`border px-3 py-1 rounded-md text-base font-bold flex items-center cursor-pointer transition ${copied ? "border-success text-success" : "hover:border-primary hover:text-primary"} `}>
                    {referralCode}
                    {copied ? <IoCheckmarkDoneSharp className="ms-3 text-success transition-transform duration-300 scale-110" /> : <IoCopyOutline className="ms-3 transition-transform duration-300 hover:scale-110" />}
                  </span>
                </Tooltip>
              </div>
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
                {referrals.map((referral, index) => (
                  <div key={index} className="rounded-xl overflow-hidden shadow-sm bg-primary">
                    <div className="py-3 px-5">
                      <h3 className="text-white font-extrabold text-xl">{referral.name}</h3>
                    </div>
                    <div className="p-4 bg-white border-x-2 rounded-t-xl border-primary">
                      <div className="flex justify-between items-center mb-3">
                        <span className="text-lg font-bold">AMOUNT</span>
                        <span className="text-2xl font-extrabold">{referral.amount}</span>
                      </div>
                      <div className="flex items-center gap-2 text-base font-medium border-y border-card-border py-3">
                        <MdEmail />
                        {referral.email}
                      </div>
                    </div>
                    <div className="bg-success text-white text-base font-semibold py-3 px-5 flex items-center gap-2">
                      <FaCalendarAlt className="text-white" />
                      <span>{referral.date}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Referral;
