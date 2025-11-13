import { Drawer } from "antd";
import { useAppDispatch, useAppSelector } from "../../Store/hooks";
import { ImagePath, STORAGE_KEYS, URL_KEYS } from "../../Constants";
import { FormButton } from "../../Attribute/FormFields";
import { setPurchaseDrawer } from "../../Store/Slices/DrawerSlice";
import { BiSolidOffer } from "react-icons/bi";
import { useState, type FC } from "react";
import type { PurchaseData, RazorpayResponse } from "../../Types";
import PaymentModal from "../Common/PaymentModal";
import CouponCodeCheck from "./CouponCodeCheck";
import { Storage } from "../../Utils";
import { usePostApiMutation } from "../../Api/CommonApi";

type PaymentStatus = "COMPLETED" | "FAILED";

interface PurchaseDrawerProps {
  data: PurchaseData;
}

const PurchaseDrawer: FC<PurchaseDrawerProps> = ({ data }) => {
  const [isRefferApplyed, setIsRefferApplyed] = useState(false);
  const [refferCode, setRefferCode] = useState("");

  const [openPaymentModal, setOpenPaymentModal] = useState(false);

  const [PostApi, { isLoading: isCoursePurchaseLoading }] =
    usePostApiMutation();

  const dispatch = useAppDispatch();
  const { isPurchaseDrawer } = useAppSelector((state) => state.drawer);

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

  const handlePaymentComplete = async (
    status: PaymentStatus,
    response: RazorpayResponse
  ) => {
    try {
      console.log("Payment Status:", status);
      console.log("Payment Response:", response);
      setOpenPaymentModal(false);

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
      console.log("res : ", res);
    } catch (error) {}
  };

  return (
    <>
      <Drawer
        placement="right"
        size="large"
        onClose={() => dispatch(setPurchaseDrawer())}
        open={isPurchaseDrawer}
        className="p-0!"
      >
        <div className="flex flex-col items-center justify-center min-h-full">
          <div
            className="max-w-140 bg-white rounded-lg overflow-hidden shadow-2xl bg-cover bg-top space-y-4 p-3 sm:p-6 "
            style={{
              backgroundImage: `url(${ImagePath}confirmation/Confirmation-bg.png)`,
            }}
          >
            {/* Header */}
            <div className="text-white pb-0!">
              <h2 className="text-2xl font-semibold text-center">
                {/* UPSC CSE - GS - Subscription */}
                {data?.title}
              </h2>
              <p className="mt-2 text-white text-xl font-bold">
                {data?.modulesData && "Module Name"}
              </p>
              <div className="">
                <ul className=" bg-white/20 py-3 px-3 w-full rounded-sm backdrop-blur-md  text-sm  grid grid-cols-1  sm:grid-cols-2 sm:flex-row gap-2 sm:gap-4">
                  {data?.modulesData?.map(
                    (module: { name: string }, i: number) => (
                      <li key={i}>
                        {i + 1}. {module.name}
                      </li>
                    )
                  )}
                </ul>
              </div>
            </div>
            <span className="border-b border-white/50 flex" />
            {/* Body */}
            <div className="space-y-4">
              <section className="bg-white rounded-lg p-3 space-y-1  ">
                <div className="flex gap-3 items-center w-full ">
                  <span>
                    <BiSolidOffer className="text-2xl text-success " />
                  </span>
                  <CouponCodeCheck
                    price={price}
                    isRefferApplyed={isRefferApplyed}
                    setIsRefferApplyed={setIsRefferApplyed}
                    refferCode={refferCode}
                    setRefferCode={setRefferCode}
                  />
                </div>
                <div>
                  <p className="text-gray-700  font-medium">
                    (If 60 marks min. not from our course 100% money back)
                  </p>
                </div>
              </section>
              {isRefferApplyed && (
                <section className="bg-white rounded-lg p-3 space-y-1 ">
                  <div className="flex gap-2">
                    <span>
                      <BiSolidOffer className="text-2xl text-primary " />
                    </span>
                    <p className="font-bold text-lg">Offer applied</p>
                  </div>
                  <div>
                    <p className="text-gray-700  font-medium ">
                      Pay just enrollment fee — Remaining after prelims cleared.
                    </p>
                  </div>
                </section>
              )}
            </div>
            {/* Footer */}
            <div className="space-y-4">
              <section className="bg-white rounded-lg p-3 space-y-3">
                <div className="flex justify-between gap-3">
                  <p className="font-bold">Enrollment Fee</p>
                  <p className="font-bold text-lg ">
                    {isRefferApplyed ? payingPrice : price}
                    {/* 6999 */}
                    {/* {payingPrice} */}
                  </p>
                </div>
                <span className="border-b border-primary flex" />
                <div className="flex justify-between gap-3">
                  <p className="font-bold">Total (Incl. off all taxes)</p>
                  <div className="space-x-0.5">
                    {isRefferApplyed ? (
                      <>
                        {isDiscountPrice ? (
                          <>
                            <span className="font-extrabold text-xl text-success">
                              {/* 999/ */}₹{payingPrice}/
                            </span>
                            <span className="font-bold text-md text-gray-600">
                              {/* 24,000 */}
                              {discountPrice}
                            </span>
                            <span className="font-bold text-md line-through text-red-500 ">
                              {/* 24,000 */}
                              {price}
                            </span>
                          </>
                        ) : (
                          <h1 className="flex gap-0.5 items-end">
                            <span className="font-extrabold text-xl text-success">
                              ₹{payingPrice}
                            </span>
                            <span className="font-bold text-lg text-red-500 ">
                              {price}
                            </span>
                          </h1>
                        )}
                      </>
                    ) : (
                      <p className="font-extrabold text-xl text-success">
                        {price}
                      </p>
                    )}
                  </div>
                </div>
              </section>
              <div className="">
                <FormButton
                  //   onClick={() => dispatch(setPaymentConfirmModal())}
                  onClick={() => setOpenPaymentModal(true)}
                  text="Enroll Now"
                  className="custom-button button button--mimas text-center w-full !p-4 !h-12 uppercase flex items-end-safe"
                />
              </div>
            </div>
          </div>
        </div>
        {/* <PaymentConfirmModal
          data={data}
          isDiscountPrice={isDiscountPrice}
          amountToPay={amountToPay}
        /> */}
        {openPaymentModal && (
          <PaymentModal
            amount={amountToPay}
            onPaymentComplete={handlePaymentComplete}
          />
        )}
      </Drawer>
    </>
  );
};

export default PurchaseDrawer;
