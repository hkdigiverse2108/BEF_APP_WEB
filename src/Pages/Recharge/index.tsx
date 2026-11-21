import { Form, notification } from "antd";
import { useEffect, useState } from "react";
import { useGetApiQuery, usePostApiMutation } from "../../Api/CommonApi";
import { FormButton, FormInput } from "../../Attribute/FormFields";
import { CardHeader } from "../../Components/Common/CardHeader";
import PaymentModal from "../../Components/Common/PaymentModal";
import { HTTP_STATUS, ImagePath, PAYMENT_STATUS, ROUTES, STORAGE_KEYS, TRANSACTION_STATUS, URL_KEYS } from "../../Constants";
import { useAppDispatch, useAppSelector } from "../../Store/hooks";
import { setConfirmationDrawer } from "../../Store/Slices/DrawerSlice";
import type { PaymentStatusType, RazorpayResponse } from "../../Types";
import { AntdNotification, Storage, updateStorage } from "../../Utils";
import { useLocation, useNavigate } from "react-router-dom";

const Recharge = () => {
  const MinAmount = 69;
  const [form] = Form.useForm();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const [PostApi] = usePostApiMutation();
  const [rechargeAmount, setRechargeAmount] = useState(MinAmount);

  const { user } = useAppSelector((state) => state.auth);
  const {
    data,
    refetch,
    isLoading: isUserLoading,
  } = useGetApiQuery({
    url: `${URL_KEYS.USER.ID}${user._id}`,
  });

  const { data: settingData } = useGetApiQuery({ url: URL_KEYS.SETTINGS.ALL });
  const isRazorpay = settingData?.data?.isRazorpay;

  const userData = data?.data;

  const pendingContest = (() => {
    const raw = Storage.getItem("pending_contest_join");
    if (raw) {
      try {
        return JSON.parse(raw);
      } catch (e) {}
    }
    return location?.state?.contestData || null;
  })();

  const contestFee = Number(pendingContest?.fees || 0);
  const effectiveMinAmount = pendingContest && contestFee > 0 ? contestFee : MinAmount;

  const handleRedirectAfterRecharge = async () => {
    const pending = Storage.getItem("pending_contest_join");
    if (pending) {
      try {
        const contestData = JSON.parse(pending);
        const baseAmount = Number(contestData?.fees || 0);
        const payableAmount = baseAmount.toFixed(2);

        if (Number(payableAmount) !== 0) {
          const balancePayload = {
            contestId: contestData?._id,
            amount: Number(payableAmount),
            title: contestData?.name,
            transactionStatus: "success",
            transactionType: "withdraw",
            earningType: "contestPaidUser",
          };
          await PostApi({
            url: URL_KEYS.TRANSACTION.ADD,
            data: balancePayload,
          });
        }

        const existingLsData = JSON.parse(Storage.getItem(STORAGE_KEYS.CONTEST_QA) || "{}");
        const payload = {
          ...(contestData?.payload || {}),
          ...existingLsData,
        };

        const res = await PostApi({ url: URL_KEYS.QA.ADD, data: payload });
        Storage.removeItem(STORAGE_KEYS.CONTEST_QA);
        Storage.removeItem("pending_contest_join");

        if (res?.data?.status === HTTP_STATUS.OK) {
          AntdNotification(notification, "success", "Contest joined successfully!");
          navigate(ROUTES.CONTEST.SUCCESS, {
            state: {
              contest: contestData,
              payableAmount,
              paymentMethod: "Online Payment",
              transactionId: res?.data?.data?._id || `TXN-${Date.now().toString().slice(-6)}`,
              joinedAt: new Date().toISOString(),
            },
          });
          return;
        }
      } catch (e) {
        console.error("Error auto-joining contest after recharge:", e);
      }

      // Fallback: open confirmation drawer
      try {
        const contestData = JSON.parse(pending);
        Storage.removeItem("pending_contest_join");
        dispatch(setConfirmationDrawer({ open: true, data: contestData }));
        navigate(ROUTES.HOME);
        return;
      } catch (e) {}
    }

    if (location?.state?.returnToContest && location?.state?.contestData) {
      dispatch(setConfirmationDrawer({ open: true, data: location.state.contestData }));
      navigate(ROUTES.HOME);
      return;
    }

    // Direct recharge success
    AntdNotification(notification, "success", "Wallet recharged successfully!");
    navigate(ROUTES.PAYMENT.SUCCESS, {
      state: {
        isRechargeOnly: true,
        payableAmount: rechargeAmount,
        paymentMethod: "Online Payment",
        transactionId: `TXN-${Date.now().toString().slice(-6)}`,
        joinedAt: new Date().toISOString(),
      },
    });
  };

  useEffect(() => {
    if (document.getElementById("razorpay-script")) return;
    const script = document.createElement("script");
    script.id = "razorpay-script";
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.async = true;
    document.body.appendChild(script);
  }, []);

  useEffect(() => {
    let fee = MinAmount;
    if (pendingContest) {
      const contestFee = Number(pendingContest?.fees || 0);
      if (contestFee > 0) {
        fee = contestFee;
      }
    }
    setRechargeAmount(fee);
    form.setFieldsValue({ balance: fee });
  }, [pendingContest]);

  // Check if returning from PhonePe or external payment redirect
  useEffect(() => {
    const query = new URLSearchParams(window.location.search);
    const hasPaymentReturn = query.has("orderId") || query.has("code") || query.has("transactionId");
    if (hasPaymentReturn) {
      refetch().then(() => {
        handleRedirectAfterRecharge();
      });
    }
  }, []);

  const handlePaymentComplete = async (status: PaymentStatusType, response: RazorpayResponse) => {
    try {
      const TdsAmount = 0;
      const TotalAmount = Number(rechargeAmount) + Number(TdsAmount);

      const payment_id = response?.razorpay_payment_id;
      const paymentRes = await PostApi({
        url: URL_KEYS.BALANCE.VERIFY,
        data: { payment_id: payment_id },
      });
      const paymentData = paymentRes?.data;

      const RechargeData = {
        userId: userData?._id,
        name: `${userData?.firstName} ${userData?.lastName}`,
        utrId: payment_id ?? null,
        amount: rechargeAmount,
        totalAmount: TotalAmount,
        tdsAmount: TdsAmount,
        status: status === PAYMENT_STATUS.COMPLETED ? TRANSACTION_STATUS.SUCCESS : TRANSACTION_STATUS.FAILED,
        type: "deposit",
        paymentType: paymentData?.payment?.method,
        paymentDetails: {
          ...(paymentData?.payment?.upi?.vpa && {
            upiId: paymentData.payment.upi.vpa,
          }),
          ...(paymentData?.payment?.bank && {
            bankName: paymentData.payment.bank,
          }), //netbanking
          ...(paymentData?.payment?.card?.name && {
            accountHolderName: paymentData?.payment?.card?.name,
          }), //card
          ...(paymentData?.payment?.acquirer_data?.bank_transaction_id && {
            id: paymentData.payment.acquirer_data.bank_transaction_id,
          }), //netbanking
          ...(paymentData?.payment?.card_id && {
            id: paymentData.payment.card_id,
          }), //card
          ...(paymentData?.payment?.card?.last4 && {
            cardNumber: paymentData.payment.card?.last4,
          }), //card
          ...(paymentData?.payment?.wallet && {
            walletName: paymentData.payment.wallet,
          }), //wallet
        },
      };
      try {
        const res = await PostApi({
          url: URL_KEYS.BALANCE.ADD,
          data: RechargeData,
        });
        if (res?.data?.status === HTTP_STATUS.OK) {
          await refetch();
          handleRedirectAfterRecharge();
        }
      } catch (error) {
        console.error("Upload failed:", error);
      }
    } catch (error) {}
  };

  const handleStartPayment = async () => {
    try {
      const TdsAmount = 0;
      const TotalAmount = Number(rechargeAmount) + Number(TdsAmount);

      const RechargeData = {
        userId: userData?._id,
        name: `${userData?.firstName} ${userData?.lastName}`,
        amount: rechargeAmount,
        totalAmount: TotalAmount,
        tdsAmount: TdsAmount,
        status: "pending",
        type: "deposit",
      };
      try {
        const balance = await PostApi({ url: URL_KEYS.BALANCE.ADD, data: RechargeData });
        if (balance?.data?.status === HTTP_STATUS.OK) {
          refetch();
          const res = await PostApi({
            url: URL_KEYS.PHONEPE_ORDER.ADD,
            data: {
              amount: TotalAmount,
              orderId: balance?.data?.data?._id,
              redirectUrl: window.location.href,
            },
          }).unwrap();
          const paymentUrl = res?.data?.paymentUrl;

          if (paymentUrl) {
            window.location.href = paymentUrl;
          } else {
            throw console.error("Payment URL not found");
          }
        }
      } catch (error) {
        console.error("Upload failed:", error);
      }
    } catch (error) {}
  };

  const handleInputChange = (value: { balance: number }) => {
    setRechargeAmount(value?.balance);
  };

  useEffect(() => {
    updateStorage(STORAGE_KEYS.USER, {
      walletBalance: userData?.walletBalance,
    });
  }, [userData]);

  return (
    <div className="sub-container pt-4 recharge">
      <CardHeader title="Recharge" />
      <hr className="text-card-border mt-4" />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 pt-6">
        {/* IMAGE */}
        <div className="rounded-lg overflow-hidden shadow-md">
          <img src={`${ImagePath}recharge/Recharge-bg.jpg`} alt="Recharge Wallet" className="w-full h-full object-cover" />
        </div>

        {/* RIGHT */}
        <div className="flex flex-col gap-6 pb-4">
          {pendingContest && (
            <div className="w-full bg-gradient-to-r from-primary/10 via-accent/10 to-primary/5 border border-primary/20 rounded-xl p-4 flex flex-col gap-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold uppercase tracking-wider text-primary bg-white px-2.5 py-1 rounded-md shadow-xs">
                  Contest Entry Payment
                </span>
                {pendingContest?.fees !== undefined && (
                  <span className="text-sm font-bold text-gray-800">
                    Fee: ₹{pendingContest.fees}
                  </span>
                )}
              </div>
              <h4 className="text-base font-bold text-gray-900 mt-1">
                {pendingContest?.name || "Selected Contest"}
              </h4>
              <p className="text-xs text-gray-600">
                Your selected time slot and question set are reserved. Complete payment to automatically join!
              </p>
            </div>
          )}

          {/* BALANCE DISPLAY */}
          <div className="w-full relative bg-input-box rounded-xl p-7 flex justify-between items-center gap-6">
            <div className="w-1 h-[70%] bg-primary rounded-r absolute left-0" />
            <img className="object-cover w-10" src={`${ImagePath}recharge/Wallet.png`} alt="Wallet" />
            <div className="text-left">
              <p className="text-base font-semibold mt-1 capitalize">Available Balance</p>
              <h3 className="text-2xl font-extrabold">₹ {userData?.walletBalance?.toFixed(2) || 0}</h3>
            </div>
          </div>

          {/* FORM */}
          <div className="w-full relative bg-input-box rounded-xl p-5 flex flex-wrap justify-between items-center gap-6">
            <div className="w-1 h-[70%] bg-primary rounded-r absolute left-0" />
            <div className="flex items-center gap-2">
              <span className="font-normal">{pendingContest ? "Payable Amount" : "Add Amount"}</span>
              <span className="text-xs font-semibold text-primary bg-primary/10 px-2 py-0.5 rounded-full">GST Included</span>
            </div>

            <Form form={form} onValuesChange={(_, allValues) => handleInputChange(allValues)} className="flex justify-center">
              <FormInput
                name="balance"
                type="number"
                rules={[
                  { required: true, message: `Enter minimum ₹${effectiveMinAmount}` },
                  {
                    validator: (_: any, value: any) => (value >= effectiveMinAmount ? Promise.resolve() : Promise.reject(`Minimum recharge amount is ₹${effectiveMinAmount}`)),
                  },
                ]}
              />
            </Form>
          </div>

          <hr className="border-t border-primary" />
          <div>
            {isRazorpay ? (
              <PaymentModal
                btnText={pendingContest ? `Pay ₹${rechargeAmount} & Join Contest` : "Add Balance"}
                isLoading={isUserLoading}
                amount={rechargeAmount}
                onPaymentComplete={handlePaymentComplete}
              />
            ) : (
              <FormButton
                onClick={handleStartPayment}
                loading={isUserLoading}
                text={pendingContest ? `Pay ₹${rechargeAmount} & Join Contest` : "Enroll Now"}
                className="custom-button button button--mimas text-center w-full !p-4 !h-12 uppercase flex items-end-safe"
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Recharge;
