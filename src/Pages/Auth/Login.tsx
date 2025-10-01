import { Button, Form, Input, Space } from "antd";
import { NavLink } from "react-router-dom";
import type { LoginForm } from "../../Types";
import { useLoginMutation } from "../../Api/AuthApi";
import { usePostApiMutation } from "../../Api/CommonApi";
import { URL_KEYS } from "../../Constants";
import "react-international-phone/style.css"; // <-- required styles
import { PhoneInput } from 'react-international-phone';


const Login = () => {
  const [form] = Form.useForm();


  const [login] = useLoginMutation({});
  const [PostApi] = usePostApiMutation({});

  const handleFormSubmit = async (values: LoginForm) => {
    try {
      const payload = {
        ...values,
        userType: "user",
      };
      const test = await PostApi({
        url: URL_KEYS.AUTH.LOGIN,
        data: payload,
      }).unwrap();
      console.log("form submitted",test,payload);

    } catch (error) { }
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
              <p className="font-medium text-xl leading-relaxed mx-auto">
                Track your progress, get instant performance insights.
              </p>
            </div>
            <img
              className="w-full absolute left-0 top-0"
              alt="Group"
              src="/assets/images/auth/VecrorGroup.png"
            />
            <figure className="absolute inset-x-0 bottom-40 flex justify-center">
              <img
                className="w-5/6 sm:w-2/3 md:w-1/2 lg:w-3/5 z-10"
                alt="Group"
                src="/assets/images/auth/LoginVectorBox.png"
              />
            </figure>
            <img
              className="w-full absolute left-0 bottom-0"
              alt="Group"
              src="/assets/images/auth/OrangeFooter.png"
            />
          </div>
        </div>

        {/* Right side */}
        <div className="z-10 xl:w-1/2 2xl:w-3/5 w-full h-screen">
          <div className="flex flex-col w-full h-full items-center justify-center p-4 sm:p-8 lg:p-12">
            <div className="w-full max-w-md space-y-8">
              {/* Header */}
              <header className="space-y-6 lg:space-y-8">
                <div className="space-y-3">
                  <h2 className="font-bold text-2xl sm:text-3xl xl:text-3xl text-black text-center lg:text-left">
                    Create an Account
                  </h2>
                  <p className="font-medium text-sm sm:text-base xl:text-sm text-black text-center lg:text-left opacity-80">
                    Create an account or log in to explore about our website
                  </p>
                </div>
              </header>

              <span className="border-t border-primary flex w-full"></span>

              <Form
                form={form}
                layout="vertical"
                onFinish={handleFormSubmit}
                className="loginForm space-y-8 lg:space-y-10"
                initialValues={{
                  phoneNumber: "",
                  countryCode: "ua", // default value
                }}
              >
                {/* Phone Number */}
                <Form.Item
                  label="PHONE NUMBER"
                  className="LoginNumberSelect"
                  required
                >
                  <Space.Compact block size="large">
                    {/* Country Code */}
                    <Form.Item name="countryCode" noStyle rules={[{ required: true, message: "Please select country code" }]}>
                      <PhoneInput defaultCountry="IN" value={form.getFieldValue("countryCode")} onChange={(phone, { country }) => {
                        form.setFieldsValue({ countryCode: `+${country.dialCode}` });
                      }}
                        className="w-[120px] px-2 py-1 border border-gray-300 rounded-md"
                      />
                    </Form.Item>
                    {/* Phone Number */}
                    <Form.Item
                      name="phoneNumber"
                      noStyle
                      rules={[
                        { required: true, message: "Please enter your phone number" },
                        { len: 10, message: "Phone number must be 10 digits" },
                        { pattern: /^\d+$/, message: "Phone number must contain only numbers" },
                      ]}
                    >
                      <Input
                        placeholder="Mobile Number"
                        maxLength={10}
                        inputMode="numeric"
                        pattern="[0-9]*"
                      />
                    </Form.Item>
                  </Space.Compact>
                </Form.Item>

                {/* Password */}
                <Form.Item
                  name="password"
                  label="PASSWORD"
                  rules={[{ required: true, min: 6, message: "Password must be at least 6 characters" }]}
                >
                  <Input.Password size="large" placeholder="Password" />
                </Form.Item>

                <span className="border-t border-primary flex w-full"></span>

                {/* Footer */}
                <footer className="space-y-6 lg:space-y-8">
                  <p className="text-center text-sm lg:text-base">
                    <span className="font-medium text-black">ARE YOU NEW HERE? </span>
                    <NavLink
                      to="/"
                      className="font-bold cursor-pointer hover:!underline !text-primary"
                    >
                      SIGN UP
                    </NavLink>
                  </p>
                </footer>

                {/* Submit Button */}
                <Form.Item label={null}>
                  <Button type="primary" htmlType="submit" className="loginFormButton">
                    LOGIN
                  </Button>
                </Form.Item>
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
