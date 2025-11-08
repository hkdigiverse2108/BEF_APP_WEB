import { Form } from "antd";
import { useEffect } from "react";
import { useGetApiQuery, usePostApiMutation } from "../../Api/CommonApi";
import { FormButton, FormInput } from "../../Attribute/FormFields";
import { CardHeader } from "../../Components/Common/CardHeader";
import { HTTP_STATUS, ImagePath, STORAGE_KEYS, URL_KEYS } from "../../Constants";
import { Storage } from "../../Utils";

export interface RazorpayResponse {
  razorpay_payment_id: string;
  razorpay_order_id?: string;
  razorpay_signature?: string;
  error?: {
    code?: string;
    description?: string;
    source?: string;
    step?: string;
    reason?: string;
    metadata?: {
      payment_id?: string;
      order_id?: string;
    };
  };
}

export interface RazorpayOptions {
  key: string;
  amount: number;
  currency: string;
  name: string;
  description?: string;
  handler: (response: RazorpayResponse) => void;
  prefill?: {
    name?: string;
    email?: string;
    contact?: string;
  };
  notes?: Record<string, string>;
  theme?: {
    color?: string;
  };
}

declare global {
  interface Window {
    Razorpay: new (options: RazorpayOptions) => {
      open: () => void;
      on: (event: string, callback: (response: RazorpayResponse) => void) => void;
    };
  }
}

const Recharge = () => {
  const [form] = Form.useForm();
  const [PostApi] = usePostApiMutation();

  const user = JSON.parse(Storage.getItem(STORAGE_KEYS.USER) || "{}");

  const { data, refetch } = useGetApiQuery({ url: `${URL_KEYS.USER.ID}${user._id}` });
  const userData = data?.data;

  const { data: settingData } = useGetApiQuery({ url: URL_KEYS.SETTINGS.ALL });
  const RazorPayKey = settingData?.data;

  useEffect(() => {
    if (document.getElementById("razorpay-script")) return;
    const script = document.createElement("script");
    script.id = "razorpay-script";
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.async = true;
    document.body.appendChild(script);
  }, []);

  useEffect(() => {
    form.setFieldsValue({ balance: 50 });
  }, []);

  const handlePayment = async (response: RazorpayResponse, status: "success" | "failed", amount: number) => {
    const TdsAmount = 0;
    const TotalAmount = amount + TdsAmount;

    const payment_id = response.razorpay_payment_id;
    const paymentRes = await PostApi({ url: URL_KEYS.BALANCE.VERIFY, data: { payment_id: payment_id } });
    const paymentData = paymentRes?.data;

    const RechargeData = {
      userId: userData?._id,
      name: `${userData?.firstName} ${userData?.lastName}`,
      utrId: response?.razorpay_payment_id ?? null,
      amount: amount,
      totalAmount: TotalAmount,
      tdsAmount: TdsAmount,
      status: status,
      type: "deposit",
      paymentType: paymentData?.payment?.method,
      paymentDetails: {
        ...(paymentData?.payment?.upi?.vpa && { upiId: paymentData.payment.upi.vpa }),
        ...(paymentData?.payment?.bank && { bankName: paymentData.payment.bank }), //netbanking
        ...(paymentData?.payment?.card?.name && { accountHolderName: paymentData?.payment?.card?.name }), //card
        ...(paymentData?.payment?.acquirer_data?.bank_transaction_id && { id: paymentData.payment.acquirer_data.bank_transaction_id }), //netbanking
        ...(paymentData?.payment?.card_id && { id: paymentData.payment.card_id }), //card
        ...(paymentData?.payment?.card?.last4 && { cardNumber: paymentData.payment.card?.last4 }), //card
        ...(paymentData?.payment?.wallet && { walletName: paymentData.payment.wallet }), //wallet
      },
    };
    try {
      const res = await PostApi({ url: URL_KEYS.BALANCE.ADD, data: RechargeData });
      if (res?.data?.status === HTTP_STATUS.OK) {
        refetch();
      }
    } catch (error) {
      console.error("Upload failed:", error);
    }
  };

  const startPayment = async (values: any) => {
    if (!window.Razorpay) {
      console.error("Razorpay not loaded!");
      return;
    }

    const amt = Number(values.balance);

    if (amt < 50) {
      return form.setFields([{ name: "balance", errors: ["Minimum recharge amount is ₹50"] }]);
    }

    const options: RazorpayOptions = {
      key: RazorPayKey.apiKey,
      amount: amt * 100,
      currency: "INR",
      name: "BEF",
      handler: (res) => handlePayment(res, "success", amt),
      prefill: {
        name: `${userData?.firstName} ${userData?.lastName}`,
        email: userData?.email,
        contact: userData?.contact?.mobile,
      },
      theme: { color: "#eb8844" },
    };

    const rzp = new window.Razorpay(options);
    rzp.on("payment.failed", (res) => {
      handlePayment({ razorpay_payment_id: res?.error?.metadata?.payment_id || "" }, "failed", amt);
    });

    rzp.open();
  };

  return (
    <div className="sub-container pt-8 recharge">
      <CardHeader title="Recharge" />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 pt-6">
        {/* IMAGE */}
        <div className="rounded-lg overflow-hidden shadow-md">
          <img src={`${ImagePath}recharge/Recharge-bg.png`} alt="Recharge Wallet" className="w-full h-full object-cover" />
        </div>

        {/* RIGHT */}
        <div className="flex flex-col gap-6 pb-4">
          {/* BALANCE DISPLAY */}
          <div className="w-full relative bg-input-box rounded-xl p-7 flex justify-between items-center gap-6">
            <div className="w-1 h-[70%] bg-orange-500 rounded-r absolute left-0" />
            <img className="object-cover w-10" src={`${ImagePath}recharge/Wallet.png`} />
            <div className="text-left">
              <p className="text-base font-bold mt-1 capitalize">Available Balance</p>
              <h3 className="text-2xl font-extrabold">₹ {userData?.walletBalance || 0}</h3>
            </div>
          </div>

          {/* FORM */}
          <div className="w-full relative bg-input-box rounded-xl p-5 flex flex-wrap justify-between items-center gap-6">
            <div className="w-1 h-[70%] bg-orange-500 rounded-r absolute left-0" />
            <span className="font-semibold">Add Amount</span>

            <Form form={form} onFinish={startPayment} className="flex justify-center">
              <FormInput name="balance" type="number" rules={[{ required: true, message: "Enter minimum ₹50" }]} />
            </Form>
          </div>

          <hr className="border-t border-primary" />

          <div className="space-y-3">
            <FormButton onClick={() => form.submit()} text="Add Balance" className="custom-button w-full button button--mimas text-center !p-4 !h-12 uppercase" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Recharge;
