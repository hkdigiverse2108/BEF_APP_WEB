import { Form, Modal } from "antd";
import { useAppDispatch, useAppSelector } from "../../../Store/hooks";
import { setReportModal } from "../../../Store/Slices/DrawerSlice";
import { ImagePath } from "../../../Constants";
import { FormButton, FormInput } from "../../../Attribute/FormFields";

const ReportModal = () => {
  const dispatch = useAppDispatch();
  const { isReportModal } = useAppSelector((state) => state.drawer);
  const [form] = Form.useForm();

  const handleFormSubmit = () => {};

  return (
    <Modal
      centered
      open={isReportModal}
      onCancel={() => dispatch(setReportModal())}
      footer={null}
      width={{
        xs: "90%",
        sm: "80%",
        md: "70%",
        lg: "60%",
        xl: "50%",
        xxl: "30%",
      }}
      className="!p-0"
    >
      <div className=" flex flex-col items-center justify-center min-h-full">
        <div
          className="w-full !rounded-2xl overflow-hidden border border-gray-200 bg-white bg-cover bg-center"
          style={{
            backgroundImage: `url(${ImagePath}confirmation/Confirmation-bg.png)`,
          }}
        >
          {/* Header */}
          <div className="text-white text-center p-3 sm:p-6 !pb-0">
            <h2 className="text-2xl font-semibold">Report Issue</h2>
          </div>

          {/* Body */}
          <div className="p-3 sm:p-6 flex flex-col gap-6">
            <div className="bg-white rounded-md p-6">
              <Form form={form} layout="vertical" onFinish={handleFormSubmit} className="!w-full">
                <FormInput name="uniqueId" label="Your Issue" placeholder="Enter Your Issue" className="!bg-white" />
                <span className="border-t border-primary flex w-full my-6" />
                <Form.Item label={null} className="col-span-2 text-center !m-0">
                  <FormButton htmlType="submit" text="submit" className="custom-button button button--mimas w-full !h-auto" />
                </Form.Item>
              </Form>
            </div>
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default ReportModal;
