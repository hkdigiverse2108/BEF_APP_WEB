import { IoMailOutline } from "react-icons/io5";
import { MdPhoneAndroid } from "react-icons/md";

const KYC = () => {
  return (
    <div className="sub-container my-6 min-h-screen">
      <section className="flex flex-col gap-5">
        <h2 className="text-2xl font-semibold">KYC</h2>
        <span className="border-b border-gray-100 w-full"></span>

        <div className="flex flex-col xl:flex-row justify-between gap-10 items-center">
          <div className="rounded-lg overflow-hidden w-full ">
            <img src={`/assets/images/kyc/KYC_Banner.png`} alt="Recharge Wallet" className="w-full h-full object-cover" />
          </div>

          <div className="flex flex-col w-full  h-full justify-center">
            <h3 className="text-2xl font-bold mb-2">Nexify Learning Solution LLP</h3>
            <p className=" text-gray-700 mb-6">KYC verification is mandatory for cash withdrawal to ensure authenticity and compliance with legal regulations. Any incomplete or incorrect information may Result in delays in the process.</p>
            <div className="grid grid-cols-1 gap-5">
              <div className="h-full relative bg-input-box rounded-xl p-5 flex justify-between items-center gap-2">
                <div className="w-1 h-[70%] bg-primary rounded-r absolute top-1/2 left-0 -translate-y-1/2" />
                <div className="flex items-center gap-3">
                  <MdPhoneAndroid className="text-5xl text-success" />
                  <div className="text-left">
                    <p className="text-lg font-bold mt-1 uppercase">Mobile Number</p>
                    <h3 className="text-sm font-semibold text-neutral-500">1234567890</h3>
                  </div>
                </div>
                <p className="text-lg font-bold mt-1 uppercase text-success">Verified</p>
              </div>
              <div className="h-full relative bg-input-box rounded-xl p-5 flex justify-between items-center gap-2">
                <div className="w-1 h-[70%] bg-primary rounded-r absolute top-1/2 left-0 -translate-y-1/2" />
                <div className="flex items-center gap-3">
                  <IoMailOutline className="text-5xl text-success" />
                  <div className="text-left">
                    <p className="text-lg font-bold mt-1 uppercase">KYC Verification</p>
                    <h3 className="text-sm font-semibold text-neutral-500">1234567890</h3>
                  </div>
                </div>
                <p className="text-lg font-bold mt-1 uppercase text-success">Verified</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default KYC;
