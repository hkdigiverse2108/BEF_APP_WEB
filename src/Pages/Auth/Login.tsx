import { Col, Form, Row } from "antd";
import "react-international-phone/style.css";
import { NavLink, useLocation } from "react-router-dom";
import { FormButton, FormInput } from "../../Attribute/FormFields";
import AuthLayout from "../../Components/Common/AuthLayout";
import { ImagePath, ROUTES, URL_KEYS } from "../../Constants";
import type { LoginForm } from "../../Types";
import { usePostGlobalApiMutation } from "../../Api/CommonGlobalApi";
import { useAppDispatch } from "../../Store/hooks";
import { SetUser } from "../../Store/Slices/AuthSlice";
import { useEffect } from "react";

const Login = () => {
  const [form] = Form.useForm();

  const dispatch = useAppDispatch();
  const location = useLocation();
  const queryParam = new URLSearchParams(location.search);
  const email = queryParam.get("email");
  const password = queryParam.get("password");

  const [PostGlobalApi, { isLoading }] = usePostGlobalApiMutation({});

  const handleFormSubmit = async (values: LoginForm) => {
    try {
      const payload = {
        ...values,
        userType: "user",
        uniqueId: values.uniqueId.toLowerCase(),
      };
      const res = await PostGlobalApi({
        url: URL_KEYS.AUTH.LOGIN,
        data: payload,
      }).unwrap();
      dispatch(SetUser(res?.data));
    } catch (error) {
      console.error(error);
      const err = error as { data: { message: string } };
      form.setFields([
        {
          name: "password",
          errors: [err.data.message],
        },
      ]);
    }
  };

  useEffect(() => {
    if (email && password) {
      form.setFieldsValue({ uniqueId: email, password: password });
    }
  }, [email, form, password]);

  return (
    <AuthLayout image={`${ImagePath}auth/login.jpg`}>
      <div className="w-full space-y-3 sm:space-y-4">
        {/* Header */}
        <div className="mb-2 sm:mb-4">
          <h1 className="font-heading text-2xl sm:text-3xl font-bold tracking-tight text-foreground text-center lg:text-left">Welcome Back</h1>
          <p className="mt-1 text-xs sm:text-sm text-muted-foreground text-center lg:text-left">Log in to explore your courses and tests</p>
        </div>

        <div className="h-px w-full bg-gradient-to-r from-primary to-accent" />

        <Form form={form} layout="vertical" onFinish={handleFormSubmit} className="space-y-2 sm:space-y-3">
          <Row gutter={[16, 4]}>
            <Col span={24}>
              <FormInput
                name="uniqueId"
                label="Email"
                rules={[
                  {
                    required: true,
                    type: "email",
                    message: "Invalid email",
                  },
                ]}
              />
            </Col>
            <Col span={24}>
              <FormInput
                name="password"
                label="Password"
                type="password"
                rules={[
                  {
                    required: true,
                    min: 6,
                    message: "Password must be at least 6 characters",
                  },
                ]}
              />
            </Col>
            <Col span={24}>
              <footer className="mb-0">
                <p className="text-end text-xs sm:text-sm">
                  <NavLink to={ROUTES.AUTH.FORGOT_PASSWORD} className="font-semibold cursor-pointer hover:!underline !text-primary">
                    Forgot password ?
                  </NavLink>
                </p>
              </footer>
            </Col>
            <Col span={24}>
              <div className="h-px w-full bg-gradient-to-r from-primary to-accent my-2" />
            </Col>
            <Col span={24}>
              <footer className="my-1">
                <p className="text-center text-xs sm:text-sm">
                  <span className="font-medium text-foreground">ARE YOU NEW HERE ? </span>
                  <NavLink to={ROUTES.AUTH.REGISTER} className="font-semibold cursor-pointer hover:!underline !text-primary">
                    SIGN UP
                  </NavLink>
                </p>
              </footer>
            </Col>
            <Col span={24}>
              <Form.Item label={null} className="col-span-2 text-center mb-0 mt-1">
                <FormButton loading={isLoading} htmlType="submit" text="LOGIN" className="bef-btn-primary w-full uppercase !h-11 sm:!h-12 !rounded-xl font-bold" />
              </Form.Item>
            </Col>
          </Row>
        </Form>
      </div>
    </AuthLayout>
  );
};

export default Login;
