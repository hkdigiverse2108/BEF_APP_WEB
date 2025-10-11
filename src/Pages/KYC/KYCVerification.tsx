import { Form, Image, message, Modal, Upload, type UploadProps } from "antd";
import {
  UploadOutlined,
  CheckCircleOutlined,
  CloseCircleOutlined,
  InboxOutlined,
} from "@ant-design/icons";
import { FormButton } from "../../Attribute/FormFields";
import { useState } from "react";
import { GiCheckMark, GiCrossMark } from "react-icons/gi";
import { ImagePath } from "../../Constants";

const { Dragger } = Upload;

const KYCVerification = () => {
  const [form] = Form.useForm();
  const [open, setOpen] = useState(true);

  const [image, setImage] = useState("");

  const props: UploadProps = {
    name: "file",
    multiple: true,
    action: "https://660d2bd96ddfa2943b33731c.mockapi.io/api/upload",
    onChange(info) {
      const { status } = info.file;
      if (status !== "uploading") {
        console.log(info.file, info.fileList);
      }
      console.log("info", info);
      if (info.file.originFileObj) {
        const fileUrl = URL.createObjectURL(info.file.originFileObj);
        setImage(fileUrl);
      }
      if (status === "done") {
        message.success(`${info.file.name} file uploaded successfully.`);
      } else if (status === "error") {
        message.error(`${info.file.name} file upload failed.`);
      }
    },
    onDrop(e) {
      console.log("Dropped files", e.dataTransfer.files);
    },
  };

  const handleFormSubmit = async (values: any) => {
    console.log("KYC Verification Submitted:", values);
  };

  return (
    <div className="sub-container my-8 min-h-screen ">
      <Modal
        centered
        open={open}
        onCancel={() => setOpen(false)}
        footer={null}
        width={{
          xs: "90%",
          sm: "80%",
          md: "70%",
          lg: "60%",
          xl: "50%",
          xxl: "40%",
        }}
        className="!p-0"
      >
        <div className=" flex flex-col items-center justify-center min-h-full">
          <div
            className="w-full !rounded-2xl overflow-hidden border border-gray-200 bg-white bg-cover bg-top"
            style={{
              backgroundImage: `url(${ImagePath}confirmation/Confirmation-bg.png)`,
            }}
          >
            {/* Header */}
            <div className="text-white text-center p-3 sm:p-6 !pb-0">
              <h2 className="text-2xl font-semibold">Review</h2>
            </div>

            {/* Body */}
            <div className="p-3 sm:p-6 flex flex-col gap-6">
              <div className="bg-white rounded-md p-6 sm:p-12">
                <div className="flex justify-center">
                    <img src={`${ImagePath}kyc/KycReview.png`} alt="" />
                </div>
                <div className="flex flex-col text-center">
                  <p className="text-lg sm:text-2xl font-bold capitalize">
                    review still in process
                  </p>
                  <p className=" sm:text-lg  capitalize">
                    rest assured you will be notified within
                  </p>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-2">
                <FormButton
                  //   loading={isLoading}
                  text="Cancel"
                  htmlType="submit"
                  //   onClick={handleJoinButton}
                  className="custom-button button button--mimas text-center w-full !p-4 !h-12 uppercase flex items-end-safe !bg-white"
                />
                <FormButton
                  //   loading={isLoading}
                  text="Done"
                  htmlType="submit"
                  //   onClick={handleJoinButton}
                  className="custom-button button button--mimas text-center w-full !p-4 !h-12 uppercase flex items-end-safe !bg-white"
                />
              </div>
            </div>
          </div>
        </div>
      </Modal>

      <section className="flex flex-col gap-5">
        {/* Header */}
        <h2 className="text-xl font-bold">KYC Verification</h2>
        <span className="border-b border-gray-200 w-full"></span>

        {/* Main Layout */}
        <Form
          form={form}
          layout="vertical"
          onFinish={handleFormSubmit}
          className="flex flex-col xl:flex-row justify-between gap-10"
        >
          {/* Left: PAN Preview */}
          <div className="bg-gray-50 border border-gray-200 rounded-xl p-6 flex flex-1/2 justify-center items-center w-full h-fit ">
            <Image
              className="w-full max-w-xl rounded-lg object-contain "
              src={image || "/assets/images/kyc/panCard.png"}
            />
          </div>

          {/* Right: Upload Section */}
          <div className="flex flex-col w-full xl:w-1/2 gap-6">
            <h3 className="text-lg font-bold">Indian Quiz Privet Limited</h3>

            {/* Sample Images */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 justify-between">
              {/* Clear Image */}
              <div className="flex flex-col max-sm:col-span-2 items-center w-full h-full text-center">
                <img
                  src="/assets/images/kyc/panCard.png"
                  alt="Clear"
                  className="w-full h-fit object-cover"
                />
                <p className=" text-sm flex items-center mt-1 gap-1">
                  <GiCheckMark fill="green" /> Clear Image
                </p>
              </div>

              {/* Blurry Image */}
              <div className="flex flex-col items-center w-full h-full text-center">
                <img
                  src="/assets/images/kyc/panCardBlur.png"
                  alt="Blurry"
                  className="w-full h-fit object-cover"
                />
                <p className=" text-sm flex items-center mt-1 gap-1">
                  <GiCrossMark fill="red" /> Blurry Image
                </p>
              </div>

              {/* Crop Image */}
              <div className="flex flex-col items-center w-full h-full text-center">
                <img
                  src="/assets/images/kyc/panCardCrop.png"
                  alt="Cropped"
                  className="w-full h-fit object-cover  rounded-lg"
                />
                <p className=" text-sm flex items-center mt-1 gap-1">
                  <GiCrossMark fill="red" /> Crop Image
                </p>
              </div>
            </div>

            {/* Upload Field */}
            <Form.Item
              name="PAN"
              label="Upload Your PAN Card"
              valuePropName="fileList "
              getValueFromEvent={(e) => e?.fileList}
              rules={[
                {
                  required: true,
                  message: "Please upload your PAN card!",
                },
              ]}
              className="!font-bold"
            >
              <Dragger {...props}>
                <p className="ant-upload-drag-icon ">
                  <InboxOutlined />
                </p>
                <p className="ant-upload-text">
                  <span className=" text-primary "> Click to upload </span>or
                  drag and drop
                </p>
                <p className="ant-upload-hint">
                  SVG, PNG, JPG or PDF (max. 800x400px)
                </p>
              </Dragger>
            </Form.Item>

            {/* Buttons */}
            <div className="flex flex-col sm:flex-row justify-between gap-4">
              {/* <FormButton
                htmlType="button"
                text="REPLACE"
                className="!w-full sm:!w-[48%] bg-gradient-to-r from-orange-500 to-green-600 text-white font-semibold py-3 rounded-md"
              /> */}
              <FormButton
                htmlType="button"
                text="REPLACE"
                className="custom-button button button--mimas w-full !h-auto"
              />
              <FormButton
                htmlType="submit"
                text="UPLOAD & CONTINUE"
                className="custom-button button button--mimas w-full !h-auto"
              />
              {/* <FormButton
                htmlType="submit"
                text="UPLOAD & CONTINUE"
                className="!w-full sm:!w-[48%] bg-gradient-to-r from-green-600 to-orange-500 text-white font-semibold py-3 rounded-md"
              /> */}
            </div>
          </div>
        </Form>
      </section>
    </div>
  );
};

export default KYCVerification;
