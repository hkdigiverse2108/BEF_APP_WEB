import { Col, Form, Row } from "antd";
import "react-international-phone/style.css";
import { NavLink } from "react-router-dom";
import { FormButton, FormInput } from "../../Attribute/FormFields";
import { ROUTES, URL_KEYS } from "../../Constants";
import type { LoginForm } from "../../Types";
import { usePostGlobalApiMutation } from "../../Api/CommonGlobalApi";
import { useAppDispatch } from "../../Store/hooks";
import { SetUser } from "../../Store/Slices/AuthSlice";

const Login = () => {
  const [form] = Form.useForm();

  const dispatch = useAppDispatch();

  const [PostGlobalApi] = usePostGlobalApiMutation({});

  const handleFormSubmit = async (values: LoginForm) => {
    try {
      const payload = {
        ...values,
        userType: "user",
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

  return (
    <div className="min-h-screen bg-white relative overflow-hidden flex justify-center items-center">
      <div className="flex justify-between h-screen items-center w-full p-3">
        {/* Left side */}
        <div className="relative hidden xl:block xl:w-1/2 2xl:w-2/5 w-full h-full z-10 bg-bg-light border-2 border-primary-light rounded-2xl overflow-hidden">
          <div className="w-full p-4 sm:p-8 lg:p-12 ">
            <div className="z-20 text-center w-full 2xl:top-14 flex flex-col gap-3 ">
              <h1 className="font-bold text-black text-xl sm:text-2xl xl:text-5xl 2xl:text-6xl leading-tight">
                Our Learning
                <br />
                Dashboard
              </h1>
              <p className="font-medium text-xl leading-relaxed mx-auto">Track your progress, get instant performance insights.</p>
            </div>
            <img className="w-full absolute left-0 top-0" alt="Group" src="/assets/images/auth/VecrorGroup.png" />
            <figure className="absolute inset-x-0 bottom-40 flex justify-center">
              <img className="w-5/6 sm:w-2/3 md:w-1/2 lg:w-3/5 z-10" alt="Group" src="/assets/images/auth/LoginVectorBox.png" />
            </figure>
            <img className="w-full absolute left-0 bottom-0" alt="Group" src="/assets/images/auth/OrangeFooter.png" />
          </div>
        </div>

        {/* Right side */}
        <div className="z-10 xl:w-1/2 2xl:w-3/5 w-full h-screen">
          <div className="flex flex-col w-full h-full items-center justify-center p-4 sm:p-8 lg:p-12">
            <div className="w-full max-w-xl space-y-8">
              {/* Header */}
              <header className="space-y-6 lg:space-y-8">
                <div className="space-y-3">
                  <h2 className="font-bold text-2xl sm:text-3xl xl:text-3xl text-black text-center xl:text-left">Create an Account</h2>
                  <p className="font-medium text-sm sm:text-base xl:text-sm text-black text-center xl:text-left opacity-80">Create an account or log in to explore about our website</p>
                </div>
              </header>

              <span className="border-t border-primary flex w-full"></span>

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
                        <NavLink to={ROUTES.AUTH.FORGOT_PASSWORD} className="font-bold cursor-pointer hover:!underline !text-primary">
                          Forgot password ?
                        </NavLink>
                      </p>
                    </footer>
                  </Col>
                  <span className="border-t border-primary flex w-full my-4" />
                  <Col span={24}>
                    <footer className="space-y-6 lg:space-y-8 mb-4">
                      <p className="text-center text-sm lg:text-base">
                        <span className="font-medium text-black">ARE YOU NEW HERE ? </span>
                        <NavLink to={ROUTES.AUTH.REGISTER} className="font-bold cursor-pointer hover:!underline !text-primary">
                          SIGN UP
                        </NavLink>
                      </p>
                    </footer>
                  </Col>
                  <Col span={24}>
                    <Form.Item label={null} className="col-span-2 text-center">
                      <FormButton htmlType="submit" text="LOGIN" className="custom-button button button--mimas w-full !h-auto" />
                     {/* <button
  className="w-full group relative px-10 py-3 rounded-full font-semibold text-white overflow-hidden
             bg-gradient-to-r from-orange-500 to-green-600
             shadow-md transition-all duration-500 ease-out
              hover:shadow-[0_0_25px_rgba(255,128,0,0.4)]"
>
  <span className="relative z-10 transition-transform duration-500 group-hover:translate-y-[-2px]">
    NEXT
  </span>
  <span
    className="absolute inset-0 bg-gradient-to-r from-green-600 to-orange-500 
               opacity-0 group-hover:opacity-100 transition-opacity duration-500 ease-out"
  ></span>
</button> */}

                    </Form.Item>
                  </Col>
                </Row>
              </Form>
            </div>
          </div>
        </div>

        <div className="absolute z-0 bottom-0 right-0">
          <figure>
            <img src="/assets/images/auth/FormLines.png" alt="" />
          </figure>
        </div>
      </div>
    </div>
  );
};

export default Login;
