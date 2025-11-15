import { Form, Modal } from "antd";
import { FormButton, FormInput } from "../../Attribute/FormFields";
import { setFeedbackModal } from "../../Store/Slices/DrawerSlice";
import { useAppDispatch, useAppSelector } from "../../Store/hooks";

const FeedbackModal = () => {
  const { isFeedbackModal } = useAppSelector((store) => store.drawer);
  const dispatch = useAppDispatch();
  const [form] = Form.useForm();

  const handleOk = () => dispatch(setFeedbackModal());
  const handleFormSubmit = () => {};

  return (
    <Modal centered open={isFeedbackModal} onCancel={handleOk} footer={null} className="feedback">
      <div className="flex flex-col items-center justify-center min-h-full">
        <div className="w-full !rounded-2xl overflow-hidden border border-gray-200 bg-input-box bg-cover bg-top">
          <div className="text-center p-3 sm:p-6 !pb-0">
            <h2 className="text-2xl font-normal">Feedback</h2>
          </div>

          <div className="p-3 sm:p-6 flex flex-col gap-6">
            <div className="bg-white rounded-md p-6">
              <Form form={form} layout="vertical" onFinish={handleFormSubmit} className="!w-full">
                <FormInput name="uniqueId" label="Name" placeholder="Enter Your Name" />
                <FormInput name="uniqueId" label="Give your Feedback" type="textArea" placeholder="Give your Feedback" />
                <span className="border-t border-primary flex w-full my-6" />
                <Form.Item label={null} className="col-span-2 text-center !m-0">
                  <FormButton htmlType="submit" text="Cash Withdrawal" className="custom-button button button--mimas w-full !h-auto" />
                </Form.Item>
              </Form>
            </div>
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default FeedbackModal;
