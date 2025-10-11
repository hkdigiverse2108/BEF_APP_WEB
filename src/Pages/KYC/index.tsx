import { Form } from "antd";
import { FormButton, FormInput } from "../../Attribute/FormFields";

const KYC = () => {
  const [form] = Form.useForm();

  const handleFormSubmit = async (values: any) => {
    try {
      console.log("kyc submitted : ", values);
    } catch (error) {}
  };

  return (
    <div className="sub-container my-6 min-h-screen">
    
      {/* KYC Section */}
      <section className="flex flex-col gap-5">
        <h2 className="text-2xl font-semibold">KYC</h2>
        <span className="border-b border-gray-100 w-full"></span>

        <div className="flex flex-col xl:flex-row justify-between gap-10 items-center">
          {/* Left Image */}

          <div className="rounded-lg overflow-hidden w-full ">
            <img
              src={`/assets/images/kyc/KYC_Banner.png`}
              alt="Recharge Wallet"
              className="w-full h-full object-cover"
            />
          </div>

          {/* Right Form */}
          <div className="flex flex-col w-full  h-full justify-center">
            <h3 className="text-2xl font-bold mb-2">
              Nexify Learning Solution LLP
            </h3>
            <p className=" text-gray-700 mb-6">
              KYC verification is mandatory for cash withdrawal to ensure
              authenticity and compliance with legal regulations. Any incomplete
              or incorrect information may Result in delays in the process.
            </p>
            <Form
              form={form}
              layout="vertical"
              onFinish={handleFormSubmit}
              className="space-y-8 lg:space-y-10"
            >
              <div className="mb-4">
                <FormInput
                  name="pancard"
                  label="PAN CARD"
                  placeholder="Please Enter Your PanCard Number"
                  rules={[
                    {
                      required: true,
                      type: "pancard",
                      message: "Invalid Pancard",
                    },
                  ]}
                />
              </div>

              {/* CAPTCHA */}
              <div className="flex items-center gap-3 mb-2">
                <FormInput
                  name="captcha"
                  label="CAPTCHA"
                  rules={[
                    {
                      required: true,
                      type: "captcha",
                      message: "Invalid Captcha",
                    },
                  ]}
                />
              </div>

              <p className="font-bold mb-6">
                UNABLE TO READ THE ABOVE IMAGE?{" "}
                <span className="text-orange-500 font-semibold cursor-pointer hover:underline">
                  TRY ON OTHER!
                </span>
              </p>

              {/* Button */}
              <FormButton
                htmlType="submit"
                text="Next"
                className="custom-button button button--mimas w-full !h-auto"
              />

              <p className="mt-4 text-center font-bold ">
                RETURN TO{" "}
                <span className="text-orange-500 font-semibold cursor-pointer hover:underline">
                  INDIAN QUIZ PRIVET LIMITED
                </span>
              </p>
            </Form>
          </div>
        </div>
      </section>
    </div>
  );
};

export default KYC;
