import { Col, Form, Row } from "antd";
import { NavLink, useNavigate } from "react-router-dom";
import { FormButton, FormInput } from "../../Attribute/FormFields";
import { HTTP_STATUS, ImagePath, ROUTES, STORAGE_KEYS, URL_KEYS } from "../../Constants";
import { usePostGlobalApiMutation } from "../../Api/CommonGlobalApi";
import type { LoginForm } from "../../Types";
import { Storage } from "../../Utils";

const ForgotPassword = () => {
  const [form] = Form.useForm();

  const navigate = useNavigate();

  const [PostGlobalApi] = usePostGlobalApiMutation({});

  const handleFormSubmit = async (values: LoginForm) => {
    try {
      const payload = {
        ...values,
        userType: "user",
      };
      console.log(values);
      const res = await PostGlobalApi({
        url: URL_KEYS.AUTH.FORGOT_PASSWORD,
        data: payload,
      }).unwrap();

      if (res?.status === HTTP_STATUS.OK) {
        Storage.setItem(STORAGE_KEYS.FORGOT_PASSWORD_EMAIL, values.uniqueId);
        navigate(ROUTES.AUTH.VERIFY_OTP);
      }
    } catch (error) {
      const err = error as { data: { message: string } };
      form.setFields([
        {
          name: "uniqueId",
          errors: [err.data.message],
        },
      ]);
    }
  };

  return (
    <div className="min-h-screen bg-white relative flex">
      {/* Left Side Illustration */}
      <div className="hidden xl:flex xl:w-1/2 2xl:w-2/5 h-screen sticky top-0 z-10 overflow-hidden border-r border-gray-100">
        <img className="w-full" alt="Group" src={`${ImagePath}auth/ForgotPassword.jpg`} />
      </div>

      {/* Right Side Form (scrollable) */}
      <div className="flex xl:w-1/2 2xl:w-3/5 w-full h-screen overflow-y-auto justify-center items-center p-4 sm:p-8 lg:p-12 z-10">
        <div className="w-full max-w-xl mx-auto space-y-8">
          {/* Header */}
          <header className="space-y-6 lg:space-y-8">
            <div className="space-y-3">
              <h2 className="font-bold text-2xl sm:text-3xl xl:text-3xl text-black text-center xl:text-left">Confirm your Email</h2>
              <p className="font-medium text-sm sm:text-base xl:text-sm text-black text-center xl:text-left opacity-80">Enter the code we sent to your email</p>
            </div>
          </header>

          <span className="border-t border-primary flex w-full"></span>

          {/* Form */}
          <Form form={form} layout="vertical" onFinish={handleFormSubmit} initialValues={{ countryCode: "+91" }}>
            <Row gutter={24}>
              <Col span={24} className="text-center">
                <FormInput name="uniqueId" label="Email" rules={[{ required: true, type: "email", message: "Invalid email" }]} />
              </Col>
              <Col span={24}>
                <span className="border-t border-primary flex w-full col-span-2 my-4" />
              </Col>
              <Col span={24}>
                <footer className="space-y-6 lg:space-y-8 col-span-2 mb-4">
                  <p className="text-center text-sm lg:text-base">
                    <span className="font-medium text-black">Already have an account? </span>
                    <NavLink to={ROUTES.AUTH.LOGIN} className="font-bold  cursor-pointer hover:underline !text-primary">
                      Login
                    </NavLink>
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

export default ForgotPassword;
