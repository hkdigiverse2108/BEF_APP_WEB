import { Tab, Tabs } from "@mui/material";
import { Form } from "antd";
import { useState } from "react";
import { Link } from "react-router-dom";
import { useGetApiQuery } from "../../Api/CommonApi";
import { FormButton, FormInput } from "../../Attribute/FormFields";
import { CardHeader } from "../../Components/Common/CardHeader";
import { ImagePath, ROUTES, URL_KEYS } from "../../Constants";
import { useAppSelector } from "../../Store/hooks";

const GetScholarship = () => {
  const [amount, setAmount] = useState("");
  const [tabIndex, setTabIndex] = useState(0);
  const [form] = Form.useForm();
  const { genderWiseProfileImage, user } = useAppSelector(
    (state) => state.auth
  );

  const { data } = useGetApiQuery({ url: `${URL_KEYS.USER.ID}${user._id}` });
  const userData = data?.data;

  const handleChange = (_event: React.SyntheticEvent, newValue: number) =>
    setTabIndex(newValue);

  const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/\D/g, "");
    setAmount(value);
  };

  const handleFormSubmit = () => {};

  return (
    <div className="sub-container pt-4">
      <CardHeader title="Get Scholarship" />
      <hr className="text-card-border mt-4" />
      <div className="flex flex-col lg:flex-row gap-6 pt-7">
        <div className="relative bg-input-box rounded-xl shadow-sm p-3 sm:p-7 border border-gray-200 lg:w-1/3 h-fit">
          <div className="relative bg-white p-4 rounded-lg z-20">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3">
                <img
                  src={userData?.profileImage || genderWiseProfileImage}
                  alt="profile"
                  className="w-10 h-10 rounded-xl"
                />
                <div>
                  <p className="text-sm text-gray-600 capitalize">
                    {userData?.firstName} {userData?.lastName}
                  </p>
                  <h3 className="text-lg font-semibold text-gray-900">
                    ₹{userData?.walletBalance.toFixed(2)}
                  </h3>
                </div>
              </div>
              <Link
                to={ROUTES.HISTORY.HISTORY}
                className="bg-input-box font-semibold text-sm p-2 px-4 rounded"
              >
                History
              </Link>
            </div>

            <hr className="my-4 text-card-border" />

            <div className="text-center font-normal p-5">
              <input
                type="text"
                value={amount}
                onChange={handleAmountChange}
                placeholder="₹0.0"
                className="text-center text-3xl font-semibold text-gray-800 w-full outline-none border-none focus:ring-0"
              />
              <p className="mt-2 text-base ">
                Enter The Amount You Want To Withdraw
              </p>

              {amount && +amount < 1 && (
                <div className="mt-4 border border-red-300 bg-red-50 text-red-700 text-sm rounded-md px-4 py-2 inline-flex items-center gap-2">
                  <span>⚠️</span> minimum withdrawal amount ₹1.00
                </div>
              )}
            </div>
          </div>
          <div className="absolute bottom-0 left-0 w-full">
            <img
              src={`${ImagePath}Union.png`}
              alt="Menu bg"
              className="w-full h-full object-cover z-0"
            />
          </div>
        </div>

        <div className="bg-input-box rounded-xl shadow-sm p-3 sm:p-7 border border-gray-200 lg:w-2/3">
          <Tabs
            className="horizontal-tabs"
            orientation="horizontal"
            variant="scrollable"
            value={tabIndex}
            onChange={handleChange}
          >
            <Tab label="UPI" />
            <Tab label="BANK ACCOUNT" />
          </Tabs>

          <div className="pt-6" hidden={tabIndex !== 0}>
            <Form
              form={form}
              layout="vertical"
              onFinish={handleFormSubmit}
              className="!w-full"
            >
              <FormInput
                name="uniqueId"
                label="UPI ID"
                placeholder="Enter Your UPI ID"
                className="!bg-white"
              />
              <span className="border-t border-primary flex w-full my-6" />
              <Form.Item label={null} className="col-span-2 text-center !m-0">
                <FormButton
                  htmlType="submit"
                  text="Cash Withdrawal"
                  className="custom-button button button--mimas w-full !h-auto"
                />
              </Form.Item>
            </Form>
          </div>

          <div className="pt-6 space-y-4" hidden={tabIndex !== 1}>
            <Form
              form={form}
              layout="vertical"
              onFinish={handleFormSubmit}
              className="!w-full"
            >
              <FormInput
                name="uniqueId"
                label="Bank Name"
                placeholder="Enter Your Bank Name"
                className="!bg-white"
              />
              <FormInput
                name="uniqueId"
                label="Account Holder Name"
                placeholder="Enter Your Account Holder Name"
                className="!bg-white"
              />
              <FormInput
                name="uniqueId"
                label="Account Number"
                placeholder="Enter Your Account Number"
                className="!bg-white"
              />
              <FormInput
                name="uniqueId"
                label="IFSC Code"
                placeholder="Enter Your IFSC Code"
                className="!bg-white"
              />
              <span className="border-t border-primary flex w-full my-6" />
              <Form.Item label={null} className="col-span-2 text-center !m-0">
                <FormButton
                  htmlType="submit"
                  text="Cash Withdrawal"
                  className="custom-button button button--mimas w-full !h-auto"
                />
              </Form.Item>
            </Form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GetScholarship;
