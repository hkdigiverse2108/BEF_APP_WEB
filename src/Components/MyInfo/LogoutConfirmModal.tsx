import { Modal } from "antd";
import React, { type FC } from "react";
import { ImagePath } from "../../Constants";
import { FormButton } from "../../Attribute/FormFields";
import { useAppDispatch } from "../../Store/hooks";
import { LogOut } from "../../Store/Slices/AuthSlice";
import { Storage } from "../../Utils";

interface LogoutConfirmModalProps {
  logoutModalOpen: boolean;
  setLogoutModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const LogoutConfirmModal: FC<LogoutConfirmModalProps> = ({
  logoutModalOpen,
  setLogoutModalOpen,
}) => {
  const dispatch = useAppDispatch();

  const handleLogout = () => {
    Storage.clear();
    dispatch(LogOut());
    window.location.reload();
  };
  return (
    <Modal
      centered
      open={logoutModalOpen}
      onCancel={() => setLogoutModalOpen(false)}
      footer={null}
      width="500px"
      className="!p-0"
    >
      <div className="flex flex-col items-center justify-center min-h-full">
        <div
          className="w-full rounded-2xl overflow-hidden border border-gray-200  bg-white bg-cover bg-top"
          style={{
            backgroundImage: `url(${ImagePath}confirmation/Confirmation-bg.png)`,
          }}
        >
          {/* Header */}
          <div className="text-white text-center p-3 sm:p-6 !pb-0">
            <h2 className="text-2xl font-semibold">Logout</h2>
          </div>

          {/* Body */}
          <div className="p-3 sm:p-6 flex flex-col gap-6">
            <div className="bg-white/10 backdrop-blur-2xl rounded-md p-3">
              <div className="flex flex-col text-center">
                <p className="text-lg sm:text-lg text-white  font-semibold capitalize">
                  Are you sure you want to log out of your account?
                </p>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-2">
              {/* <FormButton
                text="Stay Logged In"
                htmlType="button"
                onClick={() => setLogoutModalOpen(false)}
                className="custom-button-light button button--mimas text-center w-full !p-4 !h-12 uppercase !bg-white"
              /> */}
              <FormButton
                text="LOGOUT"
                onClick={() => handleLogout()}
                className="custom-button button button--mimas w-full !h-12"
              />
            </div>
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default LogoutConfirmModal;
