import { Form } from "antd";
import { useState } from "react";
import { BsArrowCounterclockwise } from "react-icons/bs";
import { useNavigate } from "react-router-dom";
import { FormButton, FormInput } from "../../Attribute/FormFields";
import { ImagePath, ROUTES, STORAGE_KEYS } from "../../Constants";
import { updateStorage } from "../../Utils";

const KYCRegister = () => {
  const [form] = Form.useForm();
  const [captcha, setCaptcha] = useState(generateCaptcha());
  const navigate = useNavigate();

  function generateCaptcha(length = 6) {
    const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789@#";
    let code = "";
    for (let i = 0; i < length; i++) {
      code += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return code;
  }

  const refreshCaptcha = () => {
    setCaptcha(generateCaptcha());
    form.setFieldValue("captcha", "");
  };

  const handleFormSubmit = async (values: any) => {
    try {
      if (values.captcha !== captcha) {
        form.setFields([
          {
            name: "captcha",
            errors: ["Incorrect captcha. Please try again."],
          },
        ]);
        return;
      }
      updateStorage(STORAGE_KEYS.KYC, { idProof: "panCard", ...values });
      navigate(ROUTES.KYC.KYC_VERIFICATION);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="sub-container pt-4 mb-6">
      <section className="flex flex-col gap-5">
        <h2 className="text-2xl font-normal">KYC Register</h2>
        <hr className="text-card-border mb-4" />

        <div className="flex flex-col xl:flex-row justify-between gap-10 items-center">
          {/* Left Image */}
          <div className="rounded-lg overflow-hidden w-full">
            <img src={`${ImagePath}kyc/KYC_Register.jpg`} alt="Recharge Wallet" className="w-full h-full object-cover" />
          </div>

          {/* Right Form */}
          <div className="flex flex-col w-full h-full justify-center">
            <h3 className="text-2xl font-semibold mb-2">HK DigiVerse LLP</h3>
            <p className="text-gray-700 mb-6">KYC verification is mandatory for cash withdrawal to ensure authenticity and compliance with legal regulations. Any incomplete or incorrect information may result in delays in the process.</p>

            <Form form={form} layout="vertical" onFinish={handleFormSubmit} className="space-y-8 lg:space-y-10">
              {/* PAN CARD */}
              <FormInput
                name="idNumber"
                label="PAN CARD"
                placeholder="Please Enter Your PanCard Number"
                rules={[
                  {
                    required: true,
                    message: "Please enter your PAN card number",
                  },
                  {
                    pattern: /^[A-Z]{5}[0-9]{4}[A-Z]{1}$/,
                    message: "Invalid PAN card format (e.g. ABCDE1234F)",
                  },
                ]}
              />

              {/* CAPTCHA */}
              <div className="flex items-end gap-3 mb-2">
                <div className="flex-1">
                  <FormInput
                    name="captcha"
                    label="CAPTCHA"
                    placeholder="Enter CAPTCHA code"
                    rules={[
                      {
                        required: true,
                        message: "Please enter CAPTCHA",
                      },
                    ]}
                  />
                </div>
                <div className="flex items-center">
                  <div className="bg-input-box text-xl font-mono tracking-widest p-2.5 border border-card-border rounded-lg select-none flex mb-6">
                    <p>{captcha}</p>
                    <button type="button" onClick={refreshCaptcha} className="text-orange-500 text-xl ms-2 cursor-pointer">
                      <BsArrowCounterclockwise />
                    </button>
                  </div>
                </div>
              </div>

              {/* Button */}
              <FormButton htmlType="submit" text="Next" className="custom-button button button--mimas w-full !h-auto" />
            </Form>
          </div>
        </div>
      </section>
    </div>
  );
};

export default KYCRegister;
