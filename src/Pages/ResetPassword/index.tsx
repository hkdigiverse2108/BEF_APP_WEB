import { Form, Modal } from "antd";
import { FormButton, FormInput } from "../../Attribute/FormFields";
import { useAppDispatch, useAppSelector } from "../../Store/hooks";
import { setResetPasswordModal } from "../../Store/Slices/AuthSlice";
import { usePostApiMutation } from "../../Api/CommonApi";
import { HTTP_STATUS, ImagePath, URL_KEYS } from "../../Constants";

const ResetPasswordModal = () => {
  const { isResetPasswordModal, user } = useAppSelector((store) => store.auth);
  const dispatch = useAppDispatch();
  const [form] = Form.useForm();
  const [PostApi, { isLoading }] = usePostApiMutation();

  const handleOk = () => dispatch(setResetPasswordModal());
  const handleFormSubmit = async (values: any) => {
    try {
      const Update = {
        userId: user?._id,
        ...values,
      };
      const res = await PostApi({ url: URL_KEYS.AUTH.CHANGE_PASSWORD, data: Update });
      if (res?.data?.status === HTTP_STATUS.OK) {
        dispatch(setResetPasswordModal());
      } else {
        const err = res as { error: { data: { message: string } } };
        form.setFields([
          {
            name: "oldPassword",
            errors: [err?.error?.data?.message],
          },
        ]);
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Modal centered open={isResetPasswordModal} onCancel={handleOk} footer={null} className="feedback">
      <div className="flex flex-col items-center justify-center min-h-full">
        <div
          className="w-full !rounded-2xl overflow-hidden bg-input-box bg-cover bg-top"
          style={{
            backgroundImage: `url(${ImagePath}confirmation/Confirmation-bg.png)`,
          }}
        >
          <div className="text-center p-3 sm:p-6 !pb-0 text-white">
            <h2 className="text-2xl font-normal">Reset Password</h2>
          </div>
          <div className="p-3 sm:p-6 flex flex-col gap-6">
            <div className="bg-white rounded-md p-6">
              <Form form={form} layout="vertical" onFinish={handleFormSubmit} className="!w-full">
                <FormInput
                  name="oldPassword"
                  label="Old Password"
                  placeholder="Enter Your Old Password"
                  rules={[
                    {
                      required: true,
                      min: 6,
                      message: "Password must be at least 6 characters",
                    },
                  ]}
                />
                <FormInput
                  name="newPassword"
                  label="New Password"
                  placeholder="Enter your New Password"
                  rules={[
                    {
                      required: true,
                      min: 6,
                      message: "Password must be at least 6 characters",
                    },
                  ]}
                />
                <span className="border-t border-primary flex w-full my-6" />
                <Form.Item label={null} className="col-span-2 text-center !m-0">
                  <FormButton htmlType="submit" loading={isLoading} text="Save" className="custom-button button button--mimas w-full !h-auto" />
                </Form.Item>
              </Form>
            </div>
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default ResetPasswordModal;
