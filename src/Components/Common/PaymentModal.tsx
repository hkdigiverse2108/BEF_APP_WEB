import { useEffect } from "react";
import { useGetApiQuery } from "../../Api/CommonApi";
import { PAYMENT_STATUS, STORAGE_KEYS, URL_KEYS } from "../../Constants";
import { Storage } from "../../Utils";
import type { PaymentModalProps, RazorpayOptions, RazorpayResponse } from "../../Types";


declare global {
  interface Window {
    Razorpay: new (options: RazorpayOptions) => {
      open: () => void;
      on: (
        event: string,
        callback: (response: RazorpayResponse) => void
      ) => void;
    };
  }
}


const PaymentModal: React.FC<PaymentModalProps> = ({
  amount,
  onPaymentComplete,
}) => {
  const { data: settingData } = useGetApiQuery({ url: URL_KEYS.SETTINGS.ALL });
  const RazorPayKey = settingData?.data;

  const userFromLs = JSON.parse(Storage.getItem(STORAGE_KEYS?.USER) || "");
  const { firstName, lastName, email, contact } = userFromLs;
  const { mobile } = contact;
  const fullName = `${firstName} ${lastName}`;

  useEffect(() => {
    if (document.getElementById("razorpay-script")) return;
    const script = document.createElement("script");
    script.id = "razorpay-script";
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.async = true;
    document.body.appendChild(script);
  }, []);

  const startPayment = async () => {
    if (!window.Razorpay) {
      console.error("Razorpay not loaded!");
      return;
    }

    // const amount = Number(amount);

    const options: RazorpayOptions = {
      key: RazorPayKey.apiKey,
      amount: amount * 100,
      currency: "INR",
      name: "BEF",
      handler: (res) => onPaymentComplete(PAYMENT_STATUS.COMPLETED, res),
      prefill: {
        name: fullName,
        email: email,
        contact: mobile,
      },
      theme: { color: "#eb8844" },
    };

    const rzp = new window.Razorpay(options);
    rzp.on("payment.failed", (res) => {
      const failedResponse = {
        razorpay_payment_id: res?.error?.metadata?.payment_id || "",
        error: res?.error,
      };
      onPaymentComplete(PAYMENT_STATUS.FAILED, failedResponse);
    });

    rzp.open();
  };

  useEffect(() => {
    if (RazorPayKey?.apiKey) startPayment();
  }, [RazorPayKey]);

  return null;
};

export default PaymentModal;
