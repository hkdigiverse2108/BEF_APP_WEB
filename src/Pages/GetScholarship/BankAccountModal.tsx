import { Modal } from "antd";
import { type Dispatch, type FC, type SetStateAction } from "react";
import { FormButton } from "../../Attribute/FormFields";
import { ImagePath } from "../../Constants";

interface BankAccountModalProps {
  BankAccountModalOpen: boolean;
  setBankAccountModalOpen: Dispatch<SetStateAction<boolean>>;
  onConfirm: () => void;
}

const BankAccountModal: FC<BankAccountModalProps> = ({ BankAccountModalOpen, setBankAccountModalOpen, onConfirm }) => {
  return (
    <Modal centered open={BankAccountModalOpen} onCancel={() => setBankAccountModalOpen(false)} footer={null} width="500px" className="!p-0">
      <div className="flex flex-col items-center justify-center min-h-full">
        <div
          className="w-full rounded-2xl overflow-hidden border border-gray-200  bg-white bg-cover bg-top"
          style={{
            backgroundImage: `url(${ImagePath}confirmation/Confirmation-bg.png)`,
          }}
        >
          {/* Header */}
          <div className="text-white text-center p-3 sm:p-6 !pb-0">
            <h2 className="text-2xl font-semibold">Bank Account</h2>
          </div>

          {/* Body */}
          <div className="p-3 sm:p-6 flex flex-col gap-6">
            <div className="bg-white/10 backdrop-blur-2xl rounded-md p-3">
              <div className="flex flex-col text-center">
                <p className="text-lg sm:text-lg text-white  font-semibold capitalize">Are you sure you want to delete this bank account?</p>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-3">
              <FormButton text="Cancel" onClick={() => setBankAccountModalOpen(false)} className="custom-button-light w-full button button--mimas !h-13 bg-gray-300 text-black" />
              <FormButton text="Delete" onClick={() => onConfirm()} className="custom-button button button--mimas w-full !h-13 bg-red-500 text-white" />
            </div>
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default BankAccountModal;
