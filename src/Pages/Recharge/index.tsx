import { Form } from "antd";
import { FormButton, FormInput } from "../../Attribute/FormFields";
import { CardHeader } from "../../Components/Common/CardHeader";
import { ImagePath } from "../../Constants";
import { useEffect } from "react";

const Recharge = () => {
   const [form] = Form.useForm();

   useEffect(() => {
     form.setFieldsValue({ balance: "50" });
   }, []);

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
              <h3 className="text-2xl font-extrabold">₹0.00</h3>
            </div>
          </div>

          <div className="w-full relative bg-input-box rounded-xl p-5 flex flex-wrap justify-between items-center gap-6">
            <div className="w-1 h-[70%] bg-orange-500 rounded-r absolute left-0" />
            <span className="font-semibold">Add Current Recharge</span>
            <Form form={form} className="flex justify-center">
              <FormInput name="balance"/>
            </Form>
          </div>

          <hr className="border-t border-primary" />

          {/* Preferred Payments */}
          <div className="space-y-3">
            {/* <h3 className="font-semibold text-gray-800">Preferred Payments</h3> */}
            <FormButton text="ADD Balance" className="custom-button w-full button button--mimas text-center !p-4 !h-12 uppercase" />
          </div>

          {/* Credit/Debit Card */}
          {/* <div className="space-y-3">
            <h3 className="font-semibold text-gray-800">Credit / Debit Card</h3>
            <FormButton text="PAY CREDIT / DEBIT CARD" className="custom-button w-full button button--mimas text-center !p-4 !h-12 uppercase" />
          </div> */}
        </div>
      </div>
    </div>
  );
};

export default Recharge;
