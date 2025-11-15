import { Col, Form, Row } from "antd";
import { useNavigate } from "react-router-dom";
import { FormButton, FormInput } from "../../Attribute/FormFields";
import { usePostGlobalApiMutation } from "../../Api/CommonGlobalApi";
import type { LoginForm } from "../../Types";
import { HTTP_STATUS, ImagePath, ROUTES, STORAGE_KEYS, URL_KEYS } from "../../Constants";
import { useEffect, useState } from "react";
import { Storage } from "../../Utils";

const Verify = () => {
  const [form] = Form.useForm();

  const [seconds, setSeconds] = useState(120);

  const navigate = useNavigate();

  const [PostGlobalApi] = usePostGlobalApiMutation({});

  const handleFormSubmit = async (values: LoginForm) => {
    try {
      const payload = {
        ...values,
        userType: "user",
      };
      const res = await PostGlobalApi({
        url: URL_KEYS.AUTH.VERIFY_OTP,
        data: payload,
      }).unwrap();

      if (res?.status === HTTP_STATUS.OK) {
        Storage.removeItem(STORAGE_KEYS.OTP_EXPIRY_KEY);
        navigate(ROUTES.AUTH.RESET_PASSWORD);
      }
    } catch (error) {
      console.error(error);
      const err = error as { data: { message: string } };
      form.setFields([
        {
          name: "otp",
          errors: [err.data.message],
        },
      ]);
    }
  };

  // ⏳ Load timer on mount
  useEffect(() => {
    const savedExpiry = localStorage.getItem(STORAGE_KEYS.OTP_EXPIRY_KEY);

    if (savedExpiry) {
      const expiryTime = parseInt(savedExpiry, 10);
      const now = Date.now();
      const remaining = Math.floor((expiryTime - now) / 1000);
      console.log(expiryTime, now, remaining);
      setSeconds(remaining > 0 ? remaining : 0);
    } else {
      const newExpiry = Date.now() + 120 * 1000;
      localStorage.setItem(STORAGE_KEYS.OTP_EXPIRY_KEY, newExpiry.toString());
      setSeconds(120);
    }
  }, []);

  useEffect(() => {
    if (seconds <= 0) return;

    const timer = setInterval(() => {
      setSeconds((prev) => prev - 1);
    }, 1000);
    return () => clearInterval(timer);
  }, [seconds]);

  const formatTime = (secs: number) => {
    const minutes = Math.floor(secs / 60);
    const remainingSeconds = secs % 60;
    return `${minutes}:${remainingSeconds < 10 ? "0" : ""}${remainingSeconds}`;
  };

  const handleResend = async () => {
    try {
      const email = Storage.getItem(STORAGE_KEYS.FORGOT_PASSWORD_EMAIL);

      const payload = {
        email,
        role: "user",
      };

      const res = await PostGlobalApi({
        url: URL_KEYS.AUTH.RESEND_OTP,
        data: payload,
      }).unwrap();

      if (res.status === HTTP_STATUS.OK) {
        const newExpiry = Date.now() + 120 * 1000;
        localStorage.setItem(STORAGE_KEYS.OTP_EXPIRY_KEY, newExpiry.toString());
        setSeconds(120);
      }
    } catch {}
  };

  return (
    <div className="min-h-screen bg-white relative flex">
      {/* Left Side Illustration */}
      <div className="hidden xl:flex xl:w-1/2 2xl:w-2/5 h-screen sticky top-0 z-10 overflow-hidden border-r border-gray-100">
        <img className="w-full" alt="Group" src={`${ImagePath}auth/VerifyOtp.jpg`} />
      </div>

      {/* Right Side Form (scrollable) */}
      <div className="flex xl:w-1/2 2xl:w-3/5 w-full h-screen overflow-y-auto justify-center items-center p-4 sm:p-8 lg:p-12 z-10">
        <div className="w-full max-w-md mx-auto space-y-8">
          {/* Header */}
          <header className="space-y-6 lg:space-y-8">
            <div className="space-y-3">
              <h2 className="font-bold text-2xl sm:text-3xl xl:text-3xl text-black text-center xl:text-left">Confirm your Number</h2>
              <p className="font-medium text-sm sm:text-base xl:text-sm text-black text-center xl:text-left opacity-80">Enter the 6-digit Verification Code</p>
            </div>
          </header>

          <span className="border-t border-primary flex w-full"></span>

          {/* Form */}
          <Form form={form} layout="vertical" onFinish={handleFormSubmit} initialValues={{ countryCode: "+91" }}>
            <Row gutter={24}>
              <Col span={24} className="text-center">
                <FormInput name="otp" type="otp" required />
              </Col>
              <Col span={24}>
                <span className="border-t border-primary flex w-full col-span-2 my-4" />
              </Col>
              <Col span={24}>
                {/* Footer */}
                <footer className="space-y-6 lg:space-y-8 col-span-2 mb-4">
                  <p className="text-center text-sm lg:text-base uppercase">
                    <span className="font-medium text-black">Didn’t get the code? </span>
                    {seconds > 0 ? <span className="font-bold text-primary">Resend in {formatTime(seconds)}</span> : <FormButton htmlType="button" text="Resend Code" onClick={handleResend} className="!border-none !bg-none !shadow-none !text-primary !font-bold !cursor-pointer hover:!underline " />}
                  </p>
                </footer>
              </Col>
              {/* Actions */}
              <Col span={24}>
                <Form.Item label={null} className="col-span-2 text-center">
                  <FormButton htmlType="submit" text="CONTINUE" className="custom-button button button--mimas w-full !h-auto" />
                </Form.Item>
              </Col>
            </Row>
          </Form>
        </div>
      </div>

      {/* Background decoration */}
      <div className="absolute z-0 bottom-0 right-0 ">
        <img src="/assets/images/auth/FormLines.png" alt="" />
      </div>
    </div>
  );
};

export default Verify;
