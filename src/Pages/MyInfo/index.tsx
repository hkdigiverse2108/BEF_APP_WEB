import { LoadingOutlined, PlusOutlined } from "@ant-design/icons";
import { Col, Form, Input, message, Row, Space, Upload } from "antd";
import { useState } from "react";
import { FiEdit2 } from "react-icons/fi";
import { PhoneInput } from "react-international-phone";
import { FormButton, FormInput, FormSelect } from "../../Attribute/FormFields";
import { CardHeader } from "../../Components/Common/CardHeader";
import { ImagePath } from "../../Constants";
import { GenderOptions, LanguageOptions } from "../../Data";

const getBase64 = (img, callback) => {
  const reader = new FileReader();
  reader.addEventListener("load", () => callback(reader.result));
  reader.readAsDataURL(img);
};
const beforeUpload = (file) => {
  const isJpgOrPng = file.type === "image/jpeg" || file.type === "image/png";
  if (!isJpgOrPng) {
    message.error("You can only upload JPG/PNG file!");
  }
  const isLt2M = file.size / 1024 / 1024 < 2;
  if (!isLt2M) {
    message.error("Image must smaller than 2MB!");
  }
  return isJpgOrPng && isLt2M;
};

const MyInfo = () => {
  //   const [form, setForm] = useState({
  //     name: "John",
  //     email: "admin123@gmail.com",
  //     phone: "+91 00000 00000",
  //     gender: "Female",
  //     address: "124 Greenfield Avenue, Sector 22",
  //     pincode: "152 456",
  //     state: "Haryana",
  //     country: "India",
  //   });
  const [form] = Form.useForm();

  //   const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  //     // setForm({ ...form, [e.target.name]: e.target.value });
  //   };

  const [loading, setLoading] = useState(false);
  const [imageUrl, setImageUrl] = useState();
  const handleChange = (info) => {
    if (info.file.status === "uploading") {
      setLoading(true);
      return;
    }
    if (info.file.status === "done") {
      // Get this url from response in real world.
      getBase64(info.file.originFileObj, (url) => {
        setLoading(false);
        setImageUrl(url);
      });
    }
  };
  const uploadButton = (
    <button style={{ border: 0, background: "none" }} type="button">
      {loading ? <LoadingOutlined /> : <PlusOutlined />}
      <div style={{ marginTop: 8 }}>Upload</div>
    </button>
  );

  return (
    <div className="sub-container py-8">
      <CardHeader title="My Info & Setting" />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-6">
        {/* LEFT SIDE CARD */}
        <div className="max-lg:col-span-2">
          <div className="p-3 sm:p-6 grid grid-cols-1 gap-4 rounded-lg overflow-hidden bg-cover bg-center" style={{ backgroundImage: `url(${ImagePath}confirmation/Confirmation-bg.png)` }}>
            <div className="flex flex-col p-6 items-center bg-white rounded-lg">
              <div className="relative">
                <Upload name="avatar" listType="picture-circle" className="avatar-uploader" showUploadList={false} action="https://660d2bd96ddfa2943b33731c.mockapi.io/api/upload" beforeUpload={beforeUpload} onChange={handleChange}>
                  {imageUrl ? <img draggable={false} src={imageUrl} alt="avatar" style={{ width: "100%" }} /> : uploadButton}
                </Upload>
              </div>
              <h3 className="font-semibold text-lg mt-3">Jan Smith</h3>
              <p className="text-sm text-gray-500">Admin</p>
            </div>
            <FormButton text="LOGOUT" className="custom-button button button--mimas w-full !h-auto" />
          </div>
        </div>

        {/* RIGHT SIDE FORM */}
        <div className="col-span-2">
          <Form form={form} layout="vertical" className="grid grid-cols-1 gap-4">
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
                    <Form.Item name={["contact", "countryCode"]} noStyle rules={[{ required: true, message: "Please select country code" }]}>
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
                <FormInput name="Attempt Number" label="Attempt Number" required />
              </Col>
              <Col span={24} md={12}>
                <FormSelect name="gender" label="Gender" options={GenderOptions} />
              </Col>
              <Col span={24} md={12}>
                <FormSelect name="language" label="Language" required options={LanguageOptions} />
              </Col>
              <Col span={24} md={12}>
                <FormInput name="city" label="City" />
              </Col>
              <Col span={24} md={12}>
                <FormInput name="State" label="State" />
              </Col>
              <Col span={24} md={12}>
                <FormInput name="Country" label="Country" />
              </Col>
              <Col span={24}>
                <FormInput name="pin code" label="pin code" />
              </Col>
            </Row>
            <span className="border-t border-primary flex w-full" />
            <FormButton htmlType="submit" text="UPDATE PROFILE" className="custom-button button button--mimas w-full !h-auto" />
          </Form>
        </div>
      </div>
    </div>
  );
};

export default MyInfo;
