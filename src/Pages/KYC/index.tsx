import { IoMailOutline } from "react-icons/io5";
import { FormButton } from "../../Attribute/FormFields";
import { useNavigate } from "react-router-dom";
import { ImagePath, ROUTES, URL_KEYS } from "../../Constants";
import { useGetApiQuery } from "../../Api/CommonApi";
import { CardHeader } from "../../Components/Common/CardHeader";
import SpinLoader from "../../Components/Common/SpinLoader";

const KYC = () => {
  const navigate = useNavigate();

  const { data, isLoading } = useGetApiQuery({ url: `${URL_KEYS.KYC.ALL}?page=1&limit=1` });
  const KYCData = data?.data?.kyc_data[0];

  return (
    <div className="sub-container mt-4 mb-6">
      <CardHeader title="KYC" />
      <hr className="text-card-border my-4" />
      <section className="flex flex-col gap-5">
        <div className="flex flex-col xl:flex-row justify-between gap-10 items-start">
          <div className="rounded-lg overflow-hidden w-full ">
            <img src={`${ImagePath}kyc/KYC_Banner.jpg`} alt="Recharge Wallet" className="w-full h-full object-cover" />
          </div>
          <div className="flex flex-col w-full  h-full justify-center">
            <h3 className="text-2xl font-bold mb-2">HK DigiVerse LLP</h3>
            <p className=" text-gray-700 mb-6">KYC verification is mandatory for cash withdrawal to ensure authenticity and compliance with legal regulations. Any incomplete or incorrect information may Result in delays in the process.</p>
            <div className="grid grid-cols-1 gap-5">
              {/* <div className="h-full relative bg-input-box rounded-xl p-5 flex justify-between items-center gap-2">
                <div className="w-1 h-[70%] bg-primary rounded-r absolute top-1/2 left-0 -translate-y-1/2" />
                <div className="flex items-center gap-3">
                  <MdPhoneAndroid className="text-5xl text-success" />
                  <div className="text-left">
                    <p className="text-lg font-semibold mt-1 uppercase">Mobile Number</p>
                    <h3 className="text-sm font-normal text-neutral-500">{user.contact.mobile}</h3>
                  </div>
                </div>
                <p className={`text-lg font-bold mt-1 uppercase ${user.isMobileVerified ? "text-success" : "text-danger"}`}>{user.isMobileVerified ? "Verified" : "Unverified"}</p>
              </div> */}
              <div className="h-full relative bg-input-box rounded-xl p-5 flex justify-between items-center gap-2">
                <div className="w-1 h-[70%] bg-primary rounded-r absolute top-1/2 left-0 -translate-y-1/2" />
                <div className="flex items-center gap-3">
                  <IoMailOutline className="text-5xl text-success" />
                  <div className="text-left">
                    <p className="text-lg font-semibold mt-1 uppercase">KYC Verification</p>
                    <h3 className="text-sm font-normal text-neutral-500">{KYCData?.idNumber}</h3>
                  </div>
                </div>
                {isLoading ?  <SpinLoader /> : <p className={`text-lg font-semibold mt-1 uppercase ${KYCData?.status === "verified" ? "text-success" : KYCData?.status === "pending" ? "text-warning" : "text-danger"}`}>{KYCData?.status || "Unverified"}</p>}
              </div>
              {!["verified", "pending"].includes(KYCData?.status) && <FormButton onClick={() => navigate(ROUTES.KYC.KYC_REGISTER)} htmlType="button" text="Go To KYC Verification" className="custom-button button button--mimas w-full !h-auto" />}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default KYC;
