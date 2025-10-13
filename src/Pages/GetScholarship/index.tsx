import { Tab, Tabs } from "@mui/material";
import { Form } from "antd";
import { useState } from "react";
import { FormButton, FormInput } from "../../Attribute/FormFields";
import { CardHeader } from "../../Components/Common/CardHeader";
import { ImagePath } from "../../Constants";

const GetScholarship = () => {
  const [amount, setAmount] = useState("");
  const [commission, setCommission] = useState(0);
  const [tabIndex, setTabIndex] = useState(0);
  const [form] = Form.useForm();

  const handleChange = (_event: React.SyntheticEvent, newValue: number) => setTabIndex(newValue);

  const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/\D/g, "");
    setAmount(value);
    setCommission((+value * 0.05).toFixed(2));
  };

  const handleFormSubmit = () => {};

  return (
    <div className="sub-container pt-8">
      <CardHeader title="Get Scholarship" />

      <div className="flex gap-6 pt-8">
        <div className="relative bg-input-box rounded-xl shadow-sm p-7 border border-gray-200 w-1/3 h-fit">
          <div className="relative bg-white p-4 rounded-lg z-20">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className="bg-blue-500 text-white font-semibold rounded-full h-10 w-10 flex items-center justify-center">S</div>
                <div>
                  <p className="text-sm text-gray-600">Scholarship Balance</p>
                  <h3 className="text-lg font-semibold text-gray-900">₹53,000.00</h3>
                </div>
              </div>
              <span className="bg-input-box font-bold text-sm p-2 px-4 rounded">History</span>
            </div>

            <hr className="my-4 text-card-border" />

            <div className="text-center font-semibold p-5">
              <input type="text" value={amount} onChange={handleAmountChange} placeholder="₹0.0" className="text-center text-3xl font-bold text-gray-800 w-full outline-none border-none focus:ring-0" />
              <p className="mt-2 text-base ">Enter The Amount You Want To Withdraw</p>

              <p className="mt-4 text-sm">
                Commission <span className="text-red-600">₹{commission}</span>
                <br /> (is constant and amounts to 5%)
              </p>

              {amount && +amount < 10000 && (
                <div className="mt-4 border border-red-300 bg-red-50 text-red-700 text-sm rounded-md px-4 py-2 inline-flex items-center gap-2">
                  <span>⚠️</span> minimum withdrawal amount ₹10,000.00
                </div>
              )}
            </div>
          </div>
          <div className="absolute bottom-0 left-0 w-full">
            <img src={`${ImagePath}Union.png`} alt="Menu bg" className="w-full h-full object-cover z-0" />
          </div>
        </div>

        <div className="bg-input-box rounded-xl shadow-sm p-7 border border-gray-200 w-2/3">
          <Tabs className="horizontal-tabs" orientation="horizontal" variant="scrollable" value={tabIndex} onChange={handleChange}>
            <Tab label="UPI" />
            <Tab label="BANK ACCOUNT" />
          </Tabs>

          <div className="pt-6" hidden={tabIndex !== 0}>
            <Form form={form} layout="vertical" onFinish={handleFormSubmit} className="!w-full">
              <FormInput name="uniqueId" label="UPI ID" placeholder="Enter Your UPI ID" className="!bg-white" />
              <span className="border-t border-primary flex w-full my-6" />
              <Form.Item label={null} className="col-span-2 text-center">
                <FormButton htmlType="submit" text="Cash Withdrawal" className="custom-button button button--mimas w-full !h-auto" />
              </Form.Item>
            </Form>
          </div>

          <div className="pt-6 space-y-4" hidden={tabIndex !== 1}>
            <Form form={form} layout="vertical" onFinish={handleFormSubmit} className="!w-full">
              <FormInput name="uniqueId" label="Bank Name" placeholder="Enter Your Bank Name" className="!bg-white" />
              <FormInput name="uniqueId" label="Account Holder Name" placeholder="Enter Your Account Holder Name" className="!bg-white" />
              <FormInput name="uniqueId" label="Account Number" placeholder="Enter Your Account Number" className="!bg-white" />
              <FormInput name="uniqueId" label="IFSC Code" placeholder="Enter Your IFSC Code" className="!bg-white" />
              <span className="border-t border-primary flex w-full my-6" />
              <Form.Item label={null} className="col-span-2 text-center">
                <FormButton htmlType="submit" text="Cash Withdrawal" className="custom-button button button--mimas w-full !h-auto" />
              </Form.Item>
            </Form>
            {/* <div className="flex items-end gap-3">
              <div className="flex-1">
                <label className="block text-sm font-medium text-gray-700 mb-1">IFSC Code</label>
                <input type="text" placeholder="Enter Your IFSC Code" className="w-full border border-gray-300 rounded-md p-2.5 focus:ring-1 focus:ring-black focus:outline-none" />
              </div>
              <button className="bg-black text-white px-5 py-2.5 rounded-md hover:bg-gray-800">Search</button>
            </div> */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default GetScholarship;
