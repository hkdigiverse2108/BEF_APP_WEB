import { PlusOutlined } from "@ant-design/icons";
import type { UploadProps } from "antd";
import { Image, Upload } from "antd";
import { useEffect, useState, type FC } from "react";
import { usePostApiMutation } from "../../Api/CommonApi";
import { URL_KEYS } from "../../Constants";
import type { FileType, ImageUploadProps } from "../../Types";

const getBase64 = (file: FileType): Promise<string> =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = (error) => reject(error);
  });

const ImageUpload: FC<ImageUploadProps> = ({
  multiple,
  accept,
  isListType,
  disabled,
  value,
  onChange,
}) => {
  const [fileList, setFileList] = useState<string[]>(value || []);
  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewImage, setPreviewImage] = useState("");

  const [PostApi, { isLoading }] = usePostApiMutation();

  // 🔹 Preview Image
  const handlePreview = async (file: any) => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj as FileType);
    }
    setPreviewImage(file.url || file.preview);
    setPreviewOpen(true);
  };

  // 🔹 Upload Image
  const customUpload: UploadProps["beforeUpload"] = async (file) => {
    const formData = new FormData();
    formData.append("image", file);
    try {
      const res = await PostApi({ url: URL_KEYS.UPLOAD.ADD, data: formData });
      const uploadedUrl = res?.data.data || "";
      setFileList([...fileList, uploadedUrl]);
      onChange?.([...fileList, uploadedUrl]);
      console.log("uploadedUrl", uploadedUrl, fileList);
    } catch (error) {
      console.error("Upload failed:", error);
    }

    return false;
  };

  // 🔹 Remove Image
  const removeFile = async (imageSrc: string) => {
    const updatedList = fileList.filter((img) => img !== imageSrc);
    console.log("Remove File : ", updatedList);
    setFileList(updatedList);
    onChange?.(updatedList);
  };

  const uploadButton = (
    <button style={{ border: 0, background: "none" }} type="button">
      <PlusOutlined />
      <div style={{ marginTop: 8 }}>Upload</div>
    </button>
  );

  // ✅ Sync with form
  useEffect(() => {
    setFileList(Array.isArray(value) ? value : []);
  }, [value]);

  return (
    <div>
      <Upload
        accept={accept ?? "image/*"}
        listType={isListType ?? "picture-card"}
        multiple={multiple}
        disabled={disabled}
        fileList={fileList?.map((url, index) => ({
          uid: String(index),
          name: `file-${index}.jpg`,
          status: isLoading ? "uploading" : "done",
          url,
        }))}
        beforeUpload={customUpload}
        onPreview={handlePreview}
        onRemove={(file) => {
          if (file.url) removeFile(file.url);
        }}
      >
        {multiple || fileList.length < 1 ? uploadButton : null}
      </Upload>

      {/* Preview Viewer */}
      {previewImage && (
        <Image
          wrapperStyle={{ display: "none" }}
          preview={{
            visible: previewOpen,
            onVisibleChange: (visible) => setPreviewOpen(visible),
            afterOpenChange: (visible) => !visible && setPreviewImage(""),
          }}
          src={previewImage}
        />
      )}
    </div>
  );
};

export default ImageUpload;
