import { DatePicker, Form, Input, Select, Space } from "antd";
const { Item } = Form;
const Signup = () => {
  const [form] = Form.useForm();

  const { Option } = Select;
  const handleFinish = () => {
    // TODO: integrate submit
  };
  return (
    <>
      <div className="min-h-screen bg-white relative overflow-hidden flex justify-center items-center">
        <div className="flex justify-between h-screen items-center w-full p-3">
          <div className="relative hidden xl:block xl:w-1/2 2xl:w-2/5 w-full  h-full z-10 bg-bg-light border-2 border-primary-light rounded-2xl overflow-hidden">
            <div className="w-full p-4 sm:p-8 lg:p-15">
              <div className="z-20 text-center w-full 2xl:top-14 flex flex-col gap-3 ">
                <h1 className="font-bold text-[#060606] text-xl sm:text-2xl xl:text-5xl 2xl:text-6xl leading-tight">
                  Join Thousands
                  <br />
                  of Learners
                </h1>
                <p className="font-medium text-xl leading-relaxed mx-auto">Access free tests, live classes & expert sessions.</p>
              </div>
              <img className="w-full absolute left-0 top-0 " alt="Group" src="/assets/images/auth/VecrorGroup.png" />
              <figure className="absolute inset-x-0 bottom-2 flex justify-center">
                <img className="w-5/6 sm:w-2/3 md:w-1/2 lg:w-4/5 z-10" alt="Group" src="/assets/images/auth/Frame.png" />
              </figure>
              <img className="w-full absolute left-0 bottom-0" alt="Group" src="/assets/images/auth/OrangeFooter.png" />
            </div>
          </div>
          <div className="z-10 xl:w-1/2 2xl:w-3/5 w-full h-screen">
            <div className="flex flex-col w-full h-full items-center justify-center p-4 sm:p-8 lg:p-12">
              <div className="w-full max-w-4xl space-y-8">
                {/* Header */}
                <header className="space-y-6 lg:space-y-8">
                  <div className="space-y-3">
                    <h2 className="font-bold text-2xl sm:text-3xl xl:text-3xl text-[#060606] text-center lg:text-left">Get Started Now</h2>
                    <p className="font-medium text-sm sm:text-base xl:text-sm text-[#060606] text-center lg:text-left opacity-80">Create an account or explore about our website</p>
                  </div>
                </header>
                <span className="border-t border-[#fe690b] flex w-full "></span>
                <Form
                  form={form}
                  layout="vertical"
                  onFinish={handleFinish}
                  className="loginForm grid grid-cols-1 md:grid-cols-2 gap-3 lg:gap-4"
                  initialValues={{
                    countryCode: "+91",
                  }}
                >
                  <Item name="first name" label="First Name" rules={[{ required: true }]}>
                    <Input size="large" placeholder="First Name" />
                  </Item>
                  <Item name="last name" label="Last Name" rules={[{ required: true }]}>
                    <Input size="large" placeholder="Last Name" />
                  </Item>
                  <Form.Item name="gender" label="Gender" rules={[{ required: true }]}>
                    <Select placeholder="Select a option" allowClear>
                      <Option value="male">male</Option>
                      <Option value="female">female</Option>
                      <Option value="other">other</Option>
                    </Select>
                  </Form.Item>
                  <Item name="email" label="email" rules={[{ required: true }]}>
                    <Input size="large" placeholder="email" />
                  </Item>
                  <Item name="date-picker" label="DatePicker" >
                    <DatePicker />
                  </Item>
                  <Form.Item label="PHONE NUMBER" required>
                    <Space.Compact block size="large">
                      <Form.Item name="countryCode" noStyle rules={[{ required: true }]}>
                        <Select
                          style={{ width: 100 }}
                          options={[
                            { value: "+91", label: "+91" },
                            { value: "+1", label: "+1" },
                            { value: "+44", label: "+44" },
                          ]}
                        />
                      </Form.Item>
                      <Form.Item
                        name="phoneNumber"
                        noStyle
                        rules={[
                          { required: true, message: "Please enter your phone number" },
                          { len: 10, message: "Phone number must be 10 digits" },
                          { pattern: /^\d+$/, message: "Phone number must contain only numbers" },
                        ]}
                      >
                        <Input placeholder="Mobile Number" maxLength={10} inputMode="numeric" pattern="[0-9]*" />
                      </Form.Item>
                    </Space.Compact>
                  </Form.Item>
                  <Item name="password" label="PASSWORD" rules={[{ required: true, min: 6 }]}>
                    <Input.Password size="large" placeholder="Password" />
                  </Item>
                  <Item name="password" label="PASSWORD" rules={[{ required: true, min: 6 }]}>
                    <Input.Password size="large" placeholder="Password" />
                  </Item>
                </Form>
                <span className="border-t border-[#fe690b] flex w-full "></span>
                {/* Footer */}
                <footer className="space-y-6 lg:space-y-8">
                  <p className="text-center text-sm lg:text-base">
                    <span className="font-medium text-[#060606]">ARE YOU NEW HERE? </span>
                    <span className="font-bold text-[#fe690b] cursor-pointer hover:underline">SIGN UP</span>
                  </p>
                </footer>
                {/* Actions */}
                <div className="w-full flex justify-center">
                  <button type="button" className="loginFormButton ">
                    LOGIN
                  </button>
                </div>
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
    </>
  );
};
export default Signup;
