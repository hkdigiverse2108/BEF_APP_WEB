import { Col, Form, Input, Row, Space, Steps } from "antd";
import { useEffect, useState } from "react";
import { PhoneInput } from "react-international-phone";
import { Link, NavLink } from "react-router-dom";
import {
  FormButton,
  FormDatePicker,
  FormInput,
  FormSelect,
} from "../../Attribute/FormFields";
import {
  useGetGlobalApiQuery,
  usePostGlobalApiMutation,
} from "../../Api/CommonGlobalApi";
import { HTTP_STATUS, ImagePath, ROUTES, URL_KEYS } from "../../Constants";
import { GenderOptions, LanguageOptions } from "../../Data";
import { RemoveEmptyFields } from "../../Utils";
import { useAppDispatch } from "../../Store/hooks";
import { SetUser } from "../../Store/Slices/AuthSlice";
import type { RegisterForm, RegisterPayload } from "../../Types";
import type { FetchBaseQueryError } from "@reduxjs/toolkit/query";
import type { SerializedError } from "@reduxjs/toolkit";
import { useGetApiQuery } from "../../Api/CommonApi";

const Register = () => {
  const [form] = Form.useForm();
  const [current, setCurrent] = useState(0);
  const [referralTimer, setReferralTimer] = useState<any>(null);

  const [formData, setFormData] = useState<RegisterForm>();

  const dispatch = useAppDispatch();

  const [PostGlobalApi, { isLoading: isPostApiLoading }] =
    usePostGlobalApiMutation({});

  const { data: examTypeApi } = useGetGlobalApiQuery({
    url: URL_KEYS.EXAM.TYPE,
  });
  let examTypeData = examTypeApi?.data;

  const { data: CouponData, isLoading: isCouponLoading } = useGetApiQuery({
    url: `${URL_KEYS.COUPON.ALL}?audienceFilter=default`,
  });

  const defaultCoupon = CouponData?.data?.coupon_data[0]?.code;

  useEffect(() => {
    form.setFieldsValue({ referralCode: defaultCoupon });
  }, [defaultCoupon, form]);

  const handleFormSubmit = async (values: RegisterForm) => {
    try {
      const mergedData = { ...formData, ...values };

      let payload: RegisterPayload = {
        ...mergedData,
        dob: values?.dob ? values?.dob.format("YYYY-MM-DD") : null,
        examTypeId: [values?.examTypeId],
        ...(values?.referralCode ? { referralCode: values?.referralCode } : {}),
      };

      const cleaned = RemoveEmptyFields(payload);
      const res = await PostGlobalApi({
        url: URL_KEYS.AUTH.REGISTER,
        data: cleaned,
      }).unwrap();

      dispatch(SetUser(res?.data));
    } catch (error) {
      console.error(error);
    }
  };

  const handleReferralCheck = (code: string) => {
    // Clear previous timer
    if (referralTimer) clearTimeout(referralTimer);

    // If field empty → remove error and stop
    if (!code) {
      form.setFields([{ name: "referralCode", errors: [] }]);
      return;
    }

    // Start new 5 sec timer
    const timer = setTimeout(async () => {
      try {
        const payload = { code, amount: 0 };

        const res = await PostGlobalApi({
          url: URL_KEYS.COUPON.CHECK,
          data: payload,
        });

        if ("error" in res) {
          const errorData = (res.error as FetchBaseQueryError).data as {
            status?: number;
            message?: string;
          };

          if (errorData?.status === HTTP_STATUS.NOT_FOUND) {
            form.setFields([
              {
                name: "referralCode",
                errors: ["Invalid referral code"],
              },
            ]);
            return;
          }
        }

        // valid code → clear errors
        form.setFields([{ name: "referralCode", errors: [] }]);
      } catch (e) {
        console.error(e);
      }
    }, 2000);

    setReferralTimer(timer);
  };

  const next = async () => {
    try {
      await form.validateFields(steps[current].fields);

      const values = form.getFieldsValue(true);
      const email = values.email.toLowerCase();
      const contact = values.contact;

      const errors: any[] = [];
      let hasError = false;

      if (email) {
        const resEmail:
          | { data: any }
          | { error: FetchBaseQueryError | SerializedError } =
          await PostGlobalApi({
            url: URL_KEYS.USER.CHECK,
            data: { email },
          });
        if ("error" in resEmail) {
          const errorData = (resEmail.error as FetchBaseQueryError).data as {
            status?: number;
            message?: string;
          };

          if (errorData?.status === HTTP_STATUS.NOT_FOUND) {
            errors.push({
              name: "email",
              errors: [errorData?.message || "Email already exists"],
            });
            hasError = true;
          }
        }
      }

      if (contact?.mobile) {
        const resPhone = await PostGlobalApi({
          url: URL_KEYS.USER.CHECK,
          data: { contact },
        });

        if ("error" in resPhone) {
          const errorData = (resPhone.error as FetchBaseQueryError).data as {
            status?: number;
            message?: string;
          };

          if (errorData?.status === HTTP_STATUS.NOT_FOUND) {
            errors.push({
              name: ["contact", "mobile"],
              errors: [errorData?.message || "Phone already exists"],
            });
            hasError = true;
          }
        }
      }

      if (hasError) {
        form.setFields(errors);
        return;
      }

      const updatedData = { ...formData, ...values };
      setFormData(updatedData);
      form.setFieldsValue(updatedData);

      setCurrent((prev) => prev + 1);
    } catch (e) {
      console.error(e);
    }
  };

  const prev = () => {
    const values = form.getFieldsValue(true);
    const updatedData = { ...formData, ...values };
    setFormData(updatedData);

    form.setFieldsValue(updatedData);
    setCurrent((prev) => prev - 1);
  };

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
            <FormInput
              name="email"
              label="Email"
              rules={[
                { required: true, type: "email", message: "Invalid email" },
              ]}
            />
          </Col>
          <Col span={24}>
            <FormSelect name="gender" label="Gender" options={GenderOptions} />
          </Col>
        </Row>
      ),
    },
    {
      title: "Verity Number",
      fields: [
        ["contact", "countryCode"],
        ["contact", "mobile"],
        "language",
        "dob",
        "city",
      ],
      content: (
        <Row gutter={16}>
          <Col span={24}>
            <FormDatePicker name="dob" label="Date of Birth" />
          </Col>
          <Col span={24}>
            <FormInput name="city" label="City" />
          </Col>
          <Col span={24}>
            <FormSelect
              name="language"
              label="Language"
              required
              options={LanguageOptions}
            />
          </Col>
          <Col span={24}>
            {/* Phone Number */}
            <Form.Item label="Phone Number" required>
              <Space.Compact block size="large">
                <Form.Item
                  name={["contact", "countryCode"]}
                  noStyle
                  rules={[
                    { required: true, message: "Please select country code" },
                  ]}
                >
                  <PhoneInput
                    defaultCountry="in"
                    value={form.getFieldValue("countryCode")}
                    onChange={(_, { country }) => {
                      form.setFieldsValue({
                        contact: { countryCode: `+${country.dialCode}` },
                      });
                    }}
                    className="w-[130px] p-2 border border-gray-300 rounded-s-lg bg-input-box"
                  />
                </Form.Item>
                <Form.Item
                  name={["contact", "mobile"]}
                  noStyle
                  rules={[
                    {
                      required: true,
                      message: "Please enter your phone number",
                    },
                    { len: 10, message: "Phone number must be 10 digits" },
                    {
                      pattern: /^\d+$/,
                      message: "Phone number must contain only numbers",
                    },
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
            <FormInput
              name="referralCode"
              label="Referral Code"
              onChange={(e) => handleReferralCheck(e.target.value)}
            />
          </Col>
          <Col span={24}>
            <FormSelect
              name="examTypeId"
              label="Exam Type"
              required
              options={(examTypeData || [])?.map((type: any) => ({
                label: type?.name,
                value: type?._id,
              }))}
            />
          </Col>
          <Col span={24}>
            <FormInput
              name="upscNumber"
              type="number"
              label="Attempt number UPSC"
              required
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
          <div className="flex gap-0.5 mx-2 mb-1 text-sm font-medium  w-full ">
            <span>By Signing up, you agree to our</span>
            <span className="">
              {" "}
              <Link to={ROUTES.TERMS_CONDITIONS.PUBLIC_TERMS_CONDITIONS}>
                Terms & Condition{" "}
              </Link>
            </span>
            &
            <span>
              <Link to={ROUTES.PRIVACY_POLICY.PUBLIC_PRIVACY_POLICY}>
                {" "}
                PrivacyPolicy{" "}
              </Link>
            </span>
          </div>
        </Row>
      ),
    },
  ];

  return (
    <div className="min-h-screen bg-white relative flex">
      {/* Left Illustration */}
      <div className="hidden xl:flex xl:w-1/2 2xl:w-2/5 h-screen sticky top-0 z-10 overflow-hidden border-r border-gray-100">
        <img
          className="w-full"
          alt="Group"
          src={`${ImagePath}auth/Register.jpg`}
        />
      </div>

      {/* Right Form */}
      <div className="flex xl:w-1/2 2xl:w-3/5 w-full overflow-y-auto justify-center items-center p-4 sm:p-8 lg:p-12 z-10">
        <div className="w-full max-w-2xl mx-auto ">
          <Steps
            current={current}
            direction="horizontal"
            items={steps.map((s) => ({ title: s.title }))}
            className="space-y-2 lg:space-y-4"
          />

          <header className="mb-3">
            <div className="space-y-1">
              <h2 className="font-bold text-2xl sm:text-3xl xl:text-3xl text-black text-center xl:text-left">
                Get Started Now
              </h2>
              <p className="font-medium text-sm sm:text-base xl:text-sm text-black text-center xl:text-left opacity-80">
                Create an account or explore about our website
              </p>
            </div>
          </header>
          <span className="border-t border-primary flex w-full" />

          <Form
            form={form}
            layout="vertical"
            onFinish={handleFormSubmit}
            initialValues={{ contact: { countryCode: "+91" } }}
          >
            <div className="mt-4">{steps[current].content}</div>
            <Col span={24}>
              <span className="border-t border-primary flex w-full col-span-2 mb-4" />
            </Col>
            <Col span={24}>
              {/* Footer */}
              <footer className="space-y-6 lg:space-y-8 col-span-2 mb-4">
                <p className="text-center text-sm lg:text-base">
                  <span className="font-medium text-black pe-2">
                    Already have an account?
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
            <div className="flex justify-between gap-3">
              {current > 0 && (
                <FormButton
                  htmlType="button"
                  text="Previous"
                  onClick={(e) => {
                    e.preventDefault();
                    prev();
                  }}
                  className="custom-button button button--mimas w-full !h-auto"
                />
              )}

              {current < steps.length - 1 ? (
                <FormButton
                  htmlType="button"
                  text="Next"
                  onClick={(e) => {
                    e.preventDefault();
                    next();
                  }}
                  className="custom-button button button--mimas w-full !h-auto"
                />
              ) : (
                <FormButton
                  loading={isPostApiLoading || isCouponLoading}
                  htmlType="submit"
                  text="Submit"
                  className="custom-button button button--mimas w-full !h-auto"
                />
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

export default Register;
