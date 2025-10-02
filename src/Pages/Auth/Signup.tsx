import { Col, Form, Input, Row, Space, Steps } from "antd";
import { useState } from "react";
import { PhoneInput } from "react-international-phone";
import { NavLink } from "react-router-dom";
import { FormDatePicker, FormInput, FormSelect } from "../../Attribute/FormFields";
import { useGetGlobalApiQuery, usePostGlobalApiMutation } from "../../Api/CommonGlobalApi";
import { URL_KEYS } from "../../Constants";
import { GenderOptions, LanguageOptions } from "../../Data";
import { RemoveEmptyFields } from "../../Utils";
import { useAppDispatch } from "../../Store/hooks";
import { SetUser } from "../../Store/Slices/AuthSlice";

const Signup = () => {
  const [form] = Form.useForm();
  const [current, setCurrent] = useState(0);

  const dispatch = useAppDispatch()


  const [PostGlobalApi] = usePostGlobalApiMutation({});

  const { data: examTypeApi } = useGetGlobalApiQuery({ url: URL_KEYS.EXAM_TYPE.EXAM_TYPE })
  let examTypeData = examTypeApi?.data

  const handleFormSubmit = async (values: any) => {
    try {
      let payload = {
        ...values,
        dob: values?.dob ? values?.dob.format("YYYY-MM-DD") : null,
        examTypeId: [values?.examTypeId]
      }
      payload = RemoveEmptyFields(payload)
      const res = await PostGlobalApi({
        url: URL_KEYS.AUTH.REGISTER,
        data: payload,
      }).unwrap()
      dispatch(SetUser(res?.data))
    } catch (error) {
      console.error(error);
    }
  };

  const next = async () => {
    try {
      await form.validateFields(steps[current].fields);
      setCurrent((prev) => prev + 1);
    } catch (e) {
      console.log("Validation failed:", e);
    }
  };

  const prev = () => setCurrent((prev) => prev - 1);

  // Define steps with grouped fields
  const steps = [
    {
      title: "Your Details",
      fields: ["firstName", "lastName", "email", "gender"],
      content: (
        <Row gutter={16}>
          <Col span={24}>
            <FormInput name="firstName" label="First Name" required />
          </Col>
          <Col span={24}>
            <FormInput name="lastName" label="Last Name" required />
          </Col>
          <Col span={24}>
            <FormInput name="email" label="Email" rules={[{ required: true, type: "email", message: "Invalid email" }]} />
          </Col>
          <Col span={24}>
            <FormSelect name="gender" label="Gender" options={GenderOptions} />
          </Col>
        </Row>
      ),
    },
    {
      title: "Verity Number",
      fields: [["contact", "countryCode"], ["contact", "mobile"], "language", "dob", "city"],
      content: (
        <Row gutter={16}>
          <Col span={24}>
            <FormDatePicker name="dob" label="Date of Birth" />
          </Col>
          <Col span={24}>
            <FormInput name="city" label="City" />
          </Col>
          <Col span={24}>
            <FormSelect name="language" label="Language" required options={LanguageOptions} />
          </Col>
          <Col span={24}>
            {/* Phone Number */}
            <Form.Item label="Phone Number" required>
              <Space.Compact block size="large">
                <Form.Item name={["contact", "countryCode"]} noStyle rules={[{ required: true, message: "Please select country code" }]}>
                  <PhoneInput
                    defaultCountry="in"
                    value={form.getFieldValue("countryCode")}
                    onChange={(phone, { country }) => {
                      form.setFieldsValue({ countryCode: `+${country.dialCode}` });
                    }}
                    className="w-[130px] p-2 border border-gray-300 rounded-s-lg bg-input-box"
                  />
                </Form.Item>
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
        </Row>
      ),
    },
    {
      title: "Finish Up",
      fields: ["password", "examTypeId", "upscNumber", "referralCode"],
      content: (
        <Row gutter={16}>
          <Col span={24}>
            <FormInput name="referralCode" label="Referral Code" />
          </Col>
          <Col span={24}>
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
            <FormInput name="upscNumber" label="Attempt number UPSC" required />
          </Col>
          <Col span={24}>
            <FormInput name="password" label="Password" type="password" rules={[{ required: true, min: 6, message: "Password must be at least 6 characters" }]} />
          </Col>
        </Row>
      ),
    },
  ];

  return (
    <div className="min-h-screen bg-white relative flex">
      {/* Left Illustration */}
      <div className="hidden xl:flex xl:w-1/2 2xl:w-2/5 h-screen sticky top-0 z-10 overflow-hidden p-3">
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

      {/* Right Form */}
      <div className="flex xl:w-1/2 2xl:w-3/5 w-full h-screen overflow-y-auto justify-center items-center p-4 sm:p-8 lg:p-12 z-10">
        <div className="w-full max-w-2xl mx-auto space-y-8">
          <Steps current={current} direction="horizontal" items={steps.map((s) => ({ title: s.title }))} className="space-y-6 lg:space-y-8" />

          <header className="space-y-6 lg:space-y-8">
            <div className="space-y-3">
              <h2 className="font-bold text-2xl sm:text-3xl xl:text-3xl text-black text-center xl:text-left">Get Started Now</h2>
              <p className="font-medium text-sm sm:text-base xl:text-sm text-black text-center xl:text-left opacity-80">Create an account or explore about our website</p>
            </div>
          </header>
          <span className="border-t border-primary flex w-full" />

          <Form form={form} layout="vertical" onFinish={handleFormSubmit} initialValues={{ countryCode: "+91" }} className="form-submit">
            <div className="my-6">{steps[current].content}</div>
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
            <div className="flex justify-between">
              {current > 0 && (
                <button className="button button--mimas w-full !me-3" onClick={prev}>
                  <span>Previous</span>
                </button>
              )}
              {current < steps.length - 1 ? (
                <button type="button" className="button button--mimas w-full" onClick={next}>
                  <span>Next</span>
                </button>
              ) : (
                <button className="button button--mimas w-full">
                  <span>Submit</span>
                </button>
              )}
            </div>
          </Form>
        </div>
      </div>

      {/* Background */}
      <div className="absolute z-0 bottom-0 right-0">
        <img src="/assets/images/auth/FormLines.png" alt="" />
      </div>
    </div>
  );
};

export default Signup;
