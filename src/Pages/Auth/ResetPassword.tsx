import { Col, Form, Row } from "antd";
import { NavLink, useNavigate } from "react-router-dom";
import { FormButton, FormInput } from "../../Attribute/FormFields";
import AuthLayout from "../../Components/Common/AuthLayout";
import { usePostGlobalApiMutation } from "../../Api/CommonGlobalApi";
import type { LoginForm } from "../../Types";
import {
  HTTP_STATUS,
  ImagePath,
  ROUTES,
  STORAGE_KEYS,
  URL_KEYS,
} from "../../Constants";
import { Storage } from "../../Utils";

const ResetPassword = () => {
  const [form] = Form.useForm();

  const navigate = useNavigate();

  const [PostGlobalApi, { isLoading: isPostApiLoading }] =
    usePostGlobalApiMutation({});

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
    <AuthLayout image={`${ImagePath}auth/ResetPassword.jpg`}>
      <div className="w-full space-y-6 sm:space-y-8">
          {/* Header */}
          <div className="mb-8">
            <h1 className="font-heading text-3xl font-bold tracking-tight text-foreground text-center lg:text-left">
              Confirm your Email
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
                <FormInput
                  name="password"
                  label="New Password"
                  rules={[{ required: true }]}
                />
              </Col>
              <Col span={24}>
                <span className="h-px w-full bg-gradient-to-r from-primary to-accent col-span-2 my-4" />
              </Col>
              <Col span={24}>
                {/* Footer */}
                <footer className="space-y-6 lg:space-y-8 col-span-2 mb-4">
                  <p className="text-center text-sm lg:text-base">
                    <span className="font-medium text-foreground">
                      Already have an account?{" "}
                    </span>
                    <NavLink
                      to="/"
                      className="font-semibold  cursor-pointer hover:underline !text-primary"
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

export default ResetPassword;
