import { DatePicker, Form, Input, Select, Space, Button, Row, Col } from "antd";
import { NavLink } from "react-router-dom";

const { Option } = Select;

const Signup = () => {
  const [form] = Form.useForm();

  const handleFinish = (values: any) => {
    console.log("Form Values:", values);
  };

  return (
    <div className="min-h-screen bg-white relative flex">
      {/* Left Side Illustration */}
      <div className="hidden xl:flex xl:w-1/2 2xl:w-2/5 h-screen sticky top-0 z-10  overflow-hidden p-3">
        <div className="w-full p-4 sm:p-8 lg:p-15 relative bg-bg-light border-2 border-primary-light rounded-2xl overflow-hidden">
          <div className="z-20 text-center w-full flex flex-col gap-3">
            <h1 className="font-bold text-black text-xl sm:text-2xl xl:text-5xl 2xl:text-6xl leading-tight">
              Join Thousands <br /> of Learners
            </h1>
            <p className="font-medium text-xl leading-relaxed mx-auto">Access free tests, live classes & expert sessions.</p>
          </div>
          <img className="w-full absolute left-0 top-0" alt="Group" src="/assets/images/auth/VecrorGroup.png" />
          <figure className="absolute inset-x-0 bottom-2 flex justify-center">
            <img className="w-5/6 sm:w-2/3 md:w-1/2 lg:w-4/5 z-10" alt="Group" src="/assets/images/auth/Frame.png" />
          </figure>
          <img className="w-full absolute left-0 bottom-0" alt="Group" src="/assets/images/auth/OrangeFooter.png" />
        </div>
      </div>

      {/* Right Side Form (scrollable) */}
      <div className="flex-1 h-screen overflow-y-auto p-4 sm:p-8 lg:p-12 z-10">
        <div className="w-full max-w-4xl mx-auto space-y-8">
          {/* Header */}
          <header className="space-y-6 lg:space-y-8">
            <div className="space-y-3">
              <h2 className="font-bold text-2xl sm:text-3xl xl:text-3xl text-black text-center xl:text-left">Get Started Now</h2>
              <p className="font-medium text-sm sm:text-base xl:text-sm text-black text-center xl:text-left opacity-80">Create an account or explore about our website</p>
            </div>
          </header>

          <span className="border-t border-primary flex w-full"></span>

          {/* Form */}
          <Form form={form} layout="vertical" onFinish={handleFinish} initialValues={{ countryCode: "+91" }}>
            <Row gutter={16}>
              <Col span={24} md={{ span: 12 }}>
                <Form.Item name="firstName" label="First Name" rules={[{ required: true }]}>
                  <Input size="large" placeholder="First Name" />
                </Form.Item>
              </Col>
              <Col span={24} md={{ span: 12 }}>
                <Form.Item name="lastName" label="Last Name" rules={[{ required: true }]}>
                  <Input size="large" placeholder="Last Name" />
                </Form.Item>
              </Col>
              <Col span={24} md={{ span: 12 }}>
                <Form.Item name="email" label="Email" rules={[{ required: true, type: "email" }]}>
                  <Input size="large" placeholder="Email" />
                </Form.Item>
              </Col>
              <Col span={24} md={{ span: 12 }}>
                {/* Phone Number */}
                <Form.Item label="Phone Number" required>
                  <Space.Compact block size="large">
                    <Form.Item name="countryCode" noStyle rules={[{ required: true }]}>
                      <Select style={{ width: 100 }}>
                        <Option value="+91">+91</Option>
                        <Option value="+1">+1</Option>
                        <Option value="+44">+44</Option>
                      </Select>
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
                      <Input placeholder="Mobile Number" maxLength={10} />
                    </Form.Item>
                  </Space.Compact>
                </Form.Item>
              </Col>
              <Col span={24} md={{ span: 12 }}>
                <Form.Item name="gender" label="Gender">
                  <Select placeholder="Select gender" allowClear>
                    <Option value="male">Male</Option>
                    <Option value="female">Female</Option>
                    <Option value="other">Other</Option>
                  </Select>
                </Form.Item>
              </Col>
              <Col span={24} md={{ span: 12 }}>
                <Form.Item name="dob" label="Date of Birth">
                  <DatePicker className="w-full" />
                </Form.Item>
              </Col>
              <Col span={24} md={{ span: 12 }}>
                <Form.Item name="referralCode" label="Referral Code">
                  <Input size="large" placeholder="Referral Code" />
                </Form.Item>
              </Col>
              <Col span={24} md={{ span: 12 }}>
                <Form.Item name="city" label="City">
                  <Input size="large" placeholder="City" />
                </Form.Item>
              </Col>
              <Col span={24} md={{ span: 12 }}>
                <Form.Item name="upscNumber" label="attempt number UPSC" rules={[{ required: true }]}>
                  <Input size="large" placeholder="attempt number UPSC" />
                </Form.Item>
              </Col>
              <Col span={24} md={{ span: 12 }}>
                <Form.Item name="language" label="Language" rules={[{ required: true }]}>
                  <Select placeholder="Select language" allowClear>
                    <Option value="hindi">Hindi</Option>
                    <Option value="english">English</Option>
                  </Select>
                </Form.Item>
              </Col>
              <Col span={24} md={{ span: 12 }}>
                <Form.Item name="goal" label="Goal" rules={[{ required: true }]}>
                  <Select placeholder="Select goal" allowClear>
                    <Option value="ias">IAS</Option>
                    <Option value="ips">IPS</Option>
                    <Option value="ifs">IFS</Option>
                  </Select>
                </Form.Item>
              </Col>
              <Col span={24} md={{ span: 12 }}>
                <Form.Item name="examType" label="Exam Type" rules={[{ required: true }]}>
                  <Select placeholder="Select exam type" allowClear>
                    <Option value="prelims">Prelims</Option>
                    <Option value="mains">Mains</Option>
                    <Option value="interview">Interview</Option>
                  </Select>
                </Form.Item>
              </Col>
              <Col span={24}>
                <Form.Item name="civilServiceType" label="Civil Service Type" rules={[{ required: true }]}>
                  <Select placeholder="Select civil service type" allowClear>
                    <Option value="central">Central</Option>
                    <Option value="state">State</Option>
                  </Select>
                </Form.Item>
              </Col>
              <Col span={24}>
                <span className="border-t border-primary flex w-full col-span-2 my-4" />
              </Col>
              <Col span={24}>
                {/* Footer */}
                <footer className="space-y-6 lg:space-y-8 col-span-2 mb-4">
                  <p className="text-center text-sm lg:text-base">
                    <span className="font-medium text-black">Already have an account?</span>
                    <NavLink to="/" className="font-bold  cursor-pointer hover:underline !text-primary">
                      Login
                    </NavLink>
                  </p>
                </footer>
              </Col>
              {/* Actions */}
              <Col span={24}>
                <Form.Item label={null} className="col-span-2">
                  <Button type="primary" htmlType="submit" className="loginFormButton ">
                    SIGN UP NOW
                  </Button>
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

export default Signup;
