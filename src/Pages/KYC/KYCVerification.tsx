import { Form, Image, Modal, Upload, type UploadProps } from "antd";
import { useEffect, useState } from "react";
import { GiCheckMark, GiCrossMark } from "react-icons/gi";
import { MdDriveFolderUpload } from "react-icons/md";
import { FormButton } from "../../Attribute/FormFields";
import { ImagePath, ROUTES, STORAGE_KEYS, URL_KEYS } from "../../Constants";
import { usePostApiMutation } from "../../Api/CommonApi";
import { Storage, updateStorage } from "../../Utils";
import { useNavigate } from "react-router-dom";
import { AntMessage } from "../../Components/Common/AntMessage";

const { Dragger } = Upload;

const KYCVerification = () => {
  const [form] = Form.useForm();
  const [open, setOpen] = useState(false);
  const KYC = JSON.parse(Storage.getItem(STORAGE_KEYS.KYC) || "{}");
  const user = JSON.parse(Storage.getItem(STORAGE_KEYS.USER) || "{}");
  const [image, setImage] = useState<string>(KYC.frontSideImage || "");
  const navigate = useNavigate();

  const [PostApi, { isLoading }] = usePostApiMutation();

  useEffect(() => {
    if (KYC.frontSideImage) {
      form.setFieldValue("image", [
        {
          uid: "-1",
          name: "frontSideImage.png",
          status: "done",
          url: KYC.frontSideImage,
        },
      ]);
    } else {
      form.setFieldValue("image", []);
    }
  }, [KYC.frontSideImage]);

  const props: UploadProps = {
    name: "image",
    multiple: false,
    beforeUpload: () => false,
    onChange: async (info) => {
      const { file } = info;
      console.log(file);

      const formData = new FormData();
      formData.append("image", file as any);

      try {
        const res = await PostApi({ url: URL_KEYS.UPLOAD.ADD, data: formData });
        const uploadedUrl = res?.data.data || "";
        setImage(uploadedUrl);
        AntMessage("success", "File uploaded successfully!");
        updateStorage(STORAGE_KEYS.KYC, { frontSideImage: uploadedUrl });
      } catch (error) {
        console.error("Upload failed:", error);
        AntMessage("error", "File upload failed!");

      }
    },
    onDrop(e) {
      console.log("Dropped files", e.dataTransfer.files);
    },
  };

  const handleFormSubmit = async (values: any) => {
    console.log("KYC Verification Submitted:", values);
    if (!image) {
      return AntMessage("warning", "Please upload your PAN card first!");

    }
    setOpen(true);
  };

  const handleKYCVerification = async () => {
    setOpen(false);
    const data = {
      idNumber: KYC.idNumber,
      idProof: KYC.idProof,
      frontSideImage: KYC.frontSideImage,
      userId: user._id,
    };
    try {
      const res = await PostApi({ url: URL_KEYS.KYC.ADD, data });
      console.log("res", res);
      navigate(ROUTES.HOME);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="sub-container pt-4 mb-8">
      {/* ✅ Confirmation Modal */}
      <Modal
        centered
        open={open}
        onCancel={() => setOpen(false)}
        footer={null}
        width="500px"
        className="!p-0"
      >
        <div className="flex flex-col items-center justify-center min-h-full">
          <div
            className="w-full rounded-2xl overflow-hidden border border-gray-200 bg-white bg-cover bg-top"
            style={{
              backgroundImage: `url(${ImagePath}confirmation/Confirmation-bg.png)`,
            }}
          >
            {/* Header */}
            <div className="text-white text-center p-3 sm:p-6 !pb-0">
              <h2 className="text-2xl font-normal">Review</h2>
            </div>

            {/* Body */}
            <div className="p-3 sm:p-6 flex flex-col gap-6">
              <div className="bg-white rounded-md p-6 sm:p-12">
                <div className="flex justify-center">
                  <img
                    src={`${ImagePath}kyc/KycReview.png`}
                    alt=""
                    className="max-w-xs"
                  />
                </div>
                <div className="flex flex-col text-center">
                  <p className="text-lg sm:text-2xl font-semibold capitalize">
                    Review still in process
                  </p>
                  <p className="sm:text-lg capitalize">
                    rest assured you will be notified within
                  </p>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-2">
                <FormButton
                  text="Cancel"
                  htmlType="button"
                  onClick={() => setOpen(false)}
                  className="custom-button-light button button--mimas text-center w-full !p-4 !h-12 uppercase !bg-white"
                />
                <FormButton
                  text="Done"
                  htmlType="button"
                  onClick={handleKYCVerification}
                  className="custom-button button button--mimas text-center w-full !p-4 !h-12 uppercase !bg-white"
                />
              </div>
            </div>
          </div>
        </div>
      </Modal>

      {/* ✅ KYC Section */}
      <section className="flex flex-col gap-5">
        <h2 className="text-xl font-semibold">KYC Verification</h2>
        <hr className="text-card-border mb-4" />

        <Form
          form={form}
          layout="vertical"
          onFinish={handleFormSubmit}
          className="flex flex-col xl:flex-row justify-between gap-10"
        >
          {/* Left: PAN Preview */}
          <div className="bg-gray-50 border border-gray-200 rounded-xl p-6 flex flex-1/2 justify-center items-center w-full h-fit ">
            <Image
              className="w-full max-w-xl rounded-lg object-contain"
              src={image || "/assets/images/kyc/panCard.png"}
            />
          </div>

          {/* Right: Upload Section */}
          <div className="flex flex-col w-full xl:w-1/2 gap-6">
            <h3 className="text-lg font-semibold">
              Indian Quiz Private Limited
            </h3>

            {/* Sample Images */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 justify-between">
              <div className="flex flex-col max-sm:col-span-2 items-center w-full text-center">
                <img
                  src="/assets/images/kyc/panCard.png"
                  alt="Clear"
                  className="w-full h-fit object-cover"
                />
                <p className="text-sm flex items-center mt-1 gap-1">
                  <GiCheckMark fill="green" /> Clear Image
                </p>
              </div>

              <div className="flex flex-col items-center text-center">
                <img
                  src="/assets/images/kyc/panCardBlur.png"
                  alt="Blurry"
                  className="w-full h-fit object-cover"
                />
                <p className="text-sm flex items-center mt-1 gap-1">
                  <GiCrossMark fill="red" /> Blurry Image
                </p>
              </div>

              <div className="flex flex-col items-center text-center">
                <img
                  src="/assets/images/kyc/panCardCrop.png"
                  alt="Cropped"
                  className="w-full h-fit object-cover rounded-lg"
                />
                <p className="text-sm flex items-center mt-1 gap-1">
                  <GiCrossMark fill="red" /> Cropped Image
                </p>
              </div>
            </div>

            {/* Upload Field */}
            <Form.Item
              name="image"
              label="Upload Your PAN Card"
              valuePropName="fileList"
              getValueFromEvent={(e) => (Array.isArray(e) ? e : e?.fileList)}
              rules={[
                {
                  required: true,
                  message: "Please upload your PAN card!",
                },
              ]}
              className="!font-semibold"
            >
              <Dragger {...props}>
                <p className="ant-upload-drag-icon text-6xl flex justify-center">
                  <MdDriveFolderUpload />
                </p>
                <p className="ant-upload-text">
                  <span className="text-primary">Click to upload</span> or drag
                  and drop
                </p>
                <p className="ant-upload-hint">
                  SVG, PNG, JPG or PDF (max. 800x400px)
                </p>
              </Dragger>
            </Form.Item>

            {/* Buttons */}
            <div className="flex flex-col sm:flex-row justify-between gap-4">
              {/* <FormButton htmlType="button" text="REPLACE" className="custom-button-light button button--mimas w-full !h-auto" /> */}
              <FormButton
                htmlType="submit"
                text="UPLOAD & CONTINUE"
                loading={isLoading}
                className="custom-button button button--mimas w-full !h-auto"
              />
            </div>
          </div>
        </Form>
      </section>
    </div>
  );
};

export default KYCVerification;
