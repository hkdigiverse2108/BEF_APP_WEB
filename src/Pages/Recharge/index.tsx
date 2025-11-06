import { Form } from "antd";
import { FormButton, FormInput } from "../../Attribute/FormFields";
import { CardHeader } from "../../Components/Common/CardHeader";
import { ImagePath, STORAGE_KEYS, URL_KEYS } from "../../Constants";
import { useEffect } from "react";
import { useGetApiQuery } from "../../Api/CommonApi";
import { Storage } from "../../Utils";

export interface RazorpayResponse {
  razorpay_payment_id?: string;
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
  description: string;
  handler: (response: RazorpayResponse) => void;
  prefill: {
    name: string;
    email: string;
    contact: string;
  };
  notes?: {
    course?: string;
    title?: string;
    referral?: string;
  };
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
  const user = JSON.parse(Storage.getItem(STORAGE_KEYS.USER) || "{}");

  const { data } = useGetApiQuery({ url: `${URL_KEYS.USER.ID}${user._id}` });
  const WalletBalance = data?.data?.walletBalance;

  const { data: settingData } = useGetApiQuery({ url: URL_KEYS.SETTINGS.ALL });
  const RazorPayKey = settingData?.data?.apiKey;

  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.async = true;
    document.body.appendChild(script);
  }, []);

  useEffect(() => {
    form.setFieldsValue({ balance: "50" });
  }, []);

  const startPayment = (values: any) => {
    if (!window.Razorpay) return;
    console.log(values);

    const options = {
      key: RazorPayKey,
      // amount: values.balance * 100,
      currency: "INR",
      name: "HET R",
      // description: title,
      // handler: (response: RazorpayResponse) => handlePayment(response, "COMPLETED"),
      // prefill: {
      //   name: values.name,
      //   email: values.email,
      //   contact: values.phone,
      // },
      // notes: { title, referral: values.referral || "N/A" },
      theme: { color: "#eb8844" },
    };

    const rzp = new window.Razorpay(options);
    rzp.on("payment.failed", (response: RazorpayResponse) => {
      // handlePayment({ razorpay_payment_id: response?.error?.metadata?.payment_id }, "FAILED");
    });

    rzp.open();
  };

  return (
    <div className="sub-container pt-8 recharge">
      <CardHeader title="Recharge" />
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 pt-6">
        {/* Left Image Section */}
        <div className="rounded-lg overflow-hidden shadow-md">
          <img src={`${ImagePath}recharge/Recharge-bg.png`} alt="Recharge Wallet" className="w-full h-full object-cover" />
        </div>

        {/* Right Payment Section */}
        <div className="flex flex-col gap-6 pb-4">
          {/* Wallet Balance */}
          <div className="w-full relative bg-input-box rounded-xl p-7 flex justify-between items-center gap-6">
            <div className="w-1 h-[70%] bg-orange-500 rounded-r absolute left-0" />
            <div>
              <img className="object-cover w-10" src={`${ImagePath}recharge/Wallet.png`} />
            </div>
            <div className="text-left">
              <p className="text-base font-bold mt-1 capitalize">Available Balance</p>
              <h3 className="text-2xl font-extrabold">₹ {WalletBalance}</h3>
            </div>
          </div>

          <div className="w-full relative bg-input-box rounded-xl p-5 flex flex-wrap justify-between items-center gap-6">
            <div className="w-1 h-[70%] bg-orange-500 rounded-r absolute left-0" />
            <span className="font-semibold">Add Current Recharge</span>
            <Form form={form} onFinish={startPayment} className="flex justify-center">
              <FormInput
                name="balance"
                type="number"
                rules={[
                  {
                    required: true,
                    message: "Please enter an amount of at least ₹50",
                  },
                  {
                    validator: (_, value) => {
                      if (!value || Number(value) < 50) {
                        return Promise.reject("Minimum recharge amount is ₹50");
                      }
                      return Promise.resolve();
                    },
                  },
                ]}
              />
            </Form>
          </div>

          <hr className="border-t border-primary" />

          <div className="space-y-3">
            <FormButton onClick={() => form.submit()} text="ADD Balance" className="custom-button w-full button button--mimas text-center !p-4 !h-12 uppercase" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Recharge;

// import { Form } from "antd";
// import { FormButton, FormInput } from "../../Attribute/FormFields";
// import { CardHeader } from "../../Components/Common/CardHeader";
// import { ImagePath, STORAGE_KEYS, URL_KEYS } from "../../Constants";
// import { useEffect } from "react";
// import { useGetApiQuery } from "../../Api/CommonApi";
// import { Storage } from "../../Utils";

// export interface RazorpayResponse {
//   razorpay_payment_id?: string;
//   razorpay_order_id?: string;
//   razorpay_signature?: string;
// }

// declare global {
//   interface Window {
//     Razorpay: new (options: any) => {
//       open: () => void;
//       on: (event: string, callback: (response: any) => void) => void;
//     };
//   }
// }

// const Recharge = () => {
//   const [form] = Form.useForm();

//   const user = JSON.parse(Storage.getItem(STORAGE_KEYS.USER) || "{}");

//   const { data } = useGetApiQuery({ url: `${URL_KEYS.USER.ID}${user._id}` });
//   const WalletBalance = data?.data?.walletBalance;

//   const { data: settingData } = useGetApiQuery({ url: URL_KEYS.SETTINGS.ALL });
//   const RazorPayKey = settingData?.data?.apiKey;

//   useEffect(() => {
//     const script = document.createElement("script");
//     script.src = "https://checkout.razorpay.com/v1/checkout.js";
//     script.async = true;
//     document.body.appendChild(script);
//   }, []);

//   useEffect(() => {
//     form.setFieldsValue({ balance: "50" });
//   }, []);

//   const startPayment = async (values: any) => {
//     if (!window.Razorpay) return console.error("Razorpay SDK not loaded!");

//     const amount = Number(values.balance);
//     if (!amount) return alert("Enter amount!");

//     // ⚡ (Optional) Create order on BE
//     const orderResponse = await fetch("/api/create-order", {
//       method: "POST",
//       body: JSON.stringify({ amount }),
//     }).then((r) => r.json());

//     const options = {
//       key: RazorPayKey,
//       amount: amount * 100,
//       currency: "INR",
//       name: "HET R",
//       description: "Wallet Recharge",
//       order_id: orderResponse?.order_id, // ✅ recommended
//       handler: function (response: RazorpayResponse) {
//         console.log("PAYMENT SUCCESS", response);
//         // call backend to verify
//       },
//       prefill: {
//         name: user?.name || "",
//         email: user?.email || "",
//         contact: user?.phone || "",
//       },
//       notes: { source: "recharge" },
//       theme: { color: "#eb8844" },
//     };

//     const rzp = new window.Razorpay(options);

//     rzp.on("payment.failed", function (response: any) {
//       console.error("FAILED", response);
//       // handle failed status
//     });

//     rzp.open();
//   };

//   return (
//     <div className="sub-container pt-8 recharge">
//       <CardHeader title="Recharge" />
//       <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 pt-6">

//         {/* Left Image */}
//         <div className="rounded-lg overflow-hidden shadow-md">
//           <img
//             src={`${ImagePath}recharge/Recharge-bg.png`}
//             alt="Recharge Wallet"
//             className="w-full h-full object-cover"
//           />
//         </div>

//         {/* Right Section */}
//         <div className="flex flex-col gap-6 pb-4">
//           <div className="w-full relative bg-input-box rounded-xl p-7 flex justify-between items-center gap-6">
//             <div className="w-1 h-[70%] bg-orange-500 rounded-r absolute left-0" />
//             <div>
//               <img className="object-cover w-10" src={`${ImagePath}recharge/Wallet.png`} />
//             </div>
//             <div className="text-left">
//               <p className="text-base font-bold mt-1 capitalize">Available Balance</p>
//               <h3 className="text-2xl font-extrabold">₹ {WalletBalance}</h3>
//             </div>
//           </div>

//           <div className="w-full relative bg-input-box rounded-xl p-5 flex flex-wrap justify-between items-center gap-6">
//             <div className="w-1 h-[70%] bg-orange-500 rounded-r absolute left-0" />
//             <span className="font-semibold">Add Current Recharge</span>

//             <Form form={form} onFinish={startPayment} className="flex justify-center">
//               <FormInput name="balance" placeholder="₹ Amount" />
//             </Form>
//           </div>

//           <hr className="border-t border-primary" />

//           <div className="space-y-3">
//             <FormButton
//               onClick={() => form.submit()}    // ✅ submit form correctly
//               text="ADD Balance"
//               className="custom-button w-full button button--mimas text-center !p-4 !h-12 uppercase"
//             />
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Recharge;
