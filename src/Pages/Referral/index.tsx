import { Skeleton, Tooltip } from "antd";
import { useState } from "react";
import { FaCalendarAlt, FaUsers } from "react-icons/fa";
import { IoCheckmarkDoneSharp, IoCopyOutline } from "react-icons/io5";
import { MdEmail } from "react-icons/md";
import { Autoplay, EffectFade, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import { useGetApiQuery } from "../../Api/CommonApi";
import { FormButton } from "../../Attribute/FormFields";
import ShareModal from "../../Components/Common/ShareModal";
import { ImagePath, URL_KEYS } from "../../Constants";
import { useAppSelector } from "../../Store/hooks";
import type { ReferralApiResponse } from "../../Types";
import { SecondFormatDate } from "../../Utils";

const Referral = () => {
  const [copied, setCopied] = useState(false);
  const [tabOneLimit, setTabOneLimit] = useState(0);
  const { user } = useAppSelector((state) => state.auth);

  const { data, isLoading } = useGetApiQuery<ReferralApiResponse>({ url: URL_KEYS.USER.REFERRAL });
  const referralsData = data?.data?.data;
  const totalAmountReferrals = data?.data?.totalAmount || 0;

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(user.referralCode);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy text: ", err);
    }
  };

  return (
    <div className="sub-container">
      <div className="mb-8 overflow-hidden rounded-xl border border-border bg-card shadow-box-shadow">
        <Swiper modules={[Pagination, Autoplay, EffectFade]} spaceBetween={50} slidesPerView={1} loop={true} effect={"fade"} autoplay={{ delay: 10000 }} pagination={{ clickable: true }}>
          <SwiperSlide>
            <img src={`${ImagePath}referral/Referral.jpg`} alt="banner" className="w-full overflow-hidden object-cover" />
          </SwiperSlide>
        </Swiper>
      </div>
      <div className="pt-2 sm:pt-4">
        <div className="flex flex-col sm:flex-row justify-between gap-4 sm:items-center mb-6">
          <div className="flex items-start gap-3">
            <span className="bef-section-bar shrink-0" />
            <div>
              <h2 className="font-heading text-base sm:text-xl font-bold text-foreground">They play, you collect</h2>
              <p className="mt-1 text-xs sm:text-sm text-muted-foreground">One of your friends has joined by your referral code. Do more invitations to earn more.</p>
            </div>
          </div>
          <div className="shrink-0">
            <p className="rounded-full bg-secondary px-3 py-1.5 text-sm font-bold text-primary whitespace-nowrap">
              Total Referral: <span>+ ₹{totalAmountReferrals}</span>
            </p>
          </div>
        </div>

        <div className="border-t border-border mb-6" />

        {/* Referral Cards */}
        <div>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-5">
            <div className="w-full">
              <div className="flex justify-between items-center mb-4">
                <h2 className="font-heading text-base sm:text-lg font-bold text-foreground">My Winning</h2>
              </div>
              <div className="bef-card w-full">
                <div className="bef-card-strip" />
                <div className="p-6 sm:p-7 flex flex-col justify-center items-center gap-2 text-center">
                  <span className="flex h-14 w-14 items-center justify-center rounded-xl bg-secondary">
                    <FaUsers className="text-3xl text-primary" />
                  </span>
                  <p className="text-xs font-bold tracking-wide text-muted-foreground mt-3 uppercase">Total Referral</p>
                  <h3 className="font-heading text-4xl font-bold text-primary">+ ₹{totalAmountReferrals}</h3>
                </div>
              </div>
            </div>
            <div className="lg:col-span-2">
              <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-3 mb-4">
                <h2 className="font-heading text-base sm:text-lg font-bold text-foreground">Your Invited Referral</h2>
                <div className="flex items-center gap-2">
                  <Tooltip title={copied ? "Copied!" : "Copy"} color={copied ? "#F68122" : "#114598"} placement="topRight">
                    <span onClick={handleCopy} className={`rounded-xl border bg-card px-3 py-2 min-h-11 text-sm font-bold flex items-center cursor-pointer transition-all duration-300 ${copied ? "border-accent text-accent" : "border-border hover:border-accent hover:text-accent"} `}>
                      <span className="font-mono">{user.referralCode}</span>
                      {copied ? <IoCheckmarkDoneSharp className="ms-3 text-accent transition-transform duration-300 scale-110" /> : <IoCopyOutline className="ms-3 transition-transform duration-300 hover:scale-110" />}
                    </span>
                  </Tooltip>
                  <ShareModal referralCode={user.referralCode} />
                </div>
              </div>
              <div className="grid sm:grid-cols-2 gap-4 sm:gap-5">
                {isLoading
                  ? [...Array(3)]?.map((_, i) => <Skeleton.Node key={i} active style={{ width: "100%", height: 200, borderRadius: 12 }} />)
                  : referralsData?.map((referral, index) => (
                      <div key={index} className="bef-card overflow-hidden">
                        <div className="py-3 px-5 bg-gradient-to-r from-primary to-tertiary">
                          <h3 className="text-white font-heading font-bold text-base sm:text-lg truncate">
                            {referral?.firstName} {referral?.lastName}
                          </h3>
                        </div>
                        <div className="p-4 bg-card">
                          <div className="flex justify-between items-center mb-3">
                            <span className="text-xs font-bold tracking-wide text-muted-foreground uppercase">Amount</span>
                            <span className="font-heading text-2xl font-bold text-primary">+ ₹{referral?.amount}</span>
                          </div>
                          <div className="flex items-center gap-2 text-sm font-medium text-muted-foreground border-y border-border py-3 truncate">
                            <MdEmail className="shrink-0 text-primary" />
                            <span className="truncate">{referral?.email}</span>
                          </div>
                        </div>
                        <div className="text-muted-foreground text-xs font-semibold py-3 px-5 flex items-center gap-2 border-t border-border">
                          <FaCalendarAlt className="text-primary shrink-0" />
                          <span>{SecondFormatDate(referral?.createdAt)}</span>
                        </div>
                      </div>
                    ))}
              </div>
              {(referralsData?.length || 0) < tabOneLimit && (
                <div className="w-full flex justify-center pt-5">
                  <FormButton text="View More" className="bef-btn-primary text-center w-fit uppercase" onClick={() => setTabOneLimit(tabOneLimit + 6)} />
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Referral;
