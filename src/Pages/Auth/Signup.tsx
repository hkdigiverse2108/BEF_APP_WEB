import { Col, Form, Input, Row, Space } from "antd";
import { NavLink } from "react-router-dom";
import { FormDatePicker, FormInput, FormSelect } from "../../Attribute/FormFields";
import { GenderOptions, LanguageOptions } from "../../Data";
import { PhoneInput } from "react-international-phone";
import { usePostGlobalApiMutation } from "../../Api/CommonGlobalApi";
import { URL_KEYS } from "../../Constants";
import { RemoveEmptyFields } from "../../Utils";

const Signup = () => {
  const [form] = Form.useForm();

  const [PostGlobalApi] = usePostGlobalApiMutation({});

  const handleFormSubmit = async (values: any) => {
    try {
      let payload = {
        ...values,
        dob: values?.dob ? values?.dob.format("YYYY-MM-DD") : null,
        examTypeId: [values?.examTypeId]
      }
      payload = RemoveEmptyFields(payload)
      await PostGlobalApi({
        url: URL_KEYS.AUTH.REGISTER,
        data: payload,
      }).unwrap()

      console.log("Form Values:", values, payload);
    } catch (error) {
      console.error(error)
    }


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
          <Form form={form} layout="vertical" onFinish={handleFormSubmit} initialValues={{ countryCode: "+91" }} className="form-submit">
            <Row gutter={16}>
              <Col span={24} md={{ span: 12 }}>
                <FormInput name="firstName" label="First Name" required />
              </Col>
              <Col span={24} md={12}>
                <FormInput name="lastName" label="Last Name" required />
              </Col>
              <Col span={24} md={12}>
                <FormInput name="email" label="Email" rules={[{ required: true, type: "email", message: "Invalid email" }]} />
              </Col>
              <Col span={24} md={{ span: 12 }}>
                {/* Phone Number */}
                <Form.Item label="Phone Number" required>
                  <Space.Compact block size="large">
                    {/* Nested countryCode inside contact */}
                    <Form.Item
                      name={["contact", "countryCode"]}
                      noStyle
                      rules={[{ required: true, message: "Please select country code" }]}
                    >
                      <PhoneInput
                        defaultCountry="in"
                        value={form.getFieldValue("countryCode")}
                        onChange={(phone, { country }) => {
                          form.setFieldsValue({ countryCode: `+${country.dialCode}` });
                        }}
                        className="w-[130px] p-2 border border-gray-300 rounded-s-lg bg-input-box"
                      />
                    </Form.Item>

                    {/* Nested mobile inside contact */}
                    <Form.Item
                      name={["contact", "mobile"]}
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
              </Col>
              <Col span={24} md={12} >
                <FormInput name="password" label="password" type="password" rules={[{ required: true, min: 6, message: "Password must be at least 6 characters" }]} />
              </Col>
              <Col span={24} md={12}>
                <FormSelect name="gender" label="Gender" options={GenderOptions} />
              </Col>
              <Col span={24} md={12}>
                <FormDatePicker name="dob" label="Date of Birth" />
              </Col>
              <Col span={24} md={12}>
                <FormInput name="referralCode" label="Referral Code" />
              </Col>
              <Col span={24} md={12}>
                <FormInput name="city" label="City" />
              </Col>
              <Col span={24} md={12}>
                <FormInput name="upscNumber" label="Attempt number UPSC" required />
              </Col>
              <Col span={24} md={12}>
                <FormSelect name="language" label="Language" required options={LanguageOptions} />
              </Col>

              <Col span={24} md={12}>
                <FormSelect
                  name="examTypeId"
                  label="Exam Type"
                  required
                  options={[
                    { label: "Prelims", value: "prelims" },
                    { label: "Mains", value: "mains" },
                    { label: "Interview", value: "interview" },
                  ]}
                />
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
                <Form.Item label={null} className="col-span-2 text-center">
                  <button className="button button--mimas w-full sm:w-[50%]">
                    <span>SIGN UP NOW</span>
                  </button>
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
