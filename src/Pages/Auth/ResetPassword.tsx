import { Button, Col, Form, Row } from "antd";
import { NavLink, useNavigate } from "react-router-dom";
import { FormButton, FormInput } from "../../Attribute/FormFields";
import { usePostGlobalApiMutation } from "../../Api/CommonGlobalApi";
import type { LoginForm } from "../../Types";
import { HTTP_STATUS, ROUTES, STORAGE_KEYS, URL_KEYS } from "../../Constants";
import { Storage } from "../../Utils";

const ResetPassword = () => {
  const [form] = Form.useForm();

  const navigate = useNavigate();

  const [PostGlobalApi] = usePostGlobalApiMutation({});

  const handleFormSubmit = async (values: LoginForm) => {
    try {
      const uniqueId = Storage.getItem(STORAGE_KEYS.FORGOT_PASSWORD_EMAIL);

      const payload = {
        ...values,
        uniqueId,
        userType: "user",
      };

      const res = await PostGlobalApi({
        url: URL_KEYS.AUTH.RESET_PASSWORD,
        data: payload,
      }).unwrap();

      if (res?.status === HTTP_STATUS.OK) {
        Storage.removeItem(STORAGE_KEYS.FORGOT_PASSWORD_EMAIL);
        navigate(ROUTES.AUTH.LOGIN);
      }
    } catch (error) {
      const err = error as { data: { message: string } };
      console.error("error from forgot :", err.data.message);
    }
  };

  return (
    <div className="min-h-screen bg-white relative flex">
      {/* Left Side Illustration */}
      <div className="hidden xl:flex xl:w-1/2 2xl:w-2/5 h-screen sticky top-0 z-10  overflow-hidden p-3">
        <div className="w-full p-4 sm:p-8 lg:p-15 relative bg-bg-light border-2 border-primary-light rounded-2xl overflow-hidden">
          <div className="z-20 text-center w-full flex flex-col gap-3">
            <h1 className="font-bold text-black text-xl sm:text-2xl xl:text-5xl 2xl:text-6xl leading-tight">
              Pick up your
              <br />
              Quiz again
            </h1>
            <p className="font-medium text-xl leading-relaxed mx-auto">
              Continue your learning journey.
            </p>
          </div>
          <img
            className="w-full absolute left-0 top-0"
            alt="Group"
            src="/assets/images/auth/VecrorGroup.png"
          />
          <figure className="absolute inset-x-0 bottom-20 flex justify-center">
            <img
              className="w-5/6 sm:w-2/3 md:w-1/2 lg:w-3/5 z-10"
              alt="Group"
              src="/assets/images/auth/Verify.png"
            />
          </figure>
          <img
            className="w-full absolute left-0 bottom-0"
            alt="Group"
            src="/assets/images/auth/OrangeFooter.png"
          />
        </div>
      </div>

      {/* Right Side Form (scrollable) */}
      <div className="flex xl:w-1/2 2xl:w-3/5 w-full h-screen overflow-y-auto justify-center items-center p-4 sm:p-8 lg:p-12 z-10">
        <div className="w-full max-w-xl mx-auto space-y-8">
          {/* Header */}
          <header className="space-y-6 lg:space-y-8">
            <div className="space-y-3">
              <h2 className="font-bold text-2xl sm:text-3xl xl:text-3xl text-black text-center xl:text-left">
                Confirm your Email
              </h2>
              <p className="font-medium text-sm sm:text-base xl:text-sm text-black text-center xl:text-left opacity-80">
                Enter the 6-digit Verification Code
              </p>
            </div>
          </header>

          <span className="border-t border-primary flex w-full"></span>

          {/* Form */}
          <Form
            form={form}
            layout="vertical"
            onFinish={handleFormSubmit}
            initialValues={{ countryCode: "+91" }}
          >
            <Row gutter={24}>
              <Col span={24} className="text-center">
                <FormInput
                  name="password"
                  label="New Password"
                  rules={[{ required: true }]}
                />
              </Col>
              <Col span={24}>
                <span className="border-t border-primary flex w-full col-span-2 my-4" />
              </Col>
              <Col span={24}>
                {/* Footer */}
                <footer className="space-y-6 lg:space-y-8 col-span-2 mb-4">
                  <p className="text-center text-sm lg:text-base">
                    <span className="font-medium text-black">
                      Already have an account?{" "}
                    </span>
                    <NavLink
                      to="/"
                      className="font-bold  cursor-pointer hover:underline !text-primary"
                    >
                      Login
                    </NavLink>
                  </p>
                </footer>
              </Col>
              {/* Actions */}
              <Col span={24}>
                <Form.Item label={null} className="col-span-2 text-center">
                  <FormButton
                    htmlType="submit"
                    text="CONTINUE"
                    className="custom-button button button--mimas w-full !h-auto"
                  />             
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

export default ResetPassword;
