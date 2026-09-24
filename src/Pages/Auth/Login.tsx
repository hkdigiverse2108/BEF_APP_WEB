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
      <div className="w-full space-y-6 sm:space-y-8">
              {/* Header */}
              <div className="mb-8">
                <h1 className="font-heading text-3xl font-bold tracking-tight text-foreground text-center lg:text-left">Create an Account</h1>
                <p className="mt-3 text-sm leading-6 text-muted-foreground text-center lg:text-left">Create an account or log in to explore about our website</p>
              </div>

              <span className="h-px w-full bg-gradient-to-r from-primary to-accent"></span>

              <Form form={form} layout="vertical" onFinish={handleFormSubmit} className="space-y-8 lg:space-y-10">
                <Row gutter={16}>
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
                      label="password"
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
                    <footer className="mb-1">
                      <p className="text-end text-sm lg:text-base">
                        <NavLink to={ROUTES.AUTH.FORGOT_PASSWORD} className="font-semibold cursor-pointer hover:!underline !text-primary">
                          Forgot password ?
                        </NavLink>
                      </p>
                    </footer>
                  </Col>
                  <span className="h-px w-full bg-gradient-to-r from-primary to-accent my-4" />
                  <Col span={24}>
                    <footer className="space-y-6 lg:space-y-8 mb-4">
                      <p className="text-center text-sm lg:text-base">
                        <span className="font-medium text-foreground">ARE YOU NEW HERE ? </span>
                        <NavLink to={ROUTES.AUTH.REGISTER} className="font-semibold cursor-pointer hover:!underline !text-primary">
                          SIGN UP
                        </NavLink>
                      </p>
                    </footer>
                  </Col>
                  <Col span={24}>
                    <Form.Item label={null} className="col-span-2 text-center">
                      <FormButton loading={isLoading} htmlType="submit" text="LOGIN" className="bef-btn-primary w-full uppercase" />
                      {/* <button
  className="w-full group relative px-10 py-3 rounded-full font-semibold text-white overflow-hidden
              bg-gradient-to-r from-[#124699] to-green-600
              shadow-md transition-all duration-500 ease-out
               hover:shadow-[0_0_25px_rgba(18,70,153,0.4)]"
 >
   <span className="relative z-10 transition-transform duration-500 group-hover:translate-y-[-2px]">
     NEXT
   </span>
   <span
     className="absolute inset-0 bg-gradient-to-r from-green-600 to-[#124699] 
               opacity-0 group-hover:opacity-100 transition-opacity duration-500 ease-out"
  ></span>
</button> */}
                    </Form.Item>
                  </Col>
                </Row>
              </Form>
      </div>
    </AuthLayout>
  );
};

export default Login;
