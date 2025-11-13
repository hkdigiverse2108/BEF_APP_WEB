import { useEffect, useRef } from "react";
import { useGetApiQuery } from "../../Api/CommonApi";
import { PAYMENT_STATUS, STORAGE_KEYS, URL_KEYS } from "../../Constants";
import { Storage } from "../../Utils";
import type {
  PaymentModalProps,
  PaymentStatusType,
  RazorpayOptions,
  RazorpayResponse,
} from "../../Types";
import { FormButton } from "../../Attribute/FormFields";

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
  isLoading,
  btnText,
  amount,
  onPaymentComplete,
}) => {
  const hasHandledPayment = useRef<string | null>(null);

  const { data: settingData } = useGetApiQuery({ url: URL_KEYS.SETTINGS.ALL });
  const RazorPayKey = settingData?.data?.apiKey;

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

    const safeComplete = (status: PaymentStatusType, response: any) => {
      const currentPaymentId =
        response?.razorpay_payment_id || "FAILED_ATTEMPT";

      if (hasHandledPayment.current === currentPaymentId) return;
      hasHandledPayment.current = currentPaymentId;
      onPaymentComplete(status, response, RazorPayKey);
    };

    const options: RazorpayOptions = {
      key: RazorPayKey,
      amount: amount * 100,
      currency: "INR",
      name: "BHARAT EXAM FEST",
      handler: (res) => safeComplete(PAYMENT_STATUS.COMPLETED, res),
      prefill: {
        name: fullName,
        email: email,
        contact: mobile,
      },
      theme: { color: "#eb8844" },
    };

    const rzp = new window.Razorpay(options);

    const handleFail = (res: any) => {
      const failedResponse = {
        razorpay_payment_id: res?.error?.metadata?.payment_id || "",
        error: res?.error,
      };
      safeComplete(PAYMENT_STATUS.FAILED, failedResponse);
    };

    rzp.on("payment.failed", handleFail);

    rzp.open();
  };

  return (
    <FormButton
      onClick={startPayment}
      disabled={!RazorPayKey || isLoading}
      loading={isLoading}
      text={btnText}
      className="custom-button button button--mimas text-center w-full! p-4! h-12! uppercase flex items-end-safe"
    />
  );
};

export default PaymentModal;
