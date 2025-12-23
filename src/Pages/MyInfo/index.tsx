import { Col, Form, Input, Row, Space } from "antd";
import { useEffect, useState } from "react";
import { PhoneInput } from "react-international-phone";
import { useGetApiQuery, usePostApiMutation } from "../../Api/CommonApi";
import { FormButton, FormInput, FormSelect, ImageUpload } from "../../Attribute/FormFields";
import { CardHeader } from "../../Components/Common/CardHeader";
import { HTTP_STATUS, ImagePath, STORAGE_KEYS, URL_KEYS } from "../../Constants";
import { FINAL_DISTRICTS, GenderOptions, INDIA_STATES, LanguageOptions } from "../../Data";
import { EditPayload, updateStorage } from "../../Utils";
import LogoutConfirmModal from "../../Components/MyInfo/LogoutConfirmModal";
import { useAppSelector } from "../../Store/hooks";
import { useGetGlobalApiQuery } from "../../Api/CommonGlobalApi";

const MyInfo = () => {
  const [form] = Form.useForm();
  const [logoutModalOpen, setLogoutModalOpen] = useState(false);

  const { user } = useAppSelector((state) => state.auth);

  const { data, refetch } = useGetApiQuery({
    url: `${URL_KEYS.USER.ID}${user._id}`,
  });
  const userData = data?.data;
  const [PostApi, { isLoading }] = usePostApiMutation();

  const { data: examTypeApi } = useGetGlobalApiQuery({
    url: URL_KEYS.EXAM.TYPE,
  });
  
  let examTypeData = examTypeApi?.data;

  const handleSaveClick = async (values: any) => {
    try {
      let editPayload = EditPayload(values, userData);
      editPayload = {
        userId: userData?._id,
        ...editPayload,
        profileImage: values.profileImage[0] || "",
      };
      const res = await PostApi({ url: URL_KEYS.USER.EDIT, data: editPayload });
      if (res?.data?.status === HTTP_STATUS.OK) {
        refetch();
        updateStorage(STORAGE_KEYS.USER, editPayload);
      }
    } catch (error) {
      console.error("Edit Error:", error);
    }
  };

  useEffect(() => {
    if (userData) {
      form.setFieldsValue({
        ...userData,
        profileImage: userData?.profileImage ? [userData?.profileImage] : [],
      });
    }
  }, [userData, form]);

  return (
    <div className="sub-container pt-4">
      <CardHeader title="My Info & Setting" />
      <hr className="text-card-border my-4" />
      <Form form={form} layout="vertical" onFinish={handleSaveClick} className="grid grid-cols-1 lg:grid-cols-3 gap-6 !mt-6">
        {/* LEFT SIDE CARD */}
        <div className="max-lg:col-span-2">
          <div
            className="p-3 sm:p-6 grid grid-cols-1 gap-4 rounded-lg overflow-hidden bg-cover bg-center"
            style={{
              backgroundImage: `url(${ImagePath}confirmation/Confirmation-bg.png)`,
            }}
          >
            <div className="flex flex-col p-6 items-center bg-white rounded-lg">
              <div className="relative">
                <Form.Item name="profileImage" rules={[{ required: false }]}>
                  <ImageUpload multiple={false} isListType="picture-circle" />
                </Form.Item>
              </div>
              <h3 className="font-normal text-lg mt-3 capitalize">
                {userData?.firstName} {userData?.lastName}
              </h3>
              <p className="text-sm text-gray-500">{userData?.userType === "user" ? "Student" : "Admin"}</p>
            </div>
            <FormButton text="LOGOUT" onClick={() => setLogoutModalOpen(true)} className="custom-button button button--mimas w-full !h-auto" />
          </div>
        </div>

        {/* RIGHT SIDE FORM */}
        <div className="col-span-2">
          <div className="grid grid-cols-1 gap-4">
            <Row gutter={16}>
              <Col span={24} md={12}>
                <FormInput name="firstName" label="First Name" required />
              </Col>
              <Col span={24} md={12}>
                <FormInput name="lastName" label="Last Name" required />
              </Col>
              <Col span={24} md={12}>
                <Form.Item label="Phone Number" required>
                  <Space.Compact block size="large">
                    <Form.Item
                      name={["contact", "countryCode"]}
                      noStyle
                      rules={[
                        {
                          required: true,
                          message: "Please select country code",
                        },
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
                      <Input placeholder="Mobile Number" maxLength={10} inputMode="numeric" pattern="[0-9]*" />
                    </Form.Item>
                  </Space.Compact>
                </Form.Item>
              </Col>
              <Col span={24} md={12}>
                <FormInput name="email" label="Email" rules={[{ required: true, type: "email", message: "Invalid email" }]} />
              </Col>
              <Col span={24} md={12}>
                <FormInput name="upscNumber" label="Attempt Number" required />
              </Col>
              <Col span={24} md={12}>
                <FormSelect name="gender" label="Gender" options={GenderOptions} />
              </Col>
              <Col span={24} md={12}>
                <FormSelect
                  name="examTypeId"
                  label="Exam Type"
                  required
                  multiple="multiple"
                  options={(examTypeData || [])?.map((type: any) => ({
                    label: type?.name,
                    value: type?._id,
                  }))}
                />
              </Col>
              <Col span={24} md={12}>
                <FormSelect name="language" label="Language" required options={LanguageOptions} />
              </Col>
              <Col span={24} md={12}>
                <FormSelect
                  name="city"
                  label="City"
                  required
                  showSearch
                  virtual
                  options={(FINAL_DISTRICTS || [])?.map((district: any) => ({
                    label: district,
                    value: district,
                  }))}
                />
              </Col>
              {/* <Col span={24} md={12}>
                <FormInput name="state" label="State" />
              </Col> */}
              <Col span={24} md={12}>
                <FormSelect
                  name="state"
                  label="State"
                  required
                  showSearch
                  virtual
                  options={INDIA_STATES.map((state: string) => ({
                    label: state,
                    value: state,
                  }))}
                />
              </Col>
            </Row>
            <span className="border-t border-primary flex w-full" />
            <FormButton htmlType="submit" text="UPDATE PROFILE" loading={isLoading} className="custom-button button button--mimas w-full !h-auto" />
          </div>
        </div>
      </Form>
      <LogoutConfirmModal logoutModalOpen={logoutModalOpen} setLogoutModalOpen={setLogoutModalOpen} />
    </div>
  );
};

export default MyInfo;
