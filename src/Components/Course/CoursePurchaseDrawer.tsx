import { Drawer } from "antd";
import { useAppDispatch, useAppSelector } from "../../Store/hooks";
import { EARNING_TYPE, HTTP_STATUS, ImagePath, PAYMENT_STATUS, STORAGE_KEYS, TRANSACTION_STATUS, TRANSACTION_TYPE, URL_KEYS } from "../../Constants";
import { setCoursePurchaseDrawer } from "../../Store/Slices/DrawerSlice";
import { BiSolidOffer } from "react-icons/bi";
import { useState, type FC } from "react";
import type { PaymentStatusType, PurchaseData, RazorpayResponse } from "../../Types";
import PaymentModal from "../Common/PaymentModal";
import CouponCodeCheck from "../WorkshopCourseCommon/CouponCodeCheck";
import { Storage } from "../../Utils";
import { useGetApiQuery, usePostApiMutation } from "../../Api/CommonApi";
import { AntMessage } from "../Common/AntMessage";
import { FormButton } from "../../Attribute/FormFields";

interface PurchaseDrawerProps {
  data: PurchaseData;
  refetch: () => void;
}

const CoursePurchaseDrawer: FC<PurchaseDrawerProps> = ({ data, refetch }) => {
  const [isRefferApplyed, setIsRefferApplyed] = useState(false);
  const [refferCode, setRefferCode] = useState("");
  const [isRefferLoading, setIsRefferLoading] = useState(false);

  const [PostApi, { isLoading: isCoursePurchaseLoading }] = usePostApiMutation();

  const { data: settingData } = useGetApiQuery({ url: URL_KEYS.SETTINGS.ALL });
  const isRazorpay = settingData?.data?.isRazorpay;

  const dispatch = useAppDispatch();
  const { isCoursePurchaseDrawer } = useAppSelector((state) => state.drawer);

  const userFromLs = JSON.parse(Storage.getItem(STORAGE_KEYS?.USER) || "");
  const { firstName, lastName, email, contact, city } = userFromLs;
  const { mobile } = contact;
  const fullName = `${firstName} ${lastName}`;

  const id = data?.id || "";
  const price = data?.price?.price || 0;
  const payingPrice = data?.price?.payingPrice || 0;
  let discountPrice = data?.price?.discountPrice || 0;

  const isDiscountPrice = !!data?.price?.discountPrice;
  discountPrice = discountPrice === 0 ? price : discountPrice;

  const amountToPay = isRefferApplyed ? Number(payingPrice) : Number(price);

  const handlePaymentComplete = async (status: PaymentStatusType, response: RazorpayResponse) => {
    try {
      const payload = {
        paymentId: response.razorpay_payment_id,
        courseId: id,
        amount: amountToPay,
        referralCode: refferCode,
        name: fullName,
        phone: mobile,
        status: status,
        email,
        city,
      };

      const res = await PostApi({
        url: URL_KEYS.COURSE.PURCHASE_ADD,
        data: payload,
      }).unwrap();
      if (res?.status === HTTP_STATUS.OK) {
        refetch();
        if (status === PAYMENT_STATUS.COMPLETED) {
          dispatch(setCoursePurchaseDrawer());
          AntMessage("success", "Enrollment completed. You’re now registered for this course.");
        } else {
          AntMessage("error", "Something went wrong while enrolling. Please try again shortly.");
        }
        const transactionPayload = {
          courseId: id,
          amount: amountToPay,
          totalAmount: amountToPay,
          tdsAmount: amountToPay,
          title: data?.title,
          transactionStatus: res?.data?.status === PAYMENT_STATUS.COMPLETED ? TRANSACTION_STATUS.SUCCESS : TRANSACTION_STATUS.FAILED,
          transactionType: TRANSACTION_TYPE.DEPOSIT,
          earningType: EARNING_TYPE.COURSE,
        };

        await PostApi({
          url: URL_KEYS.TRANSACTION.ADD,
          data: transactionPayload,
        }).unwrap();
      }
    } catch (error) {
      AntMessage("error", "Oops! We couldn’t process your enrollment. Please try again.");
    }
  };

    const handleStartPayment = async () => {
      try {
        const payload = {
          courseId: id,
          amount: amountToPay,
          referralCode: refferCode,
          name: fullName,
          phone: mobile,
          email,
          city,
        };
  
        const purchased = await PostApi({
          url: URL_KEYS.COURSE.PURCHASE_ADD,
          data: payload,
        }).unwrap();
  
        const purchaseId = purchased?.data?._id;
  
        const res = await PostApi({
          url: URL_KEYS.PHONEPE_ORDER.ADD,
          data: {
            amount: amountToPay,
            orderId: purchaseId,
            redirectUrl: window.location.href,
          },
        }).unwrap();
        const paymentUrl = res?.data?.paymentUrl;
  
        if (paymentUrl) {
          window.location.href = paymentUrl;
        } else {
          throw console.error("Payment URL not found");
        }
      } catch (error) {
        AntMessage("error", "Oops! We couldn’t process your enrollment. Please try again.");
      }
    };

  return (
    <>
      <Drawer placement="right" size="large" onClose={() => dispatch(setCoursePurchaseDrawer())} open={isCoursePurchaseDrawer} className="p-0! purchase-Drawer">
        <div className="flex flex-col items-center justify-center min-h-full">
          <div
            className="max-w-140 rounded-lg overflow-hidden shadow-2xl bg-cover bg-top space-y-4 p-3 sm:p-6 "
            style={{
              backgroundImage: `url(${ImagePath}confirmation/Confirmation-bg.png)`,
            }}
          >
            {/* Header */}
            <div className="text-white pb-0!">
              <h2 className="text-2xl font-normal text-center">
                {/* UPSC CSE - GS - Subscription */}
                {data?.title}
              </h2>
              <p className="mt-2 text-white text-xl font-semibold">{data?.modulesData && "Module Name"}</p>
              <div className="">
                <ul className=" bg-white/20 py-3 px-3 w-full rounded-sm backdrop-blur-md  text-sm  grid grid-cols-1  sm:grid-cols-2 sm:flex-row gap-2 sm:gap-4">
                  {data?.modulesData?.map((module: { name: string }, i: number) => (
                    <li key={i}>
                      {i + 1}. {module.name}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            <span className="border-b border-white/50 flex" />
            {/* Body */}
            <div className="space-y-4">
              <section className="sm:bg-white rounded-lg sm:p-3 space-y-1  ">
                <div className="flex gap-3 items-center w-full ">
                  <span className="max-sm:hidden">
                    <BiSolidOffer className="text-2xl text-success " />
                  </span>
                  <CouponCodeCheck setIsRefferLoading={setIsRefferLoading} price={price} isRefferApplyed={isRefferApplyed} setIsRefferApplyed={setIsRefferApplyed} refferCode={refferCode} setRefferCode={setRefferCode} />
                </div>
              </section>
              {isRefferApplyed && data?.priceInStruction && (
                <section className="bg-white rounded-lg p-3 space-y-1 ">
                  <div className="flex gap-2">
                    <span>
                      <BiSolidOffer className="text-2xl text-primary " />
                    </span>
                    <p className="font-semibold text-lg">Offer applied</p>
                  </div>
                  <div>
                    <p className="text-gray-700 max-sm:text-xs font-medium ">
                      {/* Pay just enrollment fee — Remaining after prelims cleared. */}
                      {data?.priceInStruction}
                    </p>
                  </div>
                </section>
              )}
            </div>
            {/* Footer */}
            <div className="space-y-4">
              <section className="bg-white rounded-lg p-3 space-y-3">
                <div className="flex justify-between gap-3">
                  <p className="font-semibold">Enrollment Fee</p>
                  <p className="font-semibold text-lg ">{isRefferApplyed ? payingPrice : price}</p>
                </div>
                <span className="border-b border-primary flex" />
                <div className="flex justify-between gap-3">
                  <p className="font-semibold">Total (Incl. off all taxes)</p>
                  <div className="space-x-0.5">
                    {isRefferApplyed ? (
                      <>
                        {isDiscountPrice ? (
                          <>
                            <span className="font-bold text-xl text-success">₹{payingPrice}/</span>
                            <span className="font-semibold text-md text-gray-600">{discountPrice}</span>
                            <span className="font-semibold text-md line-through text-red-500 ">{price}</span>
                          </>
                        ) : (
                          <h1 className="flex gap-0.5 items-end">
                            <span className="font-bold text-xl text-success">₹{payingPrice}</span>
                            <span className="font-semibold text-lg text-red-500 ">{price}</span>
                          </h1>
                        )}
                      </>
                    ) : (
                      <p className="font-bold text-xl text-success">{price}</p>
                    )}
                  </div>
                </div>
              </section>
              <div>
                {isRazorpay ?
                <PaymentModal btnText="Enroll Now" isLoading={isRefferLoading || isCoursePurchaseLoading} amount={amountToPay} onPaymentComplete={handlePaymentComplete} />
                :
                <FormButton onClick={handleStartPayment} loading={isRefferLoading || isCoursePurchaseLoading} text="Enroll Now" className="custom-button button button--mimas text-center w-full! p-4! h-12! uppercase flex items-end-safe" />
                }
              </div>
            </div>
          </div>
          {/* )} */}
        </div>
      </Drawer>
    </>
  );
};

export default CoursePurchaseDrawer;
