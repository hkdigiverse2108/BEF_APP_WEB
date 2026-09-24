import { Col, Form, Row } from "antd";
import { useNavigate } from "react-router-dom";
import { FormButton, FormInput } from "../../Attribute/FormFields";
import { usePostGlobalApiMutation } from "../../Api/CommonGlobalApi";
import type { LoginForm } from "../../Types";
import {
  HTTP_STATUS,
  ImagePath,
  ROUTES,
  STORAGE_KEYS,
  URL_KEYS,
} from "../../Constants";
import AuthLayout from "../../Components/Common/AuthLayout";
import { useEffect, useState } from "react";
import { Storage } from "../../Utils";

const Verify = () => {
  const [form] = Form.useForm();

  const [seconds, setSeconds] = useState(120);

  const navigate = useNavigate();

  const [PostGlobalApi, { isLoading: isPostApiLoading }] =
    usePostGlobalApiMutation({});

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
    <AuthLayout image={`${ImagePath}auth/VerifyOtp.jpg`}>
      <div className="w-full space-y-6 sm:space-y-8">
          {/* Header */}
          <div className="mb-8">
            <h1 className="font-heading text-3xl font-bold tracking-tight text-foreground text-center lg:text-left">
              Confirm your Number
            </h1>
            <p className="mt-3 text-sm leading-6 text-muted-foreground text-center lg:text-left">
              Enter the 6-digit Verification Code
            </p>
          </div>

          <span className="h-px w-full bg-gradient-to-r from-primary to-accent"></span>

          {/* Form */}
          <Form
            form={form}
            layout="vertical"
            onFinish={handleFormSubmit}
            initialValues={{ countryCode: "+91" }}
          >
            <Row gutter={24}>
              <Col span={24} className="text-center">
                <FormInput name="otp" type="otp" required />
              </Col>
              <Col span={24}>
                <span className="h-px w-full bg-gradient-to-r from-primary to-accent col-span-2 my-4" />
              </Col>
              <Col span={24}>
                {/* Footer */}
                <footer className="space-y-6 lg:space-y-8 col-span-2 mb-4">
                  <p className="text-center text-sm lg:text-base uppercase">
                    <span className="font-medium text-foreground">
                      Didn’t get the code?{" "}
                    </span>
                    {seconds > 0 ? (
                      <span className="font-bold text-primary">
                        Resend in {formatTime(seconds)}
                      </span>
                    ) : (
                      <FormButton
                        htmlType="button"
                        text="Resend Code"
                        onClick={handleResend}
                        className="!border-none !bg-none !shadow-none !text-primary !font-bold !cursor-pointer hover:!underline "
                      />
                    )}
                  </p>
                </footer>
              </Col>
              {/* Actions */}
              <Col span={24}>
                <Form.Item label={null} className="col-span-2 text-center">
                  <FormButton
                    loading={isPostApiLoading}
                    htmlType="submit"
                    text="CONTINUE"
                    className="bef-btn-primary w-full uppercase"
                  />
                </Form.Item>
              </Col>
            </Row>
          </Form>
        </div>

    </AuthLayout>
  );
};

export default Verify;
